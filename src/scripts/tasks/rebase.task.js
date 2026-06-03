import { getCurrentBranch } from '#utils/get-current-branch';
import { getDefaultBranch } from '#utils/get-default-branch';
import { getIndex } from '#utils/get-index';
import { REBASE_FLAGS, VALID_COMMAND_TYPES, VALID_COMMANDS, VALID_REBASE_FLAGS } from '../constants.js';
import { addTask } from './task.js';

export async function gitRebaseTask(args, rebaseFlag) {
  const gRebaseIndex = getIndex(rebaseFlag);
  const currentBranch = await getCurrentBranch();
  const defaultBranch = await getDefaultBranch();

  if (gRebaseIndex == null) return;

  if (rebaseFlag === REBASE_FLAGS.REBASE) {
    const [head, origin] = [args[gRebaseIndex + 1], args[gRebaseIndex + 2]];
    const allValidCommands = Object.values(VALID_COMMANDS).flat();

    const isValidHeadBranch = !allValidCommands.includes(head); // next argument is not a git comment
    const validHeadBranch = head && isValidHeadBranch ? head : defaultBranch; // default to default branch (e.g. main or develop)
    const isValidOriginBranch = !allValidCommands.includes(origin);
    const validOrigin = origin && isValidOriginBranch ? origin : currentBranch; // default to currnet branch

    const goToHeadBranch = addTask('git', ['checkout', validHeadBranch]);
    const gitPull = addTask('git', ['pull', 'origin', validHeadBranch]);
    const goToCurrentBranch = addTask('git', ['checkout', validOrigin]);
    const makeRebase = addTask('git', ['rebase', validHeadBranch]);

    return [goToHeadBranch, gitPull, goToCurrentBranch, makeRebase];
  }

  const hasAddFlag = args.some((arg) => VALID_COMMANDS[VALID_COMMAND_TYPES.ADD].includes(arg));

  const flag = VALID_REBASE_FLAGS[rebaseFlag][1];

  const gitRebase = addTask('git', ['rebase', flag]);

  if (!hasAddFlag) {
    const gitAdd = addTask('git', ['add', '.']);
    return [gitAdd, gitRebase];
  }

  return gitRebase;
}
