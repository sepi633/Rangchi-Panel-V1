<template>
    <div class="p-6 sm:p-10 ">
    <div v-if="productFeaturesList?.list.length > 0">
      <div class="flex flex-wrap  justify-between" v-for="item in productFeaturesList?.list" >
        <div class="w-[49%] bg-[#fff] p-1 border mt-2 rounded" >{{ item?.name }} ({{ item?.label }})</div>
        <div class="w-[49%] bg-[#fff] p-1 border mt-2 rounded" >
                 <span class="px-2" v-for="value in item?.productFeatureValues"> {{value?.name || value?.featureItem.name }} </span>
       </div>
    </div>
           
            
   
   
    </div>
    <div v-else class="text-center text-[18px]">
       برای این محصول ویژگی وجود ندارد.
    </div>
    
   <div class="h-[1px] w-full bg-rose-500 my-4"></div>
        <div class="" v-for="item in allData?.data" :key="item?.id" >
            <!-- <div class="lg:w-3/12 w-1/2 p-1 ">
            <NuxtLink class="bg-white rounded p-2 border flex justify-center items-center min-h-[100px] cursor-pointer" :to="`/featuresitem/insertnew?id=${route.query.id}`">
                <svg data-v-e838505d="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-e838505d="" fill-rule="evenodd" clip-rule="evenodd" d="M12 4C12.2652 4 12.5196 4.10536 12.7071 4.29289C12.8946 4.48043 13 4.73478 13 5V11H19C19.2652 11 19.5196 11.1054 19.7071 11.2929C19.8946 11.4804 20 11.7348 20 12C20 12.2652 19.8946 12.5196 19.7071 12.7071C19.5196 12.8946 19.2652 13 19 13H13V19C13 19.2652 12.8946 19.5196 12.7071 19.7071C12.5196 19.8946 12.2652 20 12 20C11.7348 20 11.4804 19.8946 11.2929 19.7071C11.1054 19.5196 11 19.2652 11 19V13H5C4.73478 13 4.48043 12.8946 4.29289 12.7071C4.10536 12.5196 4 12.2652 4 12C4 11.7348 4.10536 11.4804 4.29289 11.2929C4.48043 11.1054 4.73478 11 5 11H11V5C11 4.73478 11.1054 4.48043 11.2929 4.29289C11.4804 4.10536 11.7348 4 12 4Z" fill="black" style="fill: #1f2937;"></path></svg>

                <span>
                    
                    {{ $t('addNewItem') }}
                </span>

            </NuxtLink>
        </div> -->         
                  <div  class="acardeon bg-white my-2 rounded border image-box p-2" v-for="feature in item?.features">
                      <div class="title-box flex items-center justify-between"
                        @click="acardeonHandler"
                      >
                    
                      <span>
                        <div class="check">
                          <div  v-for="el in productFeaturesList?.list">
                            
                  
                            <span class="bg-green-200 p-1 rounded text-sm" v-if="el?.label == feature?.label">
                              
                              پاسخ داده شده
                            </span>
                          </div>
                  
                        </div>
                        {{  feature?.name }}  ({{ feature?.label }})</span>
                        <svg
                          width="17"
                          height="11"
                          viewBox="0 0 17 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0.293031 1.29534C0.480558 1.10787 0.734866 1.00255 1.00003 1.00255C1.26519 1.00255 1.5195 1.10787 1.70703 1.29534L8.00003 7.58834L14.293 1.29534C14.3853 1.19983 14.4956 1.12365 14.6176 1.07124C14.7396 1.01883 14.8709 0.991243 15.0036 0.990089C15.1364 0.988935 15.2681 1.01424 15.391 1.06452C15.5139 1.1148 15.6255 1.18905 15.7194 1.28294C15.8133 1.37684 15.8876 1.48849 15.9379 1.61139C15.9881 1.73428 16.0134 1.86596 16.0123 1.99874C16.0111 2.13152 15.9835 2.26274 15.9311 2.38474C15.8787 2.50675 15.8025 2.61709 15.707 2.70934L8.70703 9.70934C8.5195 9.89681 8.26519 10.0021 8.00003 10.0021C7.73487 10.0021 7.48056 9.89681 7.29303 9.70934L0.293031 2.70934C0.10556 2.52181 0.000244141 2.2675 0.000244141 2.00234C0.000244141 1.73718 0.10556 1.48287 0.293031 1.29534Z"
                            fill="black"
                          />
                        </svg>
                      </div>
                      <!-- /// -->
                      <div class="body-box flex flex-wrap p-2 items-center ">
                  
                          <!-- ///                           -->
                        <div class=" w-full my-1">

                          <!-- //// -->
                          <div v-if="feature?.typeId == 39">
                            <label  class="block mx-2" :for="featureItem?.id" v-for="featureItem in feature?.featureItems">
                                {{ featureItem?.name }}
                                <input :id="featureItem?.id"  @change="()=>{pushTolist(featureItem?.id,featureItem.featureId,null,false) }" type="checkbox" name="" id="">
                            </label>
                            <button @click="submitInfo"  
                            class="btn bg-green-500 mx-auto mt-3 text-white p-2 border border-bg-rose-500rounded 
                            w-1/2 flex items-center justify-center"
                              > افزودن به لیست    </button>       
                          </div>
                          <!-- /// -->
                          <div v-if="feature?.typeId == 26">            
                            <input  v-model="input"  type="text" class="border block w-full">
                            <button @click="pushTolist(null,feature?.id,input)"  
                            class="btn bg-green-500 mx-auto mt-3 text-white p-2 border border-bg-rose-500rounded 
                            w-1/2 flex items-center justify-center"
                              >  افزودن به لیست    </button>       
                          </div>
                           <!-- ///        -->
                          <div v-if="feature?.typeId == 27">
                            <RichEditor v-model="textArea"  type="text" class="border block w-full" />
                            <button @click="pushTolist(null,feature?.id,textArea)"  
                            class="btn bg-green-500 mx-auto mt-3 text-white p-2 border border-bg-rose-500rounded 
                            w-1/2 flex items-center justify-center"
                              >افزودن به لیست    </button>       
                          </div>
                        
                        </div>
                                <!-- <button v-if="feature?.typeId == 26 " @click="pushTolist(null,feature?.id,input)"  class="btn bg-rose-500 mx-auto mt-3 text-white p-2 border border-rosebg-rose-500 rounded w-1/2 flex items-center justify-center"
                      >
                    
                    {{ $t('add') }}
                    </button>   -->

                        </div>
                          
                        <Paging class="w-full" :pageCount="parseInt(allDetails?.totalCount / allDetails?.pageSize) + 1" :pageIndex="allDetails?.pageIndex"
                    @getPageNummber="(n) => { defaultData.PageIndex = n; pageLoader(); }"></Paging>
                        
                    </div>
    <!-- <button  @click="submitInfo()"  class="btn bg-[#136b57] mt-5 text-white p-2 border border-[#136b57] rounded w-full flex items-center justify-center"
      >
    
    {{ $t('confirm') }}
    </button>  -->
      </div>
      
    </div>
    
