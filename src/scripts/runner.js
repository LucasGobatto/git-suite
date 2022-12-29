import { help } from "./help/help.js";
import { verifyArgs } from "./decorators/verify-args.js";
import { gitAddTask, gitCommitTask, gitPushTask, gitRestHeadTask, gitCheckoutTaks, gitPullTask, gitCheckoutDevelop, gitRebaseTask } from "./tasks/index.js";
import { extraCommands } from "./constants.js";
import { exec } from "./tasks/task.js";
import { log } from "../log/log.js";

async function runner(args) {
  try {
    if (args[0] === extraCommands[0]) {
      help();
      return;
    }

    await gitRebaseTask(args);

    const gitResetHead = gitRestHeadTask(args);

    if (gitResetHead) {
      await exec(gitResetHead);
      return;
    }

    await gitCheckoutDevelop(args);

    const gitCheckout = gitCheckoutTaks(args);
    const gitAdd = gitAddTask(args);
    const gitCommit = gitCommitTask(args);
    const gitPush = await gitPushTask(args);
    const gitPull = await gitPullTask(args);

    const tasks = [...(gitAdd ?? []), gitCommit, gitPush, gitCheckout, gitPull].filter(Boolean);

    for (const task of tasks) {
      await exec(task);
    }

    log.success("Git flow finished successfully!");
  } catch (error) {
    log.error(error.message);
  }
}

export default verifyArgs(runner);
