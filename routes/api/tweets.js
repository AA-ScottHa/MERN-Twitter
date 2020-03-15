const express = require("express");
const router = express.Router();
const passport = require('passport');

const Tweet = require('../../models/Tweet.js');
const validateTweetInput = require('../../validation/tweets.js');

router.get("/test", (req, res) => {
  res.json({ msg: "This is the tweet route" });
});

router.get("/", (req, res) => {
  Tweet.find()
    .sort({ date: -1 })
    .then(tweets => res.json(tweets))
    .catch(err => res.status(400).json({ noTweetsFound: 'No Tweets Found' }));
});

router.get("/user/:user_id", (req, res) => {
  Tweet.find({ user: req.params.user_id })
    .then(tweets => res.json(tweets))
    .catch(err => res.status(404).json({ noTweetsFound: "No Tweets found from the specified user" }));
});

router.get("/:id", (req, res) => {
  Tweet.findById(req.params.id)
    .then(tweet => res.json(tweet))
    .catch(err => res.status(404).json({ noTweetFound: "No Tweet found." }))
});

router.post("/", passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateTweetInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  const newTweet = new Tweet({
    text: req.body.text,
    user: req.user.id,
  });

  newTweet.save()
    .then(tweet => res.json(tweet))
    .catch(err => res.status(418).send(err));
});

module.exports = router;