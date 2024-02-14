const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference the user model
    },
  ],
  messages: [
    {
      sender: {
        type: Schema.Types.ObjectId,
        ref: "User", // Reference the user model for sender
      },
      receiver: {
        type: Schema.Types.ObjectId,
        ref: "User", // Reference the user model for receiver
      },
      date: {
        type: Date,
        default: Date.now,
      },
      content: String,
    },
  ],
});

module.exports = mongoose.model("Conversation", conversationSchema);
