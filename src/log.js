import chalk from "chalk";

const info = (value) => {
  console.info(chalk.green("info:"), value);
};

const success = (value) => {
  console.info(chalk.blue("done:"), value);
};

const error = (value) => {
  console.error(chalk.red("error:"), value);
};

export const log = {
  info,
  error,
  success,
};
