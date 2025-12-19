

<template>
  <CarBaseMain
    categoryDetailId="15"
    titleCard="میزان رضایت از خودرو"
    :hasPicture="false"  
     :hasDescription="false" 
  >
  <p class=" w-full text-sm p-4">
    عدد درصد را با اعداد انگلیسی درون متن کوتاه وارد کنید
  </p>
  <div class="flex gap-4">
    <CarSatisfactionItems :categoryDetailId="21" titleCard="امتیاز کلی"/>
    <CarSatisfactionText />
  </div>
  
  </CarBaseMain>
</template>
