const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
  user: {
    reactionType: String,
    reactionReply: String,
  },
  notUser: {
    reactionType: String,
    reactionReply: String,
  },
});

const Reaction = mongoose.model("Reaction", reactionSchema);
