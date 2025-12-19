<template>
  <div>
    <div class="flex w-full my-2">
      <input
        class="border bg-yellow-100 p-1 rounded me-1"
        v-model="categoryName"
        type="عنوان دسته بندی مورد نظر خودرا وارد کنید ..."
        name=""
        @keyup="treeSearch(categoryName)"
      />
    </div>
    <div class="flex w-full gap-1">
      <div
        class="w-1/4 p-1 bg-gray-100 border scrollbar-thin h-auto max-h-[60vh] overflow-scroll"
      >
        <div class="card p-1 w-full h-full">
          <p class="border-b" v-for="item in searchResult.level1" :key="item.id">
            <label
              class="flex items-center cursor-pointer text-sm py-3"
              :for="`${label}-${item.id}`"
            >
              <input
                class="me-1"
                :type="isMulti ? 'checkbox' : 'radio'"
                :value="item.id"
                :id="`${label}-${item.id}`"
                v-model="category"
              />
              {{ item?.name }}
            </label>
          </p>
        </div>
      </div>
      <div
        class="w-1/4 p-1 bg-gray-100 border scrollbar-thin h-auto max-h-[60vh] overflow-scroll"
      >
        <div class="card bg-gray-100 w-full h-full">
          <p class="border-b" v-for="item in searchResult.level2" :key="item.id">
            <label
              class="flex items-center cursor-pointer text-sm py-3"
              :for="`${label}-${item.id}`"
            >
              <input
                class="me-1" 
                :type="isMulti ? 'checkbox' : 'radio'"
                :value="item.id"
                :id="`${label}-${item.id}`"
                v-model="category"
              />
              {{ item?.name }}
            </label>
          </p>
        </div>
      </div>
      <div
        class="w-1/4 p-1 bg-gray-100 border scrollbar-thin h-auto max-h-[60vh] overflow-scroll"
      >
        <div class="card bg-gray-100 w-full h-full">
          <p class="border-b" v-for="item in searchResult.level3" :key="item.id">
            <label
              class="flex items-center cursor-pointer text-sm py-3"
              :for="`${label}-${item.id}`"
            >
              <input
                class="me-1"
                :type="isMulti ? 'checkbox' : 'radio'"
                :value="item.id"
                :id="`${label}-${item.id}`"
                v-model="category"
              />
              {{ item?.name }}
            </label>
          </p>
        </div>
      </div>
      <div
        class="w-1/4 p-1 bg-gray-100 border scrollbar-thin h-auto max-h-[60vh] overflow-scroll"
      >
        <div class="card bg-gray-100 w-full h-full">
          <p class="border-b" v-for="item in searchResult.level4" :key="item.id">
            <label
              class="flex items-center cursor-pointer text-sm py-3"
              :for="`${label}-${item.id}`"
            >
              <input
                class="me-1"
                :type="isMulti ? 'checkbox' : 'radio'"
                :value="item.id"
                :id="`${label}-${item.id}`"
                v-model="category"
              />
              {{ item?.name }}
            </label>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const category = defineModel();
const props = defineProps({
  isMulti: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: 'cat',
  },
  categoris: {
    type: Array,
    default: [],
  },
});
const categoryName = ref("");
const searchResult = ref({
  level1: [],
  level2: [],
  level3: [],
  level4: [],
});

function treeSearch(name) {
  searchResult.value = {
    level1: [],
    level2: [],
    level3: [],
    level4: [],
  };

  props.categoris?.children?.forEach((element) => {
    if (element.name.includes(name)) {
      searchResult.value?.level1.push(element);
    }
    if (element.children.length > 0) {
      element.children.forEach((item) => {
        if (item.name.includes(name)) {
          searchResult.value?.level2.push(item);
        }

        if (item.children.length > 0) {
          item.children.forEach((el) => {
            if (el.name.includes(name)) {
              searchResult.value?.level3.push(el);
            }
            if (el.children.length > 0) {
              el.children.forEach((el2) => {
                if (el2.name.includes(name)) {
                  searchResult.value?.level4.push(el2);
                }
              });
            }
          });
        }
      });
    }
  });
}
watch(
  () => props.categoris,
  () => {
    if (props.categoris) treeSearch("");
  }
);
</script>
<style>
.scrollbar-thin::-webkit-scrollbar {
  width: 5px;
  margin: 0 5px;
}

/* Track */
.scrollbar-thin::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

/* Handle on hover */
.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
