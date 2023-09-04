import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.URI, {
      dbName: "backendapi",
    })
    .then(() => console.log("db connected"))
    .catch((e) => console.log(e));



};