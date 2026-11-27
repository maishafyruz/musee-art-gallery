
/*
 * Name: Maisha Fyruz
 * Date: 11.27.2026
 * Course: CSC 372-01
 * Description: Handles requests and responses for the Musée personal art gallery.
 */

import {
    getArtworks,
    addArtwork,
    updateArtwork,
    deleteArtwork
} from '../models/artwork-model.js'

/**
 * Returns all artworks saved by the logged-in user.
 */
export async function listArtworks(req, res, next) {
    try {
        let artworks = await getArtworks(req.user.id)
        res.json(artworks)
    } catch (err) {
        next(err)
    }
}

/**
 * Saves an artwork to the user's gallery.
 */
export async function createArtwork(req, res, next) {
    try {
        let { artworkId, title, artist, imageUrl } = req.body || {}

        if (!Number.isInteger(artworkId) || artworkId <= 0 ||
            typeof title !== 'string' || !title.trim() ||
            typeof artist !== 'string' || !artist.trim() ||
            typeof imageUrl !== 'string' || !imageUrl.trim()) {
            return res.status(400).json({
                error: 'Valid artwork information is required.'
            })
        }

        let artwork = await addArtwork(
            req.user.id, artworkId, title, artist, imageUrl
        )

        res.status(201).json(artwork)
    } catch (err) {
        if (err.code === '23505') {
            return res.status(409).json({
                error: 'This artwork is already in your gallery.'
            })
        }

        next(err)
    }
}

/**
 * Updates the personal note of a saved artwork.
 */
export async function editArtwork(req, res, next) {
    try {
        let id = Number(req.params.id)
        let { note } = req.body || {}

        if (!Number.isInteger(id) || id <= 0 ||
            typeof note !== 'string') {
            return res.status(400).json({
                error: 'A valid artwork ID and note are required.'
            })
        }

        let artwork = await updateArtwork(id, req.user.id, note)

        if (!artwork) {
            return res.status(404).json({
                error: 'Artwork not found.'
            })
        }

        res.json(artwork)
    } catch (err) {
        next(err)
    }
}

/**
 * Removes a saved artwork from the user's gallery.
 */
export async function removeArtwork(req, res, next) {
    try {
        let id = Number(req.params.id)

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                error: 'Invalid artwork ID.'
            })
        }

        let artwork = await deleteArtwork(id, req.user.id)

        if (!artwork) {
            return res.status(404).json({
                error: 'Artwork not found.'
            })
        }

        res.json({
            message: 'Artwork removed successfully.'
        })
    } catch (err) {
        next(err)
    }
}
