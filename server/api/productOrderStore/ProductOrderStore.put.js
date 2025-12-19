import { apiFetch } from "~/server/utils/apifetch"

export default defineEventHandler(async (event) => {
    
    const body = await readBody(event);
    const query = getQuery(event);
        const token = `Bearer ${getCookie(event,'key')}`;
    try {
        const data = await apiFetch(event,`/api/Admin/ProductOrderStore` , {
            method: 'put',
            headers: {
                'Accept': 'text/plain',
                'Authorization': `${token}`,
                 'StoreId':`${query.storeId}`
            },
            body:body
        })
        
        return data;
    } catch (error) {
   ;
        
        return error
    }

})