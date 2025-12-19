export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    
    try {
      const response = await apiFetch(event,`/api/EndUser/ChangePassword`, {
        method: "POST",
        body: body,
        headers: {
          'accept': '*/*',
          'Accept-Language': 'en-US',
          'Content-Type': 'application/json',
          "Authorization" :`Bearer ${getCookie(event,'key')}`
        },
      });
  
  
      return response;
    } catch (error) {
      return error;
    }
  
    
  });
  