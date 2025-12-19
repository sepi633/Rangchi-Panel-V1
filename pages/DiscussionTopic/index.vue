<template>
    <div class=" p-6 sm:p-10 space-y-6">
    <UCard>
        <template #header>
            <div class="flex justify-between">
              <p>
            تاپیک ها
              </p>
              <div
                class="flex justify-end"
              >
                <UButton
                  icon="i-heroicons-plus-small"
                  size="sm"
                  color="primary"
                  square
                  variant="solid"
                  @click="newTpoic"
                />
              </div>
            </div>
          </template>

        <UTable class="text-wrap"  v-model:sort="sort"  :sort-mode="'manual'" :rows="filter?.list" :columns="columns"  v-model:expand="expand" >      
          <template #expand="{ row }">
            <div class="p-4">
             {{row.content}}
            </div>
          </template>      
            <template #actions-data="{ row }">
                <UDropdown :items="Actions(row)">
                    <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                </UDropdown>
            </template>
            <template #name-data="{row}">
               <div class="whitespace-normal">
                {{ row.name }}
               </div>
            </template>
             <template #createDate-data="{ row }">
            <span>
              {{ row.createDate ? moment(row.createDate).locale('fa').format('YYYY/MM/DD') : '' }}
            </span>
          </template>
      
            <template #active-data="{ row }">
              <UIcon :class="[row.active ?'text-green-400':'text-red-400','w-8 h-8']" size="lg" :name="row.active?'i-heroicons-check-16-solid':'i-heroicons-x-mark-16-solid'"/> 
            </template>
            <template #closed-data="{ row }">
              <UIcon :class="[row.closed ?'text-red-400':'text-green-400','w-8 h-8']" size="lg" :name="row.closed?'i-heroicons-lock-closed':'i-heroicons-lock-open'"/> 
            </template>
            <template #adminConfirm-data="{ row }">
              <UIcon :class="[row.adminConfirm ?'text-green-400':'text-red-400','w-8 h-8']" size="lg" :name="row.adminConfirm?'i-heroicons-check-16-solid':'i-heroicons-x-mark-16-solid'"/> 

            </template>
        </UTable>
        <FormDiscussionTopic  :is-new="isNew" :form-data="selected" v-model="openFormModal" @reload="loadData"/>
        <FormDiscussionTopicConfirm  :form-data="selected" v-model="openConfirmModal" @reload="loadData"/>
        <FormDelete :route="'/api/DiscussionTpoic/DiscussionTpoic'" formTitle="تاپیک" @reload="loadData" :selectedId="selected.id" v-model="openDeleteModal"/> 
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
 import moment from 'jalali-moment'

const isNew=ref(true)
const selected = ref({})
const openFormModal =ref(false)
const openDeleteModal =ref(false)
const toast=useToast()
const expand = ref({
  openedRows: [],
  row: {}
})
const openConfirmModal=ref(false)
const columns = [
    {
  key: 'discussionForum.name',
  label: '  نام تالار'
}, 
    {
  key: 'user.fullName',
  label: ' ایجاد کننده'
}, 
    {
  key: 'name',
  label: 'عنوان'
}, 
{
  key: 'state.name',
  label: 'استان'
}, 
    {
  key: 'city.name',
  label: 'شهر'
}, 
{
key: 'createDate',
label: 'تاریخ',
sortable:true
},
{
  key: 'adminConfirm',
  label: 'تایید مدیر'
},  
    {
  key: 'active',
  label: 'فعال/غیرفعال'
}, 
{
  key: 'closed',
  label: 'بسته/باز'
}, 
{
  key: 'visitCount',
  label: 'تعداد بازدید',
  sortable:true
}, 
{
  key: 'actions',
}]
const filter=ref({
  totalCount:0,
  pageIndex:1,
  pageSize:15,
})
const sort = ref({ column: 'id', direction: 'asc' }) 
const sortBy=computed(()=>{
  if((sort.value.column=='createDate' || sort.value.column=='id') && sort.value.direction== 'asc' ){
    //نزولی جدیدترین
    return 1
  }
  else if((sort.value.column=='createDate'|| sort.value.column=='id')  && sort.value.direction== 'desc'){
    return 2
  }
  else if(sort.value.column=='visitCount' && sort.value.direction== 'desc'){
    return 4
  }
  else if(sort.value.column=='visitCount' && sort.value.direction== 'asc'){
    return 5
  }
  else if(sort.value.column=='priority' && sort.value.direction== 'desc'){
    return 6
  }
  else if(sort.value.column=='priority' && sort.value.direction== 'asc'){
    return 7
  }
  else if(sort.value.column=='price' && sort.value.direction== 'desc'){
    return 8
  }
  else if(sort.value.column=='price' && sort.value.direction== 'asc'){
    return 9
  }
  else if(sort.value.column=='sellCount' && sort.value.direction== 'desc'){
    return 10
  }
  else if(sort.value.column=='sellCount' && sort.value.direction== 'asc'){
    return 11
  }else{
    return 0
  }

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
    click:() => editTpoic(row)
  }],
  [{
    label: 'حذف',
    icon: 'i-heroicons-trash-20-solid',
    click: () => {selected.value=row;openDeleteModal.value=true}
  }],
   [{
    label: 'تایید انتشار',
    icon: 'i-heroicons-trash-20-solid',
    click:()=>publishTopic(row)
  }],
   [{
    label: 'پاسخ ها',
    icon: 'i-heroicons-chat-bubble-oval-left-ellipsis',
    click:()=>navigateTo('/DiscussionAnswer/'+row.id)
  }]
]
// function select (row) {
//     selected.value=(row)
// }
function newTpoic(){
  openFormModal.value=true
  isNew.value=true
  selected.value={}
}
function editTpoic(_item){
  openFormModal.value=true
  isNew.value=false
  selected.value={..._item}
}

function publishTopic(_item){
  openConfirmModal.value=true
  selected.value=_item
}

watch([()=>filter.value.pageIndex,()=>sortBy.value],async ()=>{
  await loadData()
})

async function loadData(){
    try {
      let config=JSON.parse(JSON.stringify(filter.value))
      delete config.list
      config.sortBy=sortBy.value
      console.log(config);
      let res =await $fetch('/api/DiscussionTopic/DiscussionTopics',{
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

