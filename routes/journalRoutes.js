const express = require("express");
const router = express.Router();

const {createJournal, getJournals, getJournal, updateJournal, deleteJournal} = require("../controller/journalController")

const verifyToken = require("../middleware/authMiddleware")

router.post("/create", verifyToken, createJournal)
router.get("/get", verifyToken, getJournals)    

router.get("/get/:id", verifyToken, getJournal)
router.put("/update/:id", verifyToken, updateJournal)

router.delete("/delete/:id", verifyToken, deleteJournal)