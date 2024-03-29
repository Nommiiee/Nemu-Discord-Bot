const { SlashCommandBuilder } = require("@discordjs/builders");
const Canvas = require("@napi-rs/canvas");
const jimp = require("jimp");
const QrCodeReader = require("qrcode-reader");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("read_qr")
    .setDescription("read a QR Code")
    .addAttachmentOption((option) =>
      option.setName("qr").setDescription("QR Code to read").setRequired(true)
    ),
  async execute(interaction) {
    const qr = interaction.options.getAttachment("qr");
    await interaction.deferReply();
    if (qr) {
      await readQr(qr).then((text) => {
        interaction
          .editReply({
            content: `QR Code says: ${text}`,
          })
          .catch((err) => {
            interaction.editReply({
              content: `Error Reading QR Code`,
            });
          });
      });
    } else {
      await interaction.editReply("This command is not yet implemented.");
    }
  },
};

async function readQr(qr) {
  const canvas = Canvas.createCanvas(800, 800);
  const ctx = canvas.getContext("2d");
  const image = await Canvas.loadImage(qr.url);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //save the image to a file
  const buffer = canvas.toBuffer("image/png");

  const text = await new Promise((resolve, reject) => {
    jimp.read(buffer, (err, image) => {
      const reader = new QrCodeReader();
      reader.callback = (err, value) => {
        if (err) {
          reject(err);
        } else {
          resolve(value.result);
        }
      };
      reader.decode(image.bitmap);
    });
  });
  return text;
}
