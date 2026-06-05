import csv
import sys
import yaml


# Maps a university/affiliation string to an Italian city name.
# Mirrors the normalizeLocationToCity logic in src/components/ItalyMap.tsx
def affiliation_to_city(affiliation: str, email: str = "") -> str:
    loc = affiliation.lower()

    if loc == "cnr" or "consiglio nazionale delle ricerche" in loc or loc == "cnr-consiglio nazionale delle ricerche":
        if "unito.it" in email:
            return "Torino"
        if "cibio" in email or "unitn.it" in email:
            return "Trento"
        if "icar.cnr.it" in email:
            return "Napoli"
        if "iac.cnr.it" in email:
            return "Roma"
        if "unimi.it" in email or "humanitas" in email:
            return "Milano"
        return "Roma"
    
    if 'Irccs Ospedale Policlinico San Martino' in affiliation:
        return "Genova"

    if  'Università di Roma "Tor Vergata"' in affiliation:
        return "Roma"
    
    if 'Technical University of Munich' in affiliation:
        return "Munich"
    
    if any(x in loc for x in ["sapienza", "roma tor vergata", "campus bio-medico", "roma la sapienza"]):
        return "Roma"
    if any(x in loc for x in ["politecnico di torino", "università di torino", "torino"]):
        return "Torino"
    if any(x in loc for x in ["politecnico di milano", "bicocca", "università di milano", "humanitas", "san raffaele", "tumori di milano", "milano"]):
        return "Milano"
    if "padova" in loc:
        return "Padova"
    if "bologna" in loc:
        return "Bologna"
    if "pisa" in loc:
        return "Pisa"
    if "udine" in loc:
        return "Udine"
    if "catania" in loc:
        return "Catania"
    if "palermo" in loc:
        return "Palermo"
    if "verona" in loc:
        return "Verona"
    if "firenze" in loc:
        return "Firenze"
    if any(x in loc for x in ["federico ii", "parthenope", "napoli"]):
        return "Napoli"
    if "bari" in loc:
        return "Bari"
    if "trento" in loc:
        return "Trento"
    if "trieste" in loc:
        return "Trieste"
    if "venezia" in loc or "ca' foscari" in loc:
        return "Venezia"
    if "parma" in loc:
        return "Parma"
    if "pavia" in loc:
        return "Pavia"
    if "perugia" in loc:
        return "Perugia"
    if "siena" in loc:
        return "Siena"
    if "marche" in loc or "ancona" in loc:
        return "Ancona"
    if "l'aquila" in loc:
        return "L'Aquila"
    if "messina" in loc:
        return "Messina"
    if "cagliari" in loc:
        return "Cagliari"
    if "camerino" in loc:
        return "Camerino"
    if "salerno" in loc:
        return "Salerno"
    if "catanzaro" in loc:
        return "Catanzaro"
    if any(x in loc for x in ["calabria", "cosenza", "rende"]):
        return "Cosenza"
    if "ferrara" in loc:
        return "Ferrara"
    if "foggia" in loc:
        return "Foggia"
    if "cassino" in loc:
        return "Cassino"
    if "urbino" in loc:
        return "Urbino"
    if "sannio" in loc or "benevento" in loc:
        return "Benevento"
    if "tuscia" in loc or "viterbo" in loc:
        return "Viterbo"
    if any(x in loc for x in ["insubria", "varese", "como"]):
        return "Varese"
    if "piemonte orientale" in loc or "upo" in loc:
        return "Novara"
    if "vanvitelli" in loc or "caserta" in loc:
        return "Caserta"
    if "modena" in loc or "reggio emilia" in loc:
        return "Modena"
    if "chieti" in loc or "pescara" in loc:
        return "Chieti-Pescara"

    # Fallback: return the affiliation string itself so the map can still try
    print(f"  [WARNING] Could not map affiliation to city: '{affiliation}'")
    return affiliation


def load_name_set(filepath: str) -> set:
    """Load a set of normalised names (lowercase, stripped) from a txt file (one name per line)."""
    try:
        with open(filepath, encoding="utf-8") as f:
            return {line.strip().lower() for line in f if line.strip()}
    except FileNotFoundError:
        print(f"  [INFO] {filepath} not found — skipping.")
        return set()


def csv_to_yaml(csv_file):
    import os
    script_dir = os.path.dirname(os.path.abspath(__file__))
    direttivo_names = load_name_set(os.path.join(script_dir, "direttivo.txt"))
    smm_names = load_name_set(os.path.join(script_dir, "smm.txt"))

    with open(csv_file, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            cleaned_row = {k.strip().rstrip(":"): v.strip() for k, v in row.items()}
            surname = cleaned_row.get("Cognome", "").replace(" ", "").lower()
            name = cleaned_row.get("Nome", "").replace(" ", "").lower()
            if not surname or not name:
                continue

            level = cleaned_row.get("level", "").strip() or "young"
            email = cleaned_row.get("Email (preferibilmente quella istituzionale)", "")
            affiliation = cleaned_row.get("Università di affiliazione (Università di ..)", "")
            city_from_csv = cleaned_row.get("Citta'", "")
            location = affiliation_to_city(affiliation, email) if affiliation else city_from_csv

            full_name = f"{cleaned_row.get('Nome', '')} {cleaned_row.get('Cognome', '')}".strip()
            full_name_normalised = full_name.lower()

            if full_name_normalised in direttivo_names:
                occupation = "direttivo"
            elif full_name_normalised in smm_names:
                occupation = "smm"
            else:
                occupation = "member"

            filename = f"{surname}{name}.yaml"
            yaml_data = {
                "name": full_name,
                "email": email,
                "location": location,
                "affiliation": affiliation,
                "level": level,
                "role": cleaned_row.get("Ruolo accademico", ""),
                "occupation": occupation,
            }
            with open(filename, "w", encoding="utf-8") as out:
                out.write("---\n")
                yaml.dump(yaml_data, out, allow_unicode=True, sort_keys=False)
            print(f"  Created {filename}  (location: {location}, occupation: {occupation})")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python csv_to_yaml.py <input.csv>")
        sys.exit(1)
    csv_to_yaml(sys.argv[1])
