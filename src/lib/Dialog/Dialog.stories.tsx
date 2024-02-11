import type {Meta, StoryObj} from '@storybook/react';
import {useCallback} from 'react';

// import {fn} from '@storybook/test';

import {Page} from '@/lib/Layout';
import {Button} from '@/lib/Button';
import {P, H3} from '@/lib/Text';

import {Dialog} from './Dialog.tsx';
import {DialogHeader} from './DialogHeader.tsx';
import {DialogBody} from './DialogBody.tsx';
import {DialogFooter} from './DialogFooter.tsx';
import {useDialogState} from './useDialogState.tsx';

const meta = {
    title: 'Components/Dialog',
    component: Dialog,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
    args: {
        closeOnClickOutside: true,
        showCloseButton: true,
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
        onToggle: {
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
    render: ({...args}) => {
        // const [isOpen, setOpen] = useState(open);
        const {closeDialog, openDialog} = useDialogState('foo');
        const handleOpen = useCallback(() => {
            openDialog();
        }, [openDialog]);

        const handleClose = useCallback(() => {
            closeDialog();
        }, [closeDialog]);

        return (
            <Page>
                <div style={{display: 'flex', gap: '12px'}}>
                    <Button onClick={handleOpen}>Open dialog</Button>
                </div>
                <Dialog {...args}>
                    <DialogHeader>
                        <H3>This is header of dialog!</H3>
                    </DialogHeader>
                    <DialogBody>
                        <P>
                            On the other hand, we denounce with righteous indignation and dislike men who are so
                            beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that
                            they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to
                            those who fail in their duty through weakness of will, which is the same as saying through
                            shrinking from toil and pain
                        </P>
                    </DialogBody>
                    <DialogFooter>
                        <Button onClick={handleClose}>Close dialog</Button>
                    </DialogFooter>
                </Dialog>
            </Page>
        );
    },
    args: {
        id: 'foo',
    },
};

export const LongText: Story = {
    render: ({...args}) => {
        // const [isOpen, setOpen] = useState(open);
        const {closeDialog, openDialog} = useDialogState('bazz');
        const handleOpen = useCallback(() => {
            openDialog();
        }, [openDialog]);

        const handleClose = useCallback(() => {
            closeDialog();
        }, [closeDialog]);

        return (
            <Page>
                <div style={{display: 'flex', gap: '12px'}}>
                    <Button onClick={handleOpen}>Open dialog</Button>
                </div>
                <Dialog {...args}>
                    <DialogHeader>
                        <H3>This is header of dialog!</H3>
                    </DialogHeader>
                    <DialogBody>
                        <P>
                            On the other hand, we denounce with righteous indignation and dislike men who are so
                            beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that
                            they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to
                            those who fail in their duty through weakness of will, which is the same as saying through
                            shrinking from toil and pain
                        </P>
                        <P>
                            On the other hand, we denounce with righteous indignation and dislike men who are so
                            beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that
                            they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to
                            those who fail in their duty through weakness of will, which is the same as saying through
                            shrinking from toil and pain
                        </P>
                        <P>
                            On the other hand, we denounce with righteous indignation and dislike men who are so
                            beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that
                            they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to
                            those who fail in their duty through weakness of will, which is the same as saying through
                            shrinking from toil and pain
                        </P>
                        <P>
                            On the other hand, we denounce with righteous indignation and dislike men who are so
                            beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that
                            they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to
                            those who fail in their duty through weakness of will, which is the same as saying through
                            shrinking from toil and pain
                        </P>
                        <P>
                            On the other hand, we denounce with righteous indignation and dislike men who are so
                            beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that
                            they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to
                            those who fail in their duty through weakness of will, which is the same as saying through
                            shrinking from toil and pain
                        </P>
                    </DialogBody>
                    <DialogFooter>
                        <Button onClick={handleClose}>Close dialog</Button>
                    </DialogFooter>
                </Dialog>
            </Page>
        );
    },
    args: {
        id: 'bazz',
    },
};

export const DialogInDialog: Story = {
    name: 'Dialog in dialog',
    render: () => {
        // const [isOpen, setOpen] = useState(open);
        const {closeDialog: closeFirst, openDialog: openFirst} = useDialogState('baz');
        const {closeDialog: closeSecond, openDialog: openSecond} = useDialogState('qux');
        const handleOpenFirst = useCallback(() => {
            openFirst();
        }, [openFirst]);

        const handleCloseFirst = useCallback(() => {
            closeFirst();
        }, [closeFirst]);

        const handleOpenSecond = useCallback(() => {
            openSecond();
        }, [openSecond]);

        const handleCloseSecond = useCallback(() => {
            closeSecond();
        }, [closeSecond]);

        return (
            <Page width={666}>
                <div style={{display: 'flex', gap: '12px'}}>
                    <Button onClick={handleOpenFirst}>Open first</Button>
                    <Button onClick={handleOpenSecond}>Open second</Button>
                </div>
                <Dialog id="baz">
                    <DialogBody>
                        <P>This is 1st level Dialog.</P>
                    </DialogBody>
                    <DialogFooter>
                        <Button size="small" variant="alternative" onClick={handleCloseFirst}>
                            Close first
                        </Button>
                        <Button size="small" onClick={handleOpenSecond}>
                            Open second
                        </Button>
                    </DialogFooter>
                </Dialog>
                <Dialog id="qux">
                    <DialogBody>
                        <P>This is 2nd level Dialog.</P>
                    </DialogBody>
                    <DialogFooter>
                        <Button size="small" variant="alternative" onClick={handleCloseSecond}>
                            Close second
                        </Button>
                    </DialogFooter>
                </Dialog>
            </Page>
        );
    },
};
