<template>
    <div class="loading"></div>
</template>

<style scoped lang="scss">
.loading{
    width: 25px;
    height: 25px;
    border: 4px solid #ffffff6c;
    border-radius: 50%;
    border-top: 4px solid #fff;
    animation: roatate 1s infinite;
}

@keyframes roatate{
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);

    }
}
</style>