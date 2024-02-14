const express = require("express");
const router = express.Router();
const conversation = require("../../../models/Conversations.js");
const auth = require("../../../middleware/auth.js");
const { check, validationResult } = require("express-validator");
const conversationMiddleware = require("../../../middleware/conversation.middleware.js");

router.get("/:id", auth, conversationMiddleware, async (req, res) => {
  try {
    if (req.conversation) {
      res.status(200).send(req.conversation);
    } else {
      res.status(400).send(req.conversation);
    }
  } catch (error) {
    res.status(500).json({ error: error.msg });
  }
});

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
    // const io = require("../../../server.js");

    try {
      const message = req.body.message;
      const payload = {
        sender: req.user.id,
        receiver: req.params.id,
        content: message,
      };
      const convo = req.conversation;
      convo.messages.push(payload);

      await convo.save();
      // io.to(convo._id).emit("newMessage");
      res.status(200).json(convo);
    } catch (error) {
      res.status(500).json({ err: error.msg });
    }
  }
);
// router.delete("/:id", auth, conversationMiddleware, async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   try {
//     const convo = req.conversation;

//     convo.messages = convo.messages.filter(({ id }) => id !== req.params.id);

//     await convo.save();

//     return res.json(convo);
//   } catch (error) {
//     res.status(500).json({ err: error.msg });
//   }
// });

module.exports = router;
