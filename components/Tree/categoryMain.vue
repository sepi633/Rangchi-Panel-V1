<template lang="">
  <div class="w-full">
    <ul class="tree w-full">
      <li v-for="item in props.pageData" class="w-full">
        <div class="branch-box">
          <div class="branch-name">
            <div           v-if="item?.children.length > 0" @click="(e) => {branchHandler(e);} " class="icon" title="برای دیدن زیر مجموعه کلیک کنید">
              <div class="h-line"></div>
              <div class="v-line"></div>
            </div>

  
            <div class="" :for="item.name"> {{ item.name }}</div>
            <div
              class="btn-box flex items-center justify-center  w-[140px] p-1 my-1"
            >
              <button class="btn" @click="addSubCategory(item.id)">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3 11.9995C3 10.8176 3.23279 9.64736 3.68508 8.55548C4.13738 7.46361 4.80031 6.4715 5.63604 5.63581C6.47177 4.80013 7.46392 4.13722 8.55585 3.68495C9.64778 3.23268 10.8181 2.9999 12 2.9999C13.1819 2.9999 14.3522 3.23268 15.4442 3.68495C16.5361 4.13722 17.5282 4.80013 18.364 5.63581C19.1997 6.4715 19.8626 7.46361 20.3149 8.55548C20.7672 9.64736 21 10.8176 21 11.9995C21 14.3863 20.0518 16.6754 18.364 18.3631C16.6761 20.0509 14.3869 20.999 12 20.999C9.61305 20.999 7.32387 20.0509 5.63604 18.3631C3.94821 16.6754 3 14.3863 3 11.9995ZM12 1C5.925 1 1 5.92476 1 11.9995C1 18.0742 5.925 22.9989 12 22.9989C18.075 22.9989 23 18.0742 23 11.9995C23 5.92476 18.075 1 12 1ZM13 6.99971C13 6.73451 12.8946 6.48016 12.7071 6.29264C12.5196 6.10511 12.2652 5.99976 12 5.99976C11.7348 5.99976 11.4804 6.10511 11.2929 6.29264C11.1054 6.48016 11 6.73451 11 6.99971V10.9995H7C6.73478 10.9995 6.48043 11.1049 6.29289 11.2924C6.10536 11.4799 6 11.7343 6 11.9995C6 12.2647 6.10536 12.519 6.29289 12.7065C6.48043 12.8941 6.73478 12.9994 7 12.9994H11V16.9992C11 17.2644 11.1054 17.5188 11.2929 17.7063C11.4804 17.8938 11.7348 17.9992 12 17.9992C12.2652 17.9992 12.5196 17.8938 12.7071 17.7063C12.8946 17.5188 13 17.2644 13 16.9992V12.9994H17C17.2652 12.9994 17.5196 12.8941 17.7071 12.7065C17.8946 12.519 18 12.2647 18 11.9995C18 11.7343 17.8946 11.4799 17.7071 11.2924C17.5196 11.1049 17.2652 10.9995 17 10.9995H13V6.99971Z"
                    fill="black"
                  />
                </svg>
              </button>

              <NuxtLink :to="'/categoryFeature/insert' + item.id" class="btn">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6 4C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V9C4 9.53043 4.21071 10.0391 4.58579 10.4142C4.96086 10.7893 5.46957 11 6 11H9C9.53043 11 10.0391 10.7893 10.4142 10.4142C10.7893 10.0391 11 9.53043 11 9V6C11 5.46957 10.7893 4.96086 10.4142 4.58579C10.0391 4.21071 9.53043 4 9 4H6ZM6 6H9V9H6V6ZM14 6C13.7348 6 13.4804 6.10536 13.2929 6.29289C13.1054 6.48043 13 6.73478 13 7C13 7.26522 13.1054 7.51957 13.2929 7.70711C13.4804 7.89464 13.7348 8 14 8H19C19.2652 8 19.5196 7.89464 19.7071 7.70711C19.8946 7.51957 20 7.26522 20 7C20 6.73478 19.8946 6.48043 19.7071 6.29289C19.5196 6.10536 19.2652 6 19 6H14ZM14 15C13.7348 15 13.4804 15.1054 13.2929 15.2929C13.1054 15.4804 13 15.7348 13 16C13 16.2652 13.1054 16.5196 13.2929 16.7071C13.4804 16.8946 13.7348 17 14 17H19C19.2652 17 19.5196 16.8946 19.7071 16.7071C19.8946 16.5196 20 16.2652 20 16C20 15.7348 19.8946 15.4804 19.7071 15.2929C19.5196 15.1054 19.2652 15 19 15H14ZM4 15C4 14.4696 4.21071 13.9609 4.58579 13.5858C4.96086 13.2107 5.46957 13 6 13H9C9.53043 13 10.0391 13.2107 10.4142 13.5858C10.7893 13.9609 11 14.4696 11 15V18C11 18.5304 10.7893 19.0391 10.4142 19.4142C10.0391 19.7893 9.53043 20 9 20H6C5.46957 20 4.96086 19.7893 4.58579 19.4142C4.21071 19.0391 4 18.5304 4 18V15ZM9 15H6V18H9V15Z"
                    fill="black"
                  />
                </svg>
              </NuxtLink>
              <NuxtLink
                :to="
                  '/discount?categoryId=' + item?.id + '&isAvailable=' + true
                "
                class="btn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12.79 21L3 11.21v2c0 .53.21 1.04.59 1.41l7.79 7.79c.78.78 2.05.78 2.83 0l6.21-6.21c.78-.78.78-2.05 0-2.83z"
                  />
                  <path
                    fill="currentColor"
                    d="M11.38 17.41c.39.39.9.59 1.41.59c.51 0 1.02-.2 1.41-.59l6.21-6.21c.78-.78.78-2.05 0-2.83L12.62.58C12.25.21 11.74 0 11.21 0H5C3.9 0 3 .9 3 2v6.21c0 .53.21 1.04.59 1.41zM5 2h6.21L19 9.79L12.79 16L5 8.21z"
                  />
                  <circle cx="7.25" cy="4.25" r="1.25" fill="currentColor" />
                </svg>
              </NuxtLink>
              <NuxtLink
                :to="'/discount/insertnew?typeId=41&catId=' + item.id"
                class="btn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="bi bi-tag"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0"
                  />
                  <path
                    d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1m0 5.586 7 7L13.586 9l-7-7H2z"
                  />
                </svg>
              </NuxtLink>
              <button class="btn" @click="getCategoryItem(item.id)">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M21.121 2.707C20.5584 2.14459 19.7955 1.82864 19 1.82864C18.2045 1.82864 17.4416 2.14459 16.879 2.707L15.199 4.387L7.293 12.293C7.16494 12.421 7.07404 12.5814 7.03 12.757L6.03 16.757C5.98803 16.9246 5.99018 17.1002 6.03626 17.2667C6.08234 17.4332 6.17077 17.5849 6.29293 17.7071C6.41509 17.8292 6.56681 17.9177 6.73331 17.9637C6.89982 18.0098 7.07542 18.012 7.243 17.97L11.243 16.97C11.4186 16.926 11.579 16.8351 11.707 16.707L19.556 8.859L21.293 7.121C21.8554 6.55842 22.1714 5.7955 22.1714 5C22.1714 4.20451 21.8554 3.44159 21.293 2.879L21.121 2.707ZM18.293 4.121C18.4805 3.93353 18.7348 3.82822 19 3.82822C19.2652 3.82822 19.5195 3.93353 19.707 4.121L19.879 4.293C20.0665 4.48053 20.1718 4.73484 20.1718 5C20.1718 5.26517 20.0665 5.51948 19.879 5.707L18.862 6.724L17.307 5.107L18.293 4.121ZM15.893 6.521L17.448 8.138L10.488 15.097L8.374 15.626L8.903 13.511L15.893 6.521ZM4 8C4 7.73479 4.10536 7.48043 4.29289 7.2929C4.48043 7.10536 4.73478 7 5 7H10C10.2652 7 10.5196 6.89465 10.7071 6.70711C10.8946 6.51957 11 6.26522 11 6C11 5.73479 10.8946 5.48043 10.7071 5.2929C10.5196 5.10536 10.2652 5 10 5H5C4.20435 5 3.44129 5.31607 2.87868 5.87868C2.31607 6.44129 2 7.20435 2 8V19C2 19.7957 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H16C16.7956 22 17.5587 21.6839 18.1213 21.1213C18.6839 20.5587 19 19.7957 19 19V14C19 13.7348 18.8946 13.4804 18.7071 13.2929C18.5196 13.1054 18.2652 13 18 13C17.7348 13 17.4804 13.1054 17.2929 13.2929C17.1054 13.4804 17 13.7348 17 14V19C17 19.2652 16.8946 19.5196 16.7071 19.7071C16.5196 19.8946 16.2652 20 16 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V8Z"
                    fill="black"
                  />
                </svg>
              </button>
              <button
                class="btn"
                @click="
                  () => {
                    showDeleteModal = true;
                    elId = item?.id;
                  }
                "
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9 5C9 4.46957 9.21071 3.96086 9.58579 3.58579C9.96086 3.21071 10.4696 3 11 3H13C13.5304 3 14.0391 3.21071 14.4142 3.58579C14.7893 3.96086 15 4.46957 15 5V6H19C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7C20 7.26522 19.8946 7.51957 19.7071 7.70711C19.5196 7.89464 19.2652 8 19 8H18V18C18 18.7956 17.6839 19.5587 17.1213 20.1213C16.5587 20.6839 15.7956 21 15 21H9C8.20435 21 7.44129 20.6839 6.87868 20.1213C6.31607 19.5587 6 18.7956 6 18V8H5C4.73478 8 4.48043 7.89464 4.29289 7.70711C4.10536 7.51957 4 7.26522 4 7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H9V5ZM10 8H8V18C8 18.2652 8.10536 18.5196 8.29289 18.7071C8.48043 18.8946 8.73478 19 9 19H15C15.2652 19 15.5196 18.8946 15.7071 18.7071C15.8946 18.5196 16 18.2652 16 18V8H10ZM13 6H11V5H13V6ZM10 9C10.2652 9 10.5196 9.10536 10.7071 9.29289C10.8946 9.48043 11 9.73478 11 10V17C11 17.2652 10.8946 17.5196 10.7071 17.7071C10.5196 17.8946 10.2652 18 10 18C9.73478 18 9.48043 17.8946 9.29289 17.7071C9.10536 17.5196 9 17.2652 9 17V10C9 9.73478 9.10536 9.48043 9.29289 9.29289C9.48043 9.10536 9.73478 9 10 9ZM14 9C14.2652 9 14.5196 9.10536 14.7071 9.29289C14.8946 9.48043 15 9.73478 15 10V17C15 17.2652 14.8946 17.5196 14.7071 17.7071C14.5196 17.8946 14.2652 18 14 18C13.7348 18 13.4804 17.8946 13.2929 17.7071C13.1054 17.5196 13 17.2652 13 17V10C13 9.73478 13.1054 9.48043 13.2929 9.29289C13.4804 9.10536 13.7348 9 14 9Z"
                    fill="black"
                  />
                </svg>
              </button>
              <NuxtLink
                class="btn"
                :to="'/category/detail-' + item.id + '-' + item.name"
                title="اطلاعات بیشتر"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="4"
                    d="m17 11l7.071-7.071L31.142 11l-7.07 7.071zm13 13l7.071-7.071L44.142 24l-7.07 7.071zM4 24l7.071-7.071L18.142 24l-7.07 7.071zm13 13l7.071-7.071L31.142 37l-7.07 7.071z"
                  />
                </svg>
              </NuxtLink>
            </div>
          </div>
          <ul>
            <TreeCategoryMain :pageData="item?.children"></TreeCategoryMain>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup>
const categoryBrands = ref();
const treeData = ref(null);
const branchData = ref({});
const checkAll = ref(false);
const props = defineProps(["pageData"]);
const categoryBrand = useCategoryBrand();

onMounted(async () => {});

const branchHandler = (event) => {
  const vLine = event.target.children[1];
  const lineClassList = vLine.classList.value;
  const parent = event.target.closest("li");
  const parentClassList = parent.classList.value;

  if (lineClassList.includes("hide-line") && parentClassList.includes("show")) {
    vLine.classList.remove("hide-line");
    parent.classList.remove("show");
  } else {
    vLine.classList.add("hide-line");
    parent.classList.add("show");
  }
};

const checkPermission = (id, list) => {
  let havePermisiion = false;

  list?.forEach((element) => {
    if (element.id == id) {
      havePermisiion = true;
    }
    // else{
    //   return false
    // }
  });

  return havePermisiion;
};
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
    gap: 10px;
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
}
</style>
