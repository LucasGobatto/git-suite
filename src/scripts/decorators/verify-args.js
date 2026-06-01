import { log } from '#log';
import { VALID_COMMANDS } from '../constants.js';

export function verifyArgs(fn) {
  return function (args) {
    log.debug(args);

    if (!args.length) {
      log.error('git suite must come with some argument. Type `gs -help` to see list of commands.');
      process.exit(1);
    }

    const allValidCommands = Object.values(VALID_COMMANDS).flat();

    const invalidParam = args.find(
      (param) => param[0] === '-' && !allValidCommands.includes(param),
    );

    if (invalidParam) {
      log.error(`Param ${invalidParam} is not a valid command. Type \`gs --help\` to see list of commands.`);
      process.exit(1);
    }

    return fn(args);
  };
}
