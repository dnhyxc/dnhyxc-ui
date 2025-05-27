import React from 'react';
import { Chat } from '../Chat';
import type { GetComponentProps, ChatHooksProps, ChatServeProps, MaybePromise } from '../Chat/utils';
import type { IAgent } from '@xm/ai.kit.base';
export type ApplicationProps = GetComponentProps<typeof Chat.AppInfo> & Pick<ChatHooksProps, 'loadMathParams' | 'className' | 'chat' | 'ttsUrl'> & {
    isArrange?: boolean;
    onToggleAgent?: (agent: IAgent) => MaybePromise<IAgent>;
    agents: IAgent[];
    children?: React.ReactNode;
    spin?: React.ReactNode;
    onAgentOut?: () => void;
    onCreateNew?: () => void;
    mode?: 'ALONE' | 'HYBRID';
} & Pick<ChatServeProps, 'serve'>;
export declare const Application: React.ForwardRefExoticComponent<import("../../../node_modules/@xm/ai.kit.base/dist/types/chat").AppInfoProps & Pick<ChatHooksProps, "className" | "loadMathParams" | "ttsUrl" | "chat"> & {
    isArrange?: boolean;
    onToggleAgent?: (agent: IAgent) => MaybePromise<IAgent>;
    agents: IAgent[];
    children?: React.ReactNode;
    spin?: React.ReactNode;
    onAgentOut?: () => void;
    onCreateNew?: () => void;
    mode?: "ALONE" | "HYBRID";
} & Pick<ChatServeProps, "serve"> & React.RefAttributes<{
    toggleAgent: (agent: IAgent) => void;
}>>;
