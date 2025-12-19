import { apiFetch } from "~/server/utils/apifetch"

export default defineEventHandler(async (event) => {
    


    try {
        const data = await apiFetch(event,`/api/Admin/ContactUs` , {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                "Authorization": `Bearer ${getCookie(event,'key')}`
                ,
                'Accept-Language': 'fa-IR'
            },
            body:await readBody(event)
        })
        
        return data;
    } catch (error) {
    
        ;
        ;
        
        return error
    }


})