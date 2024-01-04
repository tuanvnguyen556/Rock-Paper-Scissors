require('dotenv').config();

const express = require('express');

const app = express();

// app places folder name
app.use(express.static("public"))


const stripe = require('stripe')(process.env.PRIVATE_KEY);

app.listen(3000);