export enum IMAGE_SIZES {
  Screenshot = 'screenshot_med',
  Cover = 'cover_big',
  Logo = 'logo_med'
}

export const endpoint = (path: string) => `https://api.igdb.com/v4/${path}`;
export const imageUrl = (imageId: string, size: IMAGE_SIZES) =>
  `https://images.igdb.com/igdb/image/upload/t_${size}/${imageId}.jpg`

export const STEAM_CATEGORY = 13
