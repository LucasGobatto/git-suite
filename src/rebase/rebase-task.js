import { addTask, exec } from "../task.js";
import { log } from "../log/log.js";

export async function runRebaseTask(branchs) {
  const [target, origin] = branchs;

  const goToTargetBranch = addTask("git", ["checkout", target]);
  const gitPull = addTask("git", ["pull"]);
  const goToCurrentBranch = addTask("git", ["checkout", origin]);
  const makeRebase = addTask("git", ["rebase", target]);

  await exec(goToTargetBranch);
  await exec(gitPull);
  await exec(goToCurrentBranch);
  await exec(makeRebase);

  log.info("Run `gs -p` to push or `gs --c` to continue rebase.\n");
  log.success("Git flow finished successfully!");
  process.exit(0);
}
