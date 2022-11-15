const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a user")
    .addUserOption((option) =>
      option.setName("target").setDescription("user to kick").setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("target");
    //check in interaction user has permission to kick
    if (interaction.member.permissions.has("KICK_MEMBERS")) {
      if (user) {
        const member = interaction.guild.members.cache.get(user.id);
        member.kick();
        await interaction.reply(`${user} has been kicked`);
      } else {
        await interaction.reply("You didn't add any user to kick ;-;");
      }
    } else {
      await interaction.reply("Sorry you don't have the perms for it");
    }
  },
};
