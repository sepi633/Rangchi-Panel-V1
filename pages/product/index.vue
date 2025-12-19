
<template>
  <div class=" p-6 sm:p-10 space-y-6 ">
  <UCard>
      <template #header>
          <div class="">
            <p class="">
مدیریت محصولات</p>
        <div class="flex justify-between">
<!-- <CategorySelect class="min-w-96" :parentId="productcategoryId" v-model="categoryIds"/> -->
          <UInput  placeholder="جستجو ..." v-model="filter.q"/>
          <div class="flex justify-end gap-2">
     <!-- <UButton
              icon="i-heroicons-document-chart-bar"
              size="sm"
              color="gray"
              square
              variant="solid"
              to="/product/report"
              /> -->
              <UButton
              icon="i-heroicons-plus-small"
              size="sm"
              color="primary"
              square
              variant="solid"
              to="/product/insertnew"
              />
              <!-- @click="newForum" -->
            </div>
          </div>
        </div>
        
        </template>
{{ sortBy }}
      <UTable    v-model:sort="sort"  :sort-mode="'manual'" :rows="filter?.list" :columns="columns">            
          <template #actions-data="{ row }">
              <UDropdown :items="Actions(row)">
                  <UButton color="gray" variant="ghost"  icon="i-heroicons-ellipsis-horizontal-20-solid" />
              </UDropdown>
          </template>
          <template #active-data="{ row }">
            <UIcon :class="[row.active ?'text-green-400':'text-red-400','w-8 h-8']" size="lg" :name="row.active?'i-heroicons-check-16-solid':'i-heroicons-x-mark-16-solid'"/> 

          </template>
          <template #picture-data="{ row }">
            <img :src="getPicUrl(row.picture,'sm')" @error="setdefault" class="w-24 border rounded aspect-square object-contain" alt="">
          </template>
      
      </UTable>
      <FormDelete :route="'/api/product/product'" formTitle="محصول" @reload="loadData" :selectedId="selected.id" v-model="openDeleteModal"/> 
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
const {
  public: { showImageBaseUrl, productcategoryId,carCategoryId },
} = useRuntimeConfig();
const {getPicUrl,setdefault}=usePicture()
const isNew=ref(true)
const selected = ref({})
const openFormModal =ref(false)
const openDeleteModal =ref(false)
const toast=useToast()
const sort = ref({ column: 'id', direction: 'asc' }) 
const columns = [
  {
  key: 'id',
  label: 'شناسه',
  sortable: true,
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
key: 'label',
label: 'اسلاگ'
}, 
{
key: 'category.name',
label: 'دسته بندی'
}, 
  {
key: 'brand.name',
label: 'برند'
}, 
{
key: 'status.name',
label: 'وضعیت'
}, 
{
key: 'visitCount',
label: 'تعداد بازدید'
, sortable: true,
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
const Actions = (row) => [
[{
  label: 'زبان انگلیسی',
  icon: 'i-heroicons-globe-alt',
  click:() =>navigateTo('/product/enLanguage'+row.id)
}],
[{
  label: 'ویرایش',
  icon: 'i-heroicons-pencil-square-20-solid',
  click:() =>navigateTo('/product/insert'+row.id)
}],
[{
    label: 'حذف',
    icon: 'i-heroicons-trash-20-solid',
    click: () => {selected.value=row;openDeleteModal.value=true}
  }],
[{
  label: 'سایر عکس ها',
  icon: 'i-heroicons-photo-16-solid',
  click:() =>navigateTo(`/product/otherImage`+row?.id)
}],
// [{
//   label: 'ایتم های محصول',
//   icon: 'i-heroicons-list-bullet',
//   click:() =>navigateTo('/productitem/productItem'+row.id+'?isAll='+true)
// }],
[{
  label: 'فیلد های اختصاصی',
  icon: 'i-heroicons-flag-solid',
  click:() =>navigateTo(`/productFeature?catId=${row?.categoryId}&prId=${row?.id}`)
}],
// [{
//   label: 'افزودن تخفیف',
//   icon: 'i-heroicons-percent-badge',
//   click:() =>navigateTo('/discount/insertnew?typeId=43&productId='+row?.id)
// }],
// [{
//   label: 'لیست تخفیف',
//   icon: 'i-heroicons-percent-badge',
//   click:() =>navigateTo('/discount?productId='+row?.id+'&isAvailable='+true)
// }],
//[{
  //label: 'محصولات تکمیل کننده',
 // icon: 'i-heroicons-view-columns',
 // click:() =>navigateTo('/product/complementaryProducts'+row.id)
//}],
[{
  label: 'محصولات مرتبط',
  icon: 'i-heroicons-view-columns-16-solid',
  click:() =>navigateTo(`/product/productRelate${row.id}`)
}],
// [{
//   label: 'ویرایش تنوع محصول',
//   icon: 'i-heroicons-pencil-square',
//   click:() =>navigateTo('/product/editVarity'+row?.id)
// }],
  [{
    label: ' فایل ها',
    icon: 'i-heroicons-folder-16-solid',
    click: () => navigateTo('/product/file' + row.id)
  }],
]
// function select (row) {
//     selected.value=(row)
// }



watch([()=>filter.value.pageIndex,()=>filter.value.q,()=>sortBy.value],async ()=>{
await loadData()
})


async function loadData(){
  try {
    
    let config=JSON.parse(JSON.stringify(filter.value))
    delete config.list
    if(config.categoryCarLabels==null)
    delete config.categoryCarLabels
    if(config.categoryCarIds==null)
    delete config.categoryCarIds
    if(config.categoryIds==null)
    delete config.categoryIds
    if(config.categoryLabels==null)
    delete config.categoryLabels
    console.log(config)
    config.sortBy=sortBy.value
    let res =await $fetch('/api/product/products',{
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















