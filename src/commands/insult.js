const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("insult")
    .setDescription("Insults a user")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to insult")
        .setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const insult = await fetchInsult(user);
    await interaction.reply(`${user} ${insult}`);
  },
};

async function fetchInsult(user) {
  const insult = await fetch(
    "https://evilinsult.com/generate_insult.php?lang=en&type=json"
  );
  const insultJson = await insult.json();
  return insultJson.insult;
}
