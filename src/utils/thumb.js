// 小图用缩略图：…/img/<路径>.jpg → …/img/_t/<路径>.jpg（scripts/gen-thumbs.py 生成，宽 400px）。
// 只给列表 / 网格里的 <img> 用；灯箱仍传原图。pins 本身已是小图、png 要透明底，都不换。缩略图缺失时 main.js 的全局兜底会换回原图
export const thumb = (url) => String(url).replace(/\/img\/(?!_t\/|pins\/)([^?#]+\.jpg)$/i, '/img/_t/$1')
