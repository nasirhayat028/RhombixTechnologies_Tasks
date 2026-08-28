# Rhombix Technologies — Project 1: Linux Fundamentals

## Overview

This project was completed as part of the **Rhombix Technologies internship**, under the DevOps track. The internship offered two possible submissions — *Linux Fundamentals & Command-Line Practice* and *Version Control with Git & GitHub* — and this repository is the **Linux Fundamentals** submission.

The goal was not to build an application, but to build practical, hands-on fluency with the Linux command line: the same skill set every DevOps, SRE, and backend engineering role assumes as a baseline before touching servers, containers, or CI/CD pipelines.

## Project Objective

Practice and demonstrate core Linux command-line operations on an Ubuntu system, specifically:

- File and directory navigation
- Creating, editing, and organizing files and directories
- Managing file permissions
- Checking system resources (memory, disk, CPU)
- Installing and managing software packages
- Writing basic Bash scripts

## Learning Objectives

By completing this project, the following Linux concepts were practiced:

1. Navigating the filesystem and locating files (`pwd`, `ls`, `cd`, `find`)
2. Creating and organizing directories and files (`mkdir`, `touch`, `cp`, `mv`, `rm`)
3. Viewing, editing, and searching file content (`cat`, `nano`, `less`, `head`, `tail`, `grep`, `wc`, `diff`)
4. Understanding and modifying the Linux permission model (`ls -l`, `chmod`, `chown`)
5. Inspecting running processes (`ps`, `top`)
6. Monitoring system resources (`free`, `df`, `du`, `lscpu`)
7. Managing software packages on Ubuntu with APT (`apt update`, `apt install`, `apt show`, `dpkg`)
8. Writing and executing Bash scripts

## Environment

Verified directly on the machine this project was built on:

| Item | Value |
|---|---|
| Operating System | Ubuntu 24.04.4 LTS |
| Kernel | Linux 7.0.0-30-generic |
| Shell | Bash 5.2.21 |
| User | nasir |

## Skills Demonstrated

| Skill | How it's demonstrated |
|---|---|
| Filesystem navigation | Practiced via `pwd`, `ls`, `cd`, `find`; `pwd` is also called live inside `scripts/system-info.sh`. |
| Directory management | The project's own folder structure (`linux-practice/`, `scripts/`, `docs/`) was built with `mkdir`. |
| File management | `touch`, `cp`, `mv` used while creating and organizing every file in this repository. |
| File editing | All `.txt`/`.md` files were written and edited with `nano`. |
| File viewing | `cat`, `head`, `tail` used to review file contents during development. |
| Searching | `grep` and `find` practiced against project files (see [docs/linux-commands.md](docs/linux-commands.md)). |
| Permissions | Concretely applied: both shell scripts are set to `755` (`rwxr-xr-x`) so they run directly — verified with `ls -l` (see [docs/permissions.md](docs/permissions.md)). |
| Process management | `ps` / `top` usage documented in the command reference. |
| System resource monitoring | `free -h` and `df -h /` are called live inside `scripts/system-info.sh`; `du`, `lscpu` documented in the reference. |
| Package management | The `apt update` → `apt install` → verify (`apt show` / `dpkg -s`) workflow documented in [docs/package-management.md](docs/package-management.md). |
| Bash scripting | Two working, executable scripts: `linux-practice/hello.sh` and `scripts/system-info.sh`. |

## Project Structure

```text
Project-1-Linux-Fundamentals/
├── README.md                    # This file — project overview and documentation index
├── docs/                        # Detailed, topic-by-topic reference documentation
│   ├── linux-commands.md        # Categorized command reference
│   ├── permissions.md           # Linux permission model, explained with real examples
│   ├── system-monitoring.md     # CPU/memory/disk/process monitoring commands
│   ├── package-management.md    # APT package workflow
│   └── bash-scripting.md        # Line-by-line explanation of both scripts
├── linux-practice/              # Hands-on practice artifacts
│   ├── notes.txt                # Short project notes
│   ├── linux-commands.txt       # Raw list of commands practiced
│   └── hello.sh                 # First practice script (executable, 755)
└── scripts/
    └── system-info.sh           # System information script (executable, 755)
```

## Practical Exercises

The concrete, repository-tracked artifacts from this project are:

1. **`linux-practice/hello.sh`** — a minimal "hello world" style script, used to confirm the shebang line, execute permission, and Bash interpreter were all working correctly before writing anything more complex.
2. **`scripts/system-info.sh`** — a working system-information script that reports the current user, working directory, Ubuntu version, kernel version, memory usage, and disk usage, by calling real commands (`whoami`, `pwd`, `lsb_release -ds`, `uname -r`, `free -h`, `df -h /`).
3. **`linux-practice/notes.txt`** and **`linux-practice/linux-commands.txt`** — the practice notes and command list kept while working through the rest of the topics (navigation, file management, permissions, process/resource monitoring, package management) directly in the terminal.

