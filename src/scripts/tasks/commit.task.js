import { getIndex } from "../utils/get-index.js";
import { commitType, validCommands, types } from "../constants.js";
import { addTask } from "./task.js";

export function gitCommitTask(args) {
  const gCommitIndex = getIndex(2);
  const gCommitTypeIndex = args.findIndex((param) => commitType.includes(param));

  if (gCommitIndex > -1) {
    if (validCommands.includes(args[gCommitIndex + 1]) || !args[gCommitIndex + 1]) {
      throw new Error('Flag message must come with a value like `gs -c "commit message"`.');
    }

    if (gCommitTypeIndex > -1 && gCommitIndex === -1) {
      throw new Error('Commit types flags must come with commit flag `gs -c "commit message" --fx`.');
    }

    const gitCommitParam = args[gCommitIndex + 1];
    const gCommitType = gCommitTypeIndex > -1 && types[args[gCommitTypeIndex]];

    return addTask("git", ["commit", `-m "${gCommitType ? `${gCommitType}: ${gitCommitParam}` : gitCommitParam}"`]);
  }
}
