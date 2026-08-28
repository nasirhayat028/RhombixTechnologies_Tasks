# Bash Scripting

This project contains two executable Bash scripts. Both are documented here in full — purpose, every line, and how to run them.

---

## `linux-practice/hello.sh`

```bash
#!/bin/bash

echo "Hello from Rhombix Technologies!"
echo "Linux fundamentals project is running successfully."
```

**Purpose:** the simplest possible working script — confirms the shell scripting environment (shebang, execute permission, `bash` interpreter) is set up correctly before writing anything more complex.

**Line by line:**

| Line | Explanation |
|---|---|
| `#!/bin/bash` | The **shebang**. Tells the kernel which interpreter should execute this file when it's run directly (e.g. `./hello.sh`) — here, `/bin/bash`. Without it, the script would only run correctly via an explicit `bash hello.sh` call. |
| `echo "..."` | Prints a literal string to standard output. Used twice here simply to print two lines. |

**Permissions required:** the execute bit must be set — `chmod 755 linux-practice/hello.sh` (already applied; see [permissions.md](permissions.md)).

**How to run it:**

```bash
cd linux-practice
./hello.sh
```

or, without needing the execute bit at all:

```bash
bash linux-practice/hello.sh
```

---

## `scripts/system-info.sh`

```bash
#!/bin/bash

echo "====================================="
echo " Rhombix Technologies Linux Project "
echo "====================================="

echo ""
echo "User:"
whoami

echo ""
echo "Current Directory:"
pwd

echo ""
echo "Ubuntu Version:"
lsb_release -ds

echo ""
echo "Kernel:"
uname -r

echo ""
echo "Memory:"
free -h

echo ""
echo "Disk Usage:"
df -h /

echo ""
echo "System Information Complete."
```

**Purpose:** a genuine system-information script — it gathers and prints real facts about the machine it runs on, rather than static text. This is the project's concrete demonstration of tying several fundamentals commands (identity, navigation, system resources) together into one reusable tool.

**Line by line:**

| Command | What it reports |
|---|---|
| `whoami` | The username of the account currently running the script. |
| `pwd` | The absolute path of the directory the script was invoked from. |
| `lsb_release -ds` | The OS distribution name and version (`-d` = description, `-s` = short/plain output, suitable for scripts). |
| `uname -r` | The currently running kernel version. |
| `free -h` | Memory (RAM) usage, human-readable. |
| `df -h /` | Disk usage of the root filesystem, human-readable. |

The `echo ""` calls between sections exist purely for readability — they insert blank lines so the output isn't a single dense block of text. The banner (`====...====`) and section headers (`echo "Memory:"` etc.) are static labels; everything printed *after* each label comes from a real command.

**No variables are used** — every value is produced live by a command at run time, so there's nothing to substitute or configure.

**Permissions required:** `chmod 755 scripts/system-info.sh` (already applied).

**How to run it:**

```bash
cd scripts
./system-info.sh
```

or:

```bash
bash scripts/system-info.sh
```

**Expected output shape** (actual values will reflect whatever machine it runs on):

```text
=====================================
 Rhombix Technologies Linux Project
=====================================

User:
<your username>

Current Directory:
<path you ran it from>

Ubuntu Version:
<your OS version>

Kernel:
<your kernel version>

Memory:
<free -h table>

Disk Usage:
<df -h / table>

System Information Complete.
```

## Why Scripting Matters in DevOps

Both scripts here are intentionally small, but they demonstrate the exact pattern behind real infrastructure tooling: a shebang declares the interpreter, the execute bit makes the file directly runnable, and the body chains ordinary shell commands together into one repeatable unit. Provisioning scripts, CI job steps, health-check scripts, and container entrypoints are all built from this same foundation — `system-info.sh` is a miniature version of the kind of diagnostic script an on-call engineer might run against a server to get a quick health snapshot.
