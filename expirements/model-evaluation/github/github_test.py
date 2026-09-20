from github import Github


github = Github()

repo = github.get_repo("JEEVAN27705/2048-Game")


def fetch_files(path=""):
    contents = repo.get_contents(path)

    for item in contents:

        if item.type == "dir":
            print(f"\n[DIR]  {item.path}")

            # Go inside this directory
            fetch_files(item.path)

        elif item.type == "file":
            print(f"[FILE] {item.path}")


print("Repository:", repo.full_name)
print("\nComplete repository structure:\n")

fetch_files()