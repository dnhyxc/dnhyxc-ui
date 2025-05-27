import * as __WEBPACK_EXTERNAL_MODULE_react__ from "react";
import * as __WEBPACK_EXTERNAL_MODULE__Chat_utils_index_js_11fa8297__ from "../../Chat/utils/index.js";
function useCheckAgent(dataSource, handler) {
    const [agent, setAgent] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)();
    const [initializing, setInitializing] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(false);
    function check(agent) {
        if (initializing) return;
        setInitializing(true);
        const ret = handler(agent);
        if ((0, __WEBPACK_EXTERNAL_MODULE__Chat_utils_index_js_11fa8297__.isPromise)(ret)) ret.then((agent)=>{
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
        const agentEntry = (dataSource || []).filter((agent)=>{
            if (agent.isSuper) superAgent = agent;
            return !agent.isSuper;
        });
        return [
            agentEntry,
            superAgent
        ];
    }, [
        dataSource
    ]);
    return {
        current: agent,
        dataSource,
        toggle: check,
        agentList: subAgents,
        superAgent,
        checking: initializing
    };
}
export { useCheckAgent };
