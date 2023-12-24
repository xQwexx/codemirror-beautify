import { StateCommand, Facet } from '@codemirror/state';

type BeautifyConfig = js_beautify.CoreBeautifyOptions & {
    css?: js_beautify.CSSBeautifyOptions;
} & {
    js?: js_beautify.JSBeautifyOptions;
} & {
    html?: js_beautify.HTMLBeautifyOptions & {
        css?: js_beautify.CSSBeautifyOptions;
    } & {
        js?: js_beautify.JSBeautifyOptions;
    };
};
declare const autoFormatSelected: StateCommand;
declare const autoFormaAll: StateCommand;
declare const beautifyConfig: Facet<BeautifyConfig, readonly BeautifyConfig[]>;

export { type BeautifyConfig, autoFormaAll, autoFormatSelected, beautifyConfig };
