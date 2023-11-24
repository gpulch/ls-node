const fs = require("fs");
const readline = require("readline");
const chalk = require("chalk");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const listFilesAndDirectories = (path) => {
  fs.readdir(path, (err, files) => {
    if (err) {
      console.error(
        chalk.red("Error reading directory, please check your provided path"),
        err
      );
      return;
    }

    files.forEach((file) => {
      console.log(file);
    });
  });
};

const executableName = process.argv[1];
const userSpecifiedDir = process.argv[2];
const defaultDirectory = process.env.MY_SCRIPT_DEFAULT_PATH || "./";

if (userSpecifiedDir) {
  listFilesAndDirectories(userSpecifiedDir);
  rl.close();
} else {
  const promptMessage = `Please enter a path or press Enter for the default path (${defaultDirectory}): `;
  rl.question(chalk.green(promptMessage), (answer) => {
    const directoryPath = answer || defaultDirectory;
    listFilesAndDirectories(directoryPath);
    rl.close();
  });
}
