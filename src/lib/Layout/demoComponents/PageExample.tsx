import {Fragment} from 'react';

import {LongContent} from './../demoComponents/LongContent.tsx';
import {Grid} from './../Grid.tsx';
import {Row} from './../Row.tsx';
import {Col} from './../Col.tsx';
import {Cell} from './../demoComponents/Cell.tsx';
import {ContainerFill} from './../demoComponents/ContainerFill.tsx';
import {Content} from './../Content.tsx';
import {Footer} from './../Footer.tsx';
import {Header} from './../Header.tsx';
import {Main} from './../Main.tsx';
import {Sidebar} from './../Sidebar.tsx';
import {ElementFill} from './../demoComponents/ElementFill.tsx';

export const noChildren = <ContainerFill>This is container</ContainerFill>;

export const withLeftSidebar = (
    <Fragment>
        <Header>
            <ElementFill color="blue">Header</ElementFill>
        </Header>
        <Content>
            <Sidebar xs={3}>
                <ElementFill color="green">Sidebar: xs={3}</ElementFill>
            </Sidebar>
            <Main>
                <ElementFill color="violet">Main: xs=&quot;fluid&quot;</ElementFill>
            </Main>
        </Content>
        <Footer>
            <ElementFill color="brown">Footer</ElementFill>
        </Footer>
    </Fragment>
);

export const withRightSidebar = (
    <Fragment>
        <Header>
            <ElementFill color="blue">Header</ElementFill>
        </Header>
        <Content>
            <Main>
                <ElementFill color="violet">Main: xs=&quot;fluid&quot;</ElementFill>
            </Main>
            <Sidebar xs={3}>
                <ElementFill color="green">Sidebar: xs={3}</ElementFill>
            </Sidebar>
        </Content>
        <Footer>
            <ElementFill color="brown">Footer</ElementFill>
        </Footer>
    </Fragment>
);

export const withScroll = (
    <Fragment>
        <Header>
            <ElementFill color="blue">Header</ElementFill>
        </Header>
        <Content>
            <Sidebar xs={3}>
                <ElementFill color="green">Sidebar xs={3}</ElementFill>
            </Sidebar>
            <Main>
                <LongContent />
            </Main>
        </Content>
        <Footer>
            <ElementFill color="brown">Footer</ElementFill>
        </Footer>
    </Fragment>
);

export const withStickyHeader = (
    <Fragment>
        <Header sticky={true}>
            <ElementFill color="blue">Sticky Header</ElementFill>
        </Header>
        <Content>
            <Sidebar xs={3}>
                <ElementFill color="green">Sidebar xs={3}</ElementFill>
            </Sidebar>
            <Main>
                <LongContent />
            </Main>
        </Content>
        <Footer>
            <ElementFill color="brown">Footer</ElementFill>
        </Footer>
    </Fragment>
);

export const onlyFooter = (
    <Fragment>
        <Header>
            <ElementFill color="blue">Header</ElementFill>
        </Header>
        <Footer>
            <ElementFill color="brown">Footer</ElementFill>
        </Footer>
    </Fragment>
);

export const withGrid = (
    <Fragment>
        <Header>
            <Grid width="fluid">
                <Row>
                    <Col xs={3}>
                        <Cell>H</Cell>
                    </Col>
                    <Col xs={3}>
                        <Cell>E</Cell>
                    </Col>
                    <Col xs={3}>
                        <Cell>A</Cell>
                    </Col>
                    <Col xs={3}>
                        <Cell>D</Cell>
                    </Col>
                </Row>
            </Grid>
        </Header>
        <Content>
            <Sidebar xs={3}>
                <Grid width="fluid">
                    <Row>
                        <Col xs={6}>
                            <Cell>Side</Cell>
                        </Col>
                        <Col xs={6}>
                            <Cell>bar</Cell>
                        </Col>
                    </Row>
                </Grid>
            </Sidebar>
            <Main>
                <Grid width="fluid">
                    <Row>
                        <Col xs={4}>
                            <Cell>Fluid</Cell>
                        </Col>
                        <Col xs={4}>
                            <Cell>Main</Cell>
                        </Col>
                        <Col xs={4}>
                            <Cell>Container</Cell>
                        </Col>
                    </Row>
                </Grid>
            </Main>
        </Content>
        <Footer>
            <Grid width="fluid">
                <Row>
                    <Col xs={3}>
                        <Cell>FOO</Cell>
                    </Col>
                    <Col xs={3}>
                        <Cell>OOOOOO</Cell>
                    </Col>
                    <Col xs={3}>
                        <Cell>OOOOOO</Cell>
                    </Col>
                    <Col xs={3}>
                        <Cell>TER</Cell>
                    </Col>
                </Row>
            </Grid>
        </Footer>
    </Fragment>
);
