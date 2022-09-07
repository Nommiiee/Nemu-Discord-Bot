const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, guildId, token } = require("./config.json");

const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!"),
  new SlashCommandBuilder()
    .setName("test")
    .setDescription("test to see if the bot is working or not!"),
  new SlashCommandBuilder()
    .setName("qrcode")
    .setDescription("Generate a QR Code"),
  new SlashCommandBuilder().setName("hug").setDescription("Hug someone"),
  new SlashCommandBuilder()
    .setName("shutdown")
    .setDescription("test to see if the bot is working or not!"),
].map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken(token);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
