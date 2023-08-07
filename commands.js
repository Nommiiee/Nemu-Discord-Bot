const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { loadAllCommands, allCommands } = require("./src/helper/loadCommand.js");

require("dotenv").config();
/*

loadAllCommands loads all the command into the bot at the run time
first argument is the path to the commands folder in the src folder
the second argument is a boolean that tells the function whether
it's is being used for loading commands or registering commands

*/
loadAllCommands("../commands", true);

const rest = new REST({ version: "10" }).setToken(process.env.token);
rest
  .put(Routes.applicationCommands(process.env.clientId), {
    body: allCommands,
  })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
