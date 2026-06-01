export const extraCommands = ['--help', '--editor-vsc'];

export const REBASE_FLAGS = {
  CONTINUE: 'continue',
  ABORT: 'abort',
  SKIP: 'skip',
  REBASE: 'rebase',
};

export const VALID_REBASE_FLAGS = {
  [REBASE_FLAGS.CONTINUE]: ['-rc', '--continue'],
  [REBASE_FLAGS.ABORT]: ['-ra', '--abort'],
  [REBASE_FLAGS.SKIP]: ['-rs', '--skip'],
  [REBASE_FLAGS.REBASE]: ['-r', '--rebase'],
};

export const VALID_COMMAND_TYPES = {
  HELP: 'help',
  EDITOR_VSC: 'editor-vsc',
  ADD: 'add',
  MESSAGE: 'message',
  COMMIT_MESSAGE_LABELS: 'commit-message-labels',
  PUSH: 'push',
  FORCE: 'force',
  RESET_HEAD: 'reset-head',
  CHECKOUT: 'checkout',
  CREATE_BRANCH: 'checkout-branch',
  CHECKOUT_DEFAULT: 'checkout-default',
  PULL: 'pull',
};

export const NON_GIT_COMMANDS = {
  [VALID_COMMAND_TYPES.HELP]: ['--help'],
  [VALID_COMMAND_TYPES.EDITOR_VSC]: ['--editor-vsc'],
};

export const VALID_COMMANDS = {
  [VALID_COMMAND_TYPES.ADD]: ['-a', '--add'],
  [VALID_COMMAND_TYPES.MESSAGE]: ['-m', '--message'],
  [VALID_COMMAND_TYPES.COMMIT_MESSAGE_LABELS]: ['--ft', '--fx', '--e', '--c', '--d'],
  [VALID_COMMAND_TYPES.PUSH]: ['-p', '--push'],
  [VALID_COMMAND_TYPES.FORCE]: ['-f', '--force'],
  [VALID_COMMAND_TYPES.RESET_HEAD]: ['-rh', '--reset-head'],
  [VALID_COMMAND_TYPES.CHECKOUT]: ['-c', '--checkout'],
  [VALID_COMMAND_TYPES.CREATE_BRANCH]: ['-cb', '--checkout-branch'],
  [VALID_COMMAND_TYPES.CHECKOUT_DEFAULT]: ['-cd'],
  [VALID_COMMAND_TYPES.PULL]: ['-pl', '--pull'],
  ...VALID_REBASE_FLAGS,
  ...NON_GIT_COMMANDS,
};

export const mapFlagToCommandType = (flag) =>
  Object.entries(VALID_COMMANDS).find(([key, value]) => value.includes(flag))[0];

export const COMMIT_MESSAGE_LABEL = {
  [VALID_COMMANDS[VALID_COMMAND_TYPES.COMMIT_MESSAGE_LABELS][0]]: 'feat',
  [VALID_COMMANDS[VALID_COMMAND_TYPES.COMMIT_MESSAGE_LABELS][1]]: 'fix',
  [VALID_COMMANDS[VALID_COMMAND_TYPES.COMMIT_MESSAGE_LABELS][2]]: 'enhance',
  [VALID_COMMANDS[VALID_COMMAND_TYPES.COMMIT_MESSAGE_LABELS][3]]: 'chore',
  [VALID_COMMANDS[VALID_COMMAND_TYPES.COMMIT_MESSAGE_LABELS][4]]: 'docs',
};
