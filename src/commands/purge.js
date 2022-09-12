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
    if (amount < 101) {
      await interaction.channel.bulkDelete(amount, true).catch((err) => {
        console.error(err);
        interaction.reply(
          "There was an error trying to purge messages in this channel!"
        );
      });
    } else {
      await interaction.reply("Please enter a number between 0 and 100");
    }
  },
};
