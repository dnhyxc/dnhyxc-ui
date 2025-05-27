import * as __WEBPACK_EXTERNAL_MODULE_react__ from "react";
import * as __WEBPACK_EXTERNAL_MODULE__utils_jsonSafeParse_js_5bc328b4__ from "../utils/jsonSafeParse.js";
import * as __WEBPACK_EXTERNAL_MODULE__xm_ai_kit_base_e5a38582__ from "@xm/ai.kit.base";
function useChat({ createConversation, url, method = 'POST', headers = {
    'Content-Type': 'application/json'
}, getBody: body = (params)=>params, params, onMessage, onError }) {
    const conversationBaseParamsRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(null);
    const onEndRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(null);
    const stopRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(null);
    const stopStateRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(false);
    const getBody = (0, __WEBPACK_EXTERNAL_MODULE__xm_ai_kit_base_e5a38582__.useMemoizedFn)(body);
    const memoizedOnMessage = (0, __WEBPACK_EXTERNAL_MODULE__xm_ai_kit_base_e5a38582__.useMemoizedFn)(onMessage);
    const memoizedOnError = (0, __WEBPACK_EXTERNAL_MODULE__xm_ai_kit_base_e5a38582__.useMemoizedFn)(onError);
    const memoizedCreateConversation = (0, __WEBPACK_EXTERNAL_MODULE__xm_ai_kit_base_e5a38582__.useMemoizedFn)(createConversation);
    async function runChat(params) {
        try {
            if (!conversationBaseParamsRef.current) conversationBaseParamsRef.current = await memoizedCreateConversation(params);
            const controller = new AbortController();
            stopRef.current = ()=>{
                stopStateRef.current = true;
                controller.abort();
            };
            if (stopStateRef.current) return;
            const body = getBody({
                ...conversationBaseParamsRef.current,
                ...params,
                ...chatRef.current.getConversationParams()
            });
            if (params.retry) body.retry = true;
            if (Array.isArray(body.history) && body.history.length) body.takeHistory = true;
            const promise = runConnectAIServer(body, {
                abortController: controller,
                onmessage (res) {
                    const result = (0, __WEBPACK_EXTERNAL_MODULE__utils_jsonSafeParse_js_5bc328b4__.jsonSafeParse)(res.data, {});
                    if (void 0 === result.code || null === result.code || 0 === result.code || 200 === result.code) memoizedOnMessage(result);
                    else {
                        memoizedOnError?.(result);
                        chatRef.current.robot({
                            type: 'error',
                            data: {
                                message: result.msg
                            }
                        });
                    }
                },
                onclose () {
                    if (stopStateRef.current) return;
                    chatRef.current.robot({
                        type: 'end'
                    });
                },
                onerror (err) {
                    if (stopStateRef.current) return;
                    chatRef.current.robot({
                        type: 'error',
                        data: {
                            message: err?.code ? err?.message || '网络繁忙，请稍后再试' : '网络繁忙，请稍后再试'
                        }
                    });
                    stopRef.current?.();
                    memoizedOnError?.(err);
                }
            });
            onEndRef.current = ()=>{
                promise.resolve({});
            };
            return promise.promise;
        } catch (err) {
            setLoading(false);
            chatRef.current.robot({
                type: 'error',
                data: {
                    message: err?.code ? err?.message || '网络繁忙，请稍后再试' : '网络繁忙，请稍后再试'
                }
            });
            console.error(err);
        }
    }
    const chatRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)({
        run (params, serve) {
            chatRef.current.validator(params, (params)=>{
                const id = chatRef.current.send(params);
                if (id) {
                    stopStateRef.current = false;
                    setLoading(true);
                    if (serve) {
                        onEndRef.current = ()=>{
                            setLoading(false);
                        };
                        serve(params).then((res)=>{
                            if (stopStateRef.current) return;
                            if (res?.length && Array.isArray(res)) res.forEach((item)=>{
                                chatRef.current.robot(item);
                            });
                            else chatRef.current.robot({
                                type: 'end'
                            });
                        }).catch((err)=>{
                            if (stopStateRef.current) return;
                            chatRef.current.robot({
                                type: 'error',
                                data: {
                                    message: err.msg
                                }
                            });
                        });
                    } else runChat(params).catch((err)=>{
                        console.error(err);
                    });
                }
            });
        },
        runEnd () {
            onEndRef.current?.();
            onEndRef.current = null;
        },
        stop () {
            stopRef.current?.();
        },
        updateConversation (conversationBaseParams = null, list = []) {
            conversationBaseParamsRef.current = conversationBaseParams || null;
            if (false !== list) chatRef.current.clearChatList(list);
        }
    });
    const { run: runConnectAIServer, loading, setLoading } = (0, __WEBPACK_EXTERNAL_MODULE__xm_ai_kit_base_e5a38582__.useConnectAIServer)({
        url,
        method,
        headers,
        params
    });
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>()=>{
            stopRef.current?.();
        }, []);
    return {
        loading,
        chat: chatRef.current
    };
}
export { useChat };
