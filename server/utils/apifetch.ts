import { ofetch } from 'ofetch'
import { H3Event, getCookie, setCookie } from 'h3'

async function refreshToken(event: H3Event) {
  const { public: { baseUrl } } = useRuntimeConfig(event)

  const token = getCookie(event, 'key')
  const refreshToken = getCookie(event, 'rkey')

  if (!refreshToken) throw new Error('No refresh token')

  try {
    const data = await ofetch(`${baseUrl}/api/Account/refreshtoken`, {
      method: 'POST',
      body: {
        token,
        refreshToken,
        isAdmin: true
      }
    })


                let now = new Date();
    
    let rawExp = data.data.refreshTokenExp;
    let correctedExp = rawExp.replace(/(\.\d{3})\d+Z$/, "$1Z"); 
    
    let reftexp = new Date(correctedExp);
    
    const refdiffMs = reftexp.getTime() - now.getTime();
    
    setCookie(event, "key", data.data.token, {
        maxAge: refdiffMs / 1000, 
        path: "/",
    });
    setCookie(event, "rkey", data.data.refreshToken, {
        maxAge: refdiffMs / 1000,
        path: "/",
    });
    return data.data.token
  } catch (err) {
    setCookie(event, 'key', '', { maxAge: -1 })
    setCookie(event, 'rkey', '', { maxAge: -1 })
    throw err
  }
}

export async function apiFetch<T>(event: H3Event, url: string, options: any = {}) {
  const { public: { baseUrl } } = useRuntimeConfig(event)
  try {
    return await ofetch<T>(`${baseUrl}${url}`, {
      ...options,
    })
  } catch (error: any) {
    if (error?.response?.status === 401) {
      const newToken = await refreshToken(event)
        const headers = { ...(options.headers || {}), Authorization: `Bearer ${newToken}` }
        delete options.headers
       return  await ofetch<T>(`${baseUrl}${url}`, {
         headers:headers,
         ...options,
        })     
    }

    throw error
  }
}
