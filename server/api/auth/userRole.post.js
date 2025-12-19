export default defineEventHandler(async (event) => {
    
    

    try {
      const response = await apiFetch(event,`/api/Account/userRole`, {
        method: "post",
        query:  getQuery(event),
        headers: {
          'accept': '*/*',
          'Accept-Language': 'en-US',
          'Content-Type': 'application/json',
          
        },
        body:await readBody(event)
      });

  
      return response;
    } catch (error) {
      console.log(error);
      
      return error;
    }
  
    
  });
  