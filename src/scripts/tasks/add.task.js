import { getIndex } from '#utils/get-index';
import { VALID_COMMAND_TYPES, VALID_COMMANDS } from '../constants.js';
import { addTask } from './task.js';

export function gitAddTask(args) {
  const commandType = VALID_COMMAND_TYPES.ADD;
  const allValidCommands = Object.values(VALID_COMMANDS).flat();

  const gAddIndex = getIndex(commandType);

  if (gAddIndex == null) return;

  const nextArgument = args[gAddIndex + 1];
  const gitAddFiles = !allValidCommands.includes(nextArgument) ? nextArgument : undefined;

  const gaa = [];

  if (gitAddFiles) {
    gitAddFiles.split(',').forEach((file) => {
      const task = addTask('git', ['add', file]);
      gaa.push(task);
    });
  } else {
    gaa.push(addTask('git', ['add', '.']));
  }

  return gaa;
}
