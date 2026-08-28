# Package Management on Ubuntu (APT)

Ubuntu uses **APT** (Advanced Package Tool) as its front-end for installing, updating, and removing software, backed by the lower-level **dpkg** package database. This document explains the standard workflow this project's command reference covers.

> **Note on scope:** this document explains the package-management *workflow* practiced as part of the command reference (see [linux-commands.md](linux-commands.md) and [`linux-practice/linux-commands.txt`](../linux-practice/linux-commands.txt)). The repository does not contain a log or script recording a specific package installation, so no specific install is claimed as having been performed and captured here — the commands below are documented as reference material, the same way they appear in the project's own notes.

## The Workflow: Update → Install → Verify

### 1. Update the package index

```bash
sudo apt update
```

- **Purpose:** refreshes the local list of available packages and their latest versions from the repositories configured on the system. It does **not** upgrade any installed software by itself.
- **Why first:** installing without updating first risks fetching a stale package version, or failing because the index doesn't yet know about a package's current dependencies.

### 2. Install a package

```bash
sudo apt install curl
```

- **Purpose:** downloads and installs the named package, along with any dependencies it requires.
- **`sudo`:** required because installing software modifies system-wide files (typically under `/usr`), which regular users cannot write to.

### 3. Verify the installation

```bash
apt show curl
dpkg -s curl
```

- **`apt show <package>`:** displays metadata about a package — version, description, size, dependencies — whether or not it's currently installed.
- **`dpkg -s <package>`:** queries the installed-package database directly and reports `Status: install ok installed` if present, or an error if it is not. This is the more precise "is this actually installed right now" check, since `apt show` also works for packages that are merely *available*.

## Why This Order Matters in DevOps

- **Reproducible builds:** Dockerfiles and provisioning scripts (Ansible, cloud-init, etc.) almost universally run `apt-get update` immediately before `apt-get install` in the same layer/step — separating them risks the classic "stale cache" bug where a Docker layer caches an old index.
- **Verification as a habit:** confirming a package actually installed (via `dpkg -s` or checking the binary's exit code) rather than assuming success is the same discipline used in CI pipelines, where an install step's exit code gates whether the pipeline continues.
- **Least surprise:** `apt show` before installing lets you confirm you're about to install the package (and version) you actually intend, rather than a similarly-named alternative.
