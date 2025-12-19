<template>
       <div class="p-6 sm:p-10 ">
            <div class="my-2">
                <span class="pe-2 sm:text-[16px] text-[14px]">{{ $t('id') }}  :</span>
                <span class=" sm:text-[16px] text-[14px]">{{ comment.id }}</span>
            </div>
            <div  class="my-2">
                <span class="pe-2 sm:text-[16px] text-[14px]"> {{ $t('rate') }} :</span>
                <span class=" sm:text-[16px] text-[14px]">{{ comment.rate }}</span>
            </div>
            <div  class="my-2">
                <span class="pe-2 sm:text-[16px] text-[14px]"> {{ $t('Response') }}:</span>
                <span v-if="comment.answer == null" class=" sm:text-[16px] text-[14px]">-</span>
                <span v-else class=" sm:text-[16px] text-[14px]">{{ comment.answer }}</span>
            </div>
          
            <div  class="my-2">
                <span class="pe-2 sm:text-[16px] text-[14px]"> {{ $t('comment') }}  :</span>
                <span class=" sm:text-[16px] text-[14px]">{{ comment.text }}</span>
            </div>
            <div  class="my-2">
                <span class="pe-2 sm:text-[16px] text-[14px]"> {{ $t('Condition') }} :</span>
                <span class="text-[#2cbff4] sm:text-[16px] text-[14px]" v-if="comment.statusId == 1">بررسی نشده</span>
                        <span class="text-[green] sm:text-[16px] text-[14px]" v-else-if="comment.statusId == 2">تایید شده</span>
                        <span class="text-[#961212] sm:text-[16px] text-[14px]" v-else-if="comment.statusId == 3">رد شده</span>
            </div>

            <!-- <div  class="my-5 flex items-center flex-wrap">
                <span class="pe-2 sm:text-[16px] text-[14px]">  پین شود ؟</span>
                <input type="checkbox" class="form-control sm:text-[16px] text-[14px] p-2 " v-model="comment.pin" >
            </div> -->
            <div  class="my-5 flex items-center flex-wrap">
                <span class="pe-2 sm:text-[16px] text-[14px]">  {{ $t('Response') }}  :</span>
                <textarea type="text" class="form-control sm:w-[300px] sm:text-[16px] text-[14px] p-2 " v-model="answer" ></textarea>
            </div>
            <div class="flex flex-wrap">
                <div class="mx-2">
                <label  > {{ $t('Notchecked') }} :</label>
                              <input type="radio"   v-model="statusId" value="1">
                </div>
                  <div class="mx-2">
                     <label> {{ $t('Accepted') }} :</label>
                <input type="radio"   v-model="statusId" value="2"> 

                  </div>
                    <div class="mx-2">
                       <label> {{ $t('failed') }}  :</label>
                <input type="radio"  v-model="statusId" value="3">
                    </div>

               
               
            </div>
            <button class="btn bg-green-700 px-2 py-1.5 text-[#fff] mt-7" @click="editeComment">{{ $t('confirm') }}</button>
            <NuxtLink to="/ProductComment" class="btn bg-rose-700 px-2 py-1.5 text-[#fff] ms-3 ">{{ $t('cancel') }}</NuxtLink>
       </div>

</template>
<script setup>
const route=useRoute();
const comment=ref({});
const answer=ref("");
const statusId = ref();
const store= useAuth();
const loader=ref(false)
const pageLoader = async () => {
  if(loader.vue)return 
  loader.value=true
  try {
    

    const respons = await $fetch('/api/productComment/comment', {
      method: 'GET',
      query: {
                id: route.params.id
            }
    })
    if(respons.isSuccess){
      comment.value = respons.data
      if(respons.data.answer != null){

        answer.value = respons.data.answer
      }
    }else{
       respons?.messages.forEach((element) => {
          toast.add({description:element?.item1,color:'red'});
        });
    }
  } catch (error) {
  }
  
loader.value=false
}
const editeComment = async () =>{
    try {
    

    const data = await $fetch('/api/productComment/edit', {
      method: 'PUT',
      body:{

        "id": route.params.id,
        "name": null,
        "text": comment.value.text,
        "rate": comment.value.rate,
        "statusId": statusId.value,
        "answer": answer.value,
        "userId": comment.value.userId,
        "productId": comment.value.productId,
        pin: comment.value.pin
    }
    })


  ;
   
    // loader.value=false
  ;
  if(data?.isSuccess){
    navigateTo("/ProductComment")

  }

  } catch (error) {

    console.log(error)
    // navigateTo("/login")
  }
}

onMounted( async ()=>{
    ;
    ;
    await pageLoader()
    ;
    ;
})
</script>