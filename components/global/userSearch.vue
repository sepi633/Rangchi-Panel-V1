<template>
    <USelectMenu
    v-model="model"
    searchable
    searchable-placeholder="جستجو ..."
    class="w-full"
    placeholder="کاربر را انتخاب کنید"
    option-attribute="fullName"
    value-attribute="id"
    size="lg"
    :options="users"
  />
</template>
<script setup>
const users=ref([])
const model=defineModel()
onMounted(()=>{
    getUsers()
})
const getUsers = async () => {
  try {
    const res = await $fetch("/api/user/user", {
      method: "GET",
      query:{
        pageSize:100000
      }
    });
    users.value = res.list || [];
  } catch (error) {
    toast.add({ description: "مشکلی در دریافت نام کاربران پیش آمده است." });
  }
};
</script>