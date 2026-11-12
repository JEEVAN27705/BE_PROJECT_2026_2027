
from pathlib import Path
import json
from tree_sitter_language_pack import get_parser


EXPERIMENT_DIR = Path(__file__).resolve().parents[1]

REPOSITORY_DIR = (
    EXPERIMENT_DIR / "repositories" / "2048-Game"
)


EXTENSION_TO_LANGUAGE = {
    ".py": "python",
    ".js": "javascript",
    ".jsx": "javascript",
    ".ts": "typescript",
    ".tsx": "tsx",
    ".java": "java",
    ".c": "c",
    ".h": "c",
    ".cpp": "cpp",
    ".cc": "cpp",
    ".cxx": "cpp",
    ".hpp": "cpp",
    ".cs": "c_sharp",
    ".go": "go",
    ".rs": "rust",
    ".rb": "ruby",
    ".php": "php",
    ".swift": "swift",
    ".kt": "kotlin",
    ".kts": "kotlin",
    ".dart": "dart",
    ".scala": "scala",
    ".lua": "lua",
    ".r": "r",
    ".sh": "bash",
    ".bash": "bash",
    ".sql": "sql",
    ".html": "html",
    ".css": "css",
    ".scss": "scss",
    ".vue": "vue",
    ".svelte": "svelte",
}


SKIP_DIRS = {
    ".git",
    "node_modules",
    "venv",
    "__pycache__",
    "dist",
    "build",
}


SKIP_FILES = {
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
}


def detect_language(file_path):
    return EXTENSION_TO_LANGUAGE.get(
        file_path.suffix.lower()
    )


def get_node_name(node, content):
    """
    Find a meaningful name for a code structure.

    Supports:
    - Function declarations
    - Classes
    - JavaScript variable declarations
    - React functions declared using useCallback()
    """

    name_node = node.child_by_field_name("name")

    if name_node is not None:
        return name_node.text.decode(
            "utf-8",
            errors="replace"
        )

    if node.type in {
        "lexical_declaration",
        "variable_declaration",
    }:

        for child in node.named_children:

            if child.type == "variable_declarator":

                name_node = child.child_by_field_name(
                    "name"
                )

                if name_node is not None:
                    return name_node.text.decode(
                        "utf-8",
                        errors="replace"
                    )

    return None


def looks_semantic(node):
    """
    Identify meaningful code structures.

    Extract functions, classes, methods, components,
    and functions declared inside variable declarations.
    """

    node_type = node.type.lower()

    semantic_node_types = {
        # Functions and methods
        "function",
        "function_declaration",
        "function_definition",
        "function_item",
        "method",
        "method_definition",
        "arrow_function",

        # Classes and OOP
        "class",
        "class_declaration",
        "class_definition",
        "constructor",

        # Interfaces and types
        "interface",
        "interface_declaration",
        "type_declaration",
        "struct",
        "struct_declaration",
        "enum",
        "enum_declaration",

        # Other structures
        "module",
        "namespace",
        "trait",
        "impl",
        "protocol",
        "record",
        "component",
    }

    if node_type in semantic_node_types:
        return True

    # JavaScript and TypeScript variable declarations.
    #
    # Examples:
    # const App = () => {}
    # const login = function() {}
    # const handleKeyDown = useCallback(() => {}, [])

    if node_type in {
        "lexical_declaration",
        "variable_declaration",
    }:

        for child in node.named_children:

            if child.type == "variable_declarator":

                for grandchild in child.named_children:

                    if grandchild.type in {
                        "function",
                        "arrow_function",
                        "function_expression",
                        "call_expression",
                    }:
                        return True

    return False


def extract_candidates(
    node,
    content,
    language,
    file_path,
    depth=0,
    parent=None,
):
    candidates = []

    is_semantic = looks_semantic(node)

    name = None

    if is_semantic:

        name = get_node_name(
            node,
            content
        )

        # Skip anonymous nested functions.
        # Keep their named variable declaration instead.

        if not (
            node.type in {
                "arrow_function",
                "function",
                "function_expression",
            }
            and name is None
            and parent is not None
        ):

            candidates.append({
                "file_path": str(file_path),
                "language": language,
                "node_type": node.type,
                "name": name,
                "start_line": node.start_point.row + 1,
                "end_line": node.end_point.row + 1,
                "depth": depth,
                "parent": parent,
                "content": node.text.decode(
                    "utf-8",
                    errors="replace"
                ),
            })

    current_name = (
        name
        if is_semantic and name is not None
        else parent
    )

    for child in node.named_children:

        candidates.extend(
            extract_candidates(
                child,
                content,
                language,
                file_path,
                depth + 1,
                current_name,
            )
        )

    return candidates


def process_file(file_path):

    language = detect_language(
        file_path
    )

    if language is None:
        print(
            f"[SKIP LANGUAGE] {file_path}"
        )
        return []

    try:
        parser = get_parser(language)

    except Exception as error:
        print(
            f"[SKIP PARSER] "
            f"{file_path} "
            f"({error})"
        )
        return []

    try:
        content = file_path.read_text(
            encoding="utf-8"
        )

    except UnicodeDecodeError:
        print(
            f"[SKIP BINARY] {file_path}"
        )
        return []

    print(
        f"[PARSING] {file_path}"
    )

    tree = parser.parse(
        content.encode("utf-8")
    )

    return extract_candidates(
        tree.root_node,
        content,
        language,
        file_path,
    )


def process_repository():

    all_candidates = []

    for file_path in REPOSITORY_DIR.rglob("*"):

        if not file_path.is_file():
            continue

        if any(
            directory in file_path.parts
            for directory in SKIP_DIRS
        ):
            continue

        if file_path.name in SKIP_FILES:
            continue

        candidates = process_file(
            file_path
        )

        all_candidates.extend(
            candidates
        )

    return all_candidates


# Process the complete repository

candidates = process_repository()


print()
print("=" * 60)

print(
    "TOTAL SEMANTIC CANDIDATES:",
    len(candidates)
)

print("=" * 60)


for index, candidate in enumerate(
    candidates[:30],
    start=1
):

    print()

    print(
        f"[{index}] "
        f"{candidate['node_type']}"
    )

    print(
        "FILE:",
        candidate["file_path"]
    )

    print(
        "LANGUAGE:",
        candidate["language"]
    )

    print(
        "NAME:",
        candidate["name"]
    )

    print(
        "LINES:",
        f"{candidate['start_line']}-"
        f"{candidate['end_line']}"
    )

    print(
        "DEPTH:",
        candidate["depth"]
    )

    print(
        "PARENT:",
        candidate["parent"]
    )

    print(
        "SIZE:",
        len(candidate["content"])
    )

    print("-" * 60)

    print(
        candidate["content"][:300]
    )


# Save semantic candidates into JSON

OUTPUT_DIR = (
    Path(__file__).resolve().parent / "output"
)

OUTPUT_DIR.mkdir(
    parents=True,
    exist_ok=True
)

output_file = (
    OUTPUT_DIR / "semantic_candidates.json"
)

with open(
    output_file,
    "w",
    encoding="utf-8"
) as file:

    json.dump(
        candidates,
        file,
        indent=4,
        ensure_ascii=False
    )


print(
    "\nSemantic candidates saved to:",
    output_file
)
