import { apiFetch } from "~/server/utils/apifetch"

export default defineEventHandler(async (event) => {
    

   
    console.log(`${baseUrl}/api/Admin/Detail/${getQuery(event).postId}` )
    try {
        const data = await apiFetch(event,`/api/Admin/galleryItem/${getQuery(event).postId}` , {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                 "Authorization": `Bearer ${getCookie(event,'key')}`
            },
            // query:{
            //     parentId:getQuery(event).parentId
            // }
        })
        
        return data;
    } catch (error) {
    
        console.log("ERROR from nuxt api:"+error);
        
        return error
    }


    return 'body'
})