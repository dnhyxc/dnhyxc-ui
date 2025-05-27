import React, { type ForwardedRef } from 'react';
import type { Button, Popconfirm, Input, Spin, Popover, Checkbox } from 'antd';
import type { ChatItem } from '../Chat/utils';
import type { MaybePromise } from '../Chat/utils';
export interface IHistoryItem {
    title: string;
    created: number;
    index: number;
    id: number;
}
export interface HistoryBaseProps {
    /** 抽屉 */
    Button: typeof Button;
    /** 气泡弹窗 */
    Popover: typeof Popover;
    /** 复选框 */
    Checkbox: typeof Checkbox;
    /** 删除确认 */
    Popconfirm: typeof Popconfirm;
    /** 加载中 */
    Spin: typeof Spin;
    /** 输入 */
    Input: typeof Input;
    /** 选中回调 */
    onSelect?: (item: IHistoryItem, index: number) => MaybePromise<{
        list: ChatItem[];
        conversation: Record<string, any>;
    } | undefined>;
    /** 删除回调 */
    onDelete?: (item: IHistoryItem | IHistoryItem[]) => Promise<void>;
    /** 新建回调 */
    onCreate?: () => void;
    /** 删除确认弹窗的标题 */
    deleteTitle?: string;
    /** 删除确认弹窗的描述 */
    deleteMessage?: string;
    /** 搜索提示 */
    searchPlaceholder?: string;
}
interface HistoryListProps extends HistoryBaseProps {
    /** 历史记录 */
    history: IHistoryItem[];
    /** 应用名称 */
    title: string;
    /** 应用图标 */
    logo: string;
}
export interface HistoryServeProps extends HistoryBaseProps {
    /** 获取历史会话列表 */
    serve(params: {
        keyword?: string;
    }): Promise<IHistoryItem[]>;
}
export type HistoryProps = HistoryListProps | HistoryServeProps;
export type HistoryMethods = {
    setSelected: (id: number) => void;
};
export declare function HistoryComponent(props: HistoryProps, ref: ForwardedRef<HistoryMethods>): JSX.Element;
export declare const HistorySide: React.ForwardRefExoticComponent<HistoryProps & React.RefAttributes<HistoryMethods>>;
export {};
