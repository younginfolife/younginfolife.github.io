"""
generate_stats.py
=================
Reads all YAML files in this directory and writes aggregated statistics
to src/data/stats.json (relative to the project root).

Run from anywhere inside the project:
    python3 data/people/generate_stats.py
"""

import os
import re
import json
import yaml
from collections import Counter
from pathlib import Path


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

AFFILIATION_ALIASES: dict[str, str] = {
    # Torino
    "università di torino": "Università di Torino",
    "università degli studi di torino": "Università di Torino",
    "università degli studi di torino (unito)": "Università di Torino",
    "università di torino, mbc": "Università di Torino",
    "torino": "Università di Torino",
    # Politecnico Torino
    "politecnico di torino": "Politecnico di Torino",
    # Piemonte Orientale
    "università del piemonte orientale": "Università del Piemonte Orientale",
    "università degli studi del piemonte orientale": "Università del Piemonte Orientale",
    # Milano
    "università di milano": "Università di Milano",
    "università degli studi di milano": "Università di Milano",
    "milano": "Università di Milano",
    "milano / semm": "Università di Milano",
    # Bicocca
    "università di milano bicocca": "Università Milano-Bicocca",
    "università degli studi di milano-bicocca": "Università Milano-Bicocca",
    "università bicocca": "Università Milano-Bicocca",
    # Politecnico Milano
    "politecnico di milano": "Politecnico di Milano",
    # Humanitas
    "humanitas university": "Humanitas University",
    # San Raffaele
    "ospedale san raffaele": "IRCCS Ospedale San Raffaele",
    # Tumori Milano
    "istituto nazionale dei tumori di milano": "Istituto Nazionale dei Tumori di Milano",
    # Padova
    "università di padova": "Università di Padova",
    "università degli studi di padova": "Università di Padova",
    "università di padova - istituto oncologico veneto": "Università di Padova",
    "padova": "Università di Padova",
    # Verona
    "università di verona": "Università di Verona",
    "università degli studi di verona": "Università di Verona",
    "verona": "Università di Verona",
    # Trento
    "università di trento": "Università di Trento",
    "università degli studi di trento": "Università di Trento",
    # Trieste
    "università di trieste": "Università di Trieste",
    # Udine
    "università di udine": "Università di Udine",
    "università degli studi di udine": "Università di Udine",
    # Venezia
    "università ca' foscari di venezia": "Università Ca' Foscari Venezia",
    "università di venezia cà foscari": "Università Ca' Foscari Venezia",
    "ca' foscari": "Università Ca' Foscari Venezia",
    # Parma
    "università di parma": "Università di Parma",
    "università degli studi di parma": "Università di Parma",
    "parma": "Università di Parma",
    # Modena
    "università di modena reggio emilia": "Università di Modena e Reggio Emilia",
    "università di modena e reggio emilia": "Università di Modena e Reggio Emilia",
    # Ferrara
    "università di ferrara": "Università di Ferrara",
    # Pavia
    "università di pavia": "Università di Pavia",
    # Insubria
    "università di insubria": "Università dell'Insubria",
    "università dell'insubria": "Università dell'Insubria",
    # Genova
    "università di genova": "Università di Genova",
    # Bologna
    "università di bologna": "Università di Bologna",
    "alma mater studiorum - università di bologna": "Università di Bologna",
    "università degli studi di bologna": "Università di Bologna",
    "univerisità di bologna": "Università di Bologna",  # typo
    # Pisa
    "università di pisa": "Università di Pisa",
    "università degli studi di pisa": "Università di Pisa",
    "pisa": "Università di Pisa",
    # Fondazione Pisana
    "fondazione pisana per la scienza": "Fondazione Pisana per la Scienza",
    # Firenze
    "università di firenze": "Università di Firenze",
    "università degli studi di firenze": "Università di Firenze",
    # Siena
    "università di siena": "Università di Siena",
    "università degli studi di siena": "Università di Siena",
    # Camerino
    "università di camerino": "Università di Camerino",
    "camerino": "Università di Camerino",
    # Ancona / Marche
    "università politecnica delle marche": "Università Politecnica delle Marche",
    # Perugia
    "università di perugia": "Università di Perugia",
    "università degli studi di perugia": "Università di Perugia",
    # Tuscia
    "università della tuscia": "Università della Tuscia",
    # Urbino
    "università di urbino": "Università di Urbino",
    # Sapienza Roma
    "sapienza università di roma": "Sapienza - Università di Roma",
    "la sapienza università di roma": "Sapienza - Università di Roma",
    "sapienza - università di roma": "Sapienza - Università di Roma",
    "università di roma la sapienza": "Sapienza - Università di Roma",
    "università di roma \"la sapienza\"": "Sapienza - Università di Roma",
    "università di roma — la sapienza": "Sapienza - Università di Roma",
    "università di roma sapienza": "Sapienza - Università di Roma",
    "università la sapienza": "Sapienza - Università di Roma",
    "sapienza university of rome": "Sapienza - Università di Roma",
    # Tor Vergata
    "università di roma tor vergata": "Università di Roma Tor Vergata",
    "università di roma \"tor vergata\"": "Università di Roma Tor Vergata",
    "università degli studi di roma tor vergata": "Università di Roma Tor Vergata",
    "roma tor vergata": "Università di Roma Tor Vergata",
    # Campus Bio-Medico Roma
    "università campus bio-medico di roma": "Università Campus Bio-Medico di Roma",
    # L'Aquila
    "università de l'aquila": "Università dell'Aquila",
    "università degli studi dell'aquila": "Università dell'Aquila",
    "università dell'aquila": "Università dell'Aquila",
    # Napoli Federico II
    "università di napoli federico ii": "Università di Napoli Federico II",
    "università degli studi di napoli federico ii": "Università di Napoli Federico II",
    "università degli studi federico ii": "Università di Napoli Federico II",
    # Napoli Parthenope
    "università di napoli parthenope": "Università di Napoli Parthenope",
    # Campania Vanvitelli
    "università degli studi della campania \"luigi vanvitelli\"": "Università degli Studi della Campania Luigi Vanvitelli",
    "università degli studi della campania luigi vanvitelli": "Università degli Studi della Campania Luigi Vanvitelli",
    # Cassino
    "università di cassino": "Università di Cassino",
    # Benevento / Sannio
    "università del sannio": "Università del Sannio",
    # Salerno
    "università di salerno": "Università di Salerno",
    "univesità di salerno": "Università di Salerno",  # typo
    "univesità di salerno": "Università di Salerno",
    "univesità di salerno ": "Università di Salerno",
    # Bari
    "università di bari": "Università di Bari",
    "università degli studi di bari": "Università di Bari",
    # Foggia
    "università di foggia": "Università di Foggia",
    # Messina
    "università di messina": "Università di Messina",
    "università degli studi di messina": "Università di Messina",
    # Catania
    "università di catania": "Università di Catania",
    "università degli studi di catania": "Università di Catania",
    "catania": "Università di Catania",
    # Palermo
    "università di palermo": "Università di Palermo",
    "università degli studi di palermo": "Università di Palermo",
    # Catanzaro
    "università di catanzaro": "Università di Catanzaro",
    # Chieti-Pescara
    "università di chieti-pescara": "Università di Chieti-Pescara",
    # Calabria
    "università della calabria": "Università della Calabria",
    # Cagliari
    "università di cagliari": "Università di Cagliari",
    # Ospedale San Martino Genova
    "irccs ospedale policlinico san martino": "IRCCS Ospedale Policlinico San Martino",
    # CNR
    "cnr": "CNR",
    "consiglio nazionale delle ricerche": "CNR",
    "cnr-consiglio nazionale delle ricerche": "CNR",
    "cnr - consiglio nazionale delle ricerche": "CNR",
    "consiglio nazionale delle ricerche, istituto per le applicazioni del calcolo": "CNR",
    # International / other
    "technical university of munich": "Technical University of Munich",
}

ROLE_LABELS: dict[str, str] = {
    # occupation-level (organizational)
    "member": "Membro",
    "direttivo": "Direttivo",
    "comitato": "Comitato",
    "smm": "Web & Social",
    # academic role — canonical forms
    "phd": "PhD",
    "phd student": "PhD",
    "dottorando": "PhD",
    "post-doc": "Post-Doc",
    "postdoc": "Post-Doc",
    "post doc": "Post-Doc",
    "researcher": "Post-Doc",
    "ricercatore": "Post-Doc",
    "ricercatore sanitario": "Ricercatore Sanitario",
    "ricercatore sanitario ": "Ricercatore Sanitario",
    "rtda": "RTDa",
    "rtdb": "RTDb",
    "assegnista di ricerca": "Assegnista",
    "assegnista": "Assegnista",
    "borsista": "Borsista",
    "tesista": "Tesista",
    "studente": "Studente",
    "collaboratore tecnico": "Collaboratore Tecnico",
    "collaboratore tecnico ente di ricerca": "Collaboratore Tecnico",
    "associato": "Associato",
    # combined / ambiguous — map to most specific component
    "tra phd e postdoc": "Post-Doc",
    "post-doc, tecnicamente: ricercatore sanitario": "Ricercatore Sanitario",
    "post-doc, assegnista di ricerca": "Post-Doc",
}

# Patterns for extracting the primary role from free-text / combined entries
_ROLE_PRIORITY = [
    (r"\brtd[ab]\b",                          "RTDa"),
    (r"\bpost.?doc\b",                         "Post-Doc"),
    (r"\bricercatore\s+sanitario\b",           "Ricercatore Sanitario"),
    (r"\bricercatore\b",                       "Post-Doc"),
    (r"\bphd\b",                               "PhD"),
    (r"\bborsis",                              "Borsista"),
    (r"\bassegnis",                            "Assegnista"),
    (r"\btesis",                               "Tesista"),
    (r"\bstudente\b",                          "Studente"),
    (r"\bcollab",                              "Collaboratore Tecnico"),
    (r"\bassociat",                            "Associato"),
]


def normalize_affiliation(raw: str) -> str:
    key = raw.strip().lower()
    return AFFILIATION_ALIASES.get(key, raw.strip())


def normalize_role(raw: str) -> str:
    """Normalize an occupation/role string to a canonical label."""
    key = raw.strip().lower()
    if key in ROLE_LABELS:
        return ROLE_LABELS[key]
    # Try priority regex patterns for free-text or combined entries
    for pattern, label in _ROLE_PRIORITY:
        if re.search(pattern, key, re.IGNORECASE):
            return label
    return raw.strip().title()


def normalize_academic_role(raw: str) -> str:
    """Normalize a raw `role` field value (academic title) to a canonical label.

    Handles combined entries like 'PhD, Borsista' or
    'Post-Doc, Tecnicamente: Ricercatore Sanitario' by extracting the
    primary role using priority rules.
    """
    raw = (raw or "").strip()
    if not raw:
        return "N/D"
    key = raw.lower()
    # Exact match first
    if key in ROLE_LABELS:
        return ROLE_LABELS[key]
    # Priority regex sweep (covers combined / long-form entries)
    for pattern, label in _ROLE_PRIORITY:
        if re.search(pattern, key, re.IGNORECASE):
            return label
    return raw.title()


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    script_dir = Path(__file__).parent
    project_root = script_dir.parent.parent  # data/people/ → data/ → project root

    out_dir = project_root / "src" / "data"
    out_dir.mkdir(parents=True, exist_ok=True)
    out_file = out_dir / "stats.json"

    yaml_files = list(script_dir.glob("*.yaml"))
    print(f"Reading {len(yaml_files)} YAML files …")

    people = []
    for f in yaml_files:
        with open(f, encoding="utf-8") as fh:
            content = fh.read()
            # strip leading --- front-matter marker if present
            content = re.sub(r"^---\s*\n", "", content)
            try:
                data = yaml.safe_load(content)
            except yaml.YAMLError as e:
                print(f"  [WARN] Could not parse {f.name}: {e}")
                continue
            if data and isinstance(data, dict) and data.get("name"):
                people.append(data)

    total = len(people)
    young_count = sum(1 for p in people if p.get("level") == "young")
    senior_count = sum(1 for p in people if p.get("level") == "senior")

    # Young by academic role (role field)
    young_role: Counter = Counter()
    for p in people:
        if p.get("level") == "young":
            raw = (p.get("role") or "").strip()
            young_role[normalize_academic_role(raw)] += 1

    # Young by organizational occupation
    young_occ: Counter = Counter()
    for p in people:
        if p.get("level") == "young":
            raw = (p.get("occupation") or "Altro").strip()
            for part in raw.split(","):
                young_occ[normalize_role(part.strip())] += 1

    # Cities (use location field directly — already normalized by csv_to_yaml)
    city_counter: Counter = Counter()
    for p in people:
        loc = (p.get("location") or "").strip()
        if loc:
            city_counter[loc] += 1

    # Top affiliations (normalized)
    aff_counter: Counter = Counter()
    for p in people:
        raw_aff = (p.get("affiliation") or "").strip()
        if raw_aff:
            aff_counter[normalize_affiliation(raw_aff)] += 1

    def top(counter: Counter, n: int = 10) -> list[dict]:
        return [{"label": k, "count": v} for k, v in counter.most_common(n)]

    stats = {
        "total": total,
        "young": young_count,
        "senior": senior_count,
        "youngByRole": top(young_role, 12),
        "youngByOccupation": top(young_occ, 12),
        "topCities": top(city_counter, 10),
        "topAffiliations": top(aff_counter, 10),
    }

    with open(out_file, "w", encoding="utf-8") as fh:
        json.dump(stats, fh, ensure_ascii=False, indent=2)

    print(f"\nStats written to {out_file.relative_to(project_root)}")
    print(f"  Total:  {total}")
    print(f"  Young:  {young_count}")
    print(f"  Senior: {senior_count}")
    print(f"\n  Young by academic role:")
    for row in stats["youngByRole"]:
        print(f"    {row['label']:<30} {row['count']}")
    print(f"\n  Young by occupation:")
    for row in stats["youngByOccupation"]:
        print(f"    {row['label']:<30} {row['count']}")
    print(f"\n  Top cities:")
    for row in stats["topCities"]:
        print(f"    {row['label']:<30} {row['count']}")
    print(f"\n  Top affiliations:")
    for row in stats["topAffiliations"]:
        print(f"    {row['label']:<30} {row['count']}")


if __name__ == "__main__":
    main()
