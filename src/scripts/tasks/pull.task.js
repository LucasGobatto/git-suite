import { getCurrentBranch } from '#utils/get-current-branch';
import { getIndex } from '#utils/get-index';
import { VALID_COMMANDS, VALID_COMMAND_TYPES } from '../constants.js';
import { addTask } from './task.js';

export async function gitPullTask(args) {
  const commandType = VALID_COMMAND_TYPES.PULL;
  const validCommands = VALID_COMMANDS[commandType];

  const gPullIndex = getIndex(commandType);

  if (gPullIndex == null) return;

  const currentBranch = await getCurrentBranch();

  const branchName =
    args[gPullIndex + 1] && !validCommands.includes(args[gPullIndex + 1]) ? args[gPullIndex + 1] : currentBranch;

  return addTask('git', ['pull', 'origin', branchName]);
}
