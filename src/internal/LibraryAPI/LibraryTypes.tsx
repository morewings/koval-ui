import type {AriaAttributes, HTMLAttributes} from 'react';

type DataAttributeKey = `data-${string}`;

export type DataAttributes = Record<DataAttributeKey, string>;

export type LibraryProps = AriaAttributes & {
    id?: string;
    /**
     * Set native ARIA role attribute
     * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles
     */
    role?: HTMLAttributes<HTMLDivElement>['role'];
    /**
     * Specify additional CSS class. This allows you to use styled(Component)
     * or the css prop in styled-components or emotion.
     */
    className?: HTMLAttributes<HTMLDivElement>['className'];
};
