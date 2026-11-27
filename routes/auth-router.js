
/*
 * Name: Maisha Fyruz
 * Date: 11.27.2026
 * Course: CSC 372-01
 * Description: Login, logout and authentication routes for the Musée application.
 */

import { Router } from 'express'
import passport from '../authentication.js'

let router = Router()

router.get('/github', passport.authenticate('github'))

router.get('/github/callback', passport.authenticate('github', {
    successRedirect: '/auth/status',
    failureRedirect: '/auth/status'
}))

/**
 * Returns the current authentication status.
 */
function getAuthStatus(req, res) {
    if (req.isAuthenticated()) {
        return res.json({
            loggedIn: true,
            username: req.user.username
        })
    }

    res.json({
        loggedIn: false
    })
}

/**
 * Logs the current user out of the application.
 */
function logout(req, res, next) {
    req.logout((err) => {
        if (err) {
            return next(err)
        }

        res.json({
            message: 'Logged out successfully.'
        })
    })
}

router.get('/status', getAuthStatus)
router.post('/logout', logout)

export default router
