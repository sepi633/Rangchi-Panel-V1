import { apiFetch } from "~/server/utils/apifetch"

export default defineEventHandler(async (event) => {
    
    ;
    const query = getQuery(event);
    ;
    
    try {
        const data = await apiFetch(event,`/api/Admin/FormQuestion` , {
            method: 'put',
            headers: {
                'Accept': 'text/plain',
                "Authorization": `Bearer ${getCookie(event,'key')}`
                ,
                'Accept-Language': 'en-US'
            },
            body:await readBody(event)
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