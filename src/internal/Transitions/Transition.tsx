import type {FC, MutableRefObject, ReactNode} from 'react';
import {useMemo} from 'react';
import {useState} from 'react';

import {useEventListener} from '@/internal/hooks/useEventListener.ts';
import {useIsFirstRender} from '@/internal/hooks/useIsFirstRender.tsx';
import {useSafeLayoutEffect} from '@/internal/hooks/useSafeLayoutEffect.ts';

export type Props = {
    /** Control transition cycles. true starts enter cycle, false - exit. */
    show?: boolean;
    children?: ReactNode;
    /**
     * React reference to wrapper HTMLElement, transition CSS classes will be applied to
     * @example
     * const ref = useRef();
     * <Transition nodeRef={ref}>
     *     <div ref={ref}>{children}</div>
     *  </Transition>
     */
    nodeRef: MutableRefObject<HTMLElement | null>;
    /** CSS class to apply when exit transition starts */
    exitClassName?: string;
    /** CSS class to apply when exit transition is over */
    exitDoneClassName?: string;
    /** CSS class to apply when enter transition starts */
    enterClassName?: string;
    /** CSS class to apply when enter transition is over */
    enterDoneClassName?: string;
    /** Define if Transition component should unmount children according to show prop */
    unmountNode?: boolean;
    /** Callback triggers when exit transition is over */
    onExit?: () => void;
    /** Callback triggers when enter transition is over */
    onEnter?: () => void;
};

export const Transition: FC<Props> = ({
    show = false,
    children,
    exitClassName = 'transition-exit',
    exitDoneClassName = 'transition-exit-done',
    enterClassName = 'transition-enter',
    enterDoneClassName = 'transition-enter-done',
    nodeRef,
    unmountNode,
    onExit = () => {},
    onEnter = () => {},
}) => {
    const isFirstRender = useIsFirstRender();

    const [shouldRender, setRender] = useState(show);

    useSafeLayoutEffect(() => {
        show && setRender(show);
    }, [show]);

    const classNames = useMemo(
        () => ({
            enter: enterClassName.split(' '),
            exit: exitClassName.split(' '),
            exitDone: exitDoneClassName.split(' '),
            enterDone: enterDoneClassName.split(' '),
        }),
        [enterClassName, enterDoneClassName, exitClassName, exitDoneClassName]
    );

    useSafeLayoutEffect(() => {
        if (show) {
            nodeRef.current?.classList.add(...classNames.enter);
            nodeRef.current?.classList.remove(...classNames.exit);
            nodeRef.current?.classList.remove(...classNames.exitDone);
        } else {
            nodeRef.current?.classList.add(...classNames.exit);
            nodeRef.current?.classList.remove(...classNames.enter);
            nodeRef.current?.classList.remove(...classNames.enterDone);
        }
    }, [classNames, nodeRef, show, shouldRender, isFirstRender]);

    const handleAnimationEnd = () => {
        if (show && shouldRender) {
            onEnter();
            nodeRef.current?.classList.remove(...classNames.enter);
            nodeRef.current?.classList.add(...classNames.enterDone);
        } else if (shouldRender) {
            onExit();
            nodeRef.current?.classList.remove(...classNames.exit);
            nodeRef.current?.classList.add(...classNames.exitDone);
            setRender(false);
        }
    };

    useEventListener('animationend', handleAnimationEnd, nodeRef.current);

    return (shouldRender || !unmountNode) && children;
};
