const mongoose = require("mongoose");
const Joi = require("joi");
const express = require("express");
const { route } = require("./genres");
const router = express.Router();

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  isGold: Boolean,
  phone: {
    type: String,
    required: true,
    length: 9,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold.Boolean,
    phone: req.body.phone,
  });

  customer = await customer.save();
  res.send(customer);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) return res.status(404).send("Customer ID does not exist");

  res.send(customer);
});

//Updating a customer
route.put("/:id", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    //TODO: complete this req body
    {
      new: true,
    }
  );

  if (!customer) return res.status(404).send("Customer ID does not exist");
  res.send(customer);
});

//Deleteing a customer
router.delete("/:id", async (req, res)=>{
    
})