const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { loadPath } = require("./src/helper/loadCommand.js");
require("dotenv").config();

const allCommands = [];

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
