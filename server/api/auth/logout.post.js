import { apiFetch } from "~/server/utils/apifetch"

export default defineEventHandler(async (event) => {
    
    // const token = "Bearer " + getCookie(event,'token')
   
    try {
        const data = await apiFetch(event,`/api/Account/signout` , {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Authorization": `Bearer ${getCookie(event,'key')}`,
                'Accept-Language': 'fa-IR'
            }
        })
        
        return data;
    } catch (error) {
   ;
        
        return error
    }


})