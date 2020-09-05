import fs from "fs";
import mongoose from "mongoose";
import Videos from "./dbModel.js";
import Data from "./_data/data.js";

mongoose.connect(
  "mongodb+srv://tiktok-admin:1MO1l2akcJfvKpne@cluster0.md8be.mongodb.net/tiktok-clone?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);

// Read JSON files
// const Videos = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));

// Import into DB
const importData = async () => {
  try {
    await Videos.create(Data);

    console.log("Data Imported...".green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Videos.deleteMany();

    console.log("Data Destroyed...".red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// in console -> node seeder -i will run this
if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
