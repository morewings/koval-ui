import type {Meta, StoryObj} from '@storybook/react';
import {Fragment} from 'react';
// import {fn} from '@storybook/test';

import {Table} from './Table.tsx';

const meta = {
    title: 'Typography/Table',
    component: Table,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    args: {},
    argTypes: {
        className: {
            table: {
                disable: true,
            },
        },
    },
} as Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const tableDemo = (
    <Fragment>
        <caption>He-Man and Skeletor facts</caption>
        <thead>
            <tr>
                <th>Header content 1</th>
                <th>Header content 2</th>
                <th>Header content 3</th>
                <th>Header content 4</th>
                <th>Header content 5</th>
                <th>Header content 6</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Body content 1</td>
                <td>
                    It has survived not only five centuries, but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
                    containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
                    PageMaker including versions of Lorem Ipsum.
                </td>
                <td>Body content 3</td>
                <td>Body content 4</td>
                <td>Body content 5</td>
                <td>Body content 6</td>
            </tr>
            <tr>
                <td>Body content 1</td>
                <td>Body content 2</td>
                <td>Body content 3</td>
                <td>Body content 4</td>
                <td>Body content 5</td>
                <td>Body content 6</td>
            </tr>
            <tr>
                <td>Body content 1</td>
                <td>Body content 2</td>
                <td>Body content 3</td>
                <td>Body content 4</td>
                <td>Body content 5</td>
                <td>Body content 6</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td>Footer content 1</td>
                <td>Footer content 2</td>
                <td>Footer content 3</td>
                <td>Footer content 4</td>
                <td>Footer content 5</td>
                <td>Footer content 6</td>
            </tr>
        </tfoot>
    </Fragment>
);

export const Primary: Story = {
    render: args => {
        return <Table {...args}>{tableDemo}</Table>;
    },
    args: {},
};

export const Responsive: Story = {
    render: args => {
        return (
            <div style={{width: '666px'}}>
                <Table {...args}>{tableDemo}</Table>
            </div>
        );
    },
    args: {},
};
