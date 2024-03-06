const conversation = require("../models/Conversations.js");
const User = require("../models/User.js");

module.exports = async (req, res, next) => {
  const currentUserId = req.user.id;
  const requestedUserId = req.params.id;
  let conversationInstance = null;

  if (!currentUserId || !requestedUserId) {
    return res.status(401).json({
      msg: " something is wrong in middleware. ",
      currenUser: currentUserId,
      reqreustuser: requestedUserId,
    });
  }

  try {
    const converstion = await conversation.findOne({
      users: { $all: [currentUserId, requestedUserId] },
    });

    if (converstion) {
      conversationInstance = converstion;
    } else {
      conversationInstance = await conversation.create({
        users: [currentUserId, requestedUserId],
        messages: [],
      });
      await User.findOneAndUpdate(
        { _id: currentUserId },
        { $push: { conversationIds: conversationInstance?._id } }
      );
      await User.findOneAndUpdate(
        { _id: requestedUserId },
        { $push: { conversationIds: conversationInstance?._id } }
      );
    }
    req.conversation = conversationInstance;
    next();
  } catch (err) {
    res.status(401).json({ msg: err.message });
  }
};
