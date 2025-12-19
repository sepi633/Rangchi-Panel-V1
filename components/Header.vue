<template>
   <header class="flex items-center h-20 px-6 sm:px-10 bg-white">
      <div class="call-menu cursor-pointer" @click="callMenu">
        <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
</svg>
      </div> 
      <div class="dark-cover" v-if="openMenu == true" @click="byeMenu"></div>
      
      <div class="flex flex-shrink-0 items-center mr-auto">
        <button class="relative mx-3 inline-flex items-center p-2 hover:bg-gray-100 focus:bg-gray-100 rounded-lg" 
          title="از بودنت خیلی خوشحالم.">
          <span class="sr-only">User Menu</span>  
           <span class="h-12 w-12 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
            <img src="/img/user.png" alt="user profile photo" class="h-full w-full object-cover">
          </span>
          <div class="hidden md:flex md:flex-col md:items-end md:leading-tight" >
            <span class="font-semibold">{{auth?.userData?.firstName ? auth?.userData?.firstName :"مدیر سایت" }}</span>
            <span class="text-sm text-gray-600">{{ auth?.userData?.roleName }} </span>
          </div>
      
        </button>
        
        <div class="border-r pr-3 ml-3 space-x-1 ">
          <!-- <button class="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full">
            <span class="sr-only">Notifications</span>
            <span class="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full"></span>
            <span class="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full animate-ping"></span>
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button> -->
          <button @click="logout" class="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full">
            
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
</svg>
          </button>
        </div>
      </div>
    </header>
</template>

<script setup>

const openMenu = ref(false);
const user = ref()
const cookie =  useCookie('key')
const rcookie =  useCookie('rkey')
const auth= useAuth();
onMounted(()=>{
})

const callMenu = ()=>{
  // );

  const sideBar = document.querySelector("aside");
  sideBar.classList.add("show")
  openMenu.value = true
}

const byeMenu = ()=>{
  // );

  const sideBar = document.querySelector("aside");
  sideBar.classList.remove("show")
  openMenu.value = false
}


const logout = async () => {
    try {
        const data = await $fetch('/api/auth/logout', {
            method: 'POST'
        })
        if(data.isSuccess){
            cookie.value = ''
            rcookie.value = ''
            navigateTo("/login")
        }
    } catch (error) {

        
    }
       
        

        

}

</script>

<style lang="scss">

.call-menu{
  display: none;
}

.show{
  min-width: 250px !important;
}

.dark-cover{
  background-color: #000000a6;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

@media(max-width: 660px){
  .call-menu{
    display: block;
  }
}
</style>