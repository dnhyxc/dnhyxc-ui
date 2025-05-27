import type React from 'react';
export declare const ResultTTSAction: React.FC<{
    url: string;
    size?: number;
    className?: string;
    text: () => string;
    stopRef?: React.MutableRefObject<(() => void) | null>;
    Tooltip?: typeof import('antd').Tooltip;
}>;
