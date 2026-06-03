import { log } from '#log';
import { mapCommandTypeToTask } from './map-tasks.js';
import { mapFlagToCommandType } from './constants.js';
import { exec } from '#tasks';

export async function runGitTask(currentArg, allArgs) {
  const commandType = mapFlagToCommandType(currentArg);
  const gitTask = mapCommandTypeToTask[commandType];

  if (gitTask == null) return;

  const tasks = await gitTask(allArgs, commandType);

  try {
    if (Array.isArray(tasks)) {
      await runMultiTasks(tasks);
    } else {
      await exec(tasks);
    }
  } catch (error) {
    log.error(error.message);
    process.exit(1);
  }
}

export async function runNonGitTask(currentArg, allArgs) {
  const commandType = mapFlagToCommandType(currentArg);
  const execTask = mapCommandTypeToTask[commandType];

  try {
    const task = execTask(allArgs);

    if (task) {
      await exec(task);
    }
  } catch (error) {
    log.error(error.message);
    process.exit(1);
  }
}

async function runMultiTasks(tasks) {
  for (const task of tasks) {
    if (task) {
      await exec(task);
    }
  }
}
