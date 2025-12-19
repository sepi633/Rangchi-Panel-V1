<template>
   <div class="flex bg-gray-100 min-h-screen" x-data="{panel:false, menu:true}">
       
          
 <SideBar></SideBar>
 <div class="flex-grow text-gray-800 lg:max-h-[100vh] lg:min-h-[100vh] lg:h-[100vh] lg:overflow-auto">
        <Header></Header>

        <slot />
         </div>
    </div>
   
</template>


