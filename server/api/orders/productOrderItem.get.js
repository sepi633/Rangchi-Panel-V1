import { apiFetch } from "~/server/utils/apifetch"

export default defineEventHandler(async (event) => {
    
    const query = getQuery(event);

        const token = getCookie(event,'token');
    try {
        const data = await apiFetch(event,`/api/Admin/ProductOrderItem?ProductOrderId=${query.id}` , {
            method: 'get',
            headers: {
                'Accept': 'text/plain',
                "Authorization": `Bearer ${getCookie(event,'key')}`,
                'Accept-Language': 'fa-IR'
            }
          
           
        })
        
        return data;
    } catch (error) {
   ;
        
        return error
    }

})