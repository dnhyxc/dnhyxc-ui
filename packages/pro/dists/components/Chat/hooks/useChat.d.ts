import type { ChatMethods, IUserContent, ChatHooksFunction } from '../utils';
type FnGetBody = (params: Record<string, unknown>) => Record<string, unknown>;
export declare function useChat({ createConversation, url, method, headers, getBody: body, params, onMessage, onError, }: {
    createConversation(params: IUserContent): Promise<Record<string, unknown>>;
    url: string;
    method?: string;
    headers?: Record<string, string>;
    params?: Record<string, string>;
    getBody?: FnGetBody;
    onMessage(result: Record<string, unknown>): void;
    onError?(error: Record<string, unknown>): void;
}): {
    loading: boolean;
    chat: ChatMethods & ChatHooksFunction;
};
export {};
