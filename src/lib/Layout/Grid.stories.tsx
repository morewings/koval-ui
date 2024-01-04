import type {Meta, StoryObj} from '@storybook/react';
import {Fragment} from 'react';

import {Container} from './Container';
import {Row} from './Row';
import {Col} from './Col';
import {Cell} from './demoComponents/Cell';

const meta = {
    title: 'Layout/Grid',
    component: Container,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
} as Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ContainerExample: Story = {
    args: {
        children: (
            <Fragment>
                <Row>
                    <Col xs={1}>
                        <Cell>space: 1</Cell>
                    </Col>
                    <Col xs={1}>
                        <Cell>space: 1</Cell>
                    </Col>
                    <Col xs={1}>
                        <Cell>space: 1</Cell>
                    </Col>
                    <Col xs={1}>
                        <Cell>space: 1</Cell>
                    </Col>
                    <Col xs={1}>
                        <Cell>space: 1</Cell>
                    </Col>
                    <Col xs={1}>
                        <Cell>space: 1</Cell>
                    </Col>
                    <Col xs={1}>
                        <Cell>space: 1</Cell>
                    </Col>
                    <Col xs={1}>
                        <Cell>space: 1</Cell>
                    </Col>
                    <Col xs={1}>
                        <Cell>space: 1</Cell>
                    </Col>
                    <Col xs={1}>
                        <Cell>space: 1</Cell>
                    </Col>
                    <Col xs={1}>
                        <Cell>space: 1</Cell>
                    </Col>
                    <Col xs={1}>
                        <Cell>space: 1</Cell>
                    </Col>
                </Row>
                <Row>
                    <Col xs={2}>
                        <Cell>space: 2</Cell>
                    </Col>
                    <Col xs={2}>
                        <Cell>space: 2</Cell>
                    </Col>
                    <Col xs={2}>
                        <Cell>space: 2</Cell>
                    </Col>
                    <Col xs={2}>
                        <Cell>space: 2</Cell>
                    </Col>
                    <Col xs={2}>
                        <Cell>space: 2</Cell>
                    </Col>
                    <Col xs={2}>
                        <Cell>space: 2</Cell>
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>
                        <Cell>space: 3</Cell>
                    </Col>
                    <Col xs={3}>
                        <Cell>space: 3</Cell>
                    </Col>
                    <Col xs={3}>
                        <Cell>space: 3</Cell>
                    </Col>
                    <Col xs={3}>
                        <Cell>space: 3</Cell>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4}>
                        <Cell>space: 4</Cell>
                    </Col>
                    <Col xs={4}>
                        <Cell>space: 4</Cell>
                    </Col>
                    <Col xs={4}>
                        <Cell>space: 4</Cell>
                    </Col>
                </Row>
                <Row>
                    <Col xs={5}>
                        <Cell>space: 5</Cell>
                    </Col>
                    <Col xs={5}>
                        <Cell>space: 5</Cell>
                    </Col>
                    <Col xs={2}>
                        <Cell>space: 2</Cell>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <Cell>space: 6</Cell>
                    </Col>
                    <Col xs={6}>
                        <Cell>space: 6</Cell>
                    </Col>
                </Row>
                <Row>
                    <Col xs={7}>
                        <Cell>space: 7</Cell>
                    </Col>
                    <Col xs={5}>
                        <Cell>space: 5</Cell>
                    </Col>
                </Row>
                <Row>
                    <Col xs={8}>
                        <Cell>space: 8</Cell>
                    </Col>
                    <Col xs={4}>
                        <Cell>space: 4</Cell>
                    </Col>
                </Row>
                <Row>
                    <Col xs={9}>
                        <Cell>space: 9</Cell>
                    </Col>
                    <Col xs={3}>
                        <Cell>space: 3</Cell>
                    </Col>
                </Row>
                <Row>
                    <Col xs={10}>
                        <Cell>space: 10</Cell>
                    </Col>
                    <Col xs={2}>
                        <Cell>space: 2</Cell>
                    </Col>
                </Row>
                <Row>
                    <Col xs={11}>
                        <Cell>space: 11</Cell>
                    </Col>
                    <Col xs={1}>
                        <Cell>space: 1</Cell>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Cell>space: 12</Cell>
                    </Col>
                </Row>
            </Fragment>
        ),
    },
};

export const ContainerFluid: Story = {
    args: {
        children: (
            <Container width={888}>
                <Row>
                    <Col xs={3}>
                        <Cell>Takes 3 columns.</Cell>
                    </Col>
                    <Col xs="fluid">
                        <Cell>Takes the rest of the width.</Cell>
                    </Col>
                </Row>
                <Row>
                    <Col xs="fluid">
                        <Cell>Takes the rest of the width.</Cell>
                    </Col>
                    <Col xs={6}>
                        <Cell>Takes 6 columns.</Cell>
                    </Col>
                </Row>
            </Container>
        ),
    },
};

export const ContainerWidth: Story = {
    args: {
        children: (
            <div style={{background: 'beige', width: '666px'}}>
                <Container width={555}>
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
                </Container>
                <Container width="fluid">
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
                </Container>
            </div>
        ),
    },
};

export const ContainerResponsive: Story = {
    args: {
        children: (
            <Fragment>
                <Container width={666}>
                    <Row>
                        <Col xs={2}>
                            <Cell>space: 2</Cell>
                        </Col>
                        <Col xs={2}>
                            <Cell>space: 2</Cell>
                        </Col>
                        <Col xs={2}>
                            <Cell>space: 2</Cell>
                        </Col>
                        <Col xs={2}>
                            <Cell>space: 2</Cell>
                        </Col>
                        <Col xs={2}>
                            <Cell>space: 2</Cell>
                        </Col>
                        <Col xs={2}>
                            <Cell>space: 2</Cell>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} lg={6}>
                            <Cell>
                                <div>xs: 12</div>
                                <div>lg: 6</div>
                            </Cell>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={8} xl={3}>
                            <Cell>
                                <div>sm: 8</div>
                                <div>xl: 3</div>
                            </Cell>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} lg={10}>
                            <Cell>
                                <div>md: 6</div>
                                <div>lg: 8</div>
                            </Cell>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Cell>xs:12</Cell>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        ),
    },
};

export const ContainerOffset: Story = {
    args: {
        children: (
            <Container width={666}>
                <Row>
                    <Col xs={2}>
                        <Cell>space: 2</Cell>
                    </Col>
                    <Col xs={2}>
                        <Cell>space: 2</Cell>
                    </Col>
                    <Col xs={2}>
                        <Cell>space: 2</Cell>
                    </Col>
                    <Col xs={2}>
                        <Cell>space: 2</Cell>
                    </Col>
                    <Col xs={2}>
                        <Cell>space: 2</Cell>
                    </Col>
                    <Col xs={2}>
                        <Cell>space: 2</Cell>
                    </Col>
                </Row>
                <Row>
                    <Col xs={8} shiftXS={2}>
                        <Cell>
                            <div>xs: 8</div>
                            <div>shift-xs: 2</div>
                        </Cell>
                    </Col>
                </Row>
            </Container>
        ),
    },
};
