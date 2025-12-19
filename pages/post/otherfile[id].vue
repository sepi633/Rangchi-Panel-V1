<template>
    <div>
    
    <div class="w-full flex items-center justify-between">
      <NuxtLink class="flex mb-2 w-[100px] bg-white p-1 rounded border" to="/post">بازگشت</NuxtLink>    
      </div>
        <UploadPDF @getPictureId="(n,pic)=>{newPost.label=pic.label;newPost.fileId=n;sendImageId(n)}" class="bg-white p-1 rounded border" />

        <div class="bg-white p-1 rounded border mt-2 flex flex-wrap">
            <div  class=" p-1 w-1/2 lg:w-1/6  relative" v-for="item in imageList"> 
                <!-- {{ item }} -->
                <button class="absolute bg-red-300 top-0 left-0 p-1 rounded text-red-700" @click="()=>{showDeleteModal=true; elId=item?.id}">
                    حذف
                </button>
                <nuxt-link :to="showImageBaseUrl+item?.file?.url" external>
                  <img src="/img/file.jpg" alt="">

                </nuxt-link>
           <div>

           </div>

          </div>
          
        </div>
        <ModalDelete v-if="showDeleteModal" @closeModal="()=>{showDeleteModal=false}" @haneler="()=>{deleteInfo(elId);showDeleteModal=false;}" />
    </div>
</template>

<script setup>
const  toast = useToast()

const {
  public: { showImageBaseUrl,baseUrl },
} = useRuntimeConfig();
const {
  public: { imageUploaderUrl },
} = useRuntimeConfig();
const showDeleteModal = ref(false)
const elId=ref(null)


const route = useRoute();
const imageList = ref()
const newPost = ref({
  "postId": "",
  "fileId": null ,
  "label":"",
})


onMounted (()=>{
    getPictures()
})

const getPictures = async () => {
  try {
    const headers = useRequestHeaders(["cookie"]);

    const data = await $fetch("/api/post/postfile", {
      method: "GET",
      headers,
      query: {
        postId: route.params.id,
      },
    });

    imageList.value = data?.list


  } catch (error) {
   
  }
};

const id=ref()
const sendImageId = (imageId)=>{
   
    id.value = imageId;
    newPost.value.postId = route?.params?.id;

    submitInfo()
}

const submitInfo = async () => {


    try {
      const headers = useRequestHeaders(["cookie"]);
      const insert = await $fetch("/api/post/postfile", {
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

const deleteInfo = async (id) => {
//   newPost.value.categoryItems = list.value;

    try {
      const insert = await $fetch(`/api/post/postfile`, {
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