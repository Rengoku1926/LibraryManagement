import User from '../models/userModel'
import { Request, Response } from 'express'

export const getAllUsers = async(req:Request, res:Response) => {
    const users = await User.find();
    if(users){
        res.json(users)
    }else{
        res.status(401).json({message:"No user found"})
    }
}

export const addUsers = async (req: Request, res: Response) => {
    const { name, email, contact } = req.body;  
    try {
        const newUser = new User({ name, email, contact });
        await newUser.save();
        res.status(201).json({ message: "New User added", newUser });
    } catch (error) {
        res.status(500).json({ message: "Error adding user", error });
    }
}