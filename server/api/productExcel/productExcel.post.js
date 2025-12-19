import { apiFetch } from "~/server/utils/apifetch"

export default defineEventHandler(async (event) => {
    
    const body =await readBody(event);

    try {
        const data = await apiFetch(event,`/api/Admin/ProductsExel` , {
            method: 'post',
            headers: {
                'Accept': '*/*',
                "Authorization": `Bearer ${getCookie(event,'key')}`
                ,
                'Accept-Language': 'fa-ir'
            },
           body:body
        })
        
        return data;
    } catch (error) {
    
        ;
        ;
        
        return error
    }


})