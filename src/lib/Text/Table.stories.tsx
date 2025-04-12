import type {Meta, StoryObj} from '@storybook/react';
import {Fragment} from 'react';
// import {fn} from '@storybook/test';

import {Table} from './Table.tsx';

const meta = {
    title: 'Typography/Table',
    component: Table,
    parameters: {
        layout: 'centered',
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
        wrapperRef: {
            table: {
                disable: true,
            },
        },
        wrapperClassName: {
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
                    Sip on locally brewed kombucha as you wander through stalls adorned with
                    bohemian tapestries and indie art. The air is filled with the aroma of freshly
                    ground coffee and the sound of live acoustic sets. It’s not just a market; it’s
                    a community where free spirits gather to celebrate individuality and style.
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
                <th>Footer content 1</th>
                <th>Footer content 2</th>
                <th>Footer content 3</th>
                <th>Footer content 4</th>
                <th>Footer content 5</th>
                <th>Footer content 6</th>
            </tr>
        </tfoot>
    </Fragment>
);

export const Primary: Story = {
    name: 'Basic',
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
