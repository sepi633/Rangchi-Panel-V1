export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  


  ;

  try {
    const getCod = await apiFetch(event,`/api/Account/otp`, {
      method: "POST",
      body: body,
      headers: {
        Accept: "application/json",
        'Accept-Language': 'fa-IR'
      },
    });

    return getCod;
  } catch (error) {
    ;

    return error;
  }


});
