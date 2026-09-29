// PIN 图鉴数据（为后续「PIN 图鉴」功能准备；UI 尚未接入）
// type: region（区域 IP PIN，按展位）/ night（夜间 PIN）/ veteran（老玩家专属）/ npc（NPC 互动）/ reward（区域拼图等最终奖励）
// zone 对应 booths.js zones（A 翻身时空港 橙 / B 黄金海岸线 黄 / C 重生试炼场 蓝）
// no：图鉴占位编号。区域 PIN 按「展位 id[-序号]」编码（官方未给 PIN 编号，用户 9/10 决定），夜间 N-xx / 老玩家 V-xx / NPC-xx / 拼图 R-x
// thumb：从笔记图抠出的单枚 PIN 缩略图（public/img/pins/，裁切框见 scripts/crop-pins.py）；image：所在整张笔记图
// 未公布 PIN 的展位由 PinsPage 按 booths.js 自动生成占位卡，用 zoneThumbs 的通用「?」软盘图
export const pinTypes = [
  { key: 'region', name: '区域 IP PIN', desc: '各 IP 展位互动获得，按区域分色，用于兑换冒险者拼图', color: null },
  { key: 'night', name: '夜间 PIN', desc: '黑色夜间限定，夜间发放', color: '#1f2a1f' },
  { key: 'veteran', name: '老玩家专属 PIN', desc: '1.0 登岛老玩家线下兑换，每人限一个', color: '#c9a24a' },
  { key: 'npc', name: 'NPC 互动 PIN', desc: '与岛上 NPC 聊天互动、合拍打卡随机掉落，库存有限', color: '#ff4b4b' },
  { key: 'camp', name: '冒险者营地 PIN', desc: '在冒险者营地官摄出片区参与互动拍摄（子弹时间）有机会解锁，样式待公布', color: null },
  { key: 'reward', name: '冒险者拼图', desc: '各区域集齐 PIN 后到结算点兑换，三块拼成冒险岛拼图完整体', color: null },
]

// 各区域通用软盘图（官方 PIN 规则图里的「?」款），给未公布展位占位
export const zoneThumbs = { A: 'img/pins/zone-A.jpg', B: 'img/pins/zone-B.jpg', C: 'img/pins/zone-C.jpg' }

