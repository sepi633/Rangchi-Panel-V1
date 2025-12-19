
<template>
  <div class=" p-6 sm:p-10 space-y-6 ">
  <UCard>
      <template #header>
        <div class="">
        <div class="flex justify-between">
          <p class="">
مدیریت آگهی ها</p>
            <div class="flex items-center gap-2 justify-content-end">
  <UButton
            icon="i-heroicons-document-chart-bar"
            size="sm"
            color="gray"
            square
            variant="solid"
            to="/Advertisement/report"
            />
              <UButton
              icon="i-heroicons-plus-small"
              size="sm"
              color="primary"
              square
              variant="solid"
              to="/Advertisement/insertnew"
              />
            </div>
          <!-- @click="newForum" -->
        </div>
        <div class="flex items-center flex-wrap gap-2">
          <UFormGroup label="جستجو">
            <UInput  placeholder="جستجو ..." v-model="filter.q"/>
          </UFormGroup>
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
          <template #createDate-data="{ row }">
            <span>
              {{ row.createDate ? moment(row.createDate).locale('fa').format('YYYY/MM/DD') : '' }}
            </span>
          </template>
          <template #picture-data="{ row }">
            <img :src="getPicUrl(row.picture,'sm')" @error="setdefault" class="w-24 border rounded aspect-square object-contain" alt="">
          </template>
          <template #expiredDate-data="{ row }">
            <span>
              {{ row.expiredDate ? moment(row.expiredDate).locale('fa').format('YYYY/MM/DD') : '' }}
            </span>
          </template>
      </UTable>
      <FormDelete :route="'/api/Advertisement/Advertisement'" formTitle="آگهی" @reload="loadData" :selectedId="selected.id" v-model="openDeleteModal"/> 
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
import moment from 'jalali-moment';

const {
  public: { showImageBaseUrl, AdvertisementcategoryId,carCategoryId },
} = useRuntimeConfig();
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
key: 'category.name',
label: 'دسته بندی'
},  
  {
key: 'createDate',
label: 'زمان شروع'
}, 
  {
key: 'expiredDate',
label: 'زمان پایان'
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
available:null,
fromDate:null,
toDate:null,
q:null
})
const categoryIds=ref([])
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
  click:() =>navigateTo('/Advertisement/insert'+row.id)
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



watch([()=>filter.value.pageIndex,()=>filter.value.available,()=>filter.value.q,()=>filter.value.fromDate,()=>filter.value.toDate],async ()=>{
await loadData()
})

async function loadData(){
  try {
    let config=JSON.parse(JSON.stringify(filter.value))
    delete config.list

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

onMounted(()=>{
  loadData()
})


</script>



















