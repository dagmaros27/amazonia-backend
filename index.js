const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51O1ukZBZeJk9TcNVE216vGgnJStgrBHd7yAlqabZHNPffwIikhcAsbRUEI4kCW4fLPOIMi22WT0u091P580ZuBNT00jKeZpf6p"
);

const app = express();

app.use(cors({ origin: true }));

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  console.log("Payment request recieved for this amount >>>>", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(4040, (req, res) => {
  console.log("server listening on 4040");
});

// http://127.0.0.1:5001/ia-7849c/us-central1/api
