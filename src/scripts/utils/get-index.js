import { validCommands } from "../constants.js";

export function getIndex(index) {
  const args = process.argv.slice(2);

  return args.findIndex((param) => param === validCommands[index] || param === validCommands[index + 1]);
}
