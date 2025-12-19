import { apiFetch } from "~/server/utils/apifetch"

export default defineEventHandler(async (event) => {
    
    // const body =await readBody(event);
    const body =await readBody(event);
    try {
        const data = await apiFetch(event,`/api/Admin/StoreUser` , {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                "Authorization": `Bearer ${getCookie(event,'key')}`
                ,
                'Accept-Language': 'fa-IR'
            },
            body:body
        })
        
        return data;
    } catch (error) {
    
        ;
        ;
        
        return error
    }


})