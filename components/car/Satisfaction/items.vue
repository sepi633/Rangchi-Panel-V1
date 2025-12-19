<template>
    <div>
        <UButton @click="isOpen=true"  >{{ titleCard }}
        </UButton>
        <UModal v-model="isOpen">
            <UCard>
                <template #header>
                    <div class="flex items-center justify-end">
                        <UButton
                          color="gray"
                          variant="ghost"
                          icon="i-heroicons-x-mark-20-solid"
                          class="-my-1"
                          @click="isOpen = false"
                        />
                      </div>
                </template>
                <p class=" w-full text-sm p-4">
                    عدد درصد را با اعداد انگلیسی درون متن کوتاه وارد کنید
                </p>
                <CarBaseMain :categoryDetailId="categoryDetailId" :hasPicture="false" :isParent="true"  :titleCard="titleCard" :hasDescription="false" /> 
            </UCard>
        </UModal>
    </div>
</template>
<script setup >
const isOpen=ref(false)
defineProps(['titleCard','categoryDetailId'])
</script>