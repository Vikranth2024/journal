const jwt = require("jsonwebtoken")
require("dotenv").config()

const authenticateToken = (req,res,next) => {
        const token = req.cookies.authToken
        if(!token){
            return res.status(401).send("Unauthorized")
        }
        try{ 
        const payload = jwt.verify(token, process.env.Secret)
        req.user = payload
        next()
    } catch (error) {
        return res.status(500).json({error : error.message})
    }
}
module.exports = authenticateToken
