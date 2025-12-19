<template>
  <CarBaseMain
    categoryDetailId="6"
    :hasPicture="true"
    :hasFile="true"
    titleCard=" دفترچه فنی خودرو "
    :isParent="true"
  >
    <div class="flex flex-wrap gap-3">
      <CarNoteBookMainNoteBook />
      <CarNoteBookInner />
    </div>
  </CarBaseMain>
</template>
