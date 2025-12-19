<template lang="">
  <div class="loading-box">
        <div class="loader"></div>
<div class="loader"></div>
<div class="loader"></div>
      </div>
</template>
<script>
export default {
    
}
</script>

<style>
.loading-box {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0.4rem;
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgb(10, 200, 240);
    z-index: 10000;
}

.loader {
    height: 50px;
    width: 14rem;
    border-radius: 50px;
    position: relative;
    overflow: hidden;
}

.loader::after {
    content: '';
    position: absolute;
    width: 10rem;
    height: 50px;
    border-radius: 50px;
    background: white;
    box-shadow: 0 -0.6rem 0 rgba(220, 100, 160, 0.2) inset;

    animation: slide 4s ease-in-out infinite;
}

.loader:nth-child(2)::after {
    animation-delay: 0.2s;
}

.loader:nth-child(3)::after {
    animation-delay: 0.4s;
}

@keyframes slide {
    0% {
        left: -7rem;
    }


    50% {
        left: calc(100% - 50px);
    }


    100% {
        left: -7rem;
    }
}
</style>