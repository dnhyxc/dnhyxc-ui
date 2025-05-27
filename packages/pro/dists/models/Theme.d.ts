import type React from 'react';
import type { HistoryProps } from '../components/History';
import type { ChatProps } from '../components/Chat/utils';
type Props = Pick<ChatProps, 'message' | 'Tooltip'> & Pick<HistoryProps, 'Drawer' | 'Input' | 'Popconfirm' | 'Spin'>;
export declare class ModelTheme {
    theme?: 'light' | 'dark';
    message?: Props['message'];
    Tooltip?: Props['Tooltip'] | React.ReactFragment;
    Drawer?: Props['Drawer'] | React.ReactFragment;
    Input?: Props['Input'] | React.ReactFragment;
    Popconfirm?: Props['Popconfirm'] | React.ReactFragment;
    Spin?: Props['Spin'] | React.ReactFragment;
    constructor(options: ModelTheme);
}
export {};
