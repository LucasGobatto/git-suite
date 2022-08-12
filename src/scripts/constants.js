export const extraCommands = ["--help"];
export const validCommands = [
  "-a",
  "-add",
  "-c",
  "-commit",
  "-p",
  "-push",
  "-f",
  "-force",
  "-rh",
  "-reset-head",
  "-r",
  "-rebase",
  "--help",
];
export const commitType = ["--ft", "--fx", "--e", "--c", "--d"];
export const types = {
  [commitType[0]]: "feat",
  [commitType[1]]: "fix",
  [commitType[2]]: "enhance",
  [commitType[3]]: "chore",
  [commitType[4]]: "docs",
};
