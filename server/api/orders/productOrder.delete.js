import { apiFetch } from "~/server/utils/apifetch"

export default defineEventHandler(async (event) => {
    
    const query = getQuery(event);

        const token = getCookie(event,'token');
    try {
        const data = await apiFetch(event,`/api/Admin/ProductOrderItem` , {
            method: 'DELETE',
            headers: {
                'Accept': 'text/plain',
                'Authorization': `Bearer ${token}`
                ,
                'Accept-Language': 'fa-IR'
            },
            query:{
                id:query.id
            }
          
           
        })
        
        return data;
    } catch (error) {
   ;
        
        return error
    }

})