<template>
    <UModal v-model="isOpen" prevent-close >
        <UCard class="shadow-md bg-grayPrimary-50  bg-opacity-60 ">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                     کپی کردن زمان های ثبت شده در این روز
                    </h3>
                    <UIcon @click="isOpen = false" name="i-heroicons-x-mark-16-solid" class="w-8 h-8 text-gray-400" />
                </div>
            </template>
            <UCard>                
                <div class=" items-center  gap-2">
                    <UForm :state="formData" class="px-8  flex gap-2">

                        <UFormGroup class="" label="تاریخ " name="assistanceId">
                            <date-picker locale="fa" type="date" v-model="formData.serviceDay" ></date-picker>
                    </UFormGroup>
                </UForm>
                <UFormGroup class="w-full">
                    <UButton @click="submit">کپی</UButton>
                </UFormGroup>
            </div>
        </UCard>

</UCard>
</UModal>

</template>
<script setup>
const isOpen=defineModel()
const loading=ref(false)
const toast=useToast()
const props=defineProps(['agencyId','workDayId'])
const emit=defineEmits(['reload'])
const formData=ref({
    "agencyWorkDayId": 0,
  "serviceDay": "2025-04-27T11:03:39.028Z",
  "agencyId": 0
})

async function submit() {
    if (loading.value) return;
    else {
        loading.value = true;
        formData.value.agencyId = props.agencyId
        formData.value.agencyWorkDayId=props.workDayId
        try {
            let res = await $fetch("/api/AgencyWorkDay/copy", {
                method: "POST",
                body: formData.value,
            });
            if (res.isSuccess) {
                toast.add({
                    description: " عملیات با موفقیت انجام شد .",
                    color: "green",
                });
                emit('reload')
                isOpen.value=false
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