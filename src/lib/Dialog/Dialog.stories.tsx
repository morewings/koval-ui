import type {Meta, StoryObj} from '@storybook/react';
import {useState, useCallback, useRef, useEffect} from 'react';
// import {fn} from '@storybook/test';

import {Page} from '@/lib/Layout';
import {Button} from '@/lib/Button';
import {P} from '@/lib/Text';

import {Dialog} from './Dialog.tsx';

const meta = {
    title: 'Components/Dialog',
    component: Dialog,
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
    },
} as Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: ({open, ...args}) => {
        const [isOpen, setOpen] = useState(open);
        const openDialog = useCallback(() => {
            setOpen(true);
        }, [setOpen]);

        const closeDialog = useCallback(() => {
            setOpen(false);
        }, [setOpen]);
        return (
            <Page>
                <Button onClick={openDialog}>Open dialog</Button>
                <Dialog {...args} open={isOpen}>
                    <P>this is Dialog</P>
                    <Button onClick={closeDialog}>Close dialog</Button>
                </Dialog>
            </Page>
        );
    },
    args: {
        open: true,
    },
};

export const RefExample: Story = {
    render: ({open, ...args}) => {
        const dialogRef = useRef<HTMLDialogElement>(null);

        useEffect(() => {}, [open]);

        const openDialog = useCallback(() => {
            dialogRef.current?.showModal();
        }, []);

        const closeDialog = useCallback(() => {
            dialogRef.current?.close();
        }, []);

        useEffect(() => {
            if (open) {
                openDialog();
            } else {
                closeDialog();
            }
        }, [closeDialog, open, openDialog]);

        return (
            <Page>
                <Button onClick={openDialog}>Open dialog</Button>
                <Dialog {...args} ref={dialogRef}>
                    <P>this is Dialog</P>
                    <Button onClick={closeDialog}>Close dialog</Button>
                </Dialog>
            </Page>
        );
    },
    args: {
        open: true,
    },
};

export const WithCode: Story = {
    render: args => {
        // here comes the code
        return (
            <Page>
                <Dialog {...args}>this is Dialog</Dialog>
            </Page>
        );
    },
};

WithCode.args = {
    id: 'foo',
};

WithCode.argTypes = {};

WithCode.parameters = {
    docs: {
        source: {
            language: 'tsx',
            type: 'code',
        },
    },
};
