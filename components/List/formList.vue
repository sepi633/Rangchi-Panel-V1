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
      <div class="lg:w-2/12" v-if="type == 'formQuestion' || type == 'form' || type == 'answer'">
        <strong>{{ $t("title") }}</strong>
      </div>
      <div class="lg:w-2/12" v-if="type == 'questionOption'">
        <strong>{{ $t("title") }}</strong>
      </div>
      <div class="lg:w-2/12" v-if=" type == 'form'">
        <strong>{{ $t("label") }}</strong>
      </div>
      <div class="lg:w-1/12">
        <strong> {{ $t("id") }}</strong>
      </div>
      <div class="lg:w-1/12 text-center"  v-if="type != 'answer'">
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
        <div
          class="lg:w-2/12 w-5/6"
          v-if="type == 'formQuestion' || type == 'form' || type == 'answer'"
        >
          <span class="mobile-key">{{ $t("Row") }}:</span>
          <span>{{ item?.name }}</span>
        </div>
        <div
          class="lg:w-2/12 w-1/2"
          v-if=" type == 'form'"
        >
          <span class="mobile-key">{{ $t("label") }} :</span>

          <span> {{ item?.label }}</span>
        </div>
        <div class="lg:w-2/12 w-1/2" v-if="type == 'questionOption'">
          <span class="mobile-key">{{ $t("title") }} :</span>

          <span> {{ item?.value }}</span>
        </div>

        <div class="lg:w-1/12 w-1/2">
          <span class="mobile-key">{{ $t("id") }} :</span>

          <span> {{ item?.id }}</span>
        </div>

        <div class="lg:w-2/12 flex flex-wrap gap-2 w-full">
          <nuxt-link
          v-if="type != 'answer'"
            :to="
              add == '/form/insertnew'
                ? '/form/insert' + item.id
                : type == 'formQuestion'
                ? '/formQuestion/insert' + item.id
                : '/questionOption/insert' + item?.id
            "
            class="flex gap-x-3 bg-gray-100 p-1 border rounded items-center text-sm"
            title="ویرایش"
          >
            ویرایش
          </nuxt-link>
          <button
           v-if="type != 'answer'"
            class="flex gap-x-3 bg-gray-100 p-1 border rounded items-center text-sm"
            title="حذف"
            @click="
              () => {
                $emit('getReload', item?.id);
              }
            "
          >
            حذف
          </button>
          <nuxt-link
            v-if="type == 'form'"
            :to="'/formQuestion/insertnew?formId=' + item.id"
            class="flex gap-x-3 bg-gray-100 p-1 border rounded items-center text-sm"
            title="سوالات"
          >
            افزودن سوال
          </nuxt-link>
          <nuxt-link
            v-if="type == 'form'"
            :to="'/formQuestion?formId=' + item.id"
            class="flex gap-x-3 bg-gray-100 p-1 border rounded items-center text-sm"
            title="سوالات"
          >
            مشاهده سوالات
          </nuxt-link>
          <nuxt-link
            v-if="
              type == 'formQuestion' &&
             ( item?.type?.label == 'MultipleChoice' ||
              item?.type?.label == 'SingleChoice')
            "
            :to="'/questionOption/insertnew?questionId=' + item.id"
            class="flex gap-x-3 bg-gray-100 p-1 border rounded items-center text-sm"
            title="سوالات"
          >
            افزودن گزینه
          </nuxt-link>
          <nuxt-link
            v-if="
              type == 'formQuestion' &&
             ( item?.type?.label == 'MultipleChoice' ||
              item?.type?.label == 'SingleChoice')
            "
            :to="'/questionOption?questionId=' + item.id"
            class="flex gap-x-3 bg-gray-100 p-1 border rounded items-center text-sm"
            title="سوالات"
          >
            مشاهده گزینه ها
          </nuxt-link>
          <nuxt-link
            v-if="type == 'answer'"
            :to="'/answerForm/answer'+item?.label"
            class="flex gap-x-3 bg-gray-100 p-1 border rounded items-center text-sm"
            title="سوالات"
          >
            مشاهده پاسخنامه ها
          </nuxt-link>
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

const emit = defineEmits("getReload");
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
