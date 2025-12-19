<template>
  <div>
    <UTabs :items="items" orientation="vertical" :ui="{ wrapper: 'flex flex-wrap md:flex-nowrap gap-4', list: { width: 'w-48' ,base:'border '} }"  >
      <template #baseInfo="{ item }">
            <CarBaseMain categoryDetailId="3" :hasPicture="true" :hasVideo="true" titleCard="بررسی خودرو"/>
      </template>
      <template #alarms="{ item }">
      <CarAlarmsMain />
      </template>
      <template #keys="{ item }">
        <CarKeysMain />
      </template>
      <template #noteBook="{ item }">
        <CarNoteBookMain />
      </template>
      <template #Satisfaction="{ item }">
        <CarSatisfactionMain/>
      </template>
      <template #options="{ item }">
        <CarOptionsMain/>
      </template>
      <template #Technical="{ item }">
        <CarTechnicalMain/>
      </template>
      <template #facilities="{ item }">
        <CarFacilitiesMain />
      </template>
      <template #comments="{ item }">
        <CarCommentMain />
      </template>
      <template #gallery="{ item }">
        <CarGalleryMain />
      </template>
     <template #resetAlarm="{ item }">
        <CarResetAlarmMain/>
      </template>
      <template #forRepresents="{ item }">
        <CarForRepresentsMain/>
      </template>
      <template #TechnicalReview="{ item }">
        <CarTechnicalReviewMain/>
      </template>

    </UTabs>
    <p class="text-sm mt-4">
      در صورت خالی بودن اطلاعات میتوانید تمامی مقادیر را از یک خودرو دیگر کپی نمایید .
    </p>
    <UButton @click="openCopyModal=true">کپی کردن </UButton>
    <CarCopy v-model="openCopyModal" :categoryDetailValueId="null" title="کپی همه مقادیر"/>
  </div>
</template>
<script setup>

const openCopyModal=ref(false)
const items = [
  {
    label: "بررسی خودرو شما",
    // icon: "i-heroicons-information-circle",
    slot: "baseInfo",
},
{
    // icon: "i-heroicons-alarm-light",
    slot: "alarms",
    label: "آلارم ها",
},
{
    // icon: "i-heroicons-key-variant",
    slot: "keys",
    label: "کلیدها",
},
{
      // icon: "i-heroicons-information-circle",
    slot: "noteBook",
    label: "دفترچه",
  },
  {
    slot: "resetAlarm",
    label: "ریست آلارم ها",
  },
  {
    slot: "Satisfaction",
    label: "رضایت خودرو",
  },
  {
    slot: "options",
    label: "آپشن ها",
  },
  {
    slot: "Technical",
    label: "مشخصات فنی",
  },
  {
    slot: "facilities",
    label: "امکانات",
  },
  {
    slot: "comments",
    label: "نظر مالکین",
  },
  {
    slot: "gallery",
    label: "گالری ",
  },
  {
    slot: "forRepresents",
    label: "ویژه همکاران",
  },
  {
    slot: "TechnicalReview",
    label: "بررسی فنی خودرو",
  },
];
</script>
