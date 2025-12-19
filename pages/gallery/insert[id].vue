<template>
    <section class="parent-box">
        <div class="title">
            <strong>افروزدن محتوا</strong>
        </div>
        <div class="body-box flex flex-wrap p-2 items-start bg-white rounded border mt-3">

    <img
          class="h-[300px] w-full border p-1 mb-3 object-contain"
          v-if="newGallery.pictureId != null"
          :src="showImageBaseUrl + newGallery?.picture?.url"
        />
        <UploadImage
          v-else
          @getPictureId="
            (n, pic) => {
              newGallery.pictureId = n;
              newGallery.picture = pic;
            }
          "
        ></UploadImage>
          <button
          class="w-full flex justify-center bg-[#e3e3e3] p-2 rounded"
          @click="newGallery.pictureId = null"
          v-if="newGallery.pictureId != null"
        >
          <svg
            class="min-w-[25px]"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3 6.99747C3 6.20182 3.31607 5.43876 3.87868 4.87615C4.44129 4.31354 5.20435 3.99747 6 3.99747H18C18.7956 3.99747 19.5587 4.31354 20.1213 4.87615C20.6839 5.43876 21 6.20182 21 6.99747V18.9975C21 19.7931 20.6839 20.5562 20.1213 21.1188C19.5587 21.6814 18.7956 21.9975 18 21.9975H6C5.20435 21.9975 4.44129 21.6814 3.87868 21.1188C3.31607 20.5562 3 19.7931 3 18.9975V6.99747ZM19 6.99747V15.5835L15.707 12.2905C15.5195 12.103 15.2652 11.9977 15 11.9977C14.7348 11.9977 14.4805 12.103 14.293 12.2905L13 13.5835L9.207 9.79047C9.01947 9.603 8.76516 9.49768 8.5 9.49768C8.23484 9.49768 7.98053 9.603 7.793 9.79047L5 12.5835V6.99747C5 6.73225 5.10536 6.4779 5.29289 6.29036C5.48043 6.10282 5.73478 5.99747 6 5.99747H18C18.2652 5.99747 18.5196 6.10282 18.7071 6.29036C18.8946 6.4779 19 6.73225 19 6.99747ZM5 18.9975V15.4115L8.5 11.9115L12.293 15.7045C12.4805 15.8919 12.7348 15.9973 13 15.9973C13.2652 15.9973 13.5195 15.8919 13.707 15.7045L15 14.4115L19 18.4115V18.9975C19 19.2627 18.8946 19.517 18.7071 19.7046C18.5196 19.8921 18.2652 19.9975 18 19.9975H6C5.73478 19.9975 5.48043 19.8921 5.29289 19.7046C5.10536 19.517 5 19.2627 5 18.9975ZM14.5 10.9975C14.8978 10.9975 15.2794 10.8394 15.5607 10.5581C15.842 10.2768 16 9.89529 16 9.49747C16 9.09964 15.842 8.71811 15.5607 8.43681C15.2794 8.1555 14.8978 7.99747 14.5 7.99747C14.1022 7.99747 13.7206 8.1555 13.4393 8.43681C13.158 8.71811 13 9.09964 13 9.49747C13 9.89529 13.158 10.2768 13.4393 10.5581C13.7206 10.8394 14.1022 10.9975 14.5 10.9975Z"
              fill="black"
            />
          </svg>
          {{ $t("ImageEditing") }}
        </button>

                <div class="input-box flex flex-col lg:w-1/3 p-1">
                    <label for=""> عنوان :</label>
                    <input class="border w-full h-[40px] mt-2" type="text" name=""   v-model="newGallery.name"
                        id="">
                </div>
                <div class="input-box flex flex-col  p-1">
                    <label for=""> اسلاگ :</label>
                                <Slug v-model:value="newGallery.label" v-model:isAccept="acceptSlug" mode="gallery" :editId="route.params.id=='new'?null:route.params.id"/>

                </div>
                <div class="input-box flex flex-col lg:w-1/3 p-1">
                    <label for=""> اولویت نمایش :</label>
                    <input class="border w-full h-[40px] mt-2" type="text" name="" v-model="newGallery.priority" id="">
                </div>
                
                
                <!-- <div class="input-box flex flex-col lg:w-2/6 p-1 ">
                    <label for="">دسته بندی :</label>
                    <select class="form-select bg-white rounded w-full p-1 border h-[40px] mt-2" v-model="newGallery.categoryId">
                    <option v-for="item in categoris" :value="item?.id" :key="item?.id">{{ item?.name }} </option>
                </select>
                </div> -->
                <!-- <div class="input-box flex flex-col w-full p-1">
                    <label for="">آدرس:</label>
                    <input class="border w-full h-[40px] mt-2" type="text" name="" v-model="newGallery.url" id="">
                </div>-->
                <div class="input-box flex flex-col lg:w-full p-1">
                    <label for="">خلاصه:</label>
                    <textarea class="border w-full h-100 mt-2" type="text" name="" v-model="newGallery.summary"
                        id=""></textarea>
                </div>
                <div class="input-box flex flex-col lg:w-full p-1">
                    <label for="">توضیحات:</label>
                    <textarea class="border w-full h-100 mt-2" type="text" name="" rows="4" v-model="newGallery.description"
                        id=""></textarea>
                </div> 
   <div class="bg-[#fff] mt-4 p-4 w-full insert-box border flex flex-wrap">
    <strong class="w-full text-xl p-4">
      seo
    </strong>
      <div class="input-box flex flex-col lg:w-2/6 p-1">
        <label for=""> {{ $t("SEOH1") }}<sub>(SEO H1)</sub></label>
        <input
          class="border w-full h-[40px] mt-2"
          type="text"
          name=""
          id=""
          v-model="newGallery.seoH1"
        />
      </div>
      <div class="input-box flex flex-col lg:w-2/6 p-1">
        <label for=""> {{ $t("SEOAlt") }}:<sub>(SEO Alt)</sub></label>
        <input
          class="border w-full h-[40px] mt-2"
          type="text"
          name=""
          id=""
          v-model="newGallery.seoPictureAlt"
        />
      </div>
      <div class="input-box flex flex-col lg:w-2/6 p-1">
        <label for=""> {{ $t("SEOURL") }}:<sub>(SEO URL)</sub></label>
        <input
          class="border w-full h-[40px] mt-2"
          type="text"
          name=""
          id=""
          v-model="newGallery.seoUrlText"
        />
      </div>
      <div class="input-box flex flex-col lg:w-2/6 p-1">
        <label for=""> {{ $t("SEOTitle") }} :<sub>(SEO Title)</sub></label>
        <input
          class="border w-full h-[40px] mt-2"
          type="text"
          name=""
          id=""
          v-model="newGallery.seoTitle"
        />
      </div>
      <div class="input-box flex flex-col lg:w-2/6 p-1">
        <label for="">
          {{ $t("SEOCanonical") }} :<sub>(SEO Canonical)</sub></label
        >
        <input
          class="border w-full h-[40px] mt-2"
          type="text"
          name=""
          id=""
          v-model="newGallery.seoCanonical"
        />
      </div>
      <div class="input-box flex flex-col lg:w-1/6 p-1">
        <label for=""> {{ $t("NoIndex") }} :<sub>(SEO NoIndex)</sub></label>
        <div class="flex justify-start items-center pt-3">
          <input
            class="border mx-2"
            type="radio"
            name="nofollow"
            id="r3"
            @change="newGallery.seoNoIndex = true"
          />
          <label for="r3">{{ $t("yes") }}</label>
          <input
            class="border mx-2"
            type="radio"
            name="nofollow"
            id="r4"
            @change="newGallery.seoNoIndex = false"
          />

          <label for="r4">{{ $t("no") }}</label>
        </div>
      </div>
      <div class="input-box flex flex-col lg:w-1/6 p-1">
        <label for=""> {{ $t("NoFollow") }} :<sub>(SEO NoFollow)</sub></label>
        <div class="flex justify-start items-center pt-3">
          <input
            class="border mx-2"
            type="radio"
            name="nofollow"
            id="r3"
            @change="newGallery.seoNoFollow = true"
          />
          <label for="r3">{{ $t("yes") }}</label>
          <input
            class="border mx-2"
            type="radio"
            name="nofollow"
            id="r4"
            @change="newGallery.seoNoFollow = false"
          />

          <label for="r4">{{ $t("no") }}</label>
        </div>
      </div>
    </div>
    <div class="bg-[#fff] mt-4 p-4 w-full insert-box border">
      <div class="input-box flex flex-col w-full p-1">
        <label for="">{{ $t("summary") }}:</label>
        <textarea
          class="border w-full h-100 mt-2"
          type="text"
          name=""
          id=""
        ></textarea>
      </div>
    </div>
    <div class="bg-[#fff] mt-4 p-4 w-full  insert-box border">
      <div class="input-box flex flex-col w-full p-1">
        <label for="">خلاصه توضیحات:</label>
        <textarea
          class="border w-full h-100 mt-2"
          type="text"
          name=""
          v-model="newGallery.seoMinDescription"
          id=""
        ></textarea>
      </div>
    </div>
    <div class="bg-[#fff] mt-4 p-4 w-full insert-box border">
      <div class="input-box flex flex-col w-full p-1">
        <label for="">{{ $t("description") }}:</label>
        <RichEditor v-model="newGallery.seoDescription" />
      </div>
    </div>

            </div>
        <div class="submit-box flex flex-wrap justify-end w-full">
            <div class="flex justify-start ml-auto lg:w-4/12 items-center pt-3">
                <input class="border mx-2"  type="checkbox" v-model="newGallery.active" id="active">
                <label for="active" >{{ $t('IWantToDisplayOnTheSite') }}</label>

            </div>
            <button class="btn bg-[#333] m-3 ml-1 px-3 py-1 text-white "
                    @click="cancel">انصراف</button>

            <button class="btn bg-[#136b57] w-2/12 my-3 px-3 py-1 text-white "
            v-if="isEdite == false" @click="submitInfo('insert')">ثبت</button>
            <button class="btn bg-[#2563eb] w-2/12 my-3 px-3 py-1 text-white "
            v-if="isEdite == true" @click="submitInfo('edite')">ویرایش</button>
        </div>
    </section>
