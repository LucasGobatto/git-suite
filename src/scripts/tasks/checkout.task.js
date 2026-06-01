import { getIndex } from '#utils/get-index';
import { VALID_COMMANDS, VALID_COMMAND_TYPES } from '../constants.js';
import { addTask } from './task.js';

export function gitCheckoutTask(args) {
  const commandType = VALID_COMMAND_TYPES.CHECKOUT;
  const validCommands = VALID_COMMANDS[commandType];

  const gCheckoutIndex = getIndex(commandType);

  if (gCheckoutIndex == null) return;

  if (validCommands.includes(args[gCheckoutIndex + 1]) || !args[gCheckoutIndex + 1]) {
    throw new Error('Provide the branch name to checkout. `gs -c branch-name`');
  }

  if (args.length < 2) {
    throw new Error(
      `Invalid arguments: ${args.slice(2).join(', ')}. Checkout accepts only 2 args \`gs -c branch-name\``,
    );
  }

  const branchName = args[gCheckoutIndex + 1];

  return addTask('git', ['checkout', branchName]);
}

export function gitCreateBranch(args) {
  const commandType = VALID_COMMAND_TYPES.CREATE_BRANCH;
  const allValidCommands = Object.values(VALID_COMMANDS).flat();

  const gCheckoutBranchIndex = getIndex(commandType);

  if (gCheckoutBranchIndex == null) return;

  const nextArgument = args[gCheckoutBranchIndex + 1];

  if (!nextArgument || allValidCommands.includes(nextArgument)) {
    throw new Error('Provide the branch name. `gs -cb branch-name`');
  }

  return addTask('git', ['checkout', '-b', nextArgument]);
}