</template>

<script setup>
const allData = ref()
const route = useRoute();
const defaultData = ref({
    CategoryId: route.query.catId,
    CategoryLabel: "",
    Q: null,
    PageIndex: 1,
    SortBy: 0,
    Available: true
})
const productFeaturesList =ref();
const input=ref('')
const textArea=ref('')
const mainProductValue = ref(
    {
  "productId": route.query.prId,
  "productFeatures": []
}

)
const pushTolist = (featureItemId,featureId,name,isText=true)=>{
  let index=mainProductValue.value.productFeatures.findIndex(item=>item.featureId==featureId && item.featureItemId==featureItemId)
   if(index==-1){
    mainProductValue.value.productFeatures.push({
        "name": name,
      "productId": route.query.prId,
      "featureItemId": featureItemId,
      "featureId": featureId
    })}
    else{
      if(isText){
        mainProductValue.value.productFeatures[index].name=name
      }else{
        mainProductValue.value.productFeatures.splice(index,1)
      }
    }
    if(isText)
    submitInfo()
}

onMounted(() => {
    pageLoader();
    getProductFeature();
    
})
const getProductFeature = async () => {
 
 try {
    

     const response = await $fetch('/api/productFeature/productFeature', {
         method: 'GET',
        
         query: {
             id:route.query.prId
         }
     })


    //  allData.value = response
    //  lastIndex.value = response.data[response.data.length - 1].id

     productFeaturesList.value = response;
    //  ;
    let list=[]
    let temp =(response.list || []).forEach(item=>{
      // if(item.typeId==39){
        item.productFeatureValues.forEach(el=>{
          list.push({featureId:item.id,name:el.name,featureItemId:el.featureItem?.id ||null })
        })
      // }
    })
    mainProductValue.value.productFeatures=list

 } catch (error) {
     ;
     // navigateTo("/login")
 }

}
const pageLoader = async () => {
 
 try {
     const headers = useRequestHeaders(['cookie'])

     const response = await $fetch('/api/categoryFeature/categoryFeature', {
         method: 'GET',
         headers,
         query: {
             catId:route.query.catId
         }
     })


     allData.value = response
    //  lastIndex.value = response.data[response.data.length - 1].id
     ;
     ;
    //  ;

 } catch (error) {

     ;
     // navigateTo("/login")
 }

}
const submitInfo = async() => {
    try {
      const headers = useRequestHeaders(["cookie"]);
      const insert = await $fetch("/api/productFeature/productFeature", {
        method: "PUT",
        body: mainProductValue.value,
        headers: {
          Accept: "application/json",
        },
      });

    
      ;
      if(insert.isSuccess){
        input.value=''
        textArea.value=''
        closeallacardeon()
        getProductFeature()
      }
    } catch (error) {
      ;
    } 
};
const isOpen = ref()
const acardeonHandler = (event) => {
  let isOpen = true;
  // ;
  const parent = event.target.closest(".acardeon ");
  const classList = parent.children[1].classList;
  closeallacardeon()
  for (let index = 0; index < classList.length; index++) {
    const element = classList[index];
    if (element == "hidden") {
      isOpen = false;
    } else {
      isOpen = true;
    }
  }
  if (isOpen == false) {
    parent.children[1].classList.remove("hidden");
  } else {
    parent.children[1].classList.add("hidden");
  }
};

function closeallacardeon(){
  let acareonList = document.querySelectorAll(".acardeon")
  acareonList.forEach(element => {
    element.children[1].classList.add('hidden')
  });
}

</script>

<style>

.childs li:last-child span{
    display: none;
}

</style>