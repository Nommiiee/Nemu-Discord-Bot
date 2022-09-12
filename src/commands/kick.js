const { SlashCommandBuilder } = require("@discordjs/builders");
const { execute } = require("./addResposnse");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a user")
    .addUserOption((option) =>
      option.setName("target").setDescription("user to kick").setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("target");
    if (user) {
      const member = interaction.guild.members.cache.get(user.id);
      member.kick();
      await interaction.reply(`${user} has been kicked`);
    } else {
      await interaction.reply("You didn't add any user to kick ;-;");
    }
  },
};
