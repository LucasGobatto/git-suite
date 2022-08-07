#!/usr/bin/env node

import { exec, addTask } from "./task.js";

const extraCommands = ["--help"];
const validCommands = ["-a", "-add", "-c", "-commit", "-p", "-push", "-f", "-force", "-rh", "-reset-head", "--help"];
const commitType = ["--ft", "--fx", "--e", "--c"];
const types = {
  [commitType[0]]: "feat",
  [commitType[1]]: "fix",
  [commitType[2]]: "enhanc",
  [commitType[3]]: "chore",
};

const args = process.argv;
const extraParams = process.argv.slice(2);

if (!extraParams.length) {
  throw new Error("git suite must come with some argument. Type `gs --help` to see list of commands");
}

if (extraParams[0] === extraCommands[0]) {
  console.info("gs [--help] <command> [<args>]\n");
  console.info("Usage:\n");
  console.info("-add | -a [<file>,<file>,...]\t\tgit add <file>\t\t\t[default] git add .");
  console.info('-commit | -c <message>\t\t\tgit commit -m "message"');
  console.info('--ft | --fx | --e | --c\t\t\tgit commit -m "flag: message"\tmust comt with -c flag');
  console.info("-push | -p <branch>\t\t\tgit push origin <branch>");
  console.info("-force | -f\t\t\t\tgit push -f origin <branch>\tmust come with -push flag");
  console.info("-rest-head | -rs [<number>]\t\tgit reset HEAD~<number>\t\t[default] git reset HEAD~1");
  console.info();
}

const invalidParam = extraParams.find(
  (param) => param[0] === "-" && !validCommands.includes(param) && !commitType.includes(param)
);

if (invalidParam) {
  throw new Error(`Param ${invalidParam} is not a valid command. Type \`gs --help\` to see list of commands`);
}

const gAddIndex = args.findIndex((param) => param === validCommands[0] || param === validCommands[1]);
const gCommitIndex = args.findIndex((param) => param === validCommands[2] || param === validCommands[3]);
const gCommitTypeIndex = args.findIndex((param) => commitType.includes(param));
const gPushIndex = args.findIndex((param) => param === validCommands[4] || param === validCommands[5]);
const gPushForceIndex = args.findIndex((param) => param === validCommands[6] || param === validCommands[7]);
const gResetHeadIndex = args.findIndex((param) => param === validCommands[8] || param === validCommands[9]);

if (validCommands.includes(args[gCommitIndex + 1]) || !args[gCommitIndex + 1]) {
  throw new Error('Flag message must come with a value like `-c "commit message"`');
}

if (gCommitTypeIndex > -1 && gCommitIndex === -1) {
  throw new Error('Commit types flags must come with commit flag `-c "commit message" --fx`');
}

if (validCommands.includes(args[gPushIndex + 1]) || !args[gPushIndex + 1]) {
  throw new Error('Flag push must come with the branch name "-p branch-name"');
}

if (gPushForceIndex > -1 && gPushIndex < 0) {
  throw new Error('Push force must come with the push flash "-p branch-name"');
}

if (
  gResetHeadIndex > -1 &&
  !validCommands.includes(args[gResetHeadIndex + 1]) &&
  args[gResetHeadIndex + 1] &&
  !Number(args[gResetHeadIndex + 1])
) {
  throw new Error('Reset head must come with a number "-rh 1". If pass anything, the default is 1');
}

const gitAddFiles =
  gAddIndex > -1 && args[gAddIndex + 1] && !validCommands.includes(args[gAddIndex + 1]) ? args[gAddIndex + 1] : undefined;
const gitCommitParam = gCommitIndex > -1 && args[gCommitIndex + 1];
const gCommitType = gCommitTypeIndex > -1 && types[args[gCommitTypeIndex]];
const gitPushParam = gPushIndex > -1 && args[gPushIndex + 1];
const gPushForceParam = gPushForceIndex > -1 && args[gPushForceIndex];
const gResetHeadParam = gResetHeadIndex > -1 ? args[gResetHeadIndex + 1] ?? 1 : undefined;

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
const ggp = gitPushParam && addTask("git", ["push", gPushForceParam ? "-f origin" : "origin", gitPushParam]);
const grh = gResetHeadParam && addTask("git", ["reset", `HEAD~${gResetHeadParam ?? 1}`]);

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
}

runTasks();
