import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

// 缩略图兜底：/img/_t/ 下的缩略图（scripts/gen-thumbs.py 生成）缺失时，换回原图，新加的图忘了跑脚本也不会显示成破图
window.addEventListener('error', (e) => {
  const el = e.target
  if (el && el.tagName === 'IMG' && el.src.includes('/img/_t/')) el.src = el.src.replace('/img/_t/', '/img/')
}, true)

createApp(App).use(router).mount('#app')
