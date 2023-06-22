import { validCommands } from '../constants.js';
import { addTask } from './task.js';
import { getIndex } from '#utils/get-index';

export function gitResetHeadTask(args) {
  const gResetHeadIndex = getIndex(8);

  if (gResetHeadIndex > -1) {
    const nextArgumment = args[gResetHeadIndex + 1];

    if (!validCommands.includes(nextArgumment) && !!nextArgumment && !Number(nextArgumment)) {
      throw new Error('Reset head must come with a number "-rh 1". If pass anything, the default is 1.');
    }

    const gResetHeadParam = Number.isNaN(+args[nextArgumment]) ? 1 : nextArgumment;

    return addTask('git', ['reset', `HEAD~${gResetHeadParam}`]);
  }
}
