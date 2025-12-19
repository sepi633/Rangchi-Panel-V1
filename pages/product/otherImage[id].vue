<template>
    <div>
         <ProductProducttoolbox />

    <div class="w-full flex items-center justify-between">

    
      </div>
        <UploadImage @getPictureId="(n,url,label)=>{newPost.label=label; newPost.pictureId = n;sendImageId(n)}" class="bg-white p-1 rounded border" />

        <div class="bg-white p-1 rounded border mt-2 flex flex-wrap">
            <div  class=" p-1 w-1/2 lg:w-1/6  relative" v-for="item in imageList"> 
                <!-- {{ item }} -->
                <button class="absolute bg-red-300 top-0 left-0 p-1 rounded text-red-700" @click="()=>{showDeleteModal=true; elId=item?.id}">
                    حذف
                </button>
            <img class="w-full h-full border rounded p-1"  :src="getPicUrl(item.picture,'sm')" />

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
  "productId": "",
  "pictureId": null ,
  "label":"",
  "picture": {
    "id": 0,
    "url": "",
    "orginalName": "",
    "baseUrl": "",
    "guidName": "",
    "extension": ""
  }
})


onMounted (()=>{
    getPictures()
})

const getPictures = async () => {
  try {
    const headers = useRequestHeaders(["cookie"]);

    const data = await $fetch("/api/productPicture/productPicture", {
      method: "GET",
      headers,
      query: {
        ProductId: route.params.id,
      },
    });

    imageList.value = data?.list


  } catch (error) {
   
  }
};

const id=ref()
const sendImageId = (imageId)=>{
   
    id.value = imageId;
    newPost.value.productId = route?.params?.id;

    submitInfo()
}

const submitInfo = async () => {


    try {
      const headers = useRequestHeaders(["cookie"]);
      const insert = await $fetch("/api/productPicture/productPicture", {
        method: "POST",
        body: newPost.value,
        headers: {
          Accept: "application/json",
        },
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
const cookie=useCookie('key')
const deleteInfo = async (id) => {
    try {
      const insert = await $fetch(`${baseUrl}/api/Admin/ProductPicture?id=${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "AUTHORIZATION": `Bearer ${cookie.value}`,
        },
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