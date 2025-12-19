<template lang="">
  <div class="table-box">
    <div class="table-title flex justify-between">
      <div class="lg:w-max">
        <NuxtLink :to="props.add" class="btn add-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-plus-lg"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
             d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
            />
          </svg>
          {{ $t("addNewItem") }}
        </NuxtLink>
      </div>
    </div>

    <hr />

    <div class="table-header flex">
      <div class="lg:w-1/12 text-center">
        <strong>{{ $t("Row") }}</strong>
      </div>
      <div class="lg:w-2/12">
        <strong>{{ $t("title") }}</strong>
      </div>
      <div class="lg:w-1/12">
        <strong> {{ $t("id") }}</strong>
      </div>
      <div class="lg:w-1/12 text-center">
        <strong>{{ $t("theOperation") }}</strong>
      </div>
    </div>
    <div class="table-content">
      <div
        v-for="(item, index) in props?.data?.list"
        class="flex flex-wrap"
        :title="item?.summary"
      >
        <div class="lg:w-1/12 w-1/6 text-center">
          <span>{{
            props?.data.pageSize * (props?.data?.pageIndex - 1) + index + 1
          }}</span>
        </div>
        <div class="lg:w-2/12 w-5/6">
          <span class="mobile-key">{{ $t("Row") }}:</span>
          <span>{{ item?.name }}</span>
        </div>
        <div class="lg:w-1/12 w-1/2">
          <span class="mobile-key">{{ $t("id") }} :</span>

          <span> {{ item?.id }}</span>
        </div>

        <div class="lg:w-2/12 flex flex-wrap w-full">
          <nuxt-link
          :to="'/ProductUnit/insert'+item.id"
            class="btn btn-sm icon-btn rounded"
            title="ویرایش"

          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-pen"
              viewBox="0 0 16 16"
            >
              <path
                d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"
              />
            </svg>
          </nuxt-link>
          <button
            class="btn btn-sm icon-btn rounded"
            title="حذف"
            @click="
              () => {
                deleteItem(item?.id);
                $emit('getReload');
              }
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
              />
              <path
                fill-rule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div> 
</template>
<script setup>

const props = defineProps({
  add: String,
  data: Object,
  type: String,
});

const emit=defineEmits('getReload')

const deleteItem = async (id) => {

    try {
      const headers = useRequestHeaders(["cookie"]);

      const renderToString = await $fetch('/api/units/units', {
        method: "DELETE",
        headers,
        query: {
          id: id,
        },
      });
      if(res.isSuccess)
      emit('getReload')

    } catch (error) {
 
    }
  }

</script>
<style lang="scss" scoped>
.table-box {
  .table-title {
    padding-bottom: 15px;

    & > div {
      padding: 0 5px;
    }

    .btn {
      border: 1px solid #033057;
      border-radius: 5px;
      padding: 5px 10px;
      width: 100%;
      height: 40px;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: space-around;
      color: #033057;
    }
  }

  .table-function {
    & > div {
      padding: 0 5px;
    }

    .form-select {
      border: 1px solid #3333;
      border-radius: 5px;
      padding: 5px 10px;
      width: 100%;
      height: 40px;
      background: #fff;
    }

    .form-control {
      border: 1px solid #3333;
      border-radius: 5px;
      padding: 5px 10px;
      height: 40px;
      width: 100%;
      background: #fff;
    }

    .btn {
      background: #007d54;
      border-radius: 5px;
      padding: 5px 10px;
      height: 40px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      color: #fff;
    }
  }

  .table-header {
    background-color: #033057;
    border-radius: 5px 5px 0 0;
    padding: 10px 5px;
    color: #fff;

    @media (max-width: 991px) {
      & {
        display: none;
      }
    }
  }

  .table-content {
    border: 1px solid #3333;
    border-radius: 0 0 5px 5px;
    background-color: #fff;
    padding: 5px;
    font-size: 90%;

    .icon-btn {
      border-left: 1px solid #3333;
      padding: 0 10px;
    }

    & > div {
      border-radius: 5px;
      align-items: center;
      padding: 10px 0;
      transition: 0.2s;
      border: 2px solid transparent;

      &:hover {
        border-color: #054232 !important;
      }

      @media (min-width: 991px) {
        .mobile-key {
          display: none;
        }
      }

      @media (max-width: 991px) {
        & {
          // background: linear-gradient(#d9d9d9 42px, white 41px);
          background-repeat: no-repeat;
          border: 1px solid #3333;
          margin-bottom: 5px;
          padding: 5px;

          & > div {
            margin-bottom: 5px;
          }

          button {
            background: #2563eb;
            padding: 10px !important;
            width: 100%;
            border-radius: 4px;
            margin: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 5px;

            svg {
              path {
                fill: #fff;
              }
            }

            &:nth-child(2) {
              background: #713632;
            }
          }
        }
      }
    }

    & > div:nth-child(2n) {
      background-color: #f2f2f2;
    }
  }
}

.modal-cover {
  position: fixed;
  background: #00000077;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}
</style>
