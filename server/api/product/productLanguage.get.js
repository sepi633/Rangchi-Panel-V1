import { apiFetch } from "~/server/utils/apifetch"

export default defineEventHandler(async (event) => {
    

   
    
    try {
        const data = await apiFetch(event,`/api/Admin/ProductLanguage` , {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                "Authorization": `Bearer ${getCookie(event,'key')}`
            },
            query:{
                productId:getQuery(event).catId
            }
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