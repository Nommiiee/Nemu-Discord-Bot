const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bot-text")
    .setDescription("Send a message as the bot")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("message to send")
        .setRequired(true)
    ),
  async execute(interaction) {
    const message = interaction.options.getString("message");
    if (
      interaction.user.roles.cache.some((role) => role.name === "Staff") ||
      interaction.user.id === "722095276893929561"
    ) {
      await interaction.reply(`${message} role:`);
    } else {
      await interaction.reply("You are not allowed to use this command!");
    }
  },
};
