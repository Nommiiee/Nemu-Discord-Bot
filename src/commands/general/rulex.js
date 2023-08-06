const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");
const r34API = require("r34.api");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("r34")
    .setDescription("Fetch Image From R34")
    .addStringOption((option) =>
      option
        .setName("tag")
        .setDescription("Tag to search for")
        .setRequired(true)
    ),

  async execute(interaction) {
    let tag = interaction.options.getString("tag");
    let image = await getPic(tag);
    console.log(image);
    if (!image.success) {
      await interaction.reply("No Image Found");
      return;
    } else {
      imageURL = image.url.replace(/['"\s]/g, "");
      const embed = new EmbedBuilder()
        .setTitle("Rule 34")
        .setDescription(`Tag: ${tag}`)
        .setImage(imageURL);
      await interaction.reply({ embeds: [embed] });
    }
  },
};

async function getPic(tag) {
  tag = tag.split(",");
  let image = await r34API.rule34([...tag]);
  console.log(image);
  return { url: image, success: true };
}
