import axios from "axios";
export const cx = (...classNames: any) => classNames.filter(Boolean).join(" ");
const ApiKey = process.env.NEXT_PUBLIC_BEARER_TOKEN

export const Api = axios.create({
    baseURL: `https://movie-connect.up.railway.app/`,
})

export type userSchema = {
   first_name: '',
   last_name: '',
   email: '',
   id: ''
}

