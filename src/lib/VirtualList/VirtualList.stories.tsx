import type {Meta, StoryObj} from '@storybook/react';
// import {fn} from '@storybook/test';

import {generateData} from './mocks/generateData.ts';
import {MockStaticSize} from './mocks/MockStaticSize.tsx';
import {MockVariableSize} from './mocks/MockVariableSize.tsx';
import type {Props} from './VirtualList.tsx';
import {VirtualList} from './VirtualList.tsx';

const SEED = 12;

const createStaticItems = (randomData: ReturnType<typeof generateData>) => {
    return randomData.map(({cardTitle, color, animal, character}, i) => {
        return (
            <MockStaticSize
                key={`${cardTitle}-${i}`}
                header={cardTitle}
                description={`${color} ${animal}`}
                character={character}
            />
        );
    });
};

const createVariableItems = (randomData: ReturnType<typeof generateData>) => {
    return randomData.map(({color, animal, character, cardTitle}, i) => {
        return (
            <MockVariableSize
                seed={SEED + i}
                header={cardTitle}
                key={`${animal}-${i}`}
                description={`${color} ${animal}`}
                character={character}
            />
        );
    });
};

const meta = {
    title: 'Components/VirtualList',
    component: VirtualList,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
    args: {},
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
    },
} as Meta<typeof VirtualList>;

export default meta;
type Story = StoryObj<Props>;

export const Primary: Story = {
    name: 'Same item height',
    render: args => {
        return <VirtualList {...args} />;
    },
    args: {
        width: 366,
        height: 666,
        averageItemHeight: 195,
        children: createStaticItems(generateData(3, SEED)),
    },
    argTypes: {
        variableItemSize: {
            table: {
                disable: true,
            },
        },
        children: {
            options: ['rows0', 'rows3', 'rows100', 'rows1000', 'rows10000', 'rows42000'],
            mapping: {
                rows0: [],
                rows3: createStaticItems(generateData(3, SEED)),
                rows100: createStaticItems(generateData(100, SEED)),
                rows1000: createStaticItems(generateData(1000, SEED)),
                rows10000: createStaticItems(generateData(10000, SEED)),
                rows42000: createStaticItems(generateData(42000, SEED)),
            },
            control: {
                type: 'radio',
                labels: {
                    rows0: '0 rows',
                    rows3: '3 rows',
                    rows100: '100 rows',
                    rows1000: '1000 rows',
                    rows10000: '10000 rows',
                    rows42000: '42000 rows',
                },
            },
        },
    },
};

export const VariableHeight: Story = {
    name: 'Variable item height',
    render: args => {
        return <VirtualList {...args} />;
    },
    args: {
        width: 420,
        height: 666,
        averageItemHeight: 195,
        children: createVariableItems(generateData(3, SEED)),
        variableItemSize: true,
    },
    argTypes: {
        children: {
            options: ['rows0', 'rows3', 'rows100', 'rows1000', 'rows10000', 'rows42000'],
            mapping: {
                rows0: [],
                rows3: createVariableItems(generateData(3, SEED)),
                rows100: createVariableItems(generateData(100, SEED)),
                rows1000: createVariableItems(generateData(1000, SEED)),
                rows10000: createVariableItems(generateData(10000, SEED)),
                rows42000: createVariableItems(generateData(42000, SEED)),
            },
            control: {
                type: 'radio',
                labels: {
                    rows0: '0 rows',
                    rows3: '3 rows',
                    rows100: '100 rows',
                    rows1000: '1000 rows',
                    rows10000: '10000 rows',
                    rows42000: '42000 rows',
                },
            },
        },
    },
};
