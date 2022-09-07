const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, guildId, token } = require("./config.json");
const fs = require("node:fs");
const path = require("node:path");

const allCommands = [];
const commandsPath = path.join(__dirname, "/src/commands");
const commandFiles = fs.readdirSync(commandsPath);

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  allCommands.push(command.data.toJSON());
}

// const commands = [
//   new SlashCommandBuilder()
//     .setName("ping")
//     .setDescription("Replies with pong!"),
//   new SlashCommandBuilder()
//     .setName("test")
//     .setDescription("test to see if the bot is working or not!"),
//   new SlashCommandBuilder()
//     .setName("qrcode")
//     .setDescription("Generate a QR Code")
//     .addStringOption((option) =>
//       option
//         .setName("text")
//         .setDescription("Text to generate QR Code")
//         .setRequired(true)
//     ),
//   new SlashCommandBuilder().setName("hug").setDescription("Hug someone"),
//   new SlashCommandBuilder()
//     .setName("shutdown")
//     .setDescription("test to see if the bot is working or not!"),
//   new SlashCommandBuilder()
//     .setName("echo")
//     .setDescription("replies with your own text"),
// ].map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken(token);
rest
  .put(Routes.applicationCommands(clientId), { body: allCommands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
