/*
 * Name: Maisha Fyruz
 * Date: 11.27.2026
 * Course: CSC 372-01
 * Description: Configures GitHub authentication using Passport for the Musée application.
 */

import passport from 'passport'
import github from 'passport-github2'

import {
    findUserByGithubId,
    createUser,
    getUserById
} from './models/user-model.js'

let GitHubStrategy = github.Strategy

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    state: true
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await findUserByGithubId(profile.id)

        if (!user) {
            user = await createUser(profile.id, profile.username)
        }

        return done(null, user)
    } catch (err) {
        return done(err)
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        let user = await getUserById(id)
        done(null, user || false)
    } catch (err) {
        done(err)
    }
})

export default passport
