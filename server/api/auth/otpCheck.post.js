export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  


  ;

  try {
    const otpCheck = await apiFetch(event,`/api/Account/CheckOtp`, {
      method: "POST",
      body: body,
      headers: {
        Accept: "application/json",
        'Accept-Language': 'fa-IR'
      },
    }); 

    return otpCheck;
  } catch (error) {
    ;

    return error;
  }

});
