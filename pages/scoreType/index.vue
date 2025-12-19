<template>
  <div class=" p-6 sm:p-10 space-y-6">
    <UCard>
      <template #header>
        <div>
          <p>
            مدیریت انواع امتیازات</p>
          <div class="flex justify-between flex-wrap p-2">
            <div  class="w-96 min-w-max shrink-0">
              <!-- <CategorySelect v-model="filter.categoryId" :parentId="scoreTypecategoryId" :isMulti="false" /> -->
            </div>

            <!-- <div class="flex justify-end">
              <UButton icon="i-heroicons-plus-small" size="sm" color="primary" square variant="solid"
                to="/scoreType/insertnew" />
            </div> -->
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
      <FormDelete :route="'/api/scoreType/scoreType'" formTitle="بانک" @reload="loadData" :selectedId="selected.id"
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
      <UModal v-model="openFormModal">
        <UCard>
           <template #header>
                    <div class="flex items-center justify-between">
                      <h3
                        class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                      >
                        تغییر امتیاز
                      </h3>
                      <UIcon
                        @click="openFormModal = false"
                        name="i-heroicons-x-mark-16-solid"
                        class="w-8 h-8 text-gray-400"
                      />
                    </div>
                  </template>
          <UInput type="number"  v-model="selected.amount"/>
          <template #footer>
              <div class="flex items-center gap-4 justify-end ">
                        <UButton class="px-8" @click="openFormModal = false" color="rose">
                          لغو
                        </UButton>
                        <UButton
                          class="px-8"
                          @click="submit"
                          color="green"
                          :loading="loading"
                        >
                          ثبت
                        </UButton>
                      </div>
          </template>
        </UCard>

      </UModal>
    </UCard>
  </div>
</template>

<script setup>

const { getPicUrl, setdefault } = usePicture()
const selected = ref({})
const openFormModal = ref(false)
const openDeleteModal = ref(false)
const toast = useToast()

const columns = [
  {
    key: 'id',
    label: 'شناسه',
    sortable: true
  },

  {
    key: 'name',
    label: 'نام'
  },
  {
    key: 'amount',
    label: 'امتیاز'
  },
  {
    key: 'actions',
  }]
  const sort = ref({ column: 'id', direction: 'asc' }) 

const filter = ref({
  totalCount: 0,
  pageIndex: 1,
  pageSize: 15,
  Publish: null,
  Hashtags: "",
  categoryId: null,
  Active: null,
  AdminConfirm: null,
  Q: "",
  SortBy: 0,
  allAdminConfirm: null,
})
const {sortBy,pageFrom,pageTo,loadData}=useTable('/api/scoreType/scoreTypes',sort,filter)

const rows = ref([])
const Actions = (row) => [
  [{
    label: 'ویرایش',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () =>{selected.value=row;openFormModal.value=true}
  }],
  // [{
  //   label: 'حذف',
  //   icon: 'i-heroicons-trash-20-solid',
  //   click: () => {selected.value=row;openDeleteModal.value=true}
  // }],
]
// function select (row) {
//     selected.value=(row)
// }

watch([() => filter.value.pageIndex,()=>filter.value.categoryId,()=>sortBy.value], async () => {
 filter.value= await loadData()
})

onMounted(async() => {
  filter.value=await loadData()
})


const loading=ref(false)
async function submit(){
if (loading.value) return;
    else {
      loading.value = true;
  
      try {
        let res = await $fetch("/api/scoreType/scoreType", {
          method:  "PUT",
          body: selected.value,
        });
        if (res.isSuccess) {
          toast.add({
            description: " عملیات با موفقیت انجام شد .",
            color: "green",
          });
          openFormModal.value = false;
           filter.value=await loadData()
        } else {
          res.messages.forEach((el) => {
            toast.add({ description: el.item1, color: "red" });
          });
        }
      } catch (error) {
        toast.add({
          description: "مشکلی پیش آمده است .",
          title: "خطا !",
          color: "red",
        });
      }
      loading.value = false;
    }
}
</script>















