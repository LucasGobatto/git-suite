import { spawn } from "child_process";
import { log } from "./log.js";

export function addTask(command, args) {
  return { command, args };
}

export function exec(task) {
  log.info(`Running ${task.command} ${task.args.join(" ")}`);

  const spawned = spawn(task.command, task.args, { shell: true });

  return new Promise(async (res, rej) => {
    spawned.on("error", (error) => {
      log.error(`Task failed with message: ${error.message}.`);
      rej();
    });

    spawned.stderr.on("error", (error) => {
      log.error(error.toString());
    });

    spawned.stdout.on("data", (data) => {
      log.info(data.toString());
    });

    spawned.on("exit", (code) => {
      if (code !== 0) {
        rej(`Task exit with status ${code}.`);
      } else {
        log.info(`Finish ${task.command} ${task.args.join(" ")}`);
        res(code);
      }
    });
  });
}
