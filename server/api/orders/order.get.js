import { apiFetch } from "~/server/utils/apifetch"

export default defineEventHandler(async (event) => {
    


    const query = getQuery(event);
    try {
        const data = await apiFetch(event,`/api/Admin/ProductOrder/${query.id}` , {
            method: 'GET',
            headers: {
                'Accept': 'text/plain',
                "Authorization": `Bearer ${getCookie(event,'key')}`
                ,
                'Accept-Language': 'fa-IR'
            },
           
        })
        
        return data;
    } catch (error) {
    
        ;
        ;
        
        return error
    }


})