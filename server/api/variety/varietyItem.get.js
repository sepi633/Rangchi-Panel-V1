
import { apiFetch } from "~/server/utils/apifetch"

export default defineEventHandler(async (event) => {
    


    try {
        const data = await apiFetch(event,`/api/Admin/variety/${getQuery(event).varietyId}` , {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                "Authorization": `Bearer ${getCookie(event,'key')}`
                ,
                'Accept-Language': 'fa-IR'
            },
            query:getQuery(event)
        })
        
        return data;
    } catch (error) {
    
        ;
        ;
        
        return error
    }



})