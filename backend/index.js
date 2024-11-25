const express = require('express');
const app = express();
const dbConnect = require('./config/dbConnect');
const dotenv = require('dotenv');

dotenv.config();
dbConnect();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})


