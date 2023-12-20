import type {Meta, StoryObj} from '@storybook/react';

import {Picture} from '@/lib/Picture';
import {Text, Table} from '@/lib/Text';

import {Figure} from './Figure.tsx';

const TableElement = (
    <Table>
        <thead>
            <tr>
                <th>Header content 1</th>
                <th>Header content 2</th>
                <th>Header content 3</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Body content 1</td>
                <td>Body content 2</td>
                <td>Body content 3</td>
            </tr>
            <tr>
                <td>Body content 1</td>
                <td>Body content 2</td>
                <td>Body content 3</td>
            </tr>
            <tr>
                <td>Body content 1</td>
                <td>Body content 2</td>
                <td>Body content 3</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td>Footer content 1</td>
                <td>Footer content 2</td>
                <td>Footer content 3</td>
            </tr>
        </tfoot>
    </Table>
);

const PictureComponent = <Picture width={666} height={332} src="https://picsum.photos/666/333" />;

const meta = {
    title: 'Components/Figure',
    component: Figure,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    args: {
        caption: 'This is caption!',
        position: 'center',
        children: PictureComponent,
    },
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
        children: {
            options: ['picture', 'table'], // An array of serializable values
            mapping: {
                picture: PictureComponent,
                table: TableElement,
            }, // Maps serializable option values to complex arg values
            control: {
                type: 'radio', // Type 'select' is automatically inferred when 'options' is defined
                labels: {
                    // 'labels' maps option values to string labels
                    picture: 'With Picture component',
                    table: 'With Table component',
                },
            },
        },
    },
} as Meta<typeof Figure>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: ({children, ...args}) => {
        return <Figure {...args}>{children}</Figure>;
    },
    args: {},
};

export const WrappedWithText: Story = {
    render: ({children, ...args}) => {
        return (
            <Text>
                <p>
                    It has survived not only five centuries, but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
                    containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
                    PageMaker including versions of Lorem Ipsum.
                </p>
                <Figure {...args}>{children}</Figure>
                <p>
                    It has survived not only five centuries, but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
                    containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
                    PageMaker including versions of Lorem Ipsum.
                </p>
            </Text>
        );
    },
    args: {},
};
