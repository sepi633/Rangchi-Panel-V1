<template>
  <div class=" p-6 sm:p-10 space-y-6">
    <UCard>
      <template #header>
        <div>
          <p>
            مدیریت درخواست های برداشت از کیف پول</p>
          <div class="flex justify-between flex-wrap p-2">
            <div  class="w-96 min-w-max shrink-0">
              <UserSearch  v-model="filter.userId"/>
            </div>

            <!-- <div class="flex justify-end">
              <UButton icon="i-heroicons-plus-small" size="sm" color="primary" square variant="solid"
                to="/wallet/insertnew" />
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
      <FormDelete :route="'/api/wallet/wallet'" formTitle="بانک" @reload="loadData" :selectedId="selected.id"
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
      <FormWalletAccept v-model="openAcceptFormModal" :formData="selected"/>
    </UCard>
  </div>
</template>

<script setup>
import moment from 'jalali-moment'
const {
  public: { walletcategoryId },
} = useRuntimeConfig();
const { getPicUrl, setdefault } = usePicture()
const selected = ref({})
const openAcceptFormModal = ref(false)
const openDeleteModal = ref(false)
const toast = useToast()

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
    label: "مبلغ",
  },
  {
    key: "increaseamount",
    label: "+/-",
  },
  {
    key: "productOrderId",
    label: "شماره سفارش",
  },
  {
    key: "accept",
    label: "تایید",
  },
  {
    key: "name",
    label: "توضیحات",
  },
  {
    key: "actions",
  },
];
  const sort = ref({ column: 'id', direction: 'asc' }) 

const filter = ref({
  totalCount: 0,
  pageIndex: 1,
  pageSize: 15,
  Q: "",
  SortBy: 0,
  isAccountSettlement:true,
  userId:null
})
const {sortBy,pageFrom,pageTo,loadData}=useTable('/api/wallet/wallets',sort,filter)

const rows = ref([])
const Actions = (row) => [
  [{
    label: 'تایید',
    icon: 'i-heroicons-check-badge',
    click: () => {selected.value=row;openAcceptFormModal.value=true}
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

watch([() => filter.value.pageIndex,()=>filter.value.userId,()=>sortBy.value], async () => {
 filter.value= await loadData()
})

onMounted(async() => {
  filter.value=await loadData()
})


</script>















