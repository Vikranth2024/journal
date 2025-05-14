const {journals, Journal} = require("../models/User")

const createJournal = async (req,res) => {
    try {
        const {title,content} = req.body
        const {id} = req.user
        if(!title || !content){
            return res.status(400).json({message: "All fields are required"})
        }
        const newJournal = new Journal({title, content, ownerId: id})
        journals.push(newJournal)
        return res.status(201).json({message: "Journal created successfully"})
    } catch (error) {
        return res.status(500).json({error : error.message})
    }
}

const getJournals = async (req,res) => {
    try {
        const {id} = req.user
        const userJournals = journals.filter(journal => journal.ownerId === id)
        return res.status(200).json(userJournals)
    } catch (error) {
        return res.status(500).json({error : error.message})
    }
}

const getJournal = async (req,res) => {
    try {
        const {id} = req.params
        const journal = journals.find(journal => journal.id === id)
        if(!journal){
            return res.status(404).json({message: "Journal not found"})
        }
        return res.status(200).json(journal)
    } catch (error) {
        return res.status(500).json({error : error.message})
    }
}

const updateJournal = async (req,res) => {
    try {
        const {id} = req.params
        const {title, content} = req.body
        const journal = journals.find(journal => journal.id === id)
        if(!journal){
            return res.status(404).json({message: "Journal not found"})
        }
        journal.update({title, content})
        return res.status(200).json({message: "Journal updated successfully"})
    } catch (error) {
        return res.status(500).json({error : error.message})
    }
}

const deleteJournal = async (req,res) => {
    try {
        const {id} = req.params
        const journalIndex = journals.findIndex(journal => journal.id === id)
        if(journalIndex === -1){
            return res.status(404).json({message: "Journal not found"})
        }
        journals.splice(journalIndex, 1)
        return res.status(200).json({message: "Journal deleted successfully"})
    } catch (error) {
        return res.status(500).json({error : error.message})
    }
}

module.exports = {
    createJournal,
    getJournals,
    getJournal,
    updateJournal,
    deleteJournal
}