<template>
    <div class=" p-6 sm:p-10 space-y-6">
    <UCard>
        <template #header>
            <div class="">
              <p class="mb-3 font-semibold">
  مدیریت سال ها</p>
              <div
                class="flex justify-between"
              >
              <div class="flex gap-2 flex-wrap">

            </div>
                <UButton
                  icon="i-heroicons-plus-small"
                  size="sm"
                  color="primary"
                  square
                  variant="solid"
                  @click="newForum"
                />
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
        
        </UTable>
        <FormYear  :is-new="isNew"  :form-data="selected" v-model="openFormModal" @reload="loadData"/>
        <FormDelete :route="'/api/year/year'" formTitle="سال" @reload="loadData" :selectedId="selected.id" v-model="openDeleteModal"/> 
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
const filter=ref({
  totalCount:0,
  pageIndex:1,
  pageSize:15,
})

const isNew=ref(true)
const selected = ref({})
const openFormModal =ref(false)
const openDeleteModal =ref(false)
const toast=useToast()

const columns = [
  {
    key: 'nameEn',
    label: 'سال میلادی'
  }, 
  {
    key: 'nameFa',
    label: 'سال فارسی'
  },  

{
  key: 'actions',
}]
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
    click:() => editForum(row)
  }],
  [{
    label: 'حذف',
    icon: 'i-heroicons-trash-20-solid',
    click: () => {selected.value=row;openDeleteModal.value=true}
  }],

]
// function select (row) {
//     selected.value=(row)
// }
function newForum(){
  openFormModal.value=true
  isNew.value=true
  selected.value={}
}
function editForum(_item){
  openFormModal.value=true
  isNew.value=false
  selected.value={..._item}
}


watch([()=>filter.value.pageIndex+filter.value.stateId+filter.value.cityId],async ()=>{
  await loadData()
})

async function loadData(){
    try {
      let config=JSON.parse(JSON.stringify(filter.value))
      delete config.list
      console.log(config);
      let res =await $fetch('/api/year/years',{
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

