import { UserModel } from "../models/userModel";

export class UserService {
    /**
     * Get a user by ID
     */
    static async getUserById(id: number) {
        return await UserModel.findById(id);
    }

    static async getAllUsers( ) {
        return await UserModel.getAllUsers();
    }

    /**
     * Create a new user
     */
    static async createUser(name: string, email: string) {
        return await UserModel.createUser(name, email);
    }

    static async editUser(userID: number, email?: string, username?: string) {
        return await UserModel.editUser(userID, email, username);
    }

    static async deleteUser(userID: number) {
        return await UserModel.deleteUser(userID);
    }
}
