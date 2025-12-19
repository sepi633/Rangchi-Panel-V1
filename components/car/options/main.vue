<template>
  <CarBaseMain
    categoryDetailId="9"
    :hasPicture="true"
    titleCard="  آپشن های خودرو "
    :isParent="true"
  >
    <div class="flex flex-wrap gap-3">
      <CarOptionsInner :categoryDetailId="31" btnTitle="صفحه داخلی آپشن خودرو"/>
      <CarOptionsInner :categoryDetailId="36" btnTitle="آپشن های کمک راننده"/>
      <CarOptionsInner :categoryDetailId="37" btnTitle="آپشن های هشدار دهنده"/>
      <CarOptionsInner :categoryDetailId="38" btnTitle="آپشن های ویژه"/>
    </div>
  </CarBaseMain>
</template>
