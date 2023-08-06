const {  EmbedBuilder } = require("@discordjs/builders");

function buildEmbed(name, source, download, image) {
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
      name: "Click Below To Open Shop Page",
      value: source || `Missing Source Link`,
    })
    .setThumbnail(image);

  return embed;
}

module.exports = {
  buildEmbed,
};
