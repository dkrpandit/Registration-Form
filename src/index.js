const express = require("express");
const path = require("path");
const app = express();
// require("./database/connection");

const static_path = path.join(__dirname,"../public")
// console.log("path",static_path)
app.use(express.static(static_path));
const port = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.send("hey we are on home page");
})

// app.listen(5000) // this works only in our local system thats why we are not using this

app.listen(port, () => {
    console.log(`server is running on port number ${port}`)
})