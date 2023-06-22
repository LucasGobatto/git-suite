import { log } from '#log';
import { validCommands } from './constants.js';
import { verifyArgs } from './decorators/verify-args.js';
import {
  exec,
  gitAddTask,
  gitCheckoutDefaultBranch,
  gitCheckoutTaks,
  gitCommitTask,
  gitCreateBranch,
  gitPullTask,
  gitPushForceTask,
  gitPushTask,
  gitRebaseTask,
  gitResetHeadTask,
} from './tasks/index.js';

async function runner(args) {
  for (const arg of args) {
    const isOptionalFlag = arg.indexOf('--') === 0;
    const isFlag = arg.indexOf('-') === 0 && !isOptionalFlag;

    if (isFlag) {
      const gitTask = mapFlagToGitCommand[arg];
      const tasks = await gitTask(args);

      try {
        if (Array.isArray(tasks)) {
          await runMultiTasks(tasks);
        } else {
          await exec(tasks);
        }
      } catch (error) {
        log.error(error.message);
        process.exit(1);
      }
    }
  }
}

async function runMultiTasks(tasks) {
  for (const task of tasks) {
    if (task) {
      await exec(task);
    }
  }
}

const mapFlagToGitCommand = {
  [validCommands[0]]: gitAddTask,
  [validCommands[1]]: gitAddTask,
  [validCommands[2]]: gitCommitTask,
  [validCommands[3]]: gitCommitTask,
  [validCommands[4]]: gitPushTask,
  [validCommands[5]]: gitPushTask,
  [validCommands[6]]: gitPushForceTask,
  [validCommands[7]]: gitPushForceTask,
  [validCommands[8]]: gitResetHeadTask,
  [validCommands[9]]: gitResetHeadTask,
  [validCommands[10]]: gitRebaseTask,
  [validCommands[11]]: gitRebaseTask,
  [validCommands[12]]: gitCheckoutTaks,
  [validCommands[13]]: gitCheckoutTaks,
  [validCommands[14]]: gitCreateBranch,
  [validCommands[15]]: gitCreateBranch,
  [validCommands[16]]: gitCheckoutDefaultBranch,
  [validCommands[17]]: gitPullTask,
};

export default verifyArgs(runner);
