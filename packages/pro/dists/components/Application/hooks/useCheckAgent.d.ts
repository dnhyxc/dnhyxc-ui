import type { IAgent } from "@xm/ai.kit.base";
import { type MaybePromise } from "../../Chat/utils";
/**
 * 切换聊天的主体
 */
export declare function useCheckAgent(dataSource: IAgent[], handler: (agent: IAgent) => MaybePromise<IAgent>): {
    current: IAgent | undefined;
    dataSource: IAgent[];
    toggle: (agent: IAgent) => void;
    agentList: IAgent[];
    superAgent: IAgent;
    checking: boolean;
};
