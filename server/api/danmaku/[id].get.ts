import dbDanmaku from "@/database/danmaku";
import type { Danmaku } from "@/types/video";

export default defineEventHandler(e => {
    const { id: bvid } = getRouterParams(e);
    if (!bvid) {
        return [];
    }
    console.log(`获取bvid为${bvid}的弹幕`);

    let duration = 2 * 60; // 假设2分钟的视频
    let total = dbDanmaku.length;
    let sec = 1;
    const danmaku: Danmaku[] = [];
    for (let i = 0; i < total; i++) {
        const start = sec + Math.random() * 0.9;
        sec = start;
        const item: Danmaku = {
            id: dbDanmaku[i].id,
            content: dbDanmaku[i].content,
            start: start
        }
        danmaku.push(item)
    }
    return danmaku;
})