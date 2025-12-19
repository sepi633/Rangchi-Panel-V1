import { apiFetch } from "~/server/utils/apifetch"

export default defineEventHandler(async (event) => {
    

   
    try {
        const data = await apiFetch(event,`/api/Common/Picture/${getQuery(event).postId}` , {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
                ,
                'Accept-Language': 'fa-IR'
            },
            // query:getQuery(event)
        })
        
        return data;
    } catch (error) {
    
        ;
        ;
        
        return error
    }


})