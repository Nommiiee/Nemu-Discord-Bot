const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fact")
    .setDescription("Sends a random fact")
    .addStringOption((option) =>
      option
        .setName("fact_type")
        .setDescription("fact to send")
        .setRequired(true)
        .addChoices(
          {
            name: "random",
            value: "random fact",
          },
          {
            name: "cat",
            value: "cat fact",
          },
          {
            name: "dog",
            value: "dog fact",
          },
          {
            name: "norris",
            value: "norris fact",
          }
        )
    ),
  async execute(interaction) {
    let fact;
    const factType = interaction.options.getString("fact_type");
    if (factType === "random fact") {
      fact = await randomFact();
      await interaction.reply(`Random Fact : ${fact}`);
    } else if (factType === "dog fact") {
      fact = await dogFact();
      await interaction.reply(`Dog Fact : ${fact}`);
    } else if (factType === "cat fact") {
      fact = await catFact();
      await interaction.reply(`Cat Fact : ${fact}`);
    } else if (factType === "norris fact") {
      fact = await norrisFact();
      await interaction.reply(`Norris Fact : ${fact}`);
    } else {
      await interaction.reply("Please enter a valid fact type");
    }
  },
};

async function dogFact() {
  try {
    return fetch("http://dog-api.kinduff.com/api/facts", { method: "GET" })
      .then((res) => res.json())
      .then((json) => json.facts[0].toString());
  } catch (error) {
    console.log(error);
    return "Error in fetching dog fact";
  }
}

async function catFact() {
  try {
    return fetch("https://catfact.ninja/fact", { method: "GET" })
      .then((res) => res.json())
      .then((json) => json.fact);
  } catch (error) {
    console.log(error);
    return "Error in fetching cat fact";
  }
}

async function norrisFact() {
  try {
    return fetch("https://api.chucknorris.io/jokes/random", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        return data.value;
      });
  } catch (error) {
    console.log(error);
    return "Error in fetching norris fact";
  }
}

async function randomFact() {
  try {
    return fetch("https://uselessfacts.jsph.pl/random.json?language=en", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => json.text);
  } catch (error) {
    console.log(error);
    return "Error in fetching random fact";
  }
}
