const jwt = require ('jsonwebtoken')
const bcrypt = require ('bcrypt')
const db = require ('../db.js')

const salt = 10

exports.register = async (req, res) => {
    const sql = "INSERT INTO useraccount (first_name, last_name, username, userPassword, role, building, unitNumber, phoneNumber, dietaryRestrictions) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {    
        if (err) return res.json ({Error: "Error when hashing password"});
        // const sampleVals = ["Shrewsbury", "Admin", "admin001", hash, "COOK", "MAIN", "4A", "83095051", ""];

        const values = [
            req.body.first_name,
            req.body.last_name,
            req.body.username,
            req.body.userPassword,
            req.body.role,
            req.body.building,
            req.body.unitNumber,
            req.body.phoneNumber,
            req.body.dietaryRestrictions
        ]

        db.query (sql, sampleVals, (err, result) => {
            if (err) return res.json ({Error: "Error when inserting data" + err});
            return res.json ({Status: "Successful!"});
        })
    })
   
}