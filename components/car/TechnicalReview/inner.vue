<template>
    <div>
        <UButton @click="isOpen=true"  >صفحه داخلی بررسی فنی خودرو</UButton>
        <UModal v-model="isOpen" fullscreen="">
            <UCard>
                <template #header>
                    <div class="flex items-center justify-end ">
                        <UButton
                          color="gray"
                          variant="ghost"
                          icon="i-heroicons-x-mark-20-solid"
                          class="-my-1"
                          @click="isOpen = false"
                        />
                      </div>
                </template>
                <CarBaseMain categoryDetailId="33" :hasPicture="true"  titleCard="صفحه داخلی بررسی فنی خودرو" :hasVideo="true" /> 
            </UCard>
        </UModal>
    </div>
</template>
<script setup >
const isOpen=ref(false)
</script>