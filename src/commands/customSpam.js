const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("text-spam")
    .setDescription("Spam a user")
    .addMentionableOption((option) =>
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
        .setRequired(false)
    ),
  async execute(interaction) {
    const user = interaction.options.getMentionable("target");
    const message = interaction.options.getString("message");
    const number = interaction.options.getInteger("amount") || 5;
    console.log(user, message);

    await interaction.reply(await spam(user, message));
    if (number < 20) {
      for (let i = 0; i < number - 1; i++) {
        await interaction.followUp(await spam(user, message));
      }
    } else {
      await interaction.followUp(
        (await spam(user, message)) + "Please enter number less than 20"
      );
    }
  },
};

async function spam(user, message) {
  try {
    if (user && message) {
      return `${user} ${message} `;
    } else if (user) {
      return `Spamming ${user}`;
    } else {
      return "You didn't add any user to spam ;-;";
    }
  } catch (error) {
    console.log(error);
    return "There was an error while executing this command!";
  }
}
