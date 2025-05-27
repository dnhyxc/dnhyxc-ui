import { AgentInfo, AppInfo, InputBox, Recommend, RobotResult, RobotTools, RobotSeek, UserContent } from '@xm/ai.kit.base';
import type { RefAttributes } from 'react';
import React from 'react';
import './index.less';
import type { ChatMethods, ChatProps } from './utils';
import { History } from '../History';
interface ChatStaticComponents {
    AgentInfo: typeof AgentInfo;
    RobotResult: typeof RobotResult;
    UserContent: typeof UserContent;
    InputBox: typeof InputBox;
    Recommend: typeof Recommend;
    RobotSeek: typeof RobotSeek;
    AppInfo: typeof AppInfo;
    RobotTools: typeof RobotTools;
    History: typeof History;
}
export declare const Chat: React.ForwardRefExoticComponent<ChatProps & RefAttributes<ChatMethods>> & ChatStaticComponents;
export {};
