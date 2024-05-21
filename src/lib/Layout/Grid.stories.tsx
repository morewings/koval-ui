import type {Meta, StoryObj} from '@storybook/react';

import {Grid} from './Grid';
import {Row} from './Row';
import {Col} from './Col';
import {Cell} from './demoComponents/Cell';
import {
    offsetExample,
    defaultExample,
    fluidExample,
    responsiveExample,
} from './demoComponents/GridExample';

const meta = {
    title: 'Layout/Grid',
    component: Grid,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
    argTypes: {
        as: {
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
        className: {
            table: {
                disable: true,
            },
        },
    },
} as Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        width: 1280,
        base: 12,
        gap: 16,
    },
    argTypes: {
        children: {
            options: ['default', 'responsive', 'fluid', 'offset'],
            mapping: {
                default: defaultExample,
                responsive: responsiveExample,
                fluid: fluidExample,
                offset: offsetExample,
            },
            control: {
                type: 'radio',
                labels: {
                    // 'labels' maps option values to string labels
                    default: 'Default',
                    responsive: 'responsive',
                    fluid: 'fluid',
                    offset: 'offset',
                },
            },
        },
    },
    render: ({children = defaultExample, ...args}) => <Grid {...args}>{children}</Grid>,
};

export const Width: Story = {
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    render: () => (
        <div style={{background: 'beige', width: '666px'}}>
            <Grid width={555}>
                <Row>
                    <Col xs={4}>
                        <Cell>With</Cell>
                    </Col>
                    <Col xs={4}>
                        <Cell>defined</Cell>
                    </Col>
                    <Col xs={4}>
                        <Cell>width: 555px.</Cell>
                    </Col>
                </Row>
            </Grid>
            <Grid width="fluid">
                <Row>
                    <Col xs={3}>
                        <Cell>Fluid:</Cell>
                    </Col>
                    <Col xs={3}>
                        <Cell>all</Cell>
                    </Col>
                    <Col xs={3}>
                        <Cell>parent</Cell>
                    </Col>
                    <Col xs={3}>
                        <Cell>width.</Cell>
                    </Col>
                </Row>
            </Grid>
        </div>
    ),
};

export const GridInsideGrid: Story = {
    name: 'Grid inside Grid',
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
        controls: {hideNoControlsWarning: true},
    },
    render: args => (
        <Grid {...args}>
            <Row>
                <Col xs={3}>
                    <Cell>Space 3</Cell>
                </Col>
                <Col xs={3}>
                    <Cell>Space 3</Cell>
                </Col>
                <Col xs={3}>
                    <Cell>Space 3</Cell>
                </Col>
                <Col xs={3}>
                    <Cell>Space 3</Cell>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <Cell>Space 6</Cell>
                </Col>
                <Col xs={6}>
                    <Grid>
                        <Row>
                            <Col xs={6}>
                                <Cell>Space 6 inner Grid</Cell>
                            </Col>
                            <Col xs={6}>
                                <Cell>Space 6 inner Grid</Cell>
                            </Col>
                        </Row>
                    </Grid>
                </Col>
            </Row>
        </Grid>
    ),
    args: {
        width: 'fluid',
        base: 12,
        gap: 16,
    },
};
