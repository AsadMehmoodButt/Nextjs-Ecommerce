const mongose = require("mongoose");

const Connectdbs = async () => {
  mongose.set("strictQuery", false);
  try {
    await mongose.connect(process.env.MONGO_URI);
    console.log("connected successfuly");
  } catch (error) {
    console.log("Could not connect DB");
  }
};

module.exports = Connectdbs;
