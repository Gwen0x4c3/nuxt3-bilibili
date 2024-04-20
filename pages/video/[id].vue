<template>
    <div>
        <van-sticky>
            <AppHeader />
            <van-barrage v-model="currentDanmaku" :auto-play="false" ref="barrageRef">
                <!-- 视频 -->
                <video
                    controls
                    class="video-play"
                    ref="videoRef"
                    @play="onPlay"
                    @pause="onPause"
                    @timeupdate="onTimeUpdate"
                    :poster="video?.pic"
                    src="https://video.pearvideo.com/mp4/third/20230706/cont-1784445-12033417-151259-hd.mp4"
                ></video>
            </van-barrage>
        </van-sticky>
        <!-- 标题作者信息 -->
        <div class="info">
            <h1 class="title-text">{{ video?.title }}</h1>
            <div class="body">
                <div class="author">
                    <img class="avatar" :src="video?.author.face" />
                    <span class="name">{{ video?.author.name }}</span>
                </div>
            </div>
        </div>
        <!-- 相关推荐 -->
        <div class="relate">
            <h3 class="relate-title">相关推荐</h3>
            <div class="relate-list">
                <AppVideo v-for="item in videoList" :key="item.aid" :video="item" />
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import type { Danmaku, VideoItem } from '@/types/video';
const { params } = useRoute();
const bvid = params.id;
const video = ref<VideoItem>();
const videoElem = ref<HTMLVideoElement>();
const danmaku = ref<Danmaku[]>([]);
/** 从第几个开始找弹幕 */
const danmakuStart = ref<number>(0);
const currentDanmaku = ref<any[]>([]);
const videoList = ref<VideoItem[]>([]);
const barrageRef = ref();

function handleError(message: string) {
    showFailToast(message);
}

function throttle(this: any, fn: any, delay: number) {
    console.log("call throttle", fn, delay)
    let timer: any = null;
    let that = this;
    return (args: any) => {
        if (timer) return;
        timer = setTimeout(() => {
            fn.apply(that, args);
            timer = null;
        }, delay);
    }
}

async function getVideo() {
    const { data } = await useFetch<VideoItem>(`/api/video/${bvid}`);
    video.value = data.value as VideoItem;
    if (!video.value?.bvid) {
        handleError("视频加载失败")
    }
}

async function getDanmaku() {
    const { data } = await useFetch<Danmaku[]>(`/api/danmaku/${bvid}`)
    if (!data.value) {
        showFailToast("弹幕加载失败");
        return;
    }
    danmaku.value = data.value;
}

async function getRelatedVideos() {
    const { data } = await useFetch<VideoItem[]>("/api/video/relate", {
        params: {
            bvid: bvid
        }
    })
    if (!data.value) {
        return;
    }
    videoList.value = data.value;
}

async function init() {
    getVideo();
    getDanmaku();
    getRelatedVideos();
    videoElem.value = document.querySelector('.video-play') as HTMLVideoElement;
}

function updateDanmakuStart(currentTime: number) {
    console.log('更新时间', currentTime)
    let l =  0, r = danmaku.value.length - 1;
    while (l < r) {
        const mid = Math.floor((l + r) / 2);
        const item: Danmaku = danmaku.value[mid];
        if (item.start < currentTime) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
    danmakuStart.value = r;
    console.log("起始：", danmakuStart.value)
}

function onPlay(e: any) {
    console.log("current", e)
    barrageRef.value?.play();
}

function onPause(e: any) {
    console.log("pause", e.target.currentTime)
    barrageRef.value?.pause();
}

function handleTimeUpdate() {
    const time: number = videoElem.value?.currentTime as number;
    const preStart = danmakuStart.value;
    updateDanmakuStart(time as number);
    let idx = danmakuStart.value, total = danmaku.value.length;
    if (idx == preStart) return;
    if (idx == total - 1) {
        return;
    }
    for (let i = preStart; i <= idx; i++) {
        if (danmaku.value[i].start > time) {
            break;
        }
        currentDanmaku.value.push({
            id: danmaku.value[i].id,
            text: danmaku.value[i].content
        });
    }
}

const onTimeUpdate = throttle(handleTimeUpdate, 500);

init();
</script>

<style lang="scss">
.video-play {
    width: 100vw;
    height: calc(100vw * 9 / 16);
    object-fit: contain;
    background-color: black;
}
.info {
  padding: 10px;
  border-bottom: 1px solid #eee;
  .title-text {
    font-size: 16px;
    font-weight: normal;
  }

  .body {
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
    align-items: center;
  }

  .author {
    display: flex;
    align-items: center;
    .avatar {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 1px solid #ccc;
    }
    .name {
      margin-left: 10px;
      font-size: 14px;
    }
  }
}

.relate {
  .relate-title {
    height: 32px;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: normal;
    padding: 0 10px;
    color: #333;
  }
  .relate-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
  }
}
</style>