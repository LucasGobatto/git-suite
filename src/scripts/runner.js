import { log } from '#log';
import { NON_GIT_COMMANDS } from './constants.js';
import { verifyArgs } from './decorators/verify-args.js';
import { runNonGitTask, runGitTask } from './run-tasks.js';

async function runner(args) {
  try {
    for (const arg of args) {
      const isFlag = arg.indexOf('-') === 0;
  
      if (!isFlag) continue;
  
      if (Object.values(NON_GIT_COMMANDS).flat().includes(arg)) {
        await runNonGitTask(arg, args);
        continue;
      }
  
      await runGitTask(arg, args);
    }
  
    log.success('Git flow finished successfully!');
  } catch (error) {
    log.error(error.message);
    log.debug('Error stack:', error.stack);
    process.exit(1);
  }
}

export default verifyArgs(runner);
