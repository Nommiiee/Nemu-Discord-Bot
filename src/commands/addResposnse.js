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
    ),
  async execute(interaction) {
    const command = interaction.options.getString("response");
    const user = interaction.options.getBoolean("usercheck");
    console.log(command);
    await interaction.reply(await addResponse(command, response));
  },
};

// Language: javascript

async function addResponse(command, response) {
  if (command && response) {
    new reactionModel({
      type: command,
      reply: response,
    })
      .save()
      .then((result) => {
        return `You added the response ${response} to the command ${command}`;
      })
      .catch((err) => {
        return `Error In Saving Response`;
      });
  } else {
    return "You didn't add a command or a response ;-;";
  }
}
