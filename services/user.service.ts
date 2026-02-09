import { env } from "@/env"
import { cookies } from "next/headers"


const AUTH_URL = env.AUTH_URL;
const API_URL = env.API_URL;

export const userService = {
    getSession: async () => {
        try {
            const cookieStore = await cookies()

            // console.log(cookieStore)

            const res = await fetch(`${AUTH_URL}/get-session`,{
                headers:{
                    Cookie:cookieStore.toString(),
                },
                cache:'no-store'
            })

            const session = await res.json()

            if(session === null){
                return {
                    data:null, 
                    error:{message:'Session is missing.'}
                }
            }

            return {data:session, error:null}
        } catch (err) {
            console.error(err)
            return {data:null, error:{message:'Something Went Wrong'}}
        }
    },

    getMyProfile: async () => {
        try {
            const cookieStore = await cookies()

            const res = await fetch(`${API_URL}/user/me`, {
                headers:{
                    Cookies:cookieStore.toString(),
                },
                cache:"no-store",
                next:{tags:["me"]},
            })
            const session = await res.json();
            if(session === null){
                return {
                    data:null,
                    error:{message:'No session found', error:null}
                }
            }

            return {data: session, error:null}
        } catch (error) {
            console.log(error)
            return {
                data:null,
                error:{message:'Something went wrong', error}
            }
        }
    }
}