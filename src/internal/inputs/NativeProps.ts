import type {InputHTMLAttributes} from 'react';

export type NativeProps = {
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name
     */
    name?: InputHTMLAttributes<HTMLInputElement>['name'];
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
     * Disable input.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#disabled
     */
    disabled?: InputHTMLAttributes<HTMLInputElement>['disabled'];
    /** Set native HTML `form` attribute. */
    form?: InputHTMLAttributes<HTMLInputElement>['form'];
};

export type NativePropsTextual = NativeProps & {
    /**
     * Provides a hint about the type of data that might be entered by the user while
     * editing the element or its contents. This allows the browser to display an
     * appropriate virtual keyboard.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inputMode
     */
    inputMode?: InputHTMLAttributes<HTMLInputElement>['inputMode'];
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
    /**
     * Pattern attribute specifies a regular expression the form control's value should match.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern
     */
    pattern?: InputHTMLAttributes<HTMLInputElement>['pattern'];
    /**
     * Define the width of the input in characters
     */
    size?: InputHTMLAttributes<HTMLInputElement>['size'];
};

export type NativePropsNumeric = Omit<
    NativePropsTextual,
    'inputMode' | 'pattern' | 'maxLength' | 'minLength'
> & {
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

export type NativePropsInteractive = NativeProps;
