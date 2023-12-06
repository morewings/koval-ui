import type {AriaAttributes, HTMLAttributes} from 'react';

export type LibraryProps<TElement = HTMLDivElement> = AriaAttributes & {
    id?: string;
    /**
     * Set native ARIA role attribute
     * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles
     */
    role?: HTMLAttributes<TElement>['role'];
    /**
     * Vocabulary object of data-attributes names and values.
     * In order to maintain type safety names should be provided without `data-` prefix.
     * @example
     * <Component dataAttributes={{testid: 'foo'}} /> // => <div data-testid="foo">...
     */
    dataAttributes?: Record<string, string>;
    /**
     * Specify additional CSS class. This allows you to use styled(Component)
     * or the css prop in styled-components or emotion.
     */
    className?: HTMLAttributes<TElement>['className'];
};
