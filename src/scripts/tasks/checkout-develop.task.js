import { log } from "../../log/log.js";
import { getIndex } from "../utils/get-index.js";
import { addTask } from "./task.js";

export async function gitCheckoutDevelop(args) {
  const gCheckoutDevelopIndex = getIndex(16, false);

  if (gCheckoutDevelopIndex > -1) {
    if (args.length != 1) {
      throw new Error(`Invalid arguments: ${args.slice(1).join(", ")}. Checkout develop accepts only one argument \`gs -cd\`.`);
    }

    try {
      const checkoutTask = addTask("git", ["checkout", "develop"]);
      const pullTask = addTask("git", ["pull", "origin", "develop"]);

      await exec(checkoutTask);
      await exec(pullTask);

      log.success("Git flow finished successfully!");
      process.exit(0);
    } catch (error) {
      log.error(error.message);
    }
  }
}
