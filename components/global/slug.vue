<template>
    <div>

        <div class="flex gap-2 items-center min-w-96">
            <div class="font-semibold" v-if="isAccept">
                {{ slug }}
            </div>
            <UInput v-model="mySuggestion" v-else class="grow" />
            <UButton icon="i-heroicons-pencil-square" v-if="isAccept" @click="isAccept = false ;mySuggestion=slug" color="orange" />
            <UButton
            icon="i-heroicons-magnifying-glass-16-solid"
            :loading="loading"
            @click="checkSlug"
            color="blue"
            v-else
            />
        </div>
        <div class="flex gap-2 items-center py-2" v-if="isRepeat">
            ❌
            اسلاگ تکراری میباشد . اسلاگ پیشنهادی : <strong>
                {{ RepeatSuggestion }}
            </strong>
            
            <UButton icon="i-heroicons-check" color="green" @click="setSuggestion"/>
            <UButton icon="i-heroicons-x-mark-16-solid" color="red" @click="reset"/>
        </div>
    </div>
</template>
<script setup>
const toast = useToast();
const props = defineProps(["mode", "editId"]);
const slug = defineModel("value");
const isAccept = defineModel("isAccept");
const mySuggestion = ref("");
const loading = ref(false);
const isRepeat = ref(false);
const RepeatSuggestion = ref();
const slugType = computed(() => {
  switch (props.mode) {
    case "category":
      return 0;
      break;
    case "product":
      return 1;
      break;
    case "post":
      return 2;
      break;
    case "gallery":
      return 3;
      break;
    case "staticPage":
      return 4;
      break;
    case "brand":
      return 5;
      break;

    default:
      return 0;
      break;
  }
});
async function checkSlug() {
  if (mySuggestion.value?.trim()?.length < 3) {
    toast.add({ description: "اسلاگ پیشنهادی را حداقل با دو حرف وارد کنید" });
    return;
  }
  if (loading.value) return;
  loading.value = true;
  try {
    let res = await $fetch("/api/slug/slug", {
      method: "POST",
      body: {
        id:props.editId,
        name: mySuggestion.value,
        slugType: slugType.value,
      },
    });

    if (res.isSuccess) {
      if (res.data?.isRepetitive) {
        isRepeat.value = true;
        RepeatSuggestion.value = res.data?.slug;
      }else{
        slug.value = res.data?.slug;
        isAccept.value=true
      }
    }
  } catch (error) {
    toast.add({ description: "مشکلی پیش آمده است .", title: "خطا !", color: "red" });
  }
  loading.value = false;
}

function setSuggestion(){
    slug.value=RepeatSuggestion.value
    isAccept.value=true
    isRepeat.value=false
    RepeatSuggestion.value=''
    
}

function reset(){
    isRepeat.value=false
    RepeatSuggestion.value=''
}
</script>
