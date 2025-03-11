const dotenv = require("dotenv");
const app = require("./app.js"); 

dotenv.config({ path: "D:/ProgrammingProjects/ShrewsMeal/ShrewsMeal/shrewsapp/.env" });

const PORT = process.env.SERVER_PORT || 5000;

app.listen (PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});