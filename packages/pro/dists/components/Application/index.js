import * as __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__ from "react/jsx-runtime";
import * as __WEBPACK_EXTERNAL_MODULE_react__ from "react";
import * as __WEBPACK_EXTERNAL_MODULE__Chat_index_js_0dfff17e__ from "../Chat/index.js";
import * as __WEBPACK_EXTERNAL_MODULE_classnames__ from "classnames";
import * as __WEBPACK_EXTERNAL_MODULE__Chat_utils_index_js_f673839c__ from "../Chat/utils/index.js";
const Application = /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__["default"].forwardRef(({ agents, onToggleAgent, className, size, isArrange = false, children, spin, onAgentOut, mode = __WEBPACK_EXTERNAL_MODULE__Chat_utils_index_js_f673839c__.APPLICATION_MODE_HYBRID, onCreateNew, ...chatProps }, ref)=>{
    const chatRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(null);
    const [agent, setAgent] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)();
    const [initializing, setInitializing] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(false);
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
        if (!onToggleAgent) setAgent(agents[0]);
    }, [
        onToggleAgent,
        agents
    ]);
    function toggleAgent(agent) {
        if (!onToggleAgent) {
            setAgent(agent);
            return;
        }
        if (initializing) return;
        setInitializing(true);
        const ret = onToggleAgent(agent);
        if ((0, __WEBPACK_EXTERNAL_MODULE__Chat_utils_index_js_f673839c__.isPromise)(ret)) ret.then((agent)=>{
            setAgent(agent);
        }).finally(()=>{
            setInitializing(false);
        });
        else {
            setAgent(ret);
            setInitializing(false);
        }
    }
    const [subAgents, superAgent] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useMemo)(()=>{
        let superAgent;
        const agentEntry = (agents || []).filter((agent)=>{
            if (agent.isSuper) superAgent = agent;
            return !agent.isSuper;
        });
        return [
            agentEntry,
            superAgent
        ];
    }, [
        agents
    ]);
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useImperativeHandle)(ref, ()=>({
            toggleAgent,
            createNew () {
                chatRef.current?.createNew();
            }
        }));
    function agentOut() {
        toggleAgent(superAgent);
        onAgentOut?.();
    }
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)(__WEBPACK_EXTERNAL_MODULE__Chat_index_js_0dfff17e__.Chat, {
        ref: chatRef,
        ...chatProps,
        className: (0, __WEBPACK_EXTERNAL_MODULE_classnames__["default"])(className, (isArrange || initializing) && 'ai-chat--arrange'),
        agent: agent,
        agents: subAgents,
        onCreateNew: ()=>{
            if (mode === __WEBPACK_EXTERNAL_MODULE__Chat_utils_index_js_f673839c__.APPLICATION_MODE_HYBRID) {
                toggleAgent(superAgent);
                onCreateNew?.();
                return;
            }
            onCreateNew?.();
        },
        onAgentOut: agent?.isSuper ? void 0 : agentOut,
        children: [
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__Chat_index_js_0dfff17e__.Chat.AppInfo, {
                initializing: isArrange ? false : spin && initializing ? spin : initializing,
                size: size,
                agent: agent,
                agentEntry: agent?.isSuper ? subAgents : [],
                onClickAgent: toggleAgent
            }),
            children
        ]
    });
});
export { Application };
