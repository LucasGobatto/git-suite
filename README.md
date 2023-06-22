# Git-Suite

A command line application to simplify the git workflow on committing, pushing and others commands.

# Prerequisites

Install Node Package Manager [npm](https://www.npmjs.com/) and Node Version Manager [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md#installing-and-updating). Have [git](https://git-scm.com/) installed and [configured](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup) on your machine.

# Info

**Exemple**

Runs the command

```sh
$ gs -a -m "initial commit" --ft -p main -f
```

to get the following:

```sh
$ git add .
$ git commit -m "feat: initial commit"
$ git push -f origin main
```

Simple as that!

# How to use

1. Install using npm:

```sh
$ npm i git-suite
```

3. Install globally:

```sh
$ npm install -g git-suite
```

Done! To see the list of all valid commands on terminal, run:

```sh
$ gs --help
```

## Valid Commands

**1. Git add:** `gs -a | -add [<file>,<file>]` or - runs `git add .` by default. Specify files to add concatenating the paths with a comma, like `gs -a path/to/file1.js,path/to/file2.js`;

**2. Git commit:** `gs -m | -message "message" [--ft | --fx | --c | --e]` - runs `git commit -m "message"`. If the commit type flag is specified, the final commit message will be:

- `--ft` --> `"feat: message"`;
- `--fx` --> `"fix: message"`;
- `--c` --> `"chore: message"`;
- `--e` --> `"enhance: message"`;
- `--d` --> `"docs: message"`;

**3. Git push:** `gs -p | -push [<branch-name>] [-f | -force]` - runs `git push origin <branch-name>`. The force flag and branch-name is optional;

> ### ⚠️ Warning!
>
> Not providing the branch name will push the changes from the current branch.

**4. Git reset HEAD:** `gs -rh | -reset-head [<number>]` - runs `git reset HEAD~<number>`. By default, with remove 1 commit from the HEAD.

**5. Git rebase:** `gs -r [head-branch] [branch-to-rebase]` - runs:

- Example 1: Rebase current branch (i.e. `docs/readme`) into default head branch (i.e. `main`):

  ```sh
    $ git -r

    git checkout main
    git pull origin main
    git checkout docs/readme
    git rebase main
  ```

- Example 2: Rebase `develop` into `main` from any other branch:

  ```sh
  $ gs -r main develop

  git checkout main
  git pull origin main
  git checkout develop
  git rebase main
  ```

Runs the rebase process. It will update the head branch automatically for you and you dont need to worries aboute the update status of your head branch! Besides, it can be triggered from any branch, precisely because it makes the checkouts on the mentioned branchs, ensuring that the rebase process is performed to the correct ones.

Note: If any conflicts occur in the rebase process, it will stop to resolve the conflicts. After rebase, run `gs -p -f` to push the current branch.

**6. Git checkout:** `gs -c <branch-name>` - runs `git checkout branch-name`. Change to "brach-name" branch. It is allowed to create a new branch running `gs -cb branch-name`.

**7. Git checkout default:** `gs -cd` - runs `git checkout <default-head- branch>`. It will swich the current branch to the default head branch (i.e. `main` or `master`)
