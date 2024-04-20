<template>
    <div class="app-header">
        <NuxtLink class="logo" to="/">
            <i class="iconfont Navbar_logo"></i>
        </NuxtLink>
        <a class="search" href="javascript:;">
            <i class="iconfont ic_search_tab"></i>
        </a>
        <a class="face" href="javascript:;">
            <img src="@/assets/images/user.jpg"/>
        </a>
        <div class="down-app">下载App</div>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
.app-header {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    background-color: #fff;
    .logo {
        flex: 1;
        .Navbar_logo {
            color: #FE5588;
            font-size: 28px;
        }
    }
    .search {
        padding: 0 8px;
        .ic_search_tab {
            color: #ccc;
            font-size: 22px;
        }
    }
    .face {
        padding: 0 15px;
        img {
            width: 26px;
            height: 26px;
        }
    }
    .down-app {
        background-color: #FB7299;
        padding: 5px 10px;
        color: #fff;
        border-radius: 5px;
        font-size: 12px;
    }
}
</style>