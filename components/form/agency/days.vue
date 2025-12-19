<template>
    <UModal v-model="isOpen" prevent-close fullscreen>
        <UCard class="shadow-md bg-grayPrimary-50  bg-opacity-60 ">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                     {{ agencyId }}   لیست روز های خدمات رسانی نمایندگی
                    </h3>
                    <UIcon @click="isOpen = false" name="i-heroicons-x-mark-16-solid" class="w-8 h-8 text-gray-400" />
                </div>
            </template>
            <UCard>                
                <div class="flex items-center  gap-2">
                    <UForm :state="formData" class="px-8 w-2/3 flex gap-2">
                        <UFormGroup class="w-max " label="فعال/غیرفعال" name="name">
                            <UCheckbox v-model="formData.active" />
                        </UFormGroup>
                        <UFormGroup class="w-1/2 " label="تاریخ " name="assistanceId">
                            <date-picker locale="fa" type="date" v-model="formData.serviceDay" ></date-picker>
                    </UFormGroup>
                </UForm>
                <UFormGroup class="">
                    <UButton @click="submit">افزودن</UButton>
                </UFormGroup>
            </div>
        </UCard>


        
        <UCard class="mt-4">
            
            
            <UTable :rows="filter?.list" :columns="columns">
                <template #actions-data="{ row }">
                    <UDropdown :items="Actions(row)">
                        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                    </UDropdown>
                </template>
                <template #active-data="{ row }">
                    <UIcon :class="[row.active ? 'text-green-400' : 'text-red-400', 'w-8 h-8']" size="lg"
                        :name="row.active ? 'i-heroicons-check-16-solid' : 'i-heroicons-x-mark-16-solid'" />

                </template>
                <template #serviceDay-data="{ row }">
                {{ moment(row.serviceDay).locale('fa').format('YYYY/MM/DD') }}
                </template>

            </UTable>
            <FormDelete :route="'/api/AgencyWorkDay/day'" formTitle="روز" @reload="loadData" :selectedId="selected.id"
                v-model="openDeleteModal" />
            
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
        </UCard>
    </UCard>
    <FormAgencyHour v-model="openHourModal" :agencyWorkDayId="selected.id" :day="selected?.serviceDay"/>
    <FormAgencyReserve v-model="openReserveModal" :agencyWorkDayId="selected.id" :agencyId="agencyId" />
    <FormAgencyCopyDay v-model="openCopymodal" :agencyId :workDayId="selected?.id"  @reload="loadData" />
    </UModal>

</template>

<script setup>
import moment from 'jalali-moment';

const openHourModal=ref(false)
const openReserveModal=ref(false)
const isOpen = defineModel();
const props = defineProps(['agencyId'])
const { public: { carCategoryId } } = useRuntimeConfig()
const assistance=ref([])
const filter = ref({
    totalCount: 0,
    pageIndex: 1,
    pageSize: 15,
})
const formData = ref({
    "agencyId": 0,
  "serviceDay": null,
  "active": true,
})
const selected = ref({})
const openDeleteModal = ref(false)
const openCopymodal=ref(false)
const toast = useToast()
const loading = ref(false)

const columns = [
    {
        key: 'serviceDay',
        label: 'تاریخ'
    },
    {
        key: 'active',
        label: ' فعال/غیر فعال '
    },

    {
        key: 'actions',
    }]


    const validate = (formData) => {
  const errors = [];
  if (!formData.assistanceId)
    errors.push({
      path: "assistanceId",
      message: "وارد کردن خدمت الزامی است",
    });

  return errors;
};

const pageFrom = computed(() => {
    return (filter.value.pageIndex - 1) * filter.value.pageSize + 1
})
const pageTo = computed(() => {
    return filter.value.pageIndex * filter.value.pageSize + 1
})
const Actions = (row) => [
    [{
    label: 'حذف',
    icon: 'i-heroicons-trash-20-solid',
    click: () => {selected.value=row;openDeleteModal.value=true}
  }],
    [{
        label: 'ساعات نوبت',
        icon: 'i-heroicons-clock',
        click: () => {selected.value=row
            openHourModal.value=true
        }
    }],
    [{
        label: 'رزرو نوبت',
        icon: 'i-heroicons-calendar-days-16-solid',
        click: () => {
            selected.value=row
            openReserveModal.value=true
        }
    }],
    [{
        label: 'کپی کردن ساعات نوبت',
        icon: 'i-heroicons-document-duplicate',
        click: () => {
            selected.value=row
            openCopymodal.value=true
        }
    }],

]



watch([() => filter.value.pageIndex ,()=> props.agencyId], async () => {    
    await loadData()
})

async function loadData() {
    try {
        console.log('55555555550fff',props.agencyId);
        
        let config = JSON.parse(JSON.stringify(filter.value))
        delete config.list
        config.agencyId = props.agencyId
        console.log(config);
        let res = await $fetch('/api/AgencyWorkDay/days', {
            method: 'GET',
            query: config
        })
        console.log(res);
        
        filter.value = res
    } catch (error) {
        console.log(error);

        if (error?.response?._data?.message)
            toast.add({ description: error?.response?._data?.message, title: 'خطا !', color: 'red' });
        else
            toast.add({ description: 'مشکلی پیش آمده است .', title: 'خطا !', color: 'red' })
    }
}


async function submit() {
    if (loading.value) return;
    else {
        loading.value = true;
        formData.value.agencyId = props.agencyId
        try {
            let res = await $fetch("/api/AgencyWorkDay/day", {
                method: "POST",
                body: formData.value,
            });
            if (res.isSuccess) {
                toast.add({
                    description: " عملیات با موفقیت انجام شد .",
                    color: "green",
                });
            await loadData()
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

async function loadAssistance(){
    try {
   
      let res =await $fetch('/api/Assistance/Assistances',{
          method:'GET',
          query:{
            pageSize:500
          }
        })
        assistance.value=res?.list
    } catch (error) {        
      if(error?.response?._data?.message)
            toast.add({description:error?.response?._data?.message,title:'خطا !' ,color:'red'});
          else
          toast.add({description:'مشکلی پیش آمده است .',title:'خطا !' ,color:'red'})
        }
  }
  onMounted(()=>{
    console.log('8888888888888888888888888888888888888');
    
    loadAssistance()
  })

</script>