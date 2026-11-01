/* global hexo */
'use strict';

const fs = require('fs');
const path = require('path');

// GitHub Pages 默认启用 Jekyll 处理，会把文章里的 {{ }} 当模板语法解析，
// 导致代码块内容被吃掉。生成一个空 .nojekyll 文件即可关闭。
hexo.extend.filter.register('after_generate', () => {
  fs.mkdirSync(hexo.public_dir, { recursive: true });
  const target = path.join(hexo.public_dir, '.nojekyll');
  fs.writeFileSync(target, '');
  hexo.log.debug('已写入 .nojekyll');
});
