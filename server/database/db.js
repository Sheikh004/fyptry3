import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const Connection = async (username, password) => {
  const URL = `mongodb+srv://${username}:${password}@fyptry3.kuid0g6.mongodb.net/?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL);
    console.log("Database Connected Succesfully");
  } catch (error) {
    console.log("Error: ", error.message);
  }
};

export default Connection;
