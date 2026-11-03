const https = require('https');

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    }).on('error', reject);
  });
}

(async () => {
  const html = await get('https://qiiiq-Cys.github.io/My_blog/');
  const idx = html.indexOf('第一篇自己的记录');
  const bodyIdx = html.indexOf('post-body', idx);
  console.log('卡片正文起始位置:', bodyIdx);
  const seg = html.slice(bodyIdx, bodyIdx + 700);
  console.log('=== 首页显示的摘要内容 ===');
  console.log(seg.replace(/></g, '>\n<'));
  console.log('\n=== 检查关键词 ===');
  console.log('含开场白:', html.includes('我希望我可以经常使用这个工具'));
  console.log('含 description 原文:', html.includes('首次个人使用'));
})();
