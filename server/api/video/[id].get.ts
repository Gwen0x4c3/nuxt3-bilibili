import videos from '@/database/video'

export default defineEventHandler(e => {
    const { id: bvid } = getRouterParams(e);
    const video = videos.find(v => v.bvid == bvid);
    return video ? video : {};
})