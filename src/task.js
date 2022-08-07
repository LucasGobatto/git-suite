import { spawn } from "child_process";

export function addTask(command, args) {
  return { command, args };
}

export function exec(task) {
  console.info(`Running ${[task.command, ...task.args].join(" ")}`);

  return new Promise((res, rej) => {
    const spawned = spawn(task.command, task.args, { shell: true });

    spawned.stderr.on("error", (error) => {
      console.error(`Task failed with message: ${error.message}`);
    });

    spawned.stdout.on("data", (data) => {
      console.info(data.toString());
    });

    spawned.on("exit", (code) => {
      if (code !== 0) {
        rej(`Task exit with status ${code}`);
      } else {
        res(code);
      }
    });
  });
}
