import video from '@/database/video'
import { PageParam, PageResult } from '@/types/page';

export default defineEventHandler((event) => {
    const { current, pagesize } = getQuery<PageParam>(event);
    const offset = (current - 1) * pagesize;
    const len = video.length;
    if (offset > len) {
        return {total: len, record: []};
    }
    const list = video.slice(offset, offset + pagesize);
    const result: PageResult = {total: len, record: list};
    return result;
})