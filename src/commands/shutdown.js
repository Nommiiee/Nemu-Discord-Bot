const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shutdown")
    .setDescription("Shutdown The Bot"),
  async execute(interaction) {
    await interaction.reply("hehe! fake command cunts");
  },
};
