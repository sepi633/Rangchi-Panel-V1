<template>
    <div class=" p-6 sm:p-10 space-y-6">
    <UCard>
        <template #header>
          <div>

            <div class="flex justify-between">
              <p>
                سرویسکار ها           </p>
                <div
                class="flex justify-end gap-2"
                >
                 <UButton
              icon="i-heroicons-document-chart-bar"
              size="sm"
              color="gray"
              square
              variant="solid"
              to="/repairshop/report"
              />
                <UButton
                icon="i-heroicons-plus-small"
                size="sm"
                color="primary"
                square
                variant="solid"
                @click="newRepairShop"
                />
              </div>
            </div>
            <div class="flex gap-2">
              <UFormGroup class="flex-1" label="نوع">
                    <USelect v-model="filter.guild" :options="[{name:'همه',value:null},{name:'سرویسکار',value:false},{name:'اتحادیه',value:true}]" option-attribute="name" value-attribute="value">
                    </USelect>
              </UFormGroup>
              <UFormGroup class="flex-1" label="استان" >
                <BaseSelectMenu v-model="filter.stateId" :options="states" option-attribute="name" value-attribute="id">
                </BaseSelectMenu>
              </UFormGroup>
              <UFormGroup class="flex-1" label="شهر">
                <BaseSelectMenu v-model="filter.cityId" :options="cities" option-attribute="name" value-attribute="id" >
                </BaseSelectMenu>
              </UFormGroup>
              <UFormGroup class="flex-1" label="وضعیت">
                <USelect v-model="filter.requestStateId" :options="[{name:'همه',value:null}, {
                  name: 'درخواست شده',
                  value: 45
                },
                {
                  name: 'تایید شده',
                  value: 46
                },
                {
                  name: 'عدم تایید',
                  value: 47
                },
                {
                  name: 'تکمیل شده',
                  value: 59
                }]" option-attribute="name" value-attribute="value">
                </USelect>
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
            <template #requestState-data="{ row }">
              <div :class="row.requestStateId=='45'?'text-blue-500':row.requestStateId=='46'?'text-green-500':row.requestStateId=='47'?'text-red-500':''">
                {{codes.find(item=>item.id==row.requestStateId)?.name }}
              </div>
            </template>
            <template #isGuild-data="{ row }">
              <div :class="row.isGuild?'text-blue-500':'text-green-500'">
                {{row.isGuild ?'اتحادیه':'سرویسکار'}}
              </div>
            </template>
        
        </UTable>
        <FormRepairshop   :is-new="isNew"  :form-data="selected" v-model="openFormModal" @reload="loadData"/>
        <FormRepairshopConfirm :form-data="selected" v-model="openStateModal"  @reload="loadData"/> 
        <FormDelete :route="'/api/repairshop/repairshop'" formTitle="نقش" @reload="loadData" :selectedId="selected.id" v-model="openDeleteModal"/> 
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
 
  const isNew=ref(true)

  const selected = ref({})
  const openFormModal =ref(false)
  const openDeleteModal =ref(false)
  const toast=useToast()
  const openStateModal=ref(false)
  const codes=ref([])
  const columns = [
    {
  key: 'user.fullName',
  label: 'کاربر'
  }, 
    {
  key: 'name',
  label: 'نام'
  }, 
    {
  key: 'ownerFirstName',
  label: ' نام مدیر'
  }, 
    {
  key: 'ownerLastName',
  label: 'نام خانوادگی مدیر'
  }, 
    {
  key: 'city.state.name',
  label: 'استان'
  }, 
    {
  key: 'city.name',
  label: 'شهر'
  }, 
    {
  key: 'neighborhood.name',
  label: 'محله'
  }, 
    {
  key: 'score',
  label: 'امتیاز'
  }, 
    {
  key: 'isGuild',
  label: 'اتحادیه / سرویسکار'
  }, 
    {
  key: 'requestState',
  label: 'وضعیت'
  }, 
   
  {
  key: 'actions',
  }]
  const filter=ref({
  totalCount:0,
  pageIndex:1,
  pageSize:15,
  guild:null,
  stateId:null,
  cityId:null,
  requestStateId:null
  })
  
  
  const {states,getCity}=useCity()
  const cities=ref([])
  watch(()=>filter.value.stateId,async()=>{
    cities.value=await getCity(filter.value.stateId)
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
    click:() =>editRepairShop(row)
  }],
  [{
    label: 'حذف',
    icon: 'i-heroicons-trash-20-solid',
    click: () => {selected.value=row;openDeleteModal.value=true}
  }],
   [{
    label: 'تغییر وضعیت',
    icon: 'i-heroicons-pencil-16-solid',
    click:()=>changeState(row)
  }], 
   [{
    label: 'عکس ها ',
    icon: 'i-heroicons-photo',
    click:()=>navigateTo('/repairshop/pictures'+row.id)
  }], 
  
  ]
  // function select (row) {
  //     selected.value=(row)
  // }
  function newRepairShop(){
  openFormModal.value=true
  isNew.value=true
  selected.value={score:0}
  }
  function editRepairShop(_item){
  openFormModal.value=true
  isNew.value=false
  selected.value={..._item}
  }
  
  function changeState(_item){
  openStateModal.value=true
  selected.value={..._item}
  }
  
 
  watch([()=>filter.value.pageIndex,()=>filter.value.guild,()=>filter.value.stateId,()=>filter.value.cityId,()=>filter.value.requestStateId],async ()=>{
  await loadData()
  })
  
  async function loadData(){
    try {
      let config=JSON.parse(JSON.stringify(filter.value))
      delete config.list
      console.log(config);
      let res =await $fetch('/api/repairshop/repairshops',{
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
  
  onMounted(async()=>{
    loadData()
    codes.value = await useCode().getCode('RequestState')

  })
  
  
  </script>
  
  