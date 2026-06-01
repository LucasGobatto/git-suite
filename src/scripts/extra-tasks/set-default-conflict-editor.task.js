import { log } from '#log';
import { addTask } from '#tasks';
import { getExtraCommandIndex } from '#utils/get-index';
import { VALID_COMMANDS } from '../constants.js';

export const setDefaultConflictEditorTask = (args) => {
  const editorFlag = getExtraCommandIndex(VALID_COMMANDS.EDITOR_VSC);

  if (editorFlag == null) return;

  if (args.length > 1) {
    throw new Error(`Invalid arguments - ${args.splice(1).join(', ')}`);
  }

  log.info('Setting VSCode as default editor for resolve conflicts...');
  return addTask('git', ['config', '--global', 'core.editor', 'code', '--wait']);
};
