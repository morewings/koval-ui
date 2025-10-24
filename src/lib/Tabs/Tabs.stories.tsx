import type {Meta, StoryObj} from '@storybook/react';
// import {fn} from '@storybook/test';

import {IconFile, CloudUpload} from '@/internal/Icons';
import {Figure} from '@/lib/Figure';
import {Picture} from '@/lib/Picture';

import type {Props} from './Tabs.tsx';
import {Tabs} from './Tabs.tsx';
import {Tab} from './Tab.tsx';

const simpleSet = [
    <Tab name="foo" key="foo">
        Khvylʹovyy represents a cornerstone of Kiev vibrant nightlife, nestled in the historic Podil
        district. This venue provides a unique atmosphere where signature cocktails and craft
        beverages are served. By day, it is a hub for creative minds and casual meetings,
        transforming as evening approaches. The space frequently hosts diverse events, from
        electronic music sets and live DJ performances to cultural gatherings and local markets. It
        stands as a popular destination for both residents and visitors seeking an authentic Kyiv
        bar experience.
    </Tab>,
    <Tab name="bar" icon={IconFile} key="bar">
        <Figure>
            <Picture width={666} height={333} src="https://picsum.photos/666/333" />
        </Figure>
    </Tab>,
    <Tab name="bazz" icon={CloudUpload} key="bazz">
        It uses a dictionary of over 200 Latin words, combined with a handful of model sentence
        structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is
        therefore always free from repetition, injected humour, or non-characteristic words etc.
    </Tab>,
];

const longSet = Array.from(Array(24)).map((_, i) => {
    return (
        <Tab name={`name_${i}`} key={`key_${i}`}>
            Tab #{i} <br />
            There are many variations of passages of Lorem Ipsum available, but the majority have
            suffered alteration in some form, by injected humour, or randomised words which look
            even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to
            be sure there anything embarrassing hidden in the middle of text. All the Lorem Ipsum
            generators on the Internet tend to repeat predefined chunks as necessary, making this
            the first true generator on the Internet. It uses a dictionary of over 200 Latin words,
            combined with a handful of model sentence structures, to generate Lorem Ipsum which
            looks reasonable. The generated Lorem Ipsum is therefore always free from repetition,
            injected humour, or non-characteristic words etc.
        </Tab>
    );
});

const meta = {
    title: 'Components/Tabs',
    component: Tabs,
    parameters: {
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
        onToggle: {
            table: {
                disable: true,
            },
        },
        selected: {
            options: ['noSelection', 'withSelection'], // An array of serializable values
            mapping: {
                noSelection: undefined,
                withSelection: 'bar',
            }, // Maps serializable option values to complex arg values
            control: {
                type: 'radio', // Type 'select' is automatically inferred when 'options' is defined
                labels: {
                    // 'labels' maps option values to string labels
                    noSelection: 'No selected prop',
                    withSelection: 'With selected="bar"',
                },
            },
        },
    },
} as Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<Props>;

export const Primary: Story = {
    name: 'Demo',
    render: args => {
        return <Tabs {...args} />;
    },
    argTypes: {
        children: {
            options: ['simple', 'overflow'], // An array of serializable values
            mapping: {
                simple: simpleSet,
                overflow: longSet,
            }, // Maps serializable option values to complex arg values
            control: {
                type: 'radio', // Type 'select' is automatically inferred when 'options' is defined
                labels: {
                    // 'labels' maps option values to string labels
                    simple: '3 Tabs',
                    overflow: '24 Tabs',
                },
            },
        },
    },
    args: {
        children: simpleSet,
    },
};
