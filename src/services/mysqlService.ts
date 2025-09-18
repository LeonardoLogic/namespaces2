import mysql from "mysql2/promise";

// Create a MySQL connection pool
const pool = mysql.createPool( {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "task_management",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export class MySQLService {
    static async query( sql: string, params?: any[] ) {
try {
            const [result] = await pool.query(sql, params);
            return [result];
        } catch (error) {
            // You can log the error or handle it as needed
            console.error("Database error:", error);
            throw error;
        }
    }

}

// Export the pool instance for use in other services
export default pool;
