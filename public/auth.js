/*
 * Name: Maisha Fyruz
 * Date: 11.27.2026
 * Course: CSC 372-01
 * Description: Manages frontend login status and logout functionality for Musée.
 */

let username = document.getElementById('username')
let loginLink = document.getElementById('login-link')
let logoutButton = document.getElementById('logout-button')

/**
 * Checks the authentication status and updates the navigation bar.
 */
async function checkAuthStatus() {
    try {
        let response = await fetch('/auth/status')

        if (!response.ok) {
            throw new Error('Unable to check login status.')
        }

        let data = await response.json()

        if (data.loggedIn) {
            username.textContent = data.username
            username.hidden = false
            loginLink.hidden = true
            logoutButton.hidden = false
        } else {
            username.hidden = true
            loginLink.hidden = false
            logoutButton.hidden = true
        }
    } catch (err) {
        console.error(err)
    }
}

/**
 * Logs the user out and returns to the homepage.
 */
async function logout() {
    try {
        let response = await fetch('/auth/logout', {
            method: 'POST'
        })

        if (!response.ok) {
            throw new Error('Unable to sign out.')
        }

        window.location.href = '/'
    } catch (err) {
        alert('Unable to sign out. Please try again.')
    }
}

logoutButton.addEventListener('click', logout)

let params = new URLSearchParams(window.location.search)

if (params.get('auth') === 'failed') {
    alert('Sign in was unsuccessful. Please try again.')
}

checkAuthStatus()
