import { addTask, exec } from "../task.js";
import { log } from "../log/log.js";

export async function runRebaseTask(branchs) {
  const [target, origin] = branchs;
  console.log(branchs);

  const goToTargetBranch = addTask("git", ["checkout", target]);
  const gitPull = addTask("git", ["pull"]);
  const goToCurrentBranch = addTask("git", ["checkout", origin]);
  const makeRebase = addTask("git", ["rebase", target]);

  await exec(goToTargetBranch);
  await exec(gitPull);
  await exec(goToCurrentBranch);
  await exec(makeRebase);

  log.success(`Git flow finished successfully!`);
  process.exit(0);
}
