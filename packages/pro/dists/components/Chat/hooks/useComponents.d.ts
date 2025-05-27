import type { ReactElement, ReactNode } from 'react';
export declare function useComponents(children: ReactNode): {
    inputBoxElement: ReactElement;
    infoElement?: ReactElement;
    userContentElement: ReactElement;
    robotResultElement: ReactElement;
    robotSeekElement: ReactElement;
    robotToolsElement: ReactElement;
    recommendElement: ReactElement;
    historyElement?: ReactElement;
};
