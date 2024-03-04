import type {FC, ReactNode} from 'react';
import {useId, useState} from 'react';
import {createPortal} from 'react-dom';

import {useSafeLayoutEffect} from '@/internal/hooks/useSafeLayoutEffect.ts';

export type Props = {
    children: ReactNode;
};

export const Portal: FC<Props> = ({children}) => {
    const id = useId();
    const [portalRendered, setPortalRendered] = useState(false);
    useSafeLayoutEffect(() => {
        if (!portalRendered) {
            const element = document.createElement('div');
            element.id = id;
            document.body.appendChild(element);
            setPortalRendered(true);
        }
        return () => {
            portalRendered && document.getElementById(id)!.remove();
        };
    }, [id, portalRendered]);

    return portalRendered && createPortal(children, document.getElementById(id)!, id);
};
