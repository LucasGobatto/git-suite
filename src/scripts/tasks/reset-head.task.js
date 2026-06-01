import { getIndex } from '#utils/get-index';
import { VALID_COMMANDS, VALID_COMMAND_TYPES } from '../constants.js';
import { addTask } from './task.js';

export function gitResetHeadTask(args) {
  const commandType = VALID_COMMAND_TYPES.RESET_HEAD;
  const validCommands = VALID_COMMANDS[commandType];

  const gResetHeadIndex = getIndex(commandType);

  if (gResetHeadIndex == null) return;

  const nextArgument = args[gResetHeadIndex + 1];

  if (!validCommands.includes(nextArgument) && !!nextArgument && !Number(nextArgument)) {
    throw new Error('Reset head must come with a number "-rh 1". If none is provided, the default is 1.');
  }

  const gResetHeadParam = Number.isNaN(+nextArgument) ? 1 : +nextArgument;

  return addTask('git', ['reset', `HEAD~${gResetHeadParam}`]);
}
