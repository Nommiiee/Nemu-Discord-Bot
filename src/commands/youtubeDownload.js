const { SlashCommandBuilder } = require("@discordjs/builders");
const { execute } = require("./addResposnse");
const ytdl = require("ytdl-core");
const fs = require("fs");
const { json } = require("body-parser");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("download")
    .setDescription("Download a youtube video")
    .addStringOption((option) =>
      option.setName("url").setDescription("url of the video").setRequired(true)
    ),

  async execute(interaction) {
    await interaction.reply("Pong!");
  },
};

async function download(url, path) {
  const info = await ytdl.getInfo(url);
  return info;
}

console.log(
  download("https://www.youtube.com/watch?v=_b67SC7Y4qA", null)
    .then((res) => fs.writeFileSync("test.json", JSON.stringify(res)))
    .then(() => console.log("done"))
);
