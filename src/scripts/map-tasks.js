import {
  gitAddTask,
  gitCheckoutDefaultBranch,
  gitCheckoutTask,
  gitCommitTask,
  gitCreateBranch,
  gitPullTask,
  gitPushTask,
  gitRebaseTask,
  gitResetHeadTask,
} from '#tasks';
import { VALID_COMMAND_TYPES, REBASE_FLAGS } from './constants.js';
import { help, setDefaultConflictEditorTask } from './extra-tasks/index.js';

export const mapCommandTypeToTask = {
  [VALID_COMMAND_TYPES.ADD]: gitAddTask,
  [VALID_COMMAND_TYPES.MESSAGE]: gitCommitTask,
  [VALID_COMMAND_TYPES.PUSH]: gitPushTask,
  [VALID_COMMAND_TYPES.RESET_HEAD]: gitResetHeadTask,
  [VALID_COMMAND_TYPES.CHECKOUT]: gitCheckoutTask,
  [VALID_COMMAND_TYPES.CREATE_BRANCH]: gitCreateBranch,
  [VALID_COMMAND_TYPES.CHECKOUT_DEFAULT]: gitCheckoutDefaultBranch,
  [VALID_COMMAND_TYPES.PULL]: gitPullTask,
  [VALID_COMMAND_TYPES.HELP]: help,
  [VALID_COMMAND_TYPES.EDITOR_VSC]: setDefaultConflictEditorTask,

  [REBASE_FLAGS.REBASE]: (args) => gitRebaseTask(args, REBASE_FLAGS.REBASE),
  [REBASE_FLAGS.CONTINUE]: (args) => gitRebaseTask(args, REBASE_FLAGS.CONTINUE),
  [REBASE_FLAGS.ABORT]: (args) => gitRebaseTask(args, REBASE_FLAGS.ABORT),
  [REBASE_FLAGS.SKIP]: (args) => gitRebaseTask(args, REBASE_FLAGS.SKIP),
};
