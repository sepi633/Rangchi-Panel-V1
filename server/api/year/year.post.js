import { apiFetch } from "~/server/utils/apifetch"

export default defineEventHandler(async (event) => {
    
    ;
    const query = getQuery(event);
    const body =await readBody(event)
    try {
        const data = await apiFetch(event,`/api/Common/Year` , {
            method: 'post',
            headers: {
                'Accept': 'text/plain',
                "Authorization": `Bearer ${getCookie(event,'key')}`
                ,
                'Accept-Language': 'fa-IR'
            },
            query:query,
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
        ;
        
        return error
    }

})