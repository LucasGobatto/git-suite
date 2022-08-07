#!/usr/bin/env node

import { exec, addTask } from "./task.js";

const validCommands = ["-a", "-add", "-m", "-message", "-p", "-push", "-f", "--force", "-rh", "-reset-head"];

const args = process.argv;

const gAddIndex = args.findIndex((param) => param === validCommands[0] || param === validCommands[1]);
const gCommitIndex = args.findIndex((param) => param === validCommands[2] || param === validCommands[3]);
const gPushIndex = args.findIndex((param) => param === validCommands[4] || param === validCommands[5]);
const gPushForceIndex = args.findIndex((param) => param === validCommands[6] || param === validCommands[7]);
const gResetHeadIndex = args.findIndex((param) => param === validCommands[8] || param === validCommands[9]);

if (validCommands.includes(args[gCommitIndex + 1]) || !args[gCommitIndex + 1]) {
  throw new Error('Flag message must come with a value like "-m commit-message"');
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
const gitPushParam = gPushIndex > -1 && args[gPushIndex + 1];
const gPushForceParam = gPushForceIndex > -1 && args[gPushForceIndex + 1];
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

const gcmsg = gitCommitParam && addTask(`git commit -m "${gitCommitParam}"`);
const ggp = gitPushParam && addTask("git", ["push", gPushForceParam ? "-f origin" : "origin", gitPushParam]);
const grh = gResetHeadParam && addTask("git", ["reset", `HEAD~${gResetHeadParam ?? 1}`]);

async function runTasks() {
  if (grh) {
    await exec(grh);
    await sleep();
  }

  if (gaa.length) {
    gaa.forEach(async (task) => {
      await exec(task);
      await sleep();
    });
  }

  if (gcmsg) {
    await exec(gcmsg);
    await sleep();
  }

  if (ggp) {
    await exec(ggp);
    await sleep();
  }
}

await runTasks();

function sleep() {
  return new Promise((res) => {
    setTimeout(() => {
      console.log("finish sleep");
      res();
    }, 2000);
  });
}
