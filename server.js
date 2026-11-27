/*
 * Name: Maisha Fyruz
 * Date: 11.27.2026
 * Course: CSC 372-01
 * Description: Express server for the Musée
 * art gallery application.
 */

import express from 'express'
import './database.js'

let app = express()
let port = process.env.PORT || 3000

app.use(express.json())
app.use(express.static('public'))

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})