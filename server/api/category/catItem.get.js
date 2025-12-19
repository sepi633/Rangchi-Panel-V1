import { apiFetch } from "~/server/utils/apifetch"

export default defineEventHandler(async (event) => {
    

    try {
        const data = await apiFetch(event,`/api/Admin/Category/${getQuery(event).id}/${getQuery(event).mode||3}` , {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                     "Authorization": `Bearer ${getCookie(event,'key')}`
               
            }
        })
        
        return data;
    } catch (error) {
   ;
        
        return error
    }


})