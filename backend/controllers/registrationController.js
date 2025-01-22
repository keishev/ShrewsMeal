const express = require ('express')
const cors = require ('cors')
const jwt = require ('jsonwebtoken')
const bcrypt = require ('bcrypt')
const cookieParser = require('cookie-parser')
const db = require ('../db.js')

const salt = 14

exports.register = async (req, res) => {
    const sql = "INSERT INTO useraccount (first_name, last_name, username, userPassword, role, building, unitNumber, phoneNumber, dietaryRestrictions) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    // bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {     uncomment this later bcs this is the right one without hardcoding
    bcrypt.hash('Vickoh84'.toString(), salt, (err, hash) => {
        if (err) return res.json ({Error: "Error when hashing password"});
        const samplevalues = ["Shrewsbury", "Admin", "admin001", hash, "COOK", "MAIN", "4A", "83095051", ""];
        // const values = [
        //         // req.body.first_name,
        //         // req.body.last_name,
        //         // req.body.username,
        //         // req.body.userPassword,
        //         // req.body.role,
        //         // req.body.building,
        //         // req.body.unitNumber,
        //         // req.body.phoneNumber,
        //         // req.body.dietaryRestrictions
        //     ]
        db.query (sql, samplevalues, (err, result) => {
            if (err) return res.json ({Error: "Error when inserting data"});
            return res.json ({Status: "Successful!"});
        })
    })
   
}