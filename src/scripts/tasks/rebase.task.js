import { addTask, exec } from "./task.js";
import { getIndex } from "../utils/get-index.js";
import { log } from "../../log/log.js";
import { validCommands } from "../constants.js";

export async function gitRebaseTask(args) {
  const gRebaseIndex = getIndex(10);

  if (gRebaseIndex > -1) {
    if (args.length < 3 || validCommands.includes(args[gRebaseIndex + 1]) || validCommands.includes(args[gRebaseIndex + 2])) {
      throw new Error("Rebase flag requires the target branchs names `gs -r target-branch origin-branch`");
    }

    if (gRebaseIndex !== 2 && args.length > 3) {
      throw new Error("Cannot do anything these than rebase when rebase flag is setted up");
    }

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
}
