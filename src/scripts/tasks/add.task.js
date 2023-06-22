import { validCommands } from '../constants.js';
import { getIndex } from '#utils/get-index.js';
import { addTask } from './task.js';

export function gitAddTask(args) {
  const gAddIndex = getIndex(0);

  if (gAddIndex > -1) {
    const gitAddFiles = !validCommands.includes(args[gAddIndex + 1]) ? args[gAddIndex + 1] : undefined;

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
}
