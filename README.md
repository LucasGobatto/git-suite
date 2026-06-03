# git-suite

A CLI tool that chains common git operations into a single command. Instead of running `git add`, `git commit`, and `git push` separately, run one `gs` command with the flags you need.

```sh
gs -a -m "initial commit" --ft -p main -f
```

Runs:

```sh
git add .
git commit -m "feat: initial commit"
git push -f origin main
```

## Requirements

- [Node.js](https://nodejs.org/) >= 16.14.2
- [npm](https://www.npmjs.com/) >= 7
- [Git](https://git-scm.com/) installed and configured

## Installation

Install globally to use the `gs` command anywhere:

```sh
npm install -g git-suite
```

Or run without a global install:

```sh
npx git-suite --help
```

Verify the installation:

```sh
gs --help
```

## Quick start

Stage all changes, commit with a conventional prefix, and push to the current branch:

```sh
gs -a -m "update readme" --fx
gs -p
```

Stage specific files and push to a branch:

```sh
gs -a src/index.js,src/utils.js -m "fix login" --fx -p main
```

## Usage

```sh
gs [options]
```

Pass one or more flags in a single invocation. Flags are processed in order, so you can combine add, commit, push, and other operations in one line.

Run `gs --help` at any time for the full list of available flags.

## Commands

### General

| Flag           | Description                                    |
| -------------- | ---------------------------------------------- |
| `--help`       | Show help                                      |
| `--editor-vsc` | Set VS Code as the default git conflict editor |
| `--editor-vim` | Set Vim as the default git conflict editor     |

### Git commands

| Flag                                | Description                                                                                       |
| ----------------------------------- | ------------------------------------------------------------------------------------------------- |
| `-a`, `--add [files]`               | Stage files. Defaults to `git add .`. Separate multiple files with commas: `-a file1.js,file2.js` |
| `-m`, `--message <message>`         | Commit with a message                                                                             |
| `-c`, `--checkout <branch>`         | Switch to a branch                                                                                |
| `-cb`, `--checkout-branch <branch>` | Create and switch to a new branch                                                                 |
| `-cd`                               | Checkout and pull the repository default branch                                                   |
| `-pl`, `--pull [branch]`            | Pull from origin. Defaults to the current branch                                                  |
| `-p`, `--push [branch]`             | Push to origin. Defaults to the current branch                                                    |
| `-f`, `--force`                     | Force push. Must be used with `-p` or `--push`                                                    |
| `-rh`, `--reset-head [n]`           | Reset to `HEAD~n`. Defaults to `1`                                                                |
| `-r`, `--rebase [head] [target]`    | Rebase `target` onto `head`. Defaults to the default branch and the current branch                |

### Commit message prefixes

Use with `-m` or `--message` to prefix the commit message with a conventional commit type:

| Flag   | Prefix     |
| ------ | ---------- |
| `--ft` | `feat:`    |
| `--fx` | `fix:`     |
| `--e`  | `enhance:` |
| `--c`  | `chore:`   |
| `--d`  | `docs:`    |

Example:

```sh
gs -m "add dark mode toggle" --ft
# git commit -m "feat: add dark mode toggle"
```

### Rebase options

Use after resolving conflicts during an interactive rebase:

| Flag                | Description                    |
| ------------------- | ------------------------------ |
| `-rc`, `--continue` | Continue the rebase            |
| `-ra`, `--abort`    | Abort the rebase               |
| `-rs`, `--skip`     | Skip the current rebase commit |

You can optionally stage changes before continuing:

```sh
gs -a -rc
```

## Examples

**Full commit and push flow**

```sh
gs -a -m "initial commit" --ft -p main -f
```

**Rebase the current branch onto the default branch**

From any branch, `gs -r` checks out the default branch, pulls latest, returns to your branch, and rebases:

```sh
gs -r
```

**Rebase one branch onto another**

```sh
gs -r main develop
```

Equivalent to:

```sh
git checkout main
git pull origin main
git checkout develop
git rebase main
```

Omit the origin branch will rebase the current branch onto the target:

```sh
gs -r main
```

Equivalent to:

```sh
git checkout main
git pull origin main
git checkout <current-branch>
git rebase main
```

**Switch to the default branch and pull latest**

```sh
gs -cd
```

**Undo the last commit**

```sh
gs -rh
```

**Continue a rebase after fixing conflicts**

```sh
gs -a -rc
gs -p -f
```

## Configuration

Set the log verbosity with the `LOG_LEVEL` environment variable:

| Value     | Output                                         |
| --------- | ---------------------------------------------- |
| `debug`   | All logs including debug output                |
| `info`    | Info, success, error, and git output (default) |
| `success` | Success, error, and git output                 |
| `error`   | Errors and git output only                     |

Example:

```sh
LOG_LEVEL=debug gs -a -m "test commit"
```

## Notes

- The default branch is detected automatically from `git remote show origin` (usually `main` or `master`).
- When no branch is provided for push or pull, the current branch is used.
- Rebase may stop if conflicts occur. Resolve them, then use `-rc`, `-ra`, or `-rs` to continue, abort, or skip.
- Force push (`-f`) rewrites remote history. Use it only when you intend to.

## License

ISC

## Links

- [npm package](https://www.npmjs.com/package/git-suite)
- [GitHub repository](https://github.com/LucasGobatto/git-suite)
- [Report an issue](https://github.com/LucasGobatto/git-suite/issues)
