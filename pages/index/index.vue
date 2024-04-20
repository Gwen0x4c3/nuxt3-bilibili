<template>
    <div>
        <!-- 头部 -->
        <AppHeader/>
        <!-- 首页内容 -->
        <!-- 频道列表 -->
        <van-tabs :title-active-color="'#fb7299'">
            <van-tab v-for="channel in channelList" :key="channel.id" :title="channel.name"/>
        </van-tabs>
        <!-- 视频列表 -->
        <div >
            <van-list 
                class="video-list"
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="loadVideos"
            >
                <AppVideo v-for="video in videos" :key="video.aid" :video="video"></AppVideo>
            </van-list>
            
        </div>
    </div>
</template>

<script setup lang="ts">
import type { VideoItem } from '@/types/video';
import type { PageResult } from '@/types/page';
const loading = ref(false);
const finished = ref(false);
const videos = ref<VideoItem[]>([]);
const current = ref(1);
const pagesize = 20;

async function loadVideos() {
    if (finished.value || loading.value) {
        return;
    }
    loading.value = true;
    const { data } = await useFetch(`/api/video`, {
        headers: {
            "Content-Type": "application/json"
        },
        params: {
            current: current.value,
            pagesize: pagesize
        }
    });
    if (!data.value) {
        loading.value = false;
        return;
    }
    const result: PageResult = data.value;
    current.value++; 
    videos.value.push(...result.record);
    if (current.value * pagesize > result.total) {
       finished.value = true;
    }
    loading.value = false;
}
loadVideos();

const { data: channelList } = useFetch('/api/channel');
</script>

<style>

</style>