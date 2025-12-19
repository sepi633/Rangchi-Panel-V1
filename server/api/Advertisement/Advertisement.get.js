import { apiFetch } from "~/server/utils/apifetch"

export default defineEventHandler(async (event) => {
    


    try {
        const data = await apiFetch(event,`/api/Admin/Advertisement/${getQuery(event).id}` , {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                "Authorization": `Bearer ${getCookie(event,'key')}`
                ,
                'Accept-Language': 'fa-IR'
            },
            // query:{
            //     parentId:getQuery(event).parentId
            // }
        })
        
        return data;
    } catch (error) {
    
        ;
        
        return error
    }


})