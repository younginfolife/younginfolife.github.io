import csv
import sys
import yaml


def csv_to_yaml(csv_file):
    with open(csv_file, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            cleaned_row = {k.strip().rstrip(":"): v.strip() for k, v in row.items()}
            surname = cleaned_row.get("Cognome", "").replace(" ", "").lower()
            name = cleaned_row.get("Nome", "").replace(" ", "").lower()
            if not surname or not name:
                continue
            filename = f"{surname}{name}.yaml"
            yaml_data = {
                "name": f"{cleaned_row.get('Nome', '')} {cleaned_row.get('Cognome', '')}".strip(),
                "email": cleaned_row.get(
                    "Email (preferibilmente quella istituzionale)", ""
                ),
                "location": cleaned_row.get(
                    "Università di affiliazione (Università di ..)", ""
                ),
                "level": cleaned_row.get("level", ""),
                "occupation": cleaned_row.get("occupation", ""),
            }
            with open(filename, "w", encoding="utf-8") as out:
                out.write("---\n")
                yaml.dump(yaml_data, out, allow_unicode=True, sort_keys=False)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python csv_to_yaml.py <input.csv>")
        sys.exit(1)
    csv_to_yaml(sys.argv[1])
