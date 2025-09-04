const bcrypt = require("bcrypt")
const _ = require("lodash")
const mongoose = require("mongoose")
const Joi = require("joi")
const { User } = require("../models/user")
const express = require("express")
const router = express.Router()

router.post("/", async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send("Invalid email or password.")

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) return res.status(400).send("Invalid email or password.")

  res.send(true)
})

function validate(req) {
  const schema = {
    email: Joi.string().max(255).min(5).required(),
    password: Joi.string().max(255).required(),
    //TODO: joi-password-complexity can be used here
  }

  return Joi.validate(req, schema)
}

module.exports = router