import { spawn } from "child_process";
import { log } from "../../log/log.js";

export function getCurrentBranch() {
  // git rev-parse --abbrev-ref HEAD

  const spawned = spawn("git rev-parse --abbrev-ref HEAD", { shell: true });
  let currentBranch;

  return new Promise(async (res, rej) => {
    spawned.on("error", (error) => {
      log.error(`Task failed with message: ${error.message}.`);
      rej(error);
    });

    spawned.stdout.on("data", (data) => {
      currentBranch = data.toString();
    });

    spawned.stderr.on("data", (data) => {
      log.git(data.toString());
    });

    spawned.on("exit", (code) => {
      if (code !== 0) {
        rej(new Error(`Task exit with status ${code}.`));
      } else {
        res(currentBranch.replace("\n", ""));
      }
    });
  });
}
