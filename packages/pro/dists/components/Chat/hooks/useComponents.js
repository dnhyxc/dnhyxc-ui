import * as __WEBPACK_EXTERNAL_MODULE__xm_ai_kit_base_e5a38582__ from "@xm/ai.kit.base";
import * as __WEBPACK_EXTERNAL_MODULE_react__ from "react";
function useComponents(children) {
    const ret = {
        inputBoxElement: (0, __WEBPACK_EXTERNAL_MODULE_react__.createElement)(__WEBPACK_EXTERNAL_MODULE__xm_ai_kit_base_e5a38582__.InputBox),
        userContentElement: (0, __WEBPACK_EXTERNAL_MODULE_react__.createElement)(__WEBPACK_EXTERNAL_MODULE__xm_ai_kit_base_e5a38582__.UserContent),
        robotSeekElement: (0, __WEBPACK_EXTERNAL_MODULE_react__.createElement)(__WEBPACK_EXTERNAL_MODULE__xm_ai_kit_base_e5a38582__.RobotSeek),
        robotResultElement: (0, __WEBPACK_EXTERNAL_MODULE_react__.createElement)(__WEBPACK_EXTERNAL_MODULE__xm_ai_kit_base_e5a38582__.RobotResult),
        recommendElement: (0, __WEBPACK_EXTERNAL_MODULE_react__.createElement)(__WEBPACK_EXTERNAL_MODULE__xm_ai_kit_base_e5a38582__.Recommend),
        robotToolsElement: (0, __WEBPACK_EXTERNAL_MODULE_react__.createElement)(__WEBPACK_EXTERNAL_MODULE__xm_ai_kit_base_e5a38582__.RobotTools)
    };
    (0, __WEBPACK_EXTERNAL_MODULE__xm_ai_kit_base_e5a38582__.reactChildrenToArray)(children).forEach((node)=>{
        if ((0, __WEBPACK_EXTERNAL_MODULE_react__.isValidElement)(node)) {
            const { type } = node;
            const name = type.displayName || type.name;
            switch(name){
                case 'AppInfo':
                case 'AgentInfo':
                    ret.infoElement = node || (0, __WEBPACK_EXTERNAL_MODULE_react__.createElement)(__WEBPACK_EXTERNAL_MODULE__xm_ai_kit_base_e5a38582__.AgentInfo);
                    break;
                case 'RobotResult':
                    ret.robotResultElement = node;
                    break;
                case 'RobotTools':
                    ret.robotToolsElement = node;
                    break;
                case 'UserContent':
                    ret.userContentElement = node;
                    break;
                case 'InputBox':
                    ret.inputBoxElement = node;
                    break;
                case 'Recommend':
                    ret.recommendElement = node;
                    break;
                case 'History':
                    ret.historyElement = node;
                    break;
                default:
                    break;
            }
        }
    });
    return ret;
}
export { useComponents };
