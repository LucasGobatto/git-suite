import { spawn } from 'child_process';
import { log } from '#log';

export function getDefaultBranch() {
  // git remote show origin | grep 'HEAD branch' | cut -d' ' -f5
  const spawned = spawn("git remote show origin | grep 'HEAD branch' | cut -d' ' -f5", { shell: true });
  let defaultBranch;

  return new Promise(async (res, rej) => {
    spawned.on('error', (error) => {
      log.error(`Task failed with message: ${error.message}.`);
      rej(error);
    });

    spawned.stdout.on('data', (data) => {
      defaultBranch = data.toString();
    });

    spawned.stderr.on('data', (data) => {
      log.git(data.toString());
    });

    spawned.on('exit', (code) => {
      if (code !== 0) {
        rej(new Error(`Task exit with status ${code}.`));
      } else {
        res(defaultBranch.replace('\n', ''));
      }
    });
  });
}
