const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/studentRegistrations')
  .then(() => {
    console.log("Connection is successful");
  })
  .catch((err) => {
    console.log(`We got an error: ${err}`);
  });


/* 
const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/student')
    .then(() => console.log('Connected!'))
    .catch((err) => console.log(err));

const TEITBSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollNo: Number,
    city: String,
    active: Boolean,
    date: {
        type: Date,
        default: Date.now
    }
});

const TEITB = mongoose.model("TEITB", TEITBSchema);

*/