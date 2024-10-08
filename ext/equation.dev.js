/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

var LexicalComposerContext = require('@lexical/react/LexicalComposerContext');
var utils = require('@lexical/utils');
var lexical = require('lexical');
var React = require('react');
var katex = require('katex');

function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}

const EquationComponent$2 = /*#__PURE__*/React.lazy(
// @ts-ignore
() => Promise.resolve().then(function () { return EquationComponent$1; }));
function convertEquationElement(domNode) {
  let equation = domNode.getAttribute('data-lexical-equation');
  const inline = domNode.getAttribute('data-lexical-inline') === 'true';
  // Decode the equation from base64
  equation = atob(equation || '');
  if (equation) {
    const node = $createEquationNode(equation, inline);
    return {
      node
    };
  }
  return null;
}
class EquationNode extends lexical.DecoratorNode {
  static getType() {
    return 'equation';
  }
  static clone(node) {
    return new EquationNode(node.__equation, node.__inline, node.__key);
  }
  constructor(equation, inline, key) {
    super(key);
    _defineProperty(this, "__equation", void 0);
    _defineProperty(this, "__inline", void 0);
    this.__equation = equation;
    this.__inline = inline ?? false;
  }
  static importJSON(serializedNode) {
    const node = $createEquationNode(serializedNode.equation, serializedNode.inline);
    return node;
  }
  exportJSON() {
    return {
      equation: this.getEquation(),
      inline: this.__inline,
      type: 'equation',
      version: 1
    };
  }
  createDOM(_config) {
    return document.createElement(this.__inline ? 'span' : 'div');
  }
  exportDOM() {
    const element = document.createElement(this.__inline ? 'span' : 'div');
    // Encode the equation as base64 to avoid issues with special characters
    const equation = btoa(this.__equation);
    element.setAttribute('data-lexical-equation', equation);
    element.setAttribute('data-lexical-inline', `${this.__inline}`);
    katex.render(this.__equation, element, {
      displayMode: !this.__inline,
      // true === block display //
      errorColor: '#cc0000',
      output: 'html',
      strict: 'warn',
      throwOnError: false,
      trust: false
    });
    return {
      element
    };
  }
  static importDOM() {
    return {
      div: domNode => {
        if (!domNode.hasAttribute('data-lexical-equation')) {
          return null;
        }
        return {
          conversion: convertEquationElement,
          priority: 2
        };
      },
      span: domNode => {
        if (!domNode.hasAttribute('data-lexical-equation')) {
          return null;
        }
        return {
          conversion: convertEquationElement,
          priority: 1
        };
      }
    };
  }
  updateDOM(prevNode) {
    // If the inline property changes, replace the element
    return this.__inline !== prevNode.__inline;
  }
  getTextContent() {
    return this.__equation;
  }
  getEquation() {
    return this.__equation;
  }
  setEquation(equation) {
    const writable = this.getWritable();
    writable.__equation = equation;
  }
  decorate() {
    return /*#__PURE__*/React.createElement(React.Suspense, {
      fallback: null
    }, /*#__PURE__*/React.createElement(EquationComponent$2, {
      equation: this.__equation,
      inline: this.__inline,
      nodeKey: this.__key
    }));
  }
}
function $createEquationNode(equation = '', inline = false) {
  const equationNode = new EquationNode(equation, inline);
  return lexical.$applyNodeReplacement(equationNode);
}
function $isEquationNode(node) {
  return node instanceof EquationNode;
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

function joinClasses(...args) {
  return args.filter(Boolean).join(' ');
}

function Button({
  'data-test-id': dataTestId,
  children,
  className,
  onClick,
  disabled,
  small,
  title
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    className: joinClasses('Button__root', disabled && 'Button__disabled', small && 'Button__small', className),
    onClick: onClick,
    title: title,
    "aria-label": title
  }, dataTestId && {
    'data-test-id': dataTestId
  }), children);
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function KatexRenderer({
  equation,
  inline,
  onClick
}) {
  const katexElementRef = React.useRef(null);
  React.useEffect(() => {
    const katexElement = katexElementRef.current;
    if (katexElement !== null) {
      katex.render(equation, katexElement, {
        displayMode: !inline,
        // true === block display //
        errorColor: '#cc0000',
        output: 'html',
        strict: 'warn',
        throwOnError: false,
        trust: false
      });
    }
  }, [equation, inline]);
  return (
    /*#__PURE__*/
    // We use spacers either side to ensure Android doesn't try and compose from the
    // inner text from Katex. There didn't seem to be any other way of making this work,
    // without having a physical space.
    React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: "spacer"
    }, " "), /*#__PURE__*/React.createElement("span", {
      role: "button",
      tabIndex: -1,
      onClick: onClick,
      ref: katexElementRef
    }), /*#__PURE__*/React.createElement("span", {
      className: "spacer"
    }, " "))
  );
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function KatexEquationAlterer({
  onConfirm,
  initialEquation = ''
}) {
  const [equation, setEquation] = React.useState(initialEquation);
  const [inline, setInline] = React.useState(true);
  const onClick = React.useCallback(() => {
    onConfirm(equation, inline);
  }, [onConfirm, equation, inline]);
  const onCheckboxChange = React.useCallback(() => {
    setInline(!inline);
  }, [setInline, inline]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "KatexEquationAlterer_defaultRow"
  }, "Inline", /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: inline,
    onChange: onCheckboxChange
  })), /*#__PURE__*/React.createElement("div", {
    className: "KatexEquationAlterer_defaultRow"
  }, "Equation "), /*#__PURE__*/React.createElement("div", {
    className: "KatexEquationAlterer_centerRow"
  }, inline ? /*#__PURE__*/React.createElement("input", {
    onChange: event => {
      setEquation(event.target.value);
    },
    value: equation,
    className: "KatexEquationAlterer_textArea"
  }) : /*#__PURE__*/React.createElement("textarea", {
    onChange: event => {
      setEquation(event.target.value);
    },
    value: equation,
    className: "KatexEquationAlterer_textArea"
  })), /*#__PURE__*/React.createElement("div", {
    className: "KatexEquationAlterer_defaultRow"
  }, "Visualization "), /*#__PURE__*/React.createElement("div", {
    className: "KatexEquationAlterer_centerRow"
  }, /*#__PURE__*/React.createElement(KatexRenderer, {
    equation: equation,
    inline: false,
    onClick: () => null
  })), /*#__PURE__*/React.createElement("div", {
    className: "KatexEquationAlterer_dialogActions"
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: onClick
  }, "Confirm")));
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const INSERT_EQUATION_COMMAND = lexical.createCommand('INSERT_EQUATION_COMMAND');
function InsertEquationDialog$1({
  activeEditor,
  onClose
}) {
  const onEquationConfirm = React.useCallback((equation, inline) => {
    activeEditor.dispatchCommand(INSERT_EQUATION_COMMAND, {
      equation,
      inline
    });
    onClose();
  }, [activeEditor, onClose]);
  return /*#__PURE__*/React.createElement(KatexEquationAlterer, {
    onConfirm: onEquationConfirm
  });
}
function EquationsPlugin() {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  React.useEffect(() => {
    if (!editor.hasNodes([EquationNode])) {
      throw new Error('EquationsPlugins: EquationsNode not registered on editor');
    }
    return editor.registerCommand(INSERT_EQUATION_COMMAND, payload => {
      const {
        equation,
        inline
      } = payload;
      const equationNode = $createEquationNode(equation, inline);
      lexical.$insertNodes([equationNode]);
      if (lexical.$isRootOrShadowRoot(equationNode.getParentOrThrow())) {
        utils.$wrapNodeInElement(equationNode, lexical.$createParagraphNode).selectEnd();
      }
      return true;
    }, lexical.COMMAND_PRIORITY_EDITOR);
  }, [editor]);
  return null;
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const DropDownContext = /*#__PURE__*/React.createContext(null);
function DropDownItem({
  children,
  className,
  onClick,
  title
}) {
  const ref = React.useRef(null);
  const dropDownContext = React.useContext(DropDownContext);
  if (dropDownContext === null) {
    throw new Error('DropDownItem must be used within a DropDown');
  }
  const {
    registerItem
  } = dropDownContext;
  React.useEffect(() => {
    if (ref && ref.current) {
      registerItem(ref);
    }
  }, [ref, registerItem]);
  return /*#__PURE__*/React.createElement("button", {
    className: className,
    onClick: onClick,
    ref: ref,
    title: title,
    type: "button"
  }, children);
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function InsertEquationDialog({
  activeEditor,
  onClose
}) {
  const onEquationConfirm = React.useCallback((equation, inline) => {
    activeEditor.dispatchCommand(INSERT_EQUATION_COMMAND, {
      equation,
      inline
    });
    onClose();
  }, [activeEditor, onClose]);
  return /*#__PURE__*/React.createElement(KatexEquationAlterer, {
    onConfirm: onEquationConfirm
  });
}
function EquationDropDownItem({
  activeEditor,
  showModal
}) {
  return /*#__PURE__*/React.createElement(DropDownItem, {
    onClick: () => {
      showModal('Insert Equation', onClose => /*#__PURE__*/React.createElement(InsertEquationDialog, {
        activeEditor: activeEditor,
        onClose: onClose
      }));
    },
    className: "item"
  }, /*#__PURE__*/React.createElement("i", {
    className: "icon equation"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, "Equation"));
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const EQUATION = {
  dependencies: [EquationNode],
  export: (node, exportChildren, exportFormat) => {
    if (!$isEquationNode(node)) {
      return null;
    }
    return `$${node.getEquation()}$`;
  },
  importRegExp: /\$([^$]+?)\$/,
  regExp: /\$([^$]+?)\$$/,
  replace: (textNode, match) => {
    const [, equation] = match;
    const equationNode = $createEquationNode(equation, true);
    textNode.replace(equationNode);
  },
  trigger: '$',
  type: 'text-match'
};

/* eslint-disable header/header */
const equationExt = {
  name: 'equation',
  node: EquationNode,
  plugin: EquationsPlugin,
  toolbarInsertAfter: EquationDropDownItem,
  transformer: EQUATION
};

function EquationEditor({
  equation,
  setEquation,
  inline,
  inputRef
}) {
  const onChange = event => {
    setEquation(event.target.value);
  };
  const props = {
    equation,
    inputRef,
    onChange
  };
  return inline ? /*#__PURE__*/React.createElement(InlineEquationEditor, _extends({}, props, {
    inputRef: inputRef
  })) : /*#__PURE__*/React.createElement(BlockEquationEditor, _extends({}, props, {
    inputRef: inputRef
  }));
}
function InlineEquationEditor({
  equation,
  onChange,
  inputRef
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "EquationEditor_inputBackground"
  }, /*#__PURE__*/React.createElement("span", {
    className: "EquationEditor_dollarSign"
  }, "$"), /*#__PURE__*/React.createElement("input", {
    className: "EquationEditor_inlineEditor",
    value: equation,
    onChange: onChange,
    autoFocus: true,
    ref: inputRef
  }), /*#__PURE__*/React.createElement("span", {
    className: "EquationEditor_dollarSign"
  }, "$"));
}
function BlockEquationEditor({
  equation,
  onChange,
  inputRef
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "EquationEditor_inputBackground"
  }, /*#__PURE__*/React.createElement("span", {
    className: "EquationEditor_dollarSign"
  }, '$$\n'), /*#__PURE__*/React.createElement("textarea", {
    className: "EquationEditor_blockEditor",
    value: equation,
    onChange: onChange,
    ref: inputRef
  }), /*#__PURE__*/React.createElement("span", {
    className: "EquationEditor_dollarSign"
  }, '\n$$'));
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function EquationComponent({
  equation,
  inline,
  nodeKey
}) {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const [equationValue, setEquationValue] = React.useState(equation);
  const [showEquationEditor, setShowEquationEditor] = React.useState(false);
  const inputRef = React.useRef(null);
  const onHide = React.useCallback(restoreSelection => {
    setShowEquationEditor(false);
    editor.update(() => {
      const node = lexical.$getNodeByKey(nodeKey);
      if ($isEquationNode(node)) {
        node.setEquation(equationValue);
        if (restoreSelection) {
          node.selectNext(0, 0);
        }
      }
    });
  }, [editor, equationValue, nodeKey]);
  React.useEffect(() => {
    if (!showEquationEditor && equationValue !== equation) {
      setEquationValue(equation);
    }
  }, [showEquationEditor, equation, equationValue]);
  React.useEffect(() => {
    if (showEquationEditor) {
      return utils.mergeRegister(editor.registerCommand(lexical.SELECTION_CHANGE_COMMAND, payload => {
        const activeElement = document.activeElement;
        const inputElem = inputRef.current;
        if (inputElem !== activeElement) {
          onHide();
        }
        return false;
      }, lexical.COMMAND_PRIORITY_HIGH), editor.registerCommand(lexical.KEY_ESCAPE_COMMAND, payload => {
        const activeElement = document.activeElement;
        const inputElem = inputRef.current;
        if (inputElem === activeElement) {
          onHide(true);
          return true;
        }
        return false;
      }, lexical.COMMAND_PRIORITY_HIGH));
    } else {
      return editor.registerUpdateListener(({
        editorState
      }) => {
        const isSelected = editorState.read(() => {
          const selection = lexical.$getSelection();
          return lexical.$isNodeSelection(selection) && selection.has(nodeKey) && selection.getNodes().length === 1;
        });
        if (isSelected) {
          setShowEquationEditor(true);
        }
      });
    }
  }, [editor, nodeKey, onHide, showEquationEditor]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, showEquationEditor ? /*#__PURE__*/React.createElement(EquationEditor, {
    equation: equationValue,
    setEquation: setEquationValue,
    inline: inline,
    inputRef: inputRef
  }) : /*#__PURE__*/React.createElement(KatexRenderer, {
    equation: equationValue,
    inline: inline,
    onClick: () => {
      setShowEquationEditor(true);
    }
  }));
}

var EquationComponent$1 = {
  __proto__: null,
  'default': EquationComponent
};

exports.$createEquationNode = $createEquationNode;
exports.$isEquationNode = $isEquationNode;
exports.EquationNode = EquationNode;
exports.INSERT_EQUATION_COMMAND = INSERT_EQUATION_COMMAND;
exports.InsertEquationDialog = InsertEquationDialog$1;
exports.equationExt = equationExt;
