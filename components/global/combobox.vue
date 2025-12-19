<template>
  <div class="combobox">
    <input
      type="text"
      v-model="searchQuery"
      @input="handleInput"
      @focus="show=true"
      @keydown.down="moveDown"
      @keydown.up="moveUp"
      @keydown.enter="selectItem"
      ref="input"
      :placeholder="placeholder"
    />
    <ul  class=" max-h-[300px] overflow-auto" v-if="filteredOptions.length > 0" :class="[show? '':'hidden']">
      <li
      class=" cursor-pointer"
        v-for="(option, index) in filteredOptions"
        :key="option[modelValue]"
        @click="selectItem($event, option)"
        :class="{ active: index === selectedIndex }"
      >
        {{ option[textModel] }}
      </li>
    </ul>
    <div v-if="show"  @click="value=null ; searchQuery='';show=false" class="text-red-600 absolute left-1 cursor-pointer top-1/4">X</div>
  </div>
</template>

<script setup>
const show=ref(false)
const input=ref(null)
const searchQuery = ref("");
const filteredOptions = ref([]);
const selectedIndex = ref(-1);
const value = defineModel();
const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  valueModel: {
    type: String,
    default: "id",
  },
  textModel: {
    type: String,
    default: "name",
  },
  placeholder:{
    type:String,
    default:'انتخاب ...'
  }
});
watchEffect(()=>{
  filteredOptions.value=props.options || []
  let model= props.options?.find(option => option[props.valueModel]==value.value)
  searchQuery.value=model ?model[props.textModel] : ''
})


function handleInput() {
  filteredOptions.value = props.options.filter((option) => {
    return option[props.textModel]
    .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
  });
  console.log(filteredOptions);
}
function moveDown() {
  if (selectedIndex.value < filteredOptions.value.length - 1) {
    selectedIndex.value++;
  }
}
function moveUp() {
  if (selectedIndex.value > 0) {
    selectedIndex.value--;
  }
}
function selectItem(e,option) {

  if (option) {
    
    value.value = option[props.valueModel];
    searchQuery.value = option[props.textModel];
  } else {
    value.value = filteredOptions.value[selectedIndex.value][props.valueModel];
    searchQuery.value =filteredOptions.value[selectedIndex.value][props.textModel];
    handleInput();
    selectedIndex.value=0
  }

  input.value.blur()
  show.value=false
}
</script>
<style scoped>
.combobox{
  position: relative;
}
.active {
  background-color: #eee;
}
input {
  width: 100%;
  padding: 10px;
  background: #fff;
  border-width: 1px;
}
input+ ul {
  border-width: 1px;
  background-color: #fff;
  position: absolute;
  right: 0;
  top: 100%;
  z-index: 50;
}
ul {
  width: 100%;
}

li {
  padding: 5px;
  border-bottom-width: 1px;
}
</style>
