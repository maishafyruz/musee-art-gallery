
/*
 * Name: Maisha Fyruz
 * Date: 11.27.2026
 * Course: CSC 372-01
 * Description: Displays saved artworks and allows users to update and remove their gallery entries.
 */

let galleryResults = document.getElementById('gallery-results')
let galleryMessage = document.getElementById('gallery-message')

/**
 * Retrieves the user's saved artworks.
 */
async function loadGallery() {
    galleryResults.innerHTML = ''
    galleryMessage.textContent = 'Loading your private collection...'

    try {
        let response = await fetch('/api/gallery')
        let artworks = await response.json()

        if (!response.ok) {
            throw new Error(artworks.error)
        }

        if (artworks.length === 0) {
            galleryMessage.textContent =
                'Your gallery is empty. Discover artworks to begin your collection.'
            return
        }

        galleryMessage.textContent =
            artworks.length + ' artworks in your gallery.'

        displayGallery(artworks)
    } catch (err) {
        galleryMessage.textContent = err.message
    }
}

/**
 * Creates and displays the user's saved artwork cards.
 */
function displayGallery(artworks) {
    for (let artwork of artworks) {
        let card = document.createElement('article')
        card.classList.add('artwork-card')

        let image = document.createElement('img')
        image.src = artwork.image_url
        image.alt = artwork.title

        let title = document.createElement('h3')
        title.textContent = artwork.title

        let artist = document.createElement('p')
        artist.textContent = artwork.artist

        let label = document.createElement('label')
        label.textContent = 'Personal note'
        label.htmlFor = 'note-' + artwork.id

        let note = document.createElement('textarea')
        note.id = 'note-' + artwork.id
        note.value = artwork.note || ''
        note.placeholder = 'Write a personal note...'

        let saveButton = document.createElement('button')
        saveButton.textContent = 'Save Note'
        saveButton.classList.add('save-note-button')
        saveButton.type = 'button'

        let removeButton = document.createElement('button')
        removeButton.textContent = 'Remove'
        removeButton.classList.add('remove-button')
        removeButton.type = 'button'

        let message = document.createElement('p')
        message.setAttribute('role', 'status')

        saveButton.addEventListener('click', () => {
            updateNote(artwork.id, note.value, message)
        })

        removeButton.addEventListener('click', () => {
            removeArtwork(artwork.id, message)
        })

        card.append(
            image, title, artist, label, note,
            saveButton, removeButton, message
        )

        galleryResults.appendChild(card)
    }
}

/**
 * Updates the personal note of a saved artwork.
 */
async function updateNote(id, note, message) {
    try {
        let response = await fetch('/api/gallery/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                note: note
            })
        })

        let data = await response.json()

        if (!response.ok) {
            throw new Error(data.error)
        }

        message.textContent = 'Personal note updated successfully.'
    } catch (err) {
        message.textContent = err.message
    }
}

/**
 * Removes an artwork from the user's gallery.
 */
async function removeArtwork(id, message) {
    if (!confirm('Remove this artwork from your gallery?')) {
        return
    }

    try {
        let response = await fetch('/api/gallery/' + id, {
            method: 'DELETE'
        })

        let data = await response.json()

        if (!response.ok) {
            throw new Error(data.error)
        }

        loadGallery()
    } catch (err) {
        message.textContent = err.message
    }
}

loadGallery()
