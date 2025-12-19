import { apiFetch } from "~/server/utils/apifetch"

export default defineEventHandler(async (event) => {
    


    try {
        const data = await apiFetch(event,`/api/Admin/ProductsExel` , {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                "Authorization": `Bearer ${getCookie(event,'key')}`
                ,
                'Accept-Language': 'fa-ir'
            },
            query:getQuery(event)
        })
        
        return data;
    } catch (error) {
    
        ;
        ;
        
        return error
    }


})