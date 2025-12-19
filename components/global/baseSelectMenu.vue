<template>
    <div class="relative w-full">
      <USelectMenu
        v-bind="$attrs"
        v-model="model"
        class="w-full"
      >
        <!-- اسلات‌های option و selected -->
        <template v-if="$slots.option" #option="props">
          <slot name="option" v-bind="props" />
        </template>
        <template v-if="$slots.selected" #selected="props">
          <slot name="selected" v-bind="props" />
        </template>
      </USelectMenu>
  
      <!-- دکمه پاک کردن -->
      <div
        v-if="model"
        @click.stop="model = null"
        class="absolute left-2 flex items-center top-1/2 -translate-y-1/2 z-20 cursor-pointer bg-white rounded-full p-1 shadow"
      >
        <UIcon
          name="i-heroicons-x-mark-16-solid"
          class="w-4 h-4 text-red-500"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  const model = defineModel()
  </script>
  