<template>
  <div>

    <UModal v-model="isOpen" prevent-close fullscreen="">
      <UCard class="shadow-md bg-grayPrimary-50 bg-opacity-60">
        <template #header>
          <div class="flex items-center justify-between">
            <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
          لیست سوالات
          </h3>
          <div class="flex gap-4">

            <UButton icon="i-heroicons-plus-small" size="sm" color="primary" square variant="solid"
           @click="isNew=true;resetselected();openFormModal=true" />
            <UIcon
            @click="isOpen = false"
            name="i-heroicons-x-mark-16-solid"
            class="w-8 h-8 text-gray-400"
            />
          </div>
        </div>
      </template>

         <UTable  v-model:sort="sort"  :sort-mode="'manual'"  :rows="filter?.list" :columns="columns">
            <template #actions-data="{ row }">
              <UDropdown :items="Actions(row)">
                <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
              </UDropdown>
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
          <FormFormAddQuestion v-model="openFormModal" @reload="reload" :formId="formId" :data="selected" :isNew="isNew"/>
          <FormDelete :route="'/api/form/formQuestion'" formTitle="سوال" @reload="reload" :selectedId="selected.id"
          v-model="openDeleteModal" />
          <FormFormAddQuestionOption v-model="openOptionModal" :questionId="selected?.id"/>
          {{ openOptionModal }}
    </UCard>
  </UModal>
</div>
</template>
<script setup>
import { FormFormAddQuestion } from '#components';

const localData = ref({ required: false });
const isOpen = defineModel();

const props = defineProps(["formId"]);
const toast = useToast();
const isNew=ref(true)
const selected=ref({
    name: "",
  typeId: 0,
  deleted: true,
  requestFormId: '',
  priority: 0,
  required: false,
})
function resetselected(){
  selected.value={
    name: "",
  typeId: 0,
  deleted: true,
  requestFormId: props.formId,
  priority: 0,
  required: true,
}
}
const loading = ref(false);
const emit = defineEmits(["reload"]);
const list=ref([])
const openDeleteModal = ref(false)
const openOptionModal=ref(false)
const openFormModal=ref(false)
  const sort = ref({ column: 'id', direction: 'asc' }) 
const columns = [
  {
    key: 'id',
    label: 'شناسه',
    sortable: true
  },
  {
    key: 'name',
    label: 'عنوان'
  },
  {
    key: 'type.name',
    label: 'نوع'
  },

  {
    key: 'priority',
    label: 'اولویت نمایش',
    sortable:true
  },
  {
    key: 'actions',
  }]


const filter = ref({
  totalCount: 0,
  pageIndex: 1,
  pageSize: 15,
  Q: "",
  SortBy: 0,
  RequestFormId:props.formId
})


const {sortBy,pageFrom,pageTo,loadData}=useTable('/api/form/formQuestions',sort,filter)
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


watch([() => filter.value.pageIndex,()=>sortBy.value,()=>props.formId,isOpen], async () => {
  if(isOpen.value){

   filter.value.RequestFormId=props.formId 
    filter.value=await loadData()
  }
})

async function reload(){
  filter.value=await loadData()
}



</script>
