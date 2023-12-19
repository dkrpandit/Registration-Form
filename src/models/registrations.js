
const mongoose = require("mongoose");

const bcryptjs = require("bcryptjs");

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
    }

})

// for hashing our password using bcrypt algorithm
studentSchema.pre("save", async function (next) {

    if(this.isModified("password")){
        
        console.log(`Before hashing the password is ${this.password}`);
        this.password = await bcryptjs.hash(this.password,10);
        console.log(`After hashing the password is ${this.password}`);
    }
})

const Registrations = new mongoose.model("StudentRegistration", studentSchema);

module.exports = Registrations
