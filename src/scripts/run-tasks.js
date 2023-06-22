import { log } from '#log';
import { mapFlagToGitCommand, mapExtraCommands } from './map-tasks.js';
import { exec } from '#tasks';

export async function runGitTask(currentArg, allArgs) {
  const gitTask = mapFlagToGitCommand[currentArg];
  const tasks = await gitTask(allArgs);

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

export async function runExtraCommands(currentArg, allArgs) {
  const extraCommand = mapExtraCommands[currentArg];

  try {
    const task = extraCommand(allArgs);

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
