import { apiFetch } from "~/server/utils/apifetch"

export default defineEventHandler(async (event) => {
    
    const body =await readBody(event);
   
    
    try {
        
        const data = await apiFetch(event,`/api/Admin/galleryItem` , {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                 "Authorization": `Bearer ${getCookie(event,'key')}`
            },
            body:body
        })
        
        return data;
    } catch (error) {
    

        
        return error
    }


    return 'body'
})