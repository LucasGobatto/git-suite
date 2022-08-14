import { addTask, exec } from "./task.js";
import { getIndex, getRebaseFlagIndex } from "../utils/get-index.js";
import { log } from "../../log/log.js";
import { validCommands, mapFlag } from "../constants.js";

export async function gitRebaseTask(args) {
  const gRebaseIndex = getIndex(10);
  const gRebaseFlagIndex = getRebaseFlagIndex();

  if (gRebaseIndex > -1) {
    if (args.length < 3 || validCommands.includes(args[gRebaseIndex + 1]) || validCommands.includes(args[gRebaseIndex + 2])) {
      throw new Error("Rebase flag requires the target branchs names `gs -r origin-branch target-branch`");
    }

    if (gRebaseIndex !== 2 && args.length > 3) {
      throw new Error("Cannot do anything these than rebase when rebase flag is setted up");
    }

    const [origin, target] = [args[gRebaseIndex + 1], args[gRebaseIndex + 2]];

    const goToTargetBranch = addTask("git", ["checkout", target]);
    const gitPull = addTask("git", ["pull"]);
    const goToCurrentBranch = addTask("git", ["checkout", origin]);
    const makeRebase = addTask("git", ["rebase", target]);

    await exec(goToTargetBranch);
    await exec(gitPull);
    await exec(goToCurrentBranch);
    await exec(makeRebase);

    log.info("Run `gs -p -f` to push or `gs --c` to continue rebase.\n");
    log.success("Git flow finished successfully!");
    process.exit(0);
  }

  if (gRebaseFlagIndex > -1) {
    if (args.length > 1) {
      throw new Error(
        `Invalid param ${args.slice(1).join(", ")}. Choose one flag to continue rebase \`--a\`, \`--s\` or \`--c\` `
      );
    }

    const flag = mapFlag[args[gRebaseFlagIndex]];

    if (flag) {
      const gitAdd = addTask("git", ["add", "."]);
      const gitRebase = addTask("git", ["rebase", flag]);

      await exec(gitAdd);
      await exec(gitRebase);
      log.success("Git flow finished successfully!");
      process.exit(0);
    } else {
      throw new Error(`Unexpected error. Received args: ${args.join(", ")}`);
    }
  }
}
