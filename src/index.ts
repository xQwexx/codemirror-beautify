import { EditorSelection } from "@codemirror/state"
import { EditorState, Facet, StateCommand } from "@codemirror/state"
import { language, getIndentUnit } from "@codemirror/language"
import { cssLanguage } from '@codemirror/lang-css';
import { htmlLanguage } from '@codemirror/lang-html';
import { javascriptLanguage } from '@codemirror/lang-javascript';
import { js_beautify, css_beautify, html_beautify } from 'js-beautify'

// var beautify_js = require('js-beautify').js;
// var beautify_css = require('js-beautify').css;
// var beautify_html = require('js-beautify').html;

export type BeautifyConfig = js_beautify.CoreBeautifyOptions & { css ? : js_beautify.CSSBeautifyOptions } & { js ? : js_beautify.JSBeautifyOptions } & { html ? : js_beautify.HTMLBeautifyOptions & { css ? : js_beautify.CSSBeautifyOptions } & { js ? : js_beautify.JSBeautifyOptions } }

function getBeautify(state: EditorState) {
    const stateLanguage = state.facet(language);
    if (stateLanguage === cssLanguage) {
        return (text: string, config: BeautifyConfig) => css_beautify(text, config)
    } else if (stateLanguage === htmlLanguage) {
        return (text: string, config: BeautifyConfig) => html_beautify(text, config)
    } else if (stateLanguage === javascriptLanguage) {
        return (text: string, config: BeautifyConfig) => js_beautify(text, config)
    } else {
        return (text: string, config: BeautifyConfig) => text
    }
}

function beautifyText(range, { state, dispatch }) {
    let textIter = state.doc.iterRange(range.from, range.to)
    let text = '';
    while (!textIter.done) {
        text += textIter.value;
        textIter = textIter.next()
    }
    const configRaw = state.facet(beautifyConfig) ?? {}
    
    const beautified = getBeautify(state)(state.doc, { indent_size: getIndentUnit(state), ...configRaw })
    if (state.selection.asSingle()
        .main == range) {
        dispatch(state.update(state.replaceSelection(beautified)))
    } else {
        dispatch(({
            changes: {
                from: range.from
                , to: range.to
                , insert: beautified
            }
        }))
    }
    return true;
}

export const autoFormatSelected: StateCommand = ({ state, dispatch }) => {
    const range = state.selection.asSingle()
        .main
    return beautifyText(range, { state, dispatch });
}

export const autoFormaAll: StateCommand = ({ state, dispatch }) => {
    return beautifyText(EditorSelection.range(0, state.doc.length), { state, dispatch });
}
export const beautifyConfig = Facet.define < BeautifyConfig > ()
