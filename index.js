const { Client, Collection, GatewayIntentBits } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const path = require("path");
const fs = require("fs");
require("dotenv").config();

// const express = require("express");
// const app = express();
// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// app.get("/", (req, res) => {
//   res.send("Nemu is online!");
// });

// test Deploy
client.commands = new Collection();

const token = process.env.token;
const clientId = process.env.clientId;

client.once("ready", () => {
  console.log("I am ready darling!");
});

const commandsPath = path.join(__dirname, "/src/commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

const commands = [];
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
}

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
