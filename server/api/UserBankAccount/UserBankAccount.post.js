import { apiFetch } from "~/server/utils/apifetch"

export default defineEventHandler(async (event) => {
    
    // const body =await readBody(event);

    try {
        const data = await apiFetch(event,`/api/Admin/UserBankAccount` , {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                "Authorization": `Bearer ${getCookie(event,'key')}`
            },
          body:await readBody(event)
        })
        
        return data;
    } catch (error) {
    
        
        return error
    }


})