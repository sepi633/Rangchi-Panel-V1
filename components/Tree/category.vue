<template lang="">
  <div class="w-full">

    <div class="tree-parent">
      <h1 class='border-b border-[#b3b3b3] pb-[10px] mb-[10px]'> {{$t('CategoryTree')}}</h1>

      <ul class="tree">
        <li v-for="item in props.pageData?.children">
        <div class="branch-box" >
          <div class="branch-name" >
          <div v-if="item?.children.length > 0" @click="(e)=>{branchHandler(e);}" 
            class="icon" title="برای دیدن زیر مجموعه کلیک کنید">
            <div class="h-line"></div>
            <div class="v-line"></div>
          </div>

          <input class="persmission-input" :class="{'ms-5 ':item?.children.length == 0}" :id="item.name" type="checkbox" :value="JSON.stringify(item)"
            :checked="checkPermission(item?.id , categoryBrand?.list?.categoryDto)"
             :name="item.name" /> 
          <label :for="item.name"> {{ item.name}}</label>
        </div>
        <ul >
          
          <TreeCategoryBranch   :data="item?.children" :allcheck="true"></TreeCategoryBranch>

        </ul>
        </div>
      </li>
      </ul>
    </div>
  </div>
</template>
<script setup>

const categoryBrands = ref()
const treeData = ref(null);
const branchData = ref({});
const checkAll = ref(false);
const props = defineProps(['pageData'])
const categoryBrand = useCategoryBrand()

onMounted(async () => {
  

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


const checkPermission = (id,list)=>{
  let havePermisiion = false

    list?.forEach(element => {
    if(element.id == id){
      
      havePermisiion = true
    }
    // else{
    //   return false
    // }
  });

  return havePermisiion
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
      margin-right: 10px;
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
