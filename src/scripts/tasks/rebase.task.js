import { addTask, exec } from "./task.js";
import { getIndex, getRebaseFlagIndex } from "../utils/get-index.js";
import { log } from "../../log/log.js";
import { mapFlag } from "../constants.js";
import { getCurrentBranch } from "../utils/get-current-branch.js";

export async function gitRebaseTask(args) {
  const gRebaseIndex = getIndex(10);
  const gRebaseFlagIndex = getRebaseFlagIndex();
  const currentBranch = getCurrentBranch();
  const defaultHeadBranch = "develop";

  if (gRebaseIndex > -1) {
    if (gRebaseIndex !== 2 && args.length > 3) {
      throw new Error("Cannot do anything these than rebase when rebase flag is setted up");
    }

    const [origin, head] = [args[gRebaseIndex + 1], args[gRebaseIndex + 2]];

    const goToHeadBranch = addTask("git", ["checkout", head ?? defaultHeadBranch]);
    const gitPull = addTask("git", ["pull", head ?? defaultHeadBranch]);
    const goToCurrentBranch = addTask("git", ["checkout", origin ?? currentBranch]);
    const makeRebase = addTask("git", ["rebase", head ?? defaultHeadBranch]);

    await exec(goToHeadBranch);
    await exec(gitPull);
    await exec(goToCurrentBranch);
    await exec(makeRebase);

    log.info("Run `gs -p -f` to push or `gs --rc` to continue rebase.\n");
    log.success("Git flow finished successfully!");
    process.exit(0);
  }

  if (gRebaseFlagIndex > -1) {
    if (args.length > 1) {
      throw new Error(`Invalid param ${args.slice(1).join(", ")}. Choose one flag to continue rebase \`--ra\`, \`--rs\` or \`--rc\` `);
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
