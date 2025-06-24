/**
 * @rspress/shared 是 Rspress 框架的共享工具包，提供了一些通用的类型定义和工具函数
 * RspressPlugin 接口定义了 Rspress 插件的标准结构，包含插件名称、钩子函数等配置项
 */
import type { RspressPlugin } from '@rspress/shared';
import path from 'path'

export function customPlugin(): RspressPlugin {
  const Home = path.join(__dirname, 'components/Home.tsx');

  return {
    // 插件名称
    name: 'plugin-api',
    // globalUIComponents: [componentPath],
    /**
     * @description markdown 配置对象
     * @property {globalComponents} 用于注册全局 Markdown 组件
     * 这里注册了 Home 组件，使其可以在所有 Markdown 文件中直接使用
     * 例如在 md 文件中可以直接写 <Home /> 来使用 Home 组件
     */
    markdown: {
      globalComponents: [Home]
    }
  };
}
