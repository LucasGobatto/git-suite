import { log } from '#log';
import { getExtraCommandIndex } from '#utils/get-index';
import { addTask } from '../tasks/task.js';

export const setDefatultConflictEditor = (args) => {
  const editorFlag = getExtraCommandIndex(1);

  if (editorFlag > -1) {
    if (args.lenght > 1) {
      throw new Error(`Invalid argments - ${args.splice(1).join(', ')}`);
    }

    log.info('Setting VSCode as default editor for resolve conflits...');
    return addTask('git', ['config', '--global', 'core.editor', 'code', '--wait']);
  }
};
