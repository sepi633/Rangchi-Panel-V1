import { apiFetch } from "~/server/utils/apifetch"

export default defineEventHandler(async (event) => {
    
    const body =await readBody(event);

    try {
        const data = await apiFetch(event,`/api/Common/Slug` , {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body:body
        })
        
        return data;
    } catch (error) {
    

        return error
    }


})