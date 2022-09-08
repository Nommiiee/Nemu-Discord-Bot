const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    reply: String,
  },
  notUser: {
    type: String,
    required: true,
    reply: String,
  },
});

const Reaction = mongoose.model("Reaction", reactionSchema);
