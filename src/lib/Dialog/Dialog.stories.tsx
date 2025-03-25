import type {Meta, StoryObj} from '@storybook/react';
import {type ComponentProps, Fragment, useCallback, useMemo} from 'react';
import {fn} from '@storybook/test';

import {Page} from '@/lib/Layout';
import {Button} from '@/lib/Button';
import {ButtonGroup} from '@/lib/ButtonGroup';
import {P} from '@/lib/Text';
import {CloudUpload, IconFile} from '@/internal/Icons';
import type {ActionButton} from '@/internal/Actions';

import {Dialog} from './Dialog.tsx';
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
        closeLabel: 'Close',
        trapFocus: true,
        animation: 'slide-top',
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

// TODO: why args don't work here?
// Dude, this sounds scary.
// Dima from the future.

export const Primary: Story = {
    name: 'Basic dialog',
    render: args => {
        const {openDialog} = useDialogState('foo');
        const handleOpen = useCallback(() => {
            openDialog();
        }, [openDialog]);

        return (
            <Page>
                <div style={{display: 'flex', gap: '12px'}}>
                    <Button onClick={handleOpen}>Open dialog</Button>
                </div>
                <Dialog {...args} id="foo" dialogTitle="This is the title of dialog!">
                    <P>
                        In the heart of Podil, street art tells stories of the past and present.
                        Murals adorn the walls, each one a masterpiece that captures the essence of
                        this eclectic district. Vinyl records spin in cozy cafes, where baristas
                        craft lattes with intricate foam art. It’s a place where creativity flows as
                        freely as the Dnipro River.
                    </P>
                </Dialog>
            </Page>
        );
    },
    args: {},
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
    name: 'With long text',
    render: args => {
        const {openDialog} = useDialogState('bazz');
        const handleClick = useCallback(() => {
            openDialog();
        }, [openDialog]);

        return (
            <Fragment>
                <div style={{display: 'flex', gap: '12px'}}>
                    <Button onClick={handleClick}>Open dialog</Button>
                </div>
                <Dialog {...args} id="bazz" dialogTitle="This is the title of dialog!">
                    <P>
                        Podil, the heartbeat of Kyiv, is where vintage vibes meet modern chic.
                        Amidst cobblestone streets and artisanal coffee shops, you’ll find a blend
                        of history and hipster culture. The aroma of freshly brewed coffee mingles
                        with the scent of blooming flowers from local markets, creating an
                        atmosphere that’s both nostalgic and contemporary.
                    </P>
                    <P>
                        In the heart of Podil, street art tells stories of the past and present.
                        Murals adorn the walls, each one a masterpiece that captures the essence of
                        this eclectic district. Vinyl records spin in cozy cafes, where baristas
                        craft lattes with intricate foam art. It’s a place where creativity flows as
                        freely as the Dnipro River.
                    </P>
                    <P>
                        Podil’s nightlife is a tapestry of craft beer bars, speakeasies, and live
                        music venues. As the sun sets, the district comes alive with the sounds of
                        indie bands and the clinking of glasses. Rooftop bars offer panoramic views
                        of the city, where you can sip on locally brewed ales while watching the
                        stars twinkle above.
                    </P>
                    <P>
                        The district’s markets are a treasure trove for vintage enthusiasts. From
                        retro clothing boutiques to antique shops, Podil is a haven for those who
                        appreciate the charm of yesteryears. Handmade jewelry, quirky souvenirs, and
                        unique finds await those who wander through its bustling streets.
                    </P>
                    <P>
                        Podil’s culinary scene is a fusion of traditional Ukrainian flavors and
                        modern gastronomy. Farm-to-table restaurants serve dishes made from locally
                        sourced ingredients, while food trucks offer gourmet street food. Whether
                        you’re craving borscht or a vegan burger, Podil’s eateries cater to every
                        palate.
                    </P>
                    <P>
                        Art galleries and studios dot the district, showcasing the works of local
                        artists. Workshops and pop-up events invite visitors to unleash their
                        creativity. In Podil, every corner is an invitation to explore, discover,
                        and be inspired by the vibrant culture that defines this unique part of
                        Kyiv.
                    </P>
                </Dialog>
            </Fragment>
        );
    },
};

export const DialogInDialog: Story = {
    name: 'Dialog in dialog',
    render: () => {
        const {closeDialog: closeFirst, openDialog: openFirst} = useDialogState('baz');
        const {closeDialog: closeSecond, openDialog: openSecond} = useDialogState('qux');

        const handleOpenFirst = useCallback(() => {
            openFirst();
        }, [openFirst]);

        const handleOpenSecond = useCallback(() => {
            openSecond();
        }, [openSecond]);

        const actionsFirst = useMemo<
            [ComponentProps<typeof ActionButton>, ComponentProps<typeof ActionButton>][]
        >(
            () => [
                [
                    {title: 'Close First', type: 'danger', onClick: closeFirst},
                    {
                        title: 'Open Second',
                        type: 'success',
                        onClick: () => {
                            openSecond();
                        },
                    },
                ],
            ],
            [closeFirst, openSecond]
        );

        const actionsSecond = useMemo<ComponentProps<typeof ActionButton>[]>(
            () => [{title: 'Close Second', type: 'danger', onClick: closeSecond}],
            [closeSecond]
        );

        return (
            <Fragment>
                <ButtonGroup>
                    <Button onClick={handleOpenFirst}>Open first</Button>
                    <Button onClick={handleOpenSecond}>Open second</Button>
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
