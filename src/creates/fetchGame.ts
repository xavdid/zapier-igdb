import { ZObject, Bundle } from "zapier-platform-core";
import { endpoint, imageUrl, IMAGE_SIZES, STEAM_CATEGORY } from "../utils";

interface GameRespone {
  id: number;
  name: string;
  cover?: {
    id: number;
    image_id: string;
  };
  websites?: Array<{
    id: number;
    category: number;
    trusted: boolean;
    url: string;
  }>;
  collection?: { id: number; name: string };
  platforms?: number[];
}

export default {
  key: "fetchGameData",
  noun: "GameData",

  display: {
    label: "Fetch Game Data From Slug",
    description: "Pulls data from the IGDB API for a game"
  },

  operation: {
    inputFields: [{ key: "slug", type: "string", required: true }],
    // bundle: <{ slug: string }>
    perform: async (z: ZObject, bundle: Bundle) => {
      const rawResult = await z.request(endpoint("games"), {
        method: "POST",
        body: `fields id, name, cover.image_id, websites.*, collection.name, platforms; where slug = "${bundle.inputData.slug}";`,
        headers: { "user-key": bundle.authData.userKey }
      });

      const result = (rawResult.json as GameRespone[])[0];

      const res = {
        id: result.id,
        images: {
          cover: result.cover
            ? imageUrl(result.cover.image_id, IMAGE_SIZES.Cover)
            : ""
        },
        steamId: "",
        name: result.name,
        series: result.collection,
        windowsOnly: !result.platforms?.includes(14) // magic number for the mac platform
      };

      const steamListing = (result.websites || []).filter(
        w => w.category === STEAM_CATEGORY
      )[0];
      if (steamListing) {
        const maybeSteamId = steamListing.url.match(/ered.com\/app\/(\d+)/);
        if (maybeSteamId) {
          res.steamId = maybeSteamId[1];
          // steam has better images and these are the big nice ones (not the small bad ones I've been grabbing)
          res.images.cover = `https://steamcdn-a.akamaihd.net/steam/apps/${maybeSteamId[1]}/header.jpg`;
        }
      }

      return res;
    }
  }
};
