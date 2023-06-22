import { validCommands } from '../constants.js';
import { getIndex } from '#utils/get-index';
import { getCurrentBranch } from '#utils/get-current-branch';
import { addTask } from './task.js';

export async function gitPullTask(args) {
  const gPullIndex = getIndex(17, false);

  if (gPullIndex > -1) {
    const currentBranch = await getCurrentBranch();

    const branchName =
      args[gPullIndex + 1] && !validCommands.includes(args[gPullIndex + 1]) ? args[gPullIndex + 1] : currentBranch;

    return addTask('git', ['pull', 'origin', branchName]);
  }
}
