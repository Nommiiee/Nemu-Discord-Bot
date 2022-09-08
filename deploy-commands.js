const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("node:fs");
const path = require("node:path");
require("dotenv").config();

const allCommands = [];
const commandsPath = path.join(__dirname, "/src/commands");
const commandFiles = fs.readdirSync(commandsPath);

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  allCommands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(process.env.token);
rest
  .put(Routes.applicationCommands(process.env.clientId), {
    body: allCommands,
  })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
