# System Resource Monitoring

Understanding the health of a Linux machine — memory, disk, CPU, and running processes — is a core sysadmin/DevOps skill. This document explains the commands this project practiced, and highlights the two that [`scripts/system-info.sh`](../scripts/system-info.sh) actually runs.

## Memory: `free`

```bash
free -h
```

- **Purpose:** shows total, used, free, and available RAM (and swap).
- **`-h` flag:** displays sizes in human-readable units (MB/GB) instead of raw bytes.
- **What it tells you:** whether the system has memory headroom, or is close to exhausting RAM and starting to swap (which severely degrades performance).
- **Used in this project:** called directly by `scripts/system-info.sh`, under its "Memory" section.
- **DevOps relevance:** memory exhaustion is one of the most common causes of application crashes and container `OOMKilled` events — `free -h` is usually the first command run when diagnosing one.

## Disk Usage: `df` and `du`

```bash
df -h /
```

- **Purpose:** shows how much space is used/available on a mounted filesystem.
- **`-h` flag:** human-readable sizes.
- **`/` argument:** restricts output to the root filesystem (as used in `system-info.sh`) instead of listing every mount.
- **Used in this project:** called directly by `scripts/system-info.sh`, under its "Disk Usage" section.
- **DevOps relevance:** a full disk (`100%` used) silently breaks logging, database writes, and package installs — `df -h` is the standard first check for "why did the server just stop responding."

```bash
du -sh linux-practice/
```

- **Purpose:** shows the total size of a specific directory (`df` reports per-filesystem, `du` reports per-directory).
- **`-s`:** summarize (total only, not every subfile).
- **`-h`:** human-readable.
- **DevOps relevance:** used to hunt down which directory (e.g. `/var/log`, a build cache, a Docker volume) is actually consuming disk space once `df` reports the filesystem is full.

## CPU Information: `lscpu`

```bash
lscpu
```

- **Purpose:** prints CPU architecture details — core/thread count, model name, clock speed, cache sizes.
- **DevOps relevance:** used when sizing a server or container resource request/limit (e.g. deciding how many CPU cores a Kubernetes pod should request) or diagnosing whether a workload is CPU-bound.

## Running Processes: `ps` and `top`

```bash
ps aux
top
```

- **`ps aux`:** a one-time snapshot of every running process, with user, CPU%, memory%, and command.
- **`top`:** a continuously updating live view of the same information, sorted by resource usage.
- **DevOps relevance:** the standard pair for answering "what is running on this machine right now, and what is consuming its resources" — the starting point of almost any performance investigation.

## What `system-info.sh` Actually Demonstrates

The script does not attempt to cover every command above — it's a focused demonstration script, not a monitoring dashboard. Concretely, it prints:

| Section | Command used |
|---|---|
| User | `whoami` |
| Current directory | `pwd` |
| Ubuntu version | `lsb_release -ds` |
| Kernel | `uname -r` |
| Memory | `free -h` |
| Disk usage | `df -h /` |

`ps`, `top`, `du`, and `lscpu` were practiced interactively at the terminal (see [linux-commands.md](linux-commands.md)) but are not wired into the script — a straightforward, honest extension would be adding a "Top Processes" or "CPU Info" section to `system-info.sh` using `ps aux --sort=-%mem | head` or `lscpu`, if this project is revisited.
