const db = require ('../db/db');

exports.insertUserDietary = async (dietaryValues) => {
    try {        
        const query =  `INSERT INTO user_dietary (user_id, dietary_id) VALUES ?`;
        const [result] = await db.query (query, [dietaryValues]);
        return result;
    } catch (error) {
        console.error ("Error inserting user dietary:", error);
        throw error;
    }
}