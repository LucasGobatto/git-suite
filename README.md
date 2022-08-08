# Git-Suite

A command line application to simplify the git workflow on committing, pushing and others commands.

# Prerequisites

Install node package manager [npm](https://www.npmjs.com/). Have [git](https://git-scm.com/) installed and [configured](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup) on your machine.

# How to use

1. Clone the repo.
2. On folder `/git-clone` run:

```
npm install -g
```

3. To see the list of all valid commands on terminal, run?

```
gs --help
```

## Valid Commands

**1. Git add:** `gs -a | -add [<file>,<file>]` or - runs `git add .`. Send specific files to add by concatenate with a comma, like `gs -a file1.js,file2.js`;

**2. Git commit:** `gs -c | -commit "message" [--ft | --fx | --c | --e]` - runs `git commit -m "message"`. If the commit type is specified, the final commit message will be:

- `--ft` - `"feat: message"`;
- `--fx`- `"fix: message"`;
- `--c` - `"chore: message"`;
- `--e` - `"enhance: message"`;

**3. Git push:** `gs -p | -push <branch-name> [-f | -force]` - runs `git push origin <branch-name>`. The force flag is optional;

**4. Git reset HEAD:** `gs -rh | -reset-head [<number>]` - runs `git reset HEAD~<number>`. By default, with remove 1 commit from the HEAD.
