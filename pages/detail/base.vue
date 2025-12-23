<template>
  <section>
    <div class="title relative flex justify-between items-center py-2">
      <h1>{{ $t("BaseDetail") }}</h1>
    </div>
    <div class="flex flex-wrap">
      <div class="w-full lg:w-1/2">
        <div class="input-box flex flex-col p-1">
          <label for=""> {{ $t("name") }}:</label>
          <input
            class="border w-full h-[40px] mt-2"
            type="text"
            name=""
            id=""
            v-model="defaultData.name"
          />
        </div>

        <div class="input-box flex flex-col p-1">
          <label for=""> {{ $t("phone") }}:</label>
          <input
            class="border w-full h-[40px] mt-2"
            type="text"
            name=""
            id=""
            v-model="defaultData.phone"
          />
        </div>

        <div class="input-box flex flex-col p-1">
          <label for=""> {{ $t("mobile") }}:</label>
          <input
            class="border w-full h-[40px] mt-2"
            type="text"
            name=""
            id=""
            v-model="defaultData.mobile"
          />
        </div>

        <div class="input-box flex flex-col p-1">
          <label for=""> {{ $t("email") }}:</label>
          <input
            class="border w-full h-[40px] mt-2"
            type="text"
            name=""
            id=""
            v-model="defaultData.fax"
          />
        </div>
        <div class="input-box flex flex-col p-1">
          <label for=""> {{ $t("saletel") }}:</label>
          <input
            class="border w-full h-[40px] mt-2"
            type="text"
            name=""
            id=""
            v-model="defaultData.mobile"
          />
        </div>
        <div class="input-box flex flex-col p-1">
          <label for=""> {{ $t("supporttel") }}:</label>
          <input
            class="border w-full h-[40px] mt-2"
            type="text"
            name=""
            id=""
            v-model="defaultData.postalCode"
          />
        </div>
      </div>
      <div class="w-full lg:w-1/2">
        <div class="map w-full h-[400px] bg-gray-300">
          <SelectMap
            v-if="show"
            :location="[defaultData.location.x, defaultData.location.y]"
            @getLatLong="
              (loc) => {
                ;
                defaultData.location.x = loc[0];
                defaultData.location.y = loc[1];
              }
            "
          />
        </div>
      </div>
      <div class="w-full">
        <div class="input-box flex flex-col p-1">
          <label for=""> {{ $t("address") }}:</label>
          
          <textarea
            class="border w-full h-[40px] mt-2"
            v-model="defaultData.addressValue"
            type="text"
            name=""
            id=""
          >
          </textarea>
        </div>
        <div class="input-box flex flex-col p-1">
          <label for="">{{ $t("addressEn") }}</label>
          <textarea
            class="border w-full h-[40px] mt-2"
            v-model="defaultData.summary"
            type="text"
            name=""
            id=""
          >
          </textarea>
        </div>
        <div class="input-box flex flex-col p-1">
          <label for=""> {{ $t("description") }}:</label>
          <TextEditor
            class="bg-white"
            v-model="defaultData.description"
          />
        </div>

        <div class="flex justify-end">
          <button @click="navigateTo('/detail')"
            class="bg-gray-600 m-1 w-[100px] hover:bg-gray-700 text-white p-1"
          >
            {{ $t("cancel") }}
          </button>
          <button
            class="bg-green-700 m-1 w-[100px] hover:bg-green-800 text-white p-1"
            @click="submitInfo()"
          >
            {{ $t("submite") }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

const show = ref(false);
const toast=useToast()
const isNew = ref(true);
const defaultData = ref({
  name: "",
  summary: "",
  description: "",
  addressValue: "",
  location: {
    x: 0,
    y: 0,
    location: "",
    distanceMeter: 0,
  },
  phone: "",
  mobile: "",
  postalCode: "",
  fax: "",
  clickUserGuid: "",
  label:"base-detail",
  label:"frontend"
});

onMounted(() => {
  pageLoader();
  setTimeout(() => {
    show.value = true;
  }, 2000);
});
const pageLoader = async () => {
  ;
  try {
    const data = await $fetch("/api/details/baseDetails", {
      method: "GET",
    });

    if (data.list.length > 0) {
      defaultData.value = data?.list[0];
      isNew.value = false;
    }
  } catch (error) {
    ;
    // navigateTo("/login")
  }
};

const submitInfo = async (type) => {
  try {
    const res = await $fetch("/api/details/baseDetails", {
      method: isNew.value?"POST":"PUT",
      body: defaultData.value,
    });
    if(res.isSuccess){
        toast.add({description:'عملیات با موفقیت انجام شد .',color:'green'})
        setTimeout(() => {
            navigateTo("/detail");
        }, 1000);
    }else{
        toast.add({description:res.messages[0]?.item1 || 'error',color:'red'})
    }
  } catch (error) {
    ;
    toast.add({description:'مشکلی پیش آمده دوباره امتحان کنید .',color:'red'})
  }
};
</script>
