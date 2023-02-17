const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//params --> what is in the url
//body --> what is sent in the request

//update user
router.put("/:userId", async (req, res) => {
    if (req.body.userId === req.params.userId) {
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (err) {
          return res.status(500).json(err);
        }
      }
      try {
        const user = await User.findByIdAndUpdate(req.params.userId, {
          $set: req.body,
        });
        res.status(200).json("Account has been updated");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can update only your account!");
    }
  });
  
  //delete user
  router.delete("/:userId", async (req, res) => {
    if (req.body.userId === req.params.userId) {
      try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json("Account has been deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can delete only your account!");
    }
  });
  
  //get a user
  router.get("/:userId", async (req, res) => { // pass in userId or username,, not both
      const userId = req.query.userId;
      const username = req.query.username;

    try {
      const user = userId
      ? await User.findById(userId) // if userId is given, find by userId, else find by username
      : await User.findOne({ username: username });
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  });

 module.exports = router