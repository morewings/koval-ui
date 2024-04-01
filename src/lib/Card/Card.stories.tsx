import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';

import {P, H2} from '@/lib';
import {IconFile, CloudUpload} from '@/internal/Icons';

import {Card} from './Card.tsx';

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

const actionsTwo = [
    [
        {title: 'Danger Action', type: 'danger', onClick: fn()},
        {title: 'Success Action', type: 'success', onClick: fn()},
    ],
];

const meta = {
    title: 'Components/Card',
    component: Card,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
    args: {
        width: 480,
        height: 320,
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
        headerImageUrl: {
            options: ['noHeaderImage', 'withHeaderImage'], // An array of serializable values
            mapping: {
                noHeaderImage: undefined,
                withHeaderImage: 'https://picsum.photos/999/999',
            }, // Maps serializable option values to complex arg values
            control: {
                type: 'radio', // Type 'select' is automatically inferred when 'options' is defined
                labels: {
                    // 'labels' maps option values to string labels
                    noHeaderImage: 'No header image',
                    withHeaderImage: 'With header image',
                },
            },
        },
        actions: {
            options: ['noActions', 'with2Actions', 'withAllActions'], // An array of serializable values
            mapping: {
                noActions: undefined,
                with2Actions: actionsTwo,
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
} as Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: args => {
        return (
            <Card {...args}>
                <H2>Header</H2>
                <P>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus, orci non porttitor semper,
                    sapien magna vestibulum est, eu feugiat mi enim sed enim. Ut ullamcorper, urna sit amet rutrum
                    varius, nisi urna dictum diam, vel blandit velit urna a metus. Vestibulum accumsan dictum nulla eget
                    lobortis.
                </P>
                <P>
                    Nunc sed sem semper, porttitor turpis sit amet, laoreet sapien. Pellentesque porta mollis convallis.
                    Aliquam consequat mi et dui vehicula, nec posuere mauris aliquam.
                </P>
            </Card>
        );
    },
    args: {},
};
