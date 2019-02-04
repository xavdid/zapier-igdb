import { ZObject, Bundle } from 'zapier-platform-core'

const test = async (z: ZObject, bundle: Bundle) => {
  const response = await z.request({
    url: 'https://api-v3.igdb.com/games',
    headers: { 'user-key': bundle.authData.userKey }
  })

  // This method can return any truthy value to indicate the credentials are valid.
  // Raise an error to show
  if (response.status === 401) {
    throw new Error('The API key you supplied is incorrect')
  }
  return response
}

const Authentication = {
  type: 'custom',
  fields: [
    { key: 'userKey', label: 'API Key', required: true, type: 'string' }
  ],
  test
}

export default Authentication
