export function help() {
  console.info("gs [--help] <command> [<args>]\n");
  console.info("Usage:\n");
  console.info("-add | -a [<file>,<file>,...]\t\tgit add <file>\t\t\t[default] git add .");
  console.info('-commit | -c <message>\t\t\tgit commit -m "message"');
  console.info('--ft | --fx | --e | --c | --d\t\tgit commit -m "flag: message"\tmust comt with -c flag');
  console.info("-push | -p [<branch>[\t\t\tgit push origin <branch>");
  console.info("-force | -f\t\t\t\tgit push -f origin <branch>\tmust come with -push flag");
  console.info("-rest-head | -rs [<number>]\t\tgit reset HEAD~<number>\t\t[default] git reset HEAD~1");
  console.info("-r | -rebase origin-branch target-branch\tgit rebase target-branch");
  console.info();
}
