import * as __WEBPACK_EXTERNAL_MODULE__xm_ai_kit_base_e5a38582__ from "@xm/ai.kit.base";
import * as __WEBPACK_EXTERNAL_MODULE_react__ from "react";
function useTTS(url) {
    const { loading, isPlaying, toggle, stop, playAudio } = (0, __WEBPACK_EXTERNAL_MODULE__xm_ai_kit_base_e5a38582__.usePCMPlayer)({
        url
    });
    const dataRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(null);
    const ttsPlay = (text, spk_id)=>{
        if (dataRef.current && !(isPlaying || loading)) playAudio(dataRef.current);
        else toggle({
            text,
            spk_id
        }, (pcm16)=>{
            dataRef.current = pcm16;
        });
    };
    return {
        loading,
        isPlaying,
        play: ttsPlay,
        stop,
        hasCache: !!dataRef.current
    };
}
export { useTTS };
