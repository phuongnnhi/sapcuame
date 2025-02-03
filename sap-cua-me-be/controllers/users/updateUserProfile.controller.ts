import {Response} from "express";
import User from "../../models/User";
import { CustomRequest } from "../../index";

export const updateUserProfile = async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.user._id;
        const {name, phone, address} = req.body;

        //find user and authenticate their profile
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {name, phone, address},
            {new: true, runValidators: true}
        ).select("-passwordHash"); //exclude the password from the response

        if(!updatedUser) {
            res.status(404).json({message:"User not found"})
            return
        }

        res.status(200).json(updatedUser)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}