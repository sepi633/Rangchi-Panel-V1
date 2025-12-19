<template>
    <div>
        <UButton @click="isOpen=true" color="yellow" >آلارم های نارنجی</UButton>
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
                <CarBaseMain categoryDetailId="12" :hasPicture="true" :hasVideo="true"  titleCard="آلارم های نارنجی" :hasDescription="false" /> 
            </UCard>
        </UModal>
    </div>
</template>
<script setup >
const isOpen=ref(false)
</script>