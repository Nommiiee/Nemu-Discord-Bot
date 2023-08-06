const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("channel_spam")
    .setDescription("Spam different/all channel")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("message to spam")
        .setRequired(true)
    ),
  async execute(interaction) {
    const message = interaction.options.getString("message");
    const guild = interaction.guild;
    const user = interaction.user;
    const channels = guild.channels.cache;
    const wyn = "678958699221614622";
    const nom = "722095276893929561";
    if (user.id === nom || user.id === wyn) {
      await interaction.reply("Starting The Spam");
      for (const [id, channel] of channels) {
        if (channel.type === 0) {
          console.log(`Spamming ${channel.name}`);
          await channel.send(message);
        
        }
      }
    } else {
      await interaction.reply("You don't have permission to use this command");
    }
  },
};
