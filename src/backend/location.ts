import { z } from 'zod'
import { type AxiosStatic } from "axios"

const locationInfoSchema = z.object({
    lat: z.string(),
    lon: z.string(),
    display_name: z.string()
})

export type LocationInfo = z.infer<typeof locationInfoSchema>

export async function fetchLocationData(axios: AxiosStatic, apiUrl: string, locationName: string): Promise<LocationInfo> {
    const options = {
        method: "GET",
        url: apiUrl,
        params: {
            q: locationName
        }
    }

    const response = await axios.request(options)

    if (response.status === 200) {
        try {
            return locationInfoSchema.parse(response.data[0])
        } catch(err) {
            console.log(err)
            throw new Error(`unable to find location information for ${locationName}`)
        }
    }
    throw new Error(`failed to fetch location data`)
}