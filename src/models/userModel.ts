import pool, { MySQLService } from "../services/mysqlService";

export class UserModel {
    static async findById( id: number ) {
        const [rows] = await MySQLService.query("SELECT * FROM users WHERE id = ?", [id]);
        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    }

    static async getAllUsers( ){
        const [rows] = await MySQLService.query( "SELECT * FROM users");
        return rows;
    }

    static async createUser( name: string, email: string ) {
        const [result] = await MySQLService.query(
            "INSERT INTO users (name, email) VALUES (?, ?)",
            [name, email]
        );
        return result;
    }

    static async deleteUser( userID: number ) {
        const [result] = await MySQLService.query("DELETE FROM users WHERE id = ?", [userID]);
        return (result as any).affectedRows > 0;
    }

    static async editUser( userID: number, email?: string, username?: string ) {
        const fields = [];
        const values = [];

        if (email) {
            fields.push("email = ?");
            values.push(email);
        }
        if (username) {
            fields.push("name = ?");
            values.push(username);
        }
        values.push(userID);

        if (fields.length === 0) {
            throw new Error("No fields to update");
        }
        const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
        const [result] = await MySQLService.query(sql, values);
        return result;
    }



}