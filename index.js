const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Intents } = require("discord.js");
const { ActivityType } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const mongoose = require("mongoose");
const { disconnect } = require("node:process");
require("dotenv").config();

// const express = require("express");
// const { port } = require("./config.json");

// const app = express();

// app.get("/", (request, response) => {
//   return response.sendFile("index.html", { root: "." });
// });

// app.listen(port, () =>
//   console.log(`App listening at http://localhost:${port}`)
// );

const localDB = "mongodb://127.0.0.1:27017/Nemu-The-Bot";

async function initializeDB() {
  mongoose.connect(localDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

// Initialising the DB
initializeDB()
  .then(() => {
    console.log(`Connected to MongoDB ${localDB}`);
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

const prefix = "`";

client.on("messageCreate", (message) => {
  if (message.content.startsWith(prefix + "ping")) {
    console.log("Pong");
    message.channel.send("Pong! ");
  } else if (message.content.startsWith(prefix + "avatar")) {
    message.reply(message.author.avatarURL);
  }
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

client.login(process.env.token).then(() => {
  client.user.setActivity("You Darling", { type: "WATCHING" });
});
