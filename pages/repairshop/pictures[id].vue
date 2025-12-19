<template>
    <div class="p-6">
    <p>
      عکس کارت ویزیت با برچسب cardVisit و عکس داخلی مغازه با برچسب shopPic وارد شود 
    </p>
    <div class="w-full flex items-center justify-between">
      <NuxtLink class="flex mb-2 w-[100px] bg-white p-1 rounded border" :to="`/product/insert${route?.params?.id}`">بازگشت</NuxtLink>
      <NuxtLink class="flex mb-2 w-[150px] bg-white p-1 rounded border" :to="`/product/productRelate${route?.params?.id}`">محصولات مربتط</NuxtLink>
    
      </div>
        <UploadImage @getPictureId="(n,url,label)=>{newPost.label=label; newPost.pictureId = n;sendImageId(n)}" class="bg-white p-1 rounded border" />

        <div class="bg-white p-1 rounded border mt-2 flex flex-wrap">
            <div  class=" p-1 w-1/2 lg:w-1/6  relative" v-for="item in imageList"> 
                <!-- {{ item }} -->
                <button class="absolute bg-red-300 top-0 left-0 p-1 rounded text-red-700" @click="()=>{showDeleteModal=true; elId=item?.id}">
                    حذف
                </button>
                <div>
                  <img class="w-full h-full border rounded p-1"  :src="getPicUrl(item.picture,'sm')" />
                  <div class="text-center">
                    {{ item.label }}
                  </div>
                </div>
          </div>
          
        </div>
        <ModalDelete v-if="showDeleteModal" @closeModal="()=>{showDeleteModal=false}" @haneler="()=>{deleteInfo(elId);showDeleteModal=false;}" />
    </div>
</template>

<script setup>
const  toast = useToast()
const {getPicUrl}=usePicture()
const {
  public: { showImageBaseUrl, productcategoryId,baseUrl },
} = useRuntimeConfig();
const {
  public: { imageUploaderUrl },
} = useRuntimeConfig();
const showDeleteModal = ref(false)
const elId=ref(null)


const route = useRoute();
const imageList = ref()
const newPost = ref({
  "repairShopId": "",
  "pictureId": null ,
  "label":"",

})


onMounted (()=>{
    getPictures()
})

const getPictures = async () => {
  try {

    const data = await $fetch("/api/repairshop/pictures", {
      method: "GET",
      query: {
        RepairShopId: route.params.id,
      },
    });

    imageList.value = data?.list


  } catch (error) {
   
  }
};

const id=ref()
const sendImageId = (imageId)=>{
   
    id.value = imageId;
    newPost.value.repairShopId = route?.params?.id;

    submitInfo()
}

const loading=ref(false)

const submitInfo = async () => {

      if(loading.value)
    return
loading.value=true
    try {
      const insert = await $fetch("/api/repairshop/pictures", {
        method: "POST",
        body: newPost.value,
      });

      if(insert.isSuccess){
               getPictures()
          toast.add({description:"با موفقیت انجام شد.",color:'green'});
        }else{
toast.add({description:insert?.messages[0]?.item1,color:'red'})
}

      
    } catch (error) {
      
    } finally {
      
    }
 loading.value=false

};

const deleteInfo = async (id) => {
//   newPost.value.categoryItems = list.value;

    try {
      const insert = await $fetch(`/api/repairshop/pictures`, {
        method: "DELETE",
        query:{
          id:id
        }

      });

      if(insert.isSuccess){
               getPictures()
          toast.add({description:"با موفقیت انجام شد.",color:'green'});
        }else{
toast.add({description:insert?.messages[0]?.item1,color:'red'})
}
    
    
    } catch (error) {
      
    } finally {

    }
 
};

</script>