import type {
    InputHTMLAttributes,
    ChangeEvent,
    FocusEvent,
    KeyboardEvent,
    AriaAttributes
} from 'react';

export type NativeProps = AriaAttributes & {
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name
     */
    name?: InputHTMLAttributes<HTMLInputElement>['name'];
    /** Set input id attribute. */
    id?: string;
    /**
     * Set native HTML `required` attribute.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required
     */
    required?: InputHTMLAttributes<HTMLInputElement>['required'];
    /**
     * Provides substitute for native autofocus functionality.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autofocus
     * @see https://github.com/facebook/react/issues/11851#issuecomment-351672131
     */
    autoFocus?: InputHTMLAttributes<HTMLInputElement>['autoFocus'];
    /**
     * Set native HTML `autocomplete` attribute.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
     */
    autoComplete?: InputHTMLAttributes<HTMLInputElement>['autoComplete'];
    /** Set native HTML `form` attribute. */
    form?: InputHTMLAttributes<HTMLInputElement>['form'];
    /**
     * Set native ARIA role attribute
     * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/input_role
     */
    role?: InputHTMLAttributes<HTMLInputElement>['role'];
};

export type CallbackProps = {
    /**
     * Provide value CheckboxInput.
     * NB! This prop is unlike TextInput and doesn't influence a state of input! Use `checked` prop for that.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#additional_attributes
     */
    value?: InputHTMLAttributes<HTMLInputElement>['value'];
    /**
     * Provide default checked state for non-controlled CheckboxInput.
     * Setting this prop enables non-controlled mode.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#additional_attributes
     * @see https://naspersclassifieds.atlassian.net/wiki/spaces/NDS/pages/57169350329/RFC+Nexus+Input+API#Uncontrolled-input
     */
    defaultChecked?: InputHTMLAttributes<HTMLInputElement>['checked'];
    /**
     * Provide checked state for controlled CheckboxInput.
     * Setting this prop enables controlled mode.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#additional_attributes
     * @see https://naspersclassifieds.atlassian.net/wiki/spaces/NDS/pages/57169350329/RFC+Nexus+Input+API#Controllable-state
     */
    checked?: InputHTMLAttributes<HTMLInputElement>['checked'];
    /**
     * Disable input.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#disabled
     */
    disabled?: InputHTMLAttributes<HTMLInputElement>['disabled'];
    /**
     * Set on change callback to get Event object.
     * @see https://reactjs.org/docs/events.html#form-events
     */
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    /**
     * Set on focus callback to get Event object.
     * @see https://reactjs.org/docs/events.html#onfocus
     */
    onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
    /**
     * Set on blur callback to get Event object.
     * @see https://reactjs.org/docs/events.html#onblur
     */
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
    /**
     * Set on key down callback to get Event object.
     * @see https://reactjs.org/docs/events.html#keyboard-events
     */
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
    /**
     * Set on key up callback to get Event object.
     * @see https://reactjs.org/docs/events.html#keyboard-events
     */
    onKeyUp?: (event: KeyboardEvent<HTMLInputElement>) => void;
};
