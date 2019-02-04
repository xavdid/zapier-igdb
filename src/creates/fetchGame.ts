import { ZObject, Bundle } from 'zapier-platform-core'

const STEAM_CATEGORY = 13

interface GameRespone {
  id: number
  name: string
  cover: {
    id: number
    image_id: string
  }
  websites: Array<{
    id: number
    category: number
    trusted: boolean
    url: string
  }>
}

enum IMAGE_SIZES {
  Screenshot = 'screenshot_med',
  Cover = 'cover_big',
  Logo = 'logo_med'
}

const endpoint = (path: string) => `https://api-v3.igdb.com/${path}`
const imageUrl = (imageId: string, size: IMAGE_SIZES) =>
  `https://images.igdb.com/igdb/image/upload/t_${size}/${imageId}.jpg`

export default {
  key: 'fetchGameData',
  noun: 'GameData',

  display: {
    label: 'Fetch Game Data From Slug',
    description: 'Pulls data from the IGDB API for a game'
  },

  operation: {
    inputFields: [{ key: 'slug', type: 'string', required: true }],
    perform: async (z: ZObject, bundle: Bundle<{ slug: string }>) => {
      const rawResult = await z.request(endpoint('games'), {
        method: 'POST',
        body: `fields id, name, cover.image_id, websites.*; where slug = "${
          bundle.inputData.slug
        }";`,
        headers: { 'user-key': bundle.authData.userKey }
      })

      const result = (rawResult.json as GameRespone[])[0]

      const res = {
        id: result.id,
        images: {
          cover: imageUrl(result.cover.image_id, IMAGE_SIZES.Cover),
          screenshot: imageUrl(result.cover.image_id, IMAGE_SIZES.Screenshot)
        },
        steamId: '',
        name: result.name
      }

      const steamListing = result.websites.filter(
        w => w.category === STEAM_CATEGORY
      )[0]
      if (steamListing) {
        const maybeSteamId = steamListing.url.match(/ered.com\/app\/(\d+)/)
        if (maybeSteamId) {
          res.steamId = maybeSteamId[1]
        }
      }

      return res
    }
  }
}
