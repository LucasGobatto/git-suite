import { spawn } from "child_process";

export function addTask(command, args) {
  return { command, args };
}

export function exec(task) {
  console.info(`Running ${[task.command, ...(task.args ?? [])].join(" ")}`);

  return new Promise(async (res, rej) => {
    await sleep();
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
        console.log("code", code, task);
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
      console.log("finish sleep");
      res();
    }, 2000);
  });
}
