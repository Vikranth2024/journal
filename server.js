const express = require('express');
const app = express();
require('dotenv').config()
const cookieParser = require("cookie-parser")
const authRoutes = require('./routes/authRoutes')
const journalRoutes = require('./routes/journalRoutes')


app.use(express.json())
app.use(cookieParser())
app.use("/auth", authRoutes)
app.use("/journals", journalRoutes)

app.listen(3200, () => {
    console.log('Server is running on port 3200')
})