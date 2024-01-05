import type {Meta, StoryObj} from '@storybook/react';
import {Fragment} from 'react';

import {Page} from './Page.tsx';
import {Header} from './Header.tsx';
import {Content} from './Content.tsx';
import {Footer} from './Footer.tsx';
import {Sidebar} from './Sidebar.tsx';
import {Main} from './Main.tsx';
import {ElementFill} from './demoComponents/ElementFill.tsx';
import {LongContent} from './demoComponents/LongContent.tsx';
import {ContainerFill} from './demoComponents/ContainerFill.tsx';

const meta = {
    title: 'Layout/Page',
    component: Page,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
        docs: {iframeHeight: 600},
    },
    args: {},
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
        children: {
            options: ['noChildren', 'withChildren', 'withScroll', 'withStickyHeader', 'onlyFooter'],
            mapping: {
                noChildren: <ContainerFill>This is container</ContainerFill>,
                withChildren: (
                    <Fragment>
                        <Header>
                            <ElementFill color="blue">Header</ElementFill>
                        </Header>
                        <Content>
                            <Sidebar>
                                <ElementFill color="green">Sidebar</ElementFill>
                            </Sidebar>
                            <Main>
                                <ElementFill color="violet">Main</ElementFill>
                            </Main>
                        </Content>
                        <Footer>
                            <ElementFill color="brown">Footer</ElementFill>
                        </Footer>
                    </Fragment>
                ),
                withScroll: (
                    <Fragment>
                        <Header>
                            <ElementFill color="blue">Header</ElementFill>
                        </Header>
                        <Content>
                            <Sidebar>
                                <ElementFill color="green">Sidebar</ElementFill>
                            </Sidebar>
                            <Main>
                                <LongContent />
                            </Main>
                        </Content>
                        <Footer>
                            <ElementFill color="brown">Footer</ElementFill>
                        </Footer>
                    </Fragment>
                ),
                withStickyHeader: (
                    <Fragment>
                        <Header sticky={true}>
                            <ElementFill color="blue">Sticky Header</ElementFill>
                        </Header>
                        <Content>
                            <Sidebar>
                                <ElementFill color="green">Sidebar</ElementFill>
                            </Sidebar>
                            <Main>
                                <LongContent />
                            </Main>
                        </Content>
                        <Footer>
                            <ElementFill color="brown">Footer</ElementFill>
                        </Footer>
                    </Fragment>
                ),
                onlyFooter: (
                    <Fragment>
                        <Header>
                            <ElementFill color="blue">Header</ElementFill>
                        </Header>
                        <Footer>
                            <ElementFill color="brown">Footer</ElementFill>
                        </Footer>
                    </Fragment>
                ),
            },
            control: {
                type: 'radio',
                labels: {
                    noChildren: 'No content',
                    withChildren: 'With content',
                    withScroll: 'With scroll',
                    withStickyHeader: 'With sticky Header',
                    onlyFooter: 'Without Content, just Footer',
                },
            },
        },
    },
} as Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: args => {
        return <Page {...args} />;
    },
    args: {
        children: <ContainerFill>This is container</ContainerFill>,
    },
    argTypes: {},
};
