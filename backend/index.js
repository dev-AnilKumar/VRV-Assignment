const express = require('express');
const app = express();
const dbConnect = require('./config/dbConnect');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/userRoutes')

dotenv.config();
dbConnect();

const PORT = process.env.PORT || 8000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRoute)

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})


