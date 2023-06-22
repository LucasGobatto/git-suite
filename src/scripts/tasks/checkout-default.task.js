import { log } from '#log';
import { getIndex } from '#utils/get-index.js';
import { getDefaultBranch } from '#utils/get-default-branch.js';
import { addTask, exec } from './task.js';

export async function gitCheckoutDefaultBranch(args) {
  const gCheckoutDevelopIndex = getIndex(16, false);

  if (gCheckoutDevelopIndex > -1) {
    if (args.length != 1) {
      throw new Error(`Invalid arguments: ${args.slice(1).join(', ')}. Checkout ${defaultBranch} accepts only one argument \`gs -cd\`.`);
    }

    const defaultBranch = await getDefaultBranch();

    try {
      const checkoutTask = addTask('git', ['checkout', defaultBranch]);
      const pullTask = addTask('git', ['pull', 'origin', defaultBranch]);

      await exec(checkoutTask);
      await exec(pullTask);

      log.success('Git flow finished successfully!');
      process.exit(0);
    } catch (error) {
      log.error(error.message);
    }
  }
}
