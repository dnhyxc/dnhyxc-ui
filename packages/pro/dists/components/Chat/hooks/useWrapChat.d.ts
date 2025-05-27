import type { ChatMethods, ChatHooksFunction } from '../utils';
export declare function useWrapChat(chat: Partial<ChatMethods & ChatHooksFunction> | undefined, methods: ChatMethods): ChatMethods & ChatHooksFunction;
