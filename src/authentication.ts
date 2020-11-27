import {
  ZObject,
  Bundle,
  HttpRequestOptions,
  HttpResponse
} from 'zapier-platform-core'

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
    // if there are no fields, then it doesn't pick up the auth type
    fields: [
      {
        key: 'whatever',
        label: "What's your favorite color?",
        helpText:
          "This doesn't affect anything, but we need an auth field. Put whatever you'd like!"
      }
    ],
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
  ],
  afters: [
    (response: HttpResponse, z: ZObject, bundle: Bundle) => {
      if (response.status === 403) {
        throw new z.errors.RefreshAuthError()
      }
      return response
    }
  ]
}

export default Authentication
