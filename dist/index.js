import { Facet, EditorSelection } from '@codemirror/state';
import { getIndentUnit, language } from '@codemirror/language';
import { cssLanguage } from '@codemirror/lang-css';
import { htmlLanguage } from '@codemirror/lang-html';
import { javascriptLanguage } from '@codemirror/lang-javascript';
import { css_beautify, html_beautify, js_beautify } from 'js-beautify';

function getBeautify(state) {
    const stateLanguage = state.facet(language);
    if (stateLanguage === cssLanguage) {
        return (text, config) => css_beautify(text, config);
    }
    else if (stateLanguage === htmlLanguage) {
        return (text, config) => html_beautify(text, config);
    }
    else if (stateLanguage === javascriptLanguage) {
        return (text, config) => js_beautify(text, config);
    }
    else {
        return (text, config) => text;
    }
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
    const beautified = getBeautify(state)(state.doc, Object.assign({ indent_size: getIndentUnit(state) }, configRaw));
    if (state.selection.asSingle()
        .main == range) {
        dispatch(state.update(state.replaceSelection(beautified)));
    }
    else {
        dispatch(({
            changes: {
                from: range.from,
                to: range.to,
                insert: beautified
            }
        }));
    }
    return true;
}
const autoFormatSelected = ({ state, dispatch }) => {
    const range = state.selection.asSingle()
        .main;
    return beautifyText(range, { state, dispatch });
};
const autoFormaAll = ({ state, dispatch }) => {
    return beautifyText(EditorSelection.range(0, state.doc.length), { state, dispatch });
};
const beautifyConfig = /*@__PURE__*/Facet.define();

export { autoFormaAll, autoFormatSelected, beautifyConfig };
