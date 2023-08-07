const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fishy")
    .setDescription("heat pat fishy"),
  async execute(interaction) {
    console.log("Patting Fishy");
    await interaction.deferReply();
    let count = 0;
    const guild = interaction.guild;
    const channels = guild.channels.cache;
    for (const [id, channel] of channels) {
      if (channel.type === 0) {
        if (id === "735405122884206612") {
          if (count <= 5) {
            setInterval(async () => {
              await channel.send(`Pat Pat <@831529261616726076>`);
              count++;
            }, 500);
          } else {
            await interaction.editReply("Done");
            clearInterval();
          }
        }
      }
    }
  },
};
