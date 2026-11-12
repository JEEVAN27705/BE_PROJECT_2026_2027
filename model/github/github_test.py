
from github import Github
from pathlib import Path

# Find the model-evaluation directory
EXPERIMENT_DIR = Path(__file__).resolve().parents[1]

# GitHub repository
github = Github()
repo = github.get_repo("JEEVAN27705/2048-Game")

# Local repository destination
output_dir = EXPERIMENT_DIR / "repositories" / repo.name

# Directories to skip
SKIP_DIRS = {
    ".git",
    "node_modules",
    "venv",
    "__pycache__",
    "dist",
    "build",
}

# File extensions to skip
SKIP_EXTENSIONS = {
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp",
    ".ico",
    ".mp3",
    ".mp4",
    ".pdf",
    ".zip",
}


def fetch_files(path=""):
    contents = repo.get_contents(path)

    for item in contents:

        if item.type == "dir":

            if item.name in SKIP_DIRS:
                print(f"[SKIP DIR] {item.path}")
                continue

            fetch_files(item.path)

        elif item.type == "file":

            extension = Path(item.name).suffix.lower()

            if extension in SKIP_EXTENSIONS:
                print(f"[SKIP FILE] {item.path}")
                continue

            try:
                content = item.decoded_content.decode("utf-8")

                # Preserve the repository's folder structure
                local_file = output_dir / item.path

                local_file.parent.mkdir(
                    parents=True,
                    exist_ok=True
                )

                local_file.write_text(
                    content,
                    encoding="utf-8"
                )

                print(
                    f"[SAVED] {item.path} "
                    f"({len(content)} characters)"
                )

            except UnicodeDecodeError:
                print(f"[SKIP BINARY] {item.path}")

            except Exception as error:
                print(f"[ERROR] {item.path}")
                print(f"Reason: {error}")


print("Repository:", repo.full_name)
print("Saving to:", output_dir)
print("\nReading repository...\n")

fetch_files()

print("\nRepository download completed.")
