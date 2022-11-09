export function help() {
  console.info("gs [--help] <command> [<args>]\n");
  console.info("Usage:\n");
  console.info("-add | -a [<file>,<file>,...]\t\tgit add <file>\t\t\t[default] git add .");
  console.info('-message | -m <message>\t\t\tgit commit -m "message"');
  console.info("-checkout | -c <branch-name>\t\tgit checkout branch-name");
  console.info("-checkout-branch | -cb <branch-name>\tgit checkout -b branch-name");
  console.info("-cd\tgit checkout develop");
  console.info('--ft | --fx | --e | --c | --d\t\tgit commit -m "flag: message"\tmust come with -c flag');
  console.info("-push | -p [<branch>]\t\t\tgit push origin <branch>");
  console.info("-force | -f\t\t\t\tgit push -f origin <branch>\tmust come with -push flag");
  console.info("-rest-head | -rs [<number>]\t\tgit reset HEAD~<number>\t\t[default] git reset HEAD~1");
  console.info("-r | -rebase origin-branch target-branch\tgit rebase target-branch");
  console.info();
}
