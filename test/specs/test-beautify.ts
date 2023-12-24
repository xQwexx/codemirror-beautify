import { autoFormaAll } from "../../src/index";
import { EditorView, basicSetup,  } from "codemirror";
import {  EditorViewConfig,  } from "@codemirror/view";
import { EditorState } from "@codemirror/state"
import { javascriptTemplate, htmlTemplate, cssTemplate } from "../comparisonTemplates"
import { language, Language, indentUnit } from '@codemirror/language'
import { cssLanguage } from '@codemirror/lang-css';
import { htmlLanguage } from '@codemirror/lang-html';
import { javascriptLanguage } from '@codemirror/lang-javascript';
 /**
 * @jest-environment jsdom
 */

function editor(doc: string, selectedLanguage: Language, indentNumber: number = 2) {
    const config: EditorViewConfig ={
        extensions: [language.of(selectedLanguage), EditorState.tabSize.of(indentNumber), indentUnit.of(" ".repeat(indentNumber)), basicSetup]
    }
    const editor = new EditorView( {doc, ...config})
    return editor
}

describe("beautify", () => {
  describe("autoFormaAll", () => {

    test('Test with javascript language', () => {
      const cm = editor(javascriptTemplate.ugly, javascriptLanguage);
      autoFormaAll(cm)
      expect(cm.state.doc.toString()).toEqual(javascriptTemplate.beautified);
    });

    test('Test with html language', () => {
      const cm = editor(htmlTemplate.ugly, htmlLanguage, 4);
      autoFormaAll(cm)
      expect(cm.state.doc.toString()).toEqual(htmlTemplate.beautified);
    });
    
    test('Test with css language', () => {
      const cm = editor(cssTemplate.ugly, cssLanguage, 4);
      autoFormaAll(cm)
      expect(cm.state.doc.toString()).toEqual(cssTemplate.beautified);
    });
  })
});

