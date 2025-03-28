import type {Meta, StoryObj} from '@storybook/react';
import {Fragment} from 'react';
import {fn} from '@storybook/test';

import {CloudUpload, IconFile} from '@/internal/Icons';
import {Button} from '@/lib/Button';
import {ButtonGroup} from '@/lib/ButtonGroup';

import type {Props} from './Toast.tsx';
import {Toast} from './Toast.tsx';
import {useToastState} from './useToastState.tsx';

const meta = {
    title: 'Components/Toast',
    component: Toast,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    args: {
        onToggle: fn(),
        onClick: fn(),
    },
    argTypes: {
        onClick: {
            table: {
                disable: true,
            },
        },
        onToggle: {
            table: {
                disable: true,
            },
        },
        className: {
            table: {
                disable: true,
            },
        },
        id: {
            table: {
                disable: true,
            },
        },
        role: {
            table: {
                disable: true,
            },
        },
        actions: {
            options: ['noActions', 'withActions'],
            mapping: {
                noActions: undefined,
                withActions: [
                    {name: 'foo', title: 'Foo Action', icon: IconFile},
                    {name: 'bar', title: 'Bar Action'},
                    {name: 'bazz', title: 'Bazz Action'},
                ],
            },
            control: {
                type: 'radio',
                labels: {
                    noActions: 'No actions',
                    withActions: 'With actions',
                },
            },
        },
        icon: {
            options: ['noCustomIcon', 'withCustomIcon'], // An array of serializable values
            mapping: {
                noCustomIcon: undefined,
                withCustomIcon: IconFile,
            }, // Maps serializable option values to complex arg values
            control: {
                type: 'radio', // Type 'select' is automatically inferred when 'options' is defined
                labels: {
                    // 'labels' maps option values to string labels
                    noCustomIcon: 'No custom icon',
                    withCustomIcon: 'With custom icon',
                },
            },
        },
    },
} as Meta<typeof Toast>;

export default meta;
type Story = StoryObj<Props>;

const actions = [
    {title: 'Default Action', onClick: fn()},
    {title: 'With Icon', icon: IconFile, onClick: fn()},
    {title: 'Link Action', type: 'link', onClick: fn()},
    {title: 'Overridden icon', type: 'link', icon: CloudUpload, onClick: fn()},
    [
        {title: 'Danger Action', type: 'danger', onClick: fn()},
        {title: 'Success Action', type: 'success', onClick: fn()},
    ],
];

export const Primary: Story = {
    name: 'Single',
    render: args => {
        const id = 'foo';
        const {openToast, closeToast} = useToastState(id);
        return (
            <Fragment>
                <ButtonGroup>
                    <Button onClick={openToast}>Open toast</Button>
                    <Button onClick={closeToast}>Close toast</Button>
                </ButtonGroup>
                <Toast {...args} id={id} />
            </Fragment>
        );
    },
    args: {
        title: 'Hello, world!',
        body: 'This is Toast example.',
    },
    argTypes: {
        actions: {
            options: ['noActions', 'withAllActions'], // An array of serializable values
            mapping: {
                noActions: undefined,
                withAllActions: actions,
            }, // Maps serializable option values to complex arg values
            control: {
                type: 'radio', // Type 'select' is automatically inferred when 'options' is defined
                labels: {
                    // 'labels' maps option values to string labels
                    noActions: 'No actions',
                    with2Actions: '2 actions',
                    withAllActions: 'With all actions',
                },
            },
        },
    },
};

export const Multiple: Story = {
    render: () => {
        const {openToast: openFoo, closeToast: closeFoo} = useToastState('foo');
        const {openToast: openBar, closeToast: closeBar} = useToastState('bar');
        return (
            <Fragment>
                <ButtonGroup layout="vertical">
                    <Button onClick={openFoo}>Open foo</Button>
                    <Button onClick={closeFoo}>Close foo</Button>
                    <Button onClick={openBar}>Open bar</Button>
                    <Button onClick={closeBar}>Close bar</Button>
                </ButtonGroup>
                <Toast id="foo" title="Foo toast" />
                <Toast id="bar" title="Bar toast" />
            </Fragment>
        );
    },
    argTypes: {
        title: {
            table: {
                disable: true,
            },
        },
        variant: {
            table: {
                disable: true,
            },
        },
        body: {
            table: {
                disable: true,
            },
        },
        actions: {
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
