import { log } from '#log';
import { addTask } from '#tasks';
import { getExtraCommandIndex } from '#utils/get-index';
import { EDITOR_GIT_COMMANDS, VALID_COMMANDS, VALID_COMMAND_TYPES } from '../constants.js';

export const setDefaultConflictEditorTask = (args, editor) => {
  const editorFlag = getExtraCommandIndex(VALID_COMMANDS[editor]);

  if (editorFlag == null) return;

  if (args.length > 1) {
    throw new Error(`Invalid arguments - ${args.splice(1).join(', ')}`);
  }

  if (editor === VALID_COMMAND_TYPES.EDITOR_VIM) {
    log.info('Setting Vim as default editor for resolve conflicts...');
  } else {
    log.info('Setting VSCode as default editor for resolve conflicts...');
  }

  return addTask('git', ['config', '--global', 'core.editor', ...EDITOR_GIT_COMMANDS[editor]]);
};
