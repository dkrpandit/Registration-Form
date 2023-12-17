const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
require("./database/connection");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
const static_path = path.join(__dirname,"../public")
const templates_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");
const Registrations = require("./models/registrations") 
// console.log("path",partials_path)

app.use(express.static(static_path));  //shows the static html pages

app.set("view engine","hbs");
app.set("views",templates_path);
hbs.registerPartials(partials_path);

const port = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.render("index");
})
app.get("/registrationPage", (req, res) => {
    res.render("registrationPage");
})
app.post("/registrationPage", async (req, res) => {
    try {
        
        const password = req.body.password;
        const confirmPassword = req.body.ConfirmPassword;

            const newRegistrations = new Registrations({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                gender: req.body.gender,
                year: req.body.year,
                city: req.body.city,
                email: req.body.email,
                mobileNumber: req.body.mobileNumber,
                eid: req.body.eid,
                password: req.body.password
            })
            const registered = await newRegistrations.save();

            res.status(201).render("index")
    } catch (error) {
        res.status(400).send(error);
    }
})

// app.listen(5000) // this works only in our local system thats why we are not using this

app.listen(port, () => {
    console.log(`server is running on port number ${port}`)
})