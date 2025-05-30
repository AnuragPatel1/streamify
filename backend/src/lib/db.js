import mongoose from "mongoose";

const DB_NAME = "Streamify"

export const connectDB = async() => {
    try {
       const conn = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
       console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log("Error in connecting MongoDB !!!", error);
        process.exit(1);   // 1 means failure
    }
}