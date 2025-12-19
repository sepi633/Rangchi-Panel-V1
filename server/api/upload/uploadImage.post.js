import { apiFetch } from "~/server/utils/apifetch"

export default defineEventHandler(async (event) => {

        const body =await readBody(event);
        // ;
    try {
        const data = await $fetch('https://file-goldnews.bhpsolution.com/api/PictureUpload' , {
            method: 'Post',
            headers: {
                'Accept': '*/*',
                redirect: 'follow'
                
            },
            body:body
            
        })
        
        return data;
    } catch (error) {
    
        ;
        
        return error
    }


})