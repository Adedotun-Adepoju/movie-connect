import axios from "axios"
const airtableUrl = process.env.NEXT_PUBLIC_AIRTABLE_URL
const airtableBaseId = process.env.NEXT_PUBLIC_AIRTBALE_BASE_ID
const airtableToken = process.env.NEXT_PUBLIC_AIRTABLE_TOKEN
export const airtable = axios.create({
    baseURL: `${airtableUrl}/${airtableBaseId}`,
    headers: {
        Authorization: `Bearer ${airtableToken}`,
    }
})