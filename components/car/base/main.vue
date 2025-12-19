<template>
  <UCard>
    <template #header>
      <div class="flex justify-between items-start">
        <div>

          <p>
            {{ titleCard + "(" + route.params.catName + ")" }}
          </p>
          <div class="flex gap-2">
            <p class="text-sm mt-4">
              در صورت خالی بودن اطلاعات میتوانید مقادیر را از یک خودرو دیگر کپی نمایید .
            </p>
            <UButton @click="openCopyModal=true" size="xs" icon="i-heroicons-document-duplicate-solid">  </UButton>
          </div>
          <CarCopy v-model="openCopyModal" :categoryDetailId="categoryDetailId" :title="'کپی مقادیر '+titleCard"/>
        </div>
        <div
          class="flex justify-end"
          v-if="!isParent || (isParent && list.length == 0)"
        >
          <UButton
            icon="i-heroicons-plus-small"
            size="sm"
            color="primary"
            square
            variant="solid"
            @click="newItem"
          />
        </div>
      </div>
    </template>
    <CarBaseCard
      v-for="item in list"
      :data="item"
      :key="item.id"
      :hasVideo="hasVideo"
      :hasPicture="hasPicture"
      :hasDescription="hasDescription"
      :hasFile="hasFile"
    >
      <div class="flex justify-end gap-4">
        <UButton
          icon="i-heroicons-trash"
          size="xs"
          color="red"
          square
          variant="solid"
          @click="
            openDeleteModal = true;
            selected = item;
          "
        />
        <UButton
          icon="i-heroicons-pencil-16-solid"
          size="xs"
          color="orange"
          square
          variant="solid"
          @click="
            openFormModal = true;
            isNew = false;
            selected = item;
          "
        />
      </div>
    </CarBaseCard>

    <CarDeleteInfoModal
      :titleCard="titleCard"
      v-model="openDeleteModal"
      @reload="pageLoader"
      :data="selected"
    />
    <CarBaseForm
      v-model="openFormModal"
      :data="selected"
      :isNew="isNew"
      @reload="pageLoader"
      :hasVideo="hasVideo"
      :hasPicture="hasPicture"
      :hasFile="hasFile"
      :hasDescription="hasDescription"
    />
    <slot />
  </UCard>
</template>
<script setup>
const props = defineProps({
  titleCard: {
    tyoe: String,
  },
  categoryDetailId: {
    type: String,
  },
  hasVideo: {
    type: Boolean,
    default: false,
  },
  hasPicture: {
    type: Boolean,
    default: false,
  },
  hasFile: {
    type: Boolean,
    default: false,
  },
  isParent: {
    type: Boolean,
    default: false,
  },
  hasDescription: {
    type: Boolean,
    default: true,
  },
});
const openCopyModal=ref(false)
const openFormModal = ref(false);
const openDeleteModal = ref(false);
const route = useRoute();
const isNew = ref(true);
const list = ref([]);
const selected = ref({
  name: "",
  summary: "",
  description: "",
  fileId: null,
  pictureId: null,
  categoryDetailId: null,
  categoryId: route.params.catId,
  priority: 0,
  sortBy:6
});
onMounted(() => {
  selected.value.categoryDetailId = props.categoryDetailId;
  pageLoader();
});

function newItem() {
  openFormModal.value = true;
  isNew.value = true;
  selected.value = {
    name: "",
    summary: "",
    description: "",
    fileId: null,
    pictureId: null,
    categoryDetailId: props.categoryDetailId,
    categoryId: route.params.catId,
  };
}
async function pageLoader() {
  try {
    let res = await $fetch("/api/categoryDetailValue/list", {
      method: "GET",
      query: {
        categoryId: route.params.catId,
        CategoryDetailId: props.categoryDetailId,
        sortBy: 7,
      },
    });
    list.value = res.list || [];
  } catch (error) {}
}
</script>
