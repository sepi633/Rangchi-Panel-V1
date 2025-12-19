<template>
  <div>

    <UModal v-model="isOpen" prevent-close fullscreen="">
      <UCard class="shadow-md bg-grayPrimary-50 bg-opacity-60">
        <template #header>
          <div class="flex items-center justify-between">
            <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
          لیست پاسخ ها
          </h3>
          <!-- <div class="flex gap-4">

            <UButton icon="i-heroicons-plus-small" size="sm" color="primary" square variant="solid"
           @click="isNew=true;resetselected();openFormModal=true" />
            <UIcon
            @click="isOpen = false"
            name="i-heroicons-x-mark-16-solid"
            class="w-8 h-8 text-gray-400"
            />
          </div> -->
        </div>
      </template>

         <UTable  v-model:sort="sort"  :sort-mode="'manual'" v-model:expand="expand"  :rows="filter?.list" :columns="columns">
            <template #actions-data="{ row }">
              <UDropdown :items="Actions(row)">
                <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
              </UDropdown>
            </template>  
            
             <template #expand="{ row }">
      <div class="p-4">
      <div v-for="el in row?.requestForm?.questionForms" class=" flex gap-2 flex-wrap">
                <div >
                    <p class=" font-bold lg:text-lg text-base">{{ el?.name }} :</p>
                </div>
                <div v-for="element in row?.answerOptions">
                        <p v-if="el?.id == element?.questionformLabel">{{ element?.value?.split('-').join(' - ') }}</p>
                </div>
               
            </div>
      </div>
    </template>
          </UTable>
       <UPagination v-model="filter.pageIndex" :page-count="filter.pageSize" :total="filter.totalCount" :ui="{
            wrapper: 'flex items-center flex-row-reverse gap-1',
            rounded: '!rounded-full min-w-[32px] justify-center',
            default: {
              activeButton: {
                variant: 'outline'
              }
            }
          }" />
         
    </UCard>
  </UModal>
</div>
</template>
<script setup>

const localData = ref({ required: false });
const isOpen = defineModel();
const expand = ref({
  openedRows: [],
  row: {}
})
const props = defineProps(["formLabel"]);
const toast = useToast();
const isNew=ref(true)

const loading = ref(false);
const emit = defineEmits(["reload"]);


  const sort = ref({ column: 'id', direction: 'asc' }) 
const columns = [
  {
    key: 'id',
    label: 'شناسه',
    sortable: true
  },
  {
    key: 'user?.fullName',
    label: 'کاربر'
  },
  {
    key: 'requestForm.label',
    label: 'فرم'
  },

  // {
  //   key: 'priority',
  //   label: 'اولویت نمایش',
  //   sortable:true
  // },
  // {
  //   key: 'actions',
  // }
]


const filter = ref({
  totalCount: 0,
  pageIndex: 1,
  pageSize: 15,
  Q: "",
  SortBy: 0,
  RequestformLabel:props.formLabel
})


const {sortBy,pageFrom,pageTo,loadData}=useTable('/api/form/answerForm',sort,filter)
const rows = ref([])
const Actions = (row) => [
  [{
    label: 'ویرایش',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => {selected.value={...row};isNew.value=false;openFormModal.value=true;}
  }],
  [{
    label: 'حذف',
    icon: 'i-heroicons-trash-20-solid',
    click: () => {selected.value=row;openDeleteModal.value=true}
  }],
   ( row?.type?.label == 'MultipleChoice' ||
              row?.type?.label == 'SingleChoice') && [{
    label: 'افزودن گزینه',
    icon: 'i-heroicons-trash-20-solid',
    click: () => {selected.value={...row};openOptionModal.value=true}
  }],
]


watch([() => filter.value.pageIndex,()=>sortBy.value,()=>props.formLabel,isOpen], async () => {
  if(isOpen.value){

   filter.value.RequestformLabel=props.formLabel 
    filter.value=await loadData()
  }
})

async function reload(){
  filter.value=await loadData()
}



</script>
