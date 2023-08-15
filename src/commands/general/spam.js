const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("spam")
    .setDescription("Spam a user")
    .addUserOption((option) =>
      option.setName("target").setDescription("user to spam").setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("amount of times to spam")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("message to spam")
        .setRequired(true)
    ),
  async execute(interaction) {
    if (interaction.member.permissions.has("MANAGE_MESSAGES")) {
      const user = interaction.options.getUser("target");
      const number = interaction.options.getInteger("amount") || 1;
      const spamMessage = interaction.options.getString("message");
      await interaction.reply(await spam(user, spamMessage));
      if (number <= 5 && user && spamMessage && number) {
        for (let i = 0; i < number; i++) {
          await interaction.followUp(await spam(user, spamMessage));
        }
      } else {
        await interaction.followUp(
          `Error, There's a limit of 5 messages or something is missing.`
        );
      }
    } else {
      await interaction.reply("You don't have permission to use this command.");
    }
  },
};

// Language: javascript
async function spam(user, message) {
  if (user && message) {
    return `${user}, ${message}`;
  } else {
    return "You didn't add any user to spam ;-;";
  }
}
