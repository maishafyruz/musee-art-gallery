/*
 * Name: Maisha Fyruz
 * Date: 11.27.2026
 * Course: CSC 372-01
 * Description: Searches and displays museum artworks and saves selected artworks to the user's gallery.
 */

let searchForm = document.getElementById('search-form')
let searchInput = document.getElementById('search-input')
let searchMessage = document.getElementById('search-message')
let artworkResults = document.getElementById('artwork-results')

/**
 * Retrieves artworks matching the search term.
 */
async function searchArtworks(search) {
    artworkResults.innerHTML = ''
    searchMessage.textContent = 'Discovering masterpieces...'

    try {
        let response = await fetch(
            '/api/discover?q=' + encodeURIComponent(search)
        )

        let artworks = await response.json()

        if (!response.ok) {
            throw new Error(artworks.error)
        }

        if (artworks.length === 0) {
            searchMessage.textContent = 'No artworks found.'
            return
        }

        searchMessage.textContent = artworks.length + ' artworks discovered.'

        displayArtworks(artworks)
    } catch (err) {
        searchMessage.textContent = err.message
    }
}

/**
 * Creates and displays a card for each artwork.
 */
function displayArtworks(artworks) {
    for (let artwork of artworks) {
        let card = document.createElement('article')
        card.classList.add('artwork-card')

        let image = document.createElement('img')
        image.src = artwork.image_url
        image.alt = artwork.title
        image.loading = 'lazy'

        let title = document.createElement('h3')
        title.textContent = artwork.title

        let artist = document.createElement('p')
        artist.textContent = artwork.artist

        let button = document.createElement('button')
        button.textContent = '+ Add to Gallery'
        button.type = 'button'

        let message = document.createElement('p')
        message.setAttribute('role', 'status')
        message.hidden = true

        button.addEventListener('click', () => {
            saveArtwork(artwork, button, message)
        })

        card.append(image, title, artist, button, message)
        artworkResults.appendChild(card)
    }
}

/**
 * Saves a selected artwork to the user's gallery.
 */
async function saveArtwork(artwork, button, message) {
    button.disabled = true
    message.hidden = false
    message.textContent = 'Saving artwork...'

    try {
        let response = await fetch('/api/gallery', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                artworkId: artwork.id,
                title: artwork.title,
                artist: artwork.artist,
                imageUrl: artwork.image_url
            })
        })

        let data = await response.json()

        if (!response.ok) {
            throw new Error(data.error)
        }

        button.textContent = 'Added to Gallery'
        message.textContent = 'Artwork saved successfully.'
    } catch (err) {
        message.textContent = err.message
        button.disabled = false
    }
}

/**
 * Handles the artwork search form submission.
 */
function handleSearch(event) {
    event.preventDefault()

    let search = searchInput.value.trim()

    if (!search) {
        searchMessage.textContent = 'Please enter an artwork or artist name.'
        return
    }

    searchArtworks(search)
}

searchForm.addEventListener('submit', handleSearch)

searchInput.value = 'Monet'
searchArtworks('Monet')
