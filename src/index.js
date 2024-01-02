require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const jwt = require("jsonwebtoken");

require("./database/connection");

const bcrypt = require("bcryptjs")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const static_path = path.join(__dirname, "../public")
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
const Registrations = require("./models/registrations")
// console.log("path",partials_path)

app.use(express.static(static_path));  //shows the static html pages

app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

const port = process.env.PORT || 5000

app.get("/", (req, res) => {
    res.render("index");
})
app.get("/registrationPage", (req, res) => {
    res.render("registrationPage");
})
app.get("/login", (req, res) => {
    res.render("login");
})
app.post("/registrationPage", async (req, res) => {
    try {

        // const password = req.body.password;
        // const confirmPassword = req.body.ConfirmPassword;

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

        const token = await newRegistrations.generateAuthToken(res);

        res.cookie("jwt",token)

        const registered = await newRegistrations.save();
        res.status(201).render("index");

    } catch (error) {
        console.log(error);
        res.status(400).send("Error in registration. Please try again.");
    }

})


app.post("/login", async (req, res) => {
    try {
        const enrolmentNo = req.body.eid;
        const password = req.body.password;

        // read the data from the databases
        const enrolmentID = await Registrations.findOne({ eid: enrolmentNo });

        // if (!enrolmentID) {
        //     return res.status(404).send("User not found");
        // }
        const verifyPassword = await bcrypt.compare(password,enrolmentID.password);
        const token = await enrolmentID.generateAuthToken();
        console.log("login wala token ", token)
        // if (enrolmentID.password === password) { // when we directly compare entered password with databases password
        if (verifyPassword) {
            res.status(201).render("index");
        } else {
            res.status(404).send("User not found");
        }

        // res.send(enrolmentID.eid);
        // console.log(enrolmentID);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error in login data ");
    }
});
console.log(process.env.SECRET_KEY)

// app.listen(5000) // this works only in our local system thats why we are not using this

app.listen(port, () => {
    console.log(`server is running on port number ${port}`);
});
