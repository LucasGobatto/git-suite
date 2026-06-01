import { log } from '#log';
import { NON_GIT_COMMANDS, VALID_COMMANDS } from '../constants.js';

export function getIndex(commandType) {
  log.debug('COMMAND TYPE -', commandType);
  const args = process.argv.slice(2);

  const argIndex = args.findIndex((param) => VALID_COMMANDS[commandType].includes(param));

  return argIndex === -1 ? null : argIndex;
}

export function getExtraCommandIndex(index) {
  const args = process.argv.slice(2);
  const nonGitCommands = Object.values(NON_GIT_COMMANDS).flat();

  return args.findIndex((param) => nonGitCommands.includes(param) && nonGitCommands[index] === param);
}
