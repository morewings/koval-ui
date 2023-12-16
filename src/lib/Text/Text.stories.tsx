import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';

import {Text} from './Text.tsx';

const meta = {
    title: 'Typography/Text',
    component: Text,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    args: {
        onClick: fn(),
    },
    argTypes: {
        className: {
            table: {
                disable: true,
            },
        },
    },
} as Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: args => {
        return (
            <div style={{width: '666px'}}>
                <Text {...args}>
                    <h1>Header 1</h1>
                    <h2>Header 2</h2>
                    <h3>Header 3</h3>
                    <h4>Header 4</h4>
                    <h5>Header 5</h5>
                    <h6>Header 6</h6>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. This text is{' '}
                        <a href="#">long url example</a>. Lorem Ipsum has been the industry&apos;s standard dummy text
                        ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
                        type specimen book.
                    </p>
                    <p>
                        It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
                        sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                    <p>
                        This text is <a href="#">url</a>
                        <br />
                        <b>This text is bold</b>
                        <br />
                        <strong>This text is strong</strong>
                        <br />
                        <i>This text is italic</i>
                        <br />
                        <em>This text is emphasized</em>
                        <br />
                        <mark>This text is marked</mark>
                        <br />
                        <small>This text is smaller</small>
                        <br />
                        <del>This text is deleted</del>
                        <br />
                        <ins>This text is inserted</ins>
                        <br />
                        This is <sub>subscript</sub> and <sup>superscript</sup>
                        <br />
                        This is <kbd>Shift</kbd> and <kbd>Ctrl</kbd>
                        <br />
                    </p>
                    <ul>
                        <li>Unordered item 1</li>
                        <li>Unordered item 2</li>
                        <li>Unordered item 3</li>
                    </ul>
                    <ol>
                        <li>Ordered item 1</li>
                        <li>Ordered item 2</li>
                        <li>Ordered item 3</li>
                    </ol>
                    <blockquote>
                        Words can be like X-rays, if you use them properly—they’ll go through anything. You read and
                        you’re pierced.
                        <cite>George Clooney</cite>
                    </blockquote>
                    <dl>
                        <dt>Beast of Bodmin</dt>
                        <dd>A large feline inhabiting Bodmin Moor.</dd>

                        <dt>Morgawr</dt>
                        <dd>A sea serpent.</dd>

                        <dt>Owlman</dt>
                        <dd>A giant owl-like creature.</dd>
                    </dl>
                </Text>
            </div>
        );
    },
    args: {},
};
