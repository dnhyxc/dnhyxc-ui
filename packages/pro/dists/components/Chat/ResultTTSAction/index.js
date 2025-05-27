import * as __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__ from "react/jsx-runtime";
import * as __WEBPACK_EXTERNAL_MODULE__hooks_useTTS_js_833b16b5__ from "../hooks/useTTS.js";
import * as __WEBPACK_EXTERNAL_MODULE__xm_icons_xcode_dist_react_535b71ee__ from "@xm/icons-xcode/dist/react";
const ResultTTSAction = (props)=>{
    const { loading, play, isPlaying, stop, hasCache } = (0, __WEBPACK_EXTERNAL_MODULE__hooks_useTTS_js_833b16b5__.useTTS)(props.url);
    const { size = 16, className, children, Tooltip, stopRef } = props;
    const iconNode = /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
        className: className,
        onClick: ()=>{
            const val = props.text();
            if (val) {
                stopRef?.current?.();
                play(val, '中文男');
                if (stopRef) stopRef.current = ()=>{
                    stop();
                };
            }
        },
        children: [
            loading && /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__xm_icons_xcode_dist_react_535b71ee__["default"], {
                className: "animate-spin duration-500",
                name: "circle_loading_line",
                size: size
            }),
            isPlaying && /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__xm_icons_xcode_dist_react_535b71ee__["default"], {
                name: "suspended_line",
                size: size
            }),
            !loading && !isPlaying && /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__xm_icons_xcode_dist_react_535b71ee__["default"], {
                name: "suspended",
                size: size
            }),
            children
        ]
    });
    return Tooltip ? /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(Tooltip, {
        title: isPlaying ? '停止播放' : '文字转语音',
        children: iconNode
    }) : iconNode;
};
export { ResultTTSAction };
