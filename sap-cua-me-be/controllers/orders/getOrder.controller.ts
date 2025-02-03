import {  Response } from "express";
import Order from "../../models/Order";
import { CustomRequest } from "../../index";

//get the list of all orders for the logged-in user
export const getOrders = async(req:CustomRequest, res:Response) => {
    try {
        const userId = req.user._id;
        //fetch all orders for the logged in user
        const orders = await Order.find({userId}).sort("-createdAt")

        res.status(200).json({orders})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}