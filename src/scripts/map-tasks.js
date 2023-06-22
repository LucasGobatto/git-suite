import { extraCommands, validCommands } from './constants.js';
import { help, setDefatultConflictEditor } from './extra-tasks/index.js';
import {
  gitAddTask,
  gitCheckoutDefaultBranch,
  gitCheckoutTaks,
  gitCommitTask,
  gitCreateBranch,
  gitPullTask,
  gitPushForceTask,
  gitPushTask,
  gitRebaseTask,
  gitResetHeadTask,
} from '#tasks';

export const mapFlagToGitCommand = {
  [validCommands[0]]: gitAddTask,
  [validCommands[1]]: gitAddTask,
  [validCommands[2]]: gitCommitTask,
  [validCommands[3]]: gitCommitTask,
  [validCommands[4]]: gitPushTask,
  [validCommands[5]]: gitPushTask,
  [validCommands[6]]: gitPushForceTask,
  [validCommands[7]]: gitPushForceTask,
  [validCommands[8]]: gitResetHeadTask,
  [validCommands[9]]: gitResetHeadTask,
  [validCommands[10]]: gitRebaseTask,
  [validCommands[11]]: gitRebaseTask,
  [validCommands[12]]: gitCheckoutTaks,
  [validCommands[13]]: gitCheckoutTaks,
  [validCommands[14]]: gitCreateBranch,
  [validCommands[15]]: gitCreateBranch,
  [validCommands[16]]: gitCheckoutDefaultBranch,
  [validCommands[17]]: gitPullTask,
};

export const mapExtraCommands = {
  [extraCommands[0]]: help,
  [extraCommands[1]]: setDefatultConflictEditor,
};
