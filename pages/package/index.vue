
<template>
  <div class=" p-6 sm:p-10 space-y-6">
  <UCard>
      <template #header>
          <div class="flex justify-between">
            <p>
مدیریت اشتراک ها</p>
            <div
              class="flex justify-end gap-2"
            >
            <UButton
            icon="i-heroicons-document-chart-bar"
            size="sm"
            color="gray"
            square
            variant="solid"
            to="/package/report"
          />
              <UButton
                icon="i-heroicons-plus-small"
                size="sm"
                color="primary"
                square
                variant="solid"
                to="/package/insertnew"
                />
                <!-- @click="newForum" -->
            </div>
          </div>
        </template>

      <UTable   :rows="filter?.list" :columns="columns">            
          <template #actions-data="{ row }">
              <UDropdown :items="Actions(row)">
                  <UButton color="gray" variant="ghost"  icon="i-heroicons-ellipsis-horizontal-20-solid" />
              </UDropdown>
          </template>
          <template #active-data="{ row }">
            <UIcon :class="[row.active ?'text-green-400':'text-red-400','w-8 h-8']" size="lg" :name="row.active?'i-heroicons-check-16-solid':'i-heroicons-x-mark-16-solid'"/> 

          </template>
          <template #isAgency-data="{ row }">
            <UIcon :class="[row.isAgency ?'text-green-400':'text-red-400','w-8 h-8']" size="lg" :name="row.isAgency?'i-heroicons-check-16-solid':'i-heroicons-x-mark-16-solid'"/> 

          </template>
          <template #picture-data="{ row }">
            <img :src="getPicUrl(row.picture,'sm')" @error="setdefault" class="w-24 border rounded aspect-square object-contain" alt="">
          </template>
          <template #finalPrice-data="{ row }">
            <div>
              {{ row.finalPrice?.toLocaleString() }} تومان
            </div>
          </template>
      
      </UTable>
      <FormDelete :route="'/api/package/package'" formTitle="اشتراک" @reload="loadData" :selectedId="selected.id" v-model="openDeleteModal"/> 
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
  </div>
</template>

<script setup >
const {getPicUrl,setdefault}=usePicture()
const isNew=ref(true)
const selected = ref({})
const openFormModal =ref(false)
const openDeleteModal =ref(false)
const toast=useToast()

const columns = [
  {
  key: 'id',
  label: 'شناسه'
  }, 
  
  {
  key: 'picture',
  label: 'عکس'
  }, 

  {
key: 'name',
label: 'نام'
}, 
  {
key: 'finalPrice',
label: ' قیمت نهایی'
}, 

  {
key: 'isAgency',
label: 'مخصوص سرویسکاران '
}, 
  {
key: 'active',
label: 'فعال/غیر فعال'
}, 
 
{
key: 'actions',
}]
const filter=ref({
totalCount:0,
pageIndex:1,
pageSize:15,
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
  label: 'ویرایش',
  icon: 'i-heroicons-pencil-square-20-solid',
  click:() =>navigateTo('/package/insert'+row.id)
}],
[{
    label: 'حذف',
    icon: 'i-heroicons-trash-20-solid',
    click: () => {selected.value=row;openDeleteModal.value=true}
  }],
[{
  label: 'افزودن تخفیف',
  icon: 'i-heroicons-percent-badge',
  click:() =>navigateTo('/discount/insertnew?typeId=42&packageId='+row?.id)
}],
[{
  label: 'لیست تخفیف',
  icon: 'i-heroicons-percent-badge',
  click:() =>navigateTo('/discount?packageId='+row?.id+'&isAvailable='+true)
}],
[{
  label: 'دسته بندی های مرتبط',
  icon: 'i-heroicons-circle-stack',
  click:() =>navigateTo('/categorypackage?id='+row?.id+'&name='+row?.name)
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
    let res =await $fetch('/api/package/packages',{
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


</script>
















