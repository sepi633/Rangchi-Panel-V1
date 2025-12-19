<template>
    <div class="flex flex-wrap">
        <div class="inputgroup w-full lg:w-1/2">
            <label for="">عنوان</label>
            <input type="text" v-model="galleryDataLang.seoFieldLangDto.name">
        </div>
        <div class="inputgroup w-full lg:w-1/2">
            <label for="">عنوان سئو </label>
            <input type="text" v-model="galleryDataLang.seoFieldLangDto.seoTitle">
        </div>

        <div class="inputgroup w-full lg:w-1/2">
            <label for="">هدینگ اول </label>
            <input type="text" v-model="galleryDataLang.seoFieldLangDto.seoH1">
        </div>
        <div class="inputgroup w-full lg:w-1/2">
            <label for="">عنوان تصویر</label>
            <input type="text" v-model="galleryDataLang.seoFieldLangDto.seoPictureAlt">
        </div>
        <div class="inputgroup w-full lg:w-1/2">
            <label for=""> خلاصه</label>
            <textarea  v-model="galleryDataLang.seoFieldLangDto.summary" name="" id="" cols="30" rows="10"></textarea>
        </div>

        <div class="inputgroup w-full lg:w-1/2">
            <label for=""> توضیحات خلاصه سئو(seoMinDescription)</label>
            <textarea  v-model="galleryDataLang.seoFieldLangDto.seoMinDescription" name="" id="" cols="30" rows="10"></textarea>
            
        </div>

        <div class="inputgroup w-full">
            <label for="">    توضیحات</label>
            <RichEditor v-model="galleryDataLang.seoFieldLangDto.description" />
        </div>
        <div class="inputgroup w-full">
            <label for="">توضیحات  سئو </label>
            <RichEditor v-model="galleryDataLang.seoFieldLangDto.seoDescription" />
            
        </div>

        <div class="btn-box flex justify-end p-2">
            <button class="bg-green-700 hover:bg-green-800 p-2 px-4 w-[100px] text-white " @click="submitInfo">ثبت</button>
        </div>
    </div>
</template>

<script setup>
const route = useRoute()
const galleryData = ref({})
const toast=useToast()
const galleryDataLang = ref({
    "galleryId": route?.params?.id,
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
    getgalleryItem(route?.params?.id)
})

const getgalleryItem = async (id) => {


    try {
        const headers = useRequestHeaders(['cookie'])

        const data = await $fetch('/api/gallery/lang', {
            method: 'GET',
            headers,
            query: {
                galleryId: id
            }
        })

        if(data?.list){
            galleryDataLang.value.seoFieldLangDto = (data?.list.find(
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
const loading=ref(false)
const submitInfo = async () => {
    if(loading.value)return
    loading.value=true
    // console.log(newgallery.value);
        try {
        const headers = useRequestHeaders(['cookie'])
        const insert = await $fetch(('/api/gallery/lang'), {
            method: "POST",
            body: galleryDataLang.value,
            headers: {
                'Accept': 'application/json'
            }
        })

        if(insert?.isSuccess==true){
            navigateTo('/gallery')
            toast.add({description:'عملیات با موفقیت انجام شد',coloe:'green'})


        }else{
            insert?.messages.forEach(element => {
                toast.add({description:element?.item1,color:'red'});
            });
            
        }

    } catch (error) {
        console.log("ERROR:" + error);
    }
loading.value=false
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