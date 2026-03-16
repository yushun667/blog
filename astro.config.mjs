// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
// 若仓库名为 username.github.io 则 site 为 https://username.github.io，base 可不设或 '/'
// 若仓库名为 blog 则 base: '/blog/'，site 为 https://username.github.io
export default defineConfig({
  site: 'https://example.github.io',
  base: '/blog/',
  output: 'static',
});
