import type {Meta, StoryObj} from '@storybook/react';
import {Fragment} from 'react';

import {Container} from './Container';
import {Row} from './Row';
import {Col} from './Col';
import {Cell} from './Cell';

const meta = {
    title: 'Layout/Container',
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
                        <Cell>span: 1</Cell>
                    </Col>
                    <Col xs={1}>
                        <Cell>span: 1</Cell>
                    </Col>
                    <Col xs={1}>
                        <Cell>span: 1</Cell>
                    </Col>
                    <Col xs={1}>
                        <Cell>span: 1</Cell>
                    </Col>
                    <Col xs={1}>
                        <Cell>span: 1</Cell>
                    </Col>
                    <Col xs={1}>
                        <Cell>span: 1</Cell>
                    </Col>
                    <Col xs={1}>
                        <Cell>span: 1</Cell>
                    </Col>
                    <Col xs={1}>
                        <Cell>span: 1</Cell>
                    </Col>
                    <Col xs={1}>
                        <Cell>span: 1</Cell>
                    </Col>
                    <Col xs={1}>
                        <Cell>span: 1</Cell>
                    </Col>
                    <Col xs={1}>
                        <Cell>span: 1</Cell>
                    </Col>
                    <Col xs={1}>
                        <Cell>span: 1</Cell>
                    </Col>
                </Row>
                <Row>
                    <Col xs={2}>
                        <Cell>span: 2</Cell>
                    </Col>
                    <Col xs={2}>
                        <Cell>span: 2</Cell>
                    </Col>
                    <Col xs={2}>
                        <Cell>span: 2</Cell>
                    </Col>
                    <Col xs={2}>
                        <Cell>span: 2</Cell>
                    </Col>
                    <Col xs={2}>
                        <Cell>span: 2</Cell>
                    </Col>
                    <Col xs={2}>
                        <Cell>span: 2</Cell>
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>
                        <Cell>span: 3</Cell>
                    </Col>
                    <Col xs={3}>
                        <Cell>span: 3</Cell>
                    </Col>
                    <Col xs={3}>
                        <Cell>span: 3</Cell>
                    </Col>
                    <Col xs={3}>
                        <Cell>span: 3</Cell>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4}>
                        <Cell>span: 4</Cell>
                    </Col>
                    <Col xs={4}>
                        <Cell>span: 4</Cell>
                    </Col>
                    <Col xs={4}>
                        <Cell>span: 4</Cell>
                    </Col>
                </Row>
                <Row>
                    <Col xs={5}>
                        <Cell>span: 5</Cell>
                    </Col>
                    <Col xs={5}>
                        <Cell>span: 5</Cell>
                    </Col>
                    <Col xs={2}>
                        <Cell>span: 2</Cell>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <Cell>span: 6</Cell>
                    </Col>
                    <Col xs={6}>
                        <Cell>span: 6</Cell>
                    </Col>
                </Row>
                <Row>
                    <Col xs={7}>
                        <Cell>span: 7</Cell>
                    </Col>
                    <Col xs={5}>
                        <Cell>span: 5</Cell>
                    </Col>
                </Row>
                <Row>
                    <Col xs={8}>
                        <Cell>span: 8</Cell>
                    </Col>
                    <Col xs={4}>
                        <Cell>span: 4</Cell>
                    </Col>
                </Row>
                <Row>
                    <Col xs={9}>
                        <Cell>span: 9</Cell>
                    </Col>
                    <Col xs={3}>
                        <Cell>span: 3</Cell>
                    </Col>
                </Row>
                <Row>
                    <Col xs={10}>
                        <Cell>span: 10</Cell>
                    </Col>
                    <Col xs={2}>
                        <Cell>span: 2</Cell>
                    </Col>
                </Row>
                <Row>
                    <Col xs={11}>
                        <Cell>span: 11</Cell>
                    </Col>
                    <Col xs={1}>
                        <Cell>span: 1</Cell>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Cell>span: 12</Cell>
                    </Col>
                </Row>
            </Fragment>
        ),
    },
};

export const ContainerWidth: Story = {
    args: {
        children: (
            <Container containerWidth={888}>
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

export const ContainerFluid: Story = {
    args: {
        children: (
            <div style={{background: 'lightgreen', width: '666px'}}>
                <Container containerWidth={333}>
                    <Row>
                        <Col xs={4}>
                            <Cell>Takes</Cell>
                        </Col>
                        <Col xs={4}>
                            <Cell>exact</Cell>
                        </Col>
                        <Col xs={4}>
                            <Cell>width.</Cell>
                        </Col>
                    </Row>
                </Container>
                <Container containerWidth="fluid">
                    <Row>
                        <Col xs={3}>
                            <Cell>Takes</Cell>
                        </Col>
                        <Col xs={3}>
                            <Cell>all</Cell>
                        </Col>
                        <Col xs={3}>
                            <Cell>available</Cell>
                        </Col>
                        <Col xs={3}>
                            <Cell>space.</Cell>
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
                <Container containerWidth={666}>
                    <Row>
                        <Col xs={2}>
                            <Cell>span: 2</Cell>
                        </Col>
                        <Col xs={2}>
                            <Cell>span: 2</Cell>
                        </Col>
                        <Col xs={2}>
                            <Cell>span: 2</Cell>
                        </Col>
                        <Col xs={2}>
                            <Cell>span: 2</Cell>
                        </Col>
                        <Col xs={2}>
                            <Cell>span: 2</Cell>
                        </Col>
                        <Col xs={2}>
                            <Cell>span: 2</Cell>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={6}>
                            <Cell>
                                <div>xs: 12</div>
                                <div>md: 6</div>
                            </Cell>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={8} xl={2}>
                            <Cell>
                                <div>sm: 8</div>
                                <div>xl: 2</div>
                            </Cell>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3} lg={10}>
                            <Cell>
                                <div>md: 4</div>
                                <div>lg: 10</div>
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
            <Container containerWidth={666}>
                <Row>
                    <Col xs={3}>
                        <Cell>span: 3</Cell>
                    </Col>
                    <Col xs={3}>
                        <Cell>span: 3</Cell>
                    </Col>
                    <Col xs={3}>
                        <Cell>span: 3</Cell>
                    </Col>
                    <Col xs={3}>
                        <Cell>span: 3</Cell>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} offsetXS={3}>
                        <Cell>
                            <div>xs: 6</div>
                            <div>offset-xs: 3</div>
                        </Cell>
                    </Col>
                </Row>
            </Container>
        ),
    },
};
