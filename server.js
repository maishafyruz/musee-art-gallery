/*
 * Name: Maisha Fyruz
 * Date: 11.27.2026
 * Course: CSC 372-01
 * Description: Express server for the Musée art gallery application.
 */

import express from 'express'
import { pool } from './database.js'
import artworkRouter from './routes/artwork-router.js'
import discoveryRouter from './routes/discovery-router.js'
import session from 'express-session'
import connectPgSimple from 'connect-pg-simple'
import passport from './authentication.js'
import authRouter from './routes/auth-router.js'

let app = express()
let port = process.env.PORT || 3000
let PgSession = connectPgSimple(session)

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1)
}

app.use(session({
    store: new PgSession({
        pool: pool,
        createTableIfMissing: true
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(express.static('public'))

app.use('/api/gallery', artworkRouter)
app.use('/api/discover', discoveryRouter)
app.use('/auth', authRouter)

/**
 * Handles unexpected server errors.
 */
app.use((err, req, res, next) => {
    console.error(err)

    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({
            error: 'Invalid JSON request.'
        })
    }

    res.status(500).json({
        error: 'An internal server error occurred.'
    })
})
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})