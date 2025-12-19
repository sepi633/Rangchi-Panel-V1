<template>
  <UModal v-model="isOpen" prevent-close fullscreen >
    <UCard class="shadow-md bg-grayPrimary-50 bg-opacity-60">
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            {{ isNew ? "اضافه کردن نمایندگی جدید" : "ویرایش نمایندگی" }}
          </h3>
          <UIcon
            @click="isOpen = false"
            name="i-heroicons-x-mark-16-solid"
            class="w-8 h-8 text-gray-400"
          />
        </div>
      </template>

      <UForm :validate="validate" :state="formData" class="px-8 flex flex-wrap">
          <UFormGroup class="w-full p-1 lg:p-4 md:w-1/2 lg:w-1/4" name="useer" label="کاربر">
 
             <UserSearch v-model="formData.userId" />
            </UFormGroup>
          <UFormGroup class="w-full p-1 lg:p-4 md:w-1/2 lg:w-1/4" label="نام فروشگاه" name="shopName">
              <UInput
                size="lg"
                v-model="formData.name"
                placeholder=" نام فروشگاه"
              />
            </UFormGroup>
            <UFormGroup class="w-full p-1 lg:p-4 md:w-1/2 lg:w-1/4" label="نام مدیر فروشگاه" name="shopFirstName">
              <UInput
              size="lg"
              v-model="formData.ownerFirstName"
              placeholder="نام مدیر فروشگاه"
              />
            </UFormGroup>
            <UFormGroup class="w-full p-1 lg:p-4 md:w-1/2 lg:w-1/4" label="نام خانوادگی مدیر فروشگاه" name="shopLastName">
              <UInput
              size="lg"
              v-model="formData.ownerLastName"
              placeholder="نام خانوادگی مدیر فروشگاه"
              />
            </UFormGroup>
    
            <UFormGroup class="w-full p-1 lg:p-4 md:w-1/2 lg:w-1/4" label="آدرس فروشگاه" name="shopAddress">
              <UInput
              size="lg"
              v-model="formData.address"
              placeholder="آدرس فروشگاه"
              />
            </UFormGroup>
        <UFormGroup class="w-full p-1 lg:p-4 md:w-1/2 lg:w-1/4" label=" استان ">
          <USelect
            placeholder="انتخاب استان "
            v-model="stateId"
            :options="states"
            option-attribute="name"
            value-attribute="id"
            />
          </UFormGroup>
          <UFormGroup class="w-full p-1 lg:p-4 md:w-1/2 lg:w-1/4" name="city" label=" شهرستان" >
            <USelect
            
            placeholder="انتخاب شهرستان"
            option-attribute="name"
            value-attribute="id"
            v-model="formData.cityId"
            :loading="loadCity"
            :options="cities"
          />
        </UFormGroup>
        <UFormGroup class="w-full p-1 lg:p-4 md:w-1/2 lg:w-1/4" name="city" label=" محله">
          <USelect placeholder="انتخاب محله" option-attribute="name" value-attribute="id"
            v-model="formData.neighborhoodId" :loading="neighborhoodLoading" :options="neighborhoods" />
        </UFormGroup>
        <UFormGroup   name="personnelCount" class="w-full p-1 lg:p-4 md:w-1/2 lg:w-1/4" label="تعداد کارکنان">
          <UInput v-model="formData.personnelCount" placeholder="تعداد کارکنان"/>
        </UFormGroup>
        <UFormGroup   name="meterage" class="w-full p-1 lg:p-4 md:w-1/2 lg:w-1/4" label="متراژ">
          <UInput v-model="formData.meterage" placeholder="متراژ"/>
        </UFormGroup>
        <UFormGroup   name="holeCount" class="w-full p-1 lg:p-4 md:w-1/2 lg:w-1/4" label=" تعداد چاله">
          <UInput v-model="formData.holeCount" placeholder=" تعداد چاله"/>
        </UFormGroup>
        <UFormGroup   name="workYears" class="w-full p-1 lg:p-4 md:w-1/2 lg:w-1/4" label="مدت فعالیت (سال)">
          <UInput v-model="formData.workYears" placeholder="مدت فعالیت (سال)"/>
        </UFormGroup>
        <UFormGroup   name="phone" class="w-full p-1 lg:p-4 md:w-1/2 lg:w-1/4" label="شماره ثابت">
          <UInput v-model="formData.phone" placeholder="شماره ثابت"/>
        </UFormGroup>
        <UFormGroup   name="regionNumber" class="w-full p-1 lg:p-4 md:w-1/2 lg:w-1/4" label="شماره ناحیه">
          <UInput v-model="formData.regionNumber" placeholder="شماره ناحیه"/>
        </UFormGroup>
        <UFormGroup   name="active" class="w-full p-1 lg:p-4 md:w-1/2 lg:w-1/4"  label=" فعال / غیرفعال">
          <UCheckbox v-model="formData.active"  value-attribute="id" option-attribute="name"/>
        </UFormGroup>
        <UFormGroup   name="adminConfirm" class="w-full p-1 lg:p-4 md:w-1/2 lg:w-1/4" label="تایید ادمین">
          <UCheckbox v-model="formData.adminConfirm"  value-attribute="id" option-attribute="name"/>
        </UFormGroup>

        <UFormGroup class="w-full p-3" label="فایل ارسالی">
          <div v-if="formData.file">
            <UButton
              icon="i-heroicons-trash"
              size="sm"
              color="red"
              square
              variant="solid"
              @click=" formData.file = null;
                formData.fileId =null;"
            />
            <NuxtLink :to="getFileUrl(formData.file)">
              دانلود فایل
            </NuxtLink>
          </div>
          <UploadTiny
            v-else
            @getFile="
              (picture) => {
                formData.file = picture;
                formData.fileId = picture.id;
              }
            "
          />
        </UFormGroup>
      </UForm>
      <template #footer>
        <div class="flex items-center gap-4 justify-end">
          <UButton class="px-8" @click="isOpen = false" color="rose">
            لغو
          </UButton>
          <UButton
            class="px-8"
            @click="submit"
            color="green"
            :loading="loading"
          >
            ثبت
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
<script setup>

const isOpen = defineModel();
const {getFileUrl}=usePicture()
const props = defineProps(["formData", "isNew"]);
const toast = useToast();
const loading = ref(false);
const emit = defineEmits(["reload"]);
const stateId=ref('')
const cities=ref([])
const neighborhoods=ref([])
const neighborhoodLoading=ref(false)
const codes=ref([])
const {states,getCity,getNeighborhood}=useCity()
const loadCity=ref(false)
watch(stateId, async () => {
  loadCity.value = true
  cities.value = await getCity(stateId.value)
  loadCity.value = false
})
watch(() => props.formData?.id, async () => {
  stateId.value = props.formData?.city?.stateId
})
watch(() => props.formData?.cityId, async () => {  
  neighborhoodLoading.value = true
  neighborhoods.value = await getNeighborhood(props.formData?.cityId)
  neighborhoodLoading.value = false
})
onMounted(async ()=>{
codes.value= await useCode().getCode('RequestState')
})
const validate = (formData) => {
  const errors = [];
  if (!formData.name)
    errors.push({
      path: "name",
      message: "وارد کردن نام فروشگاه الزامی است",
    });
  if (!formData.cityId)
    errors.push({
      path: "cityId",
      message: "وارد کردن شهر الزامی است",
    });
  return errors;
};

async function submit() {
  if (validate(props.formData).length > 0) return;
  if (loading.value) return;
  else {
    loading.value = true;
    console.log(props.formData);
    let data =JSON.parse(JSON.stringify(props.formData))
    delete data.picture
    delete data.requestState
    delete data.file
    delete data.city
    delete data.user
    try {
      let res = await $fetch("/api/agency/agency", {
        method: props.isNew ? "POST" : "PUT",
        body: data,
      });
      if (res.isSuccess) {
        toast.add({
          description: " عملیات با موفقیت انجام شد .",
          color: "green",
        });
        isOpen.value = false;
        emit("reload");
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
