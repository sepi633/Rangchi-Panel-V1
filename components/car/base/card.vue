<template>
  <UCard class="my-2">
    <template #header>
      <div class="flex justify-between">
        <div class="flex gap-2 items-center">
          <div>
            {{ data?.name }}
          </div>
          <div class="flex gap-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><!-- Icon from Google Material Icons by Material Design Authors - https://github.com/material-icons/material-icons/blob/master/LICENSE --><path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5m0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3"/></svg>
            {{data?.visitCount}}
          </div>
        </div>
        <slot />
      </div>
    </template>
    <UAccordion :items="list">
      <template #default="{ item, index, open }">
        <UButton
          color="gray"
          variant="ghost"
          class="border-b border-gray-200 dark:border-gray-700"
          :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }"
        >
          <span class="truncate">{{ index + 1 }}. {{ item.label }}</span>

          <template #trailing>
            <UIcon
              name="i-heroicons-chevron-left-20-solid"
              class="w-5 h-5 ms-auto transform transition-transform duration-200"
              :class="[open && '-rotate-90']"
            />
          </template>
        </UButton>
      </template>
      <template #item="{ item }">
        <p class="text-gray-900 dark:text-white start">
          {{ item.description }}
        </p>
      </template>
      <template #description="{ item }">
        <div v-html="item.description" class="content"></div>
      </template>
      <template #image="{ item }">
        <div v-if="item.picture" class="flex justify-center">
          <img :src="picture.getPicUrl(item.picture, 'md')" alt="" />
        </div>
      </template>
      <template #video="{ item }">
        <div v-if="item.file" class="flex justify-center">
          <video
            :src="picture.getFileUrl(item.file)"
            controls
            class="max-h-40"
          />
        </div>
      </template>
      <template #file="{ item }">
        <div v-if="item.file" class="flex justify-center">
          <a
            :href="picture.getFileUrl(item.file)"
            class="max-h-40 p-2 bg-gray-200"
         >دانلود </a>
        </div>
      </template>
    </UAccordion>
  </UCard>
</template>
<script setup>
const props = defineProps(["data", "hasVideo", "hasPicture", "hasDescription","hasFile"]);
const picture = usePicture();
let list = computed(() => {
  let list = [
    {
      label: "متن کوتاه",
      defaultOpen: true,
      description: props?.data?.summary,
    },
  ];
  if (props.hasDescription) {
    list.push({
      slot: "description",
      label: "متن بلند",
      defaultOpen: false,
      description: props?.data?.description,
    });
  }
  if (props.hasPicture) {
    list.push({
      label: "عکس",
      defaultOpen: false,
      slot: "image",
      picture: props.data?.picture,
    });
  }
  if (props.hasVideo) {
    list.push({
      label: "ویدیو",
      defaultOpen: false,
      file: props.data?.file,
      slot: "video",
    });
  }
  if (props.hasFile) {
    list.push({
      label: "فایل",
      defaultOpen: false,
      file: props.data?.file,
      slot: "file",
    });
  }
  return list;
});
</script>
