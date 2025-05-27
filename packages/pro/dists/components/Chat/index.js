import * as __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__ from "react/jsx-runtime";
import * as __WEBPACK_EXTERNAL_MODULE__xm_ai_kit_base_e5a38582__ from "@xm/ai.kit.base";
import * as __WEBPACK_EXTERNAL_MODULE__xm_icons_xcode_dist_react_535b71ee__ from "@xm/icons-xcode/dist/react";
import * as __WEBPACK_EXTERNAL_MODULE_react__ from "react";
import * as __WEBPACK_EXTERNAL_MODULE__hooks_useComponents_js_d048c145__ from "./hooks/useComponents.js";
import * as __WEBPACK_EXTERNAL_MODULE__hooks_useConfigComp_js_8fb2865c__ from "../../hooks/useConfigComp.js";
import * as __WEBPACK_EXTERNAL_MODULE__hooks_useWrapChat_js_2bc3c238__ from "./hooks/useWrapChat.js";
import "./index.css";
import * as __WEBPACK_EXTERNAL_MODULE__utils_index_js_1ffdce1c__ from "./utils/index.js";
import * as __WEBPACK_EXTERNAL_MODULE__utils_copy_js_ecd4bff3__ from "./utils/copy.js";
import * as __WEBPACK_EXTERNAL_MODULE__History_index_js_d4f20ef8__ from "../History/index.js";
import * as __WEBPACK_EXTERNAL_MODULE_classnames__ from "classnames";
import * as __WEBPACK_EXTERNAL_MODULE__hooks_useWrapForm_js_32b08cef__ from "./hooks/useWrapForm.js";
import * as __WEBPACK_EXTERNAL_MODULE__DrawerFilePreview_index_js_d39387c9__ from "../DrawerFilePreview/index.js";
import * as __WEBPACK_EXTERNAL_MODULE__ResultTTSAction_index_js_fef1bef5__ from "./ResultTTSAction/index.js";
const Chat = /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react__.forwardRef)((props, ref)=>{
    const { children, style, className, isSSE = true, loadMathParams, agent, agents = [], onCreateNew, onAgentOut, ttsUrl, onValidateError } = props;
    const serve = props.serve;
    const chat = props.chat;
    const [chatList, setChatList] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)([]);
    const [contentWidth, setContentWidth] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(0);
    const chatIdMapRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)({});
    const stackRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)([]);
    const historyListRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(chatList);
    const isFlushing = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(false);
    const loadingRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(true);
    const indexRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(0);
    const inputBoxRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(null);
    const idRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(null);
    const winRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(null);
    const boxRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(null);
    const contentRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(null);
    const ttsStopRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(null);
    const [historyOpen, setHistoryOpen] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(false);
    const [popStyle, setPopStyle] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(null);
    const form = (0, __WEBPACK_EXTERNAL_MODULE__hooks_useWrapForm_js_32b08cef__.useWrapForm)(props);
    const prevAgentCode = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(null);
    const sendCallbackRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(void 0);
    const bottomRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(true);
    const [filePreview, setFilePreview] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(null);
    const activeParamsRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)({
        DEEP_SEEK: true,
        INTERNET_SEARCH: false,
        AI_MODULE: ''
    });
    const [, forceUpdate] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)({});
    const { message, Tooltip, Drawer, Table } = (0, __WEBPACK_EXTERNAL_MODULE__hooks_useConfigComp_js_8fb2865c__.useConfigComp)({
        message: props.message,
        Tooltip: props.Tooltip,
        Drawer: props.Drawer,
        Table: props.Table
    });
    const { inputBoxElement, robotSeekElement, robotToolsElement, robotResultElement, infoElement, userContentElement, recommendElement, historyElement } = (0, __WEBPACK_EXTERNAL_MODULE__hooks_useComponents_js_d048c145__.useComponents)(children);
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
        (0, __WEBPACK_EXTERNAL_MODULE__xm_ai_kit_base_e5a38582__.loadMathJax)(loadMathParams).then(()=>{
            loadingRef.current = false;
            forceUpdate({});
        });
    }, []);
    const { send, robot, clearChatList, getConversationParams, validator, createNew } = (0, __WEBPACK_EXTERNAL_MODULE__hooks_useWrapChat_js_2bc3c238__.useWrapChat)(chat, {
        send (userContent) {
            if (loadingRef.current) return;
            const id = Date.now().toString() + indexRef.current++;
            idRef.current = id;
            chatIdMapRef.current[id] = {
                id,
                userContent,
                stage: 1
            };
            loadingRef.current = true;
            setChatList((list)=>[
                    ...list,
                    chatIdMapRef.current[id]
                ]);
            sendCallbackRef.current?.();
            sendCallbackRef.current = void 0;
            scrollToBottom(true);
            return id;
        },
        robot (params) {
            const id = idRef.current;
            const targetChat = chatIdMapRef.current[id];
            if (targetChat) {
                stackRef.current.push(params);
                if (1 === targetChat.stage) targetChat.stage = 2;
                flushRobot(id);
            } else console.error('消息不存在或者已停止');
        },
        clearChatList (list) {
            setChatList(list || []);
            historyListRef.current = list || [];
            indexRef.current = 0;
            chatIdMapRef.current = {};
        },
        getConversationParams () {
            return {
                historyList: historyListRef.current,
                ...activeParamsRef.current
            };
        },
        validator (userContent, callback) {
            if (userContent.retry) {
                callback(userContent);
                return;
            }
            const fileList = inputBoxRef.current?.getFileList?.();
            (0, __WEBPACK_EXTERNAL_MODULE__xm_ai_kit_base_e5a38582__.validator)(userContent, inputBoxElement.props.rules || [], function() {
                if (agent?.schema?.length || props.form) form.validateFields().then((values)=>{
                    callback({
                        variables: values,
                        fileList,
                        ...userContent
                    });
                }).catch((errors)=>{
                    if (inputBoxElement.props.onValidateError && !props.form) inputBoxElement.props.onValidateError(errors);
                    else if (message && !props.form) {
                        const errorList = Object.values(errors);
                        return message.error(errorList.length > 1 ? '请完善变量信息' : errorList.join(','));
                    }
                });
                else callback({
                    fileList,
                    ...userContent
                });
            });
        },
        createNew () {
            prevAgentCode.current = null;
            if (chat?.updateConversation) chat.updateConversation();
            else clearChatList();
            onCreateNew?.();
        }
    });
    function onSend(userContent, callback) {
        if (loadingRef.current) return;
        sendCallbackRef.current = ()=>{
            prevAgentCode.current = agent?.code || null;
            callback?.();
        };
        if (chat?.run) chat.run(userContent);
        else validator(userContent, (userContent)=>{
            try {
                serve?.(userContent, {
                    send,
                    robot
                });
            } catch (err) {
                robot({
                    type: 'error',
                    data: {
                        message: err.message
                    }
                });
            }
        });
    }
    const scrollToBottom = (bool)=>{
        const winNode = winRef.current;
        if (!winNode) return;
        setTimeout(()=>{
            if (bool) bottomRef.current = true;
            if (bottomRef.current) winNode.scrollTop = winNode.scrollHeight + 500;
        }, 100);
    };
    const flushRobot = (id)=>{
        if (isFlushing.current) return;
        isFlushing.current = true;
        function run(stack, targetChat) {
            const stackItem = stack[0];
            if ((0, __WEBPACK_EXTERNAL_MODULE__utils_index_js_1ffdce1c__.isSeek)(stackItem)) {
                targetChat.robotSeek ||= {
                    seeking: true,
                    content: ''
                };
                const robotSeek = targetChat.robotSeek;
                const data = stackItem.data;
                if (isSSE) {
                    robotSeek.content += data.content;
                    data.content = '';
                } else {
                    const i = data.content[0];
                    if (i) {
                        robotSeek.content += i;
                        data.content = data.content.slice(1);
                    }
                }
                if (0 === data.content.length) stack.shift();
            } else if (!targetChat.emptyRobotResult && (0, __WEBPACK_EXTERNAL_MODULE__utils_index_js_1ffdce1c__.isEmpty)(stackItem)) {
                stack.shift();
                targetChat.emptyRobotResult = stackItem;
            } else if ((0, __WEBPACK_EXTERNAL_MODULE__utils_index_js_1ffdce1c__.isTool)(stackItem)) {
                targetChat.robotTools ||= [];
                const robotTools = targetChat.robotTools;
                const { callId, status } = stackItem.data || {};
                const index = robotTools.findIndex((item)=>item.callId === callId && 'done' !== item.status);
                if (index > -1) robotTools[index] = {
                    ...robotTools[index],
                    ...stackItem.data
                };
                else if (stackItem.data) targetChat.robotTools.push(stackItem.data);
                targetChat.stage = 'done' === status ? 5 : 2;
                stack.shift();
            } else if ((0, __WEBPACK_EXTERNAL_MODULE__utils_index_js_1ffdce1c__.isAnswer)(stackItem)) {
                targetChat.stage = 2;
                if (!targetChat.robotResult) {
                    targetChat.robotResult = [];
                    if (targetChat.robotSeek) targetChat.robotSeek.seeking = false;
                }
                const data = stackItem.data;
                if ('text' === data.type) {
                    let robotResult = targetChat.robotResult[targetChat.robotResult.length - 1];
                    if (!robotResult || 'text' !== robotResult.type) {
                        robotResult = {
                            ...data,
                            content: '',
                            type: 'text'
                        };
                        targetChat.robotResult.push(robotResult);
                    }
                    if (isSSE) {
                        robotResult.content += data.content;
                        stack.shift();
                    } else {
                        const i = data.content[0];
                        if (i) {
                            robotResult.content += i;
                            data.content = data.content.slice(1);
                        }
                        if (0 === data.content.length) stack.shift();
                    }
                } else {
                    targetChat.robotResult.push(data);
                    stack.shift();
                }
            } else if ((0, __WEBPACK_EXTERNAL_MODULE__utils_index_js_1ffdce1c__.isActions)(stackItem)) {
                stack.shift();
                targetChat.actions = stackItem.data;
            } else if ((0, __WEBPACK_EXTERNAL_MODULE__utils_index_js_1ffdce1c__.isRecommend)(stackItem)) {
                stack.shift();
                targetChat.stage = 5;
                if (Array.isArray(stackItem.data)) targetChat.recommend = stackItem.data;
                else {
                    targetChat.recommendStr ||= '';
                    targetChat.recommendStr += stackItem.data.content || '';
                    targetChat.recommend = targetChat.recommendStr.split('\n').filter(Boolean);
                }
            } else if ((0, __WEBPACK_EXTERNAL_MODULE__utils_index_js_1ffdce1c__.isEnd)(stackItem)) {
                loadingRef.current = false;
                targetChat.stage = 3;
                if (targetChat.emptyRobotResult && !targetChat.robotResult?.length) {
                    targetChat.isEmpty = true;
                    targetChat.robotResult = [
                        targetChat.emptyRobotResult
                    ];
                }
                chat?.runEnd();
                stack.shift();
            } else if ((0, __WEBPACK_EXTERNAL_MODULE__utils_index_js_1ffdce1c__.isError)(stackItem)) {
                stack.shift();
                loadingRef.current = false;
                targetChat.stage = 4;
                targetChat.errMsg = stackItem.data?.message ?? '系统错误';
                chat?.runEnd();
                targetChat.robotResult ||= [
                    {
                        content: '',
                        type: 'text'
                    }
                ];
                stackRef.current = [];
            } else stack.shift();
            setChatList((list)=>{
                if ((0, __WEBPACK_EXTERNAL_MODULE__utils_index_js_1ffdce1c__.isError)(stackItem) || (0, __WEBPACK_EXTERNAL_MODULE__utils_index_js_1ffdce1c__.isEnd)(stackItem)) historyListRef.current = [
                    ...list
                ];
                return [
                    ...list
                ];
            });
        }
        const flush = ()=>{
            const stack = stackRef.current;
            const targetChat = chatIdMapRef.current[id];
            if (!stack.length || !targetChat) {
                isFlushing.current = false;
                return;
            }
            while(stack.length && isSSE)run(stack, targetChat);
            requestAnimationFrame(flush);
        };
        flush();
    };
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
        const contentNode = contentRef.current;
        if (!contentNode) return;
        const observer = new ResizeObserver((entries)=>{
            scrollToBottom();
            const width = contentNode.offsetWidth;
            setContentWidth(width + 16);
        });
        observer.observe(contentNode);
        return ()=>{
            observer.disconnect();
        };
    }, []);
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useImperativeHandle)(ref, ()=>({
            send,
            robot,
            clearChatList,
            getConversationParams,
            stop: onStop,
            validator,
            createNew
        }));
    function onStop() {
        if (chat?.stop) chat.stop();
        inputBoxElement.props.onStop?.();
        robot({
            type: 'actions',
            data: {}
        });
        robot({
            type: 'end'
        });
        idRef.current = null;
    }
    const drawerProps = {
        width: '980px',
        className: 'ai-chat-file-preview',
        onClose () {
            setFilePreview(null);
        }
    };
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
        className: `ai-chat flex flex-col px-16 ${className || ''} relative`,
        style: {
            ...style
        },
        ref: boxRef,
        onClick: ()=>{
            if (popStyle) setPopStyle(null);
        },
        children: [
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                className: "flex-1 min-h-0 overflow-y-auto pb-24 px-8 pointer-events-auto",
                onScroll: (e)=>{
                    e.persist();
                    const winNode = e.currentTarget;
                    bottomRef.current = winNode.scrollHeight - winNode.scrollTop - winNode.clientHeight < 150;
                },
                ref: winRef,
                children: [
                    !!infoElement && /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                        className: (0, __WEBPACK_EXTERNAL_MODULE_classnames__["default"])(chatList.length && 'hidden', 'ai-welcome-box'),
                        children: /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__["default"].cloneElement(infoElement, {
                            onSend
                        })
                    }),
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                        ref: contentRef,
                        children: chatList.map((item, index, array)=>{
                            const removeNextChat = ()=>{
                                setChatList((list)=>{
                                    const ret = list.slice(0, index);
                                    historyListRef.current = ret;
                                    return ret;
                                });
                            };
                            const defaultActions = [
                                array.length - 1 === index && {
                                    key: 'refresh',
                                    icon: 'refresh_line',
                                    tips: '重试',
                                    on () {
                                        removeNextChat();
                                        onSend({
                                            ...item.userContent,
                                            retry: true
                                        });
                                    }
                                },
                                !item.isEmpty && {
                                    key: 'copy',
                                    tips: '复制文本',
                                    icon: 'replication_line',
                                    on (item, el) {
                                        (0, __WEBPACK_EXTERNAL_MODULE__utils_copy_js_ecd4bff3__.copy)(item.robotResult?.map(({ type, content })=>{
                                            if ('text' === type) return content;
                                        }).filter(Boolean).join('') || '', el, {
                                            onSuccess: ()=>{
                                                message?.success('文本复制成功');
                                            },
                                            onError: ()=>{
                                                message?.error('文本复制失败');
                                            }
                                        });
                                    }
                                },
                                !item.isEmpty && !!ttsUrl && {
                                    key: 'tts',
                                    render: ({ resultRef, className })=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__ResultTTSAction_index_js_fef1bef5__.ResultTTSAction, {
                                            Tooltip: Tooltip,
                                            stopRef: ttsStopRef,
                                            className: className,
                                            url: ttsUrl,
                                            text: ()=>resultRef.current?.innerText
                                        })
                                }
                            ].filter(Boolean);
                            const actions = robotResultElement?.props?.actions?.(defaultActions) || defaultActions;
                            return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                                className: (0, __WEBPACK_EXTERNAL_MODULE_classnames__["default"])('ai-robot-item', {
                                    'after:block!': 5 === item.stage
                                }),
                                children: [
                                    !!item.userContent && /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__["default"].cloneElement(userContentElement, {
                                        ...item.userContent,
                                        stage: item.stage,
                                        onFileItemClick: userContentElement.props.onFileItemClick ?? ((file)=>{
                                            if (!Drawer) console.warn('请配置Drawer');
                                            setFilePreview(file);
                                        })
                                    }),
                                    !!item.robotSeek && /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__["default"].cloneElement(robotSeekElement, item.robotSeek),
                                    !!item.robotTools && /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__["default"].cloneElement(robotToolsElement, {
                                        tools: item.robotTools
                                    }),
                                    (!!item.robotResult || !!item.errMsg) && !!robotResultElement && /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__["default"].cloneElement(robotResultElement, {
                                        Tooltip: Tooltip,
                                        Table: Table,
                                        results: item.robotResult,
                                        errMsg: item.errMsg,
                                        stage: item.stage,
                                        actions: 3 === item.stage && actions.reduce((ret, ui)=>{
                                            let realUi;
                                            realUi = 'function' == typeof ui ? ui(item) : ui;
                                            if (!realUi) return ret;
                                            if (item.actions?.[realUi.key] !== false) ret.push({
                                                ...realUi,
                                                on: (i, el)=>{
                                                    realUi.on?.(item, el);
                                                }
                                            });
                                            return ret;
                                        }, [])
                                    }),
                                    !!item.recommend && /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__["default"].cloneElement(recommendElement, {
                                        recommend: item.recommend,
                                        onSend
                                    })
                                ]
                            }, item.id);
                        })
                    })
                ]
            }),
            /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__["default"].cloneElement(inputBoxElement, {
                form,
                allowClear: inputBoxElement.props.allowClear ?? !!inputBoxElement.props.onStop,
                onStop,
                onSend,
                agent,
                message,
                wrapRef: inputBoxRef,
                setupSetting: prevAgentCode.current === agent?.code,
                onAgentOut: onAgentOut && (()=>{
                    if (loadingRef.current) return;
                    prevAgentCode.current = null;
                    onAgentOut();
                }),
                sysActions: [
                    {
                        key: 'CREATE',
                        text: '新对话',
                        icon: 'plus_linear_line',
                        onClick: ()=>{
                            if (loadingRef.current) return;
                            createNew();
                        },
                        disabled: !chatList.length || loadingRef.current
                    },
                    {
                        key: 'HISTORY',
                        icon: 'circle_time_line',
                        tips: '历史对话',
                        onClick: ()=>{
                            if (!historyElement) {
                                message?.error('未配置历史对话组件');
                                return;
                            }
                            setHistoryOpen(true);
                        },
                        disabled: loadingRef.current
                    },
                    agents.length > 1 && {
                        key: 'AI_AGENTS',
                        icon: 'magicwand_line',
                        text: '智能体模板',
                        isGradient: true,
                        disabled: loadingRef.current,
                        onClick: (e)=>{
                            if (popStyle) {
                                setPopStyle(null);
                                return;
                            }
                            const rect = e.currentTarget.getBoundingClientRect();
                            const { height, top } = boxRef.current.getBoundingClientRect();
                            const maxH = rect.top - top;
                            76 * Math.ceil(agents.length / 4) + 48 > maxH ? setPopStyle({
                                top: 16
                            }) : setPopStyle({
                                bottom: height - maxH,
                                maxHeight: maxH
                            });
                        }
                    },
                    {
                        key: 'AI_MODULE',
                        text: '模型名称',
                        active: true
                    },
                    {
                        key: 'DEEP_SEEK',
                        icon: 'calculatetheforce_line',
                        text: contentWidth < 512 ? '' : '深度思考',
                        tips: contentWidth < 512 ? '深度思考' : '',
                        active: activeParamsRef.current.DEEP_SEEK,
                        onClick: ()=>{
                            activeParamsRef.current.DEEP_SEEK = !activeParamsRef.current.DEEP_SEEK;
                            forceUpdate({});
                        }
                    },
                    {
                        key: 'INTERNET_SEARCH',
                        icon: 'theearth_cloud_line',
                        text: contentWidth < 512 ? '' : '联网搜索',
                        tips: contentWidth < 512 ? '联网搜索' : '',
                        active: activeParamsRef.current.INTERNET_SEARCH,
                        onClick: ()=>{
                            activeParamsRef.current.INTERNET_SEARCH = !activeParamsRef.current.INTERNET_SEARCH;
                            forceUpdate({});
                        }
                    },
                    {
                        key: 'FILE_KNOWLEDGE',
                        icon: 'theuploadform_line',
                        shape: 'rect',
                        light: true,
                        size: 14,
                        tips: '上传文件'
                    },
                    {
                        key: 'VOICE_TO_TEXT',
                        icon: 'microphone_line',
                        shape: 'rect',
                        light: true,
                        size: 14,
                        tips: '语音输入'
                    }
                ].filter(Boolean),
                loading: loadingRef.current
            }),
            !!historyElement && /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__["default"].cloneElement(historyElement, {
                open: historyOpen,
                onCancel () {
                    setHistoryOpen(false);
                },
                async onSelect (item, index) {
                    setHistoryOpen(false);
                    const { list, conversation, variables } = await historyElement.props.onSelect(item, index) || {};
                    prevAgentCode.current = null;
                    if (list.length) {
                        form.destroy?.();
                        form.setFieldsValue(variables || {});
                    }
                    onStop();
                    if (chat?.updateConversation) chat.updateConversation(conversation, list);
                    else clearChatList(list);
                }
            }),
            popStyle && !!infoElement && /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                onClick: (e)=>{
                    e.stopPropagation();
                },
                className: "ai-pop--agent absolute z-100 bg-white mb-16 flex-col shadow-[_0_-2px_10px_0_#0000001a] rounded-lg",
                style: {
                    width: contentWidth,
                    ...popStyle
                },
                children: [
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                        className: "flex items-center flex-shrink-0 px-16 pt-12 pb-12",
                        children: [
                            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("span", {
                                className: "flex-1 text-14 font-500",
                                children: inputBoxElement.props.actions?.find(({ key })=>'AI_AGENTS' === key)?.text || '智能体模板'
                            }),
                            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__xm_icons_xcode_dist_react_535b71ee__["default"], {
                                name: "closed_line",
                                className: "cursor-pointer",
                                size: 14,
                                onClick: ()=>{
                                    setPopStyle(null);
                                }
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                        className: "flex-1 overflow-y-auto",
                        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__xm_ai_kit_base_e5a38582__.AgentEntry, {
                            columns: Math.min(agents.length, 4),
                            rows: Math.ceil(agents.length / 4),
                            items: agents,
                            onClick: (item)=>{
                                prevAgentCode.current = null;
                                if (item.code === agent?.code) {
                                    setPopStyle(null);
                                    return;
                                }
                                infoElement.props.onClickAgent?.(item);
                                setPopStyle(null);
                            }
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__DrawerFilePreview_index_js_d39387c9__.DrawerFilePreview, {
                Drawer: Drawer,
                filePreview: filePreview,
                drawerProps: drawerProps
            })
        ]
    });
});
Chat.AgentInfo = __WEBPACK_EXTERNAL_MODULE__xm_ai_kit_base_e5a38582__.AgentInfo;
Chat.History = __WEBPACK_EXTERNAL_MODULE__History_index_js_d4f20ef8__.History;
Chat.AppInfo = __WEBPACK_EXTERNAL_MODULE__xm_ai_kit_base_e5a38582__.AppInfo;
Chat.RobotResult = __WEBPACK_EXTERNAL_MODULE__xm_ai_kit_base_e5a38582__.RobotResult;
Chat.UserContent = __WEBPACK_EXTERNAL_MODULE__xm_ai_kit_base_e5a38582__.UserContent;
Chat.InputBox = __WEBPACK_EXTERNAL_MODULE__xm_ai_kit_base_e5a38582__.InputBox;
Chat.Recommend = __WEBPACK_EXTERNAL_MODULE__xm_ai_kit_base_e5a38582__.Recommend;
Chat.RobotSeek = __WEBPACK_EXTERNAL_MODULE__xm_ai_kit_base_e5a38582__.RobotSeek;
Chat.RobotTools = __WEBPACK_EXTERNAL_MODULE__xm_ai_kit_base_e5a38582__.RobotTools;
export { Chat };
