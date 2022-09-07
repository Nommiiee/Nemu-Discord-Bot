const mongoose = require("mongoose");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hug")
    .setDescription("Hug someone")
    .addUserOption((option) =>
      option.setName("target").setDescription("user to hug")
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("target");
    console.log(user);
    await interaction.reply(await hug(user));
  },
};

// Language: javascript
async function hug(user) {
  if (user) {
    return `https://tenor.com/view/hug-anime-cute-love-gif-15716891`;
  } else {
    return "You didn't add any user to hug ;-;";
  }
}
