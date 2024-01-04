import type {Meta, StoryObj} from '@storybook/react';

import {Page} from './Page.tsx';
import {Header} from './Header.tsx';
import {Content} from './Content.tsx';
import {Footer} from './Footer.tsx';
import {Sidebar} from './Sidebar.tsx';
import {Main} from './Main.tsx';
import {ElementFill} from './demoComponents/ElementFill.tsx';
import {LongContent} from './demoComponents/LongContent.tsx';

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
    },
} as Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: args => {
        return (
            <Page {...args}>
                <Header>
                    <ElementFill color="blue">This is header</ElementFill>
                </Header>
                <Content>
                    <Sidebar>
                        <ElementFill color="green">This is sidebar</ElementFill>
                    </Sidebar>
                    <Main>
                        <ElementFill color="violet">This is main</ElementFill>
                    </Main>
                </Content>
                <Footer>
                    <ElementFill color="brown">This is footer</ElementFill>
                </Footer>
            </Page>
        );
    },
    args: {},
    argTypes: {},
};

export const WithScroll: Story = {
    render: args => {
        return (
            <Page {...args}>
                <Header>
                    <ElementFill color="blue">This is header</ElementFill>
                </Header>
                <Content>
                    <Sidebar>
                        <ElementFill color="green">This is sidebar</ElementFill>
                    </Sidebar>
                    <Main>
                        <LongContent />
                    </Main>
                </Content>
                <Footer>
                    <ElementFill color="brown">This is footer</ElementFill>
                </Footer>
            </Page>
        );
    },
    args: {},
    argTypes: {},
};
