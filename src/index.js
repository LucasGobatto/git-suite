#!/usr/bin/env node

import { exec, addTask } from "./task.js";
import { log } from "./log/log.js";
import { help } from "./help/help.js";
import { runRebaseTask } from "./rebase/rebase-task.js";

const extraCommands = ["--help"];
const validCommands = ["-a", "-add", "-c", "-commit", "-p", "-push", "-f", "-force", "-rh", "-reset-head", "-r", "-rebase"];
const commitType = ["--ft", "--fx", "--e", "--c", "--d"];
const types = {
  [commitType[0]]: "feat",
  [commitType[1]]: "fix",
  [commitType[2]]: "enhance",
  [commitType[3]]: "chore",
  [commitType[4]]: "docs",
};

const args = process.argv;
const extraParams = process.argv.slice(2);

if (!extraParams.length) {
  log.error("git suite must come with some argument. Type `gs --help` to see list of commands.");
  process.exit(1);
}

if (extraParams[0] === extraCommands[0]) {
  help();
}

const invalidParam = extraParams.find(
  (param) => param[0] === "-" && !validCommands.includes(param) && !commitType.includes(param)
);

if (invalidParam) {
  log.error(`Param ${invalidParam} is not a valid command. Type \`gs --help\` to see list of commands.`);
  process.exit(1);
}

const getIndex = (index) => {
  return args.findIndex((param) => param === validCommands[index] || param === validCommands[index + 1]);
};

const gAddIndex = getIndex(0);
const gCommitIndex = getIndex(2);
const gPushIndex = getIndex(4);
const gPushForceIndex = getIndex(6);
const gResetHeadIndex = getIndex(8);
const gRebaseIndex = getIndex(10);
const gCommitTypeIndex = args.findIndex((param) => commitType.includes(param));

const validateCommands = () => {
  if (validCommands.includes(args[gCommitIndex + 1]) || !args[gCommitIndex + 1]) {
    log.error('Flag message must come with a value like `gs -c "commit message"`.');
    process.exit(1);
  }

  if (gCommitTypeIndex > -1 && gCommitIndex === -1) {
    log.error('Commit types flags must come with commit flag `gs -c "commit message" --fx`.');
    process.exit(1);
  }

  if (gPushForceIndex > -1 && gPushIndex < 0) {
    log.error("Push force must come with the push flag `gs -p -f`.");
    process.exit(1);
  }

  if (
    gResetHeadIndex > -1 &&
    !validCommands.includes(args[gResetHeadIndex + 1]) &&
    args[gResetHeadIndex + 1] &&
    !Number(args[gResetHeadIndex + 1])
  ) {
    log.error('Reset head must come with a number "-rh 1". If pass anything, the default is 1.');
    process.exit(1);
  }

  if (
    (gRebaseIndex > -1 && extraParams.length < 3) ||
    validCommands.includes(args[gRebaseIndex + 1]) ||
    validCommands.includes(args[gRebaseIndex + 2])
  ) {
    log.error("Rebase flag requires the target branchs names `gs -r target-branch <origin-branch>`"); // todo - review this message
    process.exit(1);
  }

  if (gRebaseIndex > -1 && gRebaseIndex !== 2 && !(2 <= extraParams.length && extraParams.length <= 3)) {
    log.error("Cannot do anything these than rebase when rebase flag is setted up");
    process.exit(1);
  }
};

validateCommands();

const gitAddFiles =
  gAddIndex > -1 && args[gAddIndex + 1] && !validCommands.includes(args[gAddIndex + 1]) ? args[gAddIndex + 1] : undefined;
const gitCommitParam = gCommitIndex > -1 && args[gCommitIndex + 1];
const gCommitType = gCommitTypeIndex > -1 && types[args[gCommitTypeIndex]];
const gitPushParam = gPushIndex > -1;
const gPushBranch = gPushIndex > -1 && !validCommands.includes(args[gPushIndex + 1]) ? args[gPushIndex + 1] : undefined;
const gPushForceParam = gPushForceIndex > -1 && args[gPushForceIndex];
const gResetHeadParam = gResetHeadIndex > -1 ? args[gResetHeadIndex + 1] ?? 1 : undefined;
const gRebaseBranchs = gRebaseIndex > -1 ? [args[gRebaseIndex + 1], args[gRebaseIndex + 2]] : undefined;

const gaa = [];

if (gitAddFiles) {
  gitAddFiles.split(",").forEach((file) => {
    const task = addTask("git", ["add", file]);
    gaa.push(task);
  });
} else if (gAddIndex > -1) {
  gaa.push(addTask("git", ["add", "."]));
}

const gcmsg =
  gitCommitParam && addTask("git", ["commit", `-m "${gCommitType ? `${gCommitType}: ${gitCommitParam}` : gitCommitParam}"`]);
const ggp =
  gitPushParam && addTask("git", ["push", gPushForceParam && "-f", gPushBranch && `origin ${gPushBranch}`].filter(Boolean));
const grh = gResetHeadParam && addTask("git", ["reset", `HEAD~${gResetHeadParam ?? 1}`]);

if (gRebaseBranchs) {
  await runRebaseTask(gRebaseBranchs);
}

async function runTasks() {
  if (grh) {
    await exec(grh);
  }

  if (gaa.length) {
    for (const task of gaa) {
      await exec(task);
    }
  }

  if (gcmsg) {
    await exec(gcmsg);
  }

  if (ggp) {
    await exec(ggp);
  }

  log.success(`Git flow finished successfully!`);
}

runTasks();
