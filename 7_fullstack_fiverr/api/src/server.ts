import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:50000/").then(() => {
  console.log("🔥 Veritbanına bağlandı🔥");
});
