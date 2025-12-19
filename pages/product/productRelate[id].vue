<template>

    <div class="file-all relative pt-3">

           <ProductProducttoolbox />

      <div class="w-full flex items-center justify-between">
      <NuxtLink class="flex mb-2 w-[100px] bg-white p-1 rounded border" :to="`/product/productRelate${route?.params?.id}`">بازگشت</NuxtLink>
      <NuxtLink class="flex mb-2 w-[150px] bg-white p-1 rounded border" :to="`/product`"> اتمام </NuxtLink>
    
      </div>
        <strong> {{ $t('Functionalproducts') }} {{ route.params.id }}</strong>
       <div class="flex items-center bg-[#fff] mt-3 h-[40px] px-3 rounded" >
          <input v-model="searchValue" type="text" :placeholder="$t('search')" class="w-full block " @keyup="searchProduct">
          <span  v-if="pageData?.length > 0" @click="()=>{pageData=null;searchValue=''}" class="me-3 cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
</svg></span> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
          </svg>
         
       </div>
        <ul class="bg-[#fff] border p-2 rounded mt-2 " v-if="pageData?.length > 0">
            
              <li class="border-b mb-2 flex justify-between cursor-pointer last:border-b-0 last:mb-0" v-for="item in pageData" @click="()=>{addToRelated(item);pageData=null;searchValue=''}" >
                  {{ item?.name }}
                    <!-- <svg :class="`svg-selected-${item?.id}`"  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="hidden bi bi-check-lg" viewBox="0 0 16 16">
                      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                    </svg>  -->
              </li>
          
        </ul>
        <div class="flex mt-6 pt-6 border-t">
            <div class="bg-[#fff] rounded m-2 py-5 px-3 relative" v-for="item in relatedList" :key="item.id">
                {{ item?.name }}
                <span  @click="removeToRelated(item?.id)" class="p-1 bg-[#fff] border rounded cursor-pointer absolute top-[-17px] left-[-9px]"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
</svg></span>
            </div>
        </div>
        
        <button
        class="btn bg-[#136b57] w-2/12 my-3 px-3 py-1 text-white"
        @click="submitInfo()"
      >
      {{ $t('confirm') }}
      </button>
      <nuxt-link to="/product"
        class="btn bg-[#333] m-3 ml-1 px-3 py-1 text-white"
        
      >
      {{ $t('cancel') }}
      </nuxt-link>
    </div>
    
    
</template>


<script setup>
const toast=useToast()
   
    const route = useRoute();
    const pageData = ref(null);
    const searchValue = ref('')
    const defaultData = ref({

      pageIndex: 1,
      pageSize: 40,

      Q:""})
    const relatedList = ref([]);
    const body=ref({
      "productId": route.params.id,
      label:"related",
      relatedProductList:null
    })
    onMounted(()=>{
    // newPost.value.productId = route.params.id
    Loader()
    })
const Loader = async () => {
  try {
    const headers = useRequestHeaders(["cookie"]);

    const response = await $fetch('/api/product/productRelate', {
      method: 'GET',
      headers,
      query: {
        productId:route.params.id,
        label:"related"
      }
    })


    relatedList.value = response?.data?.relatedProductList
    
    
  } catch (error) {
  
  }
};

const submitInfo = async () => {
  body.value.relatedProductList = relatedList.value;
  try {
    const headers = useRequestHeaders(["cookie"]);

    const response = await $fetch('/api/product/productRelate', {
      method: 'Post',
      headers,
      body:body.value
    })


    
    if(response.isSuccess){
      toast.add({description:'عملیات با موفقیت انجام شد .',color:'green'})
      navigateTo("/product");
    }
    else{
      response.messages.forEach(element => {
        toast.add({description:element.item1,color:'red'});
                
            });
    }
  
  } catch (error) {
   
  }
};

const loading=ref(false)
const searchProduct = async () =>{
  
  if(searchValue.value.length > 3){
    defaultData.value.Q = searchValue.value;
   await pageLoader()
  }
}
const pageLoader = async () => {
  if(loading.value)return 
  loading.value=true
  try {
    
    const data = await $fetch('/api/product/products', {
      method: 'GET',
      query: defaultData.value
    })


    
    pageData.value = data?.list
  } catch (error) {
    
  }
  loading.value=false
};
const addToRelated = (item)=>{
  const res= relatedList.value.find((el)=>{return el.id == item.id});
   const index = relatedList.value.indexOf(res)
      if (index == -1) { 
        relatedList.value.push(item);
    }
 
}
const removeToRelated = (item)=>{
   const res= relatedList.value.find((el)=>{return el.id == item});
   const index = relatedList.value.indexOf(res)
      if (index > -1) { 
        relatedList.value.splice(index, 1); 
        toast.add({description:' با موفقیت حذف شد .',color:'green'})
    }
   
}
</script>

<style lang="scss" scoped>
input:focus{
  box-shadow: unset !important;
  border: unset;
  outline: unset;
}
</style>