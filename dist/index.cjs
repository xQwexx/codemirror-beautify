'use strict';

var state = require('@codemirror/state');
var language = require('@codemirror/language');
var langCss = require('@codemirror/lang-css');
var langHtml = require('@codemirror/lang-html');
var langJavascript = require('@codemirror/lang-javascript');
var jsBeautify = require('js-beautify');

function getBeautify(state) {
    const stateLanguage = state.facet(language.language);
    if (stateLanguage === langCss.cssLanguage) {
        return (text, config) => jsBeautify.css_beautify(text, config);
    }
    else if (stateLanguage === langHtml.htmlLanguage) {
        return (text, config) => jsBeautify.html_beautify(text, config);
    }
    else if (stateLanguage === langJavascript.javascriptLanguage) {
        return (text, config) => jsBeautify.js_beautify(text, config);
    }
    else ;
}
function beautifyText(range, { state, dispatch }) {
    var _a;
    let textIter = state.doc.iterRange(range.from, range.to);
    let text = '';
    while (!textIter.done) {
        text += textIter.value;
        textIter = textIter.next();
    }
    const configRaw = (_a = state.facet(beautifyConfig)) !== null && _a !== void 0 ? _a : {};
    const beautified = getBeautify(state)(state.doc.toString(), Object.assign({ indent_size: language.getIndentUnit(state) }, configRaw));
    if (state.selection.asSingle().main == range) {
        dispatch(state.update(state.replaceSelection(beautified)));
    }
    else {
        dispatch(({ changes: {
                from: range.from,
                to: range.to,
                insert: beautified
            } }));
    }
    return true;
}
const autoFormatSelected = ({ state, dispatch }) => {
    const range = state.selection.asSingle().main;
    return beautifyText(range, { state, dispatch });
};
const autoFormaAll = ({ state: state$1, dispatch }) => {
    return beautifyText(state.EditorSelection.range(0, state$1.doc.length), { state: state$1, dispatch });
};
const beautifyConfig = state.Facet.define();

exports.autoFormaAll = autoFormaAll;
exports.autoFormatSelected = autoFormatSelected;
exports.beautifyConfig = beautifyConfig;
