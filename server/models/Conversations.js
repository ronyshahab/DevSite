const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  newMsg: { type: String },
  messages: [
    {
      sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      receiver: {
        type: Schema.Types.ObjectId,
        ref: "User",
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
