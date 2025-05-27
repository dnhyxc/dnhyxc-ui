import { pluginVue } from '@rsbuild/plugin-vue'
import { pluginLess } from '@rsbuild/plugin-less'
import { defineConfig } from '@rslib/core'

export default defineConfig({
  source: {
    entry: {
      index: ['./src/index.ts'],
      // index: ['./src/**'], // 这种标识
    },
  },
  lib: [
    {
      // bundle: false 表示不将依赖打包到最终的构建产物中，而是作为外部依赖处理
      // 这样可以减小打包体积，并允许使用方自行管理依赖版本
      // bundle: true,
      format: 'esm',
      // syntax: ['node 18'],
      dts: true,
      outBase: 'src'
    },
  ],
  output: {
    target: 'web',
    // cssModules: {
    //   auto: true,
    //   namedExport: true // 启用命名导出
    // },
    // injectStyles: true,
  },
  plugins: [pluginVue(), pluginLess()],
})
