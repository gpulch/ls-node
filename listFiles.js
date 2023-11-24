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

const hasUserSpecifiedDir = process.argv[2];

if (hasUserSpecifiedDir) {
  listFilesAndDirectories(hasUserSpecifiedDir);
  rl.close();
} else {
  rl.question(
    chalk.green("Please enter a path or press Enter for current path : "),
    (answer) => {
      const directoryPath = answer || "./";
      listFilesAndDirectories(directoryPath);
      rl.close();
    }
  );
}
