export declare function useTTS(url: string): {
    loading: boolean;
    isPlaying: boolean;
    play: (text: string, spk_id: string | number) => void;
    stop: () => void;
    hasCache: boolean;
};
