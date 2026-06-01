import { getCurrentBranch } from '#utils/get-current-branch';
import { getDefaultBranch } from '#utils/get-default-branch';
import { getIndex } from '#utils/get-index';
import { REBASE_FLAGS, VALID_REBASE_FLAGS } from '../constants.js';
import { addTask } from './task.js';

export async function gitRebaseTask(args, rebaseFlag) {
  const gRebaseIndex = getIndex(rebaseFlag);
  const currentBranch = await getCurrentBranch();
  const defaultHeadBranch = await getDefaultBranch();

  if (gRebaseIndex == null) return;

  if (rebaseFlag === REBASE_FLAGS.REBASE) {
    const [head, origin] = [args[gRebaseIndex + 1], args[gRebaseIndex + 2]];

    const goToHeadBranch = addTask('git', ['checkout', head ?? defaultHeadBranch]);
    const gitPull = addTask('git', ['pull', 'origin', head ?? defaultHeadBranch]);
    const goToCurrentBranch = addTask('git', ['checkout', origin ?? currentBranch]);
    const makeRebase = addTask('git', ['rebase', head ?? defaultHeadBranch]);

    return [goToHeadBranch, gitPull, goToCurrentBranch, makeRebase];
  }

  if (args.length > 1)
    throw new Error(
      `Invalid param ${args.slice(1).join(', ')}. Choose one flag to continue rebase \`-ra\`, \`-rs\` or \`-rc\` `,
    );

  const flag = VALID_REBASE_FLAGS[rebaseFlag][0];

  const gitAdd = addTask('git', ['add', '.']);
  const gitRebase = addTask('git', ['rebase', flag]);

  return [gitAdd, gitRebase];
}
