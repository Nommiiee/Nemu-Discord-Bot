const qrCode = require("qrcode");
const Canvas = require("@napi-rs/canvas");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("qrcode")
    .setDescription("Generate a QR Code")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("The text to generate a QR Code for")
    ),
  async execute(interaction) {
    const text = interaction.options.getString("text");
    if (text) {
      await generateQR(text).then((image) => {
        interaction.reply({ files: [image] });
      });
    } else {
      await interaction.reply("No Text Provided");
    }
  },
};

async function generateQR(text) {
  const canvas = Canvas.createCanvas(700, 250);
  const context = canvas.getContext("2d");
  if (text) {
    return qrCode.toDataURL(text, async function (err, url) {
      if (err) {
        return "Some error occured";
      }
      context.drawImage(url, 0, 0, 700, 250);
      const qrImage = new AttachmentBuilder(await canvas.encode("png"), {
        name: "QRCODE.png",
      });
      return qrImage;
    });
    return qr;
  } else {
    return qrCode.toDataURL("Hello World", async function (err, url) {
      context.drawImage(url, 0, 0, 700, 250);
      const qrImage = new AttachmentBuilder(await canvas.encode("png"), {
        name: "QRCODE.png",
      });
      return qrImage;
    });
  }
}
