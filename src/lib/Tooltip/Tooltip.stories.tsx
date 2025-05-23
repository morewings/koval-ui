import type {Meta, StoryObj} from '@storybook/react';
import {useCallback, useState} from 'react';
import {fn} from '@storybook/test';

import {Button} from '@/lib/Button';
import {InputGroup} from '@/lib/InputGroup';
import {InputRadio} from '@/lib';
import {Ul} from '@/lib/Text';

import type {Props} from './Tooltip';
import {Tooltip} from './Tooltip';

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
    title: 'Components/Tooltip',
    component: Tooltip,
    parameters: {
        layout: 'centered',
    },
    args: {
        onToggle: fn(),
        isOpen: false,
        interactive: true,
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
        referenceClassName: {
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
} as Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<Props>;

export const Primary: Story = {
    name: 'Demo',
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
            <Tooltip {...args} isOpen={isOpen} onToggle={handleToggle}>
                <Button onClick={handleClick}>Toggle Tooltip</Button>
            </Tooltip>
        );
    },
    args: {
        content: nonFocusable,
    },
};
