module.exports = async (req, res, next) => {
  try {
    const currentConverstation = req.conversation;
    if (currentConverstation.newMsg !== req.user.id) {
      currentConverstation.set("newMsg", "");

      const updatedCurrentInstance = await currentConverstation.save();

      req.conversation = updatedCurrentInstance;
    }
    next();
  } catch (error) {
    res.status(200).json({ msg: error.message });
  }
};
