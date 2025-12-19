export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  
  try {
    const loginRequest = await apiFetch(event,`/api/Account/signin`, {
      method: "POST",
      body: body,
      headers: {
        Accept: "application/json",
        'Accept-Language': 'fa-IR'
      },
    });

    console.log(loginRequest)
          let now = new Date();

let rawExp = loginRequest.data.refreshTokenExp;
let correctedExp = rawExp.replace(/(\.\d{3})\d+Z$/, "$1Z"); 

let reftexp = new Date(correctedExp);

const refdiffMs = reftexp.getTime() - now.getTime();

setCookie(event, "key", loginRequest.data.token, {
    maxAge: refdiffMs / 1000, 
    path: "/",
});
setCookie(event, "rkey", loginRequest.data.refreshToken, {
    maxAge: refdiffMs / 1000,
    path: "/",
});

    return loginRequest;
  } catch (error) {
    ;

    return error;
  }


});
