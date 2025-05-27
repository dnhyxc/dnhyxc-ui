import { defineConfig } from '@rslib/core';
import { pluginLess } from '@rsbuild/plugin-less'
import { pluginVue } from '@rsbuild/plugin-vue';

export default defineConfig({
  lib: [
    {
      format: 'esm',
      syntax: ['node 18'],
      dts: true,
    },
  ],
  output: {
    target: 'web',
  },
  plugins: [pluginVue(), pluginLess()],
});
