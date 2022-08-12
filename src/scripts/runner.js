import { help } from "./help/help.js";
import { verifyArgs } from "./decorators/verify-args.js";
import { gitRebaseTask, gitAddTask, gitCommitTask, gitPushTask, gitRestHeadTask } from "./tasks/index.js";
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

    const gitAdd = gitAddTask(args);
    const gitCommit = gitCommitTask(args);
    const gitPush = gitPushTask(args);

    const tasks = [...(gitAdd ?? []), gitCommit, gitPush].filter(Boolean);

    for (const task of tasks) {
      await exec(task);
    }
  } catch (error) {
    log.error(error.message);
  }
}

export default verifyArgs(runner);
