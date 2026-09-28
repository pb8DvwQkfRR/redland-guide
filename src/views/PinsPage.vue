<template>
  <div class="page">
    <PageHeader title="PIN 图鉴" :sub="`冒险者拼图（冰箱贴）· 已收集 ${collectedCount} / ${totalKnown} 枚已公布`" />

    <!-- 官方口径核对（按展位号）：发 PIN 展位 74 个 = 已有情报 + 待公布（用户 9/28） -->
    <div class="pcard mt-10">
      <div class="pcard-body">
        <div class="pcard-title">📊 发 PIN 展位统计（按官方口径）</div>
        <div class="row wrap mt-6" style="gap:6px">
          <span class="pill">官方：总展位 {{ allNos.length }} · 发 PIN {{ OFFICIAL_PIN_BOOTHS }}</span>
          <span class="pill hot">已放实图 {{ imageNos.size }}</span>
          <span class="pill warm">有情报无图 {{ infoNos.size - imageNos.size }}</span>
          <span class="pill">待公布 {{ pendingNos.length }}</span>
        </div>
        <div class="small muted mt-6">按展位号计：同一展位号的多个 IP 算一个展位，一个展位发两款 PIN 也算一个。{{ imageNos.size }} + {{ infoNos.size - imageNos.size }} + {{ pendingNos.length }} = {{ infoNos.size + pendingNos.length }}<template v-if="infoNos.size + pendingNos.length === OFFICIAL_PIN_BOOTHS">，与官方 {{ OFFICIAL_PIN_BOOTHS }} 个一致</template><template v-else>，与官方 {{ OFFICIAL_PIN_BOOTHS }} 个不一致（本站 {{ pinBoothCount }}），待核</template>；不发 PIN 的 {{ noPinNos.size }} 个展位（宝藏码头 / 补给点 / 赞助区 / 待解锁 / 光夜展陈）不列。</div>
      </div>
    </div>

    <!-- 三区开图进度（按已收集的区域 PIN 覆盖的展位数） -->
    <div class="pcard sand mt-10">
      <div class="pcard-body">
        <div class="pcard-title">🧩 冒险者拼图进度</div>
        <div class="small muted mt-6">每个区域集齐指定数量的 IP 展位 PIN，到区域结算点兑换该区拼图；三块拼成冒险岛拼图完整体。</div>
        <div class="row wrap mt-10" style="gap:10px">
          <div v-for="z in zones" :key="z.key" style="flex:1;min-width:90px">
            <div class="row between small"><b :style="{ color: z.color }">{{ z.region }}</b><span>{{ zoneCollected(z.key) }} / {{ z.need }}</span></div>
            <div class="bar mt-6"><i :style="{ width: Math.min(100, (zoneCollected(z.key) / z.need) * 100) + '%', background: z.color }" /></div>
          </div>
        </div>
        <div class="small muted mt-6">* 编号为按展位号的占位编码（官方未给 PIN 编号）；灰色「?」软盘是<b>还没公布 PIN 情报</b>的展位（一个展位号一张），公布后替换。</div>
        <div class="small muted mt-6">* 官方说 74 个展位发 PIN，每区集齐 4 / 2 / 2 枚即可兑换该区拼图。勾选「只看已公布」可只看实图已公布的 PIN。</div>
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
        <div class="pin-name">{{ p.name }}</div>
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
import { useCollected } from '../composables/useStore.js'

const base = import.meta.env.BASE_URL
const { has, toggle } = useCollected()
const filter = ref('ALL')
const onlyKnown = ref(false)
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
// 未公布 PIN 的展位号 → 一个展位号一张占位卡（同号多 IP 合成一张）
const placeholders = pendingNos.map((no) => {
  const rows = rowsOf(no).filter((b) => !b.noPin)
  const zone = no[0]
  return { id: 'booth:' + no, no, type: 'region', zone, booth: rows[0].id, name: `${rows.map((b) => b.ip).join(' / ')}（暂无 PIN 情报）`, how: '还没公布 PIN 情报', thumb: null }
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

const tagClass = (p) => (p.type === 'night' ? 'gray' : p.type === 'reward' ? 'green' : p.zone === 'B' ? 'yellow' : p.zone === 'C' ? 'blue' : '')
const typeName = (t) => pinTypes.find((x) => x.key === t)?.name || ''
</script>
