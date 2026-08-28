# Linux Commands Reference

## Navigation

| Command | Purpose |
|---|---|
| `pwd` | Shows current working directory |
| `ls` | Lists files and directories |
| `ls -la` | Lists detailed and hidden files |
| `cd` | Changes directory |
| `find` | Searches for files and directories |

## File Management

| Command | Purpose |
|---|---|
| `mkdir` | Creates a directory |
| `touch` | Creates a file |
| `cp` | Copies files |
| `mv` | Moves or renames files |
| `rm` | Removes files |

## File Operations

| Command | Purpose |
|---|---|
| `cat` | Displays file contents |
| `nano` | Edits files |
| `less` | Views files interactively |
| `head` | Displays beginning of a file |
| `tail` | Displays end of a file |
| `grep` | Searches text |
| `wc` | Counts lines, words and bytes |
| `diff` | Compares files |

## Permissions

| Command | Purpose |
|---|---|
| `ls -l` | Displays permissions and ownership |
| `chmod` | Changes permissions |
| `chown` | Changes ownership |

### Permission Values

```text
r = 4
w = 2
x = 1

# Linux Commands Reference

## Navigation

| Command | Purpose |
|---|---|
| `pwd` | Shows current working directory |
| `ls` | Lists files and directories |
| `ls -la` | Lists detailed and hidden files |
| `cd` | Changes directory |
| `find` | Searches for files and directories |

## File Management

| Command | Purpose |
|---|---|
| `mkdir` | Creates a directory |
| `touch` | Creates a file |
| `cp` | Copies files |
| `mv` | Moves or renames files |
| `rm` | Removes files |

## File Operations

| Command | Purpose |
|---|---|
| `cat` | Displays file contents |
| `nano` | Edits files |
| `less` | Views files interactively |
| `head` | Displays beginning of a file |
| `tail` | Displays end of a file |
| `grep` | Searches text |
| `wc` | Counts lines, words and bytes |
| `diff` | Compares files |

## Permissions

| Command | Purpose |
|---|---|
| `ls -l` | Displays permissions and ownership |
| `chmod` | Changes permissions |
| `chown` | Changes ownership |

### Permission Values

```text
r = 4
w = 2
x = 1

Common examples:

644 = rw-r--r--
755 = rwxr-xr-x
Processes
Command	Purpose
ps	Shows processes
ps aux	Shows detailed process information
top	Real-time process monitoring
System Resources
Command	Purpose
free -h	Shows memory usage
df -h	Shows filesystem disk usage
du -sh	Shows directory size
lscpu	Shows CPU information
Package Management
Command	Purpose
sudo apt update	Updates package indexes
sudo apt install	Installs packages
apt show	Shows package information
dpkg -s	Shows installed package information
