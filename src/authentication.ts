import { ZObject, Bundle, HttpRequestOptions } from 'zapier-platform-core'

const perform = async (z: ZObject, bundle: Bundle) => {
  const response = await z.request({
    url: 'https://id.twitch.tv/oauth2/token',
    method: 'POST',
    params: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'client_credentials'
    }
  })
  response.throwForStatus()
  return response.json
}

const Authentication = {
  config: {
    type: 'session',
    // doesn't actually need any fields
    // fields: [],
    test: (z: ZObject) =>
      z.request({ url: 'https://id.twitch.tv/oauth2/validate' }),
    sessionConfig: {
      perform
    }
  },

  befores: [
    (request: HttpRequestOptions, z: ZObject, bundle: Bundle) => {
      request.headers = {
        ...(request.headers || {}),
        'client-id': process.env.CLIENT_ID as string,
        Authorization: `Bearer ${bundle.authData.access_token}`
      }

      return request
    }
  ]
}

export default Authentication
