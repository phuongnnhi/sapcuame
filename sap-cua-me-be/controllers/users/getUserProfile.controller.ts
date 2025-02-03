import {Response} from "express"
import { CustomRequest } from "../../index";

//Get user profile 
export const getUserProfile = async (req: CustomRequest, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            res.status(404).json({message:"User not found"})
            return;
        }
        res.status(200).json(user)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}