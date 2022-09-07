const QRCode = require("qrcode");
const Canvas = require("@napi-rs/canvas");
const { SlashCommandBuilder } = require("@discordjs/builders");

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
    if (text) {
      const image = await generateQR(text);
      await interaction.reply({
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
    const canvas = Canvas.createCanvas(200, 200);
    const ctx = canvas.getContext("2d");
    if (text) {
      const qr = await QRCode.toDataURL(text, { errorCorrectionLevel: "H" });
      const image = await Canvas.loadImage(qr);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      return canvas.toBuffer();
    }
  } catch (err) {
    console.log(err);
  }
}
