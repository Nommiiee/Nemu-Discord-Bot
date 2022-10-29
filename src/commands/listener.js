const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("listener")
    .setDescription("Listener for the bot"),
  async execute(interaction) {
    await interaction.reply("Listener is working");
  },
};

async function testStuff() {}
