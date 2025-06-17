<template>
  <div class="fs-14 text-center notfound">
    <img src="@/assets/img/404.svg" />
    <p class="tip">哎呀，卫星网络丢失了～</p>
    <p>
      <router-link to="/home">返回首页</router-link>
    </p>
  </div>
</template>

<style scoped lang="less">
.notfound {
  height: 100vh;
  img {
    width: 152.5px;
    margin: 35% 0 -15px;
  }
  .tip {
    margin-bottom: 7.5px;
    font-size: 15.5px;
    line-height: 22px;
    color: #c3cedf;
  }
}
</style>
