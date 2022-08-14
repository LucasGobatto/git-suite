import { spawn } from "child_process";
import { log } from "../../log/log.js";

export function addTask(command, args) {
  return { command, args };
}

export function exec(task) {
  log.info(`Running ${task.command} ${task.args.join(" ")}`);

  const spawned = spawn(task.command, task.args, { shell: true });

  return new Promise(async (res, rej) => {
    spawned.on("error", (error) => {
      log.error(`Task failed with message: ${error.message}.`);
      rej(error);
    });

    spawned.stdout.on("data", (data) => {
      log.git(data.toString());
    });

    spawned.on("exit", (code) => {
      if (code !== 0) {
        rej(`Task exit with status ${code}.`);
      } else {
        res(code);
      }
    });
  });
}
