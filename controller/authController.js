const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()
const {users, User} = require("../models/User")


const register = async (req, res)=> {
    try {
        const {email , password} = req.body

        if(!email || !password){
            return res.status(400).json({message: "All fields are required"})
        }

        const existing = users.find(user => user.email === email)
        if(existing){
            return res.status(400).json({message : "User already exist"})
        }

        const hashed = await bcrypt.hash(password , 10)

        const newUser = new User({ 
            email : email, 
            password : hashed
        })
        
        users.push(newUser)

        return res.status(201).json({message: "Registered successfully"})

    } catch (error) {
        return res.status(500).json({error : error.message})
    }
}


const login = async (req,res) => {
    try {
        const {email, password} = req.body

        if(!email || !password){
            return res.status(400).json({message: "All fields are required"})
        }

        const existing = users.find(user => user.email === email)
        if(!existing){
            return res.status(404).json({message : "User not found"})
        }

        const check = await bcrypt.compare(password, existing.password)
        if(!check){
            return res.status(400).json({message : "Invalid credentials"})
        }

        const token = jwt.sign({email}, process.env.JWT_SERCET, {expiresIn : "10m"})
        
        res
        .cookie("authToken",token, {
            httpOnly : true,
            maxAge : 10 * 60 * 1000
        })
        .json({message : "Logged in successfully"})


    } catch (error) {
        return res.status(500).json({error : error.message})
    }
}

const dashboard = async (req,res) =>{

    try {
        const user = users.find(u => u.email === req.user.email)
        if(!user){
            return res.status(404).json({message : "User not found"})
        }
        return res.status(200).json({message : "Welcome to Dashboard"})
    } catch (error) {
        res.status(500).json({message : "Internal server error"})
    }
}




module.exports = {register, login, dashboard}

