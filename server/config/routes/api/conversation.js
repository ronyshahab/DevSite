const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth.js");
const { check, validationResult } = require("express-validator");
const conversationMiddleware = require("../../../middleware/conversation.middleware.js");
const checkNotificationMiddleware = require("../../../middleware/popNotificationMsg.middleware.js");
const User = require("../../../models/User.js");
const Conversations = require("../../../models/Conversations.js");

router.get(
  "/:id",
  auth,
  conversationMiddleware,
  checkNotificationMiddleware,
  async (req, res) => {
    try {
      if (req.conversation) {
        res.status(200).send(req.conversation);
      } else {
        res.status(400).send(req.conversation);
      }
    } catch (error) {
      res.status(500).json({ error: error.msg });
    }
  }
);

router.post(
  "/:id",
  auth,
  conversationMiddleware,
  check("message", "Text is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const message = req.body.message;
      const payload = {
        sender: req.user.id,
        receiver: req.params.id,
        content: message,
      };
      const convo = req.conversation;
      convo.messages.push(payload);
      convo.set("newMsg", req.user.id);
      await convo.save();
      res.status(200).json(convo);
    } catch (error) {
      res.status(500).json({ err: error.msg });
    }
  }
);
router.post("/check/notification", auth, async (req, res) => {
  try {
    let notification = [];
    const currentUserConversationsId = req.body.conversationIds;
    const result = await Conversations.find({
      _id: { $in: currentUserConversationsId },
    });

    result.forEach((con) => {
      if (con?.newMsg) {
        notification.push(con?.newMsg);
      }
    });
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ err: error.msg });
  }
});

module.exports = router;
