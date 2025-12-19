<template lang="">
  <div class="w-full">

    <div class="tree-parent">
      <h1> {{$t('Treeselection')}}</h1>
      <!-- <div class="tree-selected-address">
        <span>آدرس انتخاب شده:
        </span>
        <input class=" form-control" type="text" placeholder="نوع محصول / دسته بندی / زیر دسته" id="" />

      </div> -->

      <ul class="tree">
        <li v-for="item in props.pageData?.list">
        <div class="branch-box" v-if="item.parentId==null">
          <div class="branch-name" >
          <div v-if="item?.children" @click="(e)=>{branchHandler(e);getCategoryItem(item.id)}" class="icon" title="برای دیدن زیر مجموعه کلیک کنید">
            <div class="h-line"></div>
            <div class="v-line"></div>
          </div>

          <input class="hidden" :id="item.name" type="radio" @change="inputHandler" :name="item.name" />
          <label :for="item.name" @click="go2insert(item.id )"> {{ item.name}} ({{item?.id}})</label>
        </div>
        <ul >
          
      <TreeBranch :data="branchData[item.label]"></TreeBranch>

        </ul>
        </div>
      </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import categoryData from "../../data.json";

const treeData = ref(null);
const branchData = ref({});
const props = defineProps(['pageData'])
// const dataHandler = (data) =>{
//   data.productType.forEach(item => {
//     
//     productType.value.push(item.name)
//   });

// }

onMounted(() => {
  // dataHandler(data);
  treeData.value = categoryData;
  ;
  ;
});

const branchHandler = (event) => {
  const vLine = event.target.children[1];
  const lineClassList = vLine.classList.value;
  const parent = event.target.closest("li");
  const parentClassList = parent.classList.value;

  ;

  if (
    lineClassList.includes("hide-line") &&
    parentClassList.includes("show")
  ) {
    vLine.classList.remove("hide-line");
    parent.classList.remove("show");
  } else {
    vLine.classList.add("hide-line");
    parent.classList.add("show");

  }
};

const getCategoryItem = async (id) => {

  try {
    const headers = useRequestHeaders(['cookie'])

    const data = await $fetch('/api/category/catItem', {
      method: 'GET',
      headers,
      query: {
        id: id
      }
    })
    // addStatus.value = true


    // newCategory.value=data.data
    // branchData.value = data.data.name
    // branchData.value = data.data.children
    const Label = data.data.label
    branchData.value[Label] = data.data.children
    ;
    //  return  data.data.children

  } catch (error) {

    ;
    // navigateTo("/login")
  }
  // return false
}

const go2insert = (id)=>{
  navigateTo(`/category/insert${id}`)
}

</script>
<style lang="scss" scoped>
.tree-parent {
  border: 1px solid rgba(51, 51, 51, 0.2);
  background-color: #eee;
  padding: 15px;
  border-radius: 5px;

  h1 {
    font-size: 20px;
  }

  .tree-selected-address {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #3333;
    padding-bottom: 10px;
    margin-bottom: 10px;

    span {
      min-width: 150px;
    }

  }

  .tree {
    width: fit-content;
  }
}

li {


  .branch-name {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 2px 8px;
    border-radius: 5px;
    transition: 0.2s;
    cursor: pointer;
    border: 1px solid transparent;

    .icon {
      width: 15px;
      height: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      margin-left: 10px;

      * {
        pointer-events: none;
      }

      .v-line {
        width: 2px;
        height: 100%;
        border-radius: 5px;
        background-color: #696969;
        position: absolute;
        right: 45%;
        top: 0;
        opacity: 1;
        transition: 0.5s;

        &.hide-line {
          transform: rotate(-90deg);
          opacity: 0;
        }
      }

      .h-line {
        height: 2px;
        width: 100%;
        border-radius: 5px;
        background-color: #696969;
      }
    }

    input {
      margin-left: 10px;
    }

    label {
      cursor: pointer;
    }

    &:hover {
      border: 1px solid #3333;
      background-color: #fff;
    }
  }

  &.show ul {
    display: block !important;
    ;
  }

  ul {
    overflow: hidden;
    transition: 0.2s;
    display: none;
    border-right: 1px solid #696969;
    margin-right: 35px;

    li {
      margin-right: 5px;
    }

  }

}</style>
