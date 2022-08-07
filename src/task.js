import { spawn } from "child_process";

export function addTask(command, args) {
  return { command, args };
}

export function exec(task) {
  return new Promise(async (res, rej) => {
    console.info(`1 Running ${[task.command, ...(task.args ?? [])].join(" ")}`);
    await sleep();
    console.info(`2 Running ${[task.command, ...(task.args ?? [])].join(" ")}`);

    const spawned = spawn(task.command, task.args, { shell: true });

    spawned.on("error", (error) => {
      console.error(`Task failed with message: ${error.message}`);
      rej();
    });

    spawned.stderr.on("data", (data) => {
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

function sleep() {
  return new Promise((res) => {
    setTimeout(() => {
      res();
    }, 1000);
  });
}
