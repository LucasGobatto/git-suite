import { log } from '#log';
import { extraCommands } from './constants.js';
import { verifyArgs } from './decorators/verify-args.js';
import { runExtraCommands, runGitTask } from './run-tasks.js';

async function runner(args) {
  for (const arg of args) {
    const isOptionalFlag = arg.indexOf('--') === 0;
    const isFlag = !isOptionalFlag && arg.indexOf('-') === 0;

    if (isOptionalFlag && extraCommands.includes(arg)) {
      await runExtraCommands(arg, args);
    }

    if (isFlag) {
      await runGitTask(arg, args);
    }
  }

  log.success('Git flow finished successfully!');
}

export default verifyArgs(runner);
