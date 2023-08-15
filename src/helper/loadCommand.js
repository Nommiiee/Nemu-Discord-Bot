const path = require("path");
const fs = require("fs");
const allCommands = [];

// Helper Functions For Command Loading
async function loadAllCommands(directoryPath, loadingCommand) {
  const commandPath = path.join(__dirname, directoryPath);

  const commandFiles = fs.readdirSync(commandPath);

  commandFiles.forEach((item) => {
    const filePath = path.join(commandPath, item);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      loadAllCommands(`./${directoryPath}/${item}`, loadingCommand);
    } else {
      const newCommand = require(filePath);
      if (loadingCommand) {
        allCommands.push(newCommand.data.toJSON());
      } else {
        allCommands.push(newCommand);
      }
    }
  });

  console.log(`Loaded ${commandFiles.length} commands`);
}

module.exports = {
  loadAllCommands,

  allCommands,
};
