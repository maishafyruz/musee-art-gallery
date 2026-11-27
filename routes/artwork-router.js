
/*
 * Name: Maisha Fyruz
 * Date: 11.27.2026
 * Course: CSC 372-01
 * Description: API routes for managing saved artworks in the Musée art gallery.
 */

import { Router } from 'express'

import {
    listArtworks,
    createArtwork,
    editArtwork,
    removeArtwork
} from '../controllers/artwork-controller.js'

let router = Router()

/**
 * Ensures that the user is authenticated.
 */
function ensureAuth(req, res, next) {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next()
    }

    res.status(401).json({
        error: 'Please log in first.'
    })
}

router.get('/', ensureAuth, listArtworks)
router.post('/', ensureAuth, createArtwork)
router.put('/:id', ensureAuth, editArtwork)
router.delete('/:id', ensureAuth, removeArtwork)

export default router
