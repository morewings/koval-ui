import type {InputHTMLAttributes, ChangeEvent, FocusEvent, KeyboardEvent} from 'react';

export type NativeProps = {
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name
     */
    name?: InputHTMLAttributes<HTMLInputElement>['name'];
    /** Set input id attribute. */
    id?: string;
    /**
     * Define a type of TextInput. Allows developer to optionally set one from supported
     * text-like input types instead of default 'text'.
     * Non-text types such as `number` or `week` are not allowed.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
     */
    // type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';
    /**
     * Provides a hint about the type of data that might be entered by the user while
     * editing the element or its contents. This allows the browser to display an
     * appropriate virtual keyboard.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inputMode
     */
    inputMode?: InputHTMLAttributes<HTMLInputElement>['inputMode'];
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
     * Set text for placeholder.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#placeholder
     */
    placeholder?: InputHTMLAttributes<HTMLInputElement>['placeholder'];
    /**
     * Set native HTML `autocomplete` attribute.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
     */
    autoComplete?: InputHTMLAttributes<HTMLInputElement>['autoComplete'];
    /**
     * Defines the maximum number of characters (as UTF-16 code units) the user can enter.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/maxlength
     */
    maxLength?: InputHTMLAttributes<HTMLInputElement>['maxLength'];
    /**
     * Defines the minimum number of characters (as UTF-16 code units) the user can enter.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/minlength
     */
    minLength?: InputHTMLAttributes<HTMLInputElement>['minLength'];
    /** Set native HTML `form` attribute. */
    form?: InputHTMLAttributes<HTMLInputElement>['form'];
    /**
     * Set native ARIA role attribute
     * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/input_role
     */
    role?: InputHTMLAttributes<HTMLInputElement>['role'];
    /**
     * Pattern attribute specifies a regular expression the form control's value should match.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern
     */
    pattern?: InputHTMLAttributes<HTMLInputElement>['pattern'];
    // not valid for textInput move to number
    // max?: InputHTMLAttributes<HTMLInputElement>['max'];
    // min?: InputHTMLAttributes<HTMLInputElement>['min'];
};

export type CallbackProps<TElement = HTMLInputElement> = {
    /**
     * Provide value for controlled TextInput.
     * Setting this prop enables controlled mode.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#value
     * @see https://naspersclassifieds.atlassian.net/wiki/spaces/NDS/pages/57169350329/RFC+Nexus+Input+API#Controllable-state
     */
    value?: InputHTMLAttributes<TElement>['value'];
    /**
     * Provide value for non-controlled TextInput.
     * Setting this prop enables non-controlled mode.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#value
     * @see https://naspersclassifieds.atlassian.net/wiki/spaces/NDS/pages/57169350329/RFC+Nexus+Input+API#Uncontrolled-input
     */
    defaultValue?: InputHTMLAttributes<TElement>['defaultValue'];
    /**
     * Disable input.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#disabled
     */
    disabled?: InputHTMLAttributes<TElement>['disabled'];
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
