export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    

   ;
    try {
      const response = await apiFetch(event,`/api/Account/userdetail`, {
        method: "POST",
        body:  JSON.stringify(body),
        headers: {
          'accept': '*/*',
          'Accept-Language': 'fa-IR',
          'Content-Type': 'application/json',
          
        },
      });
  
  
      return response;
    } catch (error) {
      ;
  
      return error;
    }
  
    
  });
  