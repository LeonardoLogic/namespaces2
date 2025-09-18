import { Request, Response } from "express";
import { UserService } from "../services/userService";


export async function getUser(req:Request, res:Response) {
 const userId:number = Number(req.body.userID);

    if ( !userId ) {
        return res.status(400).json({ message: "userID is required" });
    }
    try {
        const user = await UserService.getUserById(userId);
        if ( !user ) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving user", error });
    }
}