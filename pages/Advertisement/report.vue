
<template>
    <div class="p-8">
<UCard>
    <template #header>
        <div class="flex gap-4">
           <UFormGroup class="flex-1" label="وضعیت">
            <USelect v-model="filter.available" :options="[{name:'همه',value:null},{name:'غیرفعال',value:false},{name:'فعال',value:true}]" option-attribute="name" value-attribute="value">
            </USelect>
          </UFormGroup>
          <UFormGroup class="flex-1 flex gap-1" label="از تاریخ">
            <div class="flex gap-1">

              <date-picker locale="fa" type="date" v-model="filter.fromDate" ></date-picker>
              <UIcon
              @click="filter.fromDate=null"
              name="i-heroicons-x-mark-16-solid"
              class="w-4 h-4 text-red-500"
              />
            </div>
          </UFormGroup>
          <UFormGroup class="flex-1 flex gap-1" label="تا تاریخ">
            <div class="flex gap-1">
              <date-picker locale="fa" type="date" v-model="filter.toDate" ></date-picker>
              <UIcon
              name="i-heroicons-x-mark-16-solid"
              class="w-4 h-4 text-red-500"
              @click="filter.toDate=null"
              />
            </div>
          </UFormGroup>
       
        </div>
    </template>

    <div>
        <div class="flex gap-4">
            <div class="font-bold text-lg" >
تعداد اگهی            </div> : 
            <div>
                {{ filter?.totalCount }}
            </div>
        </div>
    </div>
</UCard>
</div>
</template>
<script setup>
const filter=ref({
totalCount:0,
pageIndex:1,
pageSize:15,
available:null,
fromDate:null,
toDate:null,
})

watch([()=>filter.value.pageIndex,()=>filter.value.available,()=>filter.value.q,()=>filter.value.fromDate,()=>filter.value.toDate],async ()=>{
await loadData()
})

async function loadData(){
  try {
    let config=JSON.parse(JSON.stringify(filter.value))
    delete config.list
    console.log(config);
    let res =await $fetch('/api/Advertisement/Advertisements',{
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

</script>