/*
 * Name: Maisha Fyruz
 * Date: 11.27.2026
 * Course: CSC 372-01
 * Description: Retrieves artwork information from the Cleveland Museum of Art API.
 */

/**
 * Searches for open-access artworks using the external museum API.
 */
export async function searchArtworks(req, res) {
    let search = req.query.q

    if (typeof search !== 'string' || !search.trim()) {
        return res.status(400).json({
            error: 'Please enter an artwork or artist name.'
        })
    }

    try {
        let url = 'https://openaccess-api.clevelandart.org/api/artworks/'
        url += '?q=' + encodeURIComponent(search.trim())
        url += '&cc0&has_image=1&limit=12'

        let response = await fetch(url)

        if (!response.ok) {
            return res.status(502).json({
                error: 'Unable to retrieve artworks.'
            })
        }

        let result = await response.json()
        let artworks = []

        for (let artwork of result.data) {
            if (artwork.images && artwork.images.web) {
                let artist = 'Unknown artist'

                if (artwork.creators && artwork.creators.length > 0) {
                    artist = artwork.creators[0].description
                }

                artworks.push({
                    id: artwork.id,
                    title: artwork.title,
                    artist: artist,
                    image_url: artwork.images.web.url
                })
            }
        }

        res.json(artworks)
    } catch (err) {
        res.status(502).json({
            error: 'Unable to connect to the museum API.'
        })
    }
}
