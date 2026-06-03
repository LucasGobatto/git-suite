import {
  COMMIT_MESSAGE_LABEL,
  NON_GIT_COMMANDS,
  VALID_COMMANDS,
  VALID_COMMAND_TYPES,
  VALID_REBASE_FLAGS,
} from '../constants.js';

const PROGRAM = 'gs';
const INDENT = '  ';
const COLUMN_WIDTH = 42;

function formatFlags(flags) {
  return flags.join(', ');
}

function printLine(syntax, description) {
  console.info(`${INDENT}${syntax.padEnd(COLUMN_WIDTH)}${description}`);
}

function printSection(title) {
  console.info(title);
}

export function help() {
  console.info(`${PROGRAM} - Git workflow shortcuts\n`);
  console.info(`Usage: ${PROGRAM} [options]\n`);

  printSection('General:');
  printLine(formatFlags(NON_GIT_COMMANDS[VALID_COMMAND_TYPES.HELP]), 'Show this help message');
  printLine(
    formatFlags(NON_GIT_COMMANDS[VALID_COMMAND_TYPES.EDITOR_VSC]),
    'Set VS Code as the default git conflict editor',
  );
  console.info();

  printSection('Commands:');
  printLine(`${formatFlags(VALID_COMMANDS[VALID_COMMAND_TYPES.ADD])} [files]`, 'Stage files (default: git add .)');
  printLine(`${formatFlags(VALID_COMMANDS[VALID_COMMAND_TYPES.MESSAGE])} <message>`, 'Commit with a message');
  printLine(`${formatFlags(VALID_COMMANDS[VALID_COMMAND_TYPES.CHECKOUT])} <branch>`, 'Switch to a branch');
  printLine(
    `${formatFlags(VALID_COMMANDS[VALID_COMMAND_TYPES.CREATE_BRANCH])} <branch>`,
    'Create and switch to a branch',
  );
  printLine(formatFlags(VALID_COMMANDS[VALID_COMMAND_TYPES.CHECKOUT_DEFAULT]), 'Checkout and pull the default branch');
  printLine(
    `${formatFlags(VALID_COMMANDS[VALID_COMMAND_TYPES.PULL])} [branch]`,
    'Pull from origin (default: current branch)',
  );
  printLine(
    `${formatFlags(VALID_COMMANDS[VALID_COMMAND_TYPES.PUSH])} [branch]`,
    'Push to origin (default: current branch)',
  );
  printLine(formatFlags(VALID_COMMANDS[VALID_COMMAND_TYPES.FORCE]), 'Force push (use with -p or --push)');
  printLine(`${formatFlags(VALID_COMMANDS[VALID_COMMAND_TYPES.RESET_HEAD])} [n]`, 'Reset HEAD~n (default: 1)');
  printLine(
    `${formatFlags(VALID_REBASE_FLAGS.rebase)} [head] [target]`,
    'Rebase target onto head (defaults: default branch, current branch)',
  );
  console.info();

  printSection('Commit message prefixes (use with -m or --message):');
  for (const flag of VALID_COMMANDS[VALID_COMMAND_TYPES.COMMIT_MESSAGE_LABELS]) {
    printLine(flag, `Prefix message with "${COMMIT_MESSAGE_LABEL[flag]}:"`);
  }
  console.info();

  printSection('Rebase options:');
  printLine(formatFlags(VALID_REBASE_FLAGS.continue), 'Continue rebase after resolving conflicts');
  printLine(formatFlags(VALID_REBASE_FLAGS.abort), 'Abort the current rebase');
  printLine(formatFlags(VALID_REBASE_FLAGS.skip), 'Skip the current rebase commit');
  console.info();

  printSection('Examples:');
  console.info(`${INDENT}${PROGRAM} -a -m "initial commit" --ft -p main -f`);
  console.info(`${INDENT}${PROGRAM} -a src/index.js,src/utils.js -m "fix login" --fx`);
  console.info(`${INDENT}${PROGRAM} -r main develop`);
  console.info(`${INDENT}${PROGRAM} -rc`);
  console.info();
}
