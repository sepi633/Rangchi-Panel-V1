<template>
    <aside class="flex flex-col min-w-[300px]">
       
        <a href="/"
            class="inline-flex items-center justify-center h-20 w-full bg-blue-600 hover:bg-blue-500 focus:bg-blue-500">


            <img class="w-[100px] h-[60px] object-contain" src="/img/logo.png" alt="">
            <span class="text-white text-2xl ml-2">Behpardazan Panel</span>
        </a>
        <div class=" flex flex-col justify-between text-gray-500 bg-gray-800 h-[calc(100vh-80px)] overflow-auto scrollbar-thin overflow-x-hidden">
            <nav class="flex flex-col mx-4 my-6 space-y-4">
                <div :to="'/' + item?.controller?.trim()" 
                v-for="item in menuLink?.data" 
                class="inline-flex flex-col parent items-center py-3 hover:text-gray-400 hover:bg-gray-700 
                    focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2"
                  >

                    <!-- <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M11 5.99747C10.7348 5.99747 10.4804 6.10282 10.2929 6.29036C10.1054 6.4779 10 6.73225 10 6.99747V8.99747H14V6.99747C14 6.73225 13.8946 6.4779 13.7071 6.29036C13.5196 6.10282 13.2652 5.99747 13 5.99747H11ZM15.83 5.99747C15.623 5.41239 15.2397 4.90589 14.7329 4.54771C14.226 4.18953 13.6206 3.99729 13 3.99747H11C10.3794 3.99729 9.77397 4.18953 9.26715 4.54771C8.76032 4.90589 8.37701 5.41239 8.17 5.99747H6C5.20435 5.99747 4.44129 6.31354 3.87868 6.87615C3.31607 7.43876 3 8.20182 3 8.99747V18.9975C3 19.7931 3.31607 20.5562 3.87868 21.1188C4.44129 21.6814 5.20435 21.9975 6 21.9975H18C18.7956 21.9975 19.5587 21.6814 20.1213 21.1188C20.6839 20.5562 21 19.7931 21 18.9975V8.99747C21 8.20182 20.6839 7.43876 20.1213 6.87615C19.5587 6.31354 18.7956 5.99747 18 5.99747H15.83ZM16 7.99747V9.99747C16 10.2627 15.8946 10.517 15.7071 10.7046C15.5196 10.8921 15.2652 10.9975 15 10.9975H9C8.73478 10.9975 8.48043 10.8921 8.29289 10.7046C8.10536 10.517 8 10.2627 8 9.99747V7.99747H6C5.73478 7.99747 5.48043 8.10282 5.29289 8.29036C5.10536 8.4779 5 8.73225 5 8.99747V18.9975C5 19.2627 5.10536 19.517 5.29289 19.7046C5.48043 19.8921 5.73478 19.9975 6 19.9975H18C18.2652 19.9975 18.5196 19.8921 18.7071 19.7046C18.8946 19.517 19 19.2627 19 18.9975V8.99747C19 8.73225 18.8946 8.4779 18.7071 8.29036C18.5196 8.10282 18.2652 7.99747 18 7.99747H16Z"
                            fill="black" />
                    </svg> -->

                    <div class="flex justify-between w-full items-center cursor-pointer" @click="acardeonHandler">
                        <span class="ml-2">
                            {{ item.name }}
                            ({{ item.label }})
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20">
                            <path fill="currentColor" fill-rule="evenodd"
                                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06"
                                clip-rule="evenodd" />
                        </svg>
                    </div>

                    <ul class="bg-gray-900 mt-3 w-full rounded-lg p-3 hidden">
                        <li v-for="element in item?.children" class="my-2" :key="element?.id">
                            <NuxtLink :to="'/' + element?.controller?.trim()" class="block p-2   hover:bg-gray-400 rounded-md hover:text-gray-900 transition-all">{{ element?.name }}</NuxtLink>
                        </li>
                    </ul>
                </div>

                  <div  
                class="inline-flex flex-col parent items-center py-3 hover:text-gray-400 hover:bg-gray-700 
                    focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2"
                  >

                    <div class="flex justify-between w-full items-center cursor-pointer" @click="acardeonHandler">
                        <span class="ml-2">
                           مدیریت اکانت
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20">
                            <path fill="currentColor" fill-rule="evenodd"
                                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06"
                                clip-rule="evenodd" />
                        </svg>
                    </div>

                    <ul class="bg-gray-900 mt-3 w-full rounded-lg p-3 hidden">
                        <li  class="my-2">
                            <NuxtLink to="/changepass" class="block p-2   hover:bg-gray-400 rounded-md hover:text-gray-900 transition-all">تغییر رمز عبور</NuxtLink>
                        </li>
                    </ul>
                </div>
            </nav>

            <div class="flex justify-end">
                <button @click="logout"
                    class="inline-flex p-3 hover:text-gray-400 justify-center border-gray-700 h-15 w-full border-t hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 px-2">
                    <svg fill="none" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6 3C5.20435 3 4.44129 3.31607 3.87868 3.87868C3.31607 4.44129 3 5.20435 3 6V18C3 18.7956 3.31607 19.5587 3.87868 20.1213C4.44129 20.6839 5.20435 21 6 21H17C17.2652 21 17.5196 20.8946 17.7071 20.7071C17.8946 20.5196 18 20.2652 18 20C18 19.7348 17.8946 19.4804 17.7071 19.2929C17.5196 19.1054 17.2652 19 17 19H6C5.73478 19 5.48043 18.8946 5.29289 18.7071C5.10536 18.5196 5 18.2652 5 18V6C5 5.73478 5.10536 5.48043 5.29289 5.29289C5.48043 5.10536 5.73478 5 6 5H17C17.2652 5 17.5196 4.89464 17.7071 4.70711C17.8946 4.51957 18 4.26522 18 4C18 3.73478 17.8946 3.48043 17.7071 3.29289C17.5196 3.10536 17.2652 3 17 3H6ZM15.707 7.293C15.6148 7.19749 15.5044 7.12131 15.3824 7.0689C15.2604 7.01649 15.1292 6.9889 14.9964 6.98775C14.8636 6.9866 14.7319 7.0119 14.609 7.06218C14.4861 7.11246 14.3745 7.18671 14.2806 7.2806C14.1867 7.3745 14.1125 7.48615 14.0622 7.60905C14.0119 7.73194 13.9866 7.86362 13.9877 7.9964C13.9889 8.12918 14.0165 8.2604 14.0689 8.3824C14.1213 8.50441 14.1975 8.61475 14.293 8.707L16.586 11H8C7.73478 11 7.48043 11.1054 7.29289 11.2929C7.10536 11.4804 7 11.7348 7 12C7 12.2652 7.10536 12.5196 7.29289 12.7071C7.48043 12.8946 7.73478 13 8 13H16.586L14.293 15.293C14.1108 15.4816 14.01 15.7342 14.0123 15.9964C14.0146 16.2586 14.1198 16.5094 14.3052 16.6948C14.4906 16.8802 14.7414 16.9854 15.0036 16.9877C15.2658 16.99 15.5184 16.8892 15.707 16.707L19.707 12.707C19.8945 12.5195 19.9998 12.2652 19.9998 12C19.9998 11.7348 19.8945 11.4805 19.707 11.293L15.707 7.293Z"
                            fill-rule="evenodd" clip-rule="evenodd" fill="black" style="fill: #6b7280;"></path>
                    </svg>

                    <span class="ml-2">{{ $t('logout') }}</span>
                </button>
            </div>
        </div>
    </aside>
