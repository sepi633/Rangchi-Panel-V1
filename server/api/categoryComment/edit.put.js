import { apiFetch } from "~/server/utils/apifetch"

export default defineEventHandler(async (event) => {
    
    const token = `Bearer ${getCookie(event,'key')}`;
    const body = await readBody(event);
    try {
        const data = await apiFetch(event,`/api/Admin/CategoryComment` , {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': `${token}`
            },
            body:  JSON.stringify(body),
            
        })
        
        return data;
    } catch (error) {
        
        console.log("ERROR from nuxt api:"+error);
        
        return error
    }



})