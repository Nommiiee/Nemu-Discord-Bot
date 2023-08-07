const path = require("path");
const fs = require("fs");
const allCommands = [];

// Helper Functions For Command Loading
function loadAllCommands(directoryPath) {
  const commandFiles = fs.readdirSync(directoryPath);

  commandFiles.forEach((item) => {
    const filePath = path.join(directoryPath, item);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      loadAllCommands(filePath);
    } else {
      const command = require(filePath);
      allCommands.push(command);
    }
  });

  console.log(`Loaded ${commandFiles.length} commands`);
}

// Helper Functions
function loadCommand(pathToCommand) {
  const commandPath = path.join(__dirname, pathToCommand);
  const commandFiles = fs.readdirSync(commandPath);

  for (const file of commandFiles) {
    const filePath = path.join(commandPath, file);
    const newCommand = require(filePath);
    allCommands.push(newCommand.data.toJSON());
  }
  console.log(`Loaded ${commandFiles.length} commands from ${pathToCommand}`);
}

function loadPath(arr) {
  if (!arr) return console.log("No path provided");
  if (!Array.isArray(arr)) return console.log("Path is not an array");
  if (arr.length === 0) return console.log("Array is empty");
  arr.forEach((item) => {
    loadCommand(item);
  });
}

module.exports = {
  loadAllCommands,
  loadCommand,
  loadPath,
  allCommands,
};