Full explanations of both scripts — purpose, every line, permissions, and how to run them — are in [docs/bash-scripting.md](docs/bash-scripting.md).

## Linux Commands

The full categorized command reference lives in **[docs/linux-commands.md](docs/linux-commands.md)** — navigation, file management, file viewing/editing, permissions, processes, system resources, and package management, each with purpose, syntax, and an example.

## Permissions

Linux permissions follow the `owner / group / others` model, each with `read (4) / write (2) / execute (1)` rights:

```text
r = 4
w = 2
x = 1

755 = rwxr-xr-x   → owner: rwx, group: r-x, others: r-x
644 = rw-r--r--   → owner: rw-, group: r--, others: r--
```

This project applies `755` to both `.sh` scripts so they can be executed directly (`./hello.sh`) — confirmed for real via `ls -l`:

```text
-rwxr-xr-x 1 nasir nasir 112 Aug 28 08:58 linux-practice/hello.sh
-rwxr-xr-x 1 nasir nasir 409 Aug 28 09:07 scripts/system-info.sh
```

Full explanation (including why `755` specifically, and what changes if the execute bit is missing) is in **[docs/permissions.md](docs/permissions.md)**.

## Bash Scripts

| Script | Purpose | Run with |
|---|---|---|
| `linux-practice/hello.sh` | Confirms the scripting setup works. | `./linux-practice/hello.sh` |
| `scripts/system-info.sh` | Prints live user, directory, OS, kernel, memory, and disk information. | `./scripts/system-info.sh` |

Both require the execute bit (already set — see Permissions above). Full line-by-line documentation is in **[docs/bash-scripting.md](docs/bash-scripting.md)**.

## System Monitoring

`scripts/system-info.sh` demonstrates live system inspection using `free -h` (memory) and `df -h /` (disk). `du` (directory size), `lscpu` (CPU info), `ps`, and `top` (process inspection) were practiced at the terminal and are documented with purpose and examples in **[docs/system-monitoring.md](docs/system-monitoring.md)**.

## Package Management

The standard Ubuntu APT workflow practiced in this project:

```bash
sudo apt update          # refresh the package index
sudo apt install curl    # install a package
apt show curl            # inspect package metadata
dpkg -s curl             # confirm it's actually installed
```

Full explanation of why each step matters (and how this maps to Docker/CI provisioning) is in **[docs/package-management.md](docs/package-management.md)**.

## Learning Outcomes

Completing this project built practical, muscle-memory-level fluency with:

- Confidently navigating and organizing a Linux filesystem from the terminal, without a GUI file manager.
- Reading and reasoning about `ls -l` permission strings, and understanding *why* `chmod 755` is the standard mode for an executable script rather than a memorized incantation.
- Knowing which command to reach for when diagnosing memory, disk, or process problems (`free`, `df`, `ps`/`top`).
- Understanding the Ubuntu package-management lifecycle (update → install → verify) rather than just running `apt install` on faith.
- Writing a Bash script from scratch — shebang, sequential commands, and making it directly executable — as the foundation for anything more advanced (provisioning scripts, CI steps, entrypoints).

## DevOps Relevance

Every skill in this project maps directly onto day-to-day DevOps work:

- **Servers:** SSH access to a Linux server *is* a terminal — navigation, file editing, and permissions are the absolute minimum to operate one.
- **Docker:** Dockerfiles are built from the same primitives practiced here — `apt-get install` for base-image dependencies, `chmod +x` on entrypoint scripts, `du`/`df` when an image or volume grows unexpectedly large.
- **Kubernetes:** `kubectl exec` drops you into a container shell where the same navigation, `ps`, and resource-inspection commands are how you debug a misbehaving pod from the inside.
- **CI/CD:** pipeline steps are shell commands; a script that lost its execute bit (exactly what `docs/permissions.md` explains) is one of the most common real-world causes of a pipeline failing on a checked-out script.
- **Monitoring:** `free`, `df`, `ps`/`top` are the manual, first-principles version of what tools like Prometheus/Grafana or `htop` automate and visualize — understanding the raw commands makes those dashboards make sense.
- **Troubleshooting:** `grep` through logs, `find` for a misplaced config file, `df -h` for a full disk — these are the first three commands run in almost any Linux incident, before reaching for anything more sophisticated.
- **Production environments:** package management discipline (know what's installed, verify it, don't assume) is exactly the mindset needed when provisioning or patching production hosts.

## Conclusion

This project delivers a focused, verifiable demonstration of Linux command-line fundamentals: filesystem navigation, file and directory management, permissions, system resource monitoring, package management, and Bash scripting — the same baseline skill set expected before working with servers, containers, or CI/CD pipelines in a DevOps role. Every command and script referenced in this documentation is present and runnable in this repository; nothing here is aspirational or simulated.
