from github import Github
from pathlib import Path

github = Github()

repo = github.get_repo("JEEVAN27705/2048-Game")

# Where the repository will be saved locally
output_dir = Path("expirements/model-evaluation/repositories") / repo.name

# Folders we don't want to process
SKIP_DIRS = {
    ".git",
    "node_modules",
    "venv",
    "__pycache__",
    "dist",
    "build",
}

# File extensions we don't want to process
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

        # Skip unwanted directories
        if item.type == "dir":

            if item.name in SKIP_DIRS:
                print(f"[SKIP DIR] {item.path}")
                continue

            fetch_files(item.path)

        # Process files
        elif item.type == "file":

            extension = Path(item.name).suffix.lower()

            if extension in SKIP_EXTENSIONS:
                print(f"[SKIP FILE] {item.path}")
                continue

            try:
                file_content = repo.get_contents(item.path)

                content = file_content.decoded_content.decode("utf-8")

                # Create the same directory structure locally
                local_file = output_dir / item.path
                local_file.parent.mkdir(
                    parents=True,
                    exist_ok=True
                )

                # Save the file
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

            except Exception as e:
                print(f"[ERROR] {item.path}")
                print(f"Reason: {e}")


print("Repository:", repo.full_name)
print("Saving to:", output_dir)
print("\nReading repository...\n")

fetch_files()

print("\nRepository download completed.")