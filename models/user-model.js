/*
 * Name: Maisha Fyruz
 * Date: 11.27.2026
 * Course: CSC 372-01
 * Description: Database operations for authenticated users of the Musée art gallery application.
 */

import { pool } from '../database.js'

/**
 * Finds a user by their GitHub ID.
 */
export async function findUserByGithubId(githubId) {
    let result = await pool.query(
        'SELECT * FROM users WHERE github_id = $1',
        [githubId]
    )

    return result.rows[0]
}

/**
 * Creates a new user in the database.
 */
export async function createUser(githubId, username) {
    let result = await pool.query(
        `INSERT INTO users (github_id, username)
         VALUES ($1, $2) RETURNING *`,
        [githubId, username]
    )

    return result.rows[0]
}

/**
 * Retrieves a user by their database ID.
 */
export async function getUserById(id) {
    let result = await pool.query(
        'SELECT * FROM users WHERE id = $1',
        [id]
    )

    return result.rows[0]
}
