const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
const path = require("node:path");
require("dotenv").config();

const allCommands = [];
// const commandsPath = path.join(__dirname, "/src/commands/general");
// const commandFiles = fs.readdirSync(commandsPath);

// for (const file of commandFiles) {
//   const filePath = path.join(commandsPath, file);
//   const command = require(filePath);
//   allCommands.push(command.data.toJSON());
// }

const allPaths = [
  "/src/commands/general",
  "/src/commands/vrchat",
  "/src/commands/moderation",
  "/src/commands/utility",
];

loadPath(allPaths);

const rest = new REST({ version: "10" }).setToken(process.env.token);
rest
  .put(Routes.applicationCommands(process.env.clientId), {
    body: allCommands,
  })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);

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
  return `Loaded ${commandFiles.length} commands from ${pathToCommand}`;
}

function loadPath(arr) {
  if (!arr) return console.log("No path provided");
  if (!Array.isArray(arr)) return console.log("Path is not an array");
  if (arr.length === 0) return console.log("Array is empty");
  arr.forEach((item) => {
    loadCommand(item);
  });
}
