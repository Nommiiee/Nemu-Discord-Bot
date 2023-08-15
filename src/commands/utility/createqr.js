// Discord Command Handler
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("create_qr")
    .setDescription("Generate a QR Code")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("Text to generate QR Code")
        .setRequired(true)
    ),
  async execute(interaction) {
    const text = interaction.options.getString("text");
    if (!text) {
      await interaction.reply("No Text Provided");
    } else {
      await interaction.reply("under development");
    }
  },
};
