import { getIndex } from '#utils/get-index';
import { getCurrentBranch } from '#utils/get-current-branch';
import { addTask } from './task.js';
import { validCommands } from '../constants.js';

export async function gitPushTask(args, isForce) {
  const gPushIndex = getIndex(4);
  const gPushForceIndex = isForce && getIndex(6);
  const index = gPushForceIndex ?? gPushIndex;

  if (index > -1) {
    const currentBranch = await getCurrentBranch();
    const branch = args[index + 1] && !validCommands.includes(args[index + 1]) ? args[index + 1] : currentBranch;
    const force = gPushForceIndex > -1;

    return addTask('git', ['push', force && '-f', `origin ${branch}`].filter(Boolean));
  }
}

export async function gitPushForceTask(args) {
  return gitPushTask(args, true);
}
