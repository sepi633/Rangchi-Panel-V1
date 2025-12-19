<template>
  <div class="p-6 sm:p-10 ">
       <div class="my-2">
           <span class="pe-2 sm:text-[16px] text-[14px]">شناسه خبر :</span>
           <span class=" sm:text-[16px] text-[14px]">{{ comment.id }}</span>
       </div>
       <div  class="my-2">
           <span class="pe-2 sm:text-[16px] text-[14px]"> امتیاز:</span>
           <span class=" sm:text-[16px] text-[14px]">{{ comment.rate }}</span>
       </div>
       <div  class="my-2">
           <span class="pe-2 sm:text-[16px] text-[14px]"> پاسخ:</span>
           <span v-if="comment.answer == null" class=" sm:text-[16px] text-[14px]">-</span>
           <span v-else class=" sm:text-[16px] text-[14px]">{{ comment.answer }}</span>
       </div>
     
       <div  class="my-2">
           <span class="pe-2 sm:text-[16px] text-[14px]"> کامنت  :</span>
           <span class=" sm:text-[16px] text-[14px]">{{ comment.text }}</span>
       </div>
       <div  class="my-2">
           <span class="pe-2 sm:text-[16px] text-[14px]"> وضعیت :</span>
           <span class="text-[#2cbff4] sm:text-[16px] text-[14px]" v-if="comment.statusId == 1">بررسی نشده</span>
                   <span class="text-[green] sm:text-[16px] text-[14px]" v-else-if="comment.statusId == 2">تایید شده</span>
                   <span class="text-[#961212] sm:text-[16px] text-[14px]" v-else-if="comment.statusId == 3">رد شده</span>
       </div>
       <div  class="my-5 flex items-center flex-wrap">
        <span class="pe-2 sm:text-[16px] text-[14px]">  پین شود ؟</span>
        <input type="checkbox" class="form-control sm:text-[16px] text-[14px] p-2 " v-model="comment.pin" >
    </div>
       <div  class="my-5 flex items-center flex-wrap">
           <span class="pe-2 sm:text-[16px] text-[14px]"> پاسخ  :</span>
           <textarea type="text" class="form-control w-full text-[14px] p-2 " rows="8" v-model="answer" ></textarea>
       </div>
       <div class="flex flex-wrap">
           <div class="mx-2">
           <label >بررسی نشده :</label>
                         <input type="radio"   v-model="statusId" value="1">
           </div>
             <div class="mx-2">
                <label>تایید شده :</label>
           <input type="radio"   v-model="statusId" value="2"> 

             </div>
               <div class="mx-2">
                  <label>رد شده :</label>
           <input type="radio"  v-model="statusId" value="3">
               </div>

          
          
       </div>
       <button class="btn bg-green-700 px-2 py-1.5 text-[#fff] mt-7" @click="editeComment">ثبت</button>
       <NuxtLink @click="router.go(-1)" class="btn bg-rose-700 px-2 py-1.5 text-[#fff] ms-3 ">بازگشت</NuxtLink>
  </div>

</template>
<script setup>
const route=useRoute();
const router=useRouter()
const comment=ref({});
const answer=ref(null);
const toast=useToast()
const statusId = ref()
const pageLoader = async () => {
//   loader.value=true
try {


const respons = await $fetch('/api/postComment/comment', {
 method: 'GET',
 query: {
           id: route.params.id
       }
})

comment.value=respons.data


} catch (error) {

console.log(error);
// navigateTo("/login")
}


}
const editeComment = async () =>{
console.log("ok");
console.log(statusId.value);
console.log(answer.value)
try {


const data = await $fetch('/api/postComment/edit', {
 method: 'PUT',
 body:{
   "postId": comment.value.postId,
   "text": comment.value.text,
   "rate": comment.value.rate,
   "statusId": statusId.value,
   "answer": answer.value,
   "userId":comment.value.userId,
   "name": comment.value.name,
   "id": route.params.id,
   pin:comment.value.pin
}
})
if(data.isSuccess){
 toast.add({description:"با موفقیت  ثبت شد !",color:'green'});
 router.go(-1)
}


console.log("-----------------------");

// loader.value=false
console.log(data);

} catch (error) {

console.log(error);
// navigateTo("/login")
}
}
onMounted( async ()=>{
console.log("--------------------");
console.log(route.params.id);
await pageLoader()
})
</script>