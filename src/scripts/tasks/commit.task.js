import { getIndex } from '#utils/get-index';
import { VALID_COMMAND_TYPES, VALID_COMMANDS, COMMIT_MESSAGE_LABEL } from '../constants.js';
import { addTask } from './task.js';

export function gitCommitTask(args) {
  const gitMessageCommandType = VALID_COMMAND_TYPES.MESSAGE;
  const gitCommitLabelCommandType = VALID_COMMAND_TYPES.COMMIT_MESSAGE_LABELS;

  const validCommitCommands = VALID_COMMANDS[gitMessageCommandType];

  const gCommitIndex = getIndex(gitMessageCommandType);
  const gCommitTypeIndex = getIndex(gitCommitLabelCommandType);

  if (gCommitIndex == null) return;

  if (validCommitCommands.includes(args[gCommitIndex + 1]) || !args[gCommitIndex + 1]) {
    throw new Error('The flag message must come with a value, for example: `gs -m "commit message"`.');
  }

  if (gCommitTypeIndex != null && gCommitIndex == null) {
    throw new Error(
      'The commit types flags must come with the commit flag, for example: `gs -m "commit message" --fx`.',
    );
  }

  const gitCommitParam = args[gCommitIndex + 1];
  const gCommitFlag = args[gCommitTypeIndex];
  const gCommitType = gCommitTypeIndex != null && COMMIT_MESSAGE_LABEL[gCommitFlag];

  return addTask('git', ['commit', `-m "${gCommitType ? `${gCommitType}: ${gitCommitParam}` : gitCommitParam}"`]);
}
