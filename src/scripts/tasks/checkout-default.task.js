import { getDefaultBranch } from '#utils/get-default-branch';
import { getIndex } from '#utils/get-index';
import { VALID_COMMAND_TYPES } from '../constants.js';
import { addTask } from './task.js';

export async function gitCheckoutDefaultBranch(args) {
  const gCheckoutDevelopIndex = getIndex(VALID_COMMAND_TYPES.CHECKOUT_DEFAULT);

  if (gCheckoutDevelopIndex == null) return;

  if (args.length != 1) {
    throw new Error(
      `Invalid arguments: ${args.slice(1).join(', ')}. Checkout ${defaultBranch} accepts only one argument \`gs -cd\`.`,
    );
  }

  const defaultBranch = await getDefaultBranch();

  const checkoutTask = addTask('git', ['checkout', defaultBranch]);
  const pullTask = addTask('git', ['pull', 'origin', defaultBranch]);

  return [checkoutTask, pullTask];
}
