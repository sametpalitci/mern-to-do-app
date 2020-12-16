require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const taskRouter = require('./routes/taskRouter');

app.use('/task', taskRouter);

mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
    app.listen(process.env.PORT)
}).then(() => {
    console.log(`Mongo and App is Running Port : ${process.env.PORT}.`);
})