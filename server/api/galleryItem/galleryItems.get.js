import { apiFetch } from "~/server/utils/apifetch"

export default defineEventHandler(async (event) => {
    

   
    
    try {
        
        const data = await apiFetch(event,`/api/Admin/galleryItem` , {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                 "Authorization": `Bearer ${getCookie(event,'key')}`
            },
            query:getQuery(event)
        })
        
        return data;
    } catch (error) {
    

        
        return error
    }


    return 'body'
})