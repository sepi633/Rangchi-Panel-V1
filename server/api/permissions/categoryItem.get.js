import { apiFetch } from "~/server/utils/apifetch"

export default defineEventHandler(async (event) => {
    

 
    try {
        const data = await apiFetch(event,`/api/Admin/Category/${getQuery(event).catId}/1` , {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                "Authorization": `Bearer ${getCookie(event,'key')}`
                ,
                'Accept-Language': 'fa-IR'
            }
        })
        
        return data;
    } catch (error) {
   ;
        
        return error
    }


})