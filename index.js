const { Client, Collection, GatewayIntentBits } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const { loadAllCommands, allCommands } = require("./src/helper/loadCommand.js");
require("dotenv").config();

// Creating a new property in the client object to store all the commands
client.commands = new Collection();

const token = process.env.token;
const clientId = process.env.clientId;

/*

loadAllCommands loads all the command into the bot at the run time
first argument is the path to the commands folder in the src folder
the second argument is a boolean that tells the function whether
it's is being used for loading commands or registering commands

*/
loadAllCommands("../commands", false);

allCommands.forEach((item) => {
  client.commands.set(item.data.name, item);
});

client.once("ready", () => {
  console.log("I am ready darling!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

// error handling
// restart app on crash
process.on("uncaughtException", (err) => {
  console.log(err);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
});

client.login(token).then(() => {
  client.user.setActivity("You Darling", { type: "WATCHING" });
});
