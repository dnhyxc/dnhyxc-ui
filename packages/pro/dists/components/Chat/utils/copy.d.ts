type CopyOptions = {
    onSuccess?: () => void;
    onError?: () => void;
    type?: string;
};
export declare function copyIos(dom: HTMLElement, { onSuccess, onError, type }?: CopyOptions): void;
export declare function copy(text: string, dom: HTMLElement, options?: CopyOptions): void;
export {};
