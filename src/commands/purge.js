const { SlashCommandBuilder } = require("@discordjs/builders");
const { execute } = require("./addResposnse");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Purge messages")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("amount of messages to purge")
        .setRequired(true)
    ),
  async execute(interaction) {
    const amount = interaction.options.getInteger("amount") || 1;
    //check in interaction user has permission to purge
    if (interaction.member.permissions.has("MANAGE_MESSAGES")) {
      if (amount < 101) {
        await interaction.channel
          .bulkDelete(amount, true)
          .catch((err) => {
            console.error(err);
            interaction.reply(
              "There was an error trying to purge messages in this channel!"
            );
          })
          .then(() => {
            interaction.reply(`Successfully deleted ${amount} messages`);
          });
      } else {
        await interaction.reply("Please enter a number between 0 and 100");
      }
    } else {
      await interaction.reply("Sorry you don't have the perms for it");
    }
  },
};
