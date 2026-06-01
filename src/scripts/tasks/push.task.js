import { getCurrentBranch } from '#utils/get-current-branch';
import { getIndex } from '#utils/get-index';
import { VALID_COMMANDS, VALID_COMMAND_TYPES } from '../constants.js';
import { addTask } from './task.js';

export async function gitPushTask(args) {
  const commandType = VALID_COMMAND_TYPES.PUSH;
  const forceCommandType = VALID_COMMAND_TYPES.FORCE;

  const allValidCommands = Object.values(VALID_COMMANDS).flat();

  const gPushIndex = getIndex(commandType);
  const gPushForceIndex = getIndex(forceCommandType);

  if (gPushIndex == null) return;

  const currentBranch = await getCurrentBranch();
  const branch =
    args[gPushIndex + 1] && !allValidCommands.includes(args[gPushIndex + 1]) ? args[gPushIndex + 1] : currentBranch;
  const hasForceFlag = gPushForceIndex != null;

  return addTask('git', ['push', hasForceFlag && '-f', `origin ${branch}`].filter(Boolean));
}
