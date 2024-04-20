<template>
    <NuxtLink class="v-card" :to="`/video/${video.bvid}`">
        <div class="card">
            <div class="card-image">
                <img class="pic" :src="video.pic" :alt="video.title"/>
            </div>
            <div class="card-info">
                <span>
                    <i class="iconfont icon_shipin_bofangshu"></i>
                    {{ formatNumber(video.stat.view) }}
                </span>
                <span>
                    <i class="iconfont icon_shipin_danmushu"></i>
                    {{ formatNumber(video.stat.danmaku) }}
                </span>
            </div>
        </div>
        <p class="title" v-text="video.title"></p>
    </NuxtLink>
</template>

<script setup lang="ts">
import type { VideoItem } from '@/types/video';
import { defineProps } from 'vue';
const { video } = defineProps<{
    video: VideoItem
}>();
function formatNumber(num: number) {
    if (num < 10000) {
        return num;
    } else {
        return (num / 10000).toFixed(1) + '万'
    }
}

</script>

<style lang="scss">
.video-list {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 5px;
}
.v-card {
    width: 50%;
    padding: 0 5px 10px;
    .card {
        position: relative;
        background: #f3f3f3 url("@/assets/images/default.png") center no-repeat;
        background-size: 36%;
        border-radius: 2px;
        overflow: hidden;
        .card-image .pic {
            height: 100px;
            width: 100%;
            object-fit: cover;
        }
        .card-info {
            background-image: linear-gradient(0deg #000000d9, #0000);
            color: #fff;
            position: absolute;
            bottom: 0;
            left: 0;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 5px 6px;
            width: 100%;
            span {
                text-shadow: 0 0 5px black;
                .iconfont {
                    font-size: 12px;
                }
            }
        }
    }
    .title {
        margin-top: 5px;
        font-size: 12px;
        color: #212121;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
}
</style>