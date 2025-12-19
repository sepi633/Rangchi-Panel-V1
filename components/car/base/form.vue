<template>
  <UModal v-model="isOpen" :fullscreen="hasDescription || hasPicture">
    <UCard class="lg:px-20">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white"    >
           {{titleCard}}
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="isOpen = false"
          />
        </div>
      </template>
      <UForm :state="data" class="space-y-4">
     
        <UFormGroup label="عنوان" name="name">
          <UInput v-model="data.name" />
        </UFormGroup>
        <UFormGroup label="متن کوتاه" name="summary">
          <UInput v-model="data.summary" />
        </UFormGroup>
        <UFormGroup label="متن بلند" name="email" v-if="hasDescription">
          <RichEditor v-model="data.description" />
        </UFormGroup>
        <UFormGroup label="تصویر" name="picture" v-if="hasPicture">
          <div v-if="data.picture" class="flex gap-4 relative justify-center">
            <img :src="getPicUrl(data.picture,'sm')" alt="">
            <UButton
            icon="i-heroicons-trash"
            size="xs"
            color="red"
            square
            variant="solid" 
            class="absolute top-0 left-0"
            @click="data.picture=null;data.pictureId=null"
            />
          </div> 
          <UploadImage v-else @getPictureId="setPicture" :FileInputId="'Picture'+data?.categoryDetailId"/>
        </UFormGroup>
        <UFormGroup label="ویدیو" name="video" v-if="hasVideo">
          <div v-if="data.file" class="flex gap-4 relative justify-center">
            <video :src="getFileUrl(data.file)" muted controls alt="" />
            <UButton
            icon="i-heroicons-trash"
            size="xs"
            color="red"
            square
            variant="solid" 
            class="absolute top-0 left-0"
            @click="data.file=null;data.fileId=null"
            />
          </div> 
          <UploadVideo v-else @getPictureId="setvideo" :FileInputId="'Video'+data?.categoryDetailId" />
        </UFormGroup>
        <UFormGroup label="فایل" name="filee" v-if="hasFile">
          <div v-if="data.file" class="flex gap-4 relative justify-center">
           <a :href="getFileUrl(data.file)" class="w-full p-4 bg-gray-600 text-white text-right rounded-lg">{{data?.file?.url}}</a>
            <UButton
            icon="i-heroicons-trash"
            size="xs"
            color="red"
            square
            variant="solid" 
            class="absolute top-0 left-0"
            @click="data.file=null;data.fileId=null"
            />
          </div> 
          <UploadFile v-else @getPictureId="setvideo" :FileInputId="'file'+data?.categoryDetailId" />
        </UFormGroup>
        <UFormGroup label="ترتیب نمایش" name="name">
          <UInput v-model="data.priority" />
        </UFormGroup>
        <div class="flex justify-end p-4 gap-4">
          <UButton color="red" @click="isOpen=false">لغو</UButton>
          <UButton :loading="loading" color="green" @click="submitInfo">ثبت</UButton>
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>
<script setup>
const props = defineProps(['data','isNew','titleCard','hasPicture','hasVideo','hasFile','hasDescription']);
const isOpen=defineModel()
const toast=useToast()
const loading=ref(false)
const {getPicUrl,getFileUrl}=usePicture()
const emits=defineEmits(['reload'])
function setPicture(_picId,_pic,_label){
  props.data.pictureId=_picId 
  props.data.picture= _pic
}
function setvideo(_Id,_file){
  props.data.fileId=_Id  
  props.data.file= _file
}

async function submitInfo(){
  if(loading.value)
  return
loading.value=true
try {
  let res=await $fetch('/api/categoryDetailValue/categoryDetailValue',{
    method:props.isNew?'POST':'PUT',
    body:props.data
  })
  if(res.isSuccess){
    toast.add({description:'عملیات با موفقیت انجام شد .'})
    isOpen.value=false
    emits('reload')
  }else{
    res.messages.forEach((el)=>{
          toast.add({description:el.item1,color:'red'})
        })
      }
    } catch (error) {
  toast.add({description:'مشکلی پیش آمده است دوباره امتحان کنید .',color:'red'})
  
}
loading.value=false
}
</script>
