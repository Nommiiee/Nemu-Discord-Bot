const { SlashCommandBuilder } = require("@discordjs/builders");
const reactionModel = require("../models/reaction");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add_response")
    .setDescription("Add a response to a command")
    .addStringOption((option) =>
      option
        .setName("response")
        .setDescription("Command to add a response to")
        .addChoices(
          { name: "hug", value: "hug" },
          { name: "kiss", value: "kiss" },
          { name: "slap", value: "slap" },
          { name: "pat", value: "pat" },
          { name: "cuddle", value: "cuddle" },
          { name: "poke", value: "poke" }
        )
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("usercheck")
        .setDescription("Does the response have a user?")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("text").setDescription("The response that you want to add")
    ),
  async execute(interaction) {
    const response = interaction.options.getString("response");
    const user = interaction.options.getBoolean("usercheck");
    const text = interaction.options.getString("text");
    console.log(command);
    await interaction.reply(await addResponse(response, user, text));
  },
};

// Language: javascript
async function addResponse(response, user, text) {
  console.log(response, user, text);
  return response, user, text;
}
