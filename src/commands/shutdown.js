const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, Collection, Intents } = require("discord.js");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shutdown")
    .setDescription("Shutdown The Bot"),
  async execute(interaction) {
    await interaction.reply("Shutting Down");
    client.destroy();
  },
};
