import { Request, Response } from "express";
import { UserService } from "../services/userService";

export async function editUser(req: Request, res: Response) {

    const userID: number = Number(req.body.userID);

    if ( !userID || ( !req.body.email && !req.body.username ) ) {
        return res.status(404).json({ message: "userID and at least one of email or username are required" });
    }

    try {
        const updatedUser = await UserService.editUser(userID, req.body.email, req.body.username);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }

    
}