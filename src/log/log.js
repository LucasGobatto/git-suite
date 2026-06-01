import chalk from 'chalk';

const LOG_LEVEL = {
  debug: ['debug', 'info', 'success', 'error', 'git'],
  info: ['info', 'success', 'error', 'git'],
  success: ['success', 'error', 'git'],
  error: ['error', 'git'],
};

const logIfLevelAllowed = (level, fn) => {
  const checkLevel = (level) => (LOG_LEVEL[process.env.LOG_LEVEL] ?? LOG_LEVEL.info).includes(level);

  return function (...value) {
    if (!checkLevel(level)) return;
    fn(...value);
  };
};

const info = (...value) => {
  console.info(chalk.green('info:'), ...value);
};

const success = (...value) => {
  console.info(chalk.blue('done:'), ...value);
};

const error = (...value) => {
  console.error(chalk.red('error:'), ...value);
};

const git = (...value) => {
  console.info(chalk.yellow('git:'), ...value);
};

const debug = (...value) => {
  console.debug(chalk.hex('#5f14ba')('debug:'), ...value);
};

export const log = {
  info: logIfLevelAllowed('info', info),
  error: logIfLevelAllowed('error', error),
  success: logIfLevelAllowed('success', success),
  git: logIfLevelAllowed('git', git),
  debug: logIfLevelAllowed('debug', debug),
};
