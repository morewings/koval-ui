import type {ChangeEvent, FocusEvent, InputHTMLAttributes, KeyboardEvent} from 'react';

export type CallbackPropsTextual<TElement = HTMLInputElement> = {
    /**
     * Provide value for controlled TextInput.
     * Setting this prop enables controlled mode.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#value
     */
    value?: InputHTMLAttributes<TElement>['value'];
    /**
     * Provide value for non-controlled TextInput.
     * Setting this prop enables non-controlled mode.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#value
     */
    defaultValue?: InputHTMLAttributes<TElement>['defaultValue'];
    /**
     * Makes the element not mutable, meaning the user can not edit the control
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly
     */
    readOnly?: InputHTMLAttributes<HTMLInputElement>['readOnly'];
    /**
     * Set on change callback to get Event object.
     * @see https://reactjs.org/docs/events.html#form-events
     */
    onChange?: (event: ChangeEvent<TElement>) => void;
    /**
     * Set on focus callback to get Event object.
     * @see https://reactjs.org/docs/events.html#onfocus
     */
    onFocus?: (event: FocusEvent<TElement>) => void;
    /**
     * Set on blur callback to get Event object.
     * @see https://reactjs.org/docs/events.html#onblur
     */
    onBlur?: (event: FocusEvent<TElement>) => void;
    /**
     * Set on key down callback to get Event object.
     * @see https://reactjs.org/docs/events.html#keyboard-events
     */
    onKeyDown?: (event: KeyboardEvent<TElement>) => void;
    /**
     * Set on key up callback to get Event object.
     * @see https://reactjs.org/docs/events.html#keyboard-events
     */
    onKeyUp?: (event: KeyboardEvent<TElement>) => void;
};

export type CallbackPropsInteractive = {
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
     */
    defaultChecked?: InputHTMLAttributes<HTMLInputElement>['checked'];
    /**
     * Provide checked state for controlled CheckboxInput.
     * Setting this prop enables controlled mode.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#additional_attributes
     */
    checked?: InputHTMLAttributes<HTMLInputElement>['checked'];
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
