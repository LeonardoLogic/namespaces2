import { Router } from "express";
import express from "express";
import { getUser } from "../controllers/getUser";
import { createUser } from "../controllers/createUser";
import { editUser } from "../controllers/editUser";
import { deleteUser } from "../controllers/deleteUser";
import { getAllUsers } from "../controllers/getAllUsers";

// Create a new Express router for API routes
const apiRouter = Router();

// Add middleware to parse JSON and URL-encoded bodies
apiRouter.use( express.json( ) );

apiRouter.use( express.urlencoded({ extended: true }));

apiRouter.post( "/createUser ", createUser );

apiRouter.delete( "/deleteUser" , deleteUser )

apiRouter.post( "/editUser" , editUser )

apiRouter.get( "/getUser" , getUser );

apiRouter.get( "/getAllUsers" , getAllUsers );

// Export the router to use in namespace setup
export default apiRouter;