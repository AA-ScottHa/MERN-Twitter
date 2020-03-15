const express = require("express");
const router = express.Router();
const BCrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require("../../models/User.js");
const key = require('../../config/key.js');
const validateRegisterInput = require('../../validation/register.js');
const validateLoginInput = require('../../validation/login.js');

router.get("/test", (req, res) => {
  res.json({ msg: "This is the user route" });
});

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({email: "A user is already registered with that email."});
      } else {
        const newUser = new User({
          handle: req.body.handle,
          email: req.body.email,
          password: req.body.password,
        });

        BCrypt.genSalt(10, (err, salt) => {
          BCrypt.hash(newUser.password, salt, (err, hash) =>{
            if (err) throw err;
            newUser.password = hash;
            
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => res.status(418).send(err));
          });
        });
      }
    })
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ email: "This user does not exist." });
      }

      BCrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user.id,
              handle: user.handle,
              email: user.email,
            };

            jwt.sign(payload, key.secretOrKey, { expiresIn: 3600 }, (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
              });
            });
          } else res.status(400).json({ password: "Incorrect Password" });
        });
    });
});

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    handle: req.user.handle,
    email: req.user.email
  });
});

module.exports = router;