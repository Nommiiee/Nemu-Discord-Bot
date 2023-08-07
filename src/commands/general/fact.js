const { SlashCommandBuilder } = require("@discordjs/builders");
require("node-fetch-commonjs");

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
    await interaction.deferReply();

    if (factType === "random fact") {
      fact = await randomFact();
      await interaction.editReply(`Random Fact : ${fact}`);
    } else if (factType === "dog fact") {
      fact = await dogFact();
      await interaction.editReply(`Dog Fact : ${fact}`);
    } else if (factType === "cat fact") {
      fact = await catFact();
      await interaction.editReply(`Cat Fact : ${fact}`);
    } else if (factType === "norris fact") {
      fact = await norrisFact();
      await interaction.editReply(`Norris Fact : ${fact}`);
    } else {
      await interaction.editReply("Please enter a valid fact type");
    }
  },
};

async function dogFact() {
  try {
    return fetch("http://dog-api.kinduff.com/api/facts", { method: "GET" })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          return json.facts[0];
        } else {
          return "Error in fetching dog fact";
        }
      });
  } catch (error) {
    console.log(error);
    return "Error in fetching dog fact";
  }
}

async function catFact() {
  try {
    return fetch("https://catfact.ninja/fact", { method: "GET" })
      .then((res) => res.json())
      .then((json) => {
        if (json.fact) {
          return json.fact;
        } else {
          return "Error in fetching cat fact";
        }
      });
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
      .then((json) => {
        if (json.text) {
          return json.text;
        } else {
          return "Error in fetching random fact";
        }
      });
  } catch (error) {
    console.log(error);
    return "Error in fetching random fact";
  }
}
