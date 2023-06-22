import { getIndex } from '#utils/get-index.js';
import { getCurrentBranch } from '#utils/get-current-branch.js';
import { addTask } from './task.js';
import { validCommands } from '../constants.js';

export async function gitPushTask(args) {
  const gPushIndex = getIndex(4);
  const gPushForceIndex = getIndex(6);

  if (gPushForceIndex > -1 && gPushIndex === -1) {
    throw new Error('Push force must come with the push flag `gs -p -f`.');
  }

  if (gPushIndex > -1) {
    const currentBranch = await getCurrentBranch();
    const branch = args[gPushIndex + 1] && !validCommands.includes(args[gPushIndex + 1]) ? args[gPushIndex + 1] : currentBranch;
    const force = gPushForceIndex > -1 && args[gPushForceIndex];

    return addTask('git', ['push', force && '-f', `origin ${branch}`].filter(Boolean));
  }
}
