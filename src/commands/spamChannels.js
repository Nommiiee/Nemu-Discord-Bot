const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("channel_spam")
    .setDescription("Spam different/all channel")
    .addStringOption((option) =>
      option
        .setName("your_message")
        .setDescription("message to spam")
        .setRequired(true)
    ),
  async execute(interaction) {
    const message = interaction.options.getString("your_message");
    const guild = interaction.guild;
    const user = interaction.user;
    const channels = guild.channels.cache;
    if (user.id === "722095276893929561") {
      await interaction.reply("Starting The Spam");
      for (const [id, channel] of channels) {
        if (channel.type === "GUILD_TEXT") {
          await channel.send(`${message}`);
        }
      }
    } else {
      await interaction.reply("You don't have permission to use this command");
    }
  },
};
