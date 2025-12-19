<template>
  <div>
    <p>افرودن و ویرایش دسته بندی های برند</p>

 
              
   <TreeCategory class="mt-5" :pageData="allCategory"/>
  

    <div class="submit-box flex flex-wrap justify-end w-full">
     
     <button class="btn bg-[#333] m-3 ml-1 px-3 py-1 text-white " @click="()=>{  navigateTo(`/categoryBrand?id=${route.params.id}&name=${route.query.name}`)}">{{ $t('cancel') }}</button>

     <button class="btn bg-[#136b57] w-2/12 my-3 px-3 py-1 text-white "  @click="postRolePermissin" >{{ $t('confirm') }}</button>
   
 </div>
  </div>
</template>


<script setup>
const allCategory = ref()
const route = useRoute();
const selectedList=ref([]);
const allData = ref({
  "brandDto": {
    "id": route.params.id,
  
  },
  "categoryDto": []
})
onMounted(()=>{
    pageLoader();
})
const defaultData = ref({
   
    Q: null,
    PageIndex: 1,
    
})

const pageLoader = async () => {
    try {
        const headers = useRequestHeaders(['cookie'])

        const data = await $fetch('/api/category/catItem', {
            method: 'GET',
            headers,
            
            query:{
                id:10
            }
           
        })
        

        allCategory.value = data.data
        console.log("data");
        console.log(allCategory.value , '[[[[[[[[[[[[[[[[[[[[[ ]]]]]]]]]]]]]]]]]]]]]');

    } catch (error) {

        console.log(error);
        // navigateTo("/login")
    }

}



const checkPermission =async ()=>{
    const persmissionSelected = document.querySelectorAll(".persmission-input")
    console.log(persmissionSelected);
   
    for (let index = 0; index < persmissionSelected.length; index++) {
       
        if(persmissionSelected[index].checked == true ){
              selectedList.value.push(JSON.parse(persmissionSelected[index].value))
           

         
           
        }else{
            
            
            selectedList.value.filter((el)=>{el == persmissionSelected[index].value })
            
        }
    }
   console.log('--- selectedList.value ---');
            console.log(selectedList.value);

  


}

const postRolePermissin = async () =>{
    checkPermission()
//  console.log(roles.value);
 
   allData.value.categoryDto = selectedList.value
//    console.log(permissionData.value);
        try {
            const headers = useRequestHeaders(['cookie'])

            const data = await $fetch('/api/category/categoryBrand', {
                method: 'post',
                headers,
                body:allData.value
            
            })
            if(data.isSuccess ){
                  navigateTo("/categoryBrand?id="+route.params.id+'&name='+route.query.name)
            }
            
           console.log(data);

        } catch (error) {

            console.log(error);
            // navigateTo("/login")
        }
}

</script>