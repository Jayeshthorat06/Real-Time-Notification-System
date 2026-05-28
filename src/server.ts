import dotenv from "dotenv";
dotenv.config();
import User from "./models/User";
import app from "./app";
import { sequelize } from "./database/db";

/**
 * Import Models
 */
import "./models/User";
import { hashPassword } from "./auth/auth.service";

const PORT = process.env.PORT || 5000;

/**
 * Start Server Function
 */
import "./models";
const startServer = async (): Promise<void> => {
    try {
        /**
         * Database Connection
         */
        await sequelize.authenticate();

        console.log("✅ MySQL Database Connected Successfully");

        /**
         * Sync Database
         * (Development only)
         */
        
        await sequelize.sync();

        console.log("✅ Database Synced");
        // console.log(await hashPassword("admin@123"));
        /**
         * Start Express Server
         */
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("❌ Server Startup Error:", error);
        process.exit(1);
    }
};

startServer();