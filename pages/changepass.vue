<template>
  <div class="w-1/2 mx-auto p-10">
    <h1 class="text-xl font-bold my-10">تغییر رمز عبور</h1>
    <div class="input-box flex flex-col w-full p-1">
      <label for=""> رمز عبور قبلی :</label>
      <input
        class="border w-full h-[40px] mt-2"
        type="password"
        name=""
        v-model="data.oldPassword"
        id=""
      />
      <div class="text-sm text-red-600">
        {{ err1 }}
      </div>
    </div>
    <div class="input-box flex flex-col w-full p-1">
      <label for=""> رمز عبور جدید :</label>
      <input
        class="border w-full h-[40px] mt-2"
        type="password"
        name=""
        v-model="data.newPassword"
        id=""
      />
    </div>
    <div class="input-box flex flex-col w-full p-1">
      <label for=""> تکرار رمز عبور جدید :</label>
      <input
        class="border w-full h-[40px] mt-2"
        type="password"
        name=""
        v-model="cpass"
        id=""
      />
      <div class="text-sm text-red-600">
        {{ err2 }}
      </div>
    </div>
    <div class="submit-box flex flex-wrap justify-end w-full">
      <button
        class="btn bg-[#333] m-3 ml-1 px-3 py-1 text-white"
        @click="navigateTo('/')"
      >
        لغو
      </button>

      <button
        class="btn bg-[#136b57] w-2/12 my-3 px-3 py-1 text-white"
        @click="submitInfo()"
      >
        {{ $t("confirm") }}
      </button>
    </div>
  </div>
</template>
<script setup>
const cpass = ref("");
const key = useCookie("key");
const toast = useToast();
const loading=ref(false)
const data = ref({
  oldPassword: "",
  newPassword: "",
});
const err1 = ref("");
const err2 = ref("");
function validate() {
  try {    
    if (!data.value.oldPassword)
      err1.value = "وارد کردن رمز قبلی الزامی است .";
    else {
      err1.value = "";
    }
    if (cpass.value != data.value.newPassword) {
      err2.value = " رمزعبور و تکرار رمزعبور یکسان نمیباشد .";
    } else {
      err2.value = "";
    }
  } catch (error) {
    console.log(error);
  }
}

async function submitInfo() {
      if(loading.value)
    return
  loading.value=true
  validate();
  if (err1.value.length == 0 && err2.value.length == 0) {
    try {
      let res = await $fetch("/api/auth/changePassword", {
        method: "post",
        body: data.value,
      });
      if (res.isSuccess) {
        toast.add({description:"عملیات با موفقیت انجام شد .",color:'green'});
        key.value = "";
        navigateTo("/");
      } else {
        res.messages.forEach((element) => {
          toast.add({description:element.item1,color:'red'});
        });
      }
    } catch (error) {
      toast.add({description:"مشکلی پیش امده است دوباره تلاش کنید.",color:'red'});
    }
  }
  loading.value=false
}
</script>
