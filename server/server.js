require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// app places folder name
app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

const stripe = require('stripe')(process.env.PRIVATE_KEY);

app.post("/create-checkout-session", async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: "payment",
            line_items: req.body.item,
            success_url: process.env.SERVER_URL,
            cancel_url: process.env.SERVER_URL
        })
        res.json({ url: session.url })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

app.listen(3000);