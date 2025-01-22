const express = require ('express')
const cors = require ('cors')
const jwt = require ('jsonwebtoken')
const bcrypt = require ('bcrypt')
const cookieParser = require('cookie-parser')

const User = require ('../entity/userAccount.js')

exports.login = async (req, res) => {
    const user = await User.findByUsername (req.body.username);
};
