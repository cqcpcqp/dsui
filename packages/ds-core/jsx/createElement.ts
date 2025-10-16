import { DidactElement } from '../model';
/**
 * react类似的功能在 react/src/jsx/ReactJSXElements.js
 *
 * jsx
 * dsInput() {
 *   return <input type="number" value={this.inputValue}></input>;
 * }
 * function DsInput(props: { value: number }) {
 *   return <input type="number" value={props.value}></input>;
 * }
 * <div>
 *   <h1>Index: {this.index}</h1>
 *   <span title="span title">span content</span>
 *   text content
 *   <input type="number" value={this.inputValue}></input>
 *   <DsInput value={this.inputValue}></DsInput>
 *   {this.dsInput()}
 * </div>
 *
 * js
 * Didact.createElement("div", null,
 *   Didact.createElement("h1", null, "Index: ", this.index),
 *   Didact.createElement("span", { title: "span title" }, "span content"),
 *   "text content",
 *   Didact.createElement("input", { type: "number", value: this.inputValue })
 *   Didact.createElement(DsInput, { value: this.inputValue }),
 *   this.dsInput()
 * );
 *
 * jsx
 * <div className="select-group">
 *  <input
 *    value={this.value}
 *    onInput={handleChange}
 *    placeholder={this.getAttribute('placeholder') || ''}
 *  ></input>
 * {this._isOpen && (
 *  <SelectDropdown>
 *    <slot></slot>
 *  </SelectDropdown>
 * )}
 * </div>
 * 
 * 
 * js
 * Didact.createElement("div", { className: "select-group" }, 
 *  Didact.createElement("input", { value: this.value, onInput: handleChange, placeholder: this.getAttribute('placeholder') || '' }),
 *    this._isOpen && (Didact.createElement(SelectDropdown, null, 
 *      Didact.createElement("slot", null)
 *    )
 *  )
 * )
 */
export function createElement(type, props, ...children): DidactElement {
  return {
    type,
    props: {
      ...props,
      children: children.flat().map((child) => {
        return typeof child === 'object' ? child : createTextElement(child);
      }),
    },
  };
}

function createTextElement(text: string): DidactElement {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  };
}
