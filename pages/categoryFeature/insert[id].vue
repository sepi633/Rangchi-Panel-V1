<template>
    <div class="p-6 sm:p-10 space-y-6">
        <div class="flex flex-wrap">
            <div class="lg:w-3/12 w-1/2 p-1 ">
            <NuxtLink class="bg-white rounded p-2 border flex justify-center items-center min-h-[100px] cursor-pointer" to="/Feature/insertnew">
                <svg data-v-e838505d="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-e838505d="" fill-rule="evenodd" clip-rule="evenodd" d="M12 4C12.2652 4 12.5196 4.10536 12.7071 4.29289C12.8946 4.48043 13 4.73478 13 5V11H19C19.2652 11 19.5196 11.1054 19.7071 11.2929C19.8946 11.4804 20 11.7348 20 12C20 12.2652 19.8946 12.5196 19.7071 12.7071C19.5196 12.8946 19.2652 13 19 13H13V19C13 19.2652 12.8946 19.5196 12.7071 19.7071C12.5196 19.8946 12.2652 20 12 20C11.7348 20 11.4804 19.8946 11.2929 19.7071C11.1054 19.5196 11 19.2652 11 19V13H5C4.73478 13 4.48043 12.8946 4.29289 12.7071C4.10536 12.5196 4 12.2652 4 12C4 11.7348 4.10536 11.4804 4.29289 11.2929C4.48043 11.1054 4.73478 11 5 11H11V5C11 4.73478 11.1054 4.48043 11.2929 4.29289C11.4804 4.10536 11.7348 4 12 4Z" fill="black" style="fill: #1f2937;"></path></svg>

                <span>
                    
                    {{ $t('addNewItem') }}
                </span>

            </NuxtLink>
        </div>
        <div class="lg:w-3/12 w-1/2 p-1 " v-for="item in allData?.data" :key="item?.id" :title="item?.name">
            <div class="bg-white rounded p-2 border flex flex-col h-full justify-between items-center min-h-[100px] item-box">
                <strong class="text-[18px]"> {{$t('CategoryName')}} : {{ item?.name }}</strong>
                <br>
                <ul class="list-disc w-full list-inside h-100" v-if="item?.features.length > 0">
                        <li v-for="feature in item?.features">{{ feature?.name }}</li>
                </ul>
                <div v-else class="mt-2 text-[17px] text-[red] ">
                    {{ $t('Thiscategoryhasnofeatures') }}
                </div>
               
                <div @click="()=>{showModal=true;getFeaturs()}" v-if="lastIndex == item?.id"   class="cursor-pointer mt-2 w-full text-center text-[17px] bg-[#1f2937] text-[#eee] p-1 rounded">
                    {{ $t('Addfeaturetocategory') }}
                </div>
               <div v-if="showModal == true" class="fixed w-full h-full inset-0 bg-[#00000063]">
                    <div class="max-w-[600px] bg-white m-auto p-2 my-[20px] rounded">
                            
                            <div class="flex justify-between items-center">
                                 <p>  {{ $t('Addfeaturetocategory') }}</p>
                                <nuxt-link class="bg-[#1f2937] text-[#eee] rounded p-1" to="/Feature/insertnew">{{ $t('addFeature') }}</nuxt-link>
                            </div>
                            <ul class="flex flex-wrap mt-5 max-h-[300px] overflow-auto">
                                <li v-for="item in featureList" @click="(e)=>{pushFeature(item);e.target.classList.toggle('bg-green-400')}"  :class="[' relative cursor-pointer border w-max p-1 min-w-[100px] flex justify-center m-1 rounded',currentfeature.includes(item.id)?'bg-green-400':'' ]" >
                                   <!-- <div :id='`icon-${item?.id}`' class=" flex top-[-20px] left-[-2px] absolute items-center rounded-[50%]  justify-center bg-[#1f2937] w-[30px] h-[30px]"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" class="bi bi-check-lg" viewBox="0 0 16 16">
  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
</svg></div> -->
     
                                  {{ item?.name }}
                                    
                                </li>
                            </ul>
                            <div class="flex items-center mt-3">
                                <div @click="submitInfo()" class="text-[18px] me-auto cursor-pointer flex justify-center text-white rounded p-1 bg-[#136b57]   w-[48%]">
                               
                             {{ $t('confirm') }}
                                </div>
                                <div @click="()=>{showModal=false}" class="cursor-pointer text-[18px] me-auto flex justify-center bg-[#333] text-white p-1 w-[48%]">
                               
                               
                               بستن
                                </div>
                            </div>
                            
                    </div>
               </div>
                
                <!-- <div class="bg-[#1f2937] w-full mt-3 rounded flex p-1 justify-around">
                       
                            <NuxtLink class="flex text-white" :to="`/Features/insert${item?.id}`">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-e838505d=""><path fill-rule="evenodd" clip-rule="evenodd" d="M21.121 2.707C20.5584 2.14459 19.7955 1.82864 19 1.82864C18.2045 1.82864 17.4416 2.14459 16.879 2.707L15.199 4.387L7.293 12.293C7.16494 12.421 7.07404 12.5814 7.03 12.757L6.03 16.757C5.98803 16.9246 5.99018 17.1002 6.03626 17.2667C6.08234 17.4332 6.17077 17.5849 6.29293 17.7071C6.41509 17.8292 6.56681 17.9177 6.73331 17.9637C6.89982 18.0098 7.07542 18.012 7.243 17.97L11.243 16.97C11.4186 16.926 11.579 16.8351 11.707 16.707L19.556 8.859L21.293 7.121C21.8554 6.55842 22.1714 5.7955 22.1714 5C22.1714 4.20451 21.8554 3.44159 21.293 2.879L21.121 2.707ZM18.293 4.121C18.4805 3.93353 18.7348 3.82822 19 3.82822C19.2652 3.82822 19.5195 3.93353 19.707 4.121L19.879 4.293C20.0665 4.48053 20.1718 4.73484 20.1718 5C20.1718 5.26517 20.0665 5.51948 19.879 5.707L18.862 6.724L17.307 5.107L18.293 4.121ZM15.893 6.521L17.448 8.138L10.488 15.097L8.374 15.626L8.903 13.511L15.893 6.521ZM4 8C4 7.73479 4.10536 7.48043 4.29289 7.2929C4.48043 7.10536 4.73478 7 5 7H10C10.2652 7 10.5196 6.89465 10.7071 6.70711C10.8946 6.51957 11 6.26522 11 6C11 5.73479 10.8946 5.48043 10.7071 5.2929C10.5196 5.10536 10.2652 5 10 5H5C4.20435 5 3.44129 5.31607 2.87868 5.87868C2.31607 6.44129 2 7.20435 2 8V19C2 19.7957 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H16C16.7956 22 17.5587 21.6839 18.1213 21.1213C18.6839 20.5587 19 19.7957 19 19V14C19 13.7348 18.8946 13.4804 18.7071 13.2929C18.5196 13.1054 18.2652 13 18 13C17.7348 13 17.4804 13.1054 17.2929 13.2929C17.1054 13.4804 17 13.7348 17 14V19C17 19.2652 16.8946 19.5196 16.7071 19.7071C16.5196 19.8946 16.2652 20 16 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V8Z" fill="black" data-v-e838505d="" style="fill: #fff;"></path></svg>
                                {{ $t('edite') }}
                        </NuxtLink>

                            <button class="flex text-white " @click="deleteItem(item?.id)">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-e838505d="" style="fill: #fff;"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 5C9 4.46957 9.21071 3.96086 9.58579 3.58579C9.96086 3.21071 10.4696 3 11 3H13C13.5304 3 14.0391 3.21071 14.4142 3.58579C14.7893 3.96086 15 4.46957 15 5V6H19C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7C20 7.26522 19.8946 7.51957 19.7071 7.70711C19.5196 7.89464 19.2652 8 19 8H18V18C18 18.7956 17.6839 19.5587 17.1213 20.1213C16.5587 20.6839 15.7956 21 15 21H9C8.20435 21 7.44129 20.6839 6.87868 20.1213C6.31607 19.5587 6 18.7956 6 18V8H5C4.73478 8 4.48043 7.89464 4.29289 7.70711C4.10536 7.51957 4 7.26522 4 7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H9V5ZM10 8H8V18C8 18.2652 8.10536 18.5196 8.29289 18.7071C8.48043 18.8946 8.73478 19 9 19H15C15.2652 19 15.5196 18.8946 15.7071 18.7071C15.8946 18.5196 16 18.2652 16 18V8H10ZM13 6H11V5H13V6ZM10 9C10.2652 9 10.5196 9.10536 10.7071 9.29289C10.8946 9.48043 11 9.73478 11 10V17C11 17.2652 10.8946 17.5196 10.7071 17.7071C10.5196 17.8946 10.2652 18 10 18C9.73478 18 9.48043 17.8946 9.29289 17.7071C9.10536 17.5196 9 17.2652 9 17V10C9 9.73478 9.10536 9.48043 9.29289 9.29289C9.48043 9.10536 9.73478 9 10 9ZM14 9C14.2652 9 14.5196 9.10536 14.7071 9.29289C14.8946 9.48043 15 9.73478 15 10V17C15 17.2652 14.8946 17.5196 14.7071 17.7071C14.5196 17.8946 14.2652 18 14 18C13.7348 18 13.4804 17.8946 13.2929 17.7071C13.1054 17.5196 13 17.2652 13 17V10C13 9.73478 13.1054 9.48043 13.2929 9.29289C13.4804 9.10536 13.7348 9 14 9Z" fill="black" data-v-e838505d="" style="fill: #fff;"></path></svg>
                            {{ $t('Delete') }}
                        </button>
                </div> -->

            </div>
        </div>
<!--        
        <Paging class="w-full" :pageCount="parseInt(allDetails?.totalCount / allDetails?.pageSize) + 1" :pageIndex="allDetails?.pageIndex"
    @getPageNummber="(n) => { defaultData.PageIndex = n; pageLoader(); }"></Paging> -->
        
    </div>
    </div>
        
</template>

<script setup>

const currentfeature=ref([])
const route = useRoute()
const allData = ref()
const lastIndex=ref()
const showModal=ref(false)
const featureList=ref()

let parentsfeature=ref([])
const defaultData = ref({
    CategoryId: null,
    CategoryLabel: "",
    Q: null,
    PageIndex: 1,
    PageSize: 50,
    SortBy: 0,
    Available: true
})
const selectedFeature=ref([])
onMounted(() => {
    pageLoader()
})
const pageLoader = async () => {
 
    try {
        const headers = useRequestHeaders(['cookie'])

        const response = await $fetch('/api/categoryFeature/categoryFeature', {
            method: 'GET',
            headers,
            query: {
                catId:route.params.id
            }
        })

        if(response.isSuccess){
            allData.value =JSON.parse(JSON.stringify(response))
            lastIndex.value = response.data[response.data.length - 1].id
            response.data?.forEach(item=>{
                if(item.id==route.params.id){
                    selectedFeature.value=item.features
                    currentfeature.value=item.features.map(item=>item.id)
                }
            else{
                parentsfeature.value.push(...item.features.map(item=>item.id))
            }
            }
        )}
    } catch (error) {

        ;
        // navigateTo("/login")
    }

}
const getFeaturs = async () => {
    ;
    try {
        const headers = useRequestHeaders(['cookie'])

        const res = await $fetch('/api/feature/features', {
            method: 'GET',
            headers,
            query: defaultData.value
        })
        
        featureList.value = (res.list || []).filter(item=>!parentsfeature.value.includes(item.id))

    } catch (error) {

        ;
        // navigateTo("/login")
    }

}
const pushFeature = (item)=>{
    const index = selectedFeature.value.findIndex(el=>el.id == item.id)
    if(index==-1){
        selectedFeature.value.push(item);
    }
    else{
        selectedFeature.value.splice(index,1)
    }
}
const submitInfo = async () => {
    // ;
    try {
        const headers = useRequestHeaders(['cookie'])

        const response = await $fetch('/api/categoryFeature/categoryFeature', {
            method: 'post',
            headers,
            body:{
                id:route.params.id,
                features:selectedFeature.value
            }
        })


        // featureList.value = data
        ;
        ;
        if(response.isSuccess){
            showModal.value = false
            await pageLoader()
        }
    } catch (error) {

        ;
        // navigateTo("/login")
    }

}
const deleteItem = async (itemId) => {
  try {
    const headers = useRequestHeaders(['cookie'])

    const data = await $fetch('/api/feature/feature', {
      method: 'DELETE',
      headers,
      query:{
        id: itemId
      }
    })


    ;
    pageLoader()

  } catch (error) {

    ;
  
  }

}
</script>

