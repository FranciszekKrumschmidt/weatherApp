import sqlite3 from 'sqlite3';
import {open, Database } from 'sqlite';

let dbInstance: Database | null = null;

export async function initDB() {
    dbInstance = await open({
        filename: "./weather_app.db",
        driver: sqlite3.Database
    });
    await dbInstance.exec(`
        CREATE TABLE IF NOT EXISTS weather_forecast (
            city TEXT NOT NULL,
            forecast_date DATE NOT NULL,
            description TEXT NOT NULL,
            average_temp REAL NOT NULL,
            last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (city, forecast_date)
        );    
    `);
    console.log("connected with the database");
    return dbInstance;
}

export function getDB() {
    if (!dbInstance) {
        throw new Error("Database not initialized");
    }
    return dbInstance;
}