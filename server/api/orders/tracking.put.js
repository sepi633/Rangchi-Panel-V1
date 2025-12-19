import { apiFetch } from "~/server/utils/apifetch"

export default defineEventHandler(async (event) => {
    
    const body =await readBody(event);

   ;
    
    try {
        const data = await apiFetch(event,`/api/Admin/ProductOrderTrackingCode` , {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                "Authorization": `Bearer ${getCookie(event,'key')}`
                ,
                'Accept-Language': 'fa-IR'
            },
            body: body
        })
        
        return data;
    } catch (error) {
   ;
        
        return error
    }


})