import { Router, Request, Response } from "express";
import { UserService } from "../services/userService";

export async function createUser(req: Request, res: Response) {
    
    const { username, email } = req.body; // store username and email for a new user

    if ( !username || !email ) { // validation check

        return res.status(400).json( { message: "Name and email are required" });

    }

    try {

        const result = await UserService.createUser( username, email );

        res.status( 201 ).json( { message: "User created", user: result } );

    } catch (error) {
        res.status( 500 ).json( { message: "Error creating user", error } );
    }
}
