// import { pluginVue } from '@rsbuild/plugin-vue'
import { pluginLess } from '@rsbuild/plugin-less'
import { defineConfig } from '@rslib/core'
import { pluginUnpluginVue } from 'rsbuild-plugin-unplugin-vue';

export default defineConfig({
  source: {
    entry: {
      // index: ['./src/index.ts'],
      index: ['./src/**'], // 这种标识
    },
  },
  lib: [
    {
      // bundle: false 表示不将依赖打包到最终的构建产物中，而是作为外部依赖处理
      // 这样可以减小打包体积，并允许使用方自行管理依赖版本
      bundle: false,
      format: 'esm',
      // syntax: ['node 18'],
      dts: true,
      outBase: 'src'
    },
  ],
  output: {
    // 开发 Vue 组件，需要在 rslib.config.ts 中设置 target 为 "web"。 这一点至关重要，因为 Rslib 默认将 target 设置为 "node"，这与 Rsbuild 的 target 默认值不同。
    target: 'web',
    // cssModules: {
    //   auto: true,
    //   namedExport: true // 启用命名导出
    // },
    injectStyles: false, // 设置为 false，css 将会被单独打包
  },
  plugins: [pluginLess(), pluginUnpluginVue()],
})
