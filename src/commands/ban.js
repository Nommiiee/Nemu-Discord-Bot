const { SlashCommandBuilder } = require("@discordjs/builders");
const { execute } = require("./addResposnse");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a user")
    .addUserOption((option) =>
      option.setName("target").setDescription("user to ban").setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("target");
    //check in interaction user has permission to ban
    if (interaction.member.permissions.has("BAN_MEMBERS")) {
      if (user) {
        const member = interaction.guild.members.cache.get(user.id);
        member.ban();
        await interaction.reply(`${user} has been banned`);
      } else {
        await interaction.reply("You didn't add any user to ban ;-;");
      }
    } else {
      await interaction.reply("Sorry you don't have the perms for it");
    }
  },
};
