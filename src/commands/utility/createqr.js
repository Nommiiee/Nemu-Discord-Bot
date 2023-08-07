// Discord Command Handler
const { SlashCommandBuilder } = require("@discordjs/builders");
const { createCanvas, loadImage } = require("canvas");
const { Image } = require("canvas");
const QRCode = require("qrcode");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("create_qr")
    .setDescription("Generate a QR Code")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("Text to generate QR Code")
        .setRequired(true)
    ),
  async execute(interaction) {
    const text = interaction.options.getString("text");
    await interaction.deferReply();
    if (text) {
      const image = await generateQR(text);
      await interaction.editReply({
        content: "Here's your QR Code",
        files: [image],
      });
    } else {
      await interaction.reply(
        "You didn't add any text to generate a QR Code for ;-;"
      );
    }
  },
};

async function generateQR(text) {
  try {
    const canvas = createCanvas(700, 700);
    const ctx = canvas.getContext("2d");
    if (text) {
      const qr = await QRCode.toDataURL(text, { errorCorrectionLevel: "M" });
      const image = await loadImage(qr);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      return canvas.toBuffer();
    }
  } catch (err) {
    console.log(err);
  }
}
