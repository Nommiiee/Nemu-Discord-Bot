const { SlashCommandBuilder } = require("@discordjs/builders");
const { getJson } = require("../../helper/fetchData");
const { buildEmbed } = require("../../helper/buildEmbed");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("premium-clothes")
    .setDescription("Get Premium Clothes Data"),

  async execute(interaction) {
    if (interaction.user.id !== "722095276893929561") {
      await interaction.reply("You are not allowed to use this command");
    }

    const URL =
      "https://raw.githubusercontent.com/Nommiiee/Nommiiee.github.io/main/vrchat/data/JSON_FORMAT/premium-clothes.json";
    const json = await getJson(URL);

    await interaction.reply("Fetching Avatars...");

    json.forEach(async (element) => {
      setTimeout(() => {}, 500);
      await interaction.channel.send({
        embeds: [
          buildEmbed(
            element.name,
            element.source,
            element.download,
            element.img
          ),
        ],
      });
    });
  },
};
