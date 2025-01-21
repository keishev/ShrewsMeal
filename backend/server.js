const express = require ('express')
const app = express ()

// Set up route for the API
app.get ('/api', (req, res) => {
    // What we want to send to the frontend. In the front end, we will fetch what is sent here
    res.json ({ "users": ["user1", "user2", "user3"] })
})

app.listen (5000, () => { console.log ("Server started on port 5000") })