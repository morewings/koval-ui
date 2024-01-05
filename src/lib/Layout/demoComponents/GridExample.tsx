import {Fragment} from 'react';

import {Row} from './../Row.tsx';
import {Col} from './../Col.tsx';
import {Cell} from './../demoComponents/Cell';

export const defaultExample = (
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
);

export const responsiveExample = (
    <Fragment>
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
    </Fragment>
);

export const fluidExample = (
    <Fragment>
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
    </Fragment>
);

export const offsetExample = (
    <Fragment>
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
    </Fragment>
);
