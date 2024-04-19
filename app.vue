<template>
  <div>
    <NuxtLink to="/"><van-button type="primary">首页</van-button></NuxtLink>
    <NuxtLink to="/video"><van-button type="primary">视频</van-button></NuxtLink>
    <NuxtPage/>
  </div>
</template>
<script setup lang="ts">
useSeoMeta({
  title: "CAOBICAOBI 草碧草碧视频弹幕网站~",
  description: "CAOBICAOBI网站是模仿bilibili的网站",
  keywords: "B站,bilibili,草碧,manga,动漫,动画,电影"
})
</script>

<style lang="scss">
@import './assets/styles/base.scss';
@import './assets/styles/iconfont.scss';
/* vant-ui 主题定制 */
:root {
  --van-primary-color: #fb7299 !important;
  --van-back-top-background: #fbfbfb !important;
  --van-back-top-text-color: #666 !important;
}
</style>