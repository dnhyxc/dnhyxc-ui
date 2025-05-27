import * as __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__ from "react/jsx-runtime";
import * as __WEBPACK_EXTERNAL_MODULE__xm_ai_kit_base_e5a38582__ from "@xm/ai.kit.base";
function DrawerFilePreview(props) {
    const { drawerProps, filePreview, origin } = props;
    if (!props.Drawer || !filePreview) return null;
    function getType() {
        const name = filePreview.name || '';
        const cType = name.split('.').pop();
        return {
            type: ({
                pdf: 'pdf',
                docx: 'word',
                doc: 'word',
                wps: 'word',
                png: 'image',
                jpg: 'image',
                jpeg: 'image',
                txt: 'txt',
                md: 'txt'
            })[cType],
            cType: cType
        };
    }
    const { type, cType } = getType();
    const filePreviewProps = {
        type: type,
        url: filePreview.url,
        errorRender: type && ![
            'doc',
            'wps'
        ].includes(cType) ? '文件已删除' : `${cType}格式文档预览正在开发中，敬请期待`
    };
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(props.Drawer, {
        ...drawerProps,
        open: !!filePreview,
        title: filePreview.name,
        style: {
            minWidth: '595.3pt'
        },
        children: 'image' === type ? /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.Fragment, {
            children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("img", {
                src: filePreview.url,
                alt: "",
                className: "object-contain max-w-80% mx-auto"
            })
        }) : /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__xm_ai_kit_base_e5a38582__.FilePreview, {
            ...filePreviewProps,
            origin: origin
        })
    });
}
export { DrawerFilePreview };
