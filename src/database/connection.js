const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/registrationForm')
  .then(() => {
    console.log("Connection is successful");
  })
  .catch((err) => {
    console.log(`We got an error: ${err}`);
  });
