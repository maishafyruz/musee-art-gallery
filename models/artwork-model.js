/*
 * Name: Maisha Fyruz
 * Date: 11.27.2026
 * Course: CSC 372-01
 * Description: Database operations for saved artworks in the Musée art gallery application.
 */

import { pool } from '../database.js'

/**
 * Retrieves all saved artworks belonging to a user.
 */
export async function getArtworks(userId) {
    let result = await pool.query(
        'SELECT * FROM artworks WHERE user_id = $1 ORDER BY id',
        [userId]
    )

    return result.rows
}

/**
 * Adds an artwork to the user's personal gallery.
 */
export async function addArtwork(userId, artworkId, title, artist, imageUrl) {
    let result = await pool.query(
        `INSERT INTO artworks (user_id, artwork_id, title, artist, image_url)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [userId, artworkId, title, artist, imageUrl]
    )

    return result.rows[0]
}

/**
 * Updates the personal note of a saved artwork.
 */
export async function updateArtwork(id, userId, note) {
    let result = await pool.query(
        `UPDATE artworks SET note = $1
         WHERE id = $2 AND user_id = $3 RETURNING *`,
        [note, id, userId]
    )

    return result.rows[0]
}

/**
 * Removes an artwork from the user's personal gallery.
 */
export async function deleteArtwork(id, userId) {
    let result = await pool.query(
        'DELETE FROM artworks WHERE id = $1 AND user_id = $2 RETURNING *',
        [id, userId]
    )

    return result.rows[0]
}