</template>

<script setup>
const  toast = useToast()
const {public:{galleryCategoryId}}=useRuntimeConfig()

const {public:{showImageBaseUrl}} = useRuntimeConfig()
const acceptSlug=ref(false)

const newGallery = ref({
  "name": "",
  "summary": "",
  "description": "",
  "url": "",
  "priority": 0,
  "pictureId": null,
  "active": true,
  "categoryId": galleryCategoryId,
  "seoH1": "",
  "seoMinDescription": "",
  "seoDescription": "",
  "seoTitle": "",
  "seoPictureAlt": "",
  "seoUrlText": "",
  "seoNoIndex": true,
  "seoNoFollow": true,
  "seoCanonical": "",
  "label": "",
  "active":false
})

const imageSrc = ref()
const parentType = ref([])
const parentTypeId = ref()
const isEdite = ref(false)
const categoris = ref()
const isEditeImage = ref(false)
const route = useRoute()
const router=useRouter()
onMounted(() => {
    getCategoryItem(galleryCategoryId)

    if(route.params.id!='new'){
        pageLoader();
        isEdite.value = true
        isEditeImage.value = true
    }
    

})

const pageLoader = async () => {
    // alert("yes")
    try {
        const headers = useRequestHeaders(['cookie'])

        const data = await $fetch('/api/gallery/gallery', {
            method: 'GET',
            headers,
            query: {
                postId: route.params.id
            }
        })
        newGallery.value = data?.data
         if(data?.data?.label?.length>0)
    acceptSlug.value=true
        getImage(newGallery.value.pictureId)
        // newGallery.value.parentId = pageData?.value.parentId
        console.log("edite data");
        console.log(data);

    } catch (error) {

        console.log(error);
        // navigateTo("/login")
    }

}

