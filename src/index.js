#!/usr/bin/env node

import { exec, addTask } from "./task.js";

const validCommands = ["-a", "-add", "-m", "-message", "-p", "-push", "-f", "--force"];

const args = process.argv;
const extraParams = args.slice(2);

const gAddIndex = args.findIndex((param) => param === validCommands[0] || param === validCommands[1]);
const gCommitIndex = args.findIndex((param) => param === validCommands[2] || param === validCommands[3]);
const gPushIndex = args.findIndex((param) => param === validCommands[4] || param === validCommands[5]);
const gPushForceIndex = args.findIndex((param) => param === validCommands[6] || param === validCommands[7]);

if (validCommands.includes(args[gCommitIndex + 1]) || !args[gCommitIndex + 1]) {
  throw new Error('Flag message must come with a value like "-m commit-message"');
}

if (validCommands.includes(args[gPushIndex + 1]) || !args[gPushIndex + 1]) {
  throw new Error('Flag push must come with the branch name "-p branch-name"');
}

if (gPushForceIndex > -1 && gPushIndex < 0) {
  throw new Error('Push force must come with the push flash "-p branch-name"');
}

const gitAddFiles = args[gAddIndex + 1] && !validCommands.includes(args[gAddIndex + 1]) ? extraParams[gAddIndex - 1] : undefined;
const gitCommitParam = extraParams[gCommitIndex - 1];
const gitPushParam = extraParams[gPushIndex - 1];
const gPushForceParam = extraParams[gPushForceIndex - 1];

const gaa = [];
if (gitAddFiles) {
  gitAddFiles.split(",").forEach((file) => {
    const task = addTask("git", ["add", file]);
    gaa.push(task);
  });
} else {
  gaa.push(addTask("git", ["add", "."]));
}

const gcmsg = gitCommitParam && addTask("git", ["commit", "-m", gitCommitParam]);
const ggp = gitPushParam && addTask("git", ["push", gPushForceParam ? "-f" : "", "origin", gitPushParam]);

async function runTasks() {
  try {
    if (gaa) {
      gaa.forEach(async (task) => {
        await exec(task);
      });
    }

    if (gcmsg) {
      await exec(gcmsg);
    }

    if (ggp) {
      await exec(ggp);
    }
  } catch (error) {
    console.log(error);
  }
}

runTasks();
