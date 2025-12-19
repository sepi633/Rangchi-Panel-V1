
<template>
  <div class=" p-6 sm:p-10 space-y-6">
  <UCard>
      <template #header>
        <div>

          <div class="flex justify-between">
            <p>
              مدیریت سفارشات</p>
              

            <div
            class="flex justify-end"
            >
               <!-- <UButton
              icon="i-heroicons-document-chart-bar"
              size="sm"
              color="gray"
              square
              variant="solid"
              to="/productOrder/report"
              /> -->
              </div>
            </div>
                          <div class="flex gap-2 items-center flex-wrap">
   <UFormGroup class="" label="وضعیت">
          <USelect v-model="filter.ProductOrderStatusEnum" :options="[{name:'همه',value:null},{name:'سفارش ثبت شده',value:0},{name:' در حال بررسی',value:1},{name:'ارسال به مشتری',value:2},{name:'تحویل به مشتری',value:3}]" option-attribute="name" value-attribute="value">
          </USelect>
        </UFormGroup>
        <UFormGroup class="" label="مالی">
          <USelect v-model="filter.isPaid" :options="[{name:'همه',value:null},{name:'پرداخت شده',value:true},{name:'پرداخت نشده',value:false}]" option-attribute="name" value-attribute="value">
          </USelect>
        </UFormGroup>
        <UFormGroup class="" label="کد تخفیف">
          <USelect v-model="filter.rebateId" :options="rebates" option-attribute="codeValue" value-attribute="id">
          </USelect>
        </UFormGroup>
        <UFormGroup class=" flex gap-1" label="از تاریخ">
          <div class="flex">
  
            <date-picker locale="fa" type="date" v-model="filter.fromDate" ></date-picker>
            <UIcon
            @click="filter.fromDate=null"
            name="i-heroicons-x-mark-16-solid"
            class="w-4 h-4 text-red-500"
            />
          </div>
        </UFormGroup>
        <UFormGroup class=" flex gap-1" label="تا تاریخ">
          <div class="flex">
  
            <date-picker locale="fa" type="date" v-model="filter.toDate" ></date-picker>
            <UIcon
            name="i-heroicons-x-mark-16-solid"
            class="w-4 h-4 text-red-500"
            @click="filter.toDate=null"
            />
          </div>
        </UFormGroup>
        <div class="w-1/4 p-1">
          <input class="p-2 h-[40px] border rounded w-full" type="text" 
            v-model="filter.q" :placeholder="$t('search')">
          </div>
       
     
</div>
          </div>
          </template>

      <UTable   :rows="filter?.list" :columns="columns">            
          <template #actions-data="{ row }">
              <UDropdown :items="Actions(row)">
                  <UButton color="gray" variant="ghost"  icon="i-heroicons-ellipsis-horizontal-20-solid" />
              </UDropdown>
          </template>
        <template #isPaid-data="{ row }">
            <UIcon :class="[row.isPaid ?'text-green-400':'text-red-400','w-8 h-8']" size="lg" :name="row.isPaid?'i-heroicons-check-16-solid':'i-heroicons-x-mark-16-solid'"/> 

          </template>
        <template #isRepairShop-data="{ row }">
            <UIcon :class="[row.isRepairShop ?'text-green-400':'text-red-400','w-8 h-8']" size="lg" :name="row.isRepairShop?'i-heroicons-check-16-solid':'i-heroicons-x-mark-16-solid'"/> 

          </template>
          <template #createDate-data="{ row }">
            <span>
              {{ row.createDate ? moment(row.createDate).locale('fa').format('YYYY/MM/DD') : '' }}
            </span>
          </template>
      
      </UTable>
      <FormDelete :route="'/api/orders/order'" formTitle="سفارشات" @reload="loadData" :selectedId="selected.id" v-model="openDeleteModal"/> 
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
  <PrintOrder :time="time" :order="selected"/>
  </div>
</template>
<script setup>
 import moment from 'jalali-moment'
const isNew=ref(true)
const selected = ref({})
const openFormModal =ref(false)
const openDeleteModal =ref(false)
const toast=useToast()

const time=ref(0)
const columns = [
  {
  key: 'id',
  label: 'شماره سفارش'
  }, 
  
  {
  key: 'user.fullName',
  label: 'کاربر'
  }, 
  {
  key: 'paymentPrice',
  label: 'مبلغ سفارش '
  }, 
  
  {
  key: 'createDate',
  label: 'تاریخ'
  }, 

  {
key: 'isPaid',
label: 'وضعیت پرداخت'
}, 
  {
key: 'productOrderState.name',
label: 'وضعیت '
}, 
  {
key: 'productOrderStatus.name',
label: ' وضعیت ارسال '
}, 
  {
key: 'isRepairShop',
label: 'عادی / سرویسکار'
}, 
 
{
key: 'actions',
}]

const rebates=ref([])

const filter=ref({
totalCount:0,
pageIndex:1,
pageSize:15,
fromDate:null,
toDate:null,
ProductOrderStatusEnum:null,
isPaid:null,
q:null,
rebateId:null
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
  click:() =>navigateTo('/ProductOrder/insert'+row.id)
}],

[{
  label: 'کالا های سفارش',
  icon: 'i-heroicons-circle-stack',
  click:() =>navigateTo('/ProductOrder/item-'+row?.id)
}],

[{
    label: 'پرینت',
    icon: 'i-heroicons-printer',
    click: () => {selected.value=row;time.value=Date.now()}
  }],
]
// function select (row) {
//     selected.value=(row)
// }



watch([()=>filter.value.pageIndex,()=>filter.value.isPaid,()=>filter.value.rebateId,()=>filter.value.q,()=>filter.value.ProductOrderStatusEnumm,()=>filter.value.fromDate,()=>filter.value.toDate],async ()=>{
await loadData()
})

async function loadData(){
  try {
    let config=JSON.parse(JSON.stringify(filter.value))
    delete config.list
    console.log(config);
    let res =await $fetch('/api/orders/orders',{
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

async function getRebates(){
  try {
    let res=await $fetch('/api/rebate/rebate',{
      query:{
        pageSize:60000
      }
    })
    rebates.value=res.list||[]
  } catch (error) {
    
  }
}

onMounted(()=>{
  loadData()
  getRebates()
})



</script>
