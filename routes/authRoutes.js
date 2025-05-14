const express = require("express")
const router = express.Router()

const {register, login, dashboard} = require("../controller/authController")
const verifyToken = require("../middleware/authMiddleware")

router.post("/register", register)

router.post("/login", login)

router.get("/dashboard", verifyToken, dashboard)

