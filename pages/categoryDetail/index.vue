
<template>
  <div class=" p-6 sm:p-10 space-y-6">
  <UCard>
      <template #header>
          <div class="flex justify-between">
            <p>
مدیریت سکشن های خودرو</p>
            <div
              class="flex justify-end"
            >
       
            </div>
          </div>
        </template>

      <UTable   :rows="filter?.list" :columns="columns">            
          <template #actions-data="{ row }">
              <UDropdown :items="Actions(row)">
                  <UButton color="gray" variant="ghost"  icon="i-heroicons-ellipsis-horizontal-20-solid" />
              </UDropdown>
          </template>
          <template #isPremium-data="{ row }">
            <UIcon :class="[row.isPremium ?'text-green-400':'text-red-400','w-8 h-8']" size="lg" :name="row.isPremium?'i-heroicons-check-16-solid':'i-heroicons-x-mark-16-solid'"/> 

          </template>
      
      </UTable>
      <template #footer>
        <div class="flex flex-wrap justify-between items-center">
          <div>
            <span class="text-sm leading-5">
              ردیف
              <span class="mx-2 font-bold">{{ pageFrom }}</span>
              تا
              <span class="mx-2 font-bold">{{ pageTo }}</span>
              از
              <span class="mx-2 font-bold">{{ filter.totalCount }}</span>
              مورد
            </span>
          </div>
  
          <UPagination
            v-model="filter.pageIndex"
            :page-count="filter.pageSize"
            :total="filter.totalCount"
            :ui="{
              wrapper: 'flex items-center flex-row-reverse gap-1',
              rounded: '!rounded-full min-w-[32px] justify-center',
              default: {
                activeButton: {
                  variant: 'outline'
                }
              }
            }"
          />
        </div>
      </template>
  </UCard>
  <UModal v-model="openFormModal" prevent-close>
    <UCard class="shadow-md bg-grayPrimary-50 bg-opacity-60">
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
           تغییر وضعیت
          </h3>
          <UIcon
            @click="openFormModal = false"
            name="i-heroicons-x-mark-16-solid"
            class="w-8 h-8 text-gray-400"
          />
        </div>
      </template>
      <UFormGroup label="اشتراکی هست ؟">
        <UCheckbox  v-model="selected.isPremium" />
      </UFormGroup>
      <template #footer>
        <div class="flex items-center gap-4 justify-end">
          <UButton class="px-8" @click="openFormModal = false" color="rose">
            بستن
          </UButton>
          <UButton
            class="px-8"
            @click="submitInfo"
            color="green"
            :loading="loading"
          >
            ثبت
          </UButton>
        </div>
      </template>
</UCard>
</UModal>
  </div>
</template>

<script setup >
const {getPicUrl,setdefault}=usePicture()
const isNew=ref(true)
const selected = ref({})
const openFormModal =ref(false)
const toast=useToast()
const loading=ref(false)
const columns = [
  {
  key: 'id',
  label: 'شناسه'
  }, 

  {
key: 'name',
label: 'نام'
}, 
  {
key: 'isPremium',
label: 'اشتراکی'
}, 

 
{
key: 'actions',
}]
const filter=ref({
totalCount:0,
pageIndex:1,
pageSize:15,
ParentIsNull:true
})
const pageFrom=computed(()=>{
return (filter.value.pageIndex-1)*filter.value.pageSize  +1
})
const pageTo=computed(()=>{
return filter.value.pageIndex*filter.value.pageSize +1
})
const rows = ref([])
const Actions = (row) => [
[{
  label: 'تغییر وضعیت اشتراک',
  icon: 'i-heroicons-pencil-square-20-solid',
  click:() =>{selected.value={...row};openFormModal.value=true}
}],


]
// function select (row) {
//     selected.value=(row)
// }



watch([()=>filter.value.pageIndex],async ()=>{
await loadData()
})

async function loadData(){
  try {
    let config=JSON.parse(JSON.stringify(filter.value))
    delete config.list
    console.log(config);
    let res =await $fetch('/api/categoryDetail/categoryDetails',{
        method:'GET',
        query:config
      })
      filter.value=res
  } catch (error) {
      console.log(error);
      
    if(error?.response?._data?.message)
          toast.add({description:error?.response?._data?.message,title:'خطا !' ,color:'red'});
        else
        toast.add({description:'مشکلی پیش آمده است .',title:'خطا !' ,color:'red'})
      }
}

onMounted(()=>{
  loadData()
})

const submitInfo = async (type) => {
  if(loading.value)
  return 
loading.value=true
    try {
      const res = await $fetch("/api/categoryDetail/categoryDetail", {
        method: "PUT",
        body:selected.value,

      });

      if (res?.isSuccess == true) {
        loadData();
        openFormModal.value = false;
        toast.add({description:"با موفقیت  ثبت شد !",color:'green'});
      } else {
        res?.messages.forEach((element) => {
          toast.add({description:element?.item1,color:'orange'         });
        });
      }
    } catch (error) {
      console.log(error);
      
      toast.add({description:'مشکلی پیش آمده است دوباره امتحان کنید .',color:'red'})

    }
  loading.value=false
}


</script>
















