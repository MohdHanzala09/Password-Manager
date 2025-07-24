import express from 'express';
import router from './routes/routepage.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';    
const app = express();
dotenv.config();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());   
app.use(router);
app.use(express.urlencoded({ extended: true }));
// 
app.listen(PORT, () => {    
    console.log(`Server is running on port ${PORT}`);
});