<template>
    <div>
        <UButton @click="isOpen=true"  >صفحه داخلی ریست آلارم ها</UButton>
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
                <CarBaseMain categoryDetailId="26" :hasVideo="true" :hasPicture="true"  titleCard="صفحه داخلی ریست آلارم" :hasDescription="true" /> 
            </UCard>
        </UModal>
    </div>
</template>
<script setup >
const isOpen=ref(false)
</script>