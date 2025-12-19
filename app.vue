<template>
  <NuxtLayout>
     <LoadingLine v-if="loadingActive == true" />
     <NuxtPage />
	 <UNotifications />
   </NuxtLayout>
 </template>
 
 <script setup>
 const loadingActive=ref(true)
 const auth=useAuth()
const {public:{projectName}} = useRuntimeConfig()
       useHead({
         titleTemplate:`${projectName}`
       })
    
	   
const token = useCookie("key");
const reftoken = useCookie("rkey");
onMounted(async () => {
  try {

    if (reftoken.value && reftoken.value?.length>0 && token.value &&token.value?.length>0) {
      let res = await auth.getCurrentUser();
    }else{
      navigateTo('/login')
    }
  } catch (error) {
    if (error.statusCode == 401) {
      try {
       let res= await refreshtoken();
       if(res.isSuccess)
window.location.reload();
else{
  token.value=''
  reftoken.value=''
   navigateTo('/login')

}
      } catch (error) {
        navigateTo('/login')
      }
    }
  }
  loadingActive.value=false
});

async function refreshtoken() {
  try {
    const login = await $fetch("/api/auth/refreshtoken", {
      method: "POST",
      body: {
        token: token.value,
        refreshToken: reftoken.value,
		isAdmin:true
      },
    });
    return login
  } catch (error) {
    token.value=''
    reftoken.value=''
    throw error;
  }
}


 </script>
