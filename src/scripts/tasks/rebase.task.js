import { addTask, exec } from "./task.js";
import { getIndex } from "../utils/get-index.js";
import { log } from "../../log/log.js";
import { validCommands } from "../constants.js";

export async function gitRebaseTask(args) {
  const gRebaseIndex = getIndex(10);
  const gInteractiveRebaseIndex = getIndex(16);

  if (gRebaseIndex > -1) {
    if (args.length < 3 || validCommands.includes(args[gRebaseIndex + 1]) || validCommands.includes(args[gRebaseIndex + 2])) {
      throw new Error("Rebase flag requires the target branchs names `gs -r origin-branch target-branch`");
    }

    if (gRebaseIndex !== 0 && args.length > 3 && gInteractiveRebaseIndex === -1) {
      throw new Error("Cannot do anything these than rebase when rebase flag is setted up");
    }

    if (gInteractiveRebaseIndex > -1 && gInteractiveRebaseIndex !== 3) {
      throw new Error("Iterative flag must come after brach names `gs -r to-rebase-branch head-branch -i`.");
    }

    const hasIterative = gInteractiveRebaseIndex > -1;

    const [origin, target] = [args[gRebaseIndex + 1], args[gRebaseIndex + 2]];

    const goToTargetBranch = addTask("git", ["checkout", target]);
    const gitPull = addTask("git", ["pull"]);
    const goToCurrentBranch = addTask("git", ["checkout", origin]);
    const makeRebase = addTask("git", ["rebase", hasIterative ? "-i" : null, target].filter(Boolean));

    await exec(goToTargetBranch);
    await exec(gitPull);
    await exec(goToCurrentBranch);
    await exec(makeRebase);

    log.info("Run `gs -p -f` to push or `gs --c` to continue rebase.\n");
    log.success("Git flow finished successfully!");
    process.exit(0);
  }
}
