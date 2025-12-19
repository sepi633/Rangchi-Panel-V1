import { apiFetch } from "~/server/utils/apifetch"

export default defineEventHandler(async (event) => {
    
  
    const query = getQuery(event);
   
  
    try {
        const data = await apiFetch(event,`/api/Admin/CategoryPicture?id=${query.id}` , {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                "Authorization": `Bearer ${getCookie(event,'key')}`
                ,
                'Accept-Language': 'fa-IR'
            }
        })
        
        return data;
    } catch (error) {
   ;
        
        return error
    }


})