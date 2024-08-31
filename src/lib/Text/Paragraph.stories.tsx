import type {Meta, StoryObj} from '@storybook/react';
import {Fragment} from 'react';
// import {fn} from '@storybook/test';

import {P} from './Paragraph.tsx';

const meta = {
    title: 'Typography/Paragraph',
    component: P,
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
} as Meta<typeof P>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: args => {
        return (
            <Fragment>
                <P {...args}>
                    Kurazh Bazaar, the epitome of urban cool, is where vintage vibes meet modern
                    chic. Amidst the bustling streets of Kiev, this eclectic market is a haven for
                    those seeking unique finds and artisanal treasures. From retro vinyl records to
                    handcrafted jewelry, every corner of Kurazh Bazaar tells a story of creativity
                    and passion.
                </P>
                <P>
                    Picture yourself sipping on a cold brew coffee, the aroma mingling with the
                    scent of freshly baked artisanal bread. As you stroll through the bazaar, you
                    encounter a myriad of stalls offering everything from retro fashion to bespoke
                    furniture. The air is alive with the sounds of indie bands strumming their
                    guitars and the chatter of like-minded souls.
                </P>
                <P>
                    Kurazh Bazaar is more than just a market; it’s a celebration of individuality
                    and artistic expression. Here, you can lose yourself in the eclectic mix of old
                    and new, where every item has a story and every corner invites exploration.
                    Embrace the bohemian spirit and let your inner hipster thrive in this urban
                    oasis.
                </P>
            </Fragment>
        );
    },
    args: {},
};
