import { ZObject, Bundle } from 'zapier-platform-core'
import { endpoint } from '../utils'

interface CompanyResponse {
  id: number
  name: string
  developed: number[]
  logoUrl?: string // added by me
}

export default {
  key: 'fetchCompanyData',
  noun: 'CompanyData',

  display: {
    label: 'Fetch Company Data From Game ID',
    description: 'Pulls data from the IGDB API for a game'
  },

  operation: {
    inputFields: [
      { key: 'igdbId', label: 'IGDB Game ID', type: 'string', required: true },
      { key: 'raw', type: 'boolean' }
    ],
    // bundle: { igdbId: string; raw?: boolean }
    perform: async (z: ZObject, bundle: Bundle) => {
      const rawResult = await z.request(endpoint('companies'), {
        method: 'POST',
        body: `fields id, name, developed, published; where developed=(${bundle.inputData.igdbId}) | published=(${bundle.inputData.igdbId});`
      })
      rawResult.throwForStatus()

      const companies = rawResult.json as CompanyResponse[]

      const res = {
        jsonStr: bundle.inputData.raw ? JSON.stringify(companies) : undefined,
        data: bundle.inputData.raw ? undefined : companies
      }

      return res
    }
  }
}
