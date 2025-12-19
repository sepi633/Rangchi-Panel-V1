
<template>
     <div class="relative w-full">
    <USelectMenu v-model="selected" searchable :options="mini" option-attribute="nestedName" value-attribute="id" :multiple="isMulti" placeholder="دسته بندی .... " />
     <div
        v-if="selected"
        @click.stop="selected = null"
        class="absolute left-2 flex items-center top-1/2 -translate-y-1/2 z-20 cursor-pointer bg-white rounded-full p-1 shadow"
      >
        <UIcon
          name="i-heroicons-x-mark-16-solid"
          class="w-4 h-4 text-red-500"
        />
      </div>
    </div>
</template>


<script setup >
const props=defineProps(['parentId','isMulti'])
const selected =defineModel()
const categoris=ref([])
const my=ref([])
const getCategoryItem = async () => {
  try {
    const headers = useRequestHeaders(["cookie"]);

    const data = await $fetch("/api/category/catItem", {
      method: "GET",
      headers,
      query: {
        id: props.parentId,
      },
    });
    categoris.value = data?.data?.children;
    await setNestedName(props.parentId,JSON.parse(JSON.stringify(categoris.value)))
    my.value.map(item=>{return {name:item.nestedName,id:item.id}})
  } catch (error) {
    // navigateTo("/login")
  }
};
const setNestedName = async (parentId = null,_categories) => {

    try {

      await Promise.all(
        _categories.map(async (item) => {
          let parent=my.value.find(el=>el.id==item.parentId)
          if (parent) {            
                    item.nestedName=parent.nestedName+ ' - '+item.name
                }else{
                    item.nestedName=item.name
                }
                my.value.push(item)
                
                if(item.children){
                    await setNestedName(item.id,item.children); 
                }   
        })
    );      
  } catch (error) {
      
    }
  };

onMounted(()=>{
    getCategoryItem()
})

const mini=computed(()=>my.value?.map(item=>{return {id:item.id , nestedName:item.nestedName}}))

</script>