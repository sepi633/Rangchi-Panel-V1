import { apiFetch } from "~/server/utils/apifetch"

export default defineEventHandler(async (event) => {
    
    const body =await readBody(event);

   
    console.log(body)
    try {
        const data = await apiFetch(event,`/api/Admin/ProductLanguage` , {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Authorization": `Bearer ${getCookie(event,'key')}`
            },
            body:body
        })
        
        return data;
    } catch (error) {
        // if(error.statusCode == 401){
        //     setCookie(event, 'token', '',{
        //         httpOnly: true,
        //         secure: true,
        //         maxAge: new Date(0),
        //         path: '/'
        //     })
        // }
        console.log("ERROR from nuxt api:"+error);
        
        return error
    }


    return 'body'
})