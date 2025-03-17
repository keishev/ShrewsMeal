const bcrypt = require ('bcrypt');
const db = require ('../db/db.js');

const { createUser, checkUsernameAvail } = require ('../entity/user.js');
const { insertUserDietary } = require('../entity/restrictions.js');

exports.createNewUser = async (req, res) => {
    const { firstName, lastName, phoneNumber, role, building, unitNumber, dietary } = req.body;
    const username = await generateUniqueUsername (firstName, lastName);
    const password = await generateDefaultPass (firstName, lastName);

    console.log(`Generated Password for ${username}: ${password}`); 

    try {
        const hashedPass = await bcrypt.hash (password, 10);

        const insertedUser = await createUser (firstName, lastName, username, hashedPass, role, building, unitNumber, phoneNumber);
    
        if (!firstName || !lastName || !phoneNumber || !role || !building || !unitNumber) {
            return res.status(400).json({ message: "All fields except dietary restrictions are required." });
        }
    
        const userId = insertedUser.insertId;

        // Inserting dietary restrictions if provided
        if (dietary && dietary.length > 0) {
            const dietaryValues = dietary.map (id => [userId, id]);
            await insertUserDietary (dietaryValues);
        }    

        return res.json ({ Status: "Success", username: username, defaultPassword: password });
    } catch (error) {
        return res.json ({ Status: "Error" });
    }
};

const generateUniqueUsername = async (firstName, lastName) => {
    let baseUsername = `${firstName[0].toLowerCase()}${lastName[0].toLowerCase()}`;
    let counter = 1;
    let username;

    while (true) {
        username = `${baseUsername}${String(counter).padStart(2, '0')}`;
        const result = await checkUsernameAvail (username);
        
        if (result.length === 0) {
            return username;
        }

        counter++;
    }
};

const generateDefaultPass = async (firstName, lastName) => {
    const firstInitial = firstName[0].toUpperCase ();
    const lastInitial = lastName[0].toUpperCase ();
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    return `${firstInitial}${lastInitial}${randomDigits}`; 
}