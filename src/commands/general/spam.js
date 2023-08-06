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
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("target");
    const number = interaction.options.getInteger("amount") || 1;
    console.log(number);
    await interaction.reply(await spam(user));
    if (number < 21) {
      for (let i = 0; i < number; i++) {
        await interaction.followUp(await spam(user));
      }
    } else {
      await interaction.followUp(`Please enter a number between 0 and 20`);
    }
  },
};

// Language: javascript
async function spam(user) {
  if (user) {
    return `Hehe Get Spammed ${user}`;
  } else {
    return "You didn't add any user to spam ;-;";
  }
}
