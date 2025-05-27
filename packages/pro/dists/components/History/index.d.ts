import React, { type ForwardedRef } from 'react';
import type { Drawer, Popconfirm, Input, Spin } from 'antd';
import type { ChatItem } from '../Chat/utils';
import type { MaybePromise } from '../Chat/utils';
export interface IHistoryItem {
    title: string;
    created: number;
    index: number;
}
export interface HistoryBaseProps {
    /** 抽屉 */
    Drawer?: typeof Drawer;
    /** 删除确认 */
    Popconfirm?: typeof Popconfirm;
    /** 加载中 */
    Spin?: typeof Spin;
    /** 输入 */
    Input?: typeof Input;
    /** 选中回调 */
    onSelect?: (item: IHistoryItem, index: number) => MaybePromise<{
        list: ChatItem[];
        conversation: Record<string, any>;
    } | undefined>;
    /** 删除回调 */
    onDelete?: (item: IHistoryItem) => Promise<void>;
    /** 关闭弹窗 */
    onCancel?: () => void;
    /** 删除确认弹窗的标题 */
    deleteTitle?: string;
    /** 删除确认弹窗的描述 */
    deleteMessage?: string;
    /** 搜索提示 */
    searchPlaceholder?: string;
    /** 抽屉状态 */
    open?: boolean;
}
interface HistoryListProps extends HistoryBaseProps {
    /** 历史记录 */
    history: IHistoryItem[];
}
export interface HistoryServeProps extends HistoryBaseProps {
    /** 获取历史会话列表 */
    serve(params: {
        keyword?: string;
    }): Promise<IHistoryItem[]>;
}
export type HistoryProps = HistoryListProps | HistoryServeProps;
export type HistoryMethods = {
    open: () => void;
};
export declare function HistoryComponent(props: HistoryProps, ref: ForwardedRef<HistoryMethods>): JSX.Element;
export declare const History: React.ForwardRefExoticComponent<HistoryProps & React.RefAttributes<HistoryMethods>>;
export {};
