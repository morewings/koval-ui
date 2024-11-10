export type Source = {
    src: string;
    /**
     * Provide the source video MIME type
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source#type
     */
    type?: string;
    /**
     * Provide media condition for the source video
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source#media
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries
     */
    mediaCondition?: string;
};

export enum PlayModes {
    play = 'play',
    pause = 'pause',
    pristine = 'pristine',
}
