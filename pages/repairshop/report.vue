<template>
  <div class="p-8">
    <UCard>
      <template #header>
        <div class="flex gap-4">
          <UFormGroup class="flex-1" label="وضعیت درخواست">
            <BaseSelectMenu
              v-model="requestStateId"
              :options="codes"
              option-attribute="name"
              value-attribute="id"
            >
            </BaseSelectMenu>
          </UFormGroup>
          <UFormGroup class="flex-1" label="استان">
            <BaseSelectMenu
              v-model="stateId"
              :options="states"
              option-attribute="name"
              value-attribute="id"
            >
            </BaseSelectMenu>
          </UFormGroup>
          <UFormGroup class="flex-1" label="شهر">
            <BaseSelectMenu
              v-model="cityId"
              :options="cities"
              option-attribute="name"
              value-attribute="id"
            >
            </BaseSelectMenu>
          </UFormGroup>
          <UFormGroup class="flex-1" label="اتحادیه / سرویسکار">
            <UToggle v-model="guild" />
          </UFormGroup>
        </div>
      </template>

      <div class="flex gap-4">
        <div class="font-bold text-lg">تعداد</div>
        :
        <div>
          {{ count }}
        </div>
      </div>
    </UCard>
  </div>
</template>
<script setup>
const count = ref(0);
const stateId = ref();
const cityId = ref();
const guild = ref(false);
const requestStateId = ref();
const codes = ref();
const { states, getCity } = useCity();
const cities = ref([]);
watch(
  () => stateId.value,
  async () => {
    cities.value = await getCity(stateId.value);
  }
);

watch([cityId, stateId, requestStateId], () => {
  loadData();
});
async function loadData() {
  try {
    let res = await $fetch("/api/repairshop/repairshops", {
      query: {
        cityId: cityId.value,
        stateId: stateId.value,
        requestStateId: requestStateId.value,
        guild: guild.value,
      },
    });
    count.value = res.totalCount;
  } catch (error) {}
}

onMounted(async () => {
  codes.value = await useCode().getCode("RequestState");
});
</script>
