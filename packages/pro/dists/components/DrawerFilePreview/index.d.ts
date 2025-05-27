import type { GetComponentProps } from '../Chat/utils';
import type { IUserChatFile } from '@xm/ai.kit.base';
export declare function DrawerFilePreview(props: {
    Drawer?: typeof import('antd').Drawer;
    drawerProps: Omit<GetComponentProps<typeof import('antd').Drawer>, 'children'>;
    filePreview?: IUserChatFile | null;
    origin?: string;
}): JSX.Element | null;
