const { SlashCommandBuilder } = require("@discordjs/builders");
const { execute } = require("./addResposnse");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Mute a user")
    .addUserOption((option) =>
      option.setName("target").setDescription("user to mute").setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("target");
    //check in interaction user has permission to mute
    if (interaction.member.permissions.has("MUTE_MEMBERS")) {
      if (user) {
        const member = interaction.guild.members.cache.get(user.id);
        member.roles.add();
        await interaction.reply(`${user} has been muted`);
      } else {
        await interaction.reply("You didn't add any user to mute ;-;");
      }
    } else {    
      await interaction.reply("Sorry you don't have the perms for it");
    }
  },
};
