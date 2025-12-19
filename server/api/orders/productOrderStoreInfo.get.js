import { apiFetch } from "~/server/utils/apifetch"

export default defineEventHandler(async (event) => {
    
    try {
        const data = await apiFetch(event,`/api/Admin/ProductOrderStore` , {
            method: 'GET',
            headers: {
                'Accept': 'text/plain',
                'Authorization':  `Bearer ${getCookie(event,'key')}`
            },        
            query:getQuery(event)   
        })
        
        return data;
    } catch (error) {
        return error
    }

})