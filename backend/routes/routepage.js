import express from "express";
import dotenv from "dotenv";
import passMange from "../models/passMangepage.js";
import jwt from "jsonwebtoken";
// import { authId } from "../controllers/authpage.js";
import allUsers from "../models/modelpage.js";
import bcrypt from "bcrypt";
import { OAuth2Client } from 'google-auth-library'
const client = new OAuth2Client(process.env.clientID);
dotenv.config();

const router = express.Router();   

router.post("googleLogin", async (req,res) => {
    const token = req.body.token;
    if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }
    try{
        const ticket = await client.verifyIdToken({
            idToken:token,
            audience:process.env.clientID,
        })
         const { userName,email } = req.body;
            if (!userName || !email ) {
                return res.status(400).json({ message: "Username, email, and password are required" });
            }
            const existingUser = await allUsers.findOne({ email });
            if (existingUser) {
                const accessToken = jwt.sign(email , process.env.JWT_SECRET);
                res.cookie("tokens", accessToken)
            }
            return res.status(200).json({ message: "Login successful" ,success:true});
    } catch {
        console.log("error while login : " , error);
        return res.status(404).json({ message: "Login unsuccessful" ,success:false});
    }
})

router.post("/login", async (req, res) => { 
    try {
        console.log(req.body);
         const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "Username and password are required" });
            }
            const userwithEmail = await allUsers.findOne({ email});
            if (!userwithEmail) {
                return res.status(401).json({ message: "Invalid email or password" });
            }
            const findPassword = userwithEmail.password;
            const isPasswordValid = await bcrypt.compare(password, findPassword);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid username or password" });
            }
            const user = {
                email: userwithEmail.email,
                id: userwithEmail._id,
            };
            const accessToken = jwt.sign(user, process.env.JWT_SECRET);
            res.cookie("token", accessToken, { httpOnly: true, sameSite: "lax" });
            return res.status(200).json({ message: "Login successful" ,success:true});
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
});
router.post("/register", async (req, res) => {
    try {
         const { userName,email, password } = req.body;
            if (!userName || !email || !password) {
                return res.status(400).json({ message: "Username, email, and password are required" });
            }
            const existingUser = await allUsers.findOne({ email , userName });
            if (existingUser) {
                return res.status(409).json({ message: "User already exists" });
            }
            const hashedPassword = await bcrypt.hash(password, 14);
            const newUser = await allUsers.create({
                userName,
                email,
                password: hashedPassword,
            });
            // await newUser.save();
            return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ message: "Internal server error" });        
    }
 ;
}); 
router.post("/createPass",async(req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        const userId = req.user.id;
        const { userName, URL, password } = req.body;
        if (!userName || !URL || !password) {
            return res.status(400).json({ message: "Username, URL, and password are required" });
        }
        const createPass = await passMange.create({
            userName,
            URL,
            password,
            objectId: userId,
        });
    } catch (error) {
        console.error("Error during password creation:", error);
        return res.status(500).json({ message: "Internal server error" });    
    }
})
router.get("/userData",async(req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        const userId = req.user.id;
        const findOneUser = await passMange.find({objectId: userId});
        if (!findOneUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const userData = await passMange.find({ objectId: userId });
        if (!userData) {
            return res.status(404).json({ message: "No data found" });
        }
        return res.status(200).json({ userData });
    } catch (error) {
        console.error("Error during user data retrieval:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
})
router.get("/checkAuth", (req,res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }
         const user = jwt.verify(token, process.env.JWT_SECRET);
         if (!user) {
            return res.status(401).json({ message: "Unauthorized", success: false }); 
        }
        return res.status(200).json({success: true });
    } catch (error) {
         console.error("Error during authentication check:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
})
router.get("/logout",(req,res) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({msg:"token not found",success:false})
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({msg:"invalid token",success:false})
        }
        res.cookie("token"," ",{expiresIn:Date.now()})
        return res.status(201).json({msg:"Logout successfully", success:true})
    } catch (error) {
        console.log("error",error.message)
        return res.status(500).json({msg:"logout failed" , success:false})
    }
})
router.get("/", (req, res) => {
  res.send("Welcome to the home page");
});

export default router