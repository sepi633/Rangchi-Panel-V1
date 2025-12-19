

import { apiFetch } from "~/server/utils/apifetch"

export default defineEventHandler(async (event) => {
    
    const token = `Bearer ${getCookie(event,'key')}`;   
   
    try {
        const data = await apiFetch(event,`/api/Admin/PostComment/${getQuery(event)?.id}` , {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `${token}`
            },
            
        })
        
        return data;
    } catch (error) {        
        return error
    }


})