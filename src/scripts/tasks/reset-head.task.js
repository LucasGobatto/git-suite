import { validCommands } from '../constants.js';
import { addTask } from './task.js';
import { getIndex } from '#utils/get-index.js';

export function gitRestHeadTask(args) {
  const gResetHeadIndex = getIndex(8);

  if (gResetHeadIndex > -1) {
    if (!validCommands.includes(args[gResetHeadIndex + 1]) && args[gResetHeadIndex + 1] && !Number(args[gResetHeadIndex + 1])) {
      throw new Error('Reset head must come with a number "-rh 1". If pass anything, the default is 1.');
    }

    const gResetHeadParam = args[gResetHeadIndex + 1] ?? 1;

    return addTask('git', ['reset', `HEAD~${gResetHeadParam}`]);
  }
}
