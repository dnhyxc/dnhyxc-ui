import { pluginLess } from '@rsbuild/plugin-less'
import { pluginReact } from '@rsbuild/plugin-react'
import { defineConfig } from '@rslib/core'

export default defineConfig({
  source: {
    entry: {
      index: ['./src/**'],
    },
  },
  lib: [
    {
      bundle: false,
      dts: true,
      format: 'esm',
    },
  ],
  output: {
    target: 'web',
    // cssModules: {
    //   // 强制所有 .less 文件启用模块化
    //   auto: true,
    //   localIdentName: '[name]__[local]--[hash:base64:5]',
    //   // 类名转换规则（解决 button-wrap → buttonWrap）
    //   exportLocalsConvention: 'camelCase', // 或 'camelCaseOnly'
    // }
    // injectStyles: true // 确保样式注入
  },
  plugins: [pluginReact(), pluginLess()],
  // plugins: [pluginReact(), pluginLess({
  //   lessLoaderOptions: {
  //     sourceMap: true,
  //     lessOptions: {
  //       modifyVars: {
  //         'primary-color': '#1DA57A',
  //       },
  //       javascriptEnabled: true,
  //     },
  //   }
  // })],
})
