export type SandboxConfig = {
    /**
     * Allows downloading files through an <a> or <area> element with the download attribute,
     * as well as through the navigation that leads to a download of a file.
     * This works regardless of whether the user clicked on the link,
     * or JS code initiated it without user interaction.
     */
    'allow-downloads'?: boolean;
    /**
     * Allows for downloads to occur without a gesture from the user.
     */
    'allow-downloads-without-user-activation'?: boolean;
    /**
     * Allows the page to submit forms.
     * If this keyword is not used, the form will be displayed as normal,
     * but submitting it will not trigger input validation,
     * sending data to a web server or closing a dialog.
     */
    'allow-forms'?: boolean;
    /**
     * Allows the page to open modal windows by Window.alert(),
     * Window.confirm(), Window.print() and Window.prompt(),
     * while opening a <dialog> is allowed regardless of this keyword.
     * It also allows the page to receive BeforeUnloadEvent event.
     */
    'allow-modals'?: boolean;
    /**
     * Lets the resource lock the screen orientation.
     */
    'allow-orientation-lock'?: boolean;
    /**
     * Allows the page to use the Pointer Lock API.
     */
    'allow-pointer-lock'?: boolean;
    /**
     * Allows popups (like from Window.open(), target="_blank", Window.showModalDialog()).
     * If this keyword is not used, that functionality will silently fail.
     */
    'allow-popups'?: boolean;
    /**
     * Allows a sandboxed document
     * to open a new browsing context without forcing the sandboxing flags upon it.
     * This will allow, for example, a third-party advertisement
     * to be safely sandboxed without forcing the same restrictions upon the page the ad links to.
     * If this flag is not included, a redirected page, popup window,
     * or new tab will be subject to the same sandbox restrictions as the originating <iframe>.
     */
    'allow-popups-to-escape-sandbox'?: boolean;
    /**
     * Allows embedders to have control over whether an iframe can start a presentation session.
     */
    'allow-presentation'?: boolean;
    /**
     * If this token is not used,
     * the resource is treated as being from a special origin that always fails the same-origin policy
     * (potentially preventing access to data storage/cookies and some JavaScript APIs).
     */
    'allow-same-origin'?: boolean;
    /**
     * Allows the page to run scripts (but not create pop-up windows).
     * If this keyword is not used, this operation is not allowed.
     */
    'allow-scripts'?: boolean;
    /**
     * Allows a document loaded in the <iframe>
     * to use the Storage Access API to request access to unpartitioned cookies.
     */
    'allow-storage-access-by-user-activation'?: boolean;
    /**
     * Lets the resource navigate the top-level browsing context (the one named _top).
     */
    'allow-top-navigation'?: boolean;
    /**
     * Lets the resource navigate the top-level browsing context, but only if initiated by a user gesture.
     */
    'allow-top-navigation-by-user-activation'?: boolean;
    /**
     * Allows navigations to non-http protocols built into a browser or registered by a website.
     * This feature is also activated by allow-popups or allow-top-navigation keyword.
     */
    'allow-top-navigation-to-custom-protocols'?: boolean;
};

export type Permission = `https://${string}` | 'self' | '*' | 'src' | 'none' | true;

export type PermissionsConfig = {
    /**
     * Controls whether the iframe is allowed
     * to gather information about the acceleration of the device through the Accelerometer interface.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/accelerometer
     */
    accelerometer?: Permission | Permission[];
    /**
     * Controls whether the iframe is allowed
     * to gather information about the amount of light in the environment around the device through the AmbientLightSensor interface.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/ambient-light-sensor
     */
    'ambient-light-sensor'?: Permission | Permission[];
    /**
     * Controls whether the iframe is allowed to use the Attribution Reporting API.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/attribution-reporting
     */
    'attribution-reporting'?: Permission | Permission[];
    /**
     * Controls whether the iframe is allowed
     * to autoplay media requested through the HTMLMediaElement interface.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/autoplay
     */
    autoplay?: Permission | Permission[];
    /**
     * Controls whether the use of the Web Bluetooth API is allowed.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/bluetooth
     */
    bluetooth?: Permission | Permission[];
    /**
     * Controls access to the Topics API.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/browsing-topics
     */
    'browsing-topics'?: Permission | Permission[];
    /**
     * Controls whether the iframe is allowed to use video input devices.
     * @see Controls whether the iframe is allowed to use video input devices.
     */
    camera?: Permission | Permission[];
    'clipboard-write'?: Permission | Permission[];
    /**
     * Controls access to the Compute Pressure API.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/compute-pressure
     */
    'compute-pressure'?: Permission | Permission[];
    /**
     * Controls whether the iframe is permitted to use the getDisplayMedia()
     * method to capture screen contents.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/display-capture
     */
    'display-capture'?: Permission | Permission[];
    /**
     * Controls whether the iframe is allowed to set document.domain.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/document-domain
     */
    'document-domain'?: Permission | Permission[];
    /**
     * Controls whether the iframe is allowed to use the Encrypted Media Extensions API (EME).
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/encrypted-media
     */
    'encrypted-media'?: Permission | Permission[];
    /**
     * Controls whether the iframe is allowed to use Element.requestFullscreen().
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/fullscreen
     */
    fullscreen?: Permission | Permission[];
    /**
     * Controls whether the iframe is allowed to use the Gamepad API.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/gamepad
     */
    gamepad?: Permission | Permission[];
    /**
     * Controls whether the iframe is allowed to use the Geolocation Interface.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/geolocation
     */
    geolocation?: Permission | Permission[];
    /**
     * Controls whether the iframe is allowed
     * to gather information about the orientation of the device through the Gyroscope interface.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/gyroscope
     */
    gyroscope?: Permission | Permission[];
    /**
     * Controls whether the iframe is allowed to use the WebHID API
     * to connect to uncommon or exotic human interface devices such as alternative keyboards or gamepads.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/hid
     */
    hid?: Permission | Permission[];
    /**
     * Controls whether the iframe is allowed to use the Federated Credential Management API (FedCM),
     * and more specifically the navigator.credentials.get() method with an identity option.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/identity-credentials-get
     */
    'identity-credentials-get'?: Permission | Permission[];
    /**
     * Controls whether the iframe is allowed
     * to use the Idle Detection API to detect when users are interacting with their devices,
     * for example, to report "available"/"away" status in chat applications.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/idle-detection
     */
    'idle-detection'?: Permission | Permission[];
    /**
     * Controls whether the iframe is allowed
     * to gather data on the user's locally installed fonts via the Window.queryLocalFonts()
     * method (see also the Local Font Access API).
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/local-fonts
     */
    'local-fonts'?: Permission | Permission[];
    /**
     * Controls whether the iframe is allowed
     * to gather information about the orientation of the device through the Magnetometer interface.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/magnetometer
     */
    magnetometer?: Permission | Permission[];
    /**
     * Controls whether the iframe is allowed to use audio input devices.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/microphone
     */
    microphone?: Permission | Permission[];
    /**
     * Controls whether the iframe is allowed to use the Web MIDI API.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/midi
     */
    midi?: Permission | Permission[];
    /**
     * Controls whether the iframe is allowed to use the WebOTP API to request a one-time password
     * (OTP) from a specially formatted SMS message sent by the app's server
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/otp-credentials
     */
    'otp-credentials'?: Permission | Permission[];
    /**
     * Controls whether the iframe is allowed to use the Payment Request API.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/payment
     */
    payment?: Permission | Permission[];
    /**
     * Controls whether the iframe is allowed
     * to play a video in a Picture-in-Picture mode via the corresponding API.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/picture-in-picture
     */
    'picture-in-picture'?: Permission | Permission[];
    /**
     * Controls whether the iframe is allowed
     * to use the Web Authentication API to create new asymmetric key credentials
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/publickey-credentials-create
     */
    'publickey-credentials-create'?: Permission | Permission[];
    /**
     * Controls whether the iframe is allowed
     * to use the Web Authentication API to retrieve already stored public-key credentials
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/publickey-credentials-get
     */
    'publickey-credentials-get'?: Permission | Permission[];
    /**
     * Controls whether the iframe is allowed
     * to use Screen Wake Lock API to indicate that a device shouldn't turn off or dim the screen.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/screen-wake-lock
     */
    'screen-wake-lock'?: Permission | Permission[];
    /**
     * Controls whether the iframe is allowed to use the Web Serial API to communicate with serial devices,
     * either directly connected via a serial port, or via USB or Bluetooth devices emulating a serial port.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/serial
     */
    serial?: Permission | Permission[];
    /**
     * Controls whether the iframe is allowed to use the Audio Output Devices API to list and select speakers.
     * @see Controls whether the iframe is allowed to use the Audio Output Devices API to list and select speakers.
     */
    'speaker-selection'?: Permission | Permission[];
    /**
     * Controls whether an iframe is allowed to use the Storage Access API to request access to unpartitioned cookies.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/storage-access
     */
    'storage-access'?: Permission | Permission[];
    /**
     * Controls whether the iframe is allowed to use the WebUSB API.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/usb
     */
    usb?: Permission | Permission[];
    /**
     * Controls whether the iframe is allowed to use the Navigator.share() of Web Share API
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/web-share
     */
    'web-share'?: Permission | Permission[];
    /**
     * Controls whether the iframe is allowed
     * to use the Window Management API to manage windows on multiple displays.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/window-management
     */
    'window-management'?: Permission | Permission[];
    /**
     * Controls whether the iframe is allowed
     * to use the WebXR Device API to interact with a WebXR session.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/xr-spatial-tracking
     */
    'xr-spatial-tracking'?: Permission | Permission[];
};
