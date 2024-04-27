const mongose = require("mongoose");

const Connectdbs = async () => {
  mongose.set("strictQuery", false);
  try {
    await mongose.connect("mongodb+srv://asad:Asad1234$@cluster0.esgjxuk.mongodb.net/");
    console.log("connected successfuly");
  } catch (error) {
    console.log("Could not connect DB");
  }
};

module.exports = Connectdbs;
