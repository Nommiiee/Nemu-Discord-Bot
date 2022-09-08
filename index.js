const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Intents } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const mongoose = require("mongoose");
const { disconnect } = require("node:process");
require("dotenv").config();

async function initializeDB() {
  await mongoose.connect(process.env.mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

// Initialising the DB
initializeDB()
  .then(() => {
    console.log(`Connected to MongoDB ${mongoPath}`);
  })
  .catch((err) => {
    console.log(err);
  });

client.commands = new Collection();

const commandsPath = path.join(__dirname, "/src/commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

const commands = [];
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
}

client.once("ready", () => {
  console.log("I Breathe Once More");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

process.on("uncaughtException", (err) => {
  console.log(err);
});

client.login(process.env.token);

// const express = require("express");
// const app = express();
// const port = 3000;
// const bodyParser = require("body-parser");
// app.use(bodyParser.json());

// app.listen(port, () => {
//   console.log(`Listening at http://localhost:${port}`);
// });
