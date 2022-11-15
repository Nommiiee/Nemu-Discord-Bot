const { SlashCommandBuilder } = require("@discordjs/builders");
const ytdl = require("ytdl-core");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("download")
    .setDescription("Download a youtube video")
    .addStringOption((option) =>
      option.setName("url").setDescription("url of the video").setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply();
    const url = interaction.options.getString("url");
    download(url).then((data) => {
      interaction.editReply({
        embeds: [
          {
            color: "#FF0000",
            author: {
              name: "Download URL Created",
            },
            title: data.title,
            url: data.url,
            image: {
              url: data.thumbnail,
            },
            timestamp: new Date(),
          },
        ],
      });
    });
  },
};

async function download(url) {
  const info = await ytdl.getInfo(url);
  const downloadurl = info.formats[info.formats.length - 1].url;
  return {
    url: downloadurl,
    title: info.videoDetails.title,
    thumbnail:
      info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url,
  };
}
