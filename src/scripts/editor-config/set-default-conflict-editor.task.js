import { log } from '#log';
import { getExtraCommandIndex } from '#utils/get-index.js';
import { addTask, exec } from '../tasks/task.js';

export const setDefatultConflictEditor = async (args) => {
  const editorFlag = getExtraCommandIndex(1);

  if (editorFlag > -1) {
    if (args.lenght > 1) {
      throw new Error(`Invalid argments - ${args.splice(1).join(', ')}`);
    }

    try {
      log.info('Setting VSCode as default editor for resolve conflits...');
      const task = addTask('git', ['config', '--global', 'core.editor', 'code', '--wait']);
      await exec(task);
      log.success('Git flow finished successfully!');
      process.exit(0);
    } catch (e) {
      log.error(e);
    }
  }
};
