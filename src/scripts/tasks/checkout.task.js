import { validCommands } from "../constants.js";
import { getIndex } from "../utils/get-index.js";
import { addTask } from "./task.js";

export function gitCheckoutTaks(args) {
  const gCheckoutIndex = getIndex(12);
  const gCheckoutBranchIndex = getIndex(14);

  if (gCheckoutIndex > -1) {
    if (validCommands.includes(args[gCheckoutIndex + 1])) {
      throw new Error("Provide the branch name to checkout. `gs -c branch-name`");
    }

    if (args.length > 2) {
      throw new Error(`Invalid arguments - ${args.slice(2).join(", ")}`);
    }

    const branchName = args[gCheckoutIndex + 1];

    return addTask("git", ["checkout", branchName]);
  }

  if (gCheckoutBranchIndex > -1) {
    if (validCommands.includes(args[gCheckoutBranchIndex + 1])) {
      throw new Error("Provide the branch name. `gs -cb branch-name`");
    }

    if (args.length > 2) {
      throw new Error(`Invalid arguments - ${args.slice(2).join(", ")}`);
    }

    return addTask("git", ["checkout", "-b", branchName]);
  }
}
