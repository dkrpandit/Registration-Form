
const mongoose = require("mongoose");

const bcryptjs = require("bcryptjs");

const jwt = require("jsonwebtoken");


const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobileNumber: {
        type: Number,
        required: true,
    },
    eid: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]

})


// generating token

/* 
studentSchema.methods.generateAuthToken = async function () {
    try {
        // const token = jwt.sign({ _id: this._id.toString() }, "dharmendrapanditmadhubanibiharnodejs") //min 32 character
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token:token});
        console.log(token)
        await this.save();
        return token;
    } catch (error) {
        res.send("this is error part", error)
        console.log("Error generating auth token:", error);
    }
}
*/
 
studentSchema.methods.generateAuthToken = async function (res) {
    try {
        // const token = jwt.sign({ _id: this._id.toString() }, "dharmendrapanditmadhubanibiharnodejs") //min 32 character
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token:token});
        // console.log(token)
        await this.save();
        res.header('auth-token', token);
        return token;
    } catch (error) {
        res.send("this is error part", error)
        console.log("Error generating auth token:", error);
    }
}



// convert password into hashing password using bcrypt algorithm
studentSchema.pre("save", async function (next) {

    if (this.isModified("password")) {

        // console.log(`Before hashing the password is ${this.password}`);
        this.password = await bcryptjs.hash(this.password, 10);
        // console.log(`After hashing the password is ${this.password}`);
    }
})

const Registrations = new mongoose.model("StudentRegistration", studentSchema);

module.exports = Registrations


