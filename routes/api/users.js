const express = require("express");
const router = express.Router();
const BCrypt = require('bcryptjs');

const User = require("../../models/User.js");

router.get("/test", (req, res) => {
  res.json({ msg: "This is the user route" });
});

router.post("/register", (req, res) => {
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
              .catch(err => res.send(err).status(418));
          });
        });
      }
    })
});

module.exports = router;