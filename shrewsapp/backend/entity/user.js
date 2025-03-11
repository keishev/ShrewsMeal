const db = require ('../db/db');

exports.createUser = async (user) => {
    try {
        const query = `INSERT INTO useraccount 
            (first_name, last_name, username, userPassword, role, unitNumber, dietaryRestrictions) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`;

        const values = [user.first_name, user.last_name, user.username, user.userPassword, user.role, user.unitNumber, user.dietaryRestrictions];

        const [results] = await db.execute(query, values);
        return result;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

exports.findByUsername = async (username) => {
    try {
        const query = 'SELECT * FROM useraccount WHERE username = ? LIMIT 1';
        const [result] = await db.execute (query, [username]);
        return result.length > 0 ? result[0] : null
    } catch (error) {
        console.error ("Error finding user:", error);
        throw error;
    }
};

exports.getIdByUsername = async (username) => {
    try {
        const query = 'SELECT userID FROM useraccount WHERE username = ?';
        const [result] = await db.execute (query, [username]);
        return result.length > 0 ? result [0] : null
    } catch (error) {
        console.error ("Error finding user's ID:", error);
        throw error;
    }
};

exports.updateUnitNumber = async (userID, newUnitNumber) => {
    try {
        const query = `UPDATE useraccount SET unitnumber = ? WHERE userID = ?`;
        const values = [userID, newUnitNumber];
        const [result] = await db.execute (query, values);
        return result;
    } catch (error) {
        console.error ("Error updating unit number:", error);
        throw error;
    }
};

exports.deleteUserById = async (userID) => {
    try {
        const query = `DELETE FROM useraccount WHERE userID = ?`;
        const [result] = await db.execute (query, [userID]);
        return result;
    } catch (error) {
        console.error ("Error deleting user:", error);
        throw error;
    }
}