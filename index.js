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
loadAllCommands("../commands", false).then(() => {
  allCommands.forEach((item) => {
    client.commands.set(item.data.name, item);
  });
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

const express = require("express");
const app = express();

app.listen(3001, () => {
  console.log("Server is running on port 3000");
});

app.get("/", async (req, res, next) => {
  try {
    res.json({ message: "Hello Darling" });
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Internal Server Error" });
});

process.on("uncaughtException", (err) => {
  console.log(err);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
});

setInterval(() => {
  const URL = "https://nemu.cyclic.app/";
  ping(URL);
}, 1000 * 60 * 60);

async function ping(URL) {
  const response = await fetch(URL);
  const data = await response.json();
  console.log(data);
}
