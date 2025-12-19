export default defineEventHandler(async(event) => {
    const { public: { baseUrl, testUrl } } = useRuntimeConfig()
    const token =getCookie(event,'key')

    const body = await readBody(event);
   
    try {
        const login = await apiFetch(event,`/api/Account/refreshtoken`, {
            method: "POST",
            body: body,
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json'
            },
        });
        if (login.isSuccess) {

            let now = new Date();

let rawExp = login.data.refreshTokenExp;
let correctedExp = rawExp.replace(/(\.\d{3})\d+Z$/, "$1Z"); 

let reftexp = new Date(correctedExp);

const refdiffMs = reftexp.getTime() - now.getTime();

setCookie(event, "key", login.data.token, {
    maxAge: refdiffMs / 1000, 
    path: "/",
});
setCookie(event, "rkey", login.data.refreshToken, {
    maxAge: refdiffMs / 1000,
    path: "/",
});

        }


        return login;
    } catch (error) {
        return error;
    }


});