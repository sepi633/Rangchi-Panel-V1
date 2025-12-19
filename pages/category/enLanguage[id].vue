<template>
    <div class="flex flex-wrap items-start">
        <div class="inputgroup w-full lg:w-1/2">
            <label for="">عنوان</label>
            <input type="text" v-model="categoryDataLang.seoFieldLangDto.name">
        </div>
        <div class="inputgroup w-full lg:w-1/2">
            <label for="">عنوان سئو </label>
            <input type="text" v-model="categoryDataLang.seoFieldLangDto.seoTitle">
        </div>

        <div class="inputgroup w-full lg:w-1/2">
            <label for="">هدینگ اول </label>
            <input type="text" v-model="categoryDataLang.seoFieldLangDto.seoH1">
        </div>
        <div class="inputgroup w-full lg:w-1/2">
            <label for="">عنوان تصویر</label>
            <input type="text" v-model="categoryDataLang.seoFieldLangDto.seoPictureAlt">
        </div>
        <div class="inputgroup w-full">
            <label for=""> خلاصه</label>
            <textarea  v-model="categoryDataLang.seoFieldLangDto.summary" name="" id="" cols="30" rows="5"></textarea>
        </div>
        <div class="inputgroup w-full">
            <label for=""> توضیحات</label>
            <RichEditor v-model="categoryDataLang.seoFieldLangDto.description" />
        </div>

        <div class="inputgroup w-full ">
            <label for=""> توضیحات خلاصه سئو(seoMinDescription)</label>
            <textarea  v-model="categoryDataLang.seoFieldLangDto.seoMinDescription" name="" id="" cols="30" rows="5"></textarea>
            
        </div>

        <div class="inputgroup w-full">
            <label for="">توضیحات  سئو </label>
            <rich-editor v-model="categoryDataLang.seoFieldLangDto.seoDescription" />
            
        </div>

        <div class="btn-box flex justify-end p-2">
            <button class="bg-green-700 hover:bg-green-800 p-2 px-4 w-[100px] text-white " @click="submitInfo">ثبت</button>
        </div>
    </div>
</template>

<script setup>
const route = useRoute()
const categoryData = ref({})
const toast=useToast()

const categoryDataLang = ref({
    "categoryId": route?.params?.id,
    "seoFieldLangDto":{
        "languageId": 2,
		"seoH1": "",
		"seoMinDescription": "",
		"seoDescription": "",
		"seoTitle": "",
		"seoPictureAlt": "",
		"summary": "",
		"description": "",
		"name": "",
        "id":0
    }
})

onMounted(()=>{
    getCategoryItem(route?.params?.id)
})

const getCategoryItem = async (id) => {


    try {
        const headers = useRequestHeaders(['cookie'])

        const data = await $fetch('/api/category/categoryLanguage', {
            method: 'GET',
            headers,
            query: {
                catId: id
            }
        })

        if(data?.list){
            categoryDataLang.value.seoFieldLangDto = (data?.list.find(
        (item) => item.languageId == 2
      ) || {
          languageId: 2,
          seoH1: "",
          seoMinDescription: "",
          seoDescription: "",
          seoTitle: "",
          seoPictureAlt: "",
          summary: "",
          description: "",
          name: "",
          id: 0,
        
      })

        }
        console.log("data");
        console.log(data);

    } catch (error) {

        console.log(error);
        // navigateTo("/login")
    }

}
const submitInfo = async () => {
    // console.log(newCategory.value);
        try {
        const headers = useRequestHeaders(['cookie'])
        const insert = await $fetch(('/api/category/categoryLanguage'), {
            method: "POST",
            body: categoryDataLang.value,
            headers: {
                'Accept': 'application/json'
            }
        })

        if(insert?.isSuccess==true){
            navigateTo('/category')



        }else{
            insert?.messages.forEach(element => {
                toast.add({description:element?.item1,color:'red'});
            });
            
        }

    } catch (error) {
        console.log("ERROR:" + error);
    }
    finally{
        
    }
    



    
}
</script>


<style scoped lang="scss">
    .inputgroup{
        padding: 10px;
        display: flex;
        flex-direction: column;
        input{
            padding: 5px;
            margin-top: 5px;
        }
    }
</style>