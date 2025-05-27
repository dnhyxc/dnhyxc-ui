import type { IRobotResult, IAgent, IChatTool, IStage } from '@xm/ai.kit.base';
import type React from 'react';
import type { HistoryServeProps } from "../../History";
import type { FormInstance } from 'antd';
interface IRobotBaseParams<T, U> {
    type: T;
    data: U;
}
export type IRobotSeek = {
    /** 思考内容 */
    content: string;
    /** 思考中 */
    seeking?: boolean;
};
export type IRobotActions = {
    /** 重新回答 */
    refresh?: boolean | ((userContent: IUserContent) => void);
    /** 复制 */
    copy?: boolean | ((userContent: IUserContent) => void);
} & {
    [key: string]: boolean | ((userContent: IUserContent) => void);
};
/** 思考内容 */
type RobotSeekParams = IRobotBaseParams<'seek', IRobotSeek>;
/** 思考内容 */
type RobotToolParams = IRobotBaseParams<'tool', IChatTool>;
/** 答案内容 */
type RobotAnswerParams = IRobotBaseParams<'answer', IRobotResult>;
/** 操作内容 */
type RobotActionsParams = IRobotBaseParams<'actions', IRobotActions>;
type RobotRecommendParams = IRobotBaseParams<'recommend', string[]> | IRobotBaseParams<'recommend', {
    /** 片段内容 */
    content: string;
}>;
type RobotEndParams = {
    type: 'end';
};
interface RobotEmpty extends IRobotResult {
    type: 'empty';
    /** 答案类型 */
    chat2dbType?: 'table' | 'chart';
}
type RobotErrorParams = {
    type: 'error';
    data?: {
        message: string;
    };
};
export type IUserContent = {
    /** 输出内容 */
    content: string;
    /** 是否重试 */
    retry?: boolean;
    /** 类型 */
    type: 'text' | 'file' | 'image';
    /** 变量 */
    variables?: Record<string, any>;
    /** 上传的文件 */
    fileList?: File[];
};
export type ChatItem = {
    id: string;
    stage: IStage;
    errMsg?: string;
    userContent?: IUserContent;
    robotResult?: IRobotResult[];
    emptyRobotResult?: RobotEmpty;
    isEmpty?: boolean;
    isPlaying?: boolean;
    robotSeek?: IRobotSeek;
    robotTools?: IChatTool[];
    actions?: Record<string, boolean | ((userContent: IUserContent) => void)>;
    isEnd?: boolean;
    recommend?: string[];
    recommendStr?: string;
};
export type GetComponentProps<T extends (...args: any) => unknown> = T extends (arg: infer P) => unknown ? P : never;
export type IRobotParams = RobotAnswerParams | RobotSeekParams | RobotToolParams | RobotEmpty | RobotActionsParams | RobotRecommendParams | RobotEndParams | RobotErrorParams;
export declare const APPLICATION_MODE_ALONE = "ALONE";
export declare const APPLICATION_MODE_HYBRID = "HYBRID";
interface ChatPropsBase {
    onCreateNew?: () => void;
    children: React.ReactNode;
    message?: typeof import('antd').message;
    Drawer?: typeof import('antd').Drawer;
    Table?: typeof import('antd').Table;
    style?: React.CSSProperties;
    className?: string;
    historyServe?: HistoryServeProps['serve'];
    isSSE?: boolean;
    Tooltip?: typeof import('antd').Tooltip;
    loadMathParams?: {
        origin?: string;
        uri?: string;
    };
    ttsUrl?: string;
    onAgentOut?: () => void;
    agent?: IAgent;
    agents?: IAgent[];
    /** 表单校验失败 */
    onValidateError?(errors: Record<string, string>): void;
    form?: FormInstance;
}
export interface ChatHooksFunction {
    run(params: IUserContent & {
        variables?: Record<string, any>;
    }, serve?: (params: IUserContent) => Promise<IRobotParams[]>): void;
    updateConversation(conversation?: Record<string, any>, list?: ChatItem[]): void;
    /** 内部方法 */
    runEnd: () => void;
    stop: () => void;
}
export interface ChatServeProps extends ChatPropsBase {
    serve?: (params: IUserContent & {
        variables?: Record<string, any>;
    }, actions: {
        robot: (params: IRobotParams) => void;
        send: (userContent: IUserContent) => undefined | string;
    }) => void;
}
export interface ChatHooksProps extends ChatPropsBase {
    chat?: ChatMethods & ChatHooksFunction;
}
export type ChatProps = ChatServeProps | ChatHooksProps;
export type ChatMethods = {
    send: (userContent: IUserContent) => string | undefined;
    robot: (params: IRobotParams) => void;
    createNew: () => void;
    validator: (userContent: IUserContent, callback: (userContent: IUserContent) => void) => void;
    clearChatList(list?: ChatItem[]): void;
    getConversationParams(): {
        historyList: ChatItem[];
        DEEP_SEEK: boolean;
        INTERNET_SEARCH: boolean;
        AI_MODULE: string;
    };
};
export declare function isSeek(stackItem: IRobotParams): stackItem is RobotSeekParams;
export declare function isTool(stackItem: IRobotParams): stackItem is RobotToolParams;
export declare function isEmpty(stackItem: IRobotParams): stackItem is RobotEmpty;
export declare function isAnswer(stackItem: IRobotParams): stackItem is RobotAnswerParams;
export declare function isActions(stackItem: IRobotParams): stackItem is RobotActionsParams;
export declare function isRecommend(stackItem: IRobotParams): stackItem is RobotRecommendParams;
export declare function isEnd(stackItem: IRobotParams): stackItem is RobotEndParams;
export declare function isError(stackItem: IRobotParams): stackItem is RobotErrorParams;
export type MaybePromise<T> = T | Promise<T>;
export declare function isPromise<T>(value: MaybePromise<T>): value is Promise<T>;
export {};