const getCategoryItem = async (id) => {

try {
    const headers = useRequestHeaders(['cookie'])

    const data = await $fetch('/api/category/category', {
        method: 'GET',
        headers,
        query: {
            parentId: id
        }
    })


    console.log("data from banner insert");
    console.log(data);
    categoris.value =data.list
} catch (error) {

    console.log(error);
    // navigateTo("/login")
}

}

const getImage = async (id) => {
    // alert("yes")
    try {
        console.log(id);
        // const headers = useRequestHeaders(['cookie'])

        const data = await $fetch('/api/picture/picture', {
            method: 'GET',
            // headers,
            query: {
                postId: id
            }
        })

        // newGallery.value.parentId = pageData?.value.parentId
        console.log("edite data image");
        console.log(data);
        imageSrc.value = data?.data?.url
    } catch (error) {

        console.log(error);
        // navigateTo("/login")
    }

}
const loading=ref(false)
const submitInfo = async (type) => {
    if(!acceptSlug.value){
      toast.add({description:'وارد کردن و تایید اسلاگ الزامی میباشد',color:'red'})
      return
    }
  
 if(loading.value)
 return 
loading.value=true
    try {
            let data=JSON.parse(JSON.stringify(newGallery.value))
            delete data.picture
        const insert = await $fetch(('/api/gallery/gallery'), {
            method:type=='insert' ? "POST":"put",
            body:data,
     
        })

        // pageLoader()       
        if(insert.isSuccess){
            router.go(-1)
         toastadd({description:'با موفقیت  ثبت شد !',color:'green'})
      }else{
        insert.messages.forEach((el)=>{
          toast.add({description:el.item1, color:'red'})
        })
      }

    } catch (error) {
        console.log("ERROR:" + error);
    }
      loading.value=false
    
}

const cancel = () =>{
    navigateTo("/banner")
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