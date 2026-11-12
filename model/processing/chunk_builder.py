
import json
from pathlib import Path

PROCESSING_DIR = Path(__file__).resolve().parent

INPUT_FILE = PROCESSING_DIR / "output" / "semantic_candidates.json"
OUTPUT_FILE = PROCESSING_DIR / "output" / "code_chunks.json"


def load_candidates():

    with open(INPUT_FILE, "r", encoding="utf-8") as file:
        candidates = json.load(file)

    return candidates


def build_chunks(candidates):

    chunks = []

    for index, candidate in enumerate(candidates, start=1):

        chunk = {
            "chunk_id": index,
            "file_path": candidate["file_path"],
            "language": candidate["language"],
            "node_type": candidate["node_type"],
            "name": candidate["name"],
            "start_line": candidate["start_line"],
            "end_line": candidate["end_line"],
            "depth": candidate["depth"],
            "parent": candidate["parent"],
            "content": candidate["content"]
        }

        chunks.append(chunk)

    return chunks


def save_chunks(chunks):

    OUTPUT_FILE.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    with open(OUTPUT_FILE, "w", encoding="utf-8") as file:

        json.dump(
            chunks,
            file,
            indent=4,
            ensure_ascii=False
        )

    print("Code chunks saved successfully!")


def main():

    candidates = load_candidates()

    chunks = build_chunks(candidates)

    save_chunks(chunks)

    print("Total candidates:", len(candidates))
    print("Total code chunks:", len(chunks))


if __name__ == "__main__":
    main()
