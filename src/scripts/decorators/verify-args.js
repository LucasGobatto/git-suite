import { log } from '#log';
import { validCommands, commitType, rebaseFlags, extraCommands } from '../constants.js';

export function verifyArgs(fn) {
  return function (args) {
    if (!args.length) {
      log.error('git suite must come with some argument. Type `gs --help` to see list of commands.');
      process.exit(1);
    }

    const invalidParam = args.find(
      (param) => param[0] === '-' && !validCommands.includes(param) && !commitType.includes(param) && !rebaseFlags.includes(param) && !extraCommands.includes(param),
    );

    if (invalidParam) {
      log.error(`Param ${invalidParam} is not a valid command. Type \`gs --help\` to see list of commands.`);
      process.exit(1);
    }

    return fn(args);
  };
}
