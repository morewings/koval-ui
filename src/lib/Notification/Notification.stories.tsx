import type {Meta, StoryObj} from '@storybook/react';
import {Fragment} from 'react';
import {fn} from '@storybook/test';

import {Button} from '@/lib';

import {Notification} from './Notification.tsx';
import {useNotificationState} from './useNotificationState.tsx';

const meta = {
    title: 'Components/Notification',
    component: Notification,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    args: {
        onToggle: fn(),
        onDenied: fn(),
    },
    argTypes: {
        onToggle: {
            table: {
                disable: true,
            },
        },
        onDenied: {
            table: {
                disable: true,
            },
        },
    },
} as Meta<typeof Notification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: args => {
        const {openNotification, closeNotification} = useNotificationState('foo');
        return (
            <Fragment>
                <Button onClick={openNotification}>open notification</Button>
                <br />
                <Button onClick={closeNotification}>close notification</Button>
                <br />
                <Notification {...args} />
            </Fragment>
        );
    },
    args: {
        requireInteraction: false,
        title: 'Foo notification',
        id: 'foo',
        body: 'Notification body',
        icon: 'https://picsum.photos/33/33',
    },
};

export const Multiple: Story = {
    render: args => {
        const {openNotification: openFoo, closeNotification: closeFoo} = useNotificationState('foo');
        const {openNotification: openBar, closeNotification: closeBar} = useNotificationState('bar');
        return (
            <Fragment>
                <Button onClick={openFoo}>open foo</Button>
                <br />
                <Button onClick={openBar}>open bar</Button>
                <br />
                <Button onClick={closeFoo}>close foo</Button>
                <br />
                <Button onClick={closeBar}>close bar</Button>
                <br />
                <Notification
                    {...args}
                    title="Foo notification"
                    id="foo"
                    body="Notification body"
                    icon="https://picsum.photos/33/33"
                />
                <Notification
                    {...args}
                    title="Bar notification"
                    id="bar"
                    body="Notification body"
                    icon="https://picsum.photos/33/33"
                />
            </Fragment>
        );
    },
    args: {
        requireInteraction: false,
    },
    argTypes: {
        body: {
            table: {
                disable: true,
            },
        },
        title: {
            table: {
                disable: true,
            },
        },
        id: {
            table: {
                disable: true,
            },
        },
        icon: {
            table: {
                disable: true,
            },
        },
    },
};
