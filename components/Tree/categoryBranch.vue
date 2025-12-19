<template lang="">
 
    <li v-for="item in data" class='branch-box-1'>
      <div class="branch-name">
        <div v-if="item?.children.length>0" @click="branchHandler" class="icon" title="برای دیدن زیر مجموعه کلیک کنید">
          <div class="h-line"></div>
          <div class="v-line"></div>
        </div>
  
        
        
        <input :id="item.name"  type="checkbox" class="persmission-input"
          :checked="checkPermission(item?.id, categoryBrand?.list?.categoryDto)"
  
   :value="JSON.stringify(item)" :name="item.name" />
        <label :for="item.name"> {{ item.name }} </label>
  
      </div>
      <ul >
        <TreeInputTreeBranch :data="item.children"></TreeInputTreeBranch>
        
      </ul>
    </li>
  </template>
  <script>
  
  export default {
    
    props: {
      data: Object,
    },
    setup(props) {
     
      const categoryBrand = useCategoryBrand()
      // onUpdated(()=>{
      //   ;
      //   ;
      // })

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
      
      const checkedParent = (checkedInput)=>{
        const parentNode = checkedInput.closest("li:last-child");
        
        // if()
        
      }
  
      const inputHandler =(event)=>{
        const input = event.target
        const firstParent = event.target.closest('li:first-child');
        if(input.checked == true)
          checkedParent(input)
      }
  
      const getParent = (item) =>{
        ;
      }
  
      
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
  
  
      return {
        branchHandler,
        inputHandler,
        getParent,
        checkPermission,categoryBrand
        
      };
    },
  };
  </script>
  <style lang="scss" scoped>
  
  li {
    
    
        .branch-name {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding:2px 8px ;
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
            margin-right: 10px;
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
  
          label{
            cursor: pointer;
          }
  
          &:hover{
              border: 1px solid #3333;
            background-color: #fff;
          }
        }
  
        ul {
          overflow: hidden;
          transition: 0.2s;
          display: none;
          border-right: 1px solid #696969;
          margin-right: 35px;
  
          li{
            margin-right: 5px;
          }
  
        }
        &.show > ul {
          display: block !important;
        }
      }
  </style>
  