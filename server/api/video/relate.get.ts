import videos from "@/database/video";
import type { VideoItem } from "@/types/video";

export default defineEventHandler(e => {
    const { bvid } = getQuery(e);
    console.log("根据bvid" + bvid + "推荐相关视频")
    const result: VideoItem[] = [];
    const len = videos.length;
    for (let i = 0; i < 14; i++) {
        let idx: number;
        while (true) {
            idx = Math.floor(Math.random() * len);
            if (!result.find(item => item.bvid == videos[idx].bvid)) {
                break;
            }
        }
        if (videos[idx].bvid != bvid) {
            result.push(videos[idx])
        } else {
            i--;
        }
    }
    return result;
})