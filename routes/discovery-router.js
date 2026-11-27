/*
 * Name: Maisha Fyruz
 * Date: 11.27.2026
 * Course: CSC 372-01
 * Description: API route for discovering artworks.
 */

import { Router } from 'express'
import { searchArtworks } from '../controllers/discovery-controller.js'

let router = Router()

router.get('/', searchArtworks)

export default router
