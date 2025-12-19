<template>
  <div class=" p-6 sm:p-10 space-y-6">
    <UCard>
      <template #header>
        <div>
          <p>
            مدیریت ایتم های گالری</p>
          <div class="flex justify-between flex-wrap p-2">
            <!-- <div  class="w-96 min-w-max shrink-0">
              <CategorySelect v-model="filter.categoryId" :parentId="galleryItemscategoryId" :isMulti="false" />
            </div> -->

            <div class="flex justify-end">
              <UButton icon="i-heroicons-plus-small" size="sm" color="primary" square variant="solid"
                :to="`/gallery/Item-${route.params.galleryId}/insertnew`" />
            </div>
          </div>
        </div>
      </template>

      <UTable  v-model:sort="sort"  :sort-mode="'manual'" :rows="filter?.list" :columns="columns">
        <template #actions-data="{ row }">
          <UDropdown :items="Actions(row)">
            <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
          </UDropdown>
        </template>
        <template #active-data="{ row }">
          <UIcon :class="[row.active ? 'text-green-400' : 'text-red-400', 'w-8 h-8']" size="lg"
            :name="row.active ? 'i-heroicons-check-16-solid' : 'i-heroicons-x-mark-16-solid'" />

        </template>
        <template #adminConfirm-data="{ row }">
          <UIcon :class="[row.adminConfirm ? 'text-green-400' : 'text-red-400', 'w-8 h-8']" size="lg"
            :name="row.adminConfirm ? 'i-heroicons-check-16-solid' : 'i-heroicons-x-mark-16-solid'" />

        </template>
        <template #isPremium-data="{ row }">
          <UIcon :class="[row.isPremium ? 'text-green-400' : 'text-red-400', 'w-8 h-8']" size="lg"
            :name="row.isPremium ? 'i-heroicons-check-16-solid' : 'i-heroicons-x-mark-16-solid'" />

        </template>
        <template #picture-data="{ row }">
          <img :src="getPicUrl(row.picture, 'sm')" @error="setdefault"
            class="w-24 border rounded aspect-square object-contain" alt="">
        </template>
        <template #publishDate-data="{ row }">
          <span>
            {{ row.publishDate && row.adminConfirm ? moment(row.publishDate).locale('fa').format('YYYY/MM/DD') : '' }}
          </span>
        </template>
        <template #summary-data="{ row }">
          <div class="max-w-lg whitespace-normal line-clamp-3">
            {{ row.summary
            }}
          </div>
        </template>

      </UTable>
      <FormDelete :route="'/api/galleryItem/galleryItem'" formTitle="گالری ایتم" @reload="loadData" :selectedId="selected.id"
        v-model="openDeleteModal" />
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

          <UPagination v-model="filter.pageIndex" :page-count="filter.pageSize" :total="filter.totalCount" :ui="{
            wrapper: 'flex items-center flex-row-reverse gap-1',
            rounded: '!rounded-full min-w-[32px] justify-center',
            default: {
              activeButton: {
                variant: 'outline'
              }
            }
          }" />
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup>
import moment from 'jalali-moment'
const {
  public: { galleryItemscategoryId },
} = useRuntimeConfig();
const { getPicUrl, setdefault } = usePicture()
const selected = ref({})
const openFormModal = ref(false)
const openDeleteModal = ref(false)
const toast = useToast()
const route=useRoute()
const columns = [
  {
    key: 'id',
    label: 'شناسه',
    sortable: true
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
    key: 'summary',
    label: 'خلاصه'
  },
  {
    key: 'category.name',
    label: 'دسته بندی'
  },

  {
    key: 'priority',
    label: 'اولویت نمایش',
    sortable:true
  },
  {
    key: 'actions',
  }]
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
const filter = ref({
  totalCount: 0,
  pageIndex: 1,
  pageSize: 15,
  Q: "",
  SortBy: 0,
  galleryId:route.params.galleryId
})
const pageFrom = computed(() => {
  return (filter.value.pageIndex - 1) * filter.value.pageSize + 1
})
const pageTo = computed(() => {
  return filter.value.pageIndex * filter.value.pageSize + 1
})
const rows = ref([])
const Actions = (row) => [
  [{
    label: 'ویرایش',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => navigateTo(`/gallery/item-${route.params.galleryId}/insert${row.id}`)
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

watch([() => filter.value.pageIndex,()=>sortBy.value], async () => {
  await loadData()
})

async function loadData() {
  try {
    let config = JSON.parse(JSON.stringify(filter.value))
    delete config.list
    config.sortBy=sortBy.value
  config.galleryId=route.params.galleryId
  console.log(config);
    let res = await $fetch('/api/galleryItem/galleryItems', {
      method: 'GET',
      query: config
    })
    filter.value = res
  } catch (error) {
    console.log(error);

    if (error?.response?._data?.message)
      toast.add({ description: error?.response?._data?.message, title: 'خطا !', color: 'red' });
    else
      toast.add({ description: 'مشکلی پیش آمده است .', title: 'خطا !', color: 'red' })
  }
}

onMounted(() => {
  loadData()
})


</script>
















