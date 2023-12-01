import type {FC, ReactNode} from 'react';
import {useLocalTheme} from 'css-vars-hook';
import {useEffect} from 'react';
import classNames from 'classnames';

import type {SizeUnit, FluidUnit} from './SizeTypes';
import classes from './Layout.module.css';

export type ContainerProps = {
    /** Set Container width in pixels as a number or set to `fluid` to make it 100% */
    containerWidth?: SizeUnit | FluidUnit;
    /** Select HTML element to render as a container */
    as?: string;
    /** Specify additional CSS class. This allows you to use styled(Container) or the css prop in styled-components or emotion. */
    className?: string;
    children: ReactNode;
};

const normalizeWidth = (widthProp: ContainerProps['containerWidth']) => {
    if (widthProp === 'fluid') {
        return '100%';
    }
    return `${widthProp}px`;
};

export const Container: FC<ContainerProps> = ({containerWidth = 1280, className, as = 'div', children}) => {
    const width = normalizeWidth(containerWidth);
    const {LocalRoot, setTheme} = useLocalTheme();
    useEffect(() => {
        setTheme({containerWidth: width});
    }, [setTheme, width]);
    return (
        <LocalRoot as={as} className={classNames(classes.container, className)}>
            {children}
        </LocalRoot>
    );
};
