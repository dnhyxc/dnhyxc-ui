import * as path from 'node:path';
import { defineConfig } from 'rspress/config';
import { pluginPreview } from '@rspress/plugin-preview';
import { pluginApiDocgen } from '@rspress/plugin-api-docgen';
import { customPlugin } from './custom-plugin';

export default defineConfig({
  title: 'dnhyxc-ui',
  description: 'dnhyxc-ui 组件库文档',
  root: path.join(__dirname, 'docs'),
  // base: '/dnhyxc/',
  themeConfig: {
    nav: [
      { text: '基础组件', link: '/base' },
      { text: '业务组件', link: '/pro' },
    ],
    sidebar: {
      '/base': [
        {
          text: '介绍',
          link: '/base'
        },
        {
          text: '组件',
          items: [
            {
              text: '自定义 Button',
              link: '/base/button'
            },
          ],
        },
      ],
      '/pro': [
        {
          text: '介绍',
          link: '/pro'
        },
      ],
    },
    // 翻页文本配置
    prevPageText: '上一页',
    nextPageText: '下一页',
  },
  plugins: [
    pluginPreview({
      iframeOptions: {
        devPort: 9012
      }
    }),
    pluginApiDocgen({
      entries: {
      },
      apiParseTool: 'react-docgen-typescript',
    }),
    customPlugin()
  ],
});