import * as __WEBPACK_EXTERNAL_MODULE_react__ from "react";
function useWrapChat(chat, methods) {
    const ref = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(chat || {});
    ref.current = Object.assign(ref.current, methods);
    if (chat) Object.assign(chat, ref.current);
    return ref.current;
}
export { useWrapChat };