export const pins = [
  // ---- 区域 IP PIN（已从各 IP 官方笔记确认的）----
  { id: 'A06-pin', no: 'A06', type: 'region', zone: 'A', name: '星布谷地「存档碎片」· 展台款', booth: 'A06', how: '集章满 4 个', thumb: 'img/pins/A06.jpg', image: 'img/booths/A06/07.jpg' },
  { id: 'A11-1', no: 'A11-1', type: 'region', zone: 'A', name: '绝区零「存档碎片」· 日场款', booth: 'A11', how: '线上预约后到展位「布连邦」雕像完成现场互动领取（预约预计 9/28 开放）', thumb: 'img/pins/A11-1.jpg', image: 'img/booths/A11/03.jpg' },
  { id: 'A11-2', no: 'A11-2', type: 'region', zone: 'A', name: '绝区零「存档碎片」· 夜场款', booth: 'A11', how: '线上预约后到展位「布连邦」雕像完成现场互动领取（预约预计 9/28 开放）', thumb: 'img/pins/A11-2.jpg', image: 'img/booths/A11/03.jpg' },
  { id: 'A08-1', no: 'A08-1', type: 'region', zone: 'A', name: '代号如意「存档碎片」· 粉紫款', booth: 'A08', how: '行动一「关于他的特别调查」结算达 90 分获得（日场 12:30–17:00 / 夜场 17:30–21:30）；仅限女性探员', thumb: 'img/pins/A08-1.jpg', image: 'img/booths/A08/guide-01.jpg' },
  { id: 'A08-2', no: 'A08-2', type: 'region', zone: 'A', name: '代号如意「存档碎片」· 蓝紫款', booth: 'A08', how: '同粉紫款，两款对应关系官方未标', thumb: 'img/pins/A08-2.jpg', image: 'img/booths/A08/guide-01.jpg' },
  { id: 'A09-pin-1', no: 'A09-1', type: 'region', zone: 'A', name: '崩坏：星穹铁道「存档碎片」· 角色款', booth: 'A09', how: '需预约「PIN 领取」（RED LAND 官方 9/25 预约日历，9/28 开约）：现场核验预约信息并答对星际和平公司相关提问；每日数量有限（官方称「联名徽章」）', thumb: 'img/pins/A09-1.jpg', image: 'img/booths/A09/01.jpg' },
  { id: 'A09-pin-2', no: 'A09-2', type: 'region', zone: 'A', name: '崩坏：星穹铁道「存档碎片」· LOGO 款', booth: 'A09', how: '同角色款，需预约「PIN 领取」；两款对应关系官方未标（官方称「联名徽章」）', thumb: 'img/pins/A09-2.jpg', image: 'img/booths/A09/01.jpg' },
  { id: 'A40', no: 'A40', type: 'region', zone: 'A', name: '光与夜之恋「存档碎片」· 蓝鸟窗台款', booth: 'A40', how: '完成【窗畔花影】互动 或【绮梦花园】打卡，由工作人员在出口处发放（两项都需提前预约）', thumb: 'img/pins/A40.jpg', image: 'img/booths/A40/guide-16.jpg' },
  // 原神的徽章是 RED LAND 软盘造型（灰条 + 小红书角标齐全），但软盘是蓝色——A 区已确认的存档碎片都是橙色（见 A11 / A17c / A25 / A33），
  // 官方原文也只写「徽章一份」而不是「存档碎片」，所以是否计入 A 区拼图结算待确认，已写在 name 里
  { id: 'A10', no: 'A10', type: 'region', zone: 'A', name: '原神「存档碎片」· 派蒙点赞款', booth: 'A10', how: '在 RED LAND 主会场页面预约后，参与展台【体验互动】领取（官方称「徽章」；软盘为蓝色、非 A 区橙，是否计入区域拼图待确认）', thumb: 'img/pins/A10.jpg', image: 'img/booths/A10/03.jpg' },
  // C-04 独立游戏大食堂（RED LAND 官方 9/21）：试玩 3 款游戏 + 出口结算处的「心选菜单小票」解锁，官方未放实物图
  { id: 'A27', no: 'A27', type: 'region', zone: 'A', name: '无限暖暖「存档碎片」· 暖暖拍立得款', booth: 'A27', how: '在展区旋转木马区域参与指定互动活动，限量 2000 份、发完即止', thumb: 'img/pins/A27.jpg', image: 'img/booths/A27/07.jpg' },
  { id: 'B10', no: 'B10', type: 'region', zone: 'B', name: '明日方舟「存档碎片」· 罗德厨房款', booth: 'B10', how: '领随机食谱、规定时间内集齐指定食材后抽奖，金牌 / 主管 / 助理三档都有；每人一次', thumb: 'img/pins/B10.jpg', image: 'img/booths/B10/03.jpg' },
  { id: 'B11', no: 'B11', type: 'region', zone: 'B', name: '明日方舟：终末地「存档碎片」· 钓鳞款', booth: 'B11', how: '完成钓鳞挑战后抽奖，金 / 银 / 铜三档都有；每人一次', thumb: 'img/pins/B11.jpg', image: 'img/booths/B11/03.jpg' },
  { id: 'C01-1', no: 'C01-1', type: 'region', zone: 'C', name: '刺客信条：黑旗 记忆重置「存档碎片」· 款一', booth: 'C01', how: '活动二 拿骚酒馆合影带 #育碧游戏航海计划 发笔记并 @UBISOFT育碧（连手提袋一起领）/ 活动四 到 UBISOFT育碧 置顶笔记找今日暗号、在服务台大声报出，各得 1 枚；两款对应哪项官方未标', thumb: 'img/pins/C01-1.jpg', image: 'img/booths/C01/guide-00.jpg' },
  { id: 'C01-2', no: 'C01-2', type: 'region', zone: 'C', name: '刺客信条：黑旗 记忆重置「存档碎片」· 款二', booth: 'C01', how: '同款一（活动二 合影发笔记 / 活动四 报暗号），官方图里两款并列', thumb: 'img/pins/C01-2.jpg', image: 'img/booths/C01/guide-00.jpg' },
  // 冒险者营地专属 PIN（RED LAND 官方号 9/22）：不属任何展位 / 区域，归到「夜间 / NPC / 老玩家 / 营地」那一筹
  { id: 'CAMP', no: 'CAMP', type: 'camp', zone: null, name: '冒险者营地「存档碎片」· 款式待公布', booth: null, how: '在冒险者营地「官摄出片区」参与互动拍摄（子弹时间），每日 12:30 – 16:00 / 18:00 – 21:00，有机会解锁', thumb: null, image: 'img/rules/camp/02.jpg' },
  { id: 'A12-1', no: 'A12-1', type: 'region', zone: 'A', name: '超自然行动组「存档碎片」· 日场款', booth: 'A12', how: '日间场 12:30–17:30 参与展台互动领取，具体互动方式待公布', thumb: 'img/pins/A12-1.jpg', image: 'img/booths/A12/02.jpg' },
  { id: 'A12-2', no: 'A12-2', type: 'region', zone: 'A', name: '超自然行动组「存档碎片」· 夜场款', booth: 'A12', how: '夜间场 17:30–21:30 参与展台互动领取，与投影手电筒一同放送', thumb: 'img/pins/A12-2.jpg', image: 'img/booths/A12/02.jpg' },
  { id: 'A39', no: 'A39', type: 'region', zone: 'A', name: '粒粒的小人国「存档碎片」· 「粒?」款', booth: 'A39', how: '互动区完成「摇粒乡交房仪式」（12:30–20:30），随摇粒乡入住礼包发放，每日限量先到先得', thumb: 'img/pins/A39.jpg', image: 'img/booths/A39/guide-05.jpg' },
  { id: 'A37', no: 'A37', type: 'region', zone: 'A', name: '奇遇动物城「存档碎片」· 记忆款', booth: 'A37', how: '任务二：关注 @奇遇动物城 并带 #奇遇动物城 #奇遇动物城REDLAND 在小红书发现场照片（贴纸套装 / 合影透卡 / 存档碎片三者之一）；或 任务三 舞台活动；每日限量先到先得（官方称「记忆存档碎片」）', thumb: 'img/pins/A37.jpg', image: 'img/booths/A37/06.jpg' },
  { id: 'A03a', no: 'A03', type: 'region', zone: 'A', name: '王者万象棋「存档碎片」· 款式待公布', booth: 'A03a', how: '盲盒墙「盲盒寻宝三连抽」集章赢限定 PIN（9/28 参展情报）', thumb: null, image: 'img/booths/A03a/03.jpg' },
  { id: 'A05', no: 'A05', type: 'region', zone: 'A', name: '心动小镇「存档碎片」· 安妮款', booth: 'A05', how: '完成集章任务（入口领集章卡 → 2 个现场小游戏 + 展台拍摄发布 → 兑奖处）即可获得', thumb: 'img/pins/A05.jpg', image: 'img/booths/A05/04.jpg' },
  { id: 'A13', no: 'A13', type: 'region', zone: 'A', name: 'PlayStation「存档碎片」· 展台款', booth: 'A13', how: '关注 PlayStation 领街区挑战卡 + 2 张挑战券，参与互动 / 试玩 / NPC 问卷攒满 2 个印章即额外获得', thumb: 'img/pins/A13.jpg', image: 'img/booths/A13/04.jpg' },
  { id: 'A22', no: 'A22', type: 'region', zone: 'A', name: '火影忍者「存档碎片」· 卡卡西 & 鸣人款', booth: 'A22', how: '成为一日村民领兑换卡，三处集章（拉面店 NPC 对话 / 教室忍者测试 / 生日祝福墙）即得 RED LAND 专属 pin；每日限定 400 个', thumb: 'img/pins/A22.jpg', image: 'img/booths/A22/guide-03.jpg' },
  { id: 'A23', no: 'A23', type: 'region', zone: 'A', name: '航海王「存档碎片」· 路飞款', booth: 'A23', how: '完成现场指示牌的任务即可获得，在「奖品发放咨询台」领取；「完成存档碎片的收集，据说能够获得特殊奖励」', thumb: 'img/pins/A23.jpg', image: 'img/booths/A23/iii-01.jpg' },
  { id: 'A21-1', no: 'A21-1', type: 'region', zone: 'A', name: '三丽鸥「存档碎片」· 日场款', booth: 'A21', how: '闯关三处（星航停靠站 / 飞船登陆点 / 星尘捕集舱）集齐三枚印章，到兑换处领取；日场 12:30–17:30 发放（橙，官方图注「白天效果」）', thumb: 'img/pins/A21-1.jpg', image: 'img/booths/A21/guide-00.jpg' },
  { id: 'A21-2', no: 'A21-2', type: 'region', zone: 'A', name: '三丽鸥「存档碎片」· 夜场款', booth: 'A21', how: '闯关三处（星航停靠站 / 飞船登陆点 / 星尘捕集舱）集齐三枚印章，到兑换处领取；夜场 17:30–21:30 发放（绿，官方图注「夜晚效果」）', thumb: 'img/pins/A21-2.jpg', image: 'img/booths/A21/guide-00.jpg' },
  { id: 'A30', no: 'A30', type: 'region', zone: 'A', name: '七界梦谭「存档碎片」· 戚戎款', booth: 'A30', how: '逛诡摊攒「诡市魂钱」换抽奖次数，完成 1 次展台互动抽奖即得；限量掉落', thumb: 'img/pins/A30.jpg', image: 'img/booths/A30/guide-04.jpg' },
  { id: 'A28', no: 'A28', type: 'region', zone: 'A', name: '代号：香「存档碎片」· 款式待公布', booth: 'A28', how: '完成预约活动【凝香成愿】调香或【故「香」初遇】角色互动即得；【神遗片羽】无料奖品中随机（9/27 预约说明）', thumb: null, image: 'img/booths/A28/yuyue-01.jpg' },
  { id: 'A32', no: 'A32', type: 'region', zone: 'A', name: '代号：在场证明「存档碎片」· 款式待公布', booth: 'A32', how: '预约男主互动（1V1 五场 13:30–18:30 / 1V5 19:00–20:00，9/28 19:00 起按门票日期开约），互动体验结束后二次核销领取；每人每日 1 次，仅限 18+ 女性玩家', thumb: null, image: 'img/booths/A32/05.jpg' },
  // 归环 / 阅文的「PIN 卡」：官方都没给 RED LAND 软盘造型的成品图，是否算冒险者拼图用的区域 PIN 待确认（名字里已注明）。
  // 归环 9/23 更正：奖品图里右上角黄色的 Q 版点赞卡才是 PIN 卡，之前抠的两张黑金「唱盘」卡片是透卡
  { id: 'A17b', no: 'A17b', type: 'region', zone: 'A', name: '归环「存档碎片」· PIN 卡款', booth: 'A17b', how: '在归环展位完成 1 项指定互动（开业免单大作战 / 开业好礼运送中 / 万物可归环）可得 1 个礼品，PIN 卡是「木剧场 / PIN 卡 / 透卡 / 立牌」四种礼品之一；同一互动重复参与只有首次给（官方称「PIN 卡」，是黄色 Q 版点赞卡片、非软盘造型，是否属区域 PIN 待确认）', thumb: 'img/pins/A17b.jpg', image: 'img/booths/A17b/04.jpg' },
  { id: 'A35', no: 'A35', type: 'region', zone: 'A', name: '阅文「存档碎片」· 五大 IP Q 版款', booth: 'A35b', alsoBooths: ['A35a', 'A35c', 'A35d'], how: '全职高手：关注 @全职高手 + 3 张活动返图带 #全职高手 #我的荣耀名场面 发小红书打卡，连 Roll 点券一起给；诡秘之主：集齐 3 处集章点的【身份】盖章，到「贝克兰德报刊亭」兑换，日场 12:30–18:00 / 夜场 19:00–21:00 限量；一人之下：完成展台打卡后日场「拘灵试炼」套圈 3 中 3 或夜场「双全手 · 守识局」猜拳 3 局赢 3 次，每人每天各限 1 次；道诡异仙：坐忘麻将馆参与趣味游戏互动即得（暗红色软盘、非 A 区橙，是否计入区域拼图待确认；道诡异仙称「阅文小伙伴集结 PIN 卡」）', thumb: 'img/pins/A35.jpg', image: 'img/booths/A35/guimi-03.jpg' },
  { id: 'A25-1', no: 'A25-1', type: 'region', zone: 'A', name: 'ANIPLEX「存档碎片」· 日场款', booth: 'A25b', alsoBooths: ['A25a'], how: 'Aniplex 展台内拍照打卡 + 带 #国庆节在ANIPLEX展台当牛马 投稿小红书，随限定福袋发放；第一弹鬼灭之刃福袋与第二弹孤独摇滚福袋是同一对款式', thumb: 'img/pins/A25-1.jpg', image: 'img/booths/A25/second-00.jpg' },
  { id: 'A25-2', no: 'A25-2', type: 'region', zone: 'A', name: 'ANIPLEX「存档碎片」· 夜场款', booth: 'A25b', alsoBooths: ['A25a'], how: '与日场款为两款不同设计，同随限定福袋发放（第一弹 / 第二弹通用）', thumb: 'img/pins/A25-2.jpg', image: 'img/booths/A25/second-00.jpg' },
  { id: 'A33', no: 'A33', type: 'region', zone: 'A', name: '光·遇「存档碎片」· 光之子花海款', booth: 'A33', how: '光遇「每日任务」（13:00–20:00）里的「直面冥龙」：击中冥龙身体，赢取存档碎片及限定周边；周边数量有限先到先得', thumb: 'img/pins/A33.jpg', image: 'img/booths/A33/guide-05.jpg' },
  { id: 'A34-pin-1', no: 'A34-1', type: 'region', zone: 'A', name: '我的世界「存档碎片」· 苦力怕款', booth: 'A34', how: '玩法 2 主世界生日派对：完成打卡后入座派对餐桌，整桌完成村民 NPC 抽取的挑战（哼生日歌 / 合成料理 / 全员拼图），每位自选存档碎片或生日立体贺卡 1 份；每日 400 份（日场 270 / 夜场 130），领完默认发另一款', thumb: 'img/pins/A34-1.jpg', image: 'img/booths/A34/guide-05.jpg' },
  { id: 'A36-1', no: 'A36-1', type: 'region', zone: 'A', name: '如鸢「存档碎片」· 日场款', booth: 'A36', how: '凭整理券在【如鸢无料兑换台】领伴手礼时同时领取；每日 13:30 – 17:30 发放，数量有限先到先得', thumb: 'img/pins/A36.jpg', image: 'img/booths/A36/rl-00.jpg' },
  { id: 'A36-2', no: 'A36-2', type: 'region', zone: 'A', name: '如鸢「存档碎片」· 夜场款', booth: 'A36', how: '每日 17:30 – 21:30 发放；需同时出示整理券及绣衣楼爵位 35 级以上界面（截图无效）（夜场款可夜光）', thumb: 'img/pins/A36-2.jpg', image: 'img/booths/A36/rl-00.jpg' },
  { id: 'A38-pin', no: 'A38', type: 'region', zone: 'A', name: '剑网3「存档碎片」· 黄鸡大笑款', booth: 'A38', how: '展台【江湖笔记】留言寄语，每日限量先到先得（官方称「展台专属 PIN 卡」）', thumb: 'img/pins/A38.jpg', image: 'img/booths/A38/02.jpg' },
  { id: 'A34-pin-2', no: 'A34-2', type: 'region', zone: 'A', name: '我的世界「存档碎片」· 联名 LOGO 款', booth: 'A34', how: '9/4 图写「现场互动打卡领取」；9/27 详情的生日派对只提到苦力怕款存档碎片（官方称「徽章」；9/4 参展信息图有、9/27 展台详情只出现苦力怕款，是否发放待确认）', thumb: 'img/pins/A34-2.jpg', image: 'img/booths/A34/01.jpg' },
  { id: 'A17c-pin', no: 'A17c', type: 'region', zone: 'A', name: '命运扳机「存档碎片」· 展台款', booth: 'A17c', how: '预约游戏并关注命运扳机小红书账号；套装含「外包装 + 三 IP 合一内卡」成品一件，另附《命运扳机》单款内卡（官方称「存档碎片 PIN 套装」）', thumb: 'img/pins/A17c.jpg', image: 'img/booths/A17c/02.jpg' },
  { id: 'A24-pin-1', no: 'A24-1', type: 'region', zone: 'A', name: 'SCLA「存档碎片」· 假面骑士 / 奥特曼 / 哥斯拉 / 超级战队款', booth: 'A24', how: 'BINGO 完成 2 条及以上连线；每日礼品兑换 14:00 开始，每人每日限领 1 枚（官方称「小红书 PIN 徽章（存档碎片）」）', thumb: 'img/pins/A24-1.jpg', image: 'img/booths/A24/02.jpg' },
  { id: 'A24-pin-2', no: 'A24-2', type: 'region', zone: 'A', name: 'SCLA「存档碎片」· 犬夜叉 / 初音未来 / EVA / 面包超人 / 柯南款', booth: 'A24', how: 'BINGO 完成 2 条及以上连线；每日礼品兑换 14:00 开始，每人每日限领 1 枚（官方称「小红书 PIN 徽章（存档碎片）」）', thumb: 'img/pins/A24-2.jpg', image: 'img/booths/A24/02.jpg' },
  { id: 'B01-1', no: 'B01-1', type: 'region', zone: 'B', name: '蛋仔派对「存档碎片」· 日场款', booth: 'B01', how: '完成基础车间挑战（原胚生产 / 表情写入 / 外观装配）后前往盲盒机点位领取，12:30–17:30 发放，每日限量 800', thumb: 'img/pins/B01-1.jpg', image: 'img/booths/B01/guide-05.jpg' },
  { id: 'B01-2', no: 'B01-2', type: 'region', zone: 'B', name: '蛋仔派对「存档碎片」· 夜场款', booth: 'B01', how: '同日场款，17:30–21:30 发放夜场款，每日限量 400', thumb: 'img/pins/B01-2.jpg', image: 'img/booths/B01/guide-05.jpg' },
  { id: 'B04b-1', no: 'B04b-1', type: 'region', zone: 'B', name: '暴雪游戏「存档碎片」· RED LAND × BLIZZARD × 網易款', booth: 'B04b', how: '集齐全部展位印章后在暴雪游戏展台领取', thumb: 'img/pins/B04b-1.jpg', image: 'img/booths/B04b/guide-04.jpg' },
  { id: 'B04b-2', no: 'B04b-2', type: 'region', zone: 'B', name: '暴雪游戏「存档碎片」· BLIZZARD 蓝面款', booth: 'B04b', how: '集齐全部展位印章后在暴雪游戏展台领取', thumb: 'img/pins/B04b-2.jpg', image: 'img/booths/B04b/guide-04.jpg' },
  { id: 'B05', no: 'B05', type: 'region', zone: 'B', name: '漫威影业「存档碎片」· 复仇者联盟款', booth: 'B05', how: '五大阵营挑战集齐 5 枚印章换冰箱贴后，对限定暗号完成挑战解锁；每日限量', thumb: 'img/pins/B05.jpg', image: 'img/booths/B05/hub-00.jpg' },
  { id: 'B07', no: 'B07', type: 'region', zone: 'B', name: '第五人格「存档碎片」· 展台款', booth: 'B07', how: '入学指南「墨痕答辩」课程获得满分', thumb: 'img/pins/B07.jpg', image: 'img/booths/B07/01.jpg' },
  { id: 'B08', no: 'B08', type: 'region', zone: 'B', name: '遗忘之海「存档碎片」· 王女款', booth: 'B08', how: '现场参与互动领取（互动周边之一），具体领取规则以线下活动规则为准；周边数量有限先到先得', thumb: 'img/pins/B08.jpg', image: 'img/booths/B08/03.jpg' },
  { id: 'B09-1', no: 'B09-1', type: 'region', zone: 'B', name: '重返未来：1999「存档碎片」· 日场款', booth: 'B09', how: '完成展台互动问答领取；12:30–17:30，每日 800 份（官方称「徽章」）', thumb: 'img/pins/B09-1.jpg', image: 'img/booths/B09/05.jpg' },
  { id: 'B09-2', no: 'B09-2', type: 'region', zone: 'B', name: '重返未来：1999「存档碎片」· 夜场款', booth: 'B09', how: '完成展台互动问答领取；17:30–21:30，每日 400 份（官方称「徽章」）', thumb: 'img/pins/B09-2.jpg', image: 'img/booths/B09/05.jpg' },
  { id: 'B02-pin-1', no: 'B02-1', type: 'region', zone: 'B', name: '宝可梦「存档碎片」· 皮卡丘款', booth: 'B02', how: '护照集章任务 1·2·3，12:30–17:30 领，每日 2500（官方称「宝可梦江畔乐游主题 PIN」）', thumb: 'img/pins/B02-1.jpg', image: 'img/booths/B02/04.jpg' },
  { id: 'B02-pin-2', no: 'B02-2', type: 'region', zone: 'B', name: '宝可梦「存档碎片」· 谜拟丘款', booth: 'B02', how: '护照集章任务 1·2·3·6，17:30–21:30 领，每日 2000（官方称「宝可梦江畔乐游主题 PIN」）', thumb: 'img/pins/B02-2.jpg', image: 'img/booths/B02/04.jpg' },
  { id: 'B03-pin', no: 'B03', type: 'region', zone: 'B', name: 'Lovania「存档碎片」· 小人偶款', booth: 'B03', how: '完成盖章任务（记忆留言 / 记忆绘画 / 记忆合奏）集齐 3 个记忆盖章，与「奢华贝壳马桶气球」一同领取；每日数量有限领完即止', thumb: 'img/pins/B03-pin.jpg', image: 'img/booths/B03/guide-04.jpg' },
  { id: 'B14-1', no: 'B14-1', type: 'region', zone: 'B', name: '暗影成双「存档碎片」· 日场款', booth: 'B14', how: '三连关注 + 现场任意互动集 2 枚章 + 带 #新世界暗影成双 #双人电影 发笔记，到【书房】兑换处核验领取；12:30–17:30 发放，每人每日 1 枚、每日 800（软盘为橙色、非 B 区黄，是否计入区域拼图待确认）', thumb: 'img/pins/B14-1.jpg', image: 'img/booths/B14/guide-02.jpg' },
  { id: 'B14-2', no: 'B14-2', type: 'region', zone: 'B', name: '暗影成双「存档碎片」· 夜场款', booth: 'B14', how: '同日场款，17:30–21:30 发放', thumb: 'img/pins/B14-2.jpg', image: 'img/booths/B14/guide-02.jpg' },
  { id: 'B15-pin', no: 'B15', type: 'region', zone: 'B', name: '逆水寒「存档碎片」· 血河小狗款', booth: 'B15', how: '参与逆水寒展台现场趣味互动（官方称「REDLAND PIN」）', thumb: 'img/pins/B15.jpg', image: 'img/booths/B15/02.jpg' },
  { id: 'B12-pin', no: 'B12', type: 'region', zone: 'B', name: '鸣潮「存档碎片」· 心有所归款', booth: 'B12', how: '在 RED LAND 主会场预约【心有所归】互动玩法，到门帘前敲敲桌子并与心完成互动即得 1 枚；每人限 1 次、每次限时 1 min，9/28 13:00 起按日开放预约（样式待公布）', thumb: null, image: 'img/booths/B12/08.jpg' },
  { id: 'C16-pin', no: 'C16', type: 'region', zone: 'C', name: '宝可梦卡牌「存档碎片」· 超梦 & 梦幻款', booth: 'C16', how: '卡牌体验营完成 3 个任务领取；日场款 12:30–17:30 每日 2000 个，夜场款（夜光）17:30–21:30 每日 1200 个，每人每次限领 1 个', thumb: 'img/pins/C16.jpg', image: 'img/booths/B02/card-03.jpg' },
  { id: 'C08-pin', no: 'C08', type: 'region', zone: 'C', name: '猛兽派对「存档碎片」· 款式待公布', booth: 'C08', how: '完成《猛兽派对》手游试玩得限定贴纸后到吧台兑换；或与随机现身的猛兽主角合影互动有机会获得（官方称「REDLAND 官方 PIN」）', thumb: null, image: 'img/booths/C08/00.jpg' },
  { id: 'C17-pin', no: 'C17', type: 'region', zone: 'C', name: '航海王卡牌对战「存档碎片」· 款式待公布', booth: 'C17', how: '集齐 3 枚航海王卡牌对战印章（SNS 打卡 / 策牌破局 / 互动游戏各 1 枚），扫码填问卷并下载万代卡牌 APP 后现场兑换；共限量 1600 枚（官方称「RED LAND 2026 限定徽章」）', thumb: null, image: 'img/booths/C17/00.jpg' },
  { id: 'C07-pin', no: 'C07', type: 'region', zone: 'C', name: '苏丹的游戏「存档碎片」· 展台款', booth: 'C07', how: '预约后走完舍馆 → 集市 → 冒险者酒吧 → 哈比卜的厨房 → 苏丹的王座全流程，向苏丹献上美味大餐博得青睐即得；数量有限先到先得（夜场款可夜光）', thumb: 'img/pins/C07.jpg', image: 'img/booths/C07/02.jpg' },
  { id: 'C13-pin', no: 'C13', type: 'region', zone: 'C', name: '啦嗒铛「存档碎片」· 展台款', booth: 'C13', how: 'GSE 展位试玩任何游戏后即得 1 个；日场 12:30–17:30 / 夜场 17:30–21:30，数量有限派完即止', thumb: 'img/pins/C13.jpg', image: 'img/booths/C13/hub-02.jpg' },
  { id: 'C12-1', no: 'C12-1', type: 'region', zone: 'C', name: 'hololive「存档碎片」· 宝钟玛琳 & 可波·卡娜艾露款', booth: 'C12', how: '参与 hololive Dreams 现场游玩，完成任意一首歌曲即得（两款）', thumb: 'img/pins/C12-1.jpg', image: 'img/booths/C12/guide-01.jpg' },
  { id: 'C12-2', no: 'C12-2', type: 'region', zone: 'C', name: 'hololive「存档碎片」· 舞台款', booth: 'C12', how: '同上', thumb: 'img/pins/C12-2.jpg', image: 'img/booths/C12/guide-01.jpg' },
  { id: 'C05-1', no: 'C05-1', type: 'region', zone: 'C', name: '女神异闻录4 Revival「存档碎片」· P4R 主视觉款', booth: 'C05', how: '完成展位内全部指定打卡任务后领取；日场发放 12:30–17:30 / 夜场发放 17:30–21:30（日 / 夜场对应哪款官方未标）', thumb: 'img/pins/C05-1.jpg', image: 'img/booths/C05/guide-00.jpg' },
  { id: 'C05-2', no: 'C05-2', type: 'region', zone: 'C', name: '女神异闻录4 Revival「存档碎片」· RED LAND 2026 × P4R logo 款', booth: 'C05', how: '同上', thumb: 'img/pins/C05-2.jpg', image: 'img/booths/C05/guide-00.jpg' },
  { id: 'C09', no: 'C09', type: 'region', zone: 'C', name: '世界之外「存档碎片」· 黄金绮旅款', booth: 'C09', how: '预约或凭整理券进入「黄金绮旅空间」后，当前场次内到「无料领取处」凭导览手册领取，每人限一份；预约 9/28 开约', thumb: 'img/pins/C09.jpg', image: 'img/booths/C09/08.jpg' },
  { id: 'C18-1', no: 'C18-1', type: 'region', zone: 'C', name: '闪魂「存档碎片」· 日场款', booth: 'C18', how: '白天灵魂试炼场（绝区零 / 纸嫁衣 / 闪魂三区）集齐 3 枚印章兑换；PIN 章共 2050 个、每日限量 410，换完即止（需预约领打卡册）', thumb: 'img/pins/C18-1.jpg', image: 'img/booths/C18/fb-06.jpg' },
  { id: 'C18-2', no: 'C18-2', type: 'region', zone: 'C', name: '闪魂「存档碎片」· 夜场夜光款', booth: 'C18', how: '夜间副本「小小梦魇」集齐 3 枚不同印章兑换夜光版；共 650 个、每日限量 130，换完即止', thumb: 'img/pins/C18-2.jpg', image: 'img/booths/C18/fb-06.jpg' },

  // ---- 夜间 ----
  { id: 'night', no: 'N-01', type: 'night', name: '夜间「存档碎片」· 待解锁', how: '夜间发放，月下模式神秘变体', thumb: 'img/pins/night.jpg', image: 'img/rules/pin/01.jpg' },

  // ---- 老玩家 ----
  { id: 'veteran', no: 'V-01', type: 'veteran', name: '老玩家「存档碎片」· 初代目回归款', how: '1.0 登岛老玩家线下直接兑换，每人限一个', thumb: 'img/pins/veteran.jpg', image: 'img/rules/pin-npc/01.jpg' },

  // ---- NPC 互动（6 款）----
  // 官方原文「7款NPC PIN&老玩家专属限定PIN就这样水灵灵地出现了~」中的 7 款是 NPC + 老玩家的合计：
  // 笔记图 01 是老玩家 1 枚、02–04 各 2 枚 NPC，共 6 + 1 = 7 枚，没有未公布的第 7 款 NPC（用户 9/14 指出）
  { id: 'npc-1', no: 'NPC-01', type: 'npc', name: 'NPC「存档碎片」· AAA农产品批发款', how: '与 NPC 互动随机掉落；RED LAND 9/26 宝藏码头玩法：向码头附近的「旅行商人」展示谷子相关藏品，有机会触发「晒宝验货互动」获得 NPC 互动存档碎片', thumb: 'img/pins/npc-1.jpg', image: 'img/rules/pin-npc/02.jpg' },
  { id: 'npc-2', no: 'NPC-02', type: 'npc', name: 'NPC「存档碎片」· 排位连胜款', how: '与 NPC 互动随机掉落；RED LAND 9/26 宝藏码头玩法：向码头附近的「旅行商人」展示谷子相关藏品，有机会触发「晒宝验货互动」获得 NPC 互动存档碎片', thumb: 'img/pins/npc-2.jpg', image: 'img/rules/pin-npc/02.jpg' },
  { id: 'npc-3', no: 'NPC-03', type: 'npc', name: 'NPC「存档碎片」· CP金婚款', how: '与 NPC 互动随机掉落；RED LAND 9/26 宝藏码头玩法：向码头附近的「旅行商人」展示谷子相关藏品，有机会触发「晒宝验货互动」获得 NPC 互动存档碎片', thumb: 'img/pins/npc-3.jpg', image: 'img/rules/pin-npc/03.jpg' },
  { id: 'npc-4', no: 'NPC-04', type: 'npc', name: 'NPC「存档碎片」· 不吃压力款', how: '与 NPC 互动随机掉落；RED LAND 9/26 宝藏码头玩法：向码头附近的「旅行商人」展示谷子相关藏品，有机会触发「晒宝验货互动」获得 NPC 互动存档碎片', thumb: 'img/pins/npc-4.jpg', image: 'img/rules/pin-npc/03.jpg' },
  { id: 'npc-5', no: 'NPC-05', type: 'npc', name: 'NPC「存档碎片」· 十抽十金款', how: '与 NPC 互动随机掉落；RED LAND 9/26 宝藏码头玩法：向码头附近的「旅行商人」展示谷子相关藏品，有机会触发「晒宝验货互动」获得 NPC 互动存档碎片', thumb: 'img/pins/npc-5.jpg', image: 'img/rules/pin-npc/04.jpg' },
  { id: 'npc-6', no: 'NPC-06', type: 'npc', name: 'NPC「存档碎片」· 一定要CARRY全场吗 SORRY全场不行吗款', how: '与 NPC 互动随机掉落；RED LAND 9/26 宝藏码头玩法：向码头附近的「旅行商人」展示谷子相关藏品，有机会触发「晒宝验货互动」获得 NPC 互动存档碎片', thumb: 'img/pins/npc-6.jpg', image: 'img/rules/pin-npc/04.jpg' },

  // ---- 冒险者拼图 ----
  { id: 'puzzle-A', no: 'R-A', type: 'reward', zone: 'A', name: '翻身时空港 冒险者拼图', how: '集齐 4 枚橙色 PIN 到区域结算点兑换', thumb: 'img/pins/puzzle-A.jpg', image: 'img/rules/pin/01.jpg' },
  { id: 'puzzle-B', no: 'R-B', type: 'reward', zone: 'B', name: '黄金海岸线 冒险者拼图', how: '集齐 2 枚黄色 PIN 到区域结算点兑换', thumb: 'img/pins/puzzle-B.jpg', image: 'img/rules/pin/01.jpg' },
  { id: 'puzzle-C', no: 'R-C', type: 'reward', zone: 'C', name: '重生试炼场 冒险者拼图', how: '集齐 2 枚蓝色 PIN 到区域结算点兑换', thumb: 'img/pins/puzzle-C.jpg', image: 'img/rules/pin/01.jpg' },
  { id: 'puzzle-all', no: 'R-ALL', type: 'reward', name: 'RED LAND 2026 冒险岛拼图完整体', how: '三块区域拼图拼合', thumb: 'img/pins/puzzle-all.jpg', image: 'img/rules/pin/02.jpg' },
]
