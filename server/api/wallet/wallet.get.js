import { apiFetch } from "~/server/utils/apifetch"

export default defineEventHandler(async (event) => {
    

   
    
    const query = getQuery(event);
    try {
        
        const data = await apiFetch(event,`/api/Admin/Wallet/amount/${getQuery(event)?.userId}` , {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                "Authorization" :`Bearer ${getCookie(event,'key')}`
            },

        })
        
        return data;
    } catch (error) {
    

        
        return error
    }

})