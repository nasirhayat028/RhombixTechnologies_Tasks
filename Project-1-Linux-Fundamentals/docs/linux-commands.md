# Linux Command Reference

This document is the categorized command reference for **Rhombix Technologies — Project 1: Linux Fundamentals**. It captures the commands practiced during the project, why each one matters, and — where the repository contains a concrete artifact — exactly where that command is actually used.

Two commands in this project are backed by an executable script rather than a description: `pwd`, `whoami`, `free`, `df`, and `uname` are all called directly by [`scripts/system-info.sh`](../scripts/system-info.sh) (see [bash-scripting.md](bash-scripting.md)). Everything else below was practiced interactively in the terminal, per [`linux-practice/notes.txt`](../linux-practice/notes.txt) and [`linux-practice/linux-commands.txt`](../linux-practice/linux-commands.txt).

---

## 1. Navigation

| Command | Purpose | Example |
|---|---|---|
| `pwd` | Prints the current working directory (absolute path). | `pwd` → `/home/nasir/Desktop/Rhombix_Linux_Task` |
| `ls` | Lists the contents of a directory. | `ls linux-practice/` |
| `ls -la` | Lists contents in long format, including hidden files (dotfiles). | `ls -la` |
| `cd` | Changes the current working directory. | `cd scripts/` |
| `find` | Searches a directory tree for files/directories matching a pattern. | `find . -name "*.sh"` |

**`find` in detail**

- **Purpose:** locate files by name, type, size, or modification time without knowing the exact path.
- **Syntax:** `find <path> -name "<pattern>"`
- **Example:** `find . -name "*.sh"` → lists every shell script in the project (`linux-practice/hello.sh`, `scripts/system-info.sh`).
- **Expected behavior:** prints matching paths, one per line; prints nothing if no match exists.
- **DevOps relevance:** `find` is the basis for cleanup jobs, log rotation, and CI steps that need to locate build artifacts (e.g. `find . -name "*.log" -mtime +7 -delete`) without hardcoding paths.

**Used in this project:** navigating between `linux-practice/`, `scripts/`, and `docs/` while creating and testing files.

---

## 2. File & Directory Management

| Command | Purpose | Example |
|---|---|---|
| `mkdir` | Creates a new directory. | `mkdir scripts` |
| `touch` | Creates an empty file, or updates a file's timestamp if it already exists. | `touch notes.txt` |
| `cp` | Copies a file or directory. | `cp notes.txt notes_backup.txt` |
| `mv` | Moves or renames a file or directory. | `mv notes_backup.txt linux-practice/` |
| `rm` | Deletes a file (`-r` for directories). | `rm notes_backup.txt` |

**Used in this project:** `mkdir` created the `linux-practice/`, `scripts/`, and `docs/` directories that structure this repository; `touch`, `cp`, and `mv` were used while drafting and organizing the notes and reference files.

---

## 3. File Viewing & Editing

| Command | Purpose | Example |
|---|---|---|
| `cat` | Prints an entire file's contents to the terminal. | `cat linux-practice/notes.txt` |
| `nano` | Opens a file in a simple, beginner-friendly terminal text editor. | `nano linux-practice/notes.txt` |
| `less` | Views a file one screen at a time (useful for files longer than the terminal). | `less README.md` |
| `head` | Prints the first lines of a file (default: 10). | `head -5 linux-practice/linux-commands.txt` |
| `tail` | Prints the last lines of a file (default: 10). | `tail -5 linux-practice/linux-commands.txt` |
| `wc` | Counts lines, words, and bytes in a file. | `wc -l linux-practice/notes.txt` |
| `diff` | Compares two files line by line and shows the differences. | `diff notes.txt notes_backup.txt` |

**`grep` in detail**

- **Purpose:** search inside file contents for lines matching a pattern, instead of just listing filenames.
- **Syntax:** `grep "<pattern>" <file>`
- **Example:** `grep "chmod" docs/permissions.md` → returns every line mentioning `chmod`.
- **Expected behavior:** prints matching lines; exits with a non-zero status if nothing matches (useful in scripts for conditional checks).
- **DevOps relevance:** `grep` is used constantly to filter logs (`grep ERROR app.log`), check running processes (`ps aux | grep nginx`), and search configuration files during troubleshooting — one of the highest-value commands in daily operations work.

**Used in this project:** `nano` was the editor used to create and edit the `.txt` and `.md` files in this repository; `cat`, `head`, and `tail` were used to review file contents while writing documentation.

---

## 4. Permissions & Ownership

| Command | Purpose | Example |
|---|---|---|
| `ls -l` | Shows permissions, ownership, size, and modification time for files. | `ls -l scripts/` |
| `chmod` | Changes a file's permission bits (read/write/execute). | `chmod 755 scripts/system-info.sh` |
| `chown` | Changes a file's owner and/or group. | `chown user:group file.txt` |

Full explanation with real examples from this repository (including a verified `ls -l` capture of both scripts) is in [permissions.md](permissions.md).

**Used in this project:** `chmod 755` was applied to both `linux-practice/hello.sh` and `scripts/system-info.sh` so they could be executed directly (`./hello.sh`) instead of only via `bash hello.sh`.

---

## 5. Process Management

| Command | Purpose | Example |
|---|---|---|
| `ps` | Lists currently running processes for the current shell/user. | `ps` |
| `ps aux` | Lists all running processes on the system, with detailed columns (user, CPU%, memory%, command). | `ps aux` |
| `top` | Shows a live, continuously updating view of running processes and resource usage. | `top` |

**DevOps relevance:** identifying a runaway or hung process (`top`), then confirming its exact PID and command line (`ps aux`) before signaling or killing it, is a routine first step in incident response on any Linux server or container host.

---

## 6. System Resources

| Command | Purpose | Example |
|---|---|---|
| `free -h` | Shows memory (RAM) usage in human-readable units. | `free -h` |
| `df -h` | Shows disk space usage per mounted filesystem, human-readable. | `df -h /` |
| `du -sh` | Shows the total size of a directory. | `du -sh linux-practice/` |
| `lscpu` | Shows CPU architecture and core information. | `lscpu` |

Full explanation, plus what `system-info.sh` actually outputs, is in [system-monitoring.md](system-monitoring.md).

**Used in this project:** `free -h` and `df -h /` are both called directly by `scripts/system-info.sh`.

---

## 7. Package Management

| Command | Purpose | Example |
|---|---|---|
| `sudo apt update` | Refreshes the local index of available packages and versions from configured repositories. | `sudo apt update` |
| `sudo apt install <pkg>` | Installs a package (and its dependencies) from the repository index. | `sudo apt install curl` |
| `apt show <pkg>` | Displays metadata about a package (version, description, dependencies) without installing it. | `apt show curl` |
| `dpkg -s <pkg>` | Queries the low-level Debian package database directly to confirm a package is installed. | `dpkg -s curl` |

Full explanation of the update → install → verify workflow is in [package-management.md](package-management.md).

---

## 8. Shell Scripting

Covered in detail in [bash-scripting.md](bash-scripting.md), which documents both `linux-practice/hello.sh` and `scripts/system-info.sh` line by line.
