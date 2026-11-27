/*
 * Name: Maisha Fyruz
 * Date: 11.27.2026
 * Course: CSC 372-01
 * Description: Express server for the Musée art gallery application.
 */

import express from 'express'
import './database.js'
import artworkRouter from './routes/artwork-router.js'
import discoveryRouter from './routes/discovery-router.js'

let app = express()
let port = process.env.PORT || 3000

app.use(express.json())
app.use('/api/discover', discoveryRouter)
app.use(express.static('public'))
app.use('/api/gallery', artworkRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})