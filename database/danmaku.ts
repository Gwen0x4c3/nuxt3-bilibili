const strs = [
    "bilibili- ( ゜- ゜)つロ 乾杯~",
    "空降成功",
    "空降坐标 2:01",
    "前方高能前方高能前方高能前方高能前方高能前方高能前方高能前方高能前方高能前方高能前方高能前方高能",
    "啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
    "233333333333333333333333333333333",
    "德国骨科",
    "承包！",
    "天德池",
    "感觉不如原神",
    "木吉鬼步♂",
    "蕉迟但到"
]
const danmaku: any[] = [];
for (let i = 0; i < 140; i++) {
    danmaku.push({
        id: 100 + i + 1,
        content: strs[Math.floor(Math.random() * strs.length)]
    })
}

export default danmaku;