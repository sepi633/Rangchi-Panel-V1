// components/Modal.vue
<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="modal__overlay">
        <div class="modal__container">
          <div class="modal__header">
            <slot name="header"></slot>
            <button @click="closeModal" class="modal__close">
              X
            </button>
          </div>
          <div class="modal__body">
            <slot name="body"></slot>
          </div>
          <div class="modal__footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup  >


const isOpen = ref(false);

function openModal() {
  isOpen.value = true;
}

function closeModal() {
  isOpen.value = false;
}

defineExpose({ openModal, closeModal });
</script>

<style scoped lang="scss">
.modal {

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }

  &__container {
    background-color: #fff;
    border-radius: 0.3rem;
    padding: 1rem;
    width: 100%;
    max-width: 70%;
    margin: 40px auto;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1rem;
    border-bottom: 1px solid #ddd;
  }

  &__close {
    background-color: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  &__body {
    padding: 2rem;
  }

  &__footer {
    padding: 1rem;
    border-top: 1px solid #ddd;
    text-align: left;

  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: 0.25s ease all;
}
</style>