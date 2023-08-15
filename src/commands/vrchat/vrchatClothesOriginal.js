const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");
const { getJson } = require("../../helper/fetchData");
const { buildEmbed } = require("../../helper/buildEmbed");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clothes-original")
    .setDescription("Get original clothes Data"),

  async execute(interaction) {
    if (interaction.user.id !== "722095276893929561") {
      await interaction.reply("You are not allowed to use this command");
    } else {
      const URL =
        "https://raw.githubusercontent.com/Nommiiee/Nommiiee.github.io/main/vrchat/data/JSON_FORMAT/clothes_original.json";
      const json = await getJson(URL);

      await interaction.reply("Fetching Avatars...");

      json.forEach(async (element) => {
        setTimeout(() => {}, 500);
        await interaction.channel.send({
          embeds: [
            clothEmbed(
              element.name,
              element.source,
              element.download,
              element.img,
              element.avatar
            ),
          ],
        });
      });
    }
  },
};
function clothEmbed(name, source, download, image, avatar) {
  const embed = new EmbedBuilder()
    .setImage(
      image ||
        "https://eatonwarfarin.com/wp-content/uploads/2018/03/Missing-e1521121681594.png"
    )
    .setTitle(name || `Missing Name`)
    .setURL(download || `Missing Download Link`)
    .setAuthor({
      name: "VRChat Assets",
      iconURL: "https://pbs.twimg.com/media/DUR7PaeXUAM_Tuz.png",
    })
    .addFields({
      name: "Avatar Name",
      value: avatar || `Missing Name`,
    })
    .addFields({
      name: "Click Below To Open Shop Page",
      value: source || `Missing Source Link`,
    })
    .setThumbnail(image);

  return embed;
}
