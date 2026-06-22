import mongoose from "mongoose";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'
export const registerUser = async (req,res) => {
    const {username, email, password, role = "user"} = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            {username},
            {email} 
        ]
    })

    if(isUserAlreadyExists){
        return res.status(409).json({ message : "User already exists"})
    }

    const hash = await bcrypt.hash(password,10)
    const user = await userModel.create({
        username,
        email,
        password: hash,
        role
    })

    const token = jwt.sign({
        id: user._id,
        role: user.role
    },process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message: "User created successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    })
}

export const loginUser = async (req,res) => {
    const {username,email,password} = req.body

    const user = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(!user){
        return res.status(401).json({ message: "Invalid username or email"})
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
        return res.status(401).json({message: "Invlalid password"})
    }

    const token = jwt.sign({
        id: user._id,
        role: user.role
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(200).json({
        message: "User logged in succcessfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    })


}