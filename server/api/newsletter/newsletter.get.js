import { apiFetch } from "~/server/utils/apifetch"

export default defineEventHandler(async (event) => {
    

   
    try {
        // https://api-goldnews.bhpsolution.com/api/Admin/Post?PageIndex=6
        const data = await apiFetch(event,`/api/Admin/Newsletter?PageSize=9999&SortBy=1` , {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                "Authorization":`Bearer ${getCookie(event,'key')}`
            }
        })
        
        return data;
    } catch (error) {
    
        console.log("ERROR from nuxt api:");
        console.log(error);
        
        return error
    }


})