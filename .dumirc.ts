import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'DNHYXC-UI',
  outputPath: 'docs-dist',
  favicons: ['/favicon.png'],
  themeConfig: {
    name: 'dnhyxc-ui',
    logo: '/logo.png', // 配置站点logo
    showLineNum: true, // 显示代码块行号
    rtl: true,
    socialLinks: {
      github: 'https://github.com/dnhyxc',
    },
    // nav: {
    //   // mode可选值有：override、append、prepend
    //   // - override: 直接覆盖约定导航，与 nav: [{ title: 'Blog', link: '/blog' }] 配置相同
    //   // - append: 将 value 中的导航追加到约定路由后面
    //   // - prepend: 将 value 中的导航添加到约定路由前面
    //   mode: 'override',
    //   value: [
    //     { title: '开发指南', link: '/guide' },
    //     { title: '研发', link: '/research/illustrate/illustrate' },
    //     { title: '组件', link: '/components' },
    //     { title: '墨客', link: 'http://43.143.27.249:9216' },
    //   ],
    // },
    sidebar: {
      '/components': [
        {
          title: '组件',
          children: [{ title: '组件总览', link: '/components' }],
        },
        {
          title: '页面布局',
          children: [
            { title: '按钮组件', link: '/components/button' },
            { title: '标题组件', link: '/components/foo' },
          ],
        },
        {
          title: '通用组件',
          children: [
            { title: '按钮组件', link: '/components/button' },
            { title: '标题组件', link: '/components/foo' },
          ],
        },
      ],
    },
    footer: `Copyright © ${new Date().getFullYear()}
      <br/>
      Powered by <a href="https://github.com/dnhyxc">dnhyxc</a>
    `,
  },
  apiParser: {},
  resolve: {
    // 配置入口文件路径，API 解析将从这里开始
    entryFile: './src/index.ts',
  },
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  alias: {
    '@styles': '/styles',
  },
  // 修改dumi主题色
  theme: {
    '@c-primary': '#ff9900',
  },
  // cssMinifierOptions: {
  //   cssMinifier: 'esbuild',
  //   cssMinifierOptions: {
  //     minifyWhitespace: true,
  //     minifySyntax: true,
  //   },
  // },
  lessLoader: {
    modifyVars: {
      hack: `true; @import "@styles/index"`,
    },
    javascriptEnabled: true,
  },
});
