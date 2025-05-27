import * as __WEBPACK_EXTERNAL_MODULE__context_index_js_c05ec410__ from "../context/index.js";
import * as __WEBPACK_EXTERNAL_MODULE_react__ from "react";
function useConfigComp(params) {
    const context = (0, __WEBPACK_EXTERNAL_MODULE_react__.useContext)(__WEBPACK_EXTERNAL_MODULE__context_index_js_c05ec410__.ThemeContext);
    return Object.keys(params).reduce((acc, key)=>{
        if (params[key] || context[key]) acc[key] = params[key] || context[key];
        return acc;
    }, {});
}
export { useConfigComp };
