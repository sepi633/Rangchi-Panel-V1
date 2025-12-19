<script setup>
const {
  public: { imageUploaderUrl },
} = useRuntimeConfig();
const loading = ref(false);
const toast=useToast()
const emit=defineEmits(["getFile"]);
async function upload(event) {
    if(loading.value)
    return
    loading.value=true

    try {
        
        let [file] = event;
        console.log(file);
  const formData = new FormData();
  formData.append("PictureFile", file);
    const res = await $fetch(imageUploaderUrl, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "*/*",
      },
    });
    if (res.isSuccess) {

      emit("getFile", res?.data);
      toast.add({description:"آپلود با موفقیت انجام شد لطفا اطلاعات را وارد نمایید!",color:'green'
      });
    } else {
      toast.add({description:" آپلود ناموفق بود !" + res.messages[0]?.item1,color:'red'
      });
    }
  } catch (error) {
    toast.add({description:'مشکلی پیش آمده است .',color:'red'})
    console.log("ERROR:" + error);
  }
  loading.value = false;
}
</script>

<template>
  <div>
    <UInput :loading="loading" placeholder="انتخاب فایل ..." type="file" size="sm" icon="i-heroicons-folder" @change="upload" >
        
    </UInput>
  </div>
</template>