</template>

<script setup>
const menuLink = ref()
const loadingActive = ref(true)
const config = useRuntimeConfig()

onMounted(async () => {
    await nextTick()
   await pageLoader();
})

const pageLoader = async () => {
loadingActive.value=true
    try {
        const data = await $fetch('/api/auth/permisions', {
            method: 'GET',
        })
        menuLink.value = data

    } catch (error) {
        
    }
    
    loadingActive.value = false
}

const logout = async () => {
    try {
        const data = await $fetch('/api/auth/logout', {
            method: 'POST'
        })
        navigateTo("/login")

        console.log(data);

    } catch (error) {

        console.log(error);
    }
}


const acardeonHandler = (event) => {
  let isOpen = true;
  const parent = event.target.closest(".parent ");
  
  const classList = parent.children[1].classList;
  for (let index = 0; index < classList.length; index++) {
    const element = classList[index];
    // console.log(element);
    if (element == "hidden") {
      isOpen = false;
    } else {
      isOpen = true;
    }
  }
  if (isOpen == false) {
    parent.children[1].classList.remove("hidden");
  } else {
    parent.children[1].classList.add("hidden");
  }
};


</script>

<style lang="scss" scoped>
svg {
    path {
        fill: #6b7280;
    }
}

.router-link-active.router-link-exact-active{
    @apply bg-gray-300 rounded-md text-gray-900 transition-all;
}

@media (max-width: 600px) {
    aside {
        position: fixed;
        right: 0;
        top: 0;
        height: 100%;
        z-index: 10;
        min-width: 0;
        width: 0;
        transition: 0.2s;
        overflow: hidden;
        white-space: nowrap;
    }
}</style>
