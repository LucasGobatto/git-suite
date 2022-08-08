# Git-Suite

A command line application to simplify the git workflow on committing, pushing and others commands.

# Prerequisites

Install Node Package Manager [npm](https://www.npmjs.com/) and Node Version Manager [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md#installing-and-updating). Have [git](https://git-scm.com/) installed and [configured](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup) on your machine.

# Info
**Exemple**

Runs the command
```sh
$ gs -a -c "initial commit" --ft -p main -f
```

to get the flowing:
```sh
$ git add .
$ git commit -m "feat: initial commit"
$ git push -f origin main
```
Simple as that!

# How to use

1. Clone this repo:
```sh
$ git clone https://github.com/LucasGobatto/git-suite
```
2. On folder `/git-suite` run `nvm use` and `npm install`;
3. Install globally:
```sh
$ npm install -g
```

Done! To see the list of all valid commands on terminal, run:
```sh
$ gs --help
```

## Valid Commands

**1. Git add:** `gs -a | -add [<file>,<file>]` or - runs `git add .` by  default. Specify files to add concatenating the paths with a comma, like `gs -a path/to/file1.js,path/to/file2.js`;

**2. Git commit:** `gs -c | -commit "message" [--ft | --fx | --c | --e]` - runs `git commit -m "message"`. If the commit type flag is specified, the final commit message will be:

- `--ft`   -->    `"feat: message"`;
- `--fx`   -->    `"fix: message"`;
- `--c`    -->    `"chore: message"`;
- `--e`    -->    `"enhance: message"`;
- `--d`    -->    `"docs: message"`;

**3. Git push:** `gs -p | -push <branch-name> [-f | -force]` - runs `git push origin <branch-name>`. The force flag is optional;

**4. Git reset HEAD:** `gs -rh | -reset-head [<number>]` - runs `git reset HEAD~<number>`. By default, with remove 1 commit from the HEAD.
