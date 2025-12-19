
<template>
    <div class="p-8">
<UCard>
    <template #header>
        <div class="flex gap-4">

                <UFormGroup class="flex-1 " label="خودرو " name="name">
                <CategorySelect :parentId="carCategoryId" v-model="categoryId" />
            </UFormGroup>
        <UFormGroup class="flex-1  flex gap-1" label="از تاریخ">
          <div class="flex">
  
            <date-picker locale="fa" type="dateTime" v-model="fromDate" ></date-picker>
            <UIcon
            @click="fromDate=null"
            name="i-heroicons-x-mark-16-solid"
            class="w-4 h-4 text-red-500"
            />
          </div>
        </UFormGroup>
        <UFormGroup class="flex-1  flex gap-1" label="تا تاریخ">
          <div class="flex">
  
            <date-picker locale="fa" type="dateTime" v-model="toDate" ></date-picker>
            <UIcon
            name="i-heroicons-x-mark-16-solid"
            class="w-4 h-4 text-red-500"
            @click="toDate=null"
            />
          </div>
        </UFormGroup>
        </div>
    </template>

    <div>
        <div class="flex gap-4">
            <div class="font-bold text-lg" >
تعداد پیام های خوانده نشده            </div> : 
            <div>
                {{ unreadCount }}
            </div>

        </div>
        <div class="flex gap-4">
            <div class="font-bold text-lg" >
تعداد پیام های خوانده تایید شده            </div> : 
            <div>
                {{ successCount }}
            </div>

        </div>
        <div class="flex gap-4">
            <div class="font-bold text-lg" >
تعداد پیام های خوانده رد شده            </div> : 
            <div>
                {{ rejectCount }}
            </div>

        </div>
    </div>
</UCard>
</div>
</template>
<script setup>
const {public:{carCategoryId}}=useRuntimeConfig()
const fromDate=ref()
const toDate=ref()
const categoryId=ref()
const unreadCount=ref(0)
const successCount=ref(0)
const rejectCount=ref(0)
watch([()=>fromDate.value,()=>toDate.value,()=>categoryId.value],async ()=>{
await loadData1()
await loadData2()
await loadData3()
})

async function loadData1(){
  try {

    let res =await $fetch('/api/categoryComment/comments',{
        method:'GET',
        query:{
            FromCreateDate:fromDate.value,
            ToCreateDate:toDate.value,
            CategoryId:categoryId.value,
            status:0
        }
      })
      unreadCount.value=res?.totalCount
  } catch (error) {
      console.log(error);
      
    if(error?.response?._data?.message)
          toast.add({description:error?.response?._data?.message,title:'خطا !' ,color:'red'});
        else
        toast.add({description:'مشکلی پیش آمده است .',title:'خطا !' ,color:'red'})
      }
}
async function loadData2(){
  try {

    let res =await $fetch('/api/categoryComment/comments',{
        method:'GET',
        query:{
            FromUpdateDate:fromDate.value,
            ToUpdateDate:toDate.value,
            CategoryId:categoryId.value,
            status:1
        }
      })
      successCount.value=res?.totalCount
  } catch (error) {
      console.log(error);
      
    if(error?.response?._data?.message)
          toast.add({description:error?.response?._data?.message,title:'خطا !' ,color:'red'});
        else
        toast.add({description:'مشکلی پیش آمده است .',title:'خطا !' ,color:'red'})
      }
}
async function loadData3(){
  try {

    let res =await $fetch('/api/categoryComment/comments',{
        method:'GET',
        query:{
                 FromUpdateDate:fromDate.value,
            ToUpdateDate:toDate.value,
            CategoryId:categoryId.value,
            status:2
        }
      })
      rejectCount.value=res?.totalCount
  } catch (error) {
      console.log(error);
      
    if(error?.response?._data?.message)
          toast.add({description:error?.response?._data?.message,title:'خطا !' ,color:'red'});
        else
        toast.add({description:'مشکلی پیش آمده است .',title:'خطا !' ,color:'red'})
      }
}

</script>