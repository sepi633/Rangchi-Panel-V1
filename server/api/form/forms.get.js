import { apiFetch } from "~/server/utils/apifetch"

export default defineEventHandler(async (event) => {
    
    ;
    const query = getQuery(event);
    ;
    
    try {
        const data = await apiFetch(event,`/api/Admin/Form` , {
            method: 'GET',
            headers: {
                'Accept': 'text/plain',
                "Authorization": `Bearer ${getCookie(event,'key')}`
                ,
                'Accept-Language': 'en-US'
            },
            query:getQuery(event)
        })
        
        return data;
    } catch (error) {       
        return error
    }

})