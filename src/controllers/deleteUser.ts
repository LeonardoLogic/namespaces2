import { Request, Response } from "express";
import { UserService } from "../services/userService";

export async function deleteUser(req: Request, res: Response) {

    const userID: number = Number(req.body.userID);

    if ( !userID ) {
        return res.status(404).json({ message: "userID is required" });
    }

    const result = await UserService.deleteUser(userID);
    if (result) {
        return res.json({ message: "User deleted" });
    } else {
        return res.status(404).json({ message: "User not found" });
    }
}