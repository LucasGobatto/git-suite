import { getCurrentBranch } from '#utils/get-current-branch';
import { getDefaultBranch } from '#utils/get-default-branch';
import { getIndex, getRebaseFlagIndex } from '#utils/get-index';
import { mapFlag } from '../constants.js';
import { addTask } from './task.js';

export async function gitRebaseTask(args) {
  const gRebaseIndex = getIndex(10);
  const gRebaseFlagIndex = getRebaseFlagIndex();
  const currentBranch = await getCurrentBranch();
  const defaultHeadBranch = await getDefaultBranch();

  if (gRebaseIndex > -1) {
    const [head, origin] = [args[gRebaseIndex + 1], args[gRebaseIndex + 2]];

    const goToHeadBranch = addTask('git', ['checkout', head ?? defaultHeadBranch]);
    const gitPull = addTask('git', ['pull', 'origin', head ?? defaultHeadBranch]);
    const goToCurrentBranch = addTask('git', ['checkout', origin ?? currentBranch]);
    const makeRebase = addTask('git', ['rebase', head ?? defaultHeadBranch]);

    return [goToHeadBranch, gitPull, goToCurrentBranch, makeRebase];

    // await exec(goToHeadBranch);
    // await exec(gitPull);
    // await exec(goToCurrentBranch);
    // await exec(makeRebase);

    // log.info('Run `gs -p -f` to push or `gs --rc` to continue rebase.\n');
    // log.success('Git flow finished successfully!');
    // process.exit(0);
  }

  if (gRebaseFlagIndex > -1) {
    if (args.length > 1) {
      throw new Error(
        `Invalid param ${args.slice(1).join(', ')}. Choose one flag to continue rebase \`--ra\`, \`--rs\` or \`--rc\` `,
      );
    }

    const flag = mapFlag[args[gRebaseFlagIndex]];

    if (flag) {
      const gitAdd = addTask('git', ['add', '.']);
      const gitRebase = addTask('git', ['rebase', flag]);

      // await exec(gitAdd);
      // await exec(gitRebase);

      return [gitAdd, gitRebase];
      // log.success('Git flow finished successfully!');
      // process.exit(0);
    } else {
      throw new Error(`Unexpected error. Received args: ${args.join(', ')}`);
    }
  }
}
