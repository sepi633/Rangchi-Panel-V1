<script setup>

const editorData = defineModel();
const editorComponent = shallowRef(null);
const editorConstructor = shallowRef(null);

onMounted(async () => {
  const { default: CKEditor } = await import('@ckeditor/ckeditor5-vue');
  const { default: Editor } = await import('~/lib/CustomEditor');

  editorComponent.value = markRaw(CKEditor.component); 
  editorConstructor.value = markRaw(Editor);          
});
</script>

<template>
  <component
    v-if="editorComponent && editorConstructor"
    :is="editorComponent"
    :editor="editorConstructor"
    v-model="editorData"
    class="ckeditor-wrapper"
  />
</template>

<style scoped>
.ckeditor-wrapper {
  width: 100%;
  max-width: 800px;
  box-sizing: border-box;
}

.ck-content {
  min-height: 200px;
  direction: rtl;      
  text-align: right;    
  font-family: Vazirmatn, sans-serif;
}

.ck-editor__editable_inline {
  max-width: 100%;
  box-sizing: border-box;
}

.ck.ck-toolbar {
  flex-wrap: wrap !important;
}
</style>
