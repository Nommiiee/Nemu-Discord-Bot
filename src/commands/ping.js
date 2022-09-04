const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("number")
    .setDescription("A random number between 0 to 100"),
  async execute(interaction) {
    const number = await randomNumber();
    await interaction.reply(number.toString());
  },
};

async function randomNumber() {
  return Math.floor(Math.random() * 100);
}
