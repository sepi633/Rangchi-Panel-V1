<template>
  <div class="p-6 sm:p-10 space-y-6">
    <UCard>
      <template #header>
        <div>

          <div class="flex justify-between">
            <div class="flex gap-2">
              <p>  امتیازات کاربر</p>
            </div>
            <UButton
              icon="i-heroicons-plus-small"
              size="sm"
              color="primary"
              square
              variant="solid"
              :to="`/user/score-${route.params.userId}/insertnew`"
              />
          </div>
        </div>
      </template>

      <!-- @click="newForum" -->
      <UTable :rows="filter?.list" :columns="columns" >
        <template #actions-data="{ row }">
          <UDropdown :items="Actions(row)">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-ellipsis-horizontal-20-solid"
            />
          </UDropdown>
        </template>
          <template #createDate-data="{ row }">
          <span>
            {{ row.createDate  ? moment(row.createDate).locale('fa').format('YYYY/MM/DD') : '' }}
          </span>
        </template>
    <template #increaseamount-data="{ row }">
         <span class=" text-green-700 text-[16px] my-1" :title="$t('increaseamount')" v-if="row?.isIncrease">+</span>
                <span class=" text-red-700 text-[16px] my-1" :title="$t('descreaseamount')" v-else>-</span>
        </template>
 <template #accept-data="{ row }">
                         <UIcon :class="[row.accept ? 'text-green-400' : 'text-red-400', 'w-8 h-8']" size="lg"
                             :name="row.accept ? 'i-heroicons-check-16-solid' : 'i-heroicons-x-mark-16-solid'" />
 
                     </template>
    <template #amount-data="{ row }">
      <span>
        {{ row.amount  ? row.amount.toLocaleString() : 0 }}
      </span>
        </template>
    <template #name-data="{ row }">
      <span class="max-w-[200px] text-xs">
        {{  row.name }}
      </span>
        </template>
      </UTable>


      <FormDelete
        :route="'/api/score/score'"
        @reload="loadData"
        formTitle=" کیف پول"
        :selectedId="selected.id"
        v-model="openDeleteModal"
      />
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
                  variant: 'outline',
                },
              },
            }"
          />
        </div>
      </template>
      <FormscoreAccept v-model="openAcceptFormModal" :formData="selected"/>
    </UCard>

  </div>
</template>

<script setup>
import moment from 'jalali-moment';

const isNew = ref(true);
const selected = ref({});
const openFormModal = ref(false);
const openDeleteModal = ref(false);
const toast = useToast();
const openAcceptFormModal=ref(false)
const showCatUser=ref(false)
const route=useRoute()
const columns = [
  {
    key: "user.fullName",
    label: " کاربر",
  },
  {
    key: "createDate",
    label: "تاریخ",
  },
  {
    key: "amount",
    label: "تعداد",
  },
  {
    key: "increaseamount",
    label: "+/-",
  },
  {
    key: "scoreType.name",
    label: "نوع امتیاز",
  },
  {
    key: "rebate.codeValue",
    label: "کدتخفیف",
  },
  {
    key: "name",
    label: "توضیحات",
  },
  {
    key: "actions",
  },
];
const filter = ref({
  totalCount: 0,
  pageIndex: 1,
  pageSize: 15,
  q:'',
  userId:route.params.userId,});

const loading=ref(false)
const pageFrom = computed(() => {
  return (filter.value.pageIndex - 1) * filter.value.pageSize + 1;
});
const pageTo = computed(() => {
  return filter.value.pageIndex * filter.value.pageSize + 1;
});
const rows = ref([]);
const Actions = (row) => [
  [
    {
      label: "حذف",
      icon: "i-heroicons-trash-20-solid",
      click: () => deleteForum(row),
    },
  ],
 row.userBankAccountId && [{
    label: ' تایید',
    icon: 'i-heroicons-check-badge',
    click: () => {selected.value=row;openAcceptFormModal.value=true}
  }],
];

function newForum() {
  openFormModal.value = true;
  isNew.value = true;
  selected.value = {};
}

function deleteForum(_item) {
  openDeleteModal.value = true;
  selected.value = _item;
}

watch([() => filter.value.pageIndex,()=>filter.value.q], async () => {
  await loadData();
});

async function loadData() {
  if(loading.value)
  return
  try {
    loading.value=true
    let config = JSON.parse(JSON.stringify(filter.value));
    delete config.list;
    config.userId=route.params.userId
    console.log(config);
    let res = await $fetch("/api/score/scores", {
      method: "GET",
      query: config,
    });
    filter.value = res;
  } catch (error) {
    console.log(error);

    if (error?.response?._data?.message)
      toast.add({
        description: error?.response?._data?.message,
        title: "خطا !",
        color: "red",
      });
    else
      toast.add({
        description: "مشکلی پیش آمده است .",
        title: "خطا !",
        color: "red",
      });
  }
  loading.value=false
}

onMounted(() => {
  loadData();
});

</script>
<style>
.modal{
  background-color: #0000006b;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  margin: 0 !important;
  .content{
      background-color: #fff;;
      max-width: 500px;
      width: 100% !important;
      width: max-content;
     
  }
}
</style>
