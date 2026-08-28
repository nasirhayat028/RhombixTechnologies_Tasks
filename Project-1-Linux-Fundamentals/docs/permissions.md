# Linux File Permissions

Linux is a multi-user operating system: every file and directory has an **owner**, belongs to a **group**, and has separate permission rules for **everyone else**. This document explains how those permissions work, using the actual files in this repository as examples.

## Owner, Group, Others

Every file has three permission "slots":

| Slot | Meaning |
|---|---|
| **Owner (user)** | The account that created/owns the file. |
| **Group** | A set of users who share access — usually the owner's primary group. |
| **Others** | Everyone else on the system. |

`ls -l` shows all three at once. Running it against this project's scripts gives:

```text
-rwxr-xr-x 1 nasir nasir 112 Aug 28 08:58 linux-practice/hello.sh
-rwxr-xr-x 1 nasir nasir 409 Aug 28 09:07 scripts/system-info.sh
```

Reading the ten characters at the start of each line:

```text
-  rwx  r-x  r-x
│   │    │    │
│   │    │    └── Others: read, execute
│   │    └── Group: read, execute
│   └── Owner: read, write, execute
└── File type ('-' = regular file, 'd' = directory)
```

The two `nasir` columns are the owner and group name — confirming both scripts are owned by `nasir` and belong to the `nasir` group.

## Read, Write, Execute

Each of the three slots (owner/group/others) can independently have three permissions:

| Symbol | Meaning | On a file | On a directory |
|---|---|---|---|
| `r` | read | View the file's contents | List the directory's contents |
| `w` | write | Modify or delete the file's contents | Create/delete/rename files inside it |
| `x` | execute | Run the file as a program/script | Enter (`cd` into) the directory |

## Numeric (Octal) Permissions

Each permission has a numeric value, and the three values for a slot are added together:

```text
r = 4
w = 2
x = 1
```

So a slot's total can be any value from `0` (no permissions) to `7` (`4+2+1`, i.e. `rwx`). A full permission set is written as three digits: owner, group, others.

### Common examples

```text
755 = rwxr-xr-x   → owner: read/write/execute, group: read/execute, others: read/execute
644 = rw-r--r--   → owner: read/write, group: read-only, others: read-only
```

## Applying This to the Project

Both shell scripts in this repository are set to **755**:

```bash
chmod 755 linux-practice/hello.sh
chmod 755 scripts/system-info.sh
```

**Why 755 for a script:** the owner needs full control (read, write, and — critically — **execute**, so `./hello.sh` runs without needing `bash hello.sh`), while everyone else only needs to read and execute it, never modify it. This is the standard permission mode for any script or program meant to be run directly.

Without the execute bit, attempting `./hello.sh` fails with `Permission denied`, even though the file's *contents* are perfectly valid — a common beginner point of confusion between "the code is correct" and "the file is allowed to run."

The plain text/markdown files in this repository (`notes.txt`, `linux-commands.txt`, this document, etc.) do not need the execute bit at all — they are only ever read or edited, never run, so `644`-style (read/write for the owner, read-only for everyone else) is the appropriate mode for that kind of file.

## Why Permissions Matter in DevOps

- **Least privilege:** a deployment script should be executable by the service account that runs it, not writable by every user on a shared server — an accidental or malicious edit to a script with overly broad write access can take down a production job.
- **Executable artifacts:** CI/CD pipelines routinely fail with `Permission denied` when a checked-out script lost its execute bit (e.g. via a `zip`/`unzip` round trip that doesn't preserve permissions) — this is one of the most common real-world causes of a "works on my machine" pipeline failure.
- **Container images:** Dockerfiles frequently need an explicit `chmod +x` on entrypoint scripts for exactly the same reason demonstrated here.
