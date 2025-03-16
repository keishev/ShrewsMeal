const db = require ('../db/db');

exports.insertUserDietary = async (dietaryValues) => {
    try {        
        const query =  `INSERT INTO user_dietary (user_id, dietary_id) VALUES ?`;
        // for (const value of dietaryValues) {
            
        // }
        const [result] = await db.execute (query, [dietaryValues]);
        return result;
    } catch (error) {
        console.error ("Error inserting user dietary:", error);
        throw error;
    }
}