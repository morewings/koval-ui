import type {Meta, StoryObj} from '@storybook/react';
import {Fragment, useCallback, useMemo} from 'react';
import {fn} from '@storybook/test';

import {Page} from '@/lib/Layout';
import {Button} from '@/lib/Button';
import {ButtonGroup} from '@/lib/ButtonGroup';
import {P} from '@/lib/Text';
import {CloudUpload, IconFile} from '@/internal/Icons';

import {Dialog} from './Dialog.tsx';
import {useDialogState} from './useDialogState.tsx';
import type {Props as ActionProps} from './Action.tsx';

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
        closeLabel: 'Close',
        trapFocus: true,
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

const actions = [
    {title: 'Default Action', onClick: fn()},
    {title: 'With Icon', icon: IconFile, onClick: fn()},
    {title: 'Link Action', type: 'link', onClick: fn()},
    {title: 'Overridden icon', type: 'link', icon: CloudUpload, onClick: fn()},
    [
        {title: 'Danger Action', type: 'danger', onClick: fn()},
        {title: 'Success Action', type: 'success', onClick: fn()},
    ],
];

const actionsTwo = [
    [
        {title: 'Danger Action', type: 'danger', onClick: fn()},
        {title: 'Success Action', type: 'success', onClick: fn()},
    ],
];

export const Primary: Story = {
    render: ({...args}) => {
        const {openDialog} = useDialogState('foo');
        const handleOpen = useCallback(() => {
            openDialog();
        }, [openDialog]);

        return (
            <Page>
                <div style={{display: 'flex', gap: '12px'}}>
                    <Button onClick={handleOpen}>Open dialog</Button>
                </div>
                <Dialog {...args}>
                    <P>
                        On the other hand, we denounce with righteous indignation and dislike men who are so beguiled
                        and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot
                        foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail
                        in their duty through weakness of will, which is the same as saying through shrinking from toil
                        and pain
                    </P>
                </Dialog>
            </Page>
        );
    },
    args: {
        id: 'foo',
        dialogTitle: 'This is the title of dialog!',
    },
    argTypes: {
        actions: {
            options: ['noActions', 'with2Actions', 'withAllActions'], // An array of serializable values
            mapping: {
                noActions: undefined,
                with2Actions: actionsTwo,
                withAllActions: actions,
            }, // Maps serializable option values to complex arg values
            control: {
                type: 'radio', // Type 'select' is automatically inferred when 'options' is defined
                labels: {
                    // 'labels' maps option values to string labels
                    noActions: 'No actions',
                    with2Actions: '2 actions',
                    withAllActions: 'With all actions',
                },
            },
        },
    },
};

export const LongText: Story = {
    render: ({...args}) => {
        // const [isOpen, setOpen] = useState(open);
        const {openDialog} = useDialogState('bazz');
        const handleOpen = useCallback(() => {
            openDialog();
        }, [openDialog]);

        return (
            <Page>
                <div style={{display: 'flex', gap: '12px'}}>
                    <Button onClick={handleOpen}>Open dialog</Button>
                </div>
                <Dialog {...args}>
                    <P>
                        On the other hand, we denounce with righteous indignation and dislike men who are so beguiled
                        and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot
                        foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail
                        in their duty through weakness of will, which is the same as saying through shrinking from toil
                        and pain
                    </P>
                    <P>
                        On the other hand, we denounce with righteous indignation and dislike men who are so beguiled
                        and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot
                        foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail
                        in their duty through weakness of will, which is the same as saying through shrinking from toil
                        and pain
                    </P>
                    <P>
                        On the other hand, we denounce with righteous indignation and dislike men who are so beguiled
                        and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot
                        foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail
                        in their duty through weakness of will, which is the same as saying through shrinking from toil
                        and pain
                    </P>
                    <P>
                        On the other hand, we denounce with righteous indignation and dislike men who are so beguiled
                        and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot
                        foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail
                        in their duty through weakness of will, which is the same as saying through shrinking from toil
                        and pain
                    </P>
                    <P>
                        On the other hand, we denounce with righteous indignation and dislike men who are so beguiled
                        and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot
                        foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail
                        in their duty through weakness of will, which is the same as saying through shrinking from toil
                        and pain
                    </P>
                </Dialog>
            </Page>
        );
    },
    args: {
        id: 'bazz',
        dialogTitle: 'This is the title of dialog!',
    },
};

export const DialogInDialog: Story = {
    name: 'Dialog in dialog',
    render: () => {
        const {closeDialog: closeFirst, openDialog: openFirst} = useDialogState('baz');
        const {closeDialog: closeSecond, openDialog: openSecond} = useDialogState('qux');

        const actionsFirst = useMemo<[ActionProps, ActionProps][]>(
            () => [
                [
                    {title: 'Close First', type: 'danger', onClick: closeFirst},
                    {title: 'Open Second', type: 'success', onClick: openSecond},
                ],
            ],
            [closeFirst, openSecond]
        );

        const actionsSecond = useMemo<ActionProps[]>(
            () => [{title: 'Close Second', type: 'danger', onClick: closeSecond}],
            [closeSecond]
        );

        return (
            <Fragment>
                <ButtonGroup>
                    <Button onClick={openFirst}>Open first</Button>
                    <Button onClick={openSecond}>Open second</Button>
                </ButtonGroup>
                <Dialog id="baz" actions={actionsFirst} showCloseButton={false}>
                    <P>This is 1st level Dialog.</P>
                </Dialog>
                <Dialog id="qux" actions={actionsSecond} showCloseButton={false}>
                    <P>This is 2nd level Dialog.</P>
                </Dialog>
            </Fragment>
        );
    },
};
