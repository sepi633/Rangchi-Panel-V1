<template>
    <ul class="">
       <li  v-for="item in props?.data" :key="item?.id">
        <div class="flex">
            <input :id="item?.id"  class="mx-1"
             v-model="model" type="radio" name="category" :value="item.id">
                 <label class="flex items-center cursor-pointer p-2 hover:bg-blue-100" >
            {{ item?.name }}
            <sub>({{ item?.label }})</sub>
        
            <svg v-if="item.children.length > 0" @click="item.showChildren=!item.showChildren" :class="['x-2 cursor-pointer',item.showChildren?'rotate-180':'']"  width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path fill-rule="evenodd" clip-rule="evenodd" d="M4.29303 8.29534C4.48056 8.10787 4.73487 8.00255 5.00003 8.00255C5.26519 8.00255 5.5195 8.10787 5.70703 8.29534L12 14.5883L18.293 8.29534C18.3853 8.19983 18.4956 8.12365 18.6176 8.07124C18.7396 8.01883 18.8709 7.99124 19.0036 7.99009C19.1364 7.98894 19.2681 8.01424 19.391 8.06452C19.5139 8.1148 19.6255 8.18905 19.7194 8.28294C19.8133 8.37684 19.8876 8.48849 19.9379 8.61139C19.9881 8.73428 20.0134 8.86596 20.0123 8.99874C20.0111 9.13152 19.9835 9.26274 19.9311 9.38474C19.8787 9.50675 19.8025 9.61709 19.707 9.70934L12.707 16.7093C12.5195 16.8968 12.2652 17.0021 12 17.0021C11.7349 17.0021 11.4806 16.8968 11.293 16.7093L4.29303 9.70934C4.10556 9.52181 4.00024 9.2675 4.00024 9.00234C4.00024 8.73718 4.10556 8.48287 4.29303 8.29534Z" fill="black"/>
            </svg>
        </label>
        </div>
        <TreeMiniTree v-if="item.children.length > 0"  v-model="model" :class="['p-1 px-4',item.showChildren?'':'hidden']" :data="item.children" />
    </li> 
    </ul>
</template>

<script setup>
const model=defineModel()
const store = useBlog();
const props = defineProps(['data']);
const isOpen = ref(false);


onMounted(()=>{
    ;

   
 
})



const childrenHandler = (e)=>{
    const parent = e.target.closest("li");
    const target = parent.lastElementChild
    let hasClass = false
    // if(target.classList)
    target.classList.forEach(element => {
        if(element=="hidden"){
            hasClass=true;    
        }
        
    });

    if ( hasClass == true ){
        e.target.classList.add("rotate-180")
        target.classList.remove("hidden")
    }else{
        e.target.classList.remove("rotate-180")

        target.classList.add("hidden")

    }

    
}

</script>