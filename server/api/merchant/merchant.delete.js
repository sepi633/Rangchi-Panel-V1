import { apiFetch } from "~/server/utils/apifetch"

export default defineEventHandler(async (event) => {
    
    // const body =await readBody(event);

    try {
        const data = await apiFetch(event,`/api/Admin/Merchant` , {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                "Authorization": `Bearer ${getCookie(event,'key')}`
            },
            query:{
                id: getQuery(event).id
            }
        })
        
        return data;
    } catch (error) {
    
        
        return error
    }


})