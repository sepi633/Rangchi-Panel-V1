<template>
      <div class="p-8">
<UCard>
    <template #header>
        <div>

            <div class="text-center my-4 text-xl font-semibold">
             گزارش نمایندگی   {{route.params?.agencyName}}
            </div>
            <div class="flex flex-wrap gap-4 mt-4">
                
                <UFormGroup label="خدمت" >
                    <USelect :options="assistance" v-model="selectedAssistance" value-attribute="assistanceId" option-attribute="assistanceName">
                        
                    </USelect>
                </UFormGroup>
                <UFormGroup class=" flex gap-1" label="از تاریخ">
                    <div class="flex gap-1">
        
                      <date-picker locale="fa" type="date" v-model="fromDate" ></date-picker>
                      <UIcon
                      @click="fromDate=null"
                      name="i-heroicons-x-mark-16-solid"
                      class="w-4 h-4 text-red-500"
                      />
                    </div>
                  </UFormGroup>
                  <UFormGroup class="flex gap-1" label="تا تاریخ">
                    <div class="flex gap-1">
                      <date-picker locale="fa" type="date" v-model="toDate" ></date-picker>
                      <UIcon
                      name="i-heroicons-x-mark-16-solid"
                      class="w-4 h-4 text-red-500"
                      @click="toDate=null"
                      />
                    </div>
                  </UFormGroup>
                  <UFormGroup label="وضعیت">
                    <div class="flex flex-wrap gap-4">
            
                        <div :class="[statusIdes.includes(item.id) ? 'bg-basePrimary-500 text-white ':'bg-white text-gray-900','border  p-4 rounded-md transition-all']" v-for="item in statuses"   
                        @click="statusIdes.includes(item.id)
                        ? statusIdes.splice(statusIdes.indexOf(item.id), 1)
                        : statusIdes.push(item.id);"
                        > 
                          {{ item.name }}
                        </div>
                        
                      </div>
                  </UFormGroup>
                
            </div>
        </div>
    </template>
    <div class="flex gap-4">
        <div class="font-bold text-lg" >
            تعداد رزرو های فعال
        </div> : 
        <div>
        {{ reserveCount }}
        </div>
    </div>
    <div class="flex gap-4">
        <div class="font-bold text-lg" > تعداد رزرو های کنسل شده</div> : 
        <div>
           {{ cancelCount }}
        </div>
    </div>
    <!-- <div class="flex gap-4">
        <div class="font-bold text-lg" >
            تمام شده
        </div> : 
        <div>

        </div>
    </div> -->
</UCard>
</div>
</template>
<script setup>
const route=useRoute()
const assistance =ref([])
const toast=useToast()
const cancelCount=ref()
const selectedAssistance=ref()
const reserveCount=ref()
const fromDate=ref()
const toDate=ref()
const statuses=ref([])
const statusIdes=ref([])
const {getCode}=useCode()

async function getAssistance() {
    try {
        let res = await $fetch('/api/AgencyAssistance/AgencyAssistances', {
            method: 'GET',
            query: {
                agencyId:route.params.agencyId
            }
        })
        assistance.value=res.list||[]
    } catch (error) {
        console.log(error);

        if (error?.response?._data?.message)
            toast.add({ description: error?.response?._data?.message, title: 'خطا !', color: 'red' });
        else
            toast.add({ description: 'مشکلی پیش آمده است .', title: 'خطا !', color: 'red' })
    }
}
async function getreserveCount() {
    try {
        let res = await $fetch('/api/agencyreserve/agencyreserves', {
            method: 'GET',
            query: {
                agencyId:route.params.agencyId,
                assistanceId:selectedAssistance.value,
                IsCanceled:false,
                statusIds:statusIdes.value,
                fromDate:fromDate.value,
                toDate:toDate.value
            }
        })
        reserveCount.value=res.totalCount||0
    } catch (error) {
        console.log(error);

        if (error?.response?._data?.message)
            toast.add({ description: error?.response?._data?.message, title: 'خطا !', color: 'red' });
        else
            toast.add({ description: 'مشکلی پیش آمده است .', title: 'خطا !', color: 'red' })
    }
}
async function getcancelCount() {
    try {
        let res = await $fetch('/api/agencyreserve/agencyreserves', {
            method: 'GET',
            query: {
                agencyId:route.params.agencyId,
                assistanceId:selectedAssistance.value,
                IsCanceled:true,
                statusIds:statusIdes.value,
                fromDate:fromDate.value,
                toDate:toDate.value
            }
        })
        cancelCount.value=res.totalCount||0
    } catch (error) {
        console.log(error);

        if (error?.response?._data?.message)
            toast.add({ description: error?.response?._data?.message, title: 'خطا !', color: 'red' });
        else
            toast.add({ description: 'مشکلی پیش آمده است .', title: 'خطا !', color: 'red' })
    }
}


onMounted(async()=>{
await getAssistance()
await getcancelCount()
await getreserveCount()
statuses.value=await getCode('AgencyReserveStatus')
})

watch([selectedAssistance,fromDate,toDate,()=>statusIdes.value],async()=>{
    await getcancelCount()
    await getreserveCount()
},{deep:true})
</script>