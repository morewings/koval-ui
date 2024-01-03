import type {InputHTMLAttributes} from 'react';

export type NativePropsTextual = {
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
    /**
     * Makes the element not mutable, meaning the user can not edit the control
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly
     */
    readOnly?: InputHTMLAttributes<HTMLInputElement>['readOnly'];
};

export type NativePropsNumeric = {
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name
     */
    name?: InputHTMLAttributes<HTMLInputElement>['name'];
    /** Set input id attribute. */
    id?: string; // TODO: merge with library props
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
     * Make the element not mutable, meaning the user can not edit the control
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly
     */
    readOnly?: InputHTMLAttributes<HTMLInputElement>['readOnly'];
    /**
     * Define the minimum value that is acceptable and valid for the input
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/min
     */
    min?: InputHTMLAttributes<HTMLInputElement>['min'];
    /**
     * Define the maximum value that is acceptable and valid for the input
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/max
     */
    max?: InputHTMLAttributes<HTMLInputElement>['max'];
    /**
     * Specify the granularity that the value must adhere to
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/step
     */
    step?: InputHTMLAttributes<HTMLInputElement>['step'];
};

export type NativePropsInteractive = {
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
    /** Set native HTML `form` attribute. */
    form?: InputHTMLAttributes<HTMLInputElement>['form'];
    /**
     * Set native ARIA role attribute
     * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/input_role
     */
    role?: InputHTMLAttributes<HTMLInputElement>['role']; // TODO: merge with library props
};
