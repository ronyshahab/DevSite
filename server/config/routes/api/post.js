const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../../middleware/auth.js");
const User = require("../../../models/User.js");
const Profile = require("../../../models/Profile.js");
const Post = require("../../../models/Post.js");
const { upload } = require("../../../utils/multer.js");
const { uploadAImageOnCloudinary } = require("../../../utils/cloudinary.js");

router.post(
  "/",
  upload.none(),
  auth,
  check("content", "Text is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      let contentWithCloudinaryUrls = req.body.content;
      const newPost = new Post({
        content: contentWithCloudinaryUrls,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/", auth, async (req, res) => {
  try {
    const post = await Post.find().sort({ date: -1 }).limit(10);
    res.send(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ msg: "No post found" });
    }
    return res.send(post);
  } catch (err) {
    if (err.kind !== "ObjectId") {
      return res.status(400).json({ msg: "No post found" });
    }
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});
router.get("/user/:id", auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.id });
    if (!posts || posts.length === 0) {
      return res.status(200).json({ msg: "No posts found for this user" });
    }
    return res.json(posts);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.user.toString() !== req.user.id) {
      res.status(401).json({ msg: "You are not authorised" });
    }
    await post.remove();
    res.send(post).json({ msg: "post removed" });
  } catch (err) {
    if (err.kind !== "ObjectId") {
      res.status(400).json({ msg: "No post found" });
    }
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/likes/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const userLikedIndex = post.likes.findIndex(
      (like) => like.user.toString() === req.user.id
    );

    if (userLikedIndex !== -1) {
      post.likes.splice(userLikedIndex, 1);
      await post.save();
      return res.json(post.likes);
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/comment/:id",
  auth,
  check("content", "content is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      const newComment = {
        content: req.body.content,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send(err);
    }
  }
);

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    post.comments = post.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await post.save();

    return res.json(post);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
