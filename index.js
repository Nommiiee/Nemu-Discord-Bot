const { Client, Collection, GatewayIntentBits } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const path = require("path");
const fs = require("fs");
const { loadAllCommands, allCommands } = require("./src/helper/loadCommand.js");
require("dotenv").config();

// test Deploy
client.commands = new Collection();

const token = process.env.token;
const clientId = process.env.clientId;

loadAllCommands(path.join(__dirname, "/src/commands"));

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

process.on("uncaughtException", (err) => {
  console.log(err);
});

// restart app on crash
process.on("unhandledRejection", (err) => {
  console.log(err);
});

client.login(token).then(() => {
  client.user.setActivity("You Darling", { type: "WATCHING" });
});
