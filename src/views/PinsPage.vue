<template>
  <div class="page">
    <PageHeader title="PIN 图鉴" :sub="`冒险者拼图（冰箱贴）· 已收集 ${collectedCount} / ${totalKnown} 枚已公布`" />

    <!-- 官方口径核对：官方 10/1「限定 PIN 全图鉴」给了权威款数——区域 PIN 88（A47+B21+C20）+ NPC 6 + 老玩家 1 = 全岛 95（用户 10/2） -->
    <div class="pcard mt-10">
      <div class="pcard-body">
        <div class="pcard-title fold-head" @click="openTotal = !openTotal">
          📊 官方 PIN 总量（10/1 全图鉴）<span class="fold-arrow" :class="{ open: openTotal }">&gt;</span>
        </div>
        <div class="row wrap mt-6" style="gap:6px">
          <span class="pill hot">全岛 {{ roster.total }} 款</span>
          <span class="pill">区域 PIN {{ rosterRegionTotal }}</span>
        </div>
        <div v-if="openTotal" class="mt-10">
          <div class="row wrap mt-6" style="gap:6px">
            <span class="pill warm">NPC {{ roster.others[0].count }}</span>
            <span class="pill warm">老玩家 {{ roster.others[1].count }}</span>
          </div>
          <div class="row wrap mt-10" style="gap:10px">
            <div v-for="z in roster.zones" :key="z.zone" style="flex:1;min-width:96px">
              <div class="row between small"><b>{{ z.name }}</b><span>{{ zonePinCount(z.zone) }} / {{ z.count }}</span></div>
              <div class="bar mt-6"><i :style="{ width: Math.min(100, (zonePinCount(z.zone) / z.count) * 100) + '%', background: ZONE_COLOR[z.zone] }" /></div>
            </div>
          </div>
          <div class="small muted mt-6">官方口径：区域 PIN 共 {{ rosterRegionTotal }} 款（三大区域每个都分日间 / 夜间两款，所以款数多于展位数），另有 NPC 互动 PIN {{ roster.others[0].count }} 款、老玩家专属 PIN {{ roster.others[1].count }} 款。上面的进度分母就是官方款数，分子是本站<b>已收录实图</b>的款数。</div>
          <div class="small muted mt-6">{{ roster.dayTime }}；{{ roster.nightTime }}。{{ roster.note }}</div>
        </div>
      </div>
    </div>

    <!-- 本站收录进度（按展位号）：仅用于说明我们收录到哪一步，不再与官方款数直接相减 -->
    <div class="pcard mt-10">
      <div class="pcard-body">
        <div class="pcard-title">📥 本站收录进度（按展位号）</div>
        <div class="row wrap mt-6" style="gap:6px">
          <span class="pill">总展位号 {{ allNos.length }}</span>
          <span class="pill">其中发 PIN {{ pinBoothCount }}</span>
          <span class="pill hot">已放实图 {{ imageNos.size }}</span>
          <span class="pill warm">有情报无图 {{ infoNos.size - imageNos.size }}</span>
          <span class="pill">待公布 {{ pendingNos.length }}</span>
        </div>
        <div class="small muted mt-6">这一行按<b>展位号</b>计（同展位号的多 IP 算一个展位、发两款 PIN 也只算一个），用来反映我们收录到哪一步，<b>不与官方款数相减</b>——官方 88 款区域 PIN 对应的是「款」不是「展位号」，A 区 47 款就分布在 39 个展位号上。不发 PIN 的 {{ noPinNos.size }} 个展位（宝藏码头 / 补给点 / 赞助区 / 待解锁 / 光夜展陈）不列。</div>
      </div>
    </div>

    <!-- 官方「限定 PIN 全图鉴」实物图（10/1） -->
    <div class="pcard sand mt-10">
      <div class="pcard-body">
        <div class="pcard-title fold-head" @click="openRoster = !openRoster">
          🖼 官方限定 PIN 全图鉴（{{ rosterImages.length }} 张）<span class="fold-arrow" :class="{ open: openRoster }">&gt;</span>
        </div>
        <div v-if="openRoster" class="mt-6">
          <div class="small muted">RED LAND 官方号 10/1 放出的全部 PIN 实物图，可对照下面的图鉴核对自己集到哪几款。</div>
          <div class="gallery mt-10">
            <img v-for="(r, i) in rosterImages" :key="r.src" :src="thumb(base + r.src)" :alt="r.alt" :title="r.alt" loading="lazy" @click="openImgs(rosterImages.map((x) => ({ src: base + x.src, caption: x.alt })), i)" />
          </div>
          <div class="small muted mt-6">来源：{{ rosterSource.author }} · {{ rosterSource.publishedAt }} 原笔记</div>
        </div>
      </div>
    </div>

    <!-- 三区开图进度（按已收集的区域 PIN 覆盖的展位数） -->
    <div class="pcard sand mt-10">
      <div class="pcard-body">
        <div class="pcard-title">🧩 冒险者拼图进度</div>
        <div class="row wrap mt-10" style="gap:10px">
          <div v-for="z in zones" :key="z.key" style="flex:1;min-width:90px">
            <div class="row between small"><b :style="{ color: z.color }">{{ z.region }}</b><span>{{ zoneCollected(z.key) }} / {{ z.need }}</span></div>
            <div class="bar mt-6"><i :style="{ width: Math.min(100, (zoneCollected(z.key) / z.need) * 100) + '%', background: z.color }" /></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 筛选 -->
    <div class="chips mt-14">
      <button v-for="f in filters" :key="f.key" class="chip" :class="{ on: filter === f.key }" @click="filter = f.key">{{ f.label }}<small v-if="f.count != null">（{{ f.count }}）</small></button>
    </div>
    <label class="row small mt-6" style="color:#fff;text-shadow:1px 1px 0 var(--navy);gap:6px"><input v-model="onlyKnown" type="checkbox" /> 只看已公布 PIN（隐藏「?」占位）</label>

    <!-- 图鉴网格 -->
    <div class="pin-grid mt-10">
      <div v-for="p in list" :key="p.id" class="pin-card" :class="{ got: has(p.id), unknown: !p.thumb }">
        <div class="pin-thumb" @click="p.thumb && openPin(p)">
          <img v-if="p.thumb" :src="base + p.thumb" :alt="p.name" loading="lazy" />
          <img v-else-if="p.zone" :src="base + zoneThumbs[p.zone]" :alt="p.name" loading="lazy" style="opacity:.55" />
          <div v-else class="q">?</div>
          <span class="tag" :class="tagClass(p)" style="position:absolute;left:4px;top:4px;font-size:8px">{{ p.no }}</span>
        </div>
        <div class="pin-name"><span v-if="p.booking" class="tag yellow text" style="font-size:10px;padding:1px 5px;margin-right:4px;vertical-align:1px">需预约</span>{{ p.name }}</div>
        <div class="small muted pin-how">{{ p.how }}</div>
        <div class="row between mt-6">
          <!-- 展位跳转做成蓝色标签按钮，点击面积更大（用户 9/24） -->
          <router-link v-if="p.booth" class="tag blue text btn" style="font-size:11px;padding:3px 8px" :to="{ name: 'booth', params: { id: p.booth } }">展位 {{ p.booth }} →</router-link>
          <span v-else class="small muted">{{ typeName(p.type) }}</span>
          <button class="pbtn sm" :class="has(p.id) ? 'red' : 'ghost'" @click="toggle(p.id)">{{ has(p.id) ? '★ 已收集' : '☆ 收集' }}</button>
        </div>
      </div>
    </div>
    <div v-if="!list.length" class="pcard mt-10"><div class="pcard-body small muted">这个筛选下还没有 PIN。</div></div>

    <div class="small mt-14" style="color:#fff;text-shadow:1px 1px 0 var(--navy)">
      * 区域 PIN 按官方规则分色：翻身时空港 橙 / 黄金海岸线 黄 / 重生试炼场 蓝，夜间 PIN 黑。缩略图裁自各 IP 官方笔记，点击可看大图。
    </div>

    <Lightbox :items="lb.items" v-model:index="lb.i" />
  </div>
</template>

<script>
export default { name: 'PinsPage' }
</script>

<script setup>
import { ref, reactive, computed } from 'vue'
import PageHeader from '../components/PageHeader.vue'
import Lightbox from '../components/Lightbox.vue'
import { pins, pinTypes, zoneThumbs } from '../data/pins.js'
import { booths, zones as boothZones } from '../data/booths.js'
import { mainline } from '../data/rules.js'
import { useCollected } from '../composables/useStore.js'
import { thumb } from '../utils/thumb.js'

const base = import.meta.env.BASE_URL
const { has, toggle } = useCollected()
const filter = ref('ALL')
const onlyKnown = ref(false)
const openRoster = ref(false)
const openTotal = ref(false)
// 官方 10/1「限定 PIN 全图鉴」给的权威款数（用户 10/2 起改用这个口径）
const roster = mainline.roster
const rosterRegionTotal = roster.zones.reduce((n, z) => n + z.count, 0)
const ZONE_COLOR = { A: '#f26a2e', B: '#f2c23a', C: '#2f8fe6' }
const rosterSource = mainline.rosterSource
const rosterImages = mainline.rosterImages
// 灯箱：当前筛选下所有已公布 PIN 的缩略图，左右滑动切换
const lb = reactive({ items: [], i: null })
function openPin(p) {
  const known = list.value.filter((x) => x.thumb)
  lb.items = known.map((x) => ({ src: base + x.thumb, caption: `${x.no} · ${x.name}` }))
  lb.i = Math.max(0, known.indexOf(p))
}

// 区域信息（名称 / 颜色 / 兑换所需 PIN 数）直接用 booths.js zones
const zones = boothZones

// 官方口径（RED LAND 9/25 预约日历正文）：总活动展位 81 个、发 PIN 展位 74 个——按「展位号」算，不是按展位行 / PIN 张数算（用户 9/28）。
// 同号多 IP（A01 / A03 / A14 / A29 / C03 / A35）只算一个展位；一个展位发两款 PIN 也只算一个展位
const OFFICIAL_PIN_BOOTHS = 74
const nosOf = (b) => String(b.no).split('/').map((x) => x.trim().replace('-', ''))
const allNos = [...new Set(booths.flatMap(nosOf))]
const rowsOf = (no) => booths.filter((b) => nosOf(b).includes(no))
// 某展位号下所有行都标了 noPin（宝藏码头 / 补给点 / 赞助区 / 待解锁 / 展陈）才算不发 PIN；A35 阅文好物 noPin 但同号其他 IP 发，展位号仍算
const noPinNos = new Set(allNos.filter((no) => rowsOf(no).every((b) => b.noPin)))
const pinIdsOf = (p) => [p.booth, ...(p.alsoBooths || [])].filter(Boolean)
const regionPins = pins.filter((p) => p.type === 'region')
const nosWith = (list) => new Set(booths.filter((b) => list.some((p) => pinIdsOf(p).includes(b.id))).flatMap(nosOf))
const infoNos = nosWith(regionPins)                              // 已有 PIN 情报（含只有文字、没放图的）
const imageNos = nosWith(regionPins.filter((p) => p.thumb))       // 已放出实图
const pendingNos = allNos.filter((no) => !noPinNos.has(no) && !infoNos.has(no)).sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))
const pinBoothCount = allNos.length - noPinNos.size
// 占位卡：一个 IP（展位行）一张（用户 9/29：A01 / A03 这种同号多 IP 不要合成一张，也不要因为同号另一家有 PIN 就把它藏掉）。
// 顶部统计仍按展位号算（官方 74 口径不变）。只有一个 IP 的展位号沿用旧 id 'booth:<号>'，本机已勾的「已收集」不丢
const pinnedIds = new Set(regionPins.flatMap(pinIdsOf))
const placeholders = booths
  .filter((b) => !b.noPin && !pinnedIds.has(b.id) && !nosOf(b).every((no) => noPinNos.has(no)))
  .map((b) => {
    const no = nosOf(b)[0]
    const solo = rowsOf(no).filter((x) => !x.noPin).length === 1
    return { id: solo ? 'booth:' + no : 'booth:' + b.id, no: solo ? no : b.id, type: 'region', zone: b.zone, booth: b.id, name: `${b.ip}「存档碎片」· 暂无情报`, how: '还没公布 PIN 情报', thumb: null }
  })
const all = computed(() => {
  const region = [...pins.filter((p) => p.type === 'region'), ...placeholders].sort((a, b) => a.no.localeCompare(b.no, 'en', { numeric: true }))
  const others = pins.filter((p) => p.type !== 'region')
  return [...region, ...others]
})

const filters = computed(() => [
  { key: 'ALL', label: '全部' },
  ...zones.map((z) => ({ key: z.key, label: z.region, count: all.value.filter((p) => p.zone === z.key && p.type === 'region').length })),
  { key: 'special', label: '夜间 / NPC / 老玩家 / 营地', count: pins.filter((p) => ['night', 'npc', 'veteran', 'camp'].includes(p.type)).length },
  { key: 'reward', label: '拼图', count: pins.filter((p) => p.type === 'reward').length },
  // 已收集：本机勾过的全部（含「?」占位卡，现场先勾也算），用户 9/23 要求
  { key: 'got', label: '已收集', count: all.value.filter((p) => has(p.id)).length },
])

const list = computed(() =>
  all.value.filter((p) => {
    if (onlyKnown.value && !p.thumb) return false
    if (filter.value === 'ALL') return true
    if (filter.value === 'got') return has(p.id)
    if (filter.value === 'special') return ['night', 'npc', 'veteran', 'camp'].includes(p.type)
    if (filter.value === 'reward') return p.type === 'reward'
    return p.type === 'region' && p.zone === filter.value
  }),
)

const totalKnown = pins.filter((p) => p.thumb).length
const collectedCount = computed(() => pins.filter((p) => p.thumb && has(p.id)).length)
// 区域进度：已收集区域 PIN 覆盖的不同展位数（占位卡也算，方便现场先勾）
const zoneCollected = (z) => new Set(all.value.filter((p) => p.type === 'region' && p.zone === z && has(p.id)).map((p) => p.booth)).size
// 官方款数进度：本站已收录**实图**的区域 PIN 条数（按 zone 分；分母用官方 10/1 给的款数）
const zonePinCount = (z) => pins.filter((p) => p.type === 'region' && p.zone === z && p.thumb).length
// 拼图进度卡每区一行：兑换门槛（4/2/2）+ 我已集到的展位数 + 官方款数 + 本站已收录实图款数
const zoneRows = computed(() =>
  roster.zones.map((r) => {
    const bz = zones.find((z) => z.key === r.zone)
    return {
      key: r.zone,
      region: r.name,
      color: ZONE_COLOR[r.zone],
      need: bz ? bz.need : r.count,       // 兑换该区拼图所需集齐的 IP 展位数
      collected: zoneCollected(r.zone),
      official: r.count,                  // 官方该区 PIN 款数
      documented: zonePinCount(r.zone),   // 本站已收录实图款数
    }
  }),
)
// 官方全图鉴的灯箱
const openImgs = (items, i) => { lb.items = items; lb.i = i }

const tagClass = (p) => (p.type === 'night' ? 'gray' : p.type === 'reward' ? 'green' : p.zone === 'B' ? 'yellow' : p.zone === 'C' ? 'blue' : '')
const typeName = (t) => pinTypes.find((x) => x.key === t)?.name || ''
</script>
