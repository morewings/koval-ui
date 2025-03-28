import type {Meta, StoryObj} from '@storybook/react';
import {useCallback, useState} from 'react';
import {fn} from '@storybook/test';

import {Button} from '@/lib/Button';
import {InputGroup} from '@/lib/InputGroup';
import {InputRadio} from '@/lib';
import {Ul} from '@/lib/Text';
import {actionsMockMultipleFlat} from '@/internal/Actions';

import type {Props} from './Menu.tsx';
import {Menu} from './Menu.tsx';
import {MenuActions} from './MenuActions.tsx';

const nonFocusable = (
    <Ul>
        <li>Foo</li>
        <li>Bar</li>
        <li>Bazz</li>
    </Ul>
);

const focusable = (
    <InputGroup name="Group">
        <InputRadio value="foo" label="This is a foo name" key="foo" />
        <InputRadio value="bar" label="This is a bar name" key="bar" />
        <InputRadio value="bazz" label="This is a bazz name" key="bazz" />
    </InputGroup>
);

const meta = {
    title: 'Components/Menu',
    component: Menu,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
    args: {
        onToggle: fn(),
        isOpen: false,
        trapFocus: true,
        alignWidth: true,
    },
    argTypes: {
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
        onToggle: {
            table: {
                disable: true,
            },
        },
        isOpen: {
            table: {
                disable: true,
            },
        },
        referenceClassName: {
            table: {
                disable: true,
            },
        },
        allowedPlacements: {
            table: {
                disable: true,
            },
        },
        content: {
            options: ['nonFocusable', 'focusable'], // An array of serializable values
            mapping: {
                nonFocusable,
                focusable,
            }, // Maps serializable option values to complex arg values
            control: {
                type: 'radio',
                labels: {
                    nonFocusable: 'Non-Focusable Menu',
                    focusable: 'Focusable Menu',
                },
            },
        },
    },
} as Meta<typeof Menu>;

export default meta;
type Story = StoryObj<Props>;

export const Primary: Story = {
    name: 'Basic',
    render: args => {
        const [isOpen, setOpen] = useState(false);
        const handleClick = useCallback(() => {
            setOpen(!isOpen);
        }, [isOpen]);
        const handleToggle = useCallback(
            (openState: boolean) => {
                setOpen(openState);
            },
            [setOpen]
        );
        return (
            <Menu {...args} isOpen={isOpen} onToggle={handleToggle}>
                <Button onClick={handleClick}>Toggle Menu</Button>
            </Menu>
        );
    },
    args: {
        content: focusable,
        variant: 'bordered',
        alignWidth: true,
    },
};

export const ActionsMenu: Story = {
    name: 'Actions',
    render: args => {
        const [isOpen, setOpen] = useState(false);
        const handleClick = useCallback(() => {
            setOpen(!isOpen);
        }, [isOpen]);
        const handleToggle = useCallback(
            (openState: boolean) => {
                setOpen(openState);
            },
            [setOpen]
        );
        return (
            <MenuActions
                {...args}
                actions={actionsMockMultipleFlat}
                isOpen={isOpen}
                onToggle={handleToggle}>
                <Button onClick={handleClick}>Toggle Menu</Button>
            </MenuActions>
        );
    },
    args: {},
    argTypes: {
        content: {
            table: {
                disable: true,
            },
        },
        alignWidth: {
            table: {
                disable: true,
            },
        },
    },
};
