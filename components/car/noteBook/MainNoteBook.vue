<template>
    <div>
        <UButton @click="isOpen=true"  >صفحه اصلی دفترچه</UButton>
        <UModal v-model="isOpen" fullscreen="">
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
                <p class="pb-4 text-sm">توجه : دفترچه اصلی را در قسمت ویدیو بارگذاری کنید </p>

                <CarBaseMain categoryDetailId="34" :hasPicture="false"  :hasFile="true" :isParent="true" titleCard="صفحه اصلی دفترچه" :hasDescription="false" /> 
            </UCard>
        </UModal>
    </div>
</template>
<script setup >
const isOpen=ref(false)
</script>