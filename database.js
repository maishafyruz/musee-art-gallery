/*
 * Name: Maisha Fyruz
 * Date: 11.27.2026
 * Course: CSC 372-01
 * Description: Database connection and table creation
 * for the Musée art gallery application.
 */

import pg from 'pg'

export let pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL
})

await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        github_id TEXT NOT NULL UNIQUE,
        username TEXT NOT NULL
    )
`)

await pool.query(`
    CREATE TABLE IF NOT EXISTS artworks (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        artwork_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        artist TEXT NOT NULL,
        image_id TEXT NOT NULL,
        note TEXT DEFAULT '',
        UNIQUE (user_id, artwork_id)
    )
`)

console.log('Database tables are ready.')