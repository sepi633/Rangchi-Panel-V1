<template>
    <section class="parent-box">
        <div class="title">
            <strong>{{ $t('Addcontent') }}</strong>
        </div>
        <SelectMap v-if="newPost?.categoryId==151" class="w-full h-[400px] mb-4" :location="[31,51]" 
                    @getLatLong="(loc)=>{newPost.value=JSON.stringify([loc[0].value,loc[1].value])}" />
        <div class="body-box flex flex-wrap p-2 items-start">
                <div class="input-box flex flex-col lg:w-1/6 w-full p-1">
                    <label for=""> {{ $t('title') }} :</label>
                    <input class="border w-full h-[40px] mt-2" type="text" name=""   v-model="newPost.title"
                        id="">
                </div>
                <div class="input-box flex flex-col  lg:w-1/6 w-full p-1">
                    <label for=""> {{ $t('label') }} :</label>
                    <input class="border w-full h-[40px] mt-2" type="text" name="" v-model="newPost.label" id="">
                </div>
                <div class="input-box flex flex-col lg:w-2/6 w-full p-1">
                    <label for="">{{ $t('label') }} 2:</label>
                    <input class="border w-full h-[40px] mt-2" type="text" name="" v-model="newPost.uiLabel" id="">
                </div>
                
                <!-- <div class="input-box flex flex-col lg:w-2/6 w-full p-1 ">
                    <label for="">{{ $t('Category') }}:</label>
                    <select class="form-select bg-white rounded w-full p-1 border h-[40px] mt-2" @change="(e)=>{ newPost.categoryId = e.target.value;  ;
                 }">
                 <option value="null">{{ $t('PleaseSelect') }}</option>
                    <option v-for="item in categoris?.children" :value="item?.id" :key="item?.id">{{ item?.name }} </option>
                </select>
                </div> -->
                <div class="input-box flex flex-col lg:w-full w-full p-1">
                    <label for="">{{ $t('summery') }}:</label>
                    <textarea class="border w-full h-100 mt-2" type="text" name="" v-model="newPost.value"
                        id=""></textarea>
                </div>
            </div>
        <div class="submit-box flex flex-wrap justify-end w-full">
            
            <button class="btn bg-[#333] m-3 ml-1 px-3 py-1 text-white " @click="cancel">{{ $t('cancle') }}</button>

            <button class="btn bg-[#136b57] w-2/12 my-3 px-3 py-1 text-white "
            v-if="isEdite==false" @click="submitInfo('insert')">{{ $t('confirm') }}</button>
            <button class="btn bg-[#2563eb] w-2/12 my-3 px-3 py-1 text-white "
            v-if="isEdite==true" @click="submitInfo('edite')">{{ $t('edite') }}</button>
        </div>
    </section>
</template>

<script setup>
const {public:{detailCategoryId}}=useRuntimeConfig()
const newPost = ref({
  "label": "",
  "uiLabel": "",
  "title": "",
  "value": "",
  "typeId": 4,  
  "categoryId": detailCategoryId
})
const parentType = ref([])
const parentTypeId = ref()
const isEdite = ref(false)
const toast=useToast()
// const categoris = ref()
const route = useRoute()
onMounted(() => {
    // getCategoryItem(40)

    if(route.params.id!='new'){
        pageLoader();
        isEdite.value = true

    }
    

})

const pageLoader = async () => {
    
    try {
        const headers = useRequestHeaders(['cookie'])

        const data = await $fetch('/api/details/detailsItem', {
            method: 'GET',
            headers,
            query: {
                postId: route.params.id
            }
        })


        newPost.value = data?.data
        // newCategory.value.parentId = pageData?.value.parentId
        ;
        ;

    } catch (error) {

        ;
        // navigateTo("/login")
    }

}

// const getCategoryItem = async (id) => {

// try {
//     const headers = useRequestHeaders(['cookie'])

//     const data = await $fetch('/api/category/categoryItem', {
//         method: 'GET',
//         headers,
//         query: {
//             catId: id
//         }
//     })


//     ;
//     ;
//     categoris.value = data.data
// } catch (error) {

//     ;
//     // navigateTo("/login")
// }

// }
const loading = ref(false);
const submitInfo = async (type) => {
    if(loading.value){
        return
    }
    loading.value= true;
    if(type=='insert'){
        try {
        const headers = useRequestHeaders(['cookie'])
        const res = await $fetch(('/api/details/details'), {
            method: "POST",
            body: newPost.value,
            headers: {
                'Accept': 'application/json'
            }
        })
        if(res.isSuccess){
            toast.add({description:'عملیات با موفقیت انجام شد .',color:'green'})
            newPost.value={
            "label": "",
            "uiLabel": "",
            "title": "",
            "value": "",
            "typeId": 4,  
            "categoryId": detailCategoryId
            }
         navigateTo("/detail")
        }
        else{
                 res.messages.forEach((element) => {
        toast.add({description:element.item1,color:'red'});
      });
        }
        // pageLoader()



    } catch (error) {
        ;
    }

    }
    if(type=='edite'){
        try {
        const headers = useRequestHeaders(['cookie'])
        const insert = await $fetch(('/api/details/details'), {
            method: "PUT",
            body: newPost.value,
            headers: {
                'Accept': 'application/json'
            }
        })

        navigateTo("/detail")
        ;


    } catch (error) {
        ;
    }
    finally{
        addStatus.value=false;
        
    }
    }
    loading.value= false;
    
}

const cancel = () =>{
    navigateTo("/detail")
}


</script>

<style lang="scss" scoped>
.acardeon {
    border: 1px solid #3333;
    background-color: #fff;
    padding: 15px 20px;
    margin-top: 10px;
    border-radius: 5px;
    transition: 0.2s;

    svg {
        width: 12px;
    }


    &:hover {
        box-shadow: 0 2px 0px #1f2937;
    }

    .title-box {
        cursor: pointer;
    }

    .body-box {
        min-height: 100px;
        border-top: 1px solid #3333;
        margin-top: 20px;
    }
}
</style>