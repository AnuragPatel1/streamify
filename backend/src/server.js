import  express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"

import authRoutes from "./routes/auth.route.js"
import { connectDB } from "./lib/db.js";
import userRoutes from "./routes/user.route.js"
import chatRoutes from "./routes/chat.route.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT; 



app.use(cors({
    origin:"http://localhost:5173",
    credentials:true // allow frontend to send the cookies
}))

app.use(express.json()); 
app.use(cookieParser())

app.post('/test', (req, res) => {
    res.json({ message: 'Server is working!' });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

app.listen(PORT,()=>{
    console.log("Server is running", PORT);
    connectDB();
}) 
