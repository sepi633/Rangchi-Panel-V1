<template>

    <div class="flex items-center flex-wrap gap-2">
      <div class="flex  items-center gap-3">
        <div class="font-bold">
          {{ data?.name }}
        </div>
        <div>
          <img :src="showImageBaseUrl + data?.picture?.url" class="w-32 aspect-square"/> 
        </div>
      </div>
      <NuxtLink  :to="'/product/insert'+productId" class="btn btn-sm  icon-btn rounded" title="ویرایش" >
 
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
<path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
</svg>
 ویرایش محصول
    </NuxtLink>
          <NuxtLink target="_blank" :to="`/product/otherImage`+productId" 
          title="" class="btn btn-sm icon-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m2.25 15.75l5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5m10.5-11.25h.008v.008h-.008zm.375 0a.375.375 0 1 1-.75 0a.375.375 0 0 1 .75 0"/></svg>
            سایر عکس ها
        </NuxtLink>
        <NuxtLink :to="`/product/productRelate`+productId" class="btn btn-sm  icon-btn " title="افزودن محصول کاربردی" >
          <svg data-v-b76ad084="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 15px;height: 15px;"><path data-v-b76ad084="" fill-rule="evenodd" clip-rule="evenodd" d="M1 5C1 4.20435 1.31607 3.44129 1.87868 2.87868C2.44129 2.31607 3.20435 2 4 2H8.558C9.18777 1.99978 9.80164 2.19775 10.3126 2.56587C10.8236 2.93398 11.2058 3.45357 11.405 4.051L11.72 5H20C20.5304 5 21.0391 5.21071 21.4142 5.58579C21.7893 5.96086 22 6.46957 22 7V9.01C22.2749 9.03731 22.5412 9.12128 22.782 9.25661C23.0228 9.39194 23.233 9.57569 23.3993 9.79629C23.5656 10.0169 23.6844 10.2695 23.7482 10.5383C23.812 10.8071 23.8194 11.0862 23.77 11.358L22.133 20.358C22.0492 20.8188 21.8062 21.2356 21.4466 21.5357C21.0869 21.8357 20.6334 22.0001 20.165 22H3C2.46957 22 1.96086 21.7893 1.58579 21.4142C1.21071 21.0391 1 20.5304 1 20V5ZM20 9V7H11.72C11.3002 6.99989 10.8912 6.86771 10.5507 6.62219C10.2102 6.37667 9.95564 6.03025 9.823 5.632L9.507 4.684C9.44065 4.48479 9.31328 4.31153 9.14295 4.18876C8.97262 4.06599 8.76796 3.99995 8.558 4H4C3.73478 4 3.48043 4.10536 3.29289 4.29289C3.10536 4.48043 3 4.73478 3 5V12.27L3.354 10.588C3.44853 10.139 3.69459 9.7361 4.0509 9.44697C4.40722 9.15784 4.85213 9.00002 5.311 9H20ZM3.366 20C3.41899 19.9086 3.45713 19.8094 3.479 19.706L5.31 11H21.801L20.164 20H3.366Z" fill="black"></path></svg>
محصولات مرتبط
        </NuxtLink>


   
    <nuxt-link target="_blank"
    :to="`/productFeature?catId=${data?.data?.categoryId}&prId=${productId}`"  class="btn btn-sm icon-btn" title="افزودن فیلد اختصاصی">
     <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M3.49994 20.4999C4.32994 21.3299 5.66994 21.3299 6.49994 20.4999L19.4999 7.49994C20.3299 6.66994 20.3299 5.32994 19.4999 4.49994C18.6699 3.66994 17.3299 3.66994 16.4999 4.49994L3.49994 17.4999C2.66994 18.3299 2.66994 19.6699 3.49994 20.4999Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
 <path d="M18.0098 8.99023L15.0098 5.99023" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
 <path d="M8.5 2.44L10 2L9.56 3.5L10 5L8.5 4.56L7 5L7.44 3.5L7 2L8.5 2.44Z" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round"/>
 <path d="M4.5 8.44L6 8L5.56 9.5L6 11L4.5 10.56L3 11L3.44 9.5L3 8L4.5 8.44Z" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round"/>
 <path d="M19.5 13.44L21 13L20.56 14.5L21 16L19.5 15.56L18 16L18.44 14.5L18 13L19.5 13.44Z" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round"/>
 </svg>
فیلد اختصاصی
</nuxt-link>
    </div>
</template>
<script setup>
const {public:{showImageBaseUrl}}=useRuntimeConfig()
const productId=useRoute().params.id || useRoute().query.prId

const data=ref({})
    const getProduct = async (_id) => {
        try {      
          const res = await $fetch("/api/product/productItem", {
            method: "GET",
            query: {
              postId:_id,
            },
          });          
           data.value= res?.data;
              } catch (error) {
        }
      };
onMounted(()=>{
    getProduct(productId)
})

</script>
<style lang="scss" scoped>


  



    .icon-btn {
      // border-left: 1px solid #3333;
      padding: 0 10px;
    }

   


  .btn{
    border: 1px solid #3333;
    margin: 2px;
    display: flex;
    align-items: center;
    border-radius: 6px;
    background-color: #f1f1f1;
    text-wrap: nowrap;

    svg{
      width: 15px;
      height: 15px;
      margin-left: 2px;
    }
  }


</style>