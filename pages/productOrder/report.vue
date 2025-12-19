
<template>
    <div class="p-8">
<UCard>
    <template #header>
        <div class="flex gap-4">
           <UFormGroup class="" label="وضعیت">
          <USelect v-model="filter.ProductOrderStatusEnum" :options="[{name:'همه',value:null},{name:'سفارش ثبت شده',value:0},{name:' در حال بررسی',value:1},{name:'ارسال به مشتری',value:2},{name:'تحویل به مشتری',value:3}]" option-attribute="name" value-attribute="value">
          </USelect>
        </UFormGroup>
        <UFormGroup class="" label="مالی">
          <USelect v-model="filter.isPaid" :options="[{name:'همه',value:null},{name:'پرداخت شده',value:true},{name:'پرداخت نشده',value:false}]" option-attribute="name" value-attribute="value">
          </USelect>
        </UFormGroup>
        <UFormGroup class=" flex gap-1" label="از تاریخ">
          <div class="flex">
  
            <date-picker locale="fa" type="date" v-model="filter.fromDate" ></date-picker>
            <UIcon
            @click="filter.fromDate=null"
            name="i-heroicons-x-mark-16-solid"
            class="w-4 h-4 text-red-500"
            />
          </div>
        </UFormGroup>
        <UFormGroup class=" flex gap-1" label="تا تاریخ">
          <div class="flex">
  
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
تعداد سفارشات            </div> : 
            <div>
                {{ filter?.totalCount }}
            </div>
            <!-- <div class="font-bold text-lg" >
                بیشترین بازدید          </div> : 
            <div>
                {{  }}
            </div> -->
        </div>
    </div>
</UCard>
</div>
</template>
<script setup>
const { public: { carCategoryId } } = useRuntimeConfig()
const filter=ref({
totalCount:0,
pageIndex:1,
pageSize:15,
fromDate:null,
toDate:null,
ProductOrderStatusEnum:null,
isPaid:null,
q:null,
})

watch([()=>filter.value.pageIndex,()=>filter.value.isPaid,()=>filter.value.q,()=>filter.value.ProductOrderStatusEnum,()=>filter.value.fromDate,()=>filter.value.toDate],async ()=>{
await loadData()
})

async function loadData(){
  try {
    let config=JSON.parse(JSON.stringify(filter.value))
    delete config.list
    console.log(config);
    let res =await $fetch('/api/orders/orders',{
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