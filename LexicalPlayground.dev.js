/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

var html = require('@lexical/html');
var LexicalAutoFocusPlugin = require('@lexical/react/LexicalAutoFocusPlugin');
var LexicalCharacterLimitPlugin = require('@lexical/react/LexicalCharacterLimitPlugin');
var LexicalCheckListPlugin = require('@lexical/react/LexicalCheckListPlugin');
var LexicalClearEditorPlugin = require('@lexical/react/LexicalClearEditorPlugin');
var LexicalCollaborationPlugin = require('@lexical/react/LexicalCollaborationPlugin');
var LexicalComposerContext = require('@lexical/react/LexicalComposerContext');
var LexicalErrorBoundary = require('@lexical/react/LexicalErrorBoundary');
var LexicalHashtagPlugin = require('@lexical/react/LexicalHashtagPlugin');
var LexicalHistoryPlugin = require('@lexical/react/LexicalHistoryPlugin');
var LexicalHorizontalRulePlugin = require('@lexical/react/LexicalHorizontalRulePlugin');
var LexicalListPlugin = require('@lexical/react/LexicalListPlugin');
var LexicalOnChangePlugin = require('@lexical/react/LexicalOnChangePlugin');
var LexicalPlainTextPlugin = require('@lexical/react/LexicalPlainTextPlugin');
var LexicalRichTextPlugin = require('@lexical/react/LexicalRichTextPlugin');
var LexicalTabIndentationPlugin = require('@lexical/react/LexicalTabIndentationPlugin');
var LexicalTablePlugin = require('@lexical/react/LexicalTablePlugin');
var React = require('react');
var code = require('@lexical/code');
var markdown = require('@lexical/markdown');
var LexicalCollaborationContext = require('@lexical/react/LexicalCollaborationContext');
var utils = require('@lexical/utils');
var yjs$1 = require('@lexical/yjs');
var lexical = require('lexical');
var ReactDOM = require('react-dom');
var LexicalHorizontalRuleNode = require('@lexical/react/LexicalHorizontalRuleNode');
var table = require('@lexical/table');
var LexicalBlockWithAlignableContents = require('@lexical/react/LexicalBlockWithAlignableContents');
var LexicalDecoratorBlockNode = require('@lexical/react/LexicalDecoratorBlockNode');
var selection = require('@lexical/selection');
var LexicalAutoEmbedPlugin = require('@lexical/react/LexicalAutoEmbedPlugin');
var LexicalAutoLinkPlugin$1 = require('@lexical/react/LexicalAutoLinkPlugin');
var link = require('@lexical/link');
var lodash = require('lodash');
var mark = require('@lexical/mark');
var LexicalComposer = require('@lexical/react/LexicalComposer');
var text = require('@lexical/text');
var yjs = require('yjs');
var list = require('@lexical/list');
var LexicalTypeaheadMenuPlugin = require('@lexical/react/LexicalTypeaheadMenuPlugin');
var richText = require('@lexical/rich-text');
var LexicalMarkdownShortcutPlugin = require('@lexical/react/LexicalMarkdownShortcutPlugin');
var useLexicalEditable = require('@lexical/react/useLexicalEditable');
var LexicalTableOfContents__EXPERIMENTAL = require('@lexical/react/LexicalTableOfContents__EXPERIMENTAL');
var hashtag = require('@lexical/hashtag');
var overflow = require('@lexical/overflow');
var useDebounce$1 = require('use-debounce');
var LexicalNestedComposer = require('@lexical/react/LexicalNestedComposer');
var useLexicalNodeSelection = require('@lexical/react/useLexicalNodeSelection');
var useLexicalTextEntity = require('@lexical/react/useLexicalTextEntity');
var LexicalLinkPlugin = require('@lexical/react/LexicalLinkPlugin');
var LexicalTreeView = require('@lexical/react/LexicalTreeView');
var clipboard = require('@lexical/clipboard');
var yWebsocket = require('y-websocket');
var LexicalContentEditable$1 = require('@lexical/react/LexicalContentEditable');

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const CAN_USE_DOM = typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined';

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const WEBSOCKET_ENDPOINT = params.get('collabEndpoint') || 'ws://localhost:1234';
const WEBSOCKET_SLUG = 'playground';
const WEBSOCKET_ID = params.get('collabId') || '0';

// parent dom -> child doc
function createWebsocketProvider(id, yjsDocMap) {
  let doc = yjsDocMap.get(id);
  if (doc === undefined) {
    doc = new yjs.Doc();
    yjsDocMap.set(id, doc);
  } else {
    doc.load();
  }
  return new yWebsocket.WebsocketProvider(WEBSOCKET_ENDPOINT, WEBSOCKET_SLUG + '/' + WEBSOCKET_ID + '/' + id, doc, {
    connect: false
  });
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const Context$2 = /*#__PURE__*/React.createContext({});
const SharedHistoryContext = ({
  children
}) => {
  const historyContext = React.useMemo(() => ({
    historyState: LexicalHistoryPlugin.createEmptyHistoryState()
  }), []);
  return /*#__PURE__*/React.createElement(Context$2.Provider, {
    value: historyContext
  }, children);
};
const useSharedHistoryContext = () => {
  return React.useContext(Context$2);
};

/* eslint-disable header/header */
const EditorComposerContext = /*#__PURE__*/React.createContext(null);
function useEditorComposerContext() {
  const editorContext = React.useContext(EditorComposerContext);
  if (editorContext == null) {
    {
      throw Error(`Cannot find an EditorComposerContext`);
    }
  }
  return editorContext;
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function PortalImpl({
  onClose,
  children,
  title,
  closeOnClickOutside
}) {
  const modalRef = React.useRef(null);
  React.useEffect(() => {
    if (modalRef.current !== null) {
      modalRef.current.focus();
    }
  }, []);
  React.useEffect(() => {
    let modalOverlayElement = null;
    const handler = event => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    const clickOutsideHandler = event => {
      const target = event.target;
      if (modalRef.current !== null && !modalRef.current.contains(target) && closeOnClickOutside) {
        onClose();
      }
    };
    const modelElement = modalRef.current;
    if (modelElement !== null) {
      modalOverlayElement = modelElement.parentElement;
      if (modalOverlayElement !== null) {
        modalOverlayElement.addEventListener('click', clickOutsideHandler);
      }
    }
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
      if (modalOverlayElement !== null) {
        modalOverlayElement?.removeEventListener('click', clickOutsideHandler);
      }
    };
  }, [closeOnClickOutside, onClose]);
  return /*#__PURE__*/React.createElement("div", {
    className: "Modal__overlay",
    role: "dialog"
  }, /*#__PURE__*/React.createElement("div", {
    className: "Modal__modal",
    tabIndex: -1,
    ref: modalRef
  }, /*#__PURE__*/React.createElement("h2", {
    className: "Modal__title"
  }, title), /*#__PURE__*/React.createElement("button", {
    className: "Modal__closeButton",
    "aria-label": "Close modal",
    type: "button",
    onClick: onClose
  }, "X"), /*#__PURE__*/React.createElement("div", {
    className: "Modal__content"
  }, children)));
}
function Modal({
  onClose,
  children,
  title,
  closeOnClickOutside = false
}) {
  return /*#__PURE__*/ReactDOM.createPortal(/*#__PURE__*/React.createElement(PortalImpl, {
    onClose: onClose,
    title: title,
    closeOnClickOutside: closeOnClickOutside
  }, children), document.body);
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function useModal() {
  const [modalContent, setModalContent] = React.useState(null);
  const onClose = React.useCallback(() => {
    setModalContent(null);
  }, []);
  const modal = React.useMemo(() => {
    if (modalContent === null) {
      return null;
    }
    const {
      title,
      content,
      closeOnClickOutside
    } = modalContent;
    return /*#__PURE__*/React.createElement(Modal, {
      onClose: onClose,
      title: title,
      closeOnClickOutside: closeOnClickOutside
    }, content);
  }, [modalContent, onClose]);
  const showModal = React.useCallback((title, getContent, closeOnClickOutside = false) => {
    setModalContent({
      closeOnClickOutside,
      content: getContent(onClose),
      title
    });
  }, [onClose]);
  return [modal, showModal];
}

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

/* eslint-disable header/header */
const useIsShownDelayed = (delayMs = 400) => {
  const [isShown, setIsShown] = React.useState(false);
  React.useEffect(() => {
    let isMounted = true;
    setTimeout(() => {
      if (isMounted) setIsShown(true);
    }, delayMs);
    return () => {
      isMounted = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return isShown;
};
function ImageSpinner() {
  const isShown = useIsShownDelayed();
  if (!isShown) return null;
  return /*#__PURE__*/React.createElement("svg", {
    className: "image-spinner",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "12",
    fill: "rgba(0 0 0 / .6)"
  }), /*#__PURE__*/React.createElement("circle", {
    className: "circle",
    cx: "12",
    cy: "12",
    r: "9",
    fill: "none",
    strokeWidth: "3"
  }));
}

const ImageComponent$2 = /*#__PURE__*/React.lazy(
// @ts-ignore
() => Promise.resolve().then(function () { return ImageComponent$1; }));
function convertImageElement(domNode) {
  if (domNode instanceof HTMLImageElement) {
    const {
      alt: altText,
      src,
      width,
      height
    } = domNode;
    const node = $createImageNode({
      altText,
      height,
      src,
      width
    });
    return {
      node
    };
  }
  return null;
}
const genClassName = theme => {
  return joinClasses(theme.image, 'editor-image');
};
class ImageNode extends lexical.DecoratorNode {
  // Captions cannot yet be used within editor cells

  static getType() {
    return 'image';
  }
  static clone(node) {
    return new ImageNode(node.__src, node.__altText, node.__maxWidth, node.__width, node.__height, node.__showCaption, node.__caption, node.__captionsEnabled, node.__key, node.__file);
  }
  static importJSON(serializedNode) {
    const {
      altText,
      height,
      width,
      maxWidth,
      caption,
      src,
      showCaption
    } = serializedNode;
    const node = $createImageNode({
      altText,
      height,
      maxWidth,
      showCaption,
      src,
      width
    });
    const nestedEditor = node.__caption;
    const editorState = nestedEditor.parseEditorState(caption.editorState);
    if (!editorState.isEmpty()) {
      nestedEditor.setEditorState(editorState);
    }
    return node;
  }
  exportDOM(editor) {
    const className = genClassName(editor._config.theme);
    const element = document.createElement('img');
    element.className = className;
    element.setAttribute('src', this.__src);
    element.setAttribute('alt', this.__altText);
    element.setAttribute('width', this.__width.toString());
    element.setAttribute('height', this.__height.toString());
    return {
      element
    };
  }
  static importDOM() {
    return {
      img: node => ({
        conversion: convertImageElement,
        priority: 0
      })
    };
  }
  constructor(src, altText, maxWidth, width, height, showCaption, caption, captionsEnabled, key, file) {
    super(key);
    _defineProperty(this, "__src", void 0);
    _defineProperty(this, "__altText", void 0);
    _defineProperty(this, "__width", void 0);
    _defineProperty(this, "__height", void 0);
    _defineProperty(this, "__maxWidth", void 0);
    _defineProperty(this, "__showCaption", void 0);
    _defineProperty(this, "__caption", void 0);
    _defineProperty(this, "__captionsEnabled", void 0);
    _defineProperty(this, "__file", void 0);
    this.__src = src;
    this.__altText = altText;
    this.__maxWidth = maxWidth;
    this.__width = width || 'inherit';
    this.__height = height || 'inherit';
    this.__showCaption = showCaption || false;
    this.__caption = caption || lexical.createEditor();
    this.__captionsEnabled = captionsEnabled || captionsEnabled === undefined;
    this.__file = file;
  }
  exportJSON() {
    return {
      altText: this.getAltText(),
      caption: this.__caption.toJSON(),
      height: this.__height === 'inherit' ? 0 : this.__height,
      maxWidth: this.__maxWidth,
      showCaption: this.__showCaption,
      src: this.getSrc(),
      type: 'image',
      version: 1,
      width: this.__width === 'inherit' ? 0 : this.__width
    };
  }
  setWidthAndHeight(width, height) {
    const writable = this.getWritable();
    writable.__width = width;
    writable.__height = height;
  }
  setShowCaption(showCaption) {
    const writable = this.getWritable();
    writable.__showCaption = showCaption;
  }
  setSrc(src) {
    const writable = this.getWritable();
    writable.__src = src;
  }
  setFile(file) {
    const writable = this.getWritable();
    writable.__file = file;
  }
  // View

  createDOM(config) {
    const span = document.createElement('span');
    const theme = config.theme;
    const className = genClassName(theme);
    if (className !== undefined) {
      span.className = className;
    }
    return span;
  }
  updateDOM() {
    return false;
  }
  getSrc() {
    return this.__src;
  }
  getAltText() {
    return this.__altText;
  }
  getFile() {
    return this.__file;
  }
  decorate() {
    return /*#__PURE__*/React.createElement(React.Suspense, {
      fallback: null
    }, /*#__PURE__*/React.createElement(ImageComponent$2, {
      src: this.__src,
      altText: this.__altText,
      width: this.__width,
      height: this.__height,
      maxWidth: this.__maxWidth,
      nodeKey: this.getKey(),
      showCaption: this.__showCaption,
      caption: this.__caption,
      captionsEnabled: this.__captionsEnabled,
      resizable: true
    }), this.__file && /*#__PURE__*/React.createElement(ImageSpinner, null));
  }
}
function $createImageNode({
  altText,
  height,
  maxWidth = 500,
  captionsEnabled,
  src,
  width,
  showCaption,
  caption,
  key,
  file
}) {
  return lexical.$applyNodeReplacement(new ImageNode(src, altText, maxWidth, width, height, showCaption, caption, captionsEnabled, key, file));
}
function $isImageNode(node) {
  return node instanceof ImageNode;
}

const WIDGET_SCRIPT_URL = 'https://platform.twitter.com/widgets.js';
function convertTweetElement(domNode) {
  const id = domNode.getAttribute('data-lexical-tweet-id');
  if (id) {
    const node = $createTweetNode(id);
    return {
      node
    };
  }
  return null;
}
let isTwitterScriptLoading = true;
function TweetComponent({
  className,
  format,
  loadingComponent,
  nodeKey,
  onError,
  onLoad,
  tweetID
}) {
  const containerRef = React.useRef(null);
  const previousTweetIDRef = React.useRef('');
  const [isTweetLoading, setIsTweetLoading] = React.useState(false);
  const createTweet = React.useCallback(async () => {
    try {
      // @ts-expect-error Twitter is attached to the window.
      await window.twttr.widgets.createTweet(tweetID, containerRef.current);
      setIsTweetLoading(false);
      isTwitterScriptLoading = false;
      if (onLoad) {
        onLoad();
      }
    } catch (error) {
      if (onError) {
        onError(String(error));
      }
    }
  }, [onError, onLoad, tweetID]);
  React.useEffect(() => {
    if (tweetID !== previousTweetIDRef.current) {
      setIsTweetLoading(true);
      if (isTwitterScriptLoading) {
        const script = document.createElement('script');
        script.src = WIDGET_SCRIPT_URL;
        script.async = true;
        document.body?.appendChild(script);
        script.onload = createTweet;
        if (onError) {
          script.onerror = onError;
        }
      } else {
        createTweet();
      }
      if (previousTweetIDRef) {
        previousTweetIDRef.current = tweetID;
      }
    }
  }, [createTweet, onError, tweetID]);
  return /*#__PURE__*/React.createElement(LexicalBlockWithAlignableContents.BlockWithAlignableContents, {
    className: className,
    format: format,
    nodeKey: nodeKey
  }, isTweetLoading ? loadingComponent : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-block',
      width: '550px'
    },
    ref: containerRef
  }));
}
class TweetNode extends LexicalDecoratorBlockNode.DecoratorBlockNode {
  static getType() {
    return 'tweet';
  }
  static clone(node) {
    return new TweetNode(node.__id, node.__format, node.__key);
  }
  static importJSON(serializedNode) {
    const node = $createTweetNode(serializedNode.id);
    node.setFormat(serializedNode.format);
    return node;
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      id: this.getId(),
      type: 'tweet',
      version: 1
    };
  }
  static importDOM() {
    return {
      div: domNode => {
        if (!domNode.hasAttribute('data-lexical-tweet-id')) {
          return null;
        }
        return {
          conversion: convertTweetElement,
          priority: 2
        };
      }
    };
  }
  exportDOM() {
    const element = document.createElement('div');
    element.setAttribute('data-lexical-tweet-id', this.__id);
    const text = document.createTextNode(this.getTextContent());
    element.append(text);
    return {
      element
    };
  }
  constructor(id, format, key) {
    super(format, key);
    _defineProperty(this, "__id", void 0);
    this.__id = id;
  }
  getId() {
    return this.__id;
  }
  getTextContent(_includeInert, _includeDirectionless) {
    return `https://twitter.com/i/web/status/${this.__id}`;
  }
  decorate(editor, config) {
    const embedBlockTheme = config.theme.embedBlock || {};
    const className = {
      base: embedBlockTheme.base || '',
      focus: embedBlockTheme.focus || ''
    };
    return /*#__PURE__*/React.createElement(TweetComponent, {
      className: className,
      format: this.__format,
      loadingComponent: "Loading...",
      nodeKey: this.getKey(),
      tweetID: this.__id
    });
  }
  isInline() {
    return false;
  }
}
function $createTweetNode(tweetID) {
  return new TweetNode(tweetID);
}
function $isTweetNode(node) {
  return node instanceof TweetNode;
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const HR = {
  dependencies: [LexicalHorizontalRuleNode.HorizontalRuleNode],
  export: node => {
    return LexicalHorizontalRuleNode.$isHorizontalRuleNode(node) ? '***' : null;
  },
  regExp: /^(---|\*\*\*|___)\s?$/,
  replace: (parentNode, _1, _2, isImport) => {
    const line = LexicalHorizontalRuleNode.$createHorizontalRuleNode();

    // TODO: Get rid of isImport flag
    if (isImport || parentNode.getNextSibling() != null) {
      parentNode.replace(line);
    } else {
      parentNode.insertBefore(line);
    }
    line.selectNext();
  },
  type: 'element'
};
const IMAGE = {
  dependencies: [ImageNode],
  export: (node, exportChildren, exportFormat) => {
    if (!$isImageNode(node)) {
      return null;
    }
    return `![${node.getAltText()}](${node.getSrc()})`;
  },
  importRegExp: /!(?:\[([^[]*)\])(?:\(([^(]+)\))/,
  regExp: /!(?:\[([^[]*)\])(?:\(([^(]+)\))$/,
  replace: (textNode, match) => {
    const [, altText, src] = match;
    const imageNode = $createImageNode({
      altText,
      maxWidth: 800,
      src
    });
    textNode.replace(imageNode);
  },
  trigger: ')',
  type: 'text-match'
};
const TWEET = {
  dependencies: [TweetNode],
  export: node => {
    if (!$isTweetNode(node)) {
      return null;
    }
    return `<tweet id="${node.getId()}" />`;
  },
  regExp: /<tweet id="([^"]+?)"\s?\/>\s?$/,
  replace: (textNode, _1, match) => {
    const [, id] = match;
    const tweetNode = $createTweetNode(id);
    textNode.replace(tweetNode);
  },
  type: 'element'
};

// Very primitive table setup
const TABLE_ROW_REG_EXP = /^(?:\|)(.+)(?:\|)\s?$/;
const TABLE = {
  // TODO: refactor transformer for new TableNode
  dependencies: [table.TableNode, table.TableRowNode, table.TableCellNode],
  export: (node, exportChildren) => {
    if (!table.$isTableNode(node)) {
      return null;
    }
    const output = [];
    for (const row of node.getChildren()) {
      const rowOutput = [];
      if (table.$isTableRowNode(row)) {
        for (const cell of row.getChildren()) {
          // It's TableCellNode (hence ElementNode) so it's just to make flow happy
          if (lexical.$isElementNode(cell)) {
            rowOutput.push(exportChildren(cell));
          }
        }
      }
      output.push(`| ${rowOutput.join(' | ')} |`);
    }
    return output.join('\n');
  },
  regExp: TABLE_ROW_REG_EXP,
  replace: (parentNode, _1, match) => {
    const matchCells = mapToTableCells(match[0]);
    if (matchCells == null) {
      return;
    }
    const rows = [matchCells];
    let sibling = parentNode.getPreviousSibling();
    let maxCells = matchCells.length;
    while (sibling) {
      if (!lexical.$isParagraphNode(sibling)) {
        break;
      }
      if (sibling.getChildrenSize() !== 1) {
        break;
      }
      const firstChild = sibling.getFirstChild();
      if (!lexical.$isTextNode(firstChild)) {
        break;
      }
      const cells = mapToTableCells(firstChild.getTextContent());
      if (cells == null) {
        break;
      }
      maxCells = Math.max(maxCells, cells.length);
      rows.unshift(cells);
      const previousSibling = sibling.getPreviousSibling();
      sibling.remove();
      sibling = previousSibling;
    }
    const table$1 = table.$createTableNode();
    for (const cells of rows) {
      const tableRow = table.$createTableRowNode();
      table$1.append(tableRow);
      for (let i = 0; i < maxCells; i++) {
        tableRow.append(i < cells.length ? cells[i] : createTableCell(null));
      }
    }
    const previousSibling = parentNode.getPreviousSibling();
    if (table.$isTableNode(previousSibling) && getTableColumnsSize(previousSibling) === maxCells) {
      previousSibling.append(...table$1.getChildren());
      parentNode.remove();
    } else {
      parentNode.replace(table$1);
    }
    table$1.selectEnd();
  },
  type: 'element'
};
function getTableColumnsSize(table$1) {
  const row = table$1.getFirstChild();
  return table.$isTableRowNode(row) ? row.getChildrenSize() : 0;
}
const createTableCell = textContent => {
  const cell = table.$createTableCellNode(table.TableCellHeaderStates.NO_STATUS);
  const paragraph = lexical.$createParagraphNode();
  if (textContent != null) {
    paragraph.append(lexical.$createTextNode(textContent.trim()));
  }
  cell.append(paragraph);
  return cell;
};
const mapToTableCells = textContent => {
  // TODO:
  // For now plain text, single node. Can be expanded to more complex content
  // including formatted text
  const match = textContent.match(TABLE_ROW_REG_EXP);
  if (!match || !match[1]) {
    return null;
  }
  return match[1].split('|').map(text => createTableCell(text));
};
const PLAYGROUND_TRANSFORMERS = [TABLE, HR, IMAGE, TWEET, markdown.CHECK_LIST, ...markdown.ELEMENT_TRANSFORMERS, ...markdown.TEXT_FORMAT_TRANSFORMERS, ...markdown.TEXT_MATCH_TRANSFORMERS];

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
async function validateEditorState(editor) {
  const stringifiedEditorState = JSON.stringify(editor.getEditorState());
  let response = null;
  try {
    response = await fetch('http://localhost:1235/validateEditorState', {
      body: stringifiedEditorState,
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      method: 'POST'
    });
  } catch {
    // NO-OP
  }
  if (response !== null && response.status === 403) {
    throw new Error('Editor state validation failed! Server did not accept changes.');
  }
}
function ActionsPlugin({
  isRichText
}) {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const [isEditable, setIsEditable] = React.useState(() => editor.isEditable());
  React.useState(false);
  const [connected, setConnected] = React.useState(false);
  const [isEditorEmpty, setIsEditorEmpty] = React.useState(true);
  const [modal, showModal] = useModal();
  const {
    isCollabActive
  } = LexicalCollaborationContext.useCollaborationContext();
  React.useEffect(() => {
    return utils.mergeRegister(editor.registerEditableListener(editable => {
      setIsEditable(editable);
    }), editor.registerCommand(yjs$1.CONNECTED_COMMAND, payload => {
      const isConnected = payload;
      setConnected(isConnected);
      return false;
    }, lexical.COMMAND_PRIORITY_EDITOR));
  }, [editor]);
  React.useEffect(() => {
    return editor.registerUpdateListener(({
      dirtyElements,
      prevEditorState,
      tags
    }) => {
      // If we are in read only mode, send the editor state
      // to server and ask for validation if possible.
      if (!isEditable && dirtyElements.size > 0 && !tags.has('historic') && !tags.has('collaboration')) {
        validateEditorState(editor);
      }
      editor.getEditorState().read(() => {
        const root = lexical.$getRoot();
        const children = root.getChildren();
        if (children.length > 1) {
          setIsEditorEmpty(false);
        } else {
          if (lexical.$isParagraphNode(children[0])) {
            const paragraphChildren = children[0].getChildren();
            setIsEditorEmpty(paragraphChildren.length === 0);
          } else {
            setIsEditorEmpty(false);
          }
        }
      });
    });
  }, [editor, isEditable]);
  const handleMarkdownToggle = React.useCallback(() => {
    editor.update(() => {
      const root = lexical.$getRoot();
      const firstChild = root.getFirstChild();
      if (code.$isCodeNode(firstChild) && firstChild.getLanguage() === 'markdown') {
        markdown.$convertFromMarkdownString(firstChild.getTextContent(), PLAYGROUND_TRANSFORMERS);
      } else {
        const markdown$1 = markdown.$convertToMarkdownString(PLAYGROUND_TRANSFORMERS);
        root.clear().append(code.$createCodeNode('markdown').append(lexical.$createTextNode(markdown$1)));
      }
      root.selectEnd();
    });
  }, [editor]);
  return /*#__PURE__*/React.createElement("div", {
    className: "actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "action-button",
    type: "button",
    onClick: handleMarkdownToggle,
    title: "Convert From Markdown",
    "aria-label": "Convert from markdown"
  }, /*#__PURE__*/React.createElement("i", {
    className: "markdown"
  })), isCollabActive && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "action-button connect",
    onClick: () => {
      editor.dispatchCommand(yjs$1.TOGGLE_CONNECT_COMMAND, !connected);
    },
    title: `${connected ? 'Disconnect' : 'Connect'} Collaborative Editing`,
    "aria-label": `${connected ? 'Disconnect from' : 'Connect to'} a collaborative editing server`
  }, /*#__PURE__*/React.createElement("i", {
    className: connected ? 'disconnect' : 'connect'
  })), modal);
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const Context$1 = /*#__PURE__*/React.createContext([_cb => () => {
  return;
}, _newSuggestion => {
  return;
}]);
const SharedAutocompleteContext = ({
  children
}) => {
  const context = React.useMemo(() => {
    let suggestion = null;
    const listeners = new Set();
    return [cb => {
      cb(suggestion);
      listeners.add(cb);
      return () => {
        listeners.delete(cb);
      };
    }, newSuggestion => {
      suggestion = newSuggestion;
      for (const listener of listeners) {
        listener(newSuggestion);
      }
    }];
  }, []);
  return /*#__PURE__*/React.createElement(Context$1.Provider, {
    value: context
  }, children);
};
const useSharedAutocompleteContext = () => {
  const [subscribe, publish] = React.useContext(Context$1);
  const [suggestion, setSuggestion] = React.useState(null);
  React.useEffect(() => {
    return subscribe(newSuggestion => {
      setSuggestion(newSuggestion);
    });
  }, [subscribe]);
  return [suggestion, publish];
};

class AutocompleteNode extends lexical.DecoratorNode {
  // TODO add comment

  static clone(node) {
    return new AutocompleteNode(node.__key);
  }
  static getType() {
    return 'autocomplete';
  }
  static importJSON(serializedNode) {
    const node = $createAutocompleteNode(serializedNode.uuid);
    return node;
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      type: 'autocomplete',
      uuid: this.__uuid,
      version: 1
    };
  }
  constructor(uuid, key) {
    super(key);
    _defineProperty(this, "__uuid", void 0);
    this.__uuid = uuid;
  }
  updateDOM(prevNode, dom, config) {
    return false;
  }
  createDOM(config) {
    return document.createElement('span');
  }
  decorate() {
    if (this.__uuid !== uuid) {
      return null;
    }
    return /*#__PURE__*/React.createElement(AutocompleteComponent, null);
  }
}
function $createAutocompleteNode(uuid) {
  return new AutocompleteNode(uuid);
}
function AutocompleteComponent() {
  const [suggestion] = useSharedAutocompleteContext();
  const userAgentData = window.navigator.userAgentData;
  const isMobile = userAgentData !== undefined ? userAgentData.mobile : window.innerWidth <= 800 && window.innerHeight <= 600;
  // TODO Move to theme
  return /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ccc'
    },
    spellCheck: "false"
  }, suggestion, " ", isMobile ? '(SWIPE \u2B95)' : '(TAB)');
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const elements = new WeakMap();
function readTouch(e) {
  const touch = e.changedTouches[0];
  if (touch === undefined) {
    return null;
  }
  return [touch.clientX, touch.clientY];
}
function addListener(element, cb) {
  let elementValues = elements.get(element);
  if (elementValues === undefined) {
    const listeners = new Set();
    const handleTouchstart = e => {
      if (elementValues !== undefined) {
        elementValues.start = readTouch(e);
      }
    };
    const handleTouchend = e => {
      if (elementValues === undefined) {
        return;
      }
      const start = elementValues.start;
      if (start === null) {
        return;
      }
      const end = readTouch(e);
      for (const listener of listeners) {
        if (end !== null) {
          listener([end[0] - start[0], end[1] - start[1]], e);
        }
      }
    };
    element.addEventListener('touchstart', handleTouchstart);
    element.addEventListener('touchend', handleTouchend);
    elementValues = {
      handleTouchend,
      handleTouchstart,
      listeners,
      start: null
    };
    elements.set(element, elementValues);
  }
  elementValues.listeners.add(cb);
  return () => deleteListener(element, cb);
}
function deleteListener(element, cb) {
  const elementValues = elements.get(element);
  if (elementValues === undefined) {
    return;
  }
  const listeners = elementValues.listeners;
  listeners.delete(cb);
  if (listeners.size === 0) {
    elements.delete(element);
    element.removeEventListener('touchstart', elementValues.handleTouchstart);
    element.removeEventListener('touchend', elementValues.handleTouchend);
  }
}
function addSwipeRightListener(element, cb) {
  return addListener(element, (force, e) => {
    const [x, y] = force;
    if (x > 0 && x > Math.abs(y)) {
      cb(x, e);
    }
  });
}

const uuid = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

// TODO lookup should be custom
function $search(selection$1) {
  if (!lexical.$isRangeSelection(selection$1) || !selection$1.isCollapsed()) {
    return [false, ''];
  }
  const node = selection$1.getNodes()[0];
  const anchor = selection$1.anchor;
  // Check siblings?
  if (!lexical.$isTextNode(node) || !node.isSimpleText() || !selection.$isAtNodeEnd(anchor)) {
    return [false, ''];
  }
  const word = [];
  const text = node.getTextContent();
  let i = node.getTextContentSize();
  let c;
  while (i-- && i >= 0 && (c = text[i]) !== ' ') {
    word.push(c);
  }
  if (word.length === 0) {
    return [false, ''];
  }
  return [true, word.reverse().join('')];
}

// TODO query should be custom
function useQuery() {
  return React.useCallback(searchText => {
    const server = new AutocompleteServer();
    console.time('query');
    const response = server.query(searchText);
    console.timeEnd('query');
    return response;
  }, []);
}
function AutocompletePlugin() {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const [, setSuggestion] = useSharedAutocompleteContext();
  const query = useQuery();
  React.useEffect(() => {
    let autocompleteNodeKey = null;
    let lastMatch = null;
    let lastSuggestion = null;
    let searchPromise = null;
    function $clearSuggestion() {
      const autocompleteNode = autocompleteNodeKey !== null ? lexical.$getNodeByKey(autocompleteNodeKey) : null;
      if (autocompleteNode !== null && autocompleteNode.isAttached()) {
        autocompleteNode.remove();
        autocompleteNodeKey = null;
      }
      if (searchPromise !== null) {
        searchPromise.dismiss();
        searchPromise = null;
      }
      lastMatch = null;
      lastSuggestion = null;
      setSuggestion(null);
    }
    function updateAsyncSuggestion(refSearchPromise, newSuggestion) {
      if (searchPromise !== refSearchPromise || newSuggestion === null) {
        // Outdated or no suggestion
        return;
      }
      editor.update(() => {
        const selection = lexical.$getSelection();
        const [hasMatch, match] = $search(selection);
        if (!hasMatch || match !== lastMatch || !lexical.$isRangeSelection(selection)) {
          // Outdated
          return;
        }
        const selectionCopy = selection.clone();
        const node = $createAutocompleteNode(uuid);
        autocompleteNodeKey = node.getKey();
        selection.insertNodes([node]);
        lexical.$setSelection(selectionCopy);
        lastSuggestion = newSuggestion;
        setSuggestion(newSuggestion);
      }, {
        tag: 'history-merge'
      });
    }
    function handleAutocompleteNodeTransform(node) {
      const key = node.getKey();
      if (node.__uuid === uuid && key !== autocompleteNodeKey) {
        // Max one Autocomplete node per session
        $clearSuggestion();
      }
    }
    function handleUpdate() {
      editor.update(() => {
        const selection = lexical.$getSelection();
        const [hasMatch, match] = $search(selection);
        if (!hasMatch) {
          $clearSuggestion();
          return;
        }
        if (match === lastMatch) {
          return;
        }
        $clearSuggestion();
        searchPromise = query(match);
        searchPromise.promise.then(newSuggestion => {
          if (searchPromise !== null) {
            updateAsyncSuggestion(searchPromise, newSuggestion);
          }
        }).catch(e => {
          console.error(e);
        });
        lastMatch = match;
      });
    }
    function $handleAutocompleteIntent() {
      if (lastSuggestion === null || autocompleteNodeKey === null) {
        return false;
      }
      const autocompleteNode = lexical.$getNodeByKey(autocompleteNodeKey);
      if (autocompleteNode === null) {
        return false;
      }
      const textNode = lexical.$createTextNode(lastSuggestion);
      autocompleteNode.replace(textNode);
      textNode.selectNext();
      $clearSuggestion();
      return true;
    }
    function $handleKeypressCommand(e) {
      if ($handleAutocompleteIntent()) {
        e.preventDefault();
        return true;
      }
      return false;
    }
    function handleSwipeRight(_force, e) {
      editor.update(() => {
        if ($handleAutocompleteIntent()) {
          e.preventDefault();
        }
      });
    }
    function unmountSuggestion() {
      editor.update(() => {
        $clearSuggestion();
      });
    }
    const rootElem = editor.getRootElement();
    return utils.mergeRegister(editor.registerNodeTransform(AutocompleteNode, handleAutocompleteNodeTransform), editor.registerUpdateListener(handleUpdate), editor.registerCommand(lexical.KEY_TAB_COMMAND, $handleKeypressCommand, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.KEY_ARROW_RIGHT_COMMAND, $handleKeypressCommand, lexical.COMMAND_PRIORITY_LOW), ...(rootElem !== null ? [addSwipeRightListener(rootElem, handleSwipeRight)] : []), unmountSuggestion);
  }, [editor, query, setSuggestion]);
  return null;
}

/*
 * Simulate an asynchronous autocomplete server (typical in more common use cases like GMail where
 * the data is not static).
 */
class AutocompleteServer {
  constructor() {
    _defineProperty(this, "DATABASE", DICTIONARY);
    _defineProperty(this, "LATENCY", 200);
    _defineProperty(this, "query", searchText => {
      let isDismissed = false;
      const dismiss = () => {
        isDismissed = true;
      };
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          if (isDismissed) {
            // TODO cache result
            return reject('Dismissed');
          }
          const searchTextLength = searchText.length;
          if (searchText === '' || searchTextLength < 4) {
            return resolve(null);
          }
          const char0 = searchText.charCodeAt(0);
          const isCapitalized = char0 >= 65 && char0 <= 90;
          const caseInsensitiveSearchText = isCapitalized ? String.fromCharCode(char0 + 32) + searchText.substring(1) : searchText;
          const match = this.DATABASE.find(dictionaryWord => dictionaryWord.startsWith(caseInsensitiveSearchText) ?? null);
          if (match === undefined) {
            return resolve(null);
          }
          const matchCapitalized = isCapitalized ? String.fromCharCode(match.charCodeAt(0) - 32) + match.substring(1) : match;
          const autocompleteChunk = matchCapitalized.substring(searchTextLength);
          if (autocompleteChunk === '') {
            return resolve(null);
          }
          return resolve(autocompleteChunk);
        }, this.LATENCY);
      });
      return {
        dismiss,
        promise
      };
    });
  }
}

// https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-usa-no-swears-long.txt
const DICTIONARY = ['information', 'available', 'copyright', 'university', 'management', 'international', 'development', 'education', 'community', 'technology', 'following', 'resources', 'including', 'directory', 'government', 'department', 'description', 'insurance', 'different', 'categories', 'conditions', 'accessories', 'september', 'questions', 'application', 'financial', 'equipment', 'performance', 'experience', 'important', 'activities', 'additional', 'something', 'professional', 'committee', 'washington', 'california', 'reference', 'companies', 'computers', 'president', 'australia', 'discussion', 'entertainment', 'agreement', 'marketing', 'association', 'collection', 'solutions', 'electronics', 'technical', 'microsoft', 'conference', 'environment', 'statement', 'downloads', 'applications', 'requirements', 'individual', 'subscribe', 'everything', 'production', 'commercial', 'advertising', 'treatment', 'newsletter', 'knowledge', 'currently', 'construction', 'registered', 'protection', 'engineering', 'published', 'corporate', 'customers', 'materials', 'countries', 'standards', 'political', 'advertise', 'environmental', 'availability', 'employment', 'commission', 'administration', 'institute', 'sponsored', 'electronic', 'condition', 'effective', 'organization', 'selection', 'corporation', 'executive', 'necessary', 'according', 'particular', 'facilities', 'opportunities', 'appropriate', 'statistics', 'investment', 'christmas', 'registration', 'furniture', 'wednesday', 'structure', 'distribution', 'industrial', 'potential', 'responsible', 'communications', 'associated', 'foundation', 'documents', 'communication', 'independent', 'operating', 'developed', 'telephone', 'population', 'navigation', 'operations', 'therefore', 'christian', 'understand', 'publications', 'worldwide', 'connection', 'publisher', 'introduction', 'properties', 'accommodation', 'excellent', 'opportunity', 'assessment', 'especially', 'interface', 'operation', 'restaurants', 'beautiful', 'locations', 'significant', 'technologies', 'manufacturer', 'providing', 'authority', 'considered', 'programme', 'enterprise', 'educational', 'employees', 'alternative', 'processing', 'responsibility', 'resolution', 'publication', 'relations', 'photography', 'components', 'assistance', 'completed', 'organizations', 'otherwise', 'transportation', 'disclaimer', 'membership', 'recommended', 'background', 'character', 'maintenance', 'functions', 'trademarks', 'phentermine', 'submitted', 'television', 'interested', 'throughout', 'established', 'programming', 'regarding', 'instructions', 'increased', 'understanding', 'beginning', 'associates', 'instruments', 'businesses', 'specified', 'restaurant', 'procedures', 'relationship', 'traditional', 'sometimes', 'themselves', 'transport', 'interesting', 'evaluation', 'implementation', 'galleries', 'references', 'presented', 'literature', 'respective', 'definition', 'secretary', 'networking', 'australian', 'magazines', 'francisco', 'individuals', 'guidelines', 'installation', 'described', 'attention', 'difference', 'regulations', 'certificate', 'directions', 'documentation', 'automotive', 'successful', 'communities', 'situation', 'publishing', 'emergency', 'developing', 'determine', 'temperature', 'announcements', 'historical', 'ringtones', 'difficult', 'scientific', 'satellite', 'particularly', 'functional', 'monitoring', 'architecture', 'recommend', 'dictionary', 'accounting', 'manufacturing', 'professor', 'generally', 'continued', 'techniques', 'permission', 'generation', 'component', 'guarantee', 'processes', 'interests', 'paperback', 'classifieds', 'supported', 'competition', 'providers', 'characters', 'thousands', 'apartments', 'generated', 'administrative', 'practices', 'reporting', 'essential', 'affiliate', 'immediately', 'designated', 'integrated', 'configuration', 'comprehensive', 'universal', 'presentation', 'languages', 'compliance', 'improvement', 'pennsylvania', 'challenge', 'acceptance', 'strategies', 'affiliates', 'multimedia', 'certified', 'computing', 'interactive', 'procedure', 'leadership', 'religious', 'breakfast', 'developer', 'approximately', 'recommendations', 'comparison', 'automatically', 'minnesota', 'adventure', 'institutions', 'assistant', 'advertisement', 'headlines', 'yesterday', 'determined', 'wholesale', 'extension', 'statements', 'completely', 'electrical', 'applicable', 'manufacturers', 'classical', 'dedicated', 'direction', 'basketball', 'wisconsin', 'personnel', 'identified', 'professionals', 'advantage', 'newsletters', 'estimated', 'anonymous', 'miscellaneous', 'integration', 'interview', 'framework', 'installed', 'massachusetts', 'associate', 'frequently', 'discussions', 'laboratory', 'destination', 'intelligence', 'specifications', 'tripadvisor', 'residential', 'decisions', 'industries', 'partnership', 'editorial', 'expression', 'provisions', 'principles', 'suggestions', 'replacement', 'strategic', 'economics', 'compatible', 'apartment', 'netherlands', 'consulting', 'recreation', 'participants', 'favorites', 'translation', 'estimates', 'protected', 'philadelphia', 'officials', 'contained', 'legislation', 'parameters', 'relationships', 'tennessee', 'representative', 'frequency', 'introduced', 'departments', 'residents', 'displayed', 'performed', 'administrator', 'addresses', 'permanent', 'agriculture', 'constitutes', 'portfolio', 'practical', 'delivered', 'collectibles', 'infrastructure', 'exclusive', 'originally', 'utilities', 'philosophy', 'regulation', 'reduction', 'nutrition', 'recording', 'secondary', 'wonderful', 'announced', 'prevention', 'mentioned', 'automatic', 'healthcare', 'maintained', 'increasing', 'connected', 'directors', 'participation', 'containing', 'combination', 'amendment', 'guaranteed', 'libraries', 'distributed', 'singapore', 'enterprises', 'convention', 'principal', 'certification', 'previously', 'buildings', 'household', 'batteries', 'positions', 'subscription', 'contemporary', 'panasonic', 'permalink', 'signature', 'provision', 'certainly', 'newspaper', 'liability', 'trademark', 'trackback', 'americans', 'promotion', 'conversion', 'reasonable', 'broadband', 'influence', 'importance', 'webmaster', 'prescription', 'specifically', 'represent', 'conservation', 'louisiana', 'javascript', 'marketplace', 'evolution', 'certificates', 'objectives', 'suggested', 'concerned', 'structures', 'encyclopedia', 'continuing', 'interracial', 'competitive', 'suppliers', 'preparation', 'receiving', 'accordance', 'discussed', 'elizabeth', 'reservations', 'playstation', 'instruction', 'annotation', 'differences', 'establish', 'expressed', 'paragraph', 'mathematics', 'compensation', 'conducted', 'percentage', 'mississippi', 'requested', 'connecticut', 'personals', 'immediate', 'agricultural', 'supporting', 'collections', 'participate', 'specialist', 'experienced', 'investigation', 'institution', 'searching', 'proceedings', 'transmission', 'characteristics', 'experiences', 'extremely', 'verzeichnis', 'contracts', 'concerning', 'developers', 'equivalent', 'chemistry', 'neighborhood', 'variables', 'continues', 'curriculum', 'psychology', 'responses', 'circumstances', 'identification', 'appliances', 'elementary', 'unlimited', 'printable', 'enforcement', 'hardcover', 'celebrity', 'chocolate', 'hampshire', 'bluetooth', 'controlled', 'requirement', 'authorities', 'representatives', 'pregnancy', 'biography', 'attractions', 'transactions', 'authorized', 'retirement', 'financing', 'efficiency', 'efficient', 'commitment', 'specialty', 'interviews', 'qualified', 'discovery', 'classified', 'confidence', 'lifestyle', 'consistent', 'clearance', 'connections', 'inventory', 'converter', 'organisation', 'objective', 'indicated', 'securities', 'volunteer', 'democratic', 'switzerland', 'parameter', 'processor', 'dimensions', 'contribute', 'challenges', 'recognition', 'submission', 'encourage', 'regulatory', 'inspection', 'consumers', 'territory', 'transaction', 'manchester', 'contributions', 'continuous', 'resulting', 'cambridge', 'initiative', 'execution', 'disability', 'increases', 'contractor', 'examination', 'indicates', 'committed', 'extensive', 'affordable', 'candidate', 'databases', 'outstanding', 'perspective', 'messenger', 'tournament', 'consideration', 'discounts', 'catalogue', 'publishers', 'caribbean', 'reservation', 'remaining', 'depending', 'expansion', 'purchased', 'performing', 'collected', 'absolutely', 'featuring', 'implement', 'scheduled', 'calculator', 'significantly', 'temporary', 'sufficient', 'awareness', 'vancouver', 'contribution', 'measurement', 'constitution', 'packaging', 'consultation', 'northwest', 'classroom', 'democracy', 'wallpaper', 'merchandise', 'resistance', 'baltimore', 'candidates', 'charlotte', 'biological', 'transition', 'preferences', 'instrument', 'classification', 'physician', 'hollywood', 'wikipedia', 'spiritual', 'photographs', 'relatively', 'satisfaction', 'represents', 'pittsburgh', 'preferred', 'intellectual', 'comfortable', 'interaction', 'listening', 'effectively', 'experimental', 'revolution', 'consolidation', 'landscape', 'dependent', 'mechanical', 'consultants', 'applicant', 'cooperation', 'acquisition', 'implemented', 'directories', 'recognized', 'notification', 'licensing', 'textbooks', 'diversity', 'cleveland', 'investments', 'accessibility', 'sensitive', 'templates', 'completion', 'universities', 'technique', 'contractors', 'subscriptions', 'calculate', 'alexander', 'broadcast', 'converted', 'anniversary', 'improvements', 'specification', 'accessible', 'accessory', 'typically', 'representation', 'arrangements', 'conferences', 'uniprotkb', 'consumption', 'birmingham', 'afternoon', 'consultant', 'controller', 'ownership', 'committees', 'legislative', 'researchers', 'unsubscribe', 'molecular', 'residence', 'attorneys', 'operators', 'sustainable', 'philippines', 'statistical', 'innovation', 'employers', 'definitions', 'elections', 'stainless', 'newspapers', 'hospitals', 'exception', 'successfully', 'indonesia', 'primarily', 'capabilities', 'recommendation', 'recruitment', 'organized', 'improving', 'expensive', 'organisations', 'explained', 'programmes', 'expertise', 'mechanism', 'jewellery', 'eventually', 'agreements', 'considering', 'innovative', 'conclusion', 'disorders', 'collaboration', 'detection', 'formation', 'engineers', 'proposals', 'moderator', 'tutorials', 'settlement', 'collectables', 'fantastic', 'governments', 'purchasing', 'appointed', 'operational', 'corresponding', 'descriptions', 'determination', 'animation', 'productions', 'telecommunications', 'instructor', 'approaches', 'highlights', 'designers', 'melbourne', 'scientists', 'blackjack', 'argentina', 'possibility', 'commissioner', 'dangerous', 'reliability', 'unfortunately', 'respectively', 'volunteers', 'attachment', 'appointment', 'workshops', 'hurricane', 'represented', 'mortgages', 'responsibilities', 'carefully', 'productivity', 'investors', 'underground', 'diagnosis', 'principle', 'vacations', 'calculated', 'appearance', 'incorporated', 'notebooks', 'algorithm', 'valentine', 'involving', 'investing', 'christopher', 'admission', 'terrorism', 'parliament', 'situations', 'allocated', 'corrections', 'structural', 'municipal', 'describes', 'disabilities', 'substance', 'prohibited', 'addressed', 'simulation', 'initiatives', 'concentration', 'interpretation', 'bankruptcy', 'optimization', 'substances', 'discovered', 'restrictions', 'participating', 'exhibition', 'composition', 'nationwide', 'definitely', 'existence', 'commentary', 'limousines', 'developments', 'immigration', 'destinations', 'necessarily', 'attribute', 'apparently', 'surrounding', 'mountains', 'popularity', 'postposted', 'coordinator', 'obviously', 'fundamental', 'substantial', 'progressive', 'championship', 'sacramento', 'impossible', 'depression', 'testimonials', 'memorabilia', 'cartridge', 'explanation', 'cincinnati', 'subsection', 'electricity', 'permitted', 'workplace', 'confirmed', 'wallpapers', 'infection', 'eligibility', 'involvement', 'placement', 'observations', 'vbulletin', 'subsequent', 'motorcycle', 'disclosure', 'establishment', 'presentations', 'undergraduate', 'occupation', 'donations', 'associations', 'citysearch', 'radiation', 'seriously', 'elsewhere', 'pollution', 'conservative', 'guestbook', 'effectiveness', 'demonstrate', 'atmosphere', 'experiment', 'purchases', 'federation', 'assignment', 'chemicals', 'everybody', 'nashville', 'counseling', 'acceptable', 'satisfied', 'measurements', 'milwaukee', 'medication', 'warehouse', 'shareware', 'violation', 'configure', 'stability', 'southwest', 'institutional', 'expectations', 'independence', 'metabolism', 'personally', 'excellence', 'somewhere', 'attributes', 'recognize', 'screening', 'thumbnail', 'forgotten', 'intelligent', 'edinburgh', 'obligation', 'regardless', 'restricted', 'republican', 'merchants', 'attendance', 'arguments', 'amsterdam', 'adventures', 'announcement', 'appreciate', 'regularly', 'mechanisms', 'customize', 'tradition', 'indicators', 'emissions', 'physicians', 'complaint', 'experiments', 'afghanistan', 'scholarship', 'governance', 'supplements', 'camcorder', 'implementing', 'ourselves', 'conversation', 'capability', 'producing', 'precision', 'contributed', 'reproduction', 'ingredients', 'franchise', 'complaints', 'promotions', 'rehabilitation', 'maintaining', 'environments', 'reception', 'correctly', 'consequences', 'geography', 'appearing', 'integrity', 'discrimination', 'processed', 'implications', 'functionality', 'intermediate', 'emotional', 'platforms', 'overnight', 'geographic', 'preliminary', 'districts', 'introduce', 'promotional', 'chevrolet', 'specialists', 'generator', 'suspension', 'correction', 'authentication', 'communicate', 'supplement', 'showtimes', 'promoting', 'machinery', 'bandwidth', 'probability', 'dimension', 'schedules', 'admissions', 'quarterly', 'illustrated', 'continental', 'alternate', 'achievement', 'limitations', 'automated', 'passenger', 'convenient', 'orientation', 'childhood', 'flexibility', 'jurisdiction', 'displaying', 'encouraged', 'cartridges', 'declaration', 'automation', 'advantages', 'preparing', 'recipient', 'extensions', 'athletics', 'southeast', 'alternatives', 'determining', 'personalized', 'conditioning', 'partnerships', 'destruction', 'increasingly', 'migration', 'basically', 'conventional', 'applicants', 'occupational', 'adjustment', 'treatments', 'camcorders', 'difficulty', 'collective', 'coalition', 'enrollment', 'producers', 'collector', 'interfaces', 'advertisers', 'representing', 'observation', 'restoration', 'convenience', 'returning', 'opposition', 'container', 'defendant', 'confirmation', 'supervisor', 'peripherals', 'bestsellers', 'departure', 'minneapolis', 'interactions', 'intervention', 'attraction', 'modification', 'customized', 'understood', 'assurance', 'happening', 'amendments', 'metropolitan', 'compilation', 'verification', 'attractive', 'recordings', 'jefferson', 'gardening', 'obligations', 'orchestra', 'polyphonic', 'outsourcing', 'adjustable', 'allocation', 'discipline', 'demonstrated', 'identifying', 'alphabetical', 'dispatched', 'installing', 'voluntary', 'photographer', 'messaging', 'constructed', 'additions', 'requiring', 'engagement', 'refinance', 'calendars', 'arrangement', 'conclusions', 'bibliography', 'compatibility', 'furthermore', 'cooperative', 'measuring', 'jacksonville', 'headquarters', 'transfers', 'transformation', 'attachments', 'administrators', 'personality', 'facilitate', 'subscriber', 'priorities', 'bookstore', 'parenting', 'incredible', 'commonwealth', 'pharmaceutical', 'manhattan', 'workforce', 'organizational', 'portuguese', 'everywhere', 'discharge', 'halloween', 'hazardous', 'methodology', 'housewares', 'reputation', 'resistant', 'democrats', 'recycling', 'qualifications', 'slideshow', 'variation', 'transferred', 'photograph', 'distributor', 'underlying', 'wrestling', 'photoshop', 'gathering', 'projection', 'mathematical', 'specialized', 'diagnostic', 'indianapolis', 'corporations', 'criticism', 'automobile', 'confidential', 'statutory', 'accommodations', 'northeast', 'downloaded', 'paintings', 'injection', 'yorkshire', 'populations', 'protective', 'initially', 'indicator', 'eliminate', 'sunglasses', 'preference', 'threshold', 'venezuela', 'exploration', 'sequences', 'astronomy', 'translate', 'announces', 'compression', 'establishing', 'constitutional', 'perfectly', 'instantly', 'litigation', 'submissions', 'broadcasting', 'horizontal', 'terrorist', 'informational', 'ecommerce', 'suffering', 'prospective', 'ultimately', 'artificial', 'spectacular', 'coordination', 'connector', 'affiliated', 'activation', 'naturally', 'subscribers', 'mitsubishi', 'underwear', 'potentially', 'constraints', 'inclusive', 'dimensional', 'considerable', 'selecting', 'processors', 'pantyhose', 'difficulties', 'complexity', 'constantly', 'barcelona', 'presidential', 'documentary', 'territories', 'palestinian', 'legislature', 'hospitality', 'procurement', 'theoretical', 'exercises', 'surveillance', 'protocols', 'highlight', 'substitute', 'inclusion', 'hopefully', 'brilliant', 'evaluated', 'assignments', 'termination', 'households', 'authentic', 'montgomery', 'architectural', 'louisville', 'macintosh', 'movements', 'amenities', 'virtually', 'authorization', 'projector', 'comparative', 'psychological', 'surprised', 'genealogy', 'expenditure', 'liverpool', 'connectivity', 'algorithms', 'similarly', 'collaborative', 'excluding', 'commander', 'suggestion', 'spotlight', 'investigate', 'connecting', 'logistics', 'proportion', 'significance', 'symposium', 'essentials', 'protecting', 'transmitted', 'screenshots', 'intensive', 'switching', 'correspondence', 'supervision', 'expenditures', 'separation', 'testimony', 'celebrities', 'mandatory', 'boundaries', 'syndication', 'celebration', 'filtering', 'luxembourg', 'offensive', 'deployment', 'colleagues', 'separated', 'directive', 'governing', 'retailers', 'occasionally', 'attending', 'recruiting', 'instructional', 'traveling', 'permissions', 'biotechnology', 'prescribed', 'catherine', 'reproduced', 'calculation', 'consolidated', 'occasions', 'equations', 'exceptional', 'respondents', 'considerations', 'queensland', 'musicians', 'composite', 'unavailable', 'essentially', 'designing', 'assessments', 'brunswick', 'sensitivity', 'preservation', 'streaming', 'intensity', 'technological', 'syndicate', 'antivirus', 'addressing', 'discounted', 'bangladesh', 'constitute', 'concluded', 'desperate', 'demonstration', 'governmental', 'manufactured', 'graduation', 'variations', 'addiction', 'springfield', 'synthesis', 'undefined', 'unemployment', 'enhancement', 'newcastle', 'performances', 'societies', 'brazilian', 'identical', 'petroleum', 'norwegian', 'retention', 'exchanges', 'soundtrack', 'wondering', 'profession', 'separately', 'physiology', 'collecting', 'participant', 'scholarships', 'recreational', 'dominican', 'friendship', 'expanding', 'provincial', 'investigations', 'medications', 'rochester', 'advertiser', 'encryption', 'downloadable', 'sophisticated', 'possession', 'laboratories', 'vegetables', 'thumbnails', 'stockings', 'respondent', 'destroyed', 'manufacture', 'wordpress', 'vulnerability', 'accountability', 'celebrate', 'accredited', 'appliance', 'compressed', 'scheduling', 'perspectives', 'mortality', 'christians', 'therapeutic', 'impressive', 'accordingly', 'architect', 'challenging', 'microwave', 'accidents', 'relocation', 'contributors', 'violations', 'temperatures', 'competitions', 'discretion', 'cosmetics', 'repository', 'concentrations', 'christianity', 'negotiations', 'realistic', 'generating', 'christina', 'congressional', 'photographic', 'modifications', 'millennium', 'achieving', 'fisheries', 'exceptions', 'reactions', 'macromedia', 'companion', 'divisions', 'additionally', 'fellowship', 'victorian', 'copyrights', 'lithuania', 'mastercard', 'chronicles', 'obtaining', 'distribute', 'decorative', 'enlargement', 'campaigns', 'conjunction', 'instances', 'indigenous', 'validation', 'corruption', 'incentives', 'cholesterol', 'differential', 'scientist', 'starsmerchant', 'arthritis', 'nevertheless', 'practitioners', 'transcript', 'inflation', 'compounds', 'contracting', 'structured', 'reasonably', 'graduates', 'recommends', 'controlling', 'distributors', 'arlington', 'particles', 'extraordinary', 'indicating', 'coordinate', 'exclusively', 'limitation', 'widescreen', 'illustration', 'construct', 'inquiries', 'inspiration', 'affecting', 'downloading', 'aggregate', 'forecasts', 'complicated', 'shopzilla', 'decorating', 'expressions', 'shakespeare', 'connectors', 'conflicts', 'travelers', 'offerings', 'incorrect', 'furnishings', 'guatemala', 'perception', 'renaissance', 'pathology', 'ordinance', 'photographers', 'infections', 'configured', 'festivals', 'possibilities', 'contributing', 'analytical', 'circulation', 'assumption', 'jerusalem', 'transexuales', 'invention', 'technician', 'executives', 'enquiries', 'cognitive', 'exploring', 'registrar', 'supporters', 'withdrawal', 'predicted', 'saskatchewan', 'cancellation', 'ministers', 'veterinary', 'prostores', 'relevance', 'incentive', 'butterfly', 'mechanics', 'numerical', 'reflection', 'accompanied', 'invitation', 'princeton', 'spirituality', 'meanwhile', 'proprietary', 'childrens', 'thumbzilla', 'porcelain', 'pichunter', 'translated', 'columnists', 'consensus', 'delivering', 'journalism', 'intention', 'undertaken', 'statewide', 'semiconductor', 'illustrations', 'happiness', 'substantially', 'identifier', 'calculations', 'conducting', 'accomplished', 'calculators', 'impression', 'correlation', 'fragrance', 'neighbors', 'transparent', 'charleston', 'champions', 'selections', 'projectors', 'inappropriate', 'comparing', 'vocational', 'pharmacies', 'introducing', 'appreciated', 'albuquerque', 'distinguished', 'projected', 'assumptions', 'shareholders', 'developmental', 'regulated', 'anticipated', 'completing', 'comparable', 'confusion', 'copyrighted', 'warranties', 'documented', 'paperbacks', 'keyboards', 'vulnerable', 'reflected', 'respiratory', 'notifications', 'transexual', 'mainstream', 'evaluating', 'subcommittee', 'maternity', 'journalists', 'foundations', 'volleyball', 'liabilities', 'decreased', 'tolerance', 'creativity', 'describing', 'lightning', 'quotations', 'inspector', 'bookmarks', 'behavioral', 'riverside', 'bathrooms', 'abilities', 'initiated', 'nonprofit', 'lancaster', 'suspended', 'containers', 'attitudes', 'simultaneously', 'integrate', 'sociology', 'screenshot', 'exhibitions', 'confident', 'retrieved', 'officially', 'consortium', 'recipients', 'delicious', 'traditions', 'periodically', 'hungarian', 'referring', 'transform', 'educators', 'vegetable', 'humanities', 'independently', 'alignment', 'henderson', 'britannica', 'competitors', 'visibility', 'consciousness', 'encounter', 'resolutions', 'accessing', 'attempted', 'witnesses', 'administered', 'strengthen', 'frederick', 'aggressive', 'advertisements', 'sublimedirectory', 'disturbed', 'determines', 'sculpture', 'motivation', 'pharmacology', 'passengers', 'quantities', 'petersburg', 'consistently', 'powerpoint', 'obituaries', 'punishment', 'appreciation', 'subsequently', 'providence', 'restriction', 'incorporate', 'backgrounds', 'treasurer', 'lightweight', 'transcription', 'complications', 'scripting', 'remembered', 'synthetic', 'testament', 'specifics', 'partially', 'wilderness', 'generations', 'tournaments', 'sponsorship', 'headphones', 'proceeding', 'volkswagen', 'uncertainty', 'breakdown', 'reconstruction', 'subsidiary', 'strengths', 'encouraging', 'furnished', 'terrorists', 'comparisons', 'beneficial', 'distributions', 'viewpicture', 'threatened', 'republicans', 'discusses', 'responded', 'abstracts', 'prediction', 'pharmaceuticals', 'thesaurus', 'individually', 'battlefield', 'literally', 'ecological', 'appraisal', 'consisting', 'submitting', 'citations', 'geographical', 'mozambique', 'disclaimers', 'championships', 'sheffield', 'finishing', 'wellington', 'prospects', 'bulgarian', 'aboriginal', 'remarkable', 'preventing', 'productive', 'boulevard', 'compliant', 'penalties', 'imagination', 'refurbished', 'activated', 'conferencing', 'armstrong', 'politicians', 'trackbacks', 'accommodate', 'christine', 'accepting', 'precipitation', 'isolation', 'sustained', 'approximate', 'programmer', 'greetings', 'inherited', 'incomplete', 'chronicle', 'legitimate', 'biographies', 'investigator', 'plaintiff', 'prisoners', 'mediterranean', 'nightlife', 'architects', 'entrepreneur', 'freelance', 'excessive', 'screensaver', 'valuation', 'unexpected', 'cigarette', 'characteristic', 'metallica', 'consequently', 'appointments', 'narrative', 'academics', 'quantitative', 'screensavers', 'subdivision', 'distinction', 'livestock', 'exemption', 'sustainability', 'formatting', 'nutritional', 'nicaragua', 'affiliation', 'relatives', 'satisfactory', 'revolutionary', 'bracelets', 'telephony', 'breathing', 'thickness', 'adjustments', 'graphical', 'discussing', 'aerospace', 'meaningful', 'maintains', 'shortcuts', 'voyeurweb', 'extending', 'specifies', 'accreditation', 'blackberry', 'meditation', 'microphone', 'macedonia', 'combining', 'instrumental', 'organizing', 'moderators', 'kazakhstan', 'standings', 'partition', 'invisible', 'translations', 'commodity', 'kilometers', 'thanksgiving', 'guarantees', 'indication', 'congratulations', 'cigarettes', 'controllers', 'consultancy', 'conventions', 'coordinates', 'responding', 'physically', 'stakeholders', 'hydrocodone', 'consecutive', 'attempting', 'representations', 'competing', 'peninsula', 'accurately', 'considers', 'ministries', 'vacancies', 'parliamentary', 'acknowledge', 'thoroughly', 'nottingham', 'identifies', 'questionnaire', 'qualification', 'modelling', 'miniature', 'interstate', 'consequence', 'systematic', 'perceived', 'madagascar', 'presenting', 'troubleshooting', 'uzbekistan', 'centuries', 'magnitude', 'richardson', 'fragrances', 'vocabulary', 'earthquake', 'fundraising', 'geological', 'assessing', 'introduces', 'webmasters', 'computational', 'acdbentity', 'participated', 'handhelds', 'answering', 'impressed', 'conspiracy', 'organizer', 'combinations', 'preceding', 'cumulative', 'amplifier', 'arbitrary', 'prominent', 'lexington', 'contacted', 'recorders', 'occasional', 'innovations', 'postcards', 'reviewing', 'explicitly', 'transsexual', 'citizenship', 'informative', 'girlfriend', 'bloomberg', 'hierarchy', 'influenced', 'abandoned', 'complement', 'mauritius', 'checklist', 'requesting', 'lauderdale', 'scenarios', 'extraction', 'elevation', 'utilization', 'beverages', 'calibration', 'efficiently', 'entertaining', 'prerequisite', 'hypothesis', 'medicines', 'regression', 'enhancements', 'renewable', 'intersection', 'passwords', 'consistency', 'collectors', 'azerbaijan', 'astrology', 'occurring', 'supplemental', 'travelling', 'induction', 'precisely', 'spreading', 'provinces', 'widespread', 'incidence', 'incidents', 'enhancing', 'interference', 'palestine', 'listprice', 'atmospheric', 'knowledgestorm', 'referenced', 'publicity', 'proposition', 'allowance', 'designation', 'duplicate', 'criterion', 'civilization', 'vietnamese', 'tremendous', 'corrected', 'encountered', 'internationally', 'surrounded', 'creatures', 'commented', 'accomplish', 'vegetarian', 'newfoundland', 'investigated', 'ambassador', 'stephanie', 'contacting', 'vegetation', 'findarticles', 'specially', 'infectious', 'continuity', 'phenomenon', 'conscious', 'referrals', 'differently', 'integrating', 'revisions', 'reasoning', 'charitable', 'annotated', 'convinced', 'burlington', 'replacing', 'researcher', 'watershed', 'occupations', 'acknowledged', 'equilibrium', 'characterized', 'privilege', 'qualifying', 'estimation', 'pediatric', 'techrepublic', 'institutes', 'brochures', 'traveller', 'appropriations', 'suspected', 'benchmark', 'beginners', 'instructors', 'highlighted', 'stationery', 'unauthorized', 'competent', 'contributor', 'demonstrates', 'gradually', 'desirable', 'journalist', 'afterwards', 'religions', 'explosion', 'signatures', 'disciplines', 'daughters', 'conversations', 'simplified', 'motherboard', 'bibliographic', 'champagne', 'deviation', 'superintendent', 'housewives', 'influences', 'inspections', 'irrigation', 'hydraulic', 'robertson', 'penetration', 'conviction', 'omissions', 'retrieval', 'qualities', 'prototype', 'importantly', 'apparatus', 'explaining', 'nomination', 'empirical', 'dependence', 'sexuality', 'polyester', 'commitments', 'suggesting', 'remainder', 'privileges', 'televisions', 'specializing', 'commodities', 'motorcycles', 'concentrate', 'reproductive', 'molecules', 'refrigerator', 'intervals', 'sentences', 'exclusion', 'workstation', 'holocaust', 'receivers', 'disposition', 'navigator', 'investigators', 'marijuana', 'cathedral', 'fairfield', 'fascinating', 'landscapes', 'lafayette', 'computation', 'cardiovascular', 'salvation', 'predictions', 'accompanying', 'selective', 'arbitration', 'configuring', 'editorials', 'sacrifice', 'removable', 'convergence', 'gibraltar', 'anthropology', 'malpractice', 'reporters', 'necessity', 'rendering', 'hepatitis', 'nationally', 'waterproof', 'specialties', 'humanitarian', 'invitations', 'functioning', 'economies', 'alexandria', 'bacterial', 'undertake', 'continuously', 'achievements', 'convertible', 'secretariat', 'paragraphs', 'adolescent', 'nominations', 'cancelled', 'introductory', 'reservoir', 'occurrence', 'worcester', 'demographic', 'disciplinary', 'respected', 'portraits', 'interpreted', 'evaluations', 'elimination', 'hypothetical', 'immigrants', 'complimentary', 'helicopter', 'performer', 'commissions', 'powerseller', 'graduated', 'surprising', 'unnecessary', 'dramatically', 'yugoslavia', 'characterization', 'likelihood', 'fundamentals', 'contamination', 'endangered', 'compromise', 'expiration', 'namespace', 'peripheral', 'negotiation', 'opponents', 'nominated', 'confidentiality', 'electoral', 'changelog', 'alternatively', 'greensboro', 'controversial', 'recovered', 'upgrading', 'frontpage', 'demanding', 'defensive', 'forbidden', 'programmers', 'monitored', 'installations', 'deutschland', 'practitioner', 'motivated', 'smithsonian', 'examining', 'revelation', 'delegation', 'dictionaries', 'greenhouse', 'transparency', 'currencies', 'survivors', 'positioning', 'descending', 'temporarily', 'frequencies', 'reflections', 'municipality', 'detective', 'experiencing', 'fireplace', 'endorsement', 'psychiatry', 'persistent', 'summaries', 'looksmart', 'magnificent', 'colleague', 'adaptation', 'paintball', 'enclosure', 'supervisors', 'westminster', 'distances', 'absorption', 'treasures', 'transcripts', 'disappointed', 'continually', 'communist', 'collectible', 'entrepreneurs', 'creations', 'acquisitions', 'biodiversity', 'excitement', 'presently', 'mysterious', 'librarian', 'subsidiaries', 'stockholm', 'indonesian', 'therapist', 'promising', 'relaxation', 'thereafter', 'commissioners', 'forwarding', 'nightmare', 'reductions', 'southampton', 'organisms', 'telescope', 'portsmouth', 'advancement', 'harassment', 'generators', 'generates', 'replication', 'inexpensive', 'receptors', 'interventions', 'huntington', 'internship', 'aluminium', 'snowboard', 'beastality', 'evanescence', 'coordinated', 'shipments', 'antarctica', 'chancellor', 'controversy', 'legendary', 'beautifully', 'antibodies', 'examinations', 'immunology', 'departmental', 'terminology', 'gentleman', 'reproduce', 'convicted', 'roommates', 'threatening', 'spokesman', 'activists', 'frankfurt', 'encourages', 'assembled', 'restructuring', 'terminals', 'simulations', 'sufficiently', 'conditional', 'crossword', 'conceptual', 'liechtenstein', 'translator', 'automobiles', 'continent', 'longitude', 'challenged', 'telecharger', 'insertion', 'instrumentation', 'constraint', 'groundwater', 'strengthening', 'insulation', 'infringement', 'subjective', 'swaziland', 'varieties', 'mediawiki', 'configurations'];

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function DialogButtonsList({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "DialogButtonsList"
  }, children);
}
function DialogActions({
  'data-test-id': dataTestId,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "DialogActions",
    "data-test-id": dataTestId
  }, children);
}

function FigmaComponent({
  className,
  format,
  nodeKey,
  documentID
}) {
  return /*#__PURE__*/React.createElement(LexicalBlockWithAlignableContents.BlockWithAlignableContents, {
    className: className,
    format: format,
    nodeKey: nodeKey
  }, /*#__PURE__*/React.createElement("iframe", {
    width: "560",
    height: "315",
    src: `https://www.figma.com/embed?embed_host=lexical&url=\
        https://www.figma.com/file/${documentID}`,
    allowFullScreen: true
  }));
}
class FigmaNode extends LexicalDecoratorBlockNode.DecoratorBlockNode {
  static getType() {
    return 'figma';
  }
  static clone(node) {
    return new FigmaNode(node.__id, node.__format, node.__key);
  }
  static importJSON(serializedNode) {
    const node = $createFigmaNode(serializedNode.documentID);
    node.setFormat(serializedNode.format);
    return node;
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      documentID: this.__id,
      type: 'figma',
      version: 1
    };
  }
  constructor(id, format, key) {
    super(format, key);
    _defineProperty(this, "__id", void 0);
    this.__id = id;
  }
  updateDOM() {
    return false;
  }
  getId() {
    return this.__id;
  }
  getTextContent(_includeInert, _includeDirectionless) {
    return `https://www.figma.com/file/${this.__id}`;
  }
  decorate(_editor, config) {
    const embedBlockTheme = config.theme.embedBlock || {};
    const className = {
      base: embedBlockTheme.base || '',
      focus: embedBlockTheme.focus || ''
    };
    return /*#__PURE__*/React.createElement(FigmaComponent, {
      className: className,
      format: this.__format,
      nodeKey: this.getKey(),
      documentID: this.__id
    });
  }
  isInline() {
    return false;
  }
}
function $createFigmaNode(documentID) {
  return new FigmaNode(documentID);
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const INSERT_FIGMA_COMMAND = lexical.createCommand('INSERT_FIGMA_COMMAND');
function FigmaPlugin() {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  React.useEffect(() => {
    if (!editor.hasNodes([FigmaNode])) {
      throw new Error('FigmaPlugin: FigmaNode not registered on editor');
    }
    return editor.registerCommand(INSERT_FIGMA_COMMAND, payload => {
      const figmaNode = $createFigmaNode(payload);
      utils.$insertNodeToNearestRoot(figmaNode);
      return true;
    }, lexical.COMMAND_PRIORITY_EDITOR);
  }, [editor]);
  return null;
}

function OfficeComponent({
  className,
  format,
  nodeKey,
  url
}) {
  const parts = url?.split('.');
  const extension = parts[parts.length - 1]?.toLowerCase();
  let videoName = url.split('/').pop() || 'Open Document';
  videoName = videoName.length > 15 ? videoName.slice(0, 15) + '...' + extension : videoName;
  const buttonStyle = {
    backgroundColor: 'rgb(140, 116, 247)',
    borderRadius: '8px',
    color: 'white',
    display: 'inline-block',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
    padding: '6px',
    textDecoration: 'none',
    height: '30px',
    width: 'auto'
  };
  return /*#__PURE__*/React.createElement(LexicalBlockWithAlignableContents.BlockWithAlignableContents, {
    className: className,
    format: format,
    nodeKey: nodeKey
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("a", {
    href: `https://view.officeapps.live.com/op/view.aspx?src=${url}`,
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement("span", {
    "data-lexical-text": "true",
    style: buttonStyle
  }, videoName)), " \xA0"));
}
function convertOfficeElement(domNode) {
  const url = domNode.getAttribute('data-lexical-office');
  if (url) {
    const node = $createOfficeNode(url);
    return {
      node
    };
  }
  return null;
}
class OfficeNode extends LexicalDecoratorBlockNode.DecoratorBlockNode {
  static getType() {
    return 'office';
  }
  static clone(node) {
    return new OfficeNode(node.__url, node.__format, node.__key);
  }
  static importJSON(serializedNode) {
    const node = $createOfficeNode(serializedNode.url);
    node.setFormat(serializedNode.format);
    return node;
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      type: 'office',
      url: this.__url,
      version: 1
    };
  }
  constructor(url, format, key) {
    super(format, key);
    _defineProperty(this, "__url", void 0);
    this.__url = url;
  }
  exportDOM() {
    const a = document.createElement('a');
    a.href = `https://view.officeapps.live.com/op/view.aspx?src=${this.__url}`;
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
    a.setAttribute('data-lexical-video', this.__url);
    a.setAttribute('allowfullscreen', 'true');
    const span = document.createElement('span');
    const parts = this.__url?.split('.');
    const extension = parts[parts.length - 1]?.toLowerCase();
    let urlPart = this.__url.split('/').pop() || 'Open Document';
    urlPart = urlPart.length > 15 ? urlPart.slice(0, 15) + '...' + extension : urlPart;
    span.textContent = urlPart;
    span.style.backgroundColor = 'rgb(140, 116, 247)';
    span.style.borderRadius = '8px';
    span.style.color = 'white';
    span.style.display = 'inline-block';
    span.style.fontFamily = 'Arial, sans-serif';
    span.style.fontSize = '14px';
    span.style.fontWeight = 'bold';
    span.style.padding = '6px';
    span.style.textDecoration = 'none';
    span.style.width = 'auto';
    span.style.height = '30px';
    a.appendChild(span);
    const space = document.createElement('p');
    space.textContent = ' ';
    const p = document.createElement('p');
    p.appendChild(a);
    p.appendChild(space);
    return {
      element: p
    };
  }
  static importDOM() {
    return {
      iframe: domNode => {
        if (!domNode.hasAttribute('data-lexical-office')) {
          return null;
        }
        return {
          conversion: convertOfficeElement,
          priority: 1
        };
      }
    };
  }
  updateDOM() {
    return false;
  }
  getId() {
    return this.__url;
  }
  getTextContent(_includeInert, _includeDirectionless) {
    return `${this.__url}`;
  }
  decorate(_editor, config) {
    const embedBlockTheme = config.theme.embedBlock || {};
    const className = {
      base: embedBlockTheme.base || '',
      focus: embedBlockTheme.focus || ''
    };
    return /*#__PURE__*/React.createElement(OfficeComponent, {
      className: className,
      format: this.__format,
      nodeKey: this.getKey(),
      url: this.__url
    });
  }
  isInline() {
    return false;
  }
}
function $createOfficeNode(url) {
  return new OfficeNode(url);
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const INSERT_OFFICE_COMMAND = lexical.createCommand('INSERT_OFFICE_COMMAND');
function OfficePlugin() {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  React.useEffect(() => {
    if (!editor.hasNodes([OfficeNode])) {
      throw new Error('OfficePlugin: OfficeNode not registered on editor');
    }
    return editor.registerCommand(INSERT_OFFICE_COMMAND, payload => {
      const officeNode = $createOfficeNode(payload);
      utils.$insertNodeToNearestRoot(officeNode);
      return true;
    }, lexical.COMMAND_PRIORITY_EDITOR);
  }, [editor]);
  return null;
}

function PdfComponent({
  className,
  format,
  nodeKey,
  url
}) {
  const parts = url?.split('.');
  const extension = parts[parts.length - 1]?.toLowerCase();
  let videoName = url.split('/').pop() || 'Open Pdf';
  videoName = videoName.length > 15 ? videoName.slice(0, 15) + '...' + extension : videoName;
  const buttonStyle = {
    backgroundColor: 'rgb(140, 116, 247)',
    borderRadius: '8px',
    color: 'white',
    display: 'inline-block',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
    padding: '6px',
    textDecoration: 'none',
    height: '30px',
    width: 'auto'
  };
  return /*#__PURE__*/React.createElement(LexicalBlockWithAlignableContents.BlockWithAlignableContents, {
    className: className,
    format: format,
    nodeKey: nodeKey
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("a", {
    href: url,
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement("span", {
    "data-lexical-text": "true",
    style: buttonStyle
  }, videoName)), " \xA0"));
}
function convertPdfElement(domNode) {
  const url = domNode.getAttribute('data-lexical-pdf');
  if (url) {
    const node = $createPdfNode(url);
    return {
      node
    };
  }
  return null;
}
class PdfNode extends LexicalDecoratorBlockNode.DecoratorBlockNode {
  static getType() {
    return 'pdf';
  }
  static clone(node) {
    return new PdfNode(node.__url, node.__format, node.__key);
  }
  static importJSON(serializedNode) {
    const node = $createPdfNode(serializedNode.url);
    node.setFormat(serializedNode.format);
    return node;
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      type: 'pdf',
      url: this.__url,
      version: 1
    };
  }
  constructor(url, format, key) {
    super(format, key);
    _defineProperty(this, "__url", void 0);
    this.__url = url;
  }
  exportDOM() {
    const a = document.createElement('a');
    a.href = this.__url;
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
    a.setAttribute('data-lexical-video', this.__url);
    a.setAttribute('allowfullscreen', 'true');
    const span = document.createElement('span');
    const parts = this.__url?.split('.');
    const extension = parts[parts.length - 1]?.toLowerCase();
    let urlPart = this.__url.split('/').pop() || 'Open pdf';
    urlPart = urlPart.length > 15 ? urlPart.slice(0, 15) + '...' + extension : urlPart;
    span.textContent = urlPart;
    span.style.backgroundColor = 'rgb(140, 116, 247)';
    span.style.borderRadius = '8px';
    span.style.color = 'white';
    span.style.display = 'inline-block';
    span.style.fontFamily = 'Arial, sans-serif';
    span.style.fontSize = '14px';
    span.style.fontWeight = 'bold';
    span.style.padding = '6px';
    span.style.textDecoration = 'none';
    span.style.width = 'auto';
    span.style.height = '30px';
    a.appendChild(span);
    const space = document.createElement('p');
    space.textContent = ' ';
    const p = document.createElement('p');
    p.appendChild(a);
    p.appendChild(space);
    return {
      element: p
    };
  }
  static importDOM() {
    return {
      iframe: domNode => {
        if (!domNode.hasAttribute('data-lexical-pdf')) {
          return null;
        }
        return {
          conversion: convertPdfElement,
          priority: 1
        };
      }
    };
  }
  updateDOM() {
    return false;
  }
  getId() {
    return this.__url;
  }
  getTextContent(_includeInert, _includeDirectionless) {
    return `${this.__url}`;
  }
  decorate(_editor, config) {
    const embedBlockTheme = config.theme.embedBlock || {};
    const className = {
      base: embedBlockTheme.base || '',
      focus: embedBlockTheme.focus || ''
    };
    return /*#__PURE__*/React.createElement(PdfComponent, {
      className: className,
      format: this.__format,
      nodeKey: this.getKey(),
      url: this.__url
    });
  }
  isInline() {
    return false;
  }
}
function $createPdfNode(url) {
  return new PdfNode(url);
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const INSERT_PDF_COMMAND = lexical.createCommand('INSERT_PDF_COMMAND');
function PdfPlugin() {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  React.useEffect(() => {
    if (!editor.hasNodes([PdfNode])) {
      throw new Error('PdfPlugin: PdfNode not registered on editor');
    }
    return editor.registerCommand(INSERT_PDF_COMMAND, payload => {
      const pdfNode = $createPdfNode(payload);
      utils.$insertNodeToNearestRoot(pdfNode);
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
const INSERT_TWEET_COMMAND = lexical.createCommand('INSERT_TWEET_COMMAND');
function TwitterPlugin() {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  React.useEffect(() => {
    if (!editor.hasNodes([TweetNode])) {
      throw new Error('TwitterPlugin: TweetNode not registered on editor');
    }
    return editor.registerCommand(INSERT_TWEET_COMMAND, payload => {
      const tweetNode = $createTweetNode(payload);
      utils.$insertNodeToNearestRoot(tweetNode);
      return true;
    }, lexical.COMMAND_PRIORITY_EDITOR);
  }, [editor]);
  return null;
}

function VideoComponent({
  className,
  format,
  nodeKey,
  url
}) {
  const parts = url?.split('.');
  const extension = parts[parts.length - 1]?.toLowerCase();
  let videoName = url.split('/').pop() || 'Open Video';
  videoName = videoName.length > 15 ? videoName.slice(0, 15) + '...' + extension : videoName;
  const buttonStyle = {
    backgroundColor: 'rgb(140, 116, 247)',
    borderRadius: '8px',
    color: 'white',
    display: 'inline-block',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
    padding: '6px',
    textDecoration: 'none',
    height: '30px',
    width: 'auto'
  };
  return /*#__PURE__*/React.createElement(LexicalBlockWithAlignableContents.BlockWithAlignableContents, {
    className: className,
    format: format,
    nodeKey: nodeKey
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("a", {
    href: url,
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement("span", {
    "data-lexical-text": "true",
    style: buttonStyle
  }, videoName)), " \xA0"));
}
function convertVideoElement(domNode) {
  const url = domNode.getAttribute('data-lexical-video');
  if (url) {
    const node = $createVideoNode(url);
    return {
      node
    };
  }
  return null;
}
class VideoNode extends LexicalDecoratorBlockNode.DecoratorBlockNode {
  static getType() {
    return 'video';
  }
  static clone(node) {
    return new VideoNode(node.__url, node.__format, node.__key);
  }
  static importJSON(serializedNode) {
    const node = $createVideoNode(serializedNode.url);
    node.setFormat(serializedNode.format);
    return node;
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      type: 'video',
      url: this.__url,
      version: 1
    };
  }
  constructor(url, format, key) {
    super(format, key);
    _defineProperty(this, "__url", void 0);
    this.__url = url;
  }
  exportDOM() {
    const a = document.createElement('a');
    a.href = this.__url;
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
    a.setAttribute('data-lexical-video', this.__url);
    a.setAttribute('allowfullscreen', 'true');
    const span = document.createElement('span');
    const parts = this.__url?.split('.');
    const extension = parts[parts.length - 1]?.toLowerCase();
    let urlPart = this.__url.split('/').pop() || 'Open Video';
    urlPart = urlPart.length > 15 ? urlPart.slice(0, 15) + '...' + extension : urlPart;
    span.textContent = urlPart;
    span.style.backgroundColor = 'rgb(140, 116, 247)';
    span.style.borderRadius = '8px';
    span.style.color = 'white';
    span.style.display = 'inline-block';
    span.style.fontFamily = 'Arial, sans-serif';
    span.style.fontSize = '14px';
    span.style.fontWeight = 'bold';
    span.style.padding = '6px';
    span.style.textDecoration = 'none';
    span.style.width = 'auto';
    span.style.height = '30px';
    a.appendChild(span);
    const space = document.createElement('p');
    space.textContent = ' ';
    const p = document.createElement('p');
    p.appendChild(a);
    p.appendChild(space);
    return {
      element: p
    };
  }
  static importDOM() {
    return {
      iframe: domNode => {
        if (!domNode.hasAttribute('data-lexical-video')) {
          return null;
        }
        return {
          conversion: convertVideoElement,
          priority: 1
        };
      }
    };
  }
  updateDOM() {
    return false;
  }
  getId() {
    return this.__url;
  }
  getTextContent(_includeInert, _includeDirectionless) {
    return `${this.__url}`;
  }
  decorate(_editor, config) {
    const embedBlockTheme = config.theme.embedBlock || {};
    const className = {
      base: embedBlockTheme.base || '',
      focus: embedBlockTheme.focus || ''
    };
    return /*#__PURE__*/React.createElement(VideoComponent, {
      className: className,
      format: this.__format,
      nodeKey: this.getKey(),
      url: this.__url
    });
  }
  isInline() {
    return false;
  }
}
function $createVideoNode(url) {
  return new VideoNode(url);
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const INSERT_VIDEO_COMMAND = lexical.createCommand('INSERT_VIDEO_COMMAND');
function VideoPlugin() {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  React.useEffect(() => {
    if (!editor.hasNodes([VideoNode])) {
      throw new Error('VideoPlugin: VideoNode not registered on editor');
    }
    return editor.registerCommand(INSERT_VIDEO_COMMAND, payload => {
      const videoNode = $createVideoNode(payload);
      utils.$insertNodeToNearestRoot(videoNode);
      return true;
    }, lexical.COMMAND_PRIORITY_EDITOR);
  }, [editor]);
  return null;
}

function YouTubeComponent({
  className,
  format,
  nodeKey,
  videoID
}) {
  return /*#__PURE__*/React.createElement(LexicalBlockWithAlignableContents.BlockWithAlignableContents, {
    className: className,
    format: format,
    nodeKey: nodeKey
  }, /*#__PURE__*/React.createElement("iframe", {
    width: "560",
    height: "315",
    src: `https://www.youtube.com/embed/${videoID}`,
    frameBorder: "0",
    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    allowFullScreen: true,
    title: "YouTube video"
  }));
}
function convertYoutubeElement(domNode) {
  const videoID = domNode.getAttribute('data-lexical-youtube');
  if (videoID) {
    const node = $createYouTubeNode(videoID);
    return {
      node
    };
  }
  return null;
}
class YouTubeNode extends LexicalDecoratorBlockNode.DecoratorBlockNode {
  static getType() {
    return 'youtube';
  }
  static clone(node) {
    return new YouTubeNode(node.__id, node.__format, node.__key);
  }
  static importJSON(serializedNode) {
    const node = $createYouTubeNode(serializedNode.videoID);
    node.setFormat(serializedNode.format);
    return node;
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      type: 'youtube',
      version: 1,
      videoID: this.__id
    };
  }
  constructor(id, format, key) {
    super(format, key);
    _defineProperty(this, "__id", void 0);
    this.__id = id;
  }
  exportDOM() {
    const element = document.createElement('iframe');
    element.setAttribute('data-lexical-youtube', this.__id);
    element.setAttribute('width', '560');
    element.setAttribute('height', '315');
    element.setAttribute('src', `https://www.youtube.com/embed/${this.__id}`);
    element.setAttribute('frameborder', '0');
    element.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    element.setAttribute('allowfullscreen', 'true');
    element.setAttribute('title', 'YouTube video');
    return {
      element
    };
  }
  static importDOM() {
    return {
      iframe: domNode => {
        if (!domNode.hasAttribute('data-lexical-youtube')) {
          return null;
        }
        return {
          conversion: convertYoutubeElement,
          priority: 1
        };
      }
    };
  }
  updateDOM() {
    return false;
  }
  getId() {
    return this.__id;
  }
  getTextContent(_includeInert, _includeDirectionless) {
    return `https://www.youtube.com/watch?v=${this.__id}`;
  }
  decorate(_editor, config) {
    const embedBlockTheme = config.theme.embedBlock || {};
    const className = {
      base: embedBlockTheme.base || '',
      focus: embedBlockTheme.focus || ''
    };
    return /*#__PURE__*/React.createElement(YouTubeComponent, {
      className: className,
      format: this.__format,
      nodeKey: this.getKey(),
      videoID: this.__id
    });
  }
  isInline() {
    return false;
  }
}
function $createYouTubeNode(videoID) {
  return new YouTubeNode(videoID);
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const INSERT_YOUTUBE_COMMAND = lexical.createCommand('INSERT_YOUTUBE_COMMAND');
function YouTubePlugin() {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  React.useEffect(() => {
    if (!editor.hasNodes([YouTubeNode])) {
      throw new Error('YouTubePlugin: YouTubeNode not registered on editor');
    }
    return editor.registerCommand(INSERT_YOUTUBE_COMMAND, payload => {
      const youTubeNode = $createYouTubeNode(payload);
      utils.$insertNodeToNearestRoot(youTubeNode);
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
const YoutubeEmbedConfig = {
  contentName: 'Youtube Video',
  exampleUrl: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
  // Icon for display.
  icon: /*#__PURE__*/React.createElement("i", {
    className: "icon youtube"
  }),
  insertNode: (editor, result) => {
    editor.dispatchCommand(INSERT_YOUTUBE_COMMAND, result.id);
  },
  keywords: ['youtube', 'video'],
  // Determine if a given URL is a match and return url data.
  parseUrl: async url => {
    const match = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/.exec(url);
    const id = match ? match?.[2].length === 11 ? match[2] : null : null;
    if (id != null) {
      return {
        id,
        url
      };
    }
    return null;
  },
  type: 'youtube-video'
};
const VideoEmbedConfig = {
  contentName: 'Video',
  exampleUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  // Icon for display.
  icon: /*#__PURE__*/React.createElement("i", {
    className: "icon videos"
  }),
  insertNode: (editor, result) => {
    editor.dispatchCommand(INSERT_VIDEO_COMMAND, result.url);
  },
  keywords: ['mp4', 'webm', 'mov', 'avi', 'flv', 'mkv', 'wmv', 'video'],
  // Determine if a given URL is a match and return url data.

  parseUrl: async url => {
    const parts = url?.split('.');
    const extension = parts[parts.length - 1]?.toLowerCase();
    const validVideoTypes = ['mp4', 'webm', 'mov', 'avi', 'flv', 'mkv', 'wmv'];
    if (validVideoTypes.includes(extension) && url != null) {
      return {
        id: '',
        url
      };
    }
    return null;
  },
  type: 'video'
};
const PdfEmbedConfig = {
  contentName: 'Pdf',
  exampleUrl: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210101201653/PDF.pdf',
  // Icon for display.
  icon: /*#__PURE__*/React.createElement("i", {
    className: "icon pdf"
  }),
  insertNode: (editor, result) => {
    editor.dispatchCommand(INSERT_PDF_COMMAND, result.url);
  },
  keywords: ['pdf'],
  // Determine if a given URL is a match and return url data.
  parseUrl: async url => {
    const parts = url?.split('.');
    const extension = parts[parts.length - 1]?.toLowerCase();
    const validPdfTypes = ['pdf'];
    if (validPdfTypes.includes(extension) && url != null) {
      return {
        id: '',
        url
      };
    }
    return null;
  },
  type: 'pdf'
};
const OfficeEmbedConfig = {
  contentName: 'Office',
  exampleUrl: 'https://media.stage.truflux.drcsystems.ooo/uploads/project/294/Timesheet%20report%20_1_.xlsx',
  // Icon for display.
  icon: /*#__PURE__*/React.createElement("i", {
    className: "icon office"
  }),
  insertNode: (editor, result) => {
    editor.dispatchCommand(INSERT_OFFICE_COMMAND, result.url);
  },
  keywords: ['office', 'xlsx', 'docx', 'pptx', 'csv', 'ods'],
  // Determine if a given URL is a match and return url data.
  parseUrl: async url => {
    const parts = url?.split('.');
    const extension = parts[parts.length - 1]?.toLowerCase();
    const validOfficeTypes = ['xlsx', 'docx', 'pptx', 'csv', 'ods'];
    if (validOfficeTypes.includes(extension) && url != null) {
      return {
        id: '',
        url
      };
    }
    return null;
  },
  type: 'office'
};
const EmbedConfigs = [
// TwitterEmbedConfig,
YoutubeEmbedConfig,
// FigmaEmbedConfig,
VideoEmbedConfig, PdfEmbedConfig, OfficeEmbedConfig];
function AutoEmbedMenuItem({
  index,
  isSelected,
  onClick,
  onMouseEnter,
  option
}) {
  let className = 'item';
  if (isSelected) {
    className += ' selected';
  }
  return /*#__PURE__*/React.createElement("li", {
    key: option.key,
    tabIndex: -1,
    className: className,
    ref: option.setRefElement,
    role: "option",
    "aria-selected": isSelected,
    id: 'typeahead-item-' + index,
    onMouseEnter: onMouseEnter,
    onClick: onClick
  }, /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, option.title));
}
function AutoEmbedMenu({
  options,
  selectedItemIndex,
  onOptionClick,
  onOptionMouseEnter
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "typeahead-popovers"
  }, /*#__PURE__*/React.createElement("ul", null, options.map((option, i) => /*#__PURE__*/React.createElement(AutoEmbedMenuItem, {
    index: i,
    isSelected: selectedItemIndex === i,
    onClick: () => onOptionClick(option, i),
    onMouseEnter: () => onOptionMouseEnter(i),
    key: option.key,
    option: option
  }))));
}
const debounce = (callback, delay) => {
  let timeoutId;
  return text => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(text);
    }, delay);
  };
};
function AutoEmbedDialog({
  embedConfig,
  onClose
}) {
  const [text, setText] = React.useState('');
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const [embedResult, setEmbedResult] = React.useState(null);
  const validateText = React.useMemo(() => debounce(inputText => {
    const urlMatch = LexicalAutoEmbedPlugin.URL_MATCHER.exec(inputText);
    if (embedConfig != null && inputText != null && urlMatch != null) {
      Promise.resolve(embedConfig.parseUrl(inputText)).then(parseResult => {
        setEmbedResult(parseResult);
      });
    } else if (embedResult != null) {
      setEmbedResult(null);
    }
  }, 200), [embedConfig, embedResult]);
  const onClick = () => {
    if (embedResult != null) {
      embedConfig.insertNode(editor, embedResult);
      onClose();
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '600px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "Input__wrapper"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "Input__input",
    placeholder: embedConfig.exampleUrl,
    value: text,
    "data-test-id": `${embedConfig.type}-embed-modal-url`,
    onChange: e => {
      const {
        value
      } = e.target;
      setText(value);
      validateText(value);
    }
  })), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
    disabled: !embedResult,
    onClick: onClick,
    "data-test-id": `${embedConfig.type}-embed-modal-submit-btn`
  }, "Embed")));
}
function AutoEmbedPlugin() {
  const [modal, showModal] = useModal();
  const openEmbedModal = embedConfig => {
    showModal(`Embed ${embedConfig.contentName}`, onClose => /*#__PURE__*/React.createElement(AutoEmbedDialog, {
      embedConfig: embedConfig,
      onClose: onClose
    }));
  };
  const getMenuOptions = (activeEmbedConfig, embedFn, dismissFn) => {
    return [new LexicalAutoEmbedPlugin.AutoEmbedOption('Dismiss', {
      onSelect: dismissFn
    }), new LexicalAutoEmbedPlugin.AutoEmbedOption(`Embed ${activeEmbedConfig.contentName}`, {
      onSelect: embedFn
    })];
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, modal, /*#__PURE__*/React.createElement(LexicalAutoEmbedPlugin.LexicalAutoEmbedPlugin, {
    embedConfigs: EmbedConfigs,
    onOpenEmbedModalForConfig: openEmbedModal,
    getMenuOptions: getMenuOptions,
    menuRenderFn: (anchorElementRef, {
      selectedIndex,
      options,
      selectOptionAndCleanUp,
      setHighlightedIndex
    }) => anchorElementRef.current ? /*#__PURE__*/ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
      className: "typeahead-popovers auto-embed-menu",
      style: {
        marginLeft: anchorElementRef.current.style.width,
        width: 200
      }
    }, /*#__PURE__*/React.createElement(AutoEmbedMenu, {
      options: options,
      selectedItemIndex: selectedIndex,
      onOptionClick: (option, index) => {
        setHighlightedIndex(index);
        selectOptionAndCleanUp(option);
      },
      onOptionMouseEnter: index => {
        setHighlightedIndex(index);
      }
    })), anchorElementRef.current) : null
  }));
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const URL_MATCHER$1 = /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
const EMAIL_MATCHER = /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
const MATCHERS = [text => {
  const match = URL_MATCHER$1.exec(text);
  if (match === null) {
    return null;
  }
  const fullMatch = match[0];
  return {
    index: match.index,
    length: fullMatch.length,
    text: fullMatch,
    url: fullMatch.startsWith('http') ? fullMatch : `https://${fullMatch}`
  };
}, text => {
  const match = EMAIL_MATCHER.exec(text);
  return match && {
    index: match.index,
    length: match[0].length,
    text: match[0],
    url: `mailto:${match[0]}`
  };
}];
function LexicalAutoLinkPlugin() {
  return /*#__PURE__*/React.createElement(LexicalAutoLinkPlugin$1.AutoLinkPlugin, {
    matchers: MATCHERS
  });
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function ClickableLinkPlugin({
  filter,
  newTab = true
}) {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  React.useEffect(() => {
    function onClick(e) {
      const event = e;
      const linkDomNode = getLinkDomNode(event, editor);
      if (linkDomNode === null) {
        return;
      }
      const href = linkDomNode.getAttribute('href');
      if (linkDomNode.getAttribute('contenteditable') === 'false' || href === undefined) {
        return;
      }

      // Allow user to select link text without following url
      const selection = editor.getEditorState().read(lexical.$getSelection);
      if (lexical.$isRangeSelection(selection) && !selection.isCollapsed()) {
        return;
      }
      let linkNode = null;
      editor.update(() => {
        const maybeLinkNode = lexical.$getNearestNodeFromDOMNode(linkDomNode);
        if (link.$isLinkNode(maybeLinkNode)) {
          linkNode = maybeLinkNode;
        }
      });
      if (linkNode === null || filter !== undefined && !filter(event, linkNode)) {
        return;
      }
      try {
        if (href !== null) {
          const isMiddle = event.type === 'auxclick' && event.button === 1;
          window.open(href, newTab || event.metaKey || event.ctrlKey || isMiddle ? '_blank' : '_self');
          event.preventDefault();
        }
      } catch {
        // It didn't work, which is better than throwing an exception!
      }
    }
    return editor.registerRootListener((rootElement, prevRootElement) => {
      if (prevRootElement !== null) {
        prevRootElement.removeEventListener('click', onClick);
        prevRootElement.removeEventListener('auxclick', onClick);
      }
      if (rootElement !== null) {
        rootElement.addEventListener('click', onClick);
        rootElement.addEventListener('auxclick', onClick);
      }
    });
  }, [editor, filter, newTab]);
  return null;
}
function isLinkDomNode(domNode) {
  return domNode.nodeName.toLowerCase() === 'a';
}
function getLinkDomNode(event, editor) {
  return editor.getEditorState().read(() => {
    const domNode = event.target;
    if (isLinkDomNode(domNode)) {
      return domNode;
    }
    if (domNode.parentNode && isLinkDomNode(domNode.parentNode)) {
      return domNode.parentNode;
    }
    return null;
  });
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function useDebounce(fn, ms, maxWait) {
  const funcRef = React.useRef(null);
  funcRef.current = fn;
  return React.useMemo(() => lodash.debounce((...args) => {
    if (funcRef.current) {
      funcRef.current(...args);
    }
  }, ms, {
    maxWait
  }), [ms, maxWait]);
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function CopyButton({
  editor,
  getCodeDOMNode
}) {
  const [isCopyCompleted, setCopyCompleted] = React.useState(false);
  const removeSuccessIcon = useDebounce(() => {
    setCopyCompleted(false);
  }, 1000);
  async function handleClick() {
    const codeDOMNode = getCodeDOMNode();
    if (!codeDOMNode) {
      return;
    }
    let content = '';
    editor.update(() => {
      const codeNode = lexical.$getNearestNodeFromDOMNode(codeDOMNode);
      if (code.$isCodeNode(codeNode)) {
        content = codeNode.getTextContent();
      }
      const selection = lexical.$getSelection();
      lexical.$setSelection(selection);
    });
    try {
      await navigator.clipboard.writeText(content);
      setCopyCompleted(true);
      removeSuccessIcon();
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }
  return /*#__PURE__*/React.createElement("button", {
    className: "menu-item",
    onClick: handleClick,
    "aria-label": "copy"
  }, isCopyCompleted ? /*#__PURE__*/React.createElement("i", {
    className: "format success"
  }) : /*#__PURE__*/React.createElement("i", {
    className: "format copy"
  }));
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const CODE_PADDING = 8;
function CodeActionMenuContainer({
  anchorElem
}) {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const [lang, setLang] = React.useState('');
  const [isShown, setShown] = React.useState(false);
  const [shouldListenMouseMove, setShouldListenMouseMove] = React.useState(false);
  const [position, setPosition] = React.useState({
    right: '0',
    top: '0'
  });
  const codeSetRef = React.useRef(new Set());
  const codeDOMNodeRef = React.useRef(null);
  function getCodeDOMNode() {
    return codeDOMNodeRef.current;
  }
  const debouncedOnMouseMove = useDebounce(event => {
    const {
      codeDOMNode,
      isOutside
    } = getMouseInfo(event);
    if (isOutside) {
      setShown(false);
      return;
    }
    if (!codeDOMNode) {
      return;
    }
    codeDOMNodeRef.current = codeDOMNode;
    let codeNode = null;
    let _lang = '';
    editor.update(() => {
      const maybeCodeNode = lexical.$getNearestNodeFromDOMNode(codeDOMNode);
      if (code.$isCodeNode(maybeCodeNode)) {
        codeNode = maybeCodeNode;
        _lang = codeNode.getLanguage() || '';
      }
    });
    if (codeNode) {
      const {
        y: editorElemY,
        right: editorElemRight
      } = anchorElem.getBoundingClientRect();
      const {
        y,
        right
      } = codeDOMNode.getBoundingClientRect();
      setLang(_lang);
      setShown(true);
      setPosition({
        right: `${editorElemRight - right + CODE_PADDING}px`,
        top: `${y - editorElemY}px`
      });
    }
  }, 50, 1000);
  React.useEffect(() => {
    if (!shouldListenMouseMove) {
      return;
    }
    document.addEventListener('mousemove', debouncedOnMouseMove);
    return () => {
      setShown(false);
      debouncedOnMouseMove.cancel();
      document.removeEventListener('mousemove', debouncedOnMouseMove);
    };
  }, [shouldListenMouseMove, debouncedOnMouseMove]);
  editor.registerMutationListener(code.CodeNode, mutations => {
    editor.getEditorState().read(() => {
      for (const [key, type] of mutations) {
        switch (type) {
          case 'created':
            codeSetRef.current.add(key);
            setShouldListenMouseMove(codeSetRef.current.size > 0);
            break;
          case 'destroyed':
            codeSetRef.current.delete(key);
            setShouldListenMouseMove(codeSetRef.current.size > 0);
            break;
        }
      }
    });
  });
  const codeFriendlyName = code.getLanguageFriendlyName(lang);
  return /*#__PURE__*/React.createElement(React.Fragment, null, isShown ? /*#__PURE__*/React.createElement("div", {
    className: "code-action-menu-container",
    style: {
      ...position
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "code-highlight-language"
  }, codeFriendlyName), /*#__PURE__*/React.createElement(CopyButton, {
    editor: editor,
    getCodeDOMNode: getCodeDOMNode
  })) : null);
}
function getMouseInfo(event) {
  const target = event.target;
  if (target && target instanceof HTMLElement) {
    const codeDOMNode = target.closest('code.PlaygroundEditorTheme__code');
    const isOutside = !(codeDOMNode || target.closest('div.code-action-menu-container'));
    return {
      codeDOMNode,
      isOutside
    };
  } else {
    return {
      codeDOMNode: null,
      isOutside: true
    };
  }
}
function CodeActionMenuPlugin({
  anchorElem = document.body
}) {
  return /*#__PURE__*/ReactDOM.createPortal(/*#__PURE__*/React.createElement(CodeActionMenuContainer, {
    anchorElem: anchorElem
  }), anchorElem);
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function CodeHighlightPlugin() {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  React.useEffect(() => {
    return code.registerCodeHighlighting(editor);
  }, [editor]);
  return null;
}

function convertDetailsElement(domNode) {
  const isOpen = domNode.open !== undefined ? domNode.open : true;
  const node = $createCollapsibleContainerNode(isOpen);
  return {
    node
  };
}
class CollapsibleContainerNode extends lexical.ElementNode {
  constructor(open, key) {
    super(key);
    _defineProperty(this, "__open", void 0);
    this.__open = open;
  }
  static getType() {
    return 'collapsible-container';
  }
  static clone(node) {
    return new CollapsibleContainerNode(node.__open, node.__key);
  }
  createDOM(config) {
    const dom = document.createElement('details');
    dom.classList.add('Collapsible__container');
    dom.open = this.__open;
    return dom;
  }
  updateDOM(prevNode, dom) {
    if (prevNode.__open !== this.__open) {
      dom.open = this.__open;
    }
    return false;
  }
  static importDOM() {
    return {
      details: domNode => {
        return {
          conversion: convertDetailsElement,
          priority: 1
        };
      }
    };
  }
  static importJSON(serializedNode) {
    const node = $createCollapsibleContainerNode(serializedNode.open);
    return node;
  }
  exportDOM() {
    const element = document.createElement('details');
    element.open = this.__open;
    return {
      element
    };
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      open: this.__open,
      type: 'collapsible-container',
      version: 1
    };
  }
  setOpen(open) {
    const writable = this.getWritable();
    writable.__open = open;
  }
  getOpen() {
    return this.__open;
  }
  toggleOpen() {
    this.setOpen(!this.getOpen());
  }
}
function $createCollapsibleContainerNode(isOpen) {
  return new CollapsibleContainerNode(isOpen);
}
function $isCollapsibleContainerNode(node) {
  return node instanceof CollapsibleContainerNode;
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function convertCollapsibleContentElement(domNode) {
  const node = $createCollapsibleContentNode();
  return {
    node
  };
}
class CollapsibleContentNode extends lexical.ElementNode {
  static getType() {
    return 'collapsible-content';
  }
  static clone(node) {
    return new CollapsibleContentNode(node.__key);
  }
  createDOM(config) {
    const dom = document.createElement('div');
    dom.classList.add('Collapsible__content');
    return dom;
  }
  updateDOM(prevNode, dom) {
    return false;
  }
  static importDOM() {
    return {
      div: domNode => {
        if (!domNode.hasAttribute('data-lexical-collapsible-content')) {
          return null;
        }
        return {
          conversion: convertCollapsibleContentElement,
          priority: 2
        };
      }
    };
  }
  exportDOM() {
    const element = document.createElement('div');
    element.setAttribute('data-lexical-collapsible-content', 'true');
    return {
      element
    };
  }
  static importJSON(serializedNode) {
    return $createCollapsibleContentNode();
  }
  isShadowRoot() {
    return true;
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      type: 'collapsible-content',
      version: 1
    };
  }
}
function $createCollapsibleContentNode() {
  return new CollapsibleContentNode();
}
function $isCollapsibleContentNode(node) {
  return node instanceof CollapsibleContentNode;
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function convertSummaryElement(domNode) {
  const node = $createCollapsibleTitleNode();
  return {
    node
  };
}
class CollapsibleTitleNode extends lexical.ElementNode {
  static getType() {
    return 'collapsible-title';
  }
  static clone(node) {
    return new CollapsibleTitleNode(node.__key);
  }
  createDOM(config, editor) {
    const dom = document.createElement('summary');
    dom.classList.add('Collapsible__title');
    return dom;
  }
  updateDOM(prevNode, dom) {
    return false;
  }
  static importDOM() {
    return {
      summary: domNode => {
        return {
          conversion: convertSummaryElement,
          priority: 1
        };
      }
    };
  }
  static importJSON(serializedNode) {
    return $createCollapsibleTitleNode();
  }
  exportDOM() {
    const element = document.createElement('summary');
    return {
      element
    };
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      type: 'collapsible-title',
      version: 1
    };
  }
  collapseAtStart(_selection) {
    this.getParentOrThrow().insertBefore(this);
    return true;
  }
  insertNewAfter(_, restoreSelection = true) {
    const containerNode = this.getParentOrThrow();
    if (!$isCollapsibleContainerNode(containerNode)) {
      throw new Error('CollapsibleTitleNode expects to be child of CollapsibleContainerNode');
    }
    if (containerNode.getOpen()) {
      const contentNode = this.getNextSibling();
      if (!$isCollapsibleContentNode(contentNode)) {
        throw new Error('CollapsibleTitleNode expects to have CollapsibleContentNode sibling');
      }
      const firstChild = contentNode.getFirstChild();
      if (lexical.$isElementNode(firstChild)) {
        return firstChild;
      } else {
        const paragraph = lexical.$createParagraphNode();
        contentNode.append(paragraph);
        return paragraph;
      }
    } else {
      const paragraph = lexical.$createParagraphNode();
      containerNode.insertAfter(paragraph, restoreSelection);
      return paragraph;
    }
  }
}
function $createCollapsibleTitleNode() {
  return new CollapsibleTitleNode();
}
function $isCollapsibleTitleNode(node) {
  return node instanceof CollapsibleTitleNode;
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const INSERT_COLLAPSIBLE_COMMAND = lexical.createCommand();
const TOGGLE_COLLAPSIBLE_COMMAND = lexical.createCommand();
function CollapsiblePlugin() {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  React.useEffect(() => {
    if (!editor.hasNodes([CollapsibleContainerNode, CollapsibleTitleNode, CollapsibleContentNode])) {
      throw new Error('CollapsiblePlugin: CollapsibleContainerNode, CollapsibleTitleNode, or CollapsibleContentNode not registered on editor');
    }
    return utils.mergeRegister(
    // Structure enforcing transformers for each node type. In case nesting structure is not
    // "Container > Title + Content" it'll unwrap nodes and convert it back
    // to regular content.
    editor.registerNodeTransform(CollapsibleContentNode, node => {
      const parent = node.getParent();
      if (!$isCollapsibleContainerNode(parent)) {
        const children = node.getChildren();
        for (const child of children) {
          node.insertBefore(child);
        }
        node.remove();
      }
    }), editor.registerNodeTransform(CollapsibleTitleNode, node => {
      const parent = node.getParent();
      if (!$isCollapsibleContainerNode(parent)) {
        node.replace(lexical.$createParagraphNode().append(...node.getChildren()));
      }
    }), editor.registerNodeTransform(CollapsibleContainerNode, node => {
      const children = node.getChildren();
      if (children.length !== 2 || !$isCollapsibleTitleNode(children[0]) || !$isCollapsibleContentNode(children[1])) {
        for (const child of children) {
          node.insertBefore(child);
        }
        node.remove();
      }
    }),
    // This handles the case when container is collapsed and we delete its previous sibling
    // into it, it would cause collapsed content deleted (since it's display: none, and selection
    // swallows it when deletes single char). Instead we expand container, which is although
    // not perfect, but avoids bigger problem
    editor.registerCommand(lexical.DELETE_CHARACTER_COMMAND, () => {
      const selection = lexical.$getSelection();
      if (!lexical.$isRangeSelection(selection) || !selection.isCollapsed() || selection.anchor.offset !== 0) {
        return false;
      }
      const anchorNode = selection.anchor.getNode();
      const topLevelElement = anchorNode.getTopLevelElement();
      if (topLevelElement === null) {
        return false;
      }
      const container = topLevelElement.getPreviousSibling();
      if (!$isCollapsibleContainerNode(container) || container.getOpen()) {
        return false;
      }
      container.setOpen(true);
      return true;
    }, lexical.COMMAND_PRIORITY_LOW),
    // When collapsible is the last child pressing down arrow will insert paragraph
    // below it to allow adding more content. It's similar what $insertBlockNode
    // (mainly for decorators), except it'll always be possible to continue adding
    // new content even if trailing paragraph is accidentally deleted
    editor.registerCommand(lexical.KEY_ARROW_DOWN_COMMAND, () => {
      const selection = lexical.$getSelection();
      if (!lexical.$isRangeSelection(selection) || !selection.isCollapsed()) {
        return false;
      }
      const container = utils.$findMatchingParent(selection.anchor.getNode(), $isCollapsibleContainerNode);
      if (container === null) {
        return false;
      }
      const parent = container.getParent();
      if (parent !== null && parent.getLastChild() === container) {
        parent.append(lexical.$createParagraphNode());
      }
      return false;
    }, lexical.COMMAND_PRIORITY_LOW),
    // Handling CMD+Enter to toggle collapsible element collapsed state
    editor.registerCommand(lexical.INSERT_PARAGRAPH_COMMAND, () => {
      // @ts-ignore
      const windowEvent = editor._window?.event;
      if (windowEvent && (windowEvent.ctrlKey || windowEvent.metaKey) && windowEvent.key === 'Enter') {
        const selection = lexical.$getPreviousSelection();
        if (lexical.$isRangeSelection(selection) && selection.isCollapsed()) {
          const parent = utils.$findMatchingParent(selection.anchor.getNode(), node => lexical.$isElementNode(node) && !node.isInline());
          if ($isCollapsibleTitleNode(parent)) {
            const container = parent.getParent();
            if ($isCollapsibleContainerNode(container)) {
              container.toggleOpen();
              lexical.$setSelection(selection.clone());
              return true;
            }
          }
        }
      }
      return false;
    }, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(INSERT_COLLAPSIBLE_COMMAND, () => {
      editor.update(() => {
        const selection = lexical.$getSelection();
        if (!lexical.$isRangeSelection(selection)) {
          return;
        }
        const title = $createCollapsibleTitleNode();
        const content = $createCollapsibleContentNode().append(lexical.$createParagraphNode());
        const container = $createCollapsibleContainerNode(true).append(title, content);
        selection.insertNodes([container]);
        title.selectStart();
      });
      return true;
    }, lexical.COMMAND_PRIORITY_EDITOR), editor.registerCommand(TOGGLE_COLLAPSIBLE_COMMAND, key => {
      editor.update(() => {
        const containerNode = lexical.$getNodeByKey(key);
        if ($isCollapsibleContainerNode(containerNode)) {
          containerNode.toggleOpen();
        }
      });
      return true;
    }, lexical.COMMAND_PRIORITY_EDITOR));
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
const useLayoutEffectImpl = CAN_USE_DOM ? React.useLayoutEffect : React.useEffect;
var useLayoutEffect = useLayoutEffectImpl;

function createUID$2() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
}
function createComment(content, author, id, timeStamp, deleted) {
  return {
    author,
    content,
    deleted: deleted === undefined ? false : deleted,
    id: id === undefined ? createUID$2() : id,
    timeStamp: timeStamp === undefined ? performance.now() : timeStamp,
    type: 'comment'
  };
}
function createThread(quote, comments, id) {
  return {
    comments,
    id: id === undefined ? createUID$2() : id,
    quote,
    type: 'thread'
  };
}
function cloneThread(thread) {
  return {
    comments: Array.from(thread.comments),
    id: thread.id,
    quote: thread.quote,
    type: 'thread'
  };
}
function markDeleted(comment) {
  return {
    author: comment.author,
    content: '[Deleted Comment]',
    deleted: true,
    id: comment.id,
    timeStamp: comment.timeStamp,
    type: 'comment'
  };
}
function triggerOnChange(commentStore) {
  const listeners = commentStore._changeListeners;
  for (const listener of listeners) {
    listener();
  }
}
class CommentStore {
  constructor(editor) {
    _defineProperty(this, "_editor", void 0);
    _defineProperty(this, "_comments", void 0);
    _defineProperty(this, "_changeListeners", void 0);
    _defineProperty(this, "_collabProvider", void 0);
    this._comments = [];
    this._editor = editor;
    this._collabProvider = null;
    this._changeListeners = new Set();
  }
  isCollaborative() {
    return this._collabProvider !== null;
  }
  getComments() {
    return this._comments;
  }
  addComment(commentOrThread, thread, offset) {
    const nextComments = Array.from(this._comments);
    // The YJS types explicitly use `any` as well.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sharedCommentsArray = this._getCollabComments();
    if (thread !== undefined && commentOrThread.type === 'comment') {
      for (let i = 0; i < nextComments.length; i++) {
        const comment = nextComments[i];
        if (comment.type === 'thread' && comment.id === thread.id) {
          const newThread = cloneThread(comment);
          nextComments.splice(i, 1, newThread);
          const insertOffset = offset !== undefined ? offset : newThread.comments.length;
          if (this.isCollaborative() && sharedCommentsArray !== null) {
            const parentSharedArray = sharedCommentsArray.get(i).get('comments');
            this._withRemoteTransaction(() => {
              const sharedMap = this._createCollabSharedMap(commentOrThread);
              parentSharedArray.insert(insertOffset, [sharedMap]);
            });
          }
          newThread.comments.splice(insertOffset, 0, commentOrThread);
          break;
        }
      }
    } else {
      const insertOffset = offset !== undefined ? offset : nextComments.length;
      if (this.isCollaborative() && sharedCommentsArray !== null) {
        this._withRemoteTransaction(() => {
          const sharedMap = this._createCollabSharedMap(commentOrThread);
          sharedCommentsArray.insert(insertOffset, [sharedMap]);
        });
      }
      nextComments.splice(insertOffset, 0, commentOrThread);
    }
    this._comments = nextComments;
    triggerOnChange(this);
  }
  deleteCommentOrThread(commentOrThread, thread) {
    const nextComments = Array.from(this._comments);
    // The YJS types explicitly use `any` as well.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sharedCommentsArray = this._getCollabComments();
    let commentIndex = null;
    if (thread !== undefined) {
      for (let i = 0; i < nextComments.length; i++) {
        const nextComment = nextComments[i];
        if (nextComment.type === 'thread' && nextComment.id === thread.id) {
          const newThread = cloneThread(nextComment);
          nextComments.splice(i, 1, newThread);
          const threadComments = newThread.comments;
          commentIndex = threadComments.indexOf(commentOrThread);
          if (this.isCollaborative() && sharedCommentsArray !== null) {
            const parentSharedArray = sharedCommentsArray.get(i).get('comments');
            this._withRemoteTransaction(() => {
              parentSharedArray.delete(commentIndex);
            });
          }
          threadComments.splice(commentIndex, 1);
          break;
        }
      }
    } else {
      commentIndex = nextComments.indexOf(commentOrThread);
      if (this.isCollaborative() && sharedCommentsArray !== null) {
        this._withRemoteTransaction(() => {
          sharedCommentsArray.delete(commentIndex);
        });
      }
      nextComments.splice(commentIndex, 1);
    }
    this._comments = nextComments;
    triggerOnChange(this);
    if (commentOrThread.type === 'comment') {
      return {
        index: commentIndex,
        markedComment: markDeleted(commentOrThread)
      };
    }
    return null;
  }
  registerOnChange(onChange) {
    const changeListeners = this._changeListeners;
    changeListeners.add(onChange);
    return () => {
      changeListeners.delete(onChange);
    };
  }
  _withRemoteTransaction(fn) {
    const provider = this._collabProvider;
    if (provider !== null) {
      // @ts-ignore doc does exist
      const doc = provider.doc;
      doc.transact(fn, this);
    }
  }
  _withLocalTransaction(fn) {
    const collabProvider = this._collabProvider;
    try {
      this._collabProvider = null;
      fn();
    } finally {
      this._collabProvider = collabProvider;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _getCollabComments() {
    const provider = this._collabProvider;
    if (provider !== null) {
      // @ts-ignore doc does exist
      const doc = provider.doc;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return doc.get('comments', yjs.Array);
    }
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _createCollabSharedMap(commentOrThread) {
    const sharedMap = new yjs.Map();
    const type = commentOrThread.type;
    const id = commentOrThread.id;
    sharedMap.set('type', type);
    sharedMap.set('id', id);
    if (type === 'comment') {
      sharedMap.set('author', commentOrThread.author);
      sharedMap.set('content', commentOrThread.content);
      sharedMap.set('deleted', commentOrThread.deleted);
      sharedMap.set('timeStamp', commentOrThread.timeStamp);
    } else {
      sharedMap.set('quote', commentOrThread.quote);
      const commentsArray = new yjs.Array();
      commentOrThread.comments.forEach((comment, i) => {
        const sharedChildComment = this._createCollabSharedMap(comment);
        commentsArray.insert(i, [sharedChildComment]);
      });
      sharedMap.set('comments', commentsArray);
    }
    return sharedMap;
  }
  registerCollaboration(provider) {
    this._collabProvider = provider;
    const sharedCommentsArray = this._getCollabComments();
    const connect = () => {
      provider.connect();
    };
    const disconnect = () => {
      try {
        provider.disconnect();
      } catch (e) {
        // Do nothing
      }
    };
    const unsubscribe = this._editor.registerCommand(yjs$1.TOGGLE_CONNECT_COMMAND, payload => {
      if (connect !== undefined && disconnect !== undefined) {
        const shouldConnect = payload;
        if (shouldConnect) {
          // eslint-disable-next-line no-console
          console.log('Comments connected!');
          connect();
        } else {
          // eslint-disable-next-line no-console
          console.log('Comments disconnected!');
          disconnect();
        }
      }
      return false;
    }, lexical.COMMAND_PRIORITY_LOW);
    const onSharedCommentChanges = (events, transaction) => {
      if (transaction.origin !== this) {
        for (let i = 0; i < events.length; i++) {
          const event = events[i];
          if (event instanceof yjs.YArrayEvent) {
            const target = event.target;
            const deltas = event.delta;
            let offset = 0;
            for (let s = 0; s < deltas.length; s++) {
              const delta = deltas[s];
              const insert = delta.insert;
              const retain = delta.retain;
              const del = delta.delete;
              const parent = target.parent;
              const parentThread = target === sharedCommentsArray ? undefined : parent instanceof yjs.Map && this._comments.find(t => t.id === parent.get('id'));
              if (Array.isArray(insert)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                insert.forEach(map => {
                  const id = map.get('id');
                  const type = map.get('type');
                  const commentOrThread = type === 'thread' ? createThread(map.get('quote'), map.get('comments').toArray()
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  .map(innerComment => createComment(innerComment.get('content'), innerComment.get('author'), innerComment.get('id'), innerComment.get('timeStamp'), innerComment.get('deleted'))), id) : createComment(map.get('content'), map.get('author'), id, map.get('timeStamp'), map.get('deleted'));
                  this._withLocalTransaction(() => {
                    this.addComment(commentOrThread, parentThread, offset);
                  });
                });
              } else if (typeof retain === 'number') {
                offset += retain;
              } else if (typeof del === 'number') {
                for (let d = 0; d < del; d++) {
                  const commentOrThread = parentThread === undefined || parentThread === false ? this._comments[offset] : parentThread.comments[offset];
                  this._withLocalTransaction(() => {
                    this.deleteCommentOrThread(commentOrThread, parentThread);
                  });
                  offset++;
                }
              }
            }
          }
        }
      }
    };
    if (sharedCommentsArray === null) {
      return () => null;
    }
    sharedCommentsArray.observeDeep(onSharedCommentChanges);
    connect();
    return () => {
      sharedCommentsArray.unobserveDeep(onSharedCommentChanges);
      unsubscribe();
      this._collabProvider = null;
    };
  }
}
function useCommentStore(commentStore) {
  const [comments, setComments] = React.useState(commentStore.getComments());
  React.useEffect(() => {
    return commentStore.registerOnChange(() => {
      setComments(commentStore.getComments());
    });
  }, [commentStore]);
  return comments;
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const theme$2 = {
  blockCursor: 'TextEditor__blockCursor',
  characterLimit: 'TextEditor__characterLimit',
  code: 'TextEditor__code',
  codeHighlight: {
    atrule: 'TextEditor__tokenAttr',
    attr: 'TextEditor__tokenAttr',
    boolean: 'TextEditor__tokenProperty',
    builtin: 'TextEditor__tokenSelector',
    cdata: 'TextEditor__tokenComment',
    char: 'TextEditor__tokenSelector',
    class: 'TextEditor__tokenFunction',
    'class-name': 'TextEditor__tokenFunction',
    comment: 'TextEditor__tokenComment',
    constant: 'TextEditor__tokenProperty',
    deleted: 'TextEditor__tokenProperty',
    doctype: 'TextEditor__tokenComment',
    entity: 'TextEditor__tokenOperator',
    function: 'TextEditor__tokenFunction',
    important: 'TextEditor__tokenVariable',
    inserted: 'TextEditor__tokenSelector',
    keyword: 'TextEditor__tokenAttr',
    namespace: 'TextEditor__tokenVariable',
    number: 'TextEditor__tokenProperty',
    operator: 'TextEditor__tokenOperator',
    prolog: 'TextEditor__tokenComment',
    property: 'TextEditor__tokenProperty',
    punctuation: 'TextEditor__tokenPunctuation',
    regex: 'TextEditor__tokenVariable',
    selector: 'TextEditor__tokenSelector',
    string: 'TextEditor__tokenSelector',
    symbol: 'TextEditor__tokenProperty',
    tag: 'TextEditor__tokenProperty',
    url: 'TextEditor__tokenOperator',
    variable: 'TextEditor__tokenVariable'
  },
  embedBlock: {
    base: 'TextEditor__embedBlock',
    focus: 'TextEditor__embedBlockFocus'
  },
  hashtag: 'TextEditor__hashtag',
  heading: {
    h1: 'TextEditor__h1',
    h2: 'TextEditor__h2',
    h3: 'TextEditor__h3',
    h4: 'TextEditor__h4',
    h5: 'TextEditor__h5',
    h6: 'TextEditor__h6'
  },
  image: 'TextEditor__image',
  indent: 'TextEditor__indent',
  link: 'TextEditor__link',
  list: {
    listitem: 'TextEditor__listItem',
    listitemChecked: 'TextEditor__listItemChecked',
    listitemUnchecked: 'TextEditor__listItemUnchecked',
    nested: {
      listitem: 'TextEditor__nestedListItem'
    },
    olDepth: ['TextEditor__ol1', 'TextEditor__ol2', 'TextEditor__ol3', 'TextEditor__ol4', 'TextEditor__ol5'],
    ul: 'TextEditor__ul'
  },
  ltr: 'TextEditor__ltr',
  mark: 'TextEditor__mark',
  markOverlap: 'TextEditor__markOverlap',
  paragraph: 'TextEditor__paragraph',
  quote: 'TextEditor__quote',
  rtl: 'TextEditor__rtl',
  table: 'TextEditor__table',
  tableAddColumns: 'TextEditor__tableAddColumns',
  tableAddRows: 'TextEditor__tableAddRows',
  tableCell: 'TextEditor__tableCell',
  tableCellActionButton: 'TextEditor__tableCellActionButton',
  tableCellActionButtonContainer: 'TextEditor__tableCellActionButtonContainer',
  tableCellEditing: 'TextEditor__tableCellEditing',
  tableCellHeader: 'TextEditor__tableCellHeader',
  tableCellPrimarySelected: 'TextEditor__tableCellPrimarySelected',
  tableCellResizer: 'TextEditor__tableCellResizer',
  tableCellSelected: 'TextEditor__tableCellSelected',
  tableCellSortedIndicator: 'TextEditor__tableCellSortedIndicator',
  tableResizeRuler: 'TextEditor__tableCellResizeRuler',
  tableSelected: 'TextEditor__tableSelected',
  text: {
    bold: 'TextEditor__textBold',
    code: 'TextEditor__textCode',
    italic: 'TextEditor__textItalic',
    strikethrough: 'TextEditor__textStrikethrough',
    subscript: 'TextEditor__textSubscript',
    superscript: 'TextEditor__textSuperscript',
    underline: 'TextEditor__textUnderline',
    underlineStrikethrough: 'TextEditor__textUnderlineStrikethrough'
  }
};
var baseTheme = theme$2;

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const theme$1 = {
  ...baseTheme,
  paragraph: 'CommentEditorTheme__paragraph'
};
var CommentEditorTheme = theme$1;

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function LexicalContentEditable({
  className
}) {
  return /*#__PURE__*/React.createElement(LexicalContentEditable$1.ContentEditable, {
    className: className || 'ContentEditable__root'
  });
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function Placeholder({
  children,
  className
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: className || 'Placeholder__root'
  }, children);
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const INSERT_INLINE_COMMAND = lexical.createCommand('INSERT_INLINE_COMMAND');
function EditorRefPlugin({
  editorRef
}) {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  useLayoutEffect(() => {
    editorRef.current = editor;
    return () => {
      editorRef.current = null;
    };
  }, [editor, editorRef]);
  return null;
}
function EscapeHandlerPlugin({
  onEscape
}) {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  React.useEffect(() => {
    return editor.registerCommand(lexical.KEY_ESCAPE_COMMAND, event => {
      return onEscape(event);
    }, 2);
  }, [editor, onEscape]);
  return null;
}
function PlainTextEditor({
  className,
  autoFocus,
  onEscape,
  onChange,
  editorRef,
  placeholder = 'Type a comment...'
}) {
  const initialConfig = {
    namespace: 'Commenting',
    nodes: [],
    onError: error => {
      throw error;
    },
    theme: CommentEditorTheme
  };
  return /*#__PURE__*/React.createElement(LexicalComposer.LexicalComposer, {
    initialConfig: initialConfig
  }, /*#__PURE__*/React.createElement("div", {
    className: "CommentPlugin_CommentInputBox_EditorContainer"
  }, /*#__PURE__*/React.createElement(LexicalPlainTextPlugin.PlainTextPlugin, {
    contentEditable: /*#__PURE__*/React.createElement(LexicalContentEditable, {
      className: className
    }),
    placeholder: /*#__PURE__*/React.createElement(Placeholder, null, placeholder),
    ErrorBoundary: LexicalErrorBoundary
  }), /*#__PURE__*/React.createElement(LexicalOnChangePlugin.OnChangePlugin, {
    onChange: onChange
  }), /*#__PURE__*/React.createElement(LexicalHistoryPlugin.HistoryPlugin, null), autoFocus !== false && /*#__PURE__*/React.createElement(LexicalAutoFocusPlugin.AutoFocusPlugin, null), /*#__PURE__*/React.createElement(EscapeHandlerPlugin, {
    onEscape: onEscape
  }), /*#__PURE__*/React.createElement(LexicalClearEditorPlugin.ClearEditorPlugin, null), editorRef !== undefined && /*#__PURE__*/React.createElement(EditorRefPlugin, {
    editorRef: editorRef
  })));
}
function useOnChange(setContent, setCanSubmit) {
  return React.useCallback((editorState, _editor) => {
    editorState.read(() => {
      setContent(text.$rootTextContent());
      setCanSubmit(!text.$isRootTextContentEmpty(_editor.isComposing(), true));
    });
  }, [setCanSubmit, setContent]);
}
function CommentInputBox({
  editor,
  cancelAddComment,
  submitAddComment
}) {
  const [content, setContent] = React.useState('');
  const [canSubmit, setCanSubmit] = React.useState(false);
  const boxRef = React.useRef(null);
  const selectionState = React.useMemo(() => ({
    container: document.createElement('div'),
    elements: []
  }), []);
  const author = useCollabAuthorName();
  const updateLocation = React.useCallback(() => {
    editor.getEditorState().read(() => {
      const selection$1 = lexical.$getSelection();
      if (lexical.$isRangeSelection(selection$1)) {
        const anchor = selection$1.anchor;
        const focus = selection$1.focus;
        const range = selection.createDOMRange(editor, anchor.getNode(), anchor.offset, focus.getNode(), focus.offset);
        const boxElem = boxRef.current;
        if (range !== null && boxElem !== null) {
          const {
            left,
            bottom,
            width
          } = range.getBoundingClientRect();
          const selectionRects = selection.createRectsFromDOMRange(editor, range);
          let correctedLeft = selectionRects.length === 1 ? left + width / 2 - 125 : left - 125;
          if (correctedLeft < 10) {
            correctedLeft = 10;
          }
          boxElem.style.left = `${correctedLeft}px`;
          boxElem.style.top = `${bottom + 20}px`;
          const selectionRectsLength = selectionRects.length;
          const {
            container
          } = selectionState;
          const elements = selectionState.elements;
          const elementsLength = elements.length;
          for (let i = 0; i < selectionRectsLength; i++) {
            const selectionRect = selectionRects[i];
            let elem = elements[i];
            if (elem === undefined) {
              elem = document.createElement('span');
              elements[i] = elem;
              container.appendChild(elem);
            }
            const color = '255, 212, 0';
            const style = `position:absolute;top:${selectionRect.top}px;left:${selectionRect.left}px;height:${selectionRect.height}px;width:${selectionRect.width}px;background-color:rgba(${color}, 0.3);pointer-events:none;z-index:5;`;
            elem.style.cssText = style;
          }
          for (let i = elementsLength - 1; i >= selectionRectsLength; i--) {
            const elem = elements[i];
            container.removeChild(elem);
            elements.pop();
          }
        }
      }
    });
  }, [editor, selectionState]);
  useLayoutEffect(() => {
    updateLocation();
    const container = selectionState.container;
    const body = document.body;
    if (body !== null) {
      body.appendChild(container);
      return () => {
        body.removeChild(container);
      };
    }
  }, [selectionState.container, updateLocation]);
  React.useEffect(() => {
    window.addEventListener('resize', updateLocation);
    return () => {
      window.removeEventListener('resize', updateLocation);
    };
  }, [updateLocation]);
  const onEscape = event => {
    event.preventDefault();
    cancelAddComment();
    return true;
  };
  const submitComment = () => {
    if (canSubmit) {
      let quote = editor.getEditorState().read(() => {
        const selection = lexical.$getSelection();
        return selection !== null ? selection.getTextContent() : '';
      });
      if (quote.length > 100) {
        quote = quote.slice(0, 99) + '…';
      }
      submitAddComment(createThread(quote, [createComment(content, author)]), true);
    }
  };
  const onChange = useOnChange(setContent, setCanSubmit);
  return /*#__PURE__*/React.createElement("div", {
    className: "CommentPlugin_CommentInputBox",
    ref: boxRef
  }, /*#__PURE__*/React.createElement(PlainTextEditor, {
    className: "CommentPlugin_CommentInputBox_Editor",
    onEscape: onEscape,
    onChange: onChange
  }), /*#__PURE__*/React.createElement("div", {
    className: "CommentPlugin_CommentInputBox_Buttons"
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: cancelAddComment,
    className: "CommentPlugin_CommentInputBox_Button"
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    onClick: submitComment,
    disabled: !canSubmit,
    className: "CommentPlugin_CommentInputBox_Button primary"
  }, "Comment")));
}
function CommentsComposer({
  submitAddComment,
  thread,
  placeholder
}) {
  const [content, setContent] = React.useState('');
  const [canSubmit, setCanSubmit] = React.useState(false);
  const editorRef = React.useRef(null);
  const author = useCollabAuthorName();
  const onChange = useOnChange(setContent, setCanSubmit);
  const submitComment = () => {
    if (canSubmit) {
      submitAddComment(createComment(content, author), false, thread);
      const editor = editorRef.current;
      if (editor !== null) {
        editor.dispatchCommand(lexical.CLEAR_EDITOR_COMMAND, undefined);
      }
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PlainTextEditor, {
    className: "CommentPlugin_CommentsPanel_Editor",
    autoFocus: false,
    onEscape: () => {
      return true;
    },
    onChange: onChange,
    editorRef: editorRef,
    placeholder: placeholder
  }), /*#__PURE__*/React.createElement(Button, {
    className: "CommentPlugin_CommentsPanel_SendButton",
    onClick: submitComment,
    disabled: !canSubmit
  }, /*#__PURE__*/React.createElement("i", {
    className: "send"
  })));
}
function ShowDeleteCommentOrThreadDialog({
  commentOrThread,
  deleteCommentOrThread,
  onClose,
  thread = undefined
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, "Are you sure you want to delete this ", commentOrThread.type, "?", /*#__PURE__*/React.createElement("div", {
    className: "Modal__content"
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      deleteCommentOrThread(commentOrThread, thread);
      onClose();
    }
  }, "Delete"), ' ', /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      onClose();
    }
  }, "Cancel")));
}
function CommentsPanelListComment({
  comment,
  deleteComment,
  thread,
  rtf
}) {
  const seconds = Math.round((comment.timeStamp - performance.now()) / 1000);
  const minutes = Math.round(seconds / 60);
  const [modal, showModal] = useModal();
  return /*#__PURE__*/React.createElement("li", {
    className: "CommentPlugin_CommentsPanel_List_Comment"
  }, /*#__PURE__*/React.createElement("div", {
    className: "CommentPlugin_CommentsPanel_List_Details"
  }, /*#__PURE__*/React.createElement("span", {
    className: "CommentPlugin_CommentsPanel_List_Comment_Author"
  }, comment.author), /*#__PURE__*/React.createElement("span", {
    className: "CommentPlugin_CommentsPanel_List_Comment_Time"
  }, "\xB7 ", seconds > -10 ? 'Just now' : rtf.format(minutes, 'minute'))), /*#__PURE__*/React.createElement("p", {
    className: comment.deleted ? 'CommentPlugin_CommentsPanel_DeletedComment' : ''
  }, comment.content), !comment.deleted && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      showModal('Delete Comment', onClose => /*#__PURE__*/React.createElement(ShowDeleteCommentOrThreadDialog, {
        commentOrThread: comment,
        deleteCommentOrThread: deleteComment,
        thread: thread,
        onClose: onClose
      }));
    },
    className: "CommentPlugin_CommentsPanel_List_DeleteButton"
  }, /*#__PURE__*/React.createElement("i", {
    className: "delete"
  })), modal));
}
function CommentsPanelList({
  activeIDs,
  comments,
  deleteCommentOrThread,
  listRef,
  submitAddComment,
  markNodeMap
}) {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const [counter, setCounter] = React.useState(0);
  const [modal, showModal] = useModal();
  const rtf = React.useMemo(() => new Intl.RelativeTimeFormat('en', {
    localeMatcher: 'best fit',
    numeric: 'auto',
    style: 'short'
  }), []);
  React.useEffect(() => {
    // Used to keep the time stamp up to date
    const id = setTimeout(() => {
      setCounter(counter + 1);
    }, 10000);
    return () => {
      clearTimeout(id);
    };
  }, [counter]);
  return /*#__PURE__*/React.createElement("ul", {
    className: "CommentPlugin_CommentsPanel_List",
    ref: listRef
  }, comments.map(commentOrThread => {
    const id = commentOrThread.id;
    if (commentOrThread.type === 'thread') {
      const handleClickThread = () => {
        const markNodeKeys = markNodeMap.get(id);
        if (markNodeKeys !== undefined && (activeIDs === null || activeIDs.indexOf(id) === -1)) {
          const activeElement = document.activeElement;
          // Move selection to the start of the mark, so that we
          // update the UI with the selected thread.
          editor.update(() => {
            const markNodeKey = Array.from(markNodeKeys)[0];
            const markNode = lexical.$getNodeByKey(markNodeKey);
            if (mark.$isMarkNode(markNode)) {
              markNode.selectStart();
            }
          }, {
            onUpdate() {
              // Restore selection to the previous element
              if (activeElement !== null) {
                activeElement.focus();
              }
            }
          });
        }
      };
      return (
        /*#__PURE__*/
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        React.createElement("li", {
          key: id,
          onClick: handleClickThread,
          className: `CommentPlugin_CommentsPanel_List_Thread ${markNodeMap.has(id) ? 'interactive' : ''} ${activeIDs.indexOf(id) === -1 ? '' : 'active'}`
        }, /*#__PURE__*/React.createElement("div", {
          className: "CommentPlugin_CommentsPanel_List_Thread_QuoteBox"
        }, /*#__PURE__*/React.createElement("blockquote", {
          className: "CommentPlugin_CommentsPanel_List_Thread_Quote"
        }, '> ', /*#__PURE__*/React.createElement("span", null, commentOrThread.quote)), /*#__PURE__*/React.createElement(Button, {
          onClick: () => {
            showModal('Delete Thread', onClose => /*#__PURE__*/React.createElement(ShowDeleteCommentOrThreadDialog, {
              commentOrThread: commentOrThread,
              deleteCommentOrThread: deleteCommentOrThread,
              onClose: onClose
            }));
          },
          className: "CommentPlugin_CommentsPanel_List_DeleteButton"
        }, /*#__PURE__*/React.createElement("i", {
          className: "delete"
        })), modal), /*#__PURE__*/React.createElement("ul", {
          className: "CommentPlugin_CommentsPanel_List_Thread_Comments"
        }, commentOrThread.comments.map(comment => /*#__PURE__*/React.createElement(CommentsPanelListComment, {
          key: comment.id,
          comment: comment,
          deleteComment: deleteCommentOrThread,
          thread: commentOrThread,
          rtf: rtf
        }))), /*#__PURE__*/React.createElement("div", {
          className: "CommentPlugin_CommentsPanel_List_Thread_Editor"
        }, /*#__PURE__*/React.createElement(CommentsComposer, {
          submitAddComment: submitAddComment,
          thread: commentOrThread,
          placeholder: "Reply to comment..."
        })))
      );
    }
    return /*#__PURE__*/React.createElement(CommentsPanelListComment, {
      key: id,
      comment: commentOrThread,
      deleteComment: deleteCommentOrThread,
      rtf: rtf
    });
  }));
}
function CommentsPanel({
  activeIDs,
  deleteCommentOrThread,
  comments,
  submitAddComment,
  markNodeMap
}) {
  const listRef = React.useRef(null);
  const isEmpty = comments.length === 0;
  return /*#__PURE__*/React.createElement("div", {
    className: "CommentPlugin_CommentsPanel"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "CommentPlugin_CommentsPanel_Heading"
  }, "Comments"), isEmpty ? /*#__PURE__*/React.createElement("div", {
    className: "CommentPlugin_CommentsPanel_Empty"
  }, "No Comments") : /*#__PURE__*/React.createElement(CommentsPanelList, {
    activeIDs: activeIDs,
    comments: comments,
    deleteCommentOrThread: deleteCommentOrThread,
    listRef: listRef,
    submitAddComment: submitAddComment,
    markNodeMap: markNodeMap
  }));
}
function useCollabAuthorName() {
  const collabContext = LexicalCollaborationContext.useCollaborationContext();
  const {
    yjsDocMap,
    name
  } = collabContext;
  return yjsDocMap.has('comments') ? name : 'Playground User';
}
function CommentPlugin({
  providerFactory
}) {
  const collabContext = LexicalCollaborationContext.useCollaborationContext();
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const commentStore = React.useMemo(() => new CommentStore(editor), [editor]);
  const comments = useCommentStore(commentStore);
  const markNodeMap = React.useMemo(() => {
    return new Map();
  }, []);
  const [activeAnchorKey, setActiveAnchorKey] = React.useState();
  const [activeIDs, setActiveIDs] = React.useState([]);
  const [showCommentInput, setShowCommentInput] = React.useState(false);
  const [showComments, setShowComments] = React.useState(false);
  const {
    yjsDocMap
  } = collabContext;
  React.useEffect(() => {
    if (providerFactory) {
      const provider = providerFactory('comments', yjsDocMap);
      return commentStore.registerCollaboration(provider);
    }
  }, [commentStore, providerFactory, yjsDocMap]);
  const cancelAddComment = React.useCallback(() => {
    editor.update(() => {
      const selection = lexical.$getSelection();
      // Restore selection
      if (selection !== null) {
        selection.dirty = true;
      }
    });
    setShowCommentInput(false);
  }, [editor]);
  const deleteCommentOrThread = React.useCallback((comment, thread) => {
    if (comment.type === 'comment') {
      const deletionInfo = commentStore.deleteCommentOrThread(comment, thread);
      if (!deletionInfo) return;
      const {
        markedComment,
        index
      } = deletionInfo;
      commentStore.addComment(markedComment, thread, index);
    } else {
      commentStore.deleteCommentOrThread(comment);
      // Remove ids from associated marks
      const id = thread !== undefined ? thread.id : comment.id;
      const markNodeKeys = markNodeMap.get(id);
      if (markNodeKeys !== undefined) {
        // Do async to avoid causing a React infinite loop
        setTimeout(() => {
          editor.update(() => {
            for (const key of markNodeKeys) {
              const node = lexical.$getNodeByKey(key);
              if (mark.$isMarkNode(node)) {
                node.deleteID(id);
                if (node.getIDs().length === 0) {
                  mark.$unwrapMarkNode(node);
                }
              }
            }
          });
        });
      }
    }
  }, [commentStore, editor, markNodeMap]);
  const submitAddComment = React.useCallback((commentOrThread, isInlineComment, thread) => {
    commentStore.addComment(commentOrThread, thread);
    if (isInlineComment) {
      editor.update(() => {
        const selection = lexical.$getSelection();
        if (lexical.$isRangeSelection(selection)) {
          const focus = selection.focus;
          const anchor = selection.anchor;
          const isBackward = selection.isBackward();
          const id = commentOrThread.id;

          // Wrap content in a MarkNode
          mark.$wrapSelectionInMarkNode(selection, isBackward, id);

          // Make selection collapsed at the end
          if (isBackward) {
            focus.set(anchor.key, anchor.offset, anchor.type);
          } else {
            anchor.set(focus.key, focus.offset, focus.type);
          }
        }
      });
      setShowCommentInput(false);
    }
  }, [commentStore, editor]);
  React.useEffect(() => {
    const changedElems = [];
    for (let i = 0; i < activeIDs.length; i++) {
      const id = activeIDs[i];
      const keys = markNodeMap.get(id);
      if (keys !== undefined) {
        for (const key of keys) {
          const elem = editor.getElementByKey(key);
          if (elem !== null) {
            elem.classList.add('selected');
            changedElems.push(elem);
            setShowComments(true);
          }
        }
      }
    }
    return () => {
      for (let i = 0; i < changedElems.length; i++) {
        const changedElem = changedElems[i];
        changedElem.classList.remove('selected');
      }
    };
  }, [activeIDs, editor, markNodeMap]);
  React.useEffect(() => {
    const markNodeKeysToIDs = new Map();
    return utils.mergeRegister(utils.registerNestedElementResolver(editor, mark.MarkNode, from => {
      return mark.$createMarkNode(from.getIDs());
    }, (from, to) => {
      // Merge the IDs
      const ids = from.getIDs();
      ids.forEach(id => {
        to.addID(id);
      });
    }), editor.registerMutationListener(mark.MarkNode, mutations => {
      editor.getEditorState().read(() => {
        for (const [key, mutation] of mutations) {
          const node = lexical.$getNodeByKey(key);
          let ids = [];
          if (mutation === 'destroyed') {
            ids = markNodeKeysToIDs.get(key) || [];
          } else if (mark.$isMarkNode(node)) {
            ids = node.getIDs();
          }
          for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            let markNodeKeys = markNodeMap.get(id);
            markNodeKeysToIDs.set(key, ids);
            if (mutation === 'destroyed') {
              if (markNodeKeys !== undefined) {
                markNodeKeys.delete(key);
                if (markNodeKeys.size === 0) {
                  markNodeMap.delete(id);
                }
              }
            } else {
              if (markNodeKeys === undefined) {
                markNodeKeys = new Set();
                markNodeMap.set(id, markNodeKeys);
              }
              if (!markNodeKeys.has(key)) {
                markNodeKeys.add(key);
              }
            }
          }
        }
      });
    }), editor.registerUpdateListener(({
      editorState,
      tags
    }) => {
      editorState.read(() => {
        const selection = lexical.$getSelection();
        let hasActiveIds = false;
        let hasAnchorKey = false;
        if (lexical.$isRangeSelection(selection)) {
          const anchorNode = selection.anchor.getNode();
          if (lexical.$isTextNode(anchorNode)) {
            const commentIDs = mark.$getMarkIDs(anchorNode, selection.anchor.offset);
            if (commentIDs !== null) {
              setActiveIDs(commentIDs);
              hasActiveIds = true;
            }
            if (!selection.isCollapsed()) {
              setActiveAnchorKey(anchorNode.getKey());
              hasAnchorKey = true;
            }
          }
        }
        if (!hasActiveIds) {
          setActiveIDs(_activeIds => _activeIds.length === 0 ? _activeIds : []);
        }
        if (!hasAnchorKey) {
          setActiveAnchorKey(null);
        }
      });
      if (!tags.has('collaboration')) {
        setShowCommentInput(false);
      }
    }), editor.registerCommand(INSERT_INLINE_COMMAND, () => {
      const domSelection = window.getSelection();
      if (domSelection !== null) {
        domSelection.removeAllRanges();
      }
      setShowCommentInput(true);
      return true;
    }, lexical.COMMAND_PRIORITY_EDITOR));
  }, [editor, markNodeMap]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, showCommentInput && /*#__PURE__*/ReactDOM.createPortal(/*#__PURE__*/React.createElement(CommentInputBox, {
    editor: editor,
    cancelAddComment: cancelAddComment,
    submitAddComment: submitAddComment
  }), document.body), showComments && /*#__PURE__*/ReactDOM.createPortal(/*#__PURE__*/React.createElement(CommentsPanel, {
    comments: comments,
    submitAddComment: submitAddComment,
    deleteCommentOrThread: deleteCommentOrThread,
    activeIDs: activeIDs,
    markNodeMap: markNodeMap
  }), document.body));
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function FileInput({
  accept,
  label,
  onChange,
  'data-test-id': dataTestId
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "Input__wrapper"
  }, /*#__PURE__*/React.createElement("label", {
    className: "Input__label"
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: accept,
    className: "Input__input",
    onChange: e => onChange(e.target.files),
    "data-test-id": dataTestId
  }));
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function TextInput({
  label,
  value,
  onChange,
  placeholder = '',
  'data-test-id': dataTestId
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "Input__wrapper"
  }, /*#__PURE__*/React.createElement("label", {
    className: "Input__label"
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "Input__input",
    placeholder: placeholder,
    value: value,
    onChange: e => {
      onChange(e.target.value);
    },
    "data-test-id": dataTestId
  }));
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const getDOMSelection = targetWindow => CAN_USE_DOM ? (targetWindow || window).getSelection() : null;
const INSERT_IMAGE_COMMAND = lexical.createCommand('INSERT_IMAGE_COMMAND');
function InsertImageUriDialogBody({
  onClick
}) {
  const [src, setSrc] = React.useState('');
  const [altText, setAltText] = React.useState('');
  const isDisabled = src === '';
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TextInput, {
    label: "Image URL",
    placeholder: "i.e. https://source.unsplash.com/random",
    onChange: setSrc,
    value: src,
    "data-test-id": "image-modal-url-input"
  }), /*#__PURE__*/React.createElement(TextInput, {
    label: "Alt Text",
    placeholder: "Random unsplash image",
    onChange: setAltText,
    value: altText,
    "data-test-id": "image-modal-alt-text-input"
  }), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
    "data-test-id": "image-modal-confirm-btn",
    disabled: isDisabled,
    onClick: () => onClick({
      altText,
      src
    })
  }, "Confirm")));
}
function InsertImageUploadedDialogBody({
  onClick
}) {
  const [file, setFile] = React.useState();
  const [src, setSrc] = React.useState('');
  const [altText, setAltText] = React.useState('');
  const isDisabled = file === undefined;
  const loadImage = files => {
    const reader = new FileReader();
    reader.onload = function () {
      if (typeof reader.result === 'string') {
        setSrc(reader.result);
      }
      return '';
    };
    if (files !== null && files[0]) {
      setFile(files[0]);
      reader.readAsDataURL(files[0]);
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FileInput, {
    label: "Image Upload",
    onChange: loadImage,
    accept: "image/*",
    "data-test-id": "image-modal-file-upload"
  }), /*#__PURE__*/React.createElement(TextInput, {
    label: "Alt Text",
    placeholder: "Descriptive alternative text",
    onChange: setAltText,
    value: altText,
    "data-test-id": "image-modal-alt-text-input"
  }), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
    "data-test-id": "image-modal-file-upload-btn",
    disabled: isDisabled,
    onClick: () => {
      if (file) onClick({
        altText,
        file,
        src
      });
    }
  }, "Confirm")));
}
function InsertImageDialog({
  activeEditor,
  onClose
}) {
  const [mode, setMode] = React.useState(null);
  const hasModifier = React.useRef(false);
  React.useEffect(() => {
    hasModifier.current = false;
    const handler = e => {
      hasModifier.current = e.altKey;
    };
    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [activeEditor]);
  const onClick = payload => {
    activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
    onClose();
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, !mode && /*#__PURE__*/React.createElement(DialogButtonsList, null, /*#__PURE__*/React.createElement(Button, {
    "data-test-id": "image-modal-option-url",
    onClick: () => setMode('url')
  }, "URL"), /*#__PURE__*/React.createElement(Button, {
    "data-test-id": "image-modal-option-file",
    onClick: () => setMode('file')
  }, "File")), mode === 'url' && /*#__PURE__*/React.createElement(InsertImageUriDialogBody, {
    onClick: onClick
  }), mode === 'file' && /*#__PURE__*/React.createElement(InsertImageUploadedDialogBody, {
    onClick: onClick
  }));
}
function ImagesPlugin({
  captionsEnabled
}) {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  React.useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error('ImagesPlugin: ImageNode not registered on editor');
    }
    return utils.mergeRegister(editor.registerCommand(INSERT_IMAGE_COMMAND, payload => {
      const imageNode = $createImageNode(payload);
      lexical.$insertNodes([imageNode]);
      if (lexical.$isRootOrShadowRoot(imageNode.getParentOrThrow())) {
        utils.$wrapNodeInElement(imageNode, lexical.$createParagraphNode).selectEnd();
      }
      return true;
    }, lexical.COMMAND_PRIORITY_EDITOR), editor.registerCommand(lexical.DRAGSTART_COMMAND, event => {
      return onDragStart(event);
    }, lexical.COMMAND_PRIORITY_HIGH), editor.registerCommand(lexical.DRAGOVER_COMMAND, event => {
      return onDragover(event);
    }, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.DROP_COMMAND, event => {
      return onDrop(event, editor);
    }, lexical.COMMAND_PRIORITY_HIGH));
  }, [captionsEnabled, editor]);
  return null;
}
const TRANSPARENT_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
const img = document.createElement('img');
img.src = TRANSPARENT_IMAGE;
function onDragStart(event) {
  const node = getImageNodeInSelection();
  if (!node) {
    return false;
  }
  const dataTransfer = event.dataTransfer;
  if (!dataTransfer) {
    return false;
  }
  dataTransfer.setData('text/plain', '_');
  dataTransfer.setDragImage(img, 0, 0);
  dataTransfer.setData('application/x-lexical-drag', JSON.stringify({
    data: {
      altText: node.__altText,
      caption: node.__caption,
      height: node.__height,
      key: node.getKey(),
      maxWidth: node.__maxWidth,
      showCaption: node.__showCaption,
      src: node.__src,
      width: node.__width
    },
    type: 'image'
  }));
  return true;
}
function onDragover(event) {
  const node = getImageNodeInSelection();
  if (!node) {
    return false;
  }
  if (!canDropImage(event)) {
    event.preventDefault();
  }
  return true;
}
function onDrop(event, editor) {
  const node = getImageNodeInSelection();
  if (!node) {
    return false;
  }
  const data = getDragImageData(event);
  if (!data) {
    return false;
  }
  event.preventDefault();
  if (canDropImage(event)) {
    const range = getDragSelection(event);
    node.remove();
    const rangeSelection = lexical.$createRangeSelection();
    if (range !== null && range !== undefined) {
      rangeSelection.applyDOMRange(range);
    }
    lexical.$setSelection(rangeSelection);
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, data);
  }
  return true;
}
function getImageNodeInSelection() {
  const selection = lexical.$getSelection();
  if (!lexical.$isNodeSelection(selection)) {
    return null;
  }
  const nodes = selection.getNodes();
  const node = nodes[0];
  return $isImageNode(node) ? node : null;
}
function getDragImageData(event) {
  const dragData = event.dataTransfer?.getData('application/x-lexical-drag');
  if (!dragData) {
    return null;
  }
  const {
    type,
    data
  } = JSON.parse(dragData);
  if (type !== 'image') {
    return null;
  }
  return data;
}
function canDropImage(event) {
  const target = event.target;
  return !!(target && target instanceof HTMLElement && !target.closest('code, span.editor-image') && target.parentElement && target.parentElement.closest('div.ContentEditable__root'));
}
function getDragSelection(event) {
  let range;
  const target = event.target;
  const targetWindow = target == null ? null : target.nodeType === 9 ? target.defaultView : target.ownerDocument.defaultView;
  const domSelection = getDOMSelection(targetWindow);
  if (document.caretRangeFromPoint) {
    range = document.caretRangeFromPoint(event.clientX, event.clientY);
  } else if (event.rangeParent && domSelection !== null) {
    domSelection.collapse(event.rangeParent, event.rangeOffset || 0);
    range = domSelection.getRangeAt(0);
  } else {
    throw Error(`Cannot get the selection when dragging`);
  }
  return range;
}

const cellHTMLCache = new Map();
const cellTextContentCache = new Map();
const emptyEditorJSON = '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';
const plainTextEditorJSON = text => text === '' ? emptyEditorJSON : `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":${text},"type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`;
const TableComponent$2 = /*#__PURE__*/React.lazy(
// @ts-ignore
() => Promise.resolve().then(function () { return TableComponent$1; }));
function createUID$1() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
}
function createCell(type) {
  return {
    colSpan: 1,
    id: createUID$1(),
    json: emptyEditorJSON,
    type,
    width: null
  };
}
function createRow() {
  return {
    cells: [],
    height: null,
    id: createUID$1()
  };
}
function extractRowsFromHTML(tableElem) {
  const rowElems = tableElem.querySelectorAll('tr');
  const rows = [];
  for (let y = 0; y < rowElems.length; y++) {
    const rowElem = rowElems[y];
    const cellElems = rowElem.querySelectorAll('td,th');
    if (!cellElems || cellElems.length === 0) {
      continue;
    }
    const cells = [];
    for (let x = 0; x < cellElems.length; x++) {
      const cellElem = cellElems[x];
      const isHeader = cellElem.nodeName === 'TH';
      const cell = createCell(isHeader ? 'header' : 'normal');
      cell.json = plainTextEditorJSON(JSON.stringify(cellElem.innerText.replace(/\n/g, ' ')));
      cells.push(cell);
    }
    const row = createRow();
    row.cells = cells;
    rows.push(row);
  }
  return rows;
}
function convertTableElement(domNode) {
  const rowElems = domNode.querySelectorAll('tr');
  if (!rowElems || rowElems.length === 0) {
    return null;
  }
  const rows = [];
  for (let y = 0; y < rowElems.length; y++) {
    const rowElem = rowElems[y];
    const cellElems = rowElem.querySelectorAll('td,th');
    if (!cellElems || cellElems.length === 0) {
      continue;
    }
    const cells = [];
    for (let x = 0; x < cellElems.length; x++) {
      const cellElem = cellElems[x];
      const isHeader = cellElem.nodeName === 'TH';
      const cell = createCell(isHeader ? 'header' : 'normal');
      cell.json = plainTextEditorJSON(JSON.stringify(cellElem.innerText.replace(/\n/g, ' ')));
      cells.push(cell);
    }
    const row = createRow();
    row.cells = cells;
    rows.push(row);
  }
  return {
    node: $createTableNode(rows)
  };
}
function exportTableCellsToHTML(rows, rect) {
  const table = document.createElement('table');
  const colGroup = document.createElement('colgroup');
  const tBody = document.createElement('tbody');
  const firstRow = rows[0];
  for (let x = rect != null ? rect.startX : 0; x < (rect != null ? rect.endX + 1 : firstRow.cells.length); x++) {
    const col = document.createElement('col');
    colGroup.append(col);
  }
  for (let y = rect != null ? rect.startY : 0; y < (rect != null ? rect.endY + 1 : rows.length); y++) {
    const row = rows[y];
    const cells = row.cells;
    const rowElem = document.createElement('tr');
    for (let x = rect != null ? rect.startX : 0; x < (rect != null ? rect.endX + 1 : cells.length); x++) {
      const cell = cells[x];
      const cellElem = document.createElement(cell.type === 'header' ? 'th' : 'td');
      cellElem.innerHTML = cellHTMLCache.get(cell.json) || '';
      rowElem.appendChild(cellElem);
    }
    tBody.appendChild(rowElem);
  }
  table.appendChild(colGroup);
  table.appendChild(tBody);
  return table;
}
class TableNode extends lexical.DecoratorNode {
  static getType() {
    return 'tablesheet';
  }
  static clone(node) {
    return new TableNode(Array.from(node.__rows), node.__key);
  }
  static importJSON(serializedNode) {
    return $createTableNode(serializedNode.rows);
  }
  exportJSON() {
    return {
      rows: this.__rows,
      type: 'tablesheet',
      version: 1
    };
  }
  static importDOM() {
    return {
      table: _node => ({
        conversion: convertTableElement,
        priority: 0
      })
    };
  }
  exportDOM() {
    return {
      element: exportTableCellsToHTML(this.__rows)
    };
  }
  constructor(rows, key) {
    super(key);
    _defineProperty(this, "__rows", void 0);
    this.__rows = rows || [];
  }
  createDOM() {
    return document.createElement('div');
  }
  updateDOM() {
    return false;
  }
  mergeRows(startX, startY, mergeRows) {
    const self = this.getWritable();
    const rows = self.__rows;
    const endY = Math.min(rows.length, startY + mergeRows.length);
    for (let y = startY; y < endY; y++) {
      const row = rows[y];
      const mergeRow = mergeRows[y - startY];
      const cells = row.cells;
      const cellsClone = Array.from(cells);
      const rowClone = {
        ...row,
        cells: cellsClone
      };
      const mergeCells = mergeRow.cells;
      const endX = Math.min(cells.length, startX + mergeCells.length);
      for (let x = startX; x < endX; x++) {
        const cell = cells[x];
        const mergeCell = mergeCells[x - startX];
        const cellClone = {
          ...cell,
          json: mergeCell.json,
          type: mergeCell.type
        };
        cellsClone[x] = cellClone;
      }
      rows[y] = rowClone;
    }
  }
  updateCellJSON(x, y, json) {
    const self = this.getWritable();
    const rows = self.__rows;
    const row = rows[y];
    const cells = row.cells;
    const cell = cells[x];
    const cellsClone = Array.from(cells);
    const cellClone = {
      ...cell,
      json
    };
    const rowClone = {
      ...row,
      cells: cellsClone
    };
    cellsClone[x] = cellClone;
    rows[y] = rowClone;
  }
  updateCellType(x, y, type) {
    const self = this.getWritable();
    const rows = self.__rows;
    const row = rows[y];
    const cells = row.cells;
    const cell = cells[x];
    const cellsClone = Array.from(cells);
    const cellClone = {
      ...cell,
      type
    };
    const rowClone = {
      ...row,
      cells: cellsClone
    };
    cellsClone[x] = cellClone;
    rows[y] = rowClone;
  }
  insertColumnAt(x) {
    const self = this.getWritable();
    const rows = self.__rows;
    for (let y = 0; y < rows.length; y++) {
      const row = rows[y];
      const cells = row.cells;
      const cellsClone = Array.from(cells);
      const rowClone = {
        ...row,
        cells: cellsClone
      };
      const type = (cells[x] || cells[x - 1]).type;
      cellsClone.splice(x, 0, createCell(type));
      rows[y] = rowClone;
    }
  }
  deleteColumnAt(x) {
    const self = this.getWritable();
    const rows = self.__rows;
    for (let y = 0; y < rows.length; y++) {
      const row = rows[y];
      const cells = row.cells;
      const cellsClone = Array.from(cells);
      const rowClone = {
        ...row,
        cells: cellsClone
      };
      cellsClone.splice(x, 1);
      rows[y] = rowClone;
    }
  }
  addColumns(count) {
    const self = this.getWritable();
    const rows = self.__rows;
    for (let y = 0; y < rows.length; y++) {
      const row = rows[y];
      const cells = row.cells;
      const cellsClone = Array.from(cells);
      const rowClone = {
        ...row,
        cells: cellsClone
      };
      const type = cells[cells.length - 1].type;
      for (let x = 0; x < count; x++) {
        cellsClone.push(createCell(type));
      }
      rows[y] = rowClone;
    }
  }
  insertRowAt(y) {
    const self = this.getWritable();
    const rows = self.__rows;
    const prevRow = rows[y] || rows[y - 1];
    const cellCount = prevRow.cells.length;
    const row = createRow();
    for (let x = 0; x < cellCount; x++) {
      const cell = createCell(prevRow.cells[x].type);
      row.cells.push(cell);
    }
    rows.splice(y, 0, row);
  }
  deleteRowAt(y) {
    const self = this.getWritable();
    const rows = self.__rows;
    rows.splice(y, 1);
  }
  addRows(count) {
    const self = this.getWritable();
    const rows = self.__rows;
    const prevRow = rows[rows.length - 1];
    const cellCount = prevRow.cells.length;
    for (let y = 0; y < count; y++) {
      const row = createRow();
      for (let x = 0; x < cellCount; x++) {
        const cell = createCell(prevRow.cells[x].type);
        row.cells.push(cell);
      }
      rows.push(row);
    }
  }
  updateColumnWidth(x, width) {
    const self = this.getWritable();
    const rows = self.__rows;
    for (let y = 0; y < rows.length; y++) {
      const row = rows[y];
      const cells = row.cells;
      const cellsClone = Array.from(cells);
      const rowClone = {
        ...row,
        cells: cellsClone
      };
      cellsClone[x].width = width;
      rows[y] = rowClone;
    }
  }
  decorate(_, config) {
    return /*#__PURE__*/React.createElement(React.Suspense, null, /*#__PURE__*/React.createElement(TableComponent$2, {
      nodeKey: this.__key,
      theme: config.theme,
      rows: this.__rows
    }));
  }
  isInline() {
    return false;
  }
}
function $isTableNode(node) {
  return node instanceof TableNode;
}
function $createTableNode(rows) {
  return new TableNode(rows);
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
lexical.createCommand('INSERT_NEW_TABLE_COMMAND');
const CellContext = /*#__PURE__*/React.createContext({
  cellEditorConfig: null,
  cellEditorPlugins: null,
  set: () => {
    // Empty
  }
});
function InsertTableDialog({
  activeEditor,
  onClose
}) {
  const [rows, setRows] = React.useState('5');
  const [columns, setColumns] = React.useState('5');
  const onClick = () => {
    activeEditor.dispatchCommand(table.INSERT_TABLE_COMMAND, {
      columns,
      rows
    });
    onClose();
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TextInput, {
    label: "No of rows",
    onChange: setRows,
    value: rows
  }), /*#__PURE__*/React.createElement(TextInput, {
    label: "No of columns",
    onChange: setColumns,
    value: columns
  }), /*#__PURE__*/React.createElement(DialogActions, {
    "data-test-id": "table-model-confirm-insert"
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: onClick
  }, "Confirm")));
}

class ComponentPickerOption extends LexicalTypeaheadMenuPlugin.TypeaheadOption {
  // What shows up in the editor

  // Icon for display

  // For extra searching.

  // TBD

  // What happens when you select this option?

  constructor(title, options) {
    super(title);
    _defineProperty(this, "title", void 0);
    _defineProperty(this, "icon", void 0);
    _defineProperty(this, "keywords", void 0);
    _defineProperty(this, "keyboardShortcut", void 0);
    _defineProperty(this, "onSelect", void 0);
    this.title = title;
    this.keywords = options.keywords || [];
    this.icon = options.icon;
    this.keyboardShortcut = options.keyboardShortcut;
    this.onSelect = options.onSelect.bind(this);
  }
}
function ComponentPickerMenuItem({
  index,
  isSelected,
  onClick,
  onMouseEnter,
  option
}) {
  let className = 'item';
  if (isSelected) {
    className += ' selected';
  }
  return /*#__PURE__*/React.createElement("li", {
    key: option.key,
    tabIndex: -1,
    className: className,
    ref: option.setRefElement,
    role: "option",
    "aria-selected": isSelected,
    id: 'typeahead-item-' + index,
    onMouseEnter: onMouseEnter,
    onClick: onClick
  }, option.icon, /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, option.title));
}
function ComponentPickerMenuPlugin() {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const [modal, showModal] = useModal();
  const [queryString, setQueryString] = React.useState(null);
  const checkForTriggerMatch = LexicalTypeaheadMenuPlugin.useBasicTypeaheadTriggerMatch('/', {
    minLength: 0
  });
  const getDynamicOptions = React.useCallback(() => {
    const options = [];
    if (queryString == null) {
      return options;
    }
    const fullTableRegex = new RegExp(/^([1-9]|10)x([1-9]|10)$/);
    const partialTableRegex = new RegExp(/^([1-9]|10)x?$/);
    const fullTableMatch = fullTableRegex.exec(queryString);
    const partialTableMatch = partialTableRegex.exec(queryString);
    if (fullTableMatch) {
      const [rows, columns] = fullTableMatch[0].split('x').map(n => parseInt(n, 10));
      options.push(new ComponentPickerOption(`${rows}x${columns} Table`, {
        icon: /*#__PURE__*/React.createElement("i", {
          className: "icon table"
        }),
        keywords: ['table'],
        onSelect: () =>
        // @ts-ignore Correct types, but since they're dynamic TS doesn't like it.
        editor.dispatchCommand(table.INSERT_TABLE_COMMAND, {
          columns,
          rows
        })
      }));
    } else if (partialTableMatch) {
      const rows = parseInt(partialTableMatch[0], 10);
      options.push(...Array.from({
        length: 5
      }, (_, i) => i + 1).map(columns => new ComponentPickerOption(`${rows}x${columns} Table`, {
        icon: /*#__PURE__*/React.createElement("i", {
          className: "icon table"
        }),
        keywords: ['table'],
        onSelect: () =>
        // @ts-ignore Correct types, but since they're dynamic TS doesn't like it.
        editor.dispatchCommand(table.INSERT_TABLE_COMMAND, {
          columns,
          rows
        })
      })));
    }
    return options;
  }, [editor, queryString]);
  const options = React.useMemo(() => {
    const baseOptions = [new ComponentPickerOption('Paragraph', {
      icon: /*#__PURE__*/React.createElement("i", {
        className: "icon paragraph"
      }),
      keywords: ['normal', 'paragraph', 'p', 'text'],
      onSelect: () => editor.update(() => {
        const selection$1 = lexical.$getSelection();
        if (lexical.$isRangeSelection(selection$1)) {
          selection.$setBlocksType_experimental(selection$1, () => lexical.$createParagraphNode());
        }
      })
    }), ...Array.from({
      length: 3
    }, (_, i) => i + 1).map(n => new ComponentPickerOption(`Heading ${n}`, {
      icon: /*#__PURE__*/React.createElement("i", {
        className: `icon h${n}`
      }),
      keywords: ['heading', 'header', `h${n}`],
      onSelect: () => editor.update(() => {
        const selection$1 = lexical.$getSelection();
        if (lexical.$isRangeSelection(selection$1)) {
          selection.$setBlocksType_experimental(selection$1, () =>
          // @ts-ignore Correct types, but since they're dynamic TS doesn't like it.
          richText.$createHeadingNode(`h${n}`));
        }
      })
    })), new ComponentPickerOption('Table', {
      icon: /*#__PURE__*/React.createElement("i", {
        className: "icon table"
      }),
      keywords: ['table', 'grid', 'spreadsheet', 'rows', 'columns'],
      onSelect: () => showModal('Insert Table', onClose => /*#__PURE__*/React.createElement(InsertTableDialog, {
        activeEditor: editor,
        onClose: onClose
      }))
    }),
    // new ComponentPickerOption('Table (Experimental)', {
    //   icon: <i className="icon table" />,
    //   keywords: ['table', 'grid', 'spreadsheet', 'rows', 'columns'],
    //   onSelect: () =>
    //     showModal('Insert Table', (onClose) => (
    //       <InsertNewTableDialog activeEditor={editor} onClose={onClose} />
    //     )),
    // }),
    new ComponentPickerOption('Numbered List', {
      icon: /*#__PURE__*/React.createElement("i", {
        className: "icon number"
      }),
      keywords: ['numbered list', 'ordered list', 'ol'],
      onSelect: () => editor.dispatchCommand(list.INSERT_ORDERED_LIST_COMMAND, undefined)
    }), new ComponentPickerOption('Bulleted List', {
      icon: /*#__PURE__*/React.createElement("i", {
        className: "icon bullet"
      }),
      keywords: ['bulleted list', 'unordered list', 'ul'],
      onSelect: () => editor.dispatchCommand(list.INSERT_UNORDERED_LIST_COMMAND, undefined)
    }), new ComponentPickerOption('Check List', {
      icon: /*#__PURE__*/React.createElement("i", {
        className: "icon check"
      }),
      keywords: ['check list', 'todo list'],
      onSelect: () => editor.dispatchCommand(list.INSERT_CHECK_LIST_COMMAND, undefined)
    }), new ComponentPickerOption('Quote', {
      icon: /*#__PURE__*/React.createElement("i", {
        className: "icon quote"
      }),
      keywords: ['block quote'],
      onSelect: () => editor.update(() => {
        const selection$1 = lexical.$getSelection();
        if (lexical.$isRangeSelection(selection$1)) {
          selection.$setBlocksType_experimental(selection$1, () => richText.$createQuoteNode());
        }
      })
    }), new ComponentPickerOption('Code', {
      icon: /*#__PURE__*/React.createElement("i", {
        className: "icon code"
      }),
      keywords: ['javascript', 'python', 'js', 'codeblock'],
      onSelect: () => editor.update(() => {
        const selection$1 = lexical.$getSelection();
        if (lexical.$isRangeSelection(selection$1)) {
          if (selection$1.isCollapsed()) {
            selection.$setBlocksType_experimental(selection$1, () => code.$createCodeNode());
          } else {
            // Will this ever happen?
            const textContent = selection$1.getTextContent();
            const codeNode = code.$createCodeNode();
            selection$1.insertNodes([codeNode]);
            selection$1.insertRawText(textContent);
          }
        }
      })
    }),
    // new ComponentPickerOption('Divider', {
    //   icon: <i className="icon horizontal-rule" />,
    //   keywords: ['horizontal rule', 'divider', 'hr'],
    //   onSelect: () =>
    //     editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined),
    // }),

    // new ComponentPickerOption('Poll', {
    //   icon: <i className="icon poll" />,
    //   keywords: ['poll', 'vote'],
    //   onSelect: () =>
    //     showModal('Insert Poll', (onClose) => (
    //       <InsertPollDialog activeEditor={editor} onClose={onClose} />
    //     )),
    // }),
    ...EmbedConfigs.map(embedConfig => new ComponentPickerOption(`Embed ${embedConfig.contentName}`, {
      icon: embedConfig.icon,
      keywords: [...embedConfig.keywords, 'embed'],
      onSelect: () => editor.dispatchCommand(LexicalAutoEmbedPlugin.INSERT_EMBED_COMMAND, embedConfig.type)
    })),
    // new ComponentPickerOption('Equation', {
    //   icon: <i className="icon equation" />,
    //   keywords: ['equation', 'latex', 'math'],
    //   onSelect: () =>
    //     showModal('Insert Equation', (onClose) => (
    //       <InsertEquationDialog activeEditor={editor} onClose={onClose} />
    //     )),
    // }),
    // new ComponentPickerOption('GIF', {
    //   icon: <i className="icon gif" />,
    //   keywords: ['gif', 'animate', 'image', 'file'],
    //   onSelect: () =>
    //     editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
    //       altText: 'Cat typing on a laptop',
    //       src: '',
    //     }),
    // }),
    new ComponentPickerOption('Image', {
      icon: /*#__PURE__*/React.createElement("i", {
        className: "icon image"
      }),
      keywords: ['image', 'photo', 'picture', 'file'],
      onSelect: () => showModal('Insert Image', onClose => /*#__PURE__*/React.createElement(InsertImageDialog, {
        activeEditor: editor,
        onClose: onClose
      }))
    }), new ComponentPickerOption('Collapsible', {
      icon: /*#__PURE__*/React.createElement("i", {
        className: "icon caret-right"
      }),
      keywords: ['collapse', 'collapsible', 'toggle'],
      onSelect: () => editor.dispatchCommand(INSERT_COLLAPSIBLE_COMMAND, undefined)
    }), ...['left', 'center', 'right', 'justify'].map(alignment => new ComponentPickerOption(`Align ${alignment}`, {
      icon: /*#__PURE__*/React.createElement("i", {
        className: `icon ${alignment}-align`
      }),
      keywords: ['align', 'justify', alignment],
      onSelect: () =>
      // @ts-ignore Correct types, but since they're dynamic TS doesn't like it.
      editor.dispatchCommand(lexical.FORMAT_ELEMENT_COMMAND, alignment)
    }))];
    const dynamicOptions = getDynamicOptions();
    return queryString ? [...dynamicOptions, ...baseOptions.filter(option => {
      return new RegExp(queryString, 'gi').exec(option.title) || option.keywords != null ? option.keywords.some(keyword => new RegExp(queryString, 'gi').exec(keyword)) : false;
    })] : baseOptions;
  }, [editor, getDynamicOptions, queryString, showModal]);
  const onSelectOption = React.useCallback((selectedOption, nodeToRemove, closeMenu, matchingString) => {
    editor.update(() => {
      if (nodeToRemove) {
        nodeToRemove.remove();
      }
      selectedOption.onSelect(matchingString);
      closeMenu();
    });
  }, [editor]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, modal, /*#__PURE__*/React.createElement(LexicalTypeaheadMenuPlugin.LexicalTypeaheadMenuPlugin, {
    onQueryChange: setQueryString,
    onSelectOption: onSelectOption,
    triggerFn: checkForTriggerMatch,
    options: options,
    menuRenderFn: (anchorElementRef, {
      selectedIndex,
      selectOptionAndCleanUp,
      setHighlightedIndex
    }) => anchorElementRef.current && options.length ? /*#__PURE__*/ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
      className: "typeahead-popovers component-picker-menu"
    }, /*#__PURE__*/React.createElement("ul", null, options.map((option, i) => /*#__PURE__*/React.createElement(ComponentPickerMenuItem, {
      index: i,
      isSelected: selectedIndex === i,
      onClick: () => {
        setHighlightedIndex(i);
        selectOptionAndCleanUp(option);
      },
      onMouseEnter: () => {
        setHighlightedIndex(i);
      },
      key: option.key,
      option: option
    })))), anchorElementRef.current) : null
  }));
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const ACCEPTABLE_IMAGE_TYPES = ['image/', 'image/heic', 'image/heif', 'image/gif', 'image/webp'];
function DragDropPaste() {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  React.useEffect(() => {
    return editor.registerCommand(richText.DRAG_DROP_PASTE, files => {
      (async () => {
        const filesResult = await utils.mediaFileReader(files, [ACCEPTABLE_IMAGE_TYPES].flatMap(x => x));
        for (const {
          file,
          result
        } of filesResult) {
          if (utils.isMimeType(file, ACCEPTABLE_IMAGE_TYPES)) {
            editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
              altText: '',
              file,
              src: result
            });
          }
        }
      })();
      return true;
    }, lexical.COMMAND_PRIORITY_LOW);
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
function isHTMLElement(x) {
  return x instanceof HTMLElement;
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
class Point {
  constructor(x, y) {
    _defineProperty(this, "_x", void 0);
    _defineProperty(this, "_y", void 0);
    this._x = x;
    this._y = y;
  }
  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  equals({
    x,
    y
  }) {
    return this.x === x && this.y === y;
  }
  calcDeltaXTo({
    x
  }) {
    return this.x - x;
  }
  calcDeltaYTo({
    y
  }) {
    return this.y - y;
  }
  calcHorizontalDistanceTo(point) {
    return Math.abs(this.calcDeltaXTo(point));
  }
  calcVerticalDistance(point) {
    return Math.abs(this.calcDeltaYTo(point));
  }
  calcDistanceTo(point) {
    return Math.sqrt(Math.pow(this.calcDeltaXTo(point), 2) + Math.pow(this.calcDeltaYTo(point), 2));
  }
}
function isPoint(x) {
  return x instanceof Point;
}

class Rect {
  constructor(left, top, right, bottom) {
    _defineProperty(this, "_left", void 0);
    _defineProperty(this, "_top", void 0);
    _defineProperty(this, "_right", void 0);
    _defineProperty(this, "_bottom", void 0);
    const [physicTop, physicBottom] = top <= bottom ? [top, bottom] : [bottom, top];
    const [physicLeft, physicRight] = left <= right ? [left, right] : [right, left];
    this._top = physicTop;
    this._right = physicRight;
    this._left = physicLeft;
    this._bottom = physicBottom;
  }
  get top() {
    return this._top;
  }
  get right() {
    return this._right;
  }
  get bottom() {
    return this._bottom;
  }
  get left() {
    return this._left;
  }
  get width() {
    return Math.abs(this._left - this._right);
  }
  get height() {
    return Math.abs(this._bottom - this._top);
  }
  equals({
    top,
    left,
    bottom,
    right
  }) {
    return top === this._top && bottom === this._bottom && left === this._left && right === this._right;
  }
  contains(target) {
    if (isPoint(target)) {
      const {
        x,
        y
      } = target;
      const isOnTopSide = y < this._top;
      const isOnBottomSide = y > this._bottom;
      const isOnLeftSide = x < this._left;
      const isOnRightSide = x > this._right;
      const result = !isOnTopSide && !isOnBottomSide && !isOnLeftSide && !isOnRightSide;
      return {
        reason: {
          isOnBottomSide,
          isOnLeftSide,
          isOnRightSide,
          isOnTopSide
        },
        result
      };
    } else {
      const {
        top,
        left,
        bottom,
        right
      } = target;
      return top >= this._top && top <= this._bottom && bottom >= this._top && bottom <= this._bottom && left >= this._left && left <= this._right && right >= this._left && right <= this._right;
    }
  }
  intersectsWith(rect) {
    const {
      left: x1,
      top: y1,
      width: w1,
      height: h1
    } = rect;
    const {
      left: x2,
      top: y2,
      width: w2,
      height: h2
    } = this;
    const maxX = x1 + w1 >= x2 + w2 ? x1 + w1 : x2 + w2;
    const maxY = y1 + h1 >= y2 + h2 ? y1 + h1 : y2 + h2;
    const minX = x1 <= x2 ? x1 : x2;
    const minY = y1 <= y2 ? y1 : y2;
    return maxX - minX <= w1 + w2 && maxY - minY <= h1 + h2;
  }
  generateNewRect({
    left = this.left,
    top = this.top,
    right = this.right,
    bottom = this.bottom
  }) {
    return new Rect(left, top, right, bottom);
  }
  static fromLTRB(left, top, right, bottom) {
    return new Rect(left, top, right, bottom);
  }
  static fromLWTH(left, width, top, height) {
    return new Rect(left, top, left + width, top + height);
  }
  static fromPoints(startPoint, endPoint) {
    const {
      y: top,
      x: left
    } = startPoint;
    const {
      y: bottom,
      x: right
    } = endPoint;
    return Rect.fromLTRB(left, top, right, bottom);
  }
  static fromDOM(dom) {
    const {
      top,
      width,
      left,
      height
    } = dom.getBoundingClientRect();
    return Rect.fromLWTH(left, width, top, height);
  }
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const SPACE = 4;
const TARGET_LINE_HALF_HEIGHT = 2;
const DRAGGABLE_BLOCK_MENU_CLASSNAME = 'draggable-block-menu';
const DRAG_DATA_FORMAT = 'application/x-lexical-drag-block';
const TEXT_BOX_HORIZONTAL_PADDING = 28;
const Downward = 1;
const Upward = -1;
const Indeterminate = 0;
let prevIndex = Infinity;
function getCurrentIndex(keysLength) {
  if (keysLength === 0) {
    return Infinity;
  }
  if (prevIndex >= 0 && prevIndex < keysLength) {
    return prevIndex;
  }
  return Math.floor(keysLength / 2);
}
function getTopLevelNodeKeys(editor) {
  return editor.getEditorState().read(() => lexical.$getRoot().getChildrenKeys());
}
function getBlockElement(anchorElem, editor, event) {
  const anchorElementRect = anchorElem.getBoundingClientRect();
  const topLevelNodeKeys = getTopLevelNodeKeys(editor);
  let blockElem = null;
  editor.getEditorState().read(() => {
    let index = getCurrentIndex(topLevelNodeKeys.length);
    let direction = Indeterminate;
    while (index >= 0 && index < topLevelNodeKeys.length) {
      const key = topLevelNodeKeys[index];
      const elem = editor.getElementByKey(key);
      if (elem === null) {
        break;
      }
      const point = new Point(event.x, event.y);
      const domRect = Rect.fromDOM(elem);
      const {
        marginTop,
        marginBottom
      } = window.getComputedStyle(elem);
      const rect = domRect.generateNewRect({
        bottom: domRect.bottom + parseFloat(marginBottom),
        left: anchorElementRect.left,
        right: anchorElementRect.right,
        top: domRect.top - parseFloat(marginTop)
      });
      const {
        result,
        reason: {
          isOnTopSide,
          isOnBottomSide
        }
      } = rect.contains(point);
      if (result) {
        blockElem = elem;
        prevIndex = index;
        break;
      }
      if (direction === Indeterminate) {
        if (isOnTopSide) {
          direction = Upward;
        } else if (isOnBottomSide) {
          direction = Downward;
        } else {
          // stop search block element
          direction = Infinity;
        }
      }
      index += direction;
    }
  });
  return blockElem;
}
function isOnMenu(element) {
  return !!element.closest(`.${DRAGGABLE_BLOCK_MENU_CLASSNAME}`);
}
function setMenuPosition(targetElem, floatingElem, anchorElem) {
  if (!targetElem) {
    floatingElem.style.opacity = '0';
    floatingElem.style.transform = 'translate(-10000px, -10000px)';
    return;
  }
  const targetRect = targetElem.getBoundingClientRect();
  const targetStyle = window.getComputedStyle(targetElem);
  const floatingElemRect = floatingElem.getBoundingClientRect();
  const anchorElementRect = anchorElem.getBoundingClientRect();
  const top = targetRect.top + (parseInt(targetStyle.lineHeight, 10) - floatingElemRect.height) / 2 - anchorElementRect.top;
  const left = SPACE;
  floatingElem.style.opacity = '1';
  floatingElem.style.transform = `translate(${left}px, ${top}px)`;
}
function setDragImage(dataTransfer, draggableBlockElem) {
  const {
    transform
  } = draggableBlockElem.style;

  // Remove dragImage borders
  draggableBlockElem.style.transform = 'translateZ(0)';
  dataTransfer.setDragImage(draggableBlockElem, 0, 0);
  setTimeout(() => {
    draggableBlockElem.style.transform = transform;
  });
}
function setTargetLine(targetLineElem, targetBlockElem, mouseY, anchorElem) {
  const targetStyle = window.getComputedStyle(targetBlockElem);
  const {
    top: targetBlockElemTop,
    height: targetBlockElemHeight
  } = targetBlockElem.getBoundingClientRect();
  const {
    top: anchorTop,
    width: anchorWidth
  } = anchorElem.getBoundingClientRect();
  let lineTop = targetBlockElemTop;
  // At the bottom of the target
  if (mouseY - targetBlockElemTop > targetBlockElemHeight / 2) {
    lineTop += targetBlockElemHeight + parseFloat(targetStyle.marginBottom);
  } else {
    lineTop -= parseFloat(targetStyle.marginTop);
  }
  const top = lineTop - anchorTop - TARGET_LINE_HALF_HEIGHT;
  const left = TEXT_BOX_HORIZONTAL_PADDING - SPACE;
  targetLineElem.style.transform = `translate(${left}px, ${top}px)`;
  targetLineElem.style.width = `${anchorWidth - (TEXT_BOX_HORIZONTAL_PADDING - SPACE) * 2}px`;
  targetLineElem.style.opacity = '.4';
}
function hideTargetLine(targetLineElem) {
  if (targetLineElem) {
    targetLineElem.style.opacity = '0';
    targetLineElem.style.transform = 'translate(-10000px, -10000px)';
  }
}
function useDraggableBlockMenu(editor, anchorElem, isEditable) {
  const scrollerElem = anchorElem.parentElement;
  const menuRef = React.useRef(null);
  const targetLineRef = React.useRef(null);
  const [draggableBlockElem, setDraggableBlockElem] = React.useState(null);
  React.useEffect(() => {
    function onMouseMove(event) {
      const target = event.target;
      if (!isHTMLElement(target)) {
        setDraggableBlockElem(null);
        return;
      }
      if (isOnMenu(target)) {
        return;
      }
      const _draggableBlockElem = getBlockElement(anchorElem, editor, event);
      setDraggableBlockElem(_draggableBlockElem);
    }
    function onMouseLeave() {
      setDraggableBlockElem(null);
    }
    scrollerElem?.addEventListener('mousemove', onMouseMove);
    scrollerElem?.addEventListener('mouseleave', onMouseLeave);
    return () => {
      scrollerElem?.removeEventListener('mousemove', onMouseMove);
      scrollerElem?.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [scrollerElem, anchorElem, editor]);
  React.useEffect(() => {
    if (menuRef.current) {
      setMenuPosition(draggableBlockElem, menuRef.current, anchorElem);
    }
  }, [anchorElem, draggableBlockElem]);
  React.useEffect(() => {
    function onDragover(event) {
      const [isFileTransfer] = richText.eventFiles(event);
      if (isFileTransfer) {
        return false;
      }
      const {
        pageY,
        target
      } = event;
      if (!isHTMLElement(target)) {
        return false;
      }
      const targetBlockElem = getBlockElement(anchorElem, editor, event);
      const targetLineElem = targetLineRef.current;
      if (targetBlockElem === null || targetLineElem === null) {
        return false;
      }
      setTargetLine(targetLineElem, targetBlockElem, pageY, anchorElem);
      // Prevent default event to be able to trigger onDrop events
      event.preventDefault();
      return true;
    }
    function onDrop(event) {
      const [isFileTransfer] = richText.eventFiles(event);
      if (isFileTransfer) {
        return false;
      }
      const {
        target,
        dataTransfer,
        pageY
      } = event;
      const dragData = dataTransfer?.getData(DRAG_DATA_FORMAT) || '';
      const draggedNode = lexical.$getNodeByKey(dragData);
      if (!draggedNode) {
        return false;
      }
      if (!isHTMLElement(target)) {
        return false;
      }
      const targetBlockElem = getBlockElement(anchorElem, editor, event);
      if (!targetBlockElem) {
        return false;
      }
      const targetNode = lexical.$getNearestNodeFromDOMNode(targetBlockElem);
      if (!targetNode) {
        return false;
      }
      if (targetNode === draggedNode) {
        return true;
      }
      const {
        top,
        height
      } = targetBlockElem.getBoundingClientRect();
      const shouldInsertAfter = pageY - top > height / 2;
      if (shouldInsertAfter) {
        targetNode.insertAfter(draggedNode);
      } else {
        targetNode.insertBefore(draggedNode);
      }
      setDraggableBlockElem(null);
      return true;
    }
    return utils.mergeRegister(editor.registerCommand(lexical.DRAGOVER_COMMAND, event => {
      return onDragover(event);
    }, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.DROP_COMMAND, event => {
      return onDrop(event);
    }, lexical.COMMAND_PRIORITY_HIGH));
  }, [anchorElem, editor]);
  function onDragStart(event) {
    const dataTransfer = event.dataTransfer;
    if (!dataTransfer || !draggableBlockElem) {
      return;
    }
    setDragImage(dataTransfer, draggableBlockElem);
    let nodeKey = '';
    editor.update(() => {
      const node = lexical.$getNearestNodeFromDOMNode(draggableBlockElem);
      if (node) {
        nodeKey = node.getKey();
      }
    });
    dataTransfer.setData(DRAG_DATA_FORMAT, nodeKey);
  }
  function onDragEnd() {
    hideTargetLine(targetLineRef.current);
  }
  return /*#__PURE__*/ReactDOM.createPortal(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "icon draggable-block-menu",
    ref: menuRef,
    draggable: true,
    onDragStart: onDragStart,
    onDragEnd: onDragEnd
  }, /*#__PURE__*/React.createElement("div", {
    className: isEditable ? 'icon' : ''
  })), /*#__PURE__*/React.createElement("div", {
    className: "draggable-block-target-line",
    ref: targetLineRef
  })), anchorElem);
}
function DraggableBlockPlugin({
  anchorElem = document.body
}) {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  return useDraggableBlockMenu(editor, anchorElem, editor._editable);
}

class EmojiOption extends LexicalTypeaheadMenuPlugin.TypeaheadOption {
  constructor(title, emoji, options) {
    super(title);
    _defineProperty(this, "title", void 0);
    _defineProperty(this, "emoji", void 0);
    _defineProperty(this, "keywords", void 0);
    this.title = title;
    this.emoji = emoji;
    this.keywords = options.keywords || [];
  }
}
function EmojiMenuItem({
  index,
  isSelected,
  onClick,
  onMouseEnter,
  option
}) {
  let className = 'item';
  if (isSelected) {
    className += ' selected';
  }
  return /*#__PURE__*/React.createElement("li", {
    key: option.key,
    tabIndex: -1,
    className: className,
    ref: option.setRefElement,
    role: "option",
    "aria-selected": isSelected,
    id: 'typeahead-item-' + index,
    onMouseEnter: onMouseEnter,
    onClick: onClick
  }, /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, option.emoji, " ", option.title));
}
const MAX_EMOJI_SUGGESTION_COUNT = 10;
function EmojiPickerPlugin() {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const [queryString, setQueryString] = React.useState(null);
  const [emojis, setEmojis] = React.useState([]);
  React.useEffect(() => {
    // @ts-ignore
    Promise.resolve().then(function () { return emojiList$1; }).then(file => setEmojis(file.default));
  }, []);
  const emojiOptions = React.useMemo(() => emojis != null ? emojis.map(({
    emoji,
    aliases,
    tags
  }) => new EmojiOption(aliases[0], emoji, {
    keywords: [...aliases, ...tags]
  })) : [], [emojis]);
  const checkForTriggerMatch = LexicalTypeaheadMenuPlugin.useBasicTypeaheadTriggerMatch(':', {
    minLength: 0
  });
  const options = React.useMemo(() => {
    return emojiOptions.filter(option => {
      return queryString != null ? new RegExp(queryString, 'gi').exec(option.title) || option.keywords != null ? option.keywords.some(keyword => new RegExp(queryString, 'gi').exec(keyword)) : false : emojiOptions;
    }).slice(0, MAX_EMOJI_SUGGESTION_COUNT);
  }, [emojiOptions, queryString]);
  const onSelectOption = React.useCallback((selectedOption, nodeToRemove, closeMenu) => {
    editor.update(() => {
      const selection = lexical.$getSelection();
      if (!lexical.$isRangeSelection(selection) || selectedOption == null) {
        return;
      }
      if (nodeToRemove) {
        nodeToRemove.remove();
      }
      selection.insertNodes([lexical.$createTextNode(selectedOption.emoji)]);
      closeMenu();
    });
  }, [editor]);
  return /*#__PURE__*/React.createElement(LexicalTypeaheadMenuPlugin.LexicalTypeaheadMenuPlugin, {
    onQueryChange: setQueryString,
    onSelectOption: onSelectOption,
    triggerFn: checkForTriggerMatch,
    options: options,
    menuRenderFn: (anchorElementRef, {
      selectedIndex,
      selectOptionAndCleanUp,
      setHighlightedIndex
    }) => {
      if (anchorElementRef.current == null || options.length === 0) {
        return null;
      }
      return anchorElementRef.current && options.length ? /*#__PURE__*/ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
        className: "typeahead-popovers emoji-menu"
      }, /*#__PURE__*/React.createElement("ul", null, options.map((option, index) => /*#__PURE__*/React.createElement("div", {
        key: option.key
      }, /*#__PURE__*/React.createElement(EmojiMenuItem, {
        index: index,
        isSelected: selectedIndex === index,
        onClick: () => {
          setHighlightedIndex(index);
          selectOptionAndCleanUp(option);
        },
        onMouseEnter: () => {
          setHighlightedIndex(index);
        },
        option: option
      }))))), anchorElementRef.current) : null;
    }
  });
}

class EmojiNode extends lexical.TextNode {
  static getType() {
    return 'emoji';
  }
  static clone(node) {
    return new EmojiNode(node.__className, node.__text, node.__key);
  }
  constructor(className, text, key) {
    super(text, key);
    _defineProperty(this, "__className", void 0);
    this.__className = className;
  }
  createDOM(config) {
    const dom = document.createElement('span');
    const inner = super.createDOM(config);
    dom.className = this.__className;
    inner.className = 'emoji-inner';
    dom.appendChild(inner);
    return dom;
  }
  updateDOM(prevNode, dom, config) {
    const inner = dom.firstChild;
    if (inner === null) {
      return true;
    }
    super.updateDOM(prevNode, inner, config);
    return false;
  }
  static importJSON(serializedNode) {
    const node = $createEmojiNode(serializedNode.className, serializedNode.text);
    node.setFormat(serializedNode.format);
    node.setDetail(serializedNode.detail);
    node.setMode(serializedNode.mode);
    node.setStyle(serializedNode.style);
    return node;
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      className: this.getClassName(),
      type: 'emoji'
    };
  }
  getClassName() {
    const self = this.getLatest();
    return self.__className;
  }
}
function $createEmojiNode(className, emojiText) {
  const node = new EmojiNode(className, emojiText).setMode('token');
  return lexical.$applyNodeReplacement(node);
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const emojis = new Map([[':)', ['emoji happysmile', '🙂']], [':D', ['emoji veryhappysmile', '😀']], [':(', ['emoji unhappysmile', '🙁']], ['<3', ['emoji heart', '❤']], ['🙂', ['emoji happysmile', '🙂']], ['😀', ['emoji veryhappysmile', '😀']], ['🙁', ['emoji unhappysmile', '🙁']], ['❤', ['emoji heart', '❤']]]);
function findAndTransformEmoji(node) {
  const text = node.getTextContent();
  for (let i = 0; i < text.length; i++) {
    const emojiData = emojis.get(text[i]) || emojis.get(text.slice(i, i + 2));
    if (emojiData !== undefined) {
      const [emojiStyle, emojiText] = emojiData;
      let targetNode;
      if (i === 0) {
        [targetNode] = node.splitText(i + 2);
      } else {
        [, targetNode] = node.splitText(i, i + 2);
      }
      const emojiNode = $createEmojiNode(emojiStyle, emojiText);
      targetNode.replace(emojiNode);
      return emojiNode;
    }
  }
  return null;
}
function textNodeTransform(node) {
  let targetNode = node;
  while (targetNode !== null) {
    if (!targetNode.isSimpleText()) {
      return;
    }
    targetNode = findAndTransformEmoji(targetNode);
  }
}
function useEmojis(editor) {
  React.useEffect(() => {
    if (!editor.hasNodes([EmojiNode])) {
      throw new Error('EmojisPlugin: EmojiNode not registered on editor');
    }
    return editor.registerNodeTransform(lexical.TextNode, textNodeTransform);
  }, [editor]);
}
function EmojisPlugin() {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  useEmojis(editor);
  return null;
}

// Cached responses or running request promises
const PREVIEW_CACHE = {};
const URL_MATCHER = /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
function useSuspenseRequest(url) {
  let cached = PREVIEW_CACHE[url];
  if (!url.match(URL_MATCHER)) {
    return {
      preview: null
    };
  }
  if (!cached) {
    cached = PREVIEW_CACHE[url] = fetch(`/api/link-preview?url=${encodeURI(url)}`).then(response => response.json()).then(preview => {
      PREVIEW_CACHE[url] = preview;
      return preview;
    }).catch(() => {
      PREVIEW_CACHE[url] = {
        preview: null
      };
    });
  }
  if (cached instanceof Promise) {
    throw cached;
  }
  return cached;
}
function LinkPreviewContent({
  url
}) {
  const {
    preview
  } = useSuspenseRequest(url);
  if (preview === null) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "LinkPreview__container"
  }, preview.img && /*#__PURE__*/React.createElement("div", {
    className: "LinkPreview__imageWrapper"
  }, /*#__PURE__*/React.createElement("img", {
    src: preview.img,
    alt: preview.title,
    className: "LinkPreview__image"
  })), preview.domain && /*#__PURE__*/React.createElement("div", {
    className: "LinkPreview__domain"
  }, preview.domain), preview.title && /*#__PURE__*/React.createElement("div", {
    className: "LinkPreview__title"
  }, preview.title), preview.description && /*#__PURE__*/React.createElement("div", {
    className: "LinkPreview__description"
  }, preview.description));
}
function Glimmer(props) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "LinkPreview__glimmer"
  }, props, {
    style: {
      animationDelay: String((props.index || 0) * 300),
      ...(props.style || {})
    }
  }));
}
function LinkPreview({
  url
}) {
  return /*#__PURE__*/React.createElement(React.Suspense, {
    fallback: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Glimmer, {
      style: {
        height: '80px'
      },
      index: 0
    }), /*#__PURE__*/React.createElement(Glimmer, {
      style: {
        width: '60%'
      },
      index: 1
    }), /*#__PURE__*/React.createElement(Glimmer, {
      style: {
        width: '80%'
      },
      index: 2
    }))
  }, /*#__PURE__*/React.createElement(LinkPreviewContent, {
    url: url
  }));
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function getSelectedNode(selection$1) {
  const anchor = selection$1.anchor;
  const focus = selection$1.focus;
  const anchorNode = selection$1.anchor.getNode();
  const focusNode = selection$1.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection$1.isBackward();
  if (isBackward) {
    return selection.$isAtNodeEnd(focus) ? anchorNode : focusNode;
  } else {
    return selection.$isAtNodeEnd(anchor) ? anchorNode : focusNode;
  }
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const VERTICAL_GAP = 10;
const HORIZONTAL_OFFSET = 5;
function setFloatingElemPosition(targetRect, floatingElem, anchorElem, verticalGap = VERTICAL_GAP, horizontalOffset = HORIZONTAL_OFFSET) {
  const scrollerElem = anchorElem.parentElement;
  if (targetRect === null || !scrollerElem) {
    floatingElem.style.opacity = '0';
    floatingElem.style.transform = 'translate(-10000px, -10000px)';
    return;
  }
  const floatingElemRect = floatingElem.getBoundingClientRect();
  const anchorElementRect = anchorElem.getBoundingClientRect();
  const editorScrollerRect = scrollerElem.getBoundingClientRect();
  let top = targetRect.top - floatingElemRect.height - verticalGap;
  let left = targetRect.left - horizontalOffset;
  if (top < editorScrollerRect.top) {
    top += floatingElemRect.height + targetRect.height + verticalGap * 2;
  }
  if (left + floatingElemRect.width > editorScrollerRect.right) {
    left = editorScrollerRect.right - floatingElemRect.width - horizontalOffset;
  }
  top -= anchorElementRect.top;
  left -= anchorElementRect.left;
  floatingElem.style.opacity = '1';
  floatingElem.style.transform = `translate(${left}px, ${top}px)`;
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

function sanitizeUrl(url) {
  /** A pattern that matches safe  URLs. */
  const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi;

  /** A pattern that matches safe data URLs. */
  const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;
  url = String(url).trim();
  if (url.match(SAFE_URL_PATTERN) || url.match(DATA_URL_PATTERN)) return url;
  return 'https://';
}

// Source: https://stackoverflow.com/a/8234912/2013580
const urlRegExp = new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/);
function validateUrl(url) {
  // TODO Fix UI for link insertion; it should never default to an invalid URL such as https://.
  // Maybe show a dialog where they user can type the URL before inserting it.
  return url === 'https://' || urlRegExp.test(url);
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function FloatingLinkEditor({
  editor,
  isLink,
  setIsLink,
  anchorElem
}) {
  const editorRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const [linkUrl, setLinkUrl] = React.useState('');
  const [isEditMode, setEditMode] = React.useState(false);
  const [lastSelection, setLastSelection] = React.useState(null);
  const updateLinkEditor = React.useCallback(() => {
    const selection = lexical.$getSelection();
    if (lexical.$isRangeSelection(selection)) {
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if (link.$isLinkNode(parent)) {
        setLinkUrl(parent.getURL());
      } else if (link.$isLinkNode(node)) {
        setLinkUrl(node.getURL());
      } else {
        setLinkUrl('');
      }
    }
    const editorElem = editorRef.current;
    const nativeSelection = window.getSelection();
    const activeElement = document.activeElement;
    if (editorElem === null) {
      return;
    }
    const rootElement = editor.getRootElement();
    if (selection !== null && nativeSelection !== null && rootElement !== null && rootElement.contains(nativeSelection.anchorNode) && editor.isEditable()) {
      const domRange = nativeSelection.getRangeAt(0);
      let rect;
      if (nativeSelection.anchorNode === rootElement) {
        let inner = rootElement;
        while (inner.firstElementChild != null) {
          inner = inner.firstElementChild;
        }
        rect = inner.getBoundingClientRect();
      } else {
        rect = domRange.getBoundingClientRect();
      }
      setFloatingElemPosition(rect, editorElem, anchorElem);
      setLastSelection(selection);
    } else if (!activeElement || activeElement.className !== 'link-input') {
      if (rootElement !== null) {
        setFloatingElemPosition(null, editorElem, anchorElem);
      }
      setLastSelection(null);
      setEditMode(false);
      setLinkUrl('');
    }
    return true;
  }, [anchorElem, editor]);
  React.useEffect(() => {
    const scrollerElem = anchorElem.parentElement;
    const update = () => {
      editor.getEditorState().read(() => {
        updateLinkEditor();
      });
    };
    window.addEventListener('resize', update);
    if (scrollerElem) {
      scrollerElem.addEventListener('scroll', update);
    }
    return () => {
      window.removeEventListener('resize', update);
      if (scrollerElem) {
        scrollerElem.removeEventListener('scroll', update);
      }
    };
  }, [anchorElem.parentElement, editor, updateLinkEditor]);
  React.useEffect(() => {
    return utils.mergeRegister(editor.registerUpdateListener(({
      editorState
    }) => {
      editorState.read(() => {
        updateLinkEditor();
      });
    }), editor.registerCommand(lexical.SELECTION_CHANGE_COMMAND, () => {
      updateLinkEditor();
      return true;
    }, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.KEY_ESCAPE_COMMAND, () => {
      if (isLink) {
        setIsLink(false);
        return true;
      }
      return false;
    }, lexical.COMMAND_PRIORITY_HIGH));
  }, [editor, updateLinkEditor, setIsLink, isLink]);
  React.useEffect(() => {
    editor.getEditorState().read(() => {
      updateLinkEditor();
    });
  }, [editor, updateLinkEditor]);
  React.useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);
  return /*#__PURE__*/React.createElement("div", {
    ref: editorRef,
    className: "link-editors"
  }, isEditMode ? /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    className: "link-input",
    value: linkUrl,
    onChange: event => {
      setLinkUrl(event.target.value);
    },
    onKeyDown: event => {
      if (event.key === 'Enter' || event.key === 'Escape') {
        event.preventDefault();
        if (lastSelection !== null) {
          if (linkUrl !== '') {
            editor.dispatchCommand(link.TOGGLE_LINK_COMMAND, sanitizeUrl(linkUrl));
          }
          setEditMode(false);
        }
      }
    }
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "link-input"
  }, /*#__PURE__*/React.createElement("a", {
    href: linkUrl,
    target: "_blank",
    rel: "noopener noreferrer"
  }, linkUrl), /*#__PURE__*/React.createElement("div", {
    className: "link-edit",
    role: "button",
    tabIndex: 0,
    onMouseDown: event => event.preventDefault(),
    onClick: () => {
      setEditMode(true);
    }
  })), /*#__PURE__*/React.createElement(LinkPreview, {
    url: linkUrl
  })));
}
function useFloatingLinkEditorToolbar(editor, anchorElem) {
  const [activeEditor, setActiveEditor] = React.useState(editor);
  const [isLink, setIsLink] = React.useState(false);
  const updateToolbar = React.useCallback(() => {
    const selection = lexical.$getSelection();
    if (lexical.$isRangeSelection(selection)) {
      const node = getSelectedNode(selection);
      const linkParent = utils.$findMatchingParent(node, link.$isLinkNode);
      const autoLinkParent = utils.$findMatchingParent(node, link.$isAutoLinkNode);

      // We don't want this menu to open for auto links.
      if (linkParent != null && autoLinkParent == null) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }
    }
  }, []);
  React.useEffect(() => {
    return utils.mergeRegister(editor.registerUpdateListener(({
      editorState
    }) => {
      editorState.read(() => {
        updateToolbar();
      });
    }), editor.registerCommand(lexical.SELECTION_CHANGE_COMMAND, (_payload, newEditor) => {
      updateToolbar();
      setActiveEditor(newEditor);
      return false;
    }, lexical.COMMAND_PRIORITY_CRITICAL));
  }, [editor, updateToolbar]);
  return isLink ? /*#__PURE__*/ReactDOM.createPortal(/*#__PURE__*/React.createElement(FloatingLinkEditor, {
    editor: activeEditor,
    isLink: isLink,
    anchorElem: anchorElem,
    setIsLink: setIsLink
  }), anchorElem) : null;
}
function FloatingLinkEditorPlugin({
  anchorElem = document.body
}) {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  return useFloatingLinkEditorToolbar(editor, anchorElem);
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function getDOMRangeRect(nativeSelection, rootElement) {
  const domRange = nativeSelection.getRangeAt(0);
  let rect;
  if (nativeSelection.anchorNode === rootElement) {
    let inner = rootElement;
    while (inner.firstElementChild != null) {
      inner = inner.firstElementChild;
    }
    rect = inner.getBoundingClientRect();
  } else {
    rect = domRange.getBoundingClientRect();
  }
  return rect;
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function TextFormatFloatingToolbar({
  editor,
  anchorElem,
  isLink,
  isBold,
  isItalic,
  isUnderline,
  isCode,
  isStrikethrough,
  isSubscript,
  isSuperscript,
  config
}) {
  const popupCharStylesEditorRef = React.useRef(null);
  const insertLink = React.useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(link.TOGGLE_LINK_COMMAND, 'https://');
    } else {
      editor.dispatchCommand(link.TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);
  const updateTextFormatFloatingToolbar = React.useCallback(() => {
    const selection = lexical.$getSelection();
    const popupCharStylesEditorElem = popupCharStylesEditorRef.current;
    const nativeSelection = window.getSelection();
    if (popupCharStylesEditorElem === null) {
      return;
    }
    const rootElement = editor.getRootElement();
    if (selection !== null && nativeSelection !== null && !nativeSelection.isCollapsed && rootElement !== null && rootElement.contains(nativeSelection.anchorNode)) {
      const rangeRect = getDOMRangeRect(nativeSelection, rootElement);
      setFloatingElemPosition(rangeRect, popupCharStylesEditorElem, anchorElem);
    }
  }, [editor, anchorElem]);
  React.useEffect(() => {
    const scrollerElem = anchorElem.parentElement;
    const update = () => {
      editor.getEditorState().read(() => {
        updateTextFormatFloatingToolbar();
      });
    };
    window.addEventListener('resize', update);
    if (scrollerElem) {
      scrollerElem.addEventListener('scroll', update);
    }
    return () => {
      window.removeEventListener('resize', update);
      if (scrollerElem) {
        scrollerElem.removeEventListener('scroll', update);
      }
    };
  }, [editor, updateTextFormatFloatingToolbar, anchorElem]);
  React.useEffect(() => {
    editor.getEditorState().read(() => {
      updateTextFormatFloatingToolbar();
    });
    return utils.mergeRegister(editor.registerUpdateListener(({
      editorState
    }) => {
      editorState.read(() => {
        updateTextFormatFloatingToolbar();
      });
    }), editor.registerCommand(lexical.SELECTION_CHANGE_COMMAND, () => {
      updateTextFormatFloatingToolbar();
      return false;
    }, lexical.COMMAND_PRIORITY_LOW));
  }, [editor, updateTextFormatFloatingToolbar]);
  return /*#__PURE__*/React.createElement("div", {
    ref: popupCharStylesEditorRef,
    className: "floating-text-format-popup"
  }, config.biu && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      editor.dispatchCommand(lexical.FORMAT_TEXT_COMMAND, 'bold');
    },
    className: 'popup-item spaced ' + (isBold ? 'active' : ''),
    "aria-label": "Format text as bold"
  }, /*#__PURE__*/React.createElement("i", {
    className: "format bold"
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      editor.dispatchCommand(lexical.FORMAT_TEXT_COMMAND, 'italic');
    },
    className: 'popup-item spaced ' + (isItalic ? 'active' : ''),
    "aria-label": "Format text as italics"
  }, /*#__PURE__*/React.createElement("i", {
    className: "format italic"
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      editor.dispatchCommand(lexical.FORMAT_TEXT_COMMAND, 'underline');
    },
    className: 'popup-item spaced ' + (isUnderline ? 'active' : ''),
    "aria-label": "Format text to underlined"
  }, /*#__PURE__*/React.createElement("i", {
    className: "format underline"
  }))), config.formatTextOptions && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      editor.dispatchCommand(lexical.FORMAT_TEXT_COMMAND, 'strikethrough');
    },
    className: 'popup-item spaced ' + (isStrikethrough ? 'active' : ''),
    "aria-label": "Format text with a strikethrough"
  }, /*#__PURE__*/React.createElement("i", {
    className: "format strikethrough"
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      editor.dispatchCommand(lexical.FORMAT_TEXT_COMMAND, 'subscript');
    },
    className: 'popup-item spaced ' + (isSubscript ? 'active' : ''),
    title: "Subscript",
    "aria-label": "Format Subscript"
  }, /*#__PURE__*/React.createElement("i", {
    className: "format subscript"
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      editor.dispatchCommand(lexical.FORMAT_TEXT_COMMAND, 'superscript');
    },
    className: 'popup-item spaced ' + (isSuperscript ? 'active' : ''),
    title: "Superscript",
    "aria-label": "Format Superscript"
  }, /*#__PURE__*/React.createElement("i", {
    className: "format superscript"
  }))), config.codeBlock && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      editor.dispatchCommand(lexical.FORMAT_TEXT_COMMAND, 'code');
    },
    className: 'popup-item spaced ' + (isCode ? 'active' : ''),
    "aria-label": "Insert code block"
  }, /*#__PURE__*/React.createElement("i", {
    className: "format code"
  })), config.link && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: insertLink,
    className: 'popup-item spaced ' + (isLink ? 'active' : ''),
    "aria-label": "Insert link"
  }, /*#__PURE__*/React.createElement("i", {
    className: "format link"
  })));
}
function useFloatingTextFormatToolbar(editor, anchorElem, config) {
  const [isText, setIsText] = React.useState(false);
  const [isLink, setIsLink] = React.useState(false);
  const [isBold, setIsBold] = React.useState(false);
  const [isItalic, setIsItalic] = React.useState(false);
  const [isUnderline, setIsUnderline] = React.useState(false);
  const [isStrikethrough, setIsStrikethrough] = React.useState(false);
  const [isSubscript, setIsSubscript] = React.useState(false);
  const [isSuperscript, setIsSuperscript] = React.useState(false);
  const [isCode, setIsCode] = React.useState(false);
  const updatePopup = React.useCallback(() => {
    editor.getEditorState().read(() => {
      // Should not to pop up the floating toolbar when using IME input
      if (editor.isComposing()) {
        return;
      }
      const selection = lexical.$getSelection();
      const nativeSelection = window.getSelection();
      const rootElement = editor.getRootElement();
      if (nativeSelection !== null && (!lexical.$isRangeSelection(selection) || rootElement === null || !rootElement.contains(nativeSelection.anchorNode))) {
        setIsText(false);
        return;
      }
      if (!lexical.$isRangeSelection(selection)) {
        return;
      }
      const node = getSelectedNode(selection);

      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setIsSubscript(selection.hasFormat('subscript'));
      setIsSuperscript(selection.hasFormat('superscript'));
      setIsCode(selection.hasFormat('code'));

      // Update links
      const parent = node.getParent();
      if (link.$isLinkNode(parent) || link.$isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }
      if (!code.$isCodeHighlightNode(selection.anchor.getNode()) && selection.getTextContent() !== '') {
        setIsText(lexical.$isTextNode(node));
      } else {
        setIsText(false);
      }
    });
  }, [editor]);
  React.useEffect(() => {
    document.addEventListener('selectionchange', updatePopup);
    return () => {
      document.removeEventListener('selectionchange', updatePopup);
    };
  }, [updatePopup]);
  React.useEffect(() => {
    return utils.mergeRegister(editor.registerUpdateListener(() => {
      updatePopup();
    }), editor.registerRootListener(() => {
      if (editor.getRootElement() === null) {
        setIsText(false);
      }
    }));
  }, [editor, updatePopup]);
  if (!isText || isLink) {
    return null;
  }
  return /*#__PURE__*/ReactDOM.createPortal(/*#__PURE__*/React.createElement(TextFormatFloatingToolbar, {
    config: config,
    editor: editor,
    anchorElem: anchorElem,
    isLink: isLink,
    isBold: isBold,
    isItalic: isItalic,
    isStrikethrough: isStrikethrough,
    isSubscript: isSubscript,
    isSuperscript: isSuperscript,
    isUnderline: isUnderline,
    isCode: isCode
  }), anchorElem);
}
function TextFormatFloatingToolbarPlugin({
  anchorElem = document.body,
  config
}) {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  return useFloatingTextFormatToolbar(editor, anchorElem, config);
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
class KeywordNode extends lexical.TextNode {
  static getType() {
    return 'keyword';
  }
  static clone(node) {
    return new KeywordNode(node.__text, node.__key);
  }
  static importJSON(serializedNode) {
    const node = $createKeywordNode(serializedNode.text);
    node.setFormat(serializedNode.format);
    node.setDetail(serializedNode.detail);
    node.setMode(serializedNode.mode);
    node.setStyle(serializedNode.style);
    return node;
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      type: 'keyword',
      version: 1
    };
  }
  createDOM(config) {
    const dom = super.createDOM(config);
    dom.style.cursor = 'default';
    dom.className = 'keyword';
    return dom;
  }
  canInsertTextBefore() {
    return false;
  }
  canInsertTextAfter() {
    return false;
  }
  isTextEntity() {
    return true;
  }
}
function $createKeywordNode(keyword) {
  return new KeywordNode(keyword);
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const KEYWORDS_REGEX = /(^|$|[^A-Za-zªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚗꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ])(congrats|congratulations|gratuluju|gratuluji|gratulujeme|blahopřeju|blahopřeji|blahopřejeme|Til lykke|Tillykke|Glückwunsch|Gratuliere|felicitaciones|enhorabuena|paljon onnea|onnittelut|Félicitations|gratula|gratulálok|gratulálunk|congratulazioni|complimenti|おめでとう|おめでとうございます|축하해|축하해요|gratulerer|Gefeliciteerd|gratulacje|Parabéns|parabéns|felicitações|felicitări|мои поздравления|поздравляем|поздравляю|gratulujem|blahoželám|ยินดีด้วย|ขอแสดงความยินดี|tebrikler|tebrik ederim|恭喜|祝贺你|恭喜你|恭喜|恭喜|baie geluk|veels geluk|অভিনন্দন|Čestitam|Čestitke|Čestitamo|Συγχαρητήρια|Μπράβο|અભિનંદન|badhai|बधाई|अभिनंदन|Честитам|Свака част|hongera|வாழ்த்துகள்|வாழ்த்துக்கள்|అభినందనలు|അഭിനന്ദനങ്ങൾ|Chúc mừng|מזל טוב|mazel tov|mazal tov)(^|$|[^A-Za-zªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚗꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ])/i;
function KeywordsPlugin() {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  React.useEffect(() => {
    if (!editor.hasNodes([KeywordNode])) {
      throw new Error('KeywordsPlugin: KeywordNode not registered on editor');
    }
  }, [editor]);
  const createKeywordNode = React.useCallback(textNode => {
    return $createKeywordNode(textNode.getTextContent());
  }, []);
  const getKeywordMatch = React.useCallback(text => {
    const matchArr = KEYWORDS_REGEX.exec(text);
    if (matchArr === null) {
      return null;
    }
    const hashtagLength = matchArr[2].length;
    const startOffset = matchArr.index + matchArr[1].length;
    const endOffset = startOffset + hashtagLength;
    return {
      end: endOffset,
      start: startOffset
    };
  }, []);
  useLexicalTextEntity.useLexicalTextEntity(getKeywordMatch, KeywordNode, createKeywordNode);
  return null;
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function LinkPlugin() {
  return /*#__PURE__*/React.createElement(LexicalLinkPlugin.LinkPlugin, {
    validateUrl: validateUrl
  });
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function getElementNodesInSelection(selection) {
  const nodesInSelection = selection.getNodes();
  if (nodesInSelection.length === 0) {
    return new Set([selection.anchor.getNode().getParentOrThrow(), selection.focus.getNode().getParentOrThrow()]);
  }
  return new Set(nodesInSelection.map(n => lexical.$isElementNode(n) ? n : n.getParentOrThrow()));
}
function isIndentPermitted(maxDepth) {
  const selection = lexical.$getSelection();
  if (!lexical.$isRangeSelection(selection)) {
    return false;
  }
  const elementNodesInSelection = getElementNodesInSelection(selection);
  let totalDepth = 0;
  for (const elementNode of elementNodesInSelection) {
    if (list.$isListNode(elementNode)) {
      totalDepth = Math.max(list.$getListDepth(elementNode) + 1, totalDepth);
    } else if (list.$isListItemNode(elementNode)) {
      const parent = elementNode.getParent();
      if (!list.$isListNode(parent)) {
        throw new Error('ListMaxIndentLevelPlugin: A ListItemNode must have a ListNode for a parent.');
      }
      totalDepth = Math.max(list.$getListDepth(parent) + 1, totalDepth);
    }
  }
  return totalDepth <= maxDepth;
}
function ListMaxIndentLevelPlugin({
  maxDepth
}) {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  React.useEffect(() => {
    return editor.registerCommand(lexical.INDENT_CONTENT_COMMAND, () => !isIndentPermitted(maxDepth ?? 7), lexical.COMMAND_PRIORITY_CRITICAL);
  }, [editor, maxDepth]);
  return null;
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function MarkdownPlugin() {
  const editorContext = useEditorComposerContext();
  return /*#__PURE__*/React.createElement(LexicalMarkdownShortcutPlugin.MarkdownShortcutPlugin, {
    transformers: [...PLAYGROUND_TRANSFORMERS, ...editorContext.extensions.transformers]
  });
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function MaxLengthPlugin({
  maxLength
}) {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  React.useEffect(() => {
    let lastRestoredEditorState = null;
    return editor.registerNodeTransform(lexical.RootNode, rootNode => {
      const selection$1 = lexical.$getSelection();
      if (!lexical.$isRangeSelection(selection$1) || !selection$1.isCollapsed()) {
        return;
      }
      const prevEditorState = editor.getEditorState();
      const prevTextContent = prevEditorState.read(() => rootNode.getTextContent());
      const textContent = rootNode.getTextContent();
      if (prevTextContent !== textContent) {
        const textLength = textContent.length;
        const delCount = textLength - maxLength;
        const anchor = selection$1.anchor;
        if (delCount > 0) {
          // Restore the old editor state instead if the last
          // text content was already at the limit.
          if (prevTextContent.length === maxLength && lastRestoredEditorState !== prevEditorState) {
            lastRestoredEditorState = prevEditorState;
            utils.$restoreEditorState(editor, prevEditorState);
          } else {
            selection.trimTextContentFromAnchor(editor, anchor, delCount);
          }
        }
      }
    });
  }, [editor, maxLength]);
  return null;
}

function convertMentionElement(domNode) {
  const textContent = domNode.textContent;
  if (textContent !== null) {
    const node = $createMentionNode(textContent);
    return {
      node
    };
  }
  return null;
}
const mentionStyle = 'background-color: rgba(24, 119, 232, 0.2)';
class MentionNode extends lexical.TextNode {
  static getType() {
    return 'mention';
  }
  static clone(node) {
    return new MentionNode(node.__mention, node.__text, node.__key);
  }
  static importJSON(serializedNode) {
    const node = $createMentionNode(serializedNode.mentionName);
    node.setTextContent(serializedNode.text);
    node.setFormat(serializedNode.format);
    node.setDetail(serializedNode.detail);
    node.setMode(serializedNode.mode);
    node.setStyle(serializedNode.style);
    return node;
  }
  constructor(mentionName, text, key) {
    super(text ?? mentionName, key);
    _defineProperty(this, "__mention", void 0);
    this.__mention = mentionName;
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      mentionName: this.__mention,
      type: 'mention',
      version: 1
    };
  }
  createDOM(config) {
    const dom = super.createDOM(config);
    dom.style.cssText = mentionStyle;
    dom.className = 'mention';
    return dom;
  }
  exportDOM() {
    const element = document.createElement('span');
    element.setAttribute('data-lexical-mention', 'true');
    element.textContent = this.__text;
    return {
      element
    };
  }
  static importDOM() {
    return {
      span: domNode => {
        if (!domNode.hasAttribute('data-lexical-mention')) {
          return null;
        }
        return {
          conversion: convertMentionElement,
          priority: 1
        };
      }
    };
  }
  isTextEntity() {
    return true;
  }
}
function $createMentionNode(mentionName) {
  const mentionNode = new MentionNode(mentionName);
  mentionNode.setMode('segmented').toggleDirectionless();
  return lexical.$applyNodeReplacement(mentionNode);
}

const PUNCTUATION = '\\.,\\+\\*\\?\\$\\@\\|#{}\\(\\)\\^\\-\\[\\]\\\\/!%\'"~=<>_:;';
const NAME = '\\b[A-Z][^\\s' + PUNCTUATION + ']';
const DocumentMentionsRegex = {
  NAME,
  PUNCTUATION
};
const CapitalizedNameMentionsRegex = new RegExp('(^|[^#])((?:' + DocumentMentionsRegex.NAME + '{' + 1 + ',})$)');
const PUNC = DocumentMentionsRegex.PUNCTUATION;
const TRIGGERS = ['@'].join('');

// Chars we expect to see in a mention (non-space, non-punctuation).
const VALID_CHARS = '[^' + TRIGGERS + PUNC + '\\s]';

// Non-standard series of chars. Each series must be preceded and followed by
// a valid char.
const VALID_JOINS = '(?:' + '\\.[ |$]|' +
// E.g. "r. " in "Mr. Smith"
' |' +
// E.g. " " in "Josh Duck"
'[' + PUNC + ']|' +
// E.g. "-' in "Salier-Hellendag"
')';
const LENGTH_LIMIT = 75;
const AtSignMentionsRegex = new RegExp('(^|\\s|\\()(' + '[' + TRIGGERS + ']' + '((?:' + VALID_CHARS + VALID_JOINS + '){0,' + LENGTH_LIMIT + '})' + ')$');

// 50 is the longest alias length limit.
const ALIAS_LENGTH_LIMIT = 50;

// Regex used to match alias.
const AtSignMentionsRegexAliasRegex = new RegExp('(^|\\s|\\()(' + '[' + TRIGGERS + ']' + '((?:' + VALID_CHARS + '){0,' + ALIAS_LENGTH_LIMIT + '})' + ')$');

// At most, 5 suggestions are shown in the popup.
const SUGGESTION_LIST_LENGTH_LIMIT = 5;
const mentionsCache = new Map();
function useMentionLookupService(dummyMentionsData, mentionString) {
  const [results, setResults] = React.useState([]);
  const dummyLookupService = {
    search(string, callback) {
      setTimeout(() => {
        const results = dummyMentionsData.filter(mention => mention.toLowerCase().includes(string.toLowerCase()));
        callback(results);
      }, 500);
    }
  };
  React.useEffect(() => {
    const cachedResults = mentionsCache.get(mentionString);
    if (mentionString == null) {
      setResults([]);
      return;
    }
    if (cachedResults === null) {
      return;
    } else if (cachedResults !== undefined) {
      setResults(cachedResults);
      return;
    }
    mentionsCache.set(mentionString, null);
    dummyLookupService.search(mentionString, newResults => {
      mentionsCache.set(mentionString, newResults);
      setResults(newResults);
    });
  }, [mentionString]);
  return results;
}
function checkForCapitalizedNameMentions(text, minMatchLength) {
  const match = CapitalizedNameMentionsRegex.exec(text);
  if (match !== null) {
    // The strategy ignores leading whitespace but we need to know it's
    // length to add it to the leadOffset
    const maybeLeadingWhitespace = match[1];
    const matchingString = match[2];
    if (matchingString != null && matchingString.length >= minMatchLength) {
      return {
        leadOffset: match.index + maybeLeadingWhitespace.length,
        matchingString,
        replaceableString: matchingString
      };
    }
  }
  return null;
}
function checkForAtSignMentions(text, minMatchLength) {
  let match = AtSignMentionsRegex.exec(text);
  if (match === null) {
    match = AtSignMentionsRegexAliasRegex.exec(text);
  }
  if (match !== null) {
    // The strategy ignores leading whitespace but we need to know it's
    // length to add it to the leadOffset
    const maybeLeadingWhitespace = match[1];
    const matchingString = match[3];
    if (matchingString.length >= minMatchLength) {
      return {
        leadOffset: match.index + maybeLeadingWhitespace.length,
        matchingString,
        replaceableString: match[2]
      };
    }
  }
  return null;
}
function getPossibleQueryMatch(text) {
  const match = checkForAtSignMentions(text, 1);
  return match === null ? checkForCapitalizedNameMentions(text, 3) : match;
}
class MentionTypeaheadOption extends LexicalTypeaheadMenuPlugin.TypeaheadOption {
  constructor(name, picture) {
    super(name);
    _defineProperty(this, "name", void 0);
    _defineProperty(this, "picture", void 0);
    this.name = name;
    this.picture = picture;
  }
}
function MentionsTypeaheadMenuItem({
  index,
  isSelected,
  onClick,
  onMouseEnter,
  option
}) {
  let className = 'item';
  if (isSelected) {
    className += ' selected';
  }
  return /*#__PURE__*/React.createElement("li", {
    key: option.key,
    tabIndex: -1,
    className: className,
    ref: option.setRefElement,
    role: "option",
    "aria-selected": isSelected,
    id: 'typeahead-item-' + index,
    onMouseEnter: onMouseEnter,
    onClick: onClick
  }, option.picture, /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, option.name));
}
function MentionsPlugin({
  dummyMentionsDatas
}) {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const [queryString, setQueryString] = React.useState(null);
  const [userData, setUserData] = React.useState([]);
  const results = useMentionLookupService(userData, queryString);
  const checkForSlashTriggerMatch = LexicalTypeaheadMenuPlugin.useBasicTypeaheadTriggerMatch('/', {
    minLength: 0
  });
  const options = React.useMemo(() => results.map(result => new MentionTypeaheadOption(result, /*#__PURE__*/React.createElement("i", {
    className: "icon user"
  }))).slice(0, SUGGESTION_LIST_LENGTH_LIMIT), [results]);
  const onSelectOption = React.useCallback((selectedOption, nodeToReplace, closeMenu) => {
    editor.update(() => {
      const mentionNode = $createMentionNode(selectedOption.name);
      if (nodeToReplace) {
        nodeToReplace.replace(mentionNode);
      }
      mentionNode.select();
      closeMenu();
    });
  }, [editor]);
  const checkForMentionMatch = React.useCallback(text => {
    const mentionMatch = getPossibleQueryMatch(text);
    const slashMatch = checkForSlashTriggerMatch(text, editor);
    return !slashMatch && mentionMatch ? mentionMatch : null;
  }, [checkForSlashTriggerMatch, editor]);
  React.useEffect(() => {
    setUserData(dummyMentionsDatas || []);
  }, []);
  return /*#__PURE__*/React.createElement(LexicalTypeaheadMenuPlugin.LexicalTypeaheadMenuPlugin, {
    onQueryChange: setQueryString,
    onSelectOption: onSelectOption,
    triggerFn: checkForMentionMatch,
    options: options,
    menuRenderFn: (anchorElementRef, {
      selectedIndex,
      selectOptionAndCleanUp,
      setHighlightedIndex
    }) => anchorElementRef.current && results.length ? /*#__PURE__*/ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
      className: "typeahead-popovers nogridview mentions-menu"
    }, /*#__PURE__*/React.createElement("ul", null, options.map((option, i) => /*#__PURE__*/React.createElement(MentionsTypeaheadMenuItem, {
      index: i,
      isSelected: selectedIndex === i,
      onClick: () => {
        setHighlightedIndex(i);
        selectOptionAndCleanUp(option);
      },
      onMouseEnter: () => {
        setHighlightedIndex(i);
      },
      key: option.key,
      option: option
    })))), anchorElementRef.current) : null
  });
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const removeNode = (editor, node) => {
  try {
    editor.update(() => {
      node.remove();
    });
  } catch (e) {} // eslint-disable-line no-empty
};
function OnImageUploadPlugin({
  onUpload
}) {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  React.useEffect(() => {
    if (!onUpload) return;
    const unregisterMutationListener = editor.registerMutationListener(ImageNode, nodeMutations => {
      for (const [nodeKey, mutation] of nodeMutations) {
        if (mutation === 'created') {
          editor.getEditorState().read(() => {
            const imageNode = lexical.$getNodeByKey(nodeKey);
            if ($isImageNode(imageNode)) {
              const file = imageNode.getFile();
              const altText = imageNode.getAltText();
              if (file) {
                (async () => {
                  try {
                    const imgUrl = await onUpload(file, altText);
                    if (imgUrl) {
                      const parts = imgUrl.split('.');
                      const extension = parts[parts.length - 1].toLowerCase();
                      const validImageTypes = ['jpg', 'jpeg', 'png'];
                      if (validImageTypes.includes(extension)) {
                        const preloadImage = new Image();
                        preloadImage.onload = () => {
                          editor.update(() => {
                            imageNode.setFile(undefined);
                            imageNode.setSrc(imgUrl);
                          });
                        };
                        preloadImage.onerror = () => {
                          removeNode(editor, imageNode);
                        };
                        preloadImage.src = imgUrl;
                        return;
                      }
                    } else {
                      return;
                    }
                  } catch (e) {
                    removeNode(editor, imageNode);
                  }
                })();
              }
            }
          });
        }
      }
    });
    return () => {
      unregisterMutationListener();
    };
  }, [editor, onUpload]);
  return null;
}

const PollComponent$2 = /*#__PURE__*/React.lazy(
// @ts-ignore
() => Promise.resolve().then(function () { return PollComponent$1; }));
function createUID() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
}
function createPollOption(text = '') {
  return {
    text,
    uid: createUID(),
    votes: []
  };
}
function cloneOption(option, text, votes) {
  return {
    text,
    uid: option.uid,
    votes: votes || Array.from(option.votes)
  };
}
function convertPollElement(domNode) {
  const question = domNode.getAttribute('data-lexical-poll-question');
  if (question !== null) {
    const node = $createPollNode(question);
    return {
      node
    };
  }
  return null;
}
class PollNode extends lexical.DecoratorNode {
  static getType() {
    return 'poll';
  }
  static clone(node) {
    return new PollNode(node.__question, node.__options, node.__key);
  }
  static importJSON(serializedNode) {
    const node = $createPollNode(serializedNode.question);
    serializedNode.options.forEach(node.addOption);
    return node;
  }
  constructor(question, options, key) {
    super(key);
    _defineProperty(this, "__question", void 0);
    _defineProperty(this, "__options", void 0);
    this.__question = question;
    this.__options = options || [createPollOption(), createPollOption()];
  }
  exportJSON() {
    return {
      options: this.__options,
      question: this.__question,
      type: 'poll',
      version: 1
    };
  }
  addOption(option) {
    const self = this.getWritable();
    const options = Array.from(self.__options);
    options.push(option);
    self.__options = options;
  }
  deleteOption(option) {
    const self = this.getWritable();
    const options = Array.from(self.__options);
    const index = options.indexOf(option);
    options.splice(index, 1);
    self.__options = options;
  }
  setOptionText(option, text) {
    const self = this.getWritable();
    const clonedOption = cloneOption(option, text);
    const options = Array.from(self.__options);
    const index = options.indexOf(option);
    options[index] = clonedOption;
    self.__options = options;
  }
  toggleVote(option, clientID) {
    const self = this.getWritable();
    const votes = option.votes;
    const votesClone = Array.from(votes);
    const voteIndex = votes.indexOf(clientID);
    if (voteIndex === -1) {
      votesClone.push(clientID);
    } else {
      votesClone.splice(voteIndex, 1);
    }
    const clonedOption = cloneOption(option, option.text, votesClone);
    const options = Array.from(self.__options);
    const index = options.indexOf(option);
    options[index] = clonedOption;
    self.__options = options;
  }
  static importDOM() {
    return {
      span: domNode => {
        if (!domNode.hasAttribute('data-lexical-poll-question')) {
          return null;
        }
        return {
          conversion: convertPollElement,
          priority: 2
        };
      }
    };
  }
  exportDOM() {
    const element = document.createElement('span');
    element.setAttribute('data-lexical-poll-question', this.__question);
    return {
      element
    };
  }
  createDOM() {
    const elem = document.createElement('span');
    elem.style.display = 'inline-block';
    return elem;
  }
  updateDOM() {
    return false;
  }
  decorate() {
    return /*#__PURE__*/React.createElement(React.Suspense, {
      fallback: null
    }, /*#__PURE__*/React.createElement(PollComponent$2, {
      question: this.__question,
      options: this.__options,
      nodeKey: this.__key
    }));
  }
}
function $createPollNode(question) {
  return new PollNode(question);
}
function $isPollNode(node) {
  return node instanceof PollNode;
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const INSERT_POLL_COMMAND = lexical.createCommand('INSERT_POLL_COMMAND');
function PollPlugin() {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  React.useEffect(() => {
    if (!editor.hasNodes([PollNode])) {
      throw new Error('PollPlugin: PollNode not registered on editor');
    }
    return editor.registerCommand(INSERT_POLL_COMMAND, payload => {
      const pollNode = $createPollNode(payload);
      lexical.$insertNodes([pollNode]);
      if (lexical.$isRootOrShadowRoot(pollNode.getParentOrThrow())) {
        utils.$wrapNodeInElement(pollNode, lexical.$createParagraphNode).selectEnd();
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
const getElement = () => {
  let element = document.getElementById('report-container');
  if (element === null) {
    element = document.createElement('div');
    element.id = 'report-container';
    element.style.position = 'fixed';
    element.style.top = '50%';
    element.style.left = '50%';
    element.style.fontSize = '32px';
    element.style.transform = 'translate(-50%, -50px)';
    element.style.padding = '20px';
    element.style.background = 'rgba(240, 240, 240, 0.4)';
    element.style.borderRadius = '20px';
    if (document.body) {
      document.body.appendChild(element);
    }
  }
  return element;
};
function useReport() {
  const timer = React.useRef(null);
  const cleanup = React.useCallback(() => {
    if (timer !== null) {
      clearTimeout(timer.current);
    }
    if (document.body) {
      document.body.removeChild(getElement());
    }
  }, []);
  React.useEffect(() => {
    return cleanup;
  }, [cleanup]);
  return React.useCallback(content => {
    // eslint-disable-next-line no-console
    console.log(content);
    const element = getElement();
    clearTimeout(timer.current);
    element.innerHTML = content;
    timer.current = setTimeout(cleanup, 1000);
    return timer.current;
  }, [cleanup]);
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const SPEECH_TO_TEXT_COMMAND = lexical.createCommand('SPEECH_TO_TEXT_COMMAND');
const VOICE_COMMANDS = {
  '\n': ({
    selection
  }) => {
    selection.insertParagraph();
  },
  redo: ({
    editor
  }) => {
    editor.dispatchCommand(lexical.REDO_COMMAND, undefined);
  },
  undo: ({
    editor
  }) => {
    editor.dispatchCommand(lexical.UNDO_COMMAND, undefined);
  }
};
const SUPPORT_SPEECH_RECOGNITION = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
function SpeechToTextPlugin() {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const [isEnabled, setIsEnabled] = React.useState(false);
  const SpeechRecognition =
  // @ts-ignore
  window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = React.useRef(null);
  const report = useReport();
  React.useEffect(() => {
    if (isEnabled && recognition.current === null) {
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;
      recognition.current.addEventListener('result', event => {
        const resultItem = event.results.item(event.resultIndex);
        const {
          transcript
        } = resultItem.item(0);
        report(transcript);
        if (!resultItem.isFinal) {
          return;
        }
        editor.update(() => {
          const selection = lexical.$getSelection();
          if (lexical.$isRangeSelection(selection)) {
            const command = VOICE_COMMANDS[transcript.toLowerCase().trim()];
            if (command) {
              command({
                editor,
                selection
              });
            } else if (transcript.match(/\s*\n\s*/)) {
              selection.insertParagraph();
            } else {
              selection.insertText(transcript);
            }
          }
        });
      });
    }
    if (recognition.current) {
      if (isEnabled) {
        recognition.current.start();
      } else {
        recognition.current.stop();
      }
    }
    return () => {
      if (recognition.current !== null) {
        recognition.current.stop();
      }
    };
  }, [SpeechRecognition, editor, isEnabled, report]);
  React.useEffect(() => {
    return editor.registerCommand(SPEECH_TO_TEXT_COMMAND, _isEnabled => {
      setIsEnabled(_isEnabled);
      return true;
    }, lexical.COMMAND_PRIORITY_EDITOR);
  }, [editor]);
  return null;
}
var SpeechToTextPlugin$1 = SUPPORT_SPEECH_RECOGNITION ? SpeechToTextPlugin : () => null;

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const COMMAND_PRIORITY_LOW = 1;
const TAB_TO_FOCUS_INTERVAL = 100;
let lastTabKeyDownTimestamp = 0;
let hasRegisteredKeyDownListener = false;
function registerKeyTimeStampTracker() {
  window.addEventListener('keydown', event => {
    // Tab
    if (event.keyCode === 9) {
      lastTabKeyDownTimestamp = event.timeStamp;
    }
  }, true);
}
function TabFocusPlugin() {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  React.useEffect(() => {
    if (!hasRegisteredKeyDownListener) {
      registerKeyTimeStampTracker();
      hasRegisteredKeyDownListener = true;
    }
    return editor.registerCommand(lexical.FOCUS_COMMAND, event => {
      const selection = lexical.$getSelection();
      if (lexical.$isRangeSelection(selection)) {
        if (lastTabKeyDownTimestamp + TAB_TO_FOCUS_INTERVAL > event.timeStamp) {
          lexical.$setSelection(selection.clone());
        }
      }
      return false;
    }, COMMAND_PRIORITY_LOW);
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
function TableActionMenu$1({
  onClose,
  tableCellNode: _tableCellNode,
  setIsMenuOpen,
  contextRef
}) {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const dropDownRef = React.useRef(null);
  const [tableCellNode, updateTableCellNode] = React.useState(_tableCellNode);
  const [selectionCounts, updateSelectionCounts] = React.useState({
    columns: 1,
    rows: 1
  });
  React.useEffect(() => {
    return editor.registerMutationListener(table.TableCellNode, nodeMutations => {
      const nodeUpdated = nodeMutations.get(tableCellNode.getKey()) === 'updated';
      if (nodeUpdated) {
        editor.getEditorState().read(() => {
          updateTableCellNode(tableCellNode.getLatest());
        });
      }
    });
  }, [editor, tableCellNode]);
  React.useEffect(() => {
    editor.getEditorState().read(() => {
      const selection = lexical.$getSelection();
      if (lexical.DEPRECATED_$isGridSelection(selection)) {
        const selectionShape = selection.getShape();
        updateSelectionCounts({
          columns: selectionShape.toX - selectionShape.fromX + 1,
          rows: selectionShape.toY - selectionShape.fromY + 1
        });
      }
    });
  }, [editor]);
  React.useEffect(() => {
    const menuButtonElement = contextRef.current;
    const dropDownElement = dropDownRef.current;
    const updateDropdownPosition = () => {
      if (menuButtonElement && dropDownElement) {
        const menuButtonRect = menuButtonElement.getBoundingClientRect();
        dropDownElement.style.opacity = '1';
        dropDownElement.style.left = `${menuButtonRect.left + menuButtonRect.width + window.pageXOffset + 5}px`;
        dropDownElement.style.top = `${menuButtonRect.top + window.pageYOffset}px`;
      }
    };
    updateDropdownPosition();
    const handleScroll = () => {
      updateDropdownPosition();
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [contextRef, dropDownRef]);
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropDownRef.current != null && contextRef.current != null && !dropDownRef.current.contains(event.target) && !contextRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [setIsMenuOpen, contextRef]);
  const clearTableSelection = React.useCallback(() => {
    editor.update(() => {
      if (tableCellNode.isAttached()) {
        const tableNode = table.$getTableNodeFromLexicalNodeOrThrow(tableCellNode);
        const tableElement = editor.getElementByKey(tableNode.getKey());
        if (!tableElement) {
          throw new Error('Expected to find tableElement in DOM');
        }
        const tableSelection = table.getTableSelectionFromTableElement(tableElement);
        if (tableSelection !== null) {
          tableSelection.clearHighlight();
        }
        tableNode.markDirty();
        updateTableCellNode(tableCellNode.getLatest());
      }
      const rootNode = lexical.$getRoot();
      rootNode.selectStart();
    });
  }, [editor, tableCellNode]);
  const insertTableRowAtSelection = React.useCallback(shouldInsertAfter => {
    editor.update(() => {
      const selection = lexical.$getSelection();
      const tableNode = table.$getTableNodeFromLexicalNodeOrThrow(tableCellNode);
      let tableRowIndex;
      if (lexical.DEPRECATED_$isGridSelection(selection)) {
        const selectionShape = selection.getShape();
        tableRowIndex = shouldInsertAfter ? selectionShape.toY : selectionShape.fromY;
      } else {
        tableRowIndex = table.$getTableRowIndexFromTableCellNode(tableCellNode);
      }
      const grid = table.$getElementGridForTableNode(editor, tableNode);
      table.$insertTableRow(tableNode, tableRowIndex, shouldInsertAfter, selectionCounts.rows, grid);
      clearTableSelection();
      onClose();
    });
  }, [editor, tableCellNode, selectionCounts.rows, clearTableSelection, onClose]);
  const insertTableColumnAtSelection = React.useCallback(shouldInsertAfter => {
    editor.update(() => {
      const selection = lexical.$getSelection();
      const tableNode = table.$getTableNodeFromLexicalNodeOrThrow(tableCellNode);
      let tableColumnIndex;
      if (lexical.DEPRECATED_$isGridSelection(selection)) {
        const selectionShape = selection.getShape();
        tableColumnIndex = shouldInsertAfter ? selectionShape.toX : selectionShape.fromX;
      } else {
        tableColumnIndex = table.$getTableColumnIndexFromTableCellNode(tableCellNode);
      }
      const grid = table.$getElementGridForTableNode(editor, tableNode);
      table.$insertTableColumn(tableNode, tableColumnIndex, shouldInsertAfter, selectionCounts.columns, grid);
      clearTableSelection();
      onClose();
    });
  }, [editor, tableCellNode, selectionCounts.columns, clearTableSelection, onClose]);
  const deleteTableRowAtSelection = React.useCallback(() => {
    editor.update(() => {
      const tableNode = table.$getTableNodeFromLexicalNodeOrThrow(tableCellNode);
      const tableRowIndex = table.$getTableRowIndexFromTableCellNode(tableCellNode);
      table.$removeTableRowAtIndex(tableNode, tableRowIndex);
      clearTableSelection();
      onClose();
    });
  }, [editor, tableCellNode, clearTableSelection, onClose]);
  const deleteTableAtSelection = React.useCallback(() => {
    editor.update(() => {
      const tableNode = table.$getTableNodeFromLexicalNodeOrThrow(tableCellNode);
      tableNode.remove();
      clearTableSelection();
      onClose();
    });
  }, [editor, tableCellNode, clearTableSelection, onClose]);
  const deleteTableColumnAtSelection = React.useCallback(() => {
    editor.update(() => {
      const tableNode = table.$getTableNodeFromLexicalNodeOrThrow(tableCellNode);
      const tableColumnIndex = table.$getTableColumnIndexFromTableCellNode(tableCellNode);
      table.$deleteTableColumn(tableNode, tableColumnIndex);
      clearTableSelection();
      onClose();
    });
  }, [editor, tableCellNode, clearTableSelection, onClose]);
  const toggleTableRowIsHeader = React.useCallback(() => {
    editor.update(() => {
      const tableNode = table.$getTableNodeFromLexicalNodeOrThrow(tableCellNode);
      const tableRowIndex = table.$getTableRowIndexFromTableCellNode(tableCellNode);
      const tableRows = tableNode.getChildren();
      if (tableRowIndex >= tableRows.length || tableRowIndex < 0) {
        throw new Error('Expected table cell to be inside of table row.');
      }
      const tableRow = tableRows[tableRowIndex];
      if (!table.$isTableRowNode(tableRow)) {
        throw new Error('Expected table row');
      }
      tableRow.getChildren().forEach(tableCell => {
        if (!table.$isTableCellNode(tableCell)) {
          throw new Error('Expected table cell');
        }
        tableCell.toggleHeaderStyle(table.TableCellHeaderStates.ROW);
      });
      clearTableSelection();
      onClose();
    });
  }, [editor, tableCellNode, clearTableSelection, onClose]);
  const toggleTableColumnIsHeader = React.useCallback(() => {
    editor.update(() => {
      const tableNode = table.$getTableNodeFromLexicalNodeOrThrow(tableCellNode);
      const tableColumnIndex = table.$getTableColumnIndexFromTableCellNode(tableCellNode);
      const tableRows = tableNode.getChildren();
      for (let r = 0; r < tableRows.length; r++) {
        const tableRow = tableRows[r];
        if (!table.$isTableRowNode(tableRow)) {
          throw new Error('Expected table row');
        }
        const tableCells = tableRow.getChildren();
        if (tableColumnIndex >= tableCells.length || tableColumnIndex < 0) {
          throw new Error('Expected table cell to be inside of table row.');
        }
        const tableCell = tableCells[tableColumnIndex];
        if (!table.$isTableCellNode(tableCell)) {
          throw new Error('Expected table cell');
        }
        tableCell.toggleHeaderStyle(table.TableCellHeaderStates.COLUMN);
      }
      clearTableSelection();
      onClose();
    });
  }, [editor, tableCellNode, clearTableSelection, onClose]);
  return /*#__PURE__*/ReactDOM.createPortal(
  /*#__PURE__*/
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  React.createElement("div", {
    className: "dropdowns dropdown1",
    ref: dropDownRef,
    onClick: e => {
      e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "item",
    onClick: () => insertTableRowAtSelection(false)
  }, /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, "Insert", ' ', selectionCounts.rows === 1 ? 'row' : `${selectionCounts.rows} rows`, ' ', "above")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "item",
    onClick: () => insertTableRowAtSelection(true)
  }, /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, "Insert", ' ', selectionCounts.rows === 1 ? 'row' : `${selectionCounts.rows} rows`, ' ', "below")), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "item",
    onClick: () => insertTableColumnAtSelection(false)
  }, /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, "Insert", ' ', selectionCounts.columns === 1 ? 'column' : `${selectionCounts.columns} columns`, ' ', "left")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "item",
    onClick: () => insertTableColumnAtSelection(true)
  }, /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, "Insert", ' ', selectionCounts.columns === 1 ? 'column' : `${selectionCounts.columns} columns`, ' ', "right")), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "item",
    onClick: () => deleteTableColumnAtSelection()
  }, /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, "Delete column")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "item",
    onClick: () => deleteTableRowAtSelection()
  }, /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, "Delete row")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "item",
    onClick: () => deleteTableAtSelection()
  }, /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, "Delete table")), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "item",
    onClick: () => toggleTableRowIsHeader()
  }, /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, (tableCellNode.__headerState & table.TableCellHeaderStates.ROW) === table.TableCellHeaderStates.ROW ? 'Remove' : 'Add', ' ', "row header")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "item",
    onClick: () => toggleTableColumnIsHeader()
  }, /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, (tableCellNode.__headerState & table.TableCellHeaderStates.COLUMN) === table.TableCellHeaderStates.COLUMN ? 'Remove' : 'Add', ' ', "column header"))), document.body);
}
function TableCellActionMenuContainer({
  anchorElem
}) {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const menuButtonRef = React.useRef(null);
  const menuRootRef = React.useRef(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [tableCellNode, setTableMenuCellNode] = React.useState(null);
  const moveMenu = React.useCallback(() => {
    const menu = menuButtonRef.current;
    const selection = lexical.$getSelection();
    const nativeSelection = window.getSelection();
    const activeElement = document.activeElement;
    if (selection == null || menu == null) {
      setTableMenuCellNode(null);
      return;
    }
    const rootElement = editor.getRootElement();
    if (lexical.$isRangeSelection(selection) && rootElement !== null && nativeSelection !== null && rootElement.contains(nativeSelection.anchorNode)) {
      const tableCellNodeFromSelection = table.$getTableCellNodeFromLexicalNode(selection.anchor.getNode());
      if (tableCellNodeFromSelection == null) {
        setTableMenuCellNode(null);
        return;
      }
      const tableCellParentNodeDOM = editor.getElementByKey(tableCellNodeFromSelection.getKey());
      if (tableCellParentNodeDOM == null) {
        setTableMenuCellNode(null);
        return;
      }
      setTableMenuCellNode(tableCellNodeFromSelection);
    } else if (!activeElement) {
      setTableMenuCellNode(null);
    }
  }, [editor]);
  React.useEffect(() => {
    return editor.registerUpdateListener(() => {
      editor.getEditorState().read(() => {
        moveMenu();
      });
    });
  });
  React.useEffect(() => {
    const menuButtonDOM = menuButtonRef.current;
    if (menuButtonDOM != null && tableCellNode != null) {
      const tableCellNodeDOM = editor.getElementByKey(tableCellNode.getKey());
      if (tableCellNodeDOM != null) {
        const tableCellRect = tableCellNodeDOM.getBoundingClientRect();
        const menuRect = menuButtonDOM.getBoundingClientRect();
        const anchorRect = anchorElem.getBoundingClientRect();
        const top = tableCellRect.top - anchorRect.top + 4;
        const left = tableCellRect.right - menuRect.width - 10 - anchorRect.left;
        menuButtonDOM.style.opacity = '1';
        menuButtonDOM.style.transform = `translate(${left}px, ${top}px)`;
      } else {
        menuButtonDOM.style.opacity = '0';
        menuButtonDOM.style.transform = 'translate(-10000px, -10000px)';
      }
    }
  }, [menuButtonRef, tableCellNode, editor, anchorElem]);
  const prevTableCellDOM = React.useRef(tableCellNode);
  React.useEffect(() => {
    if (prevTableCellDOM.current !== tableCellNode) {
      setIsMenuOpen(false);
    }
    prevTableCellDOM.current = tableCellNode;
  }, [prevTableCellDOM, tableCellNode]);
  return /*#__PURE__*/React.createElement("div", {
    className: "table-cell-action-button-container",
    ref: menuButtonRef
  }, tableCellNode != null && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "table-cell-action-button chevron-down",
    onClick: e => {
      e.stopPropagation();
      setIsMenuOpen(!isMenuOpen);
    },
    ref: menuRootRef
  }, /*#__PURE__*/React.createElement("i", {
    className: "chevron-down"
  })), isMenuOpen && /*#__PURE__*/React.createElement(TableActionMenu$1, {
    contextRef: menuRootRef,
    setIsMenuOpen: setIsMenuOpen,
    onClose: () => setIsMenuOpen(false),
    tableCellNode: tableCellNode
  })));
}
function TableActionMenuPlugin({
  anchorElem = document.body
}) {
  const isEditable = useLexicalEditable();
  return /*#__PURE__*/ReactDOM.createPortal(isEditable ? /*#__PURE__*/React.createElement(TableCellActionMenuContainer, {
    anchorElem: anchorElem
  }) : null, anchorElem);
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const MIN_ROW_HEIGHT = 33;
const MIN_COLUMN_WIDTH = 50;
function TableCellResizer({
  editor
}) {
  const targetRef = React.useRef(null);
  const resizerRef = React.useRef(null);
  const tableRectRef = React.useRef(null);
  const mouseStartPosRef = React.useRef(null);
  const [mouseCurrentPos, updateMouseCurrentPos] = React.useState(null);
  const [activeCell, updateActiveCell] = React.useState(null);
  const [isSelectingGrid, updateIsSelectingGrid] = React.useState(false);
  const [draggingDirection, updateDraggingDirection] = React.useState(null);
  React.useEffect(() => {
    return editor.registerCommand(lexical.SELECTION_CHANGE_COMMAND, payload => {
      const selection = lexical.$getSelection();
      const isGridSelection = lexical.DEPRECATED_$isGridSelection(selection);
      if (isSelectingGrid !== isGridSelection) {
        updateIsSelectingGrid(isGridSelection);
      }
      return false;
    }, lexical.COMMAND_PRIORITY_HIGH);
  });
  const resetState = React.useCallback(() => {
    updateActiveCell(null);
    targetRef.current = null;
    updateDraggingDirection(null);
    mouseStartPosRef.current = null;
    tableRectRef.current = null;
  }, []);
  React.useEffect(() => {
    const onMouseMove = event => {
      setTimeout(() => {
        const target = event.target;
        if (draggingDirection) {
          updateMouseCurrentPos({
            x: event.clientX,
            y: event.clientY
          });
          return;
        }
        if (resizerRef.current && resizerRef.current.contains(target)) {
          return;
        }
        if (targetRef.current !== target) {
          targetRef.current = target;
          const cell = table.getCellFromTarget(target);
          if (cell && activeCell !== cell) {
            editor.update(() => {
              const tableCellNode = lexical.$getNearestNodeFromDOMNode(cell.elem);
              if (!tableCellNode) {
                throw new Error('TableCellResizer: Table cell node not found.');
              }
              const tableNode = table.$getTableNodeFromLexicalNodeOrThrow(tableCellNode);
              const tableElement = editor.getElementByKey(tableNode.getKey());
              if (!tableElement) {
                throw new Error('TableCellResizer: Table element not found.');
              }
              targetRef.current = target;
              tableRectRef.current = tableElement.getBoundingClientRect();
              updateActiveCell(cell);
            });
          } else if (cell == null) {
            resetState();
          }
        }
      }, 0);
    };
    document.addEventListener('mousemove', onMouseMove);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [activeCell, draggingDirection, editor, resetState]);
  const isHeightChanging = direction => {
    if (direction === 'bottom') return true;
    return false;
  };
  const updateRowHeight = React.useCallback(newHeight => {
    if (!activeCell) {
      throw new Error('TableCellResizer: Expected active cell.');
    }
    editor.update(() => {
      const tableCellNode = lexical.$getNearestNodeFromDOMNode(activeCell.elem);
      if (!table.$isTableCellNode(tableCellNode)) {
        throw new Error('TableCellResizer: Table cell node not found.');
      }
      const tableNode = table.$getTableNodeFromLexicalNodeOrThrow(tableCellNode);
      const tableRowIndex = table.$getTableRowIndexFromTableCellNode(tableCellNode);
      const tableRows = tableNode.getChildren();
      if (tableRowIndex >= tableRows.length || tableRowIndex < 0) {
        throw new Error('Expected table cell to be inside of table row.');
      }
      const tableRow = tableRows[tableRowIndex];
      if (!table.$isTableRowNode(tableRow)) {
        throw new Error('Expected table row');
      }
      tableRow.setHeight(newHeight);
    });
  }, [activeCell, editor]);
  const updateColumnWidth = React.useCallback(newWidth => {
    if (!activeCell) {
      throw new Error('TableCellResizer: Expected active cell.');
    }
    editor.update(() => {
      const tableCellNode = lexical.$getNearestNodeFromDOMNode(activeCell.elem);
      if (!table.$isTableCellNode(tableCellNode)) {
        throw new Error('TableCellResizer: Table cell node not found.');
      }
      const tableNode = table.$getTableNodeFromLexicalNodeOrThrow(tableCellNode);
      const tableColumnIndex = table.$getTableColumnIndexFromTableCellNode(tableCellNode);
      const tableRows = tableNode.getChildren();
      for (let r = 0; r < tableRows.length; r++) {
        const tableRow = tableRows[r];
        if (!table.$isTableRowNode(tableRow)) {
          throw new Error('Expected table row');
        }
        const tableCells = tableRow.getChildren();
        if (tableColumnIndex >= tableCells.length || tableColumnIndex < 0) {
          throw new Error('Expected table cell to be inside of table row.');
        }
        const tableCell = tableCells[tableColumnIndex];
        if (!table.$isTableCellNode(tableCell)) {
          throw new Error('Expected table cell');
        }
        tableCell.setWidth(newWidth);
      }
    });
  }, [activeCell, editor]);
  const toggleResize = React.useCallback(direction => event => {
    event.preventDefault();
    event.stopPropagation();
    if (!activeCell) {
      throw new Error('TableCellResizer: Expected active cell.');
    }
    if (draggingDirection === direction && mouseStartPosRef.current) {
      const {
        x,
        y
      } = mouseStartPosRef.current;
      if (activeCell === null) {
        return;
      }
      const {
        height,
        width
      } = activeCell.elem.getBoundingClientRect();
      if (isHeightChanging(direction)) {
        const heightChange = Math.abs(event.clientY - y);
        const isShrinking = direction === 'bottom' && y > event.clientY;
        updateRowHeight(Math.max(isShrinking ? height - heightChange : heightChange + height, MIN_ROW_HEIGHT));
      } else {
        const widthChange = Math.abs(event.clientX - x);
        const isShrinking = direction === 'right' && x > event.clientX;
        updateColumnWidth(Math.max(isShrinking ? width - widthChange : widthChange + width, MIN_COLUMN_WIDTH));
      }
      resetState();
    } else {
      mouseStartPosRef.current = {
        x: event.clientX,
        y: event.clientY
      };
      updateMouseCurrentPos(mouseStartPosRef.current);
      updateDraggingDirection(direction);
    }
  }, [activeCell, draggingDirection, resetState, updateColumnWidth, updateRowHeight]);
  const getResizers = React.useCallback(() => {
    if (activeCell) {
      const {
        height,
        width,
        top,
        left
      } = activeCell.elem.getBoundingClientRect();
      const styles = {
        bottom: {
          backgroundColor: 'none',
          cursor: 'row-resize',
          height: '10px',
          left: `${window.pageXOffset + left}px`,
          top: `${window.pageYOffset + top + height}px`,
          width: `${width}px`
        },
        right: {
          backgroundColor: 'none',
          cursor: 'col-resize',
          height: `${height}px`,
          left: `${window.pageXOffset + left + width}px`,
          top: `${window.pageYOffset + top}px`,
          width: '10px'
        }
      };
      const tableRect = tableRectRef.current;
      if (draggingDirection && mouseCurrentPos && tableRect) {
        if (isHeightChanging(draggingDirection)) {
          styles[draggingDirection].left = `${window.pageXOffset + tableRect.left}px`;
          styles[draggingDirection].top = `${window.pageYOffset + mouseCurrentPos.y}px`;
          styles[draggingDirection].height = '3px';
          styles[draggingDirection].width = `${tableRect.width}px`;
        } else {
          styles[draggingDirection].top = `${window.pageYOffset + tableRect.top}px`;
          styles[draggingDirection].left = `${window.pageXOffset + mouseCurrentPos.x}px`;
          styles[draggingDirection].width = '3px';
          styles[draggingDirection].height = `${tableRect.height}px`;
        }
        styles[draggingDirection].backgroundColor = '#adf';
      }
      return styles;
    }
    return {
      bottom: null,
      left: null,
      right: null,
      top: null
    };
  }, [activeCell, draggingDirection, mouseCurrentPos]);
  const resizerStyles = getResizers();
  return /*#__PURE__*/React.createElement("div", {
    ref: resizerRef
  }, activeCell != null && !isSelectingGrid && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "TableCellResizer__resizer TableCellResizer__ui",
    style: resizerStyles.right || undefined,
    onMouseDown: toggleResize('right'),
    onMouseUp: toggleResize('right')
  }), /*#__PURE__*/React.createElement("div", {
    className: "TableCellResizer__resizer TableCellResizer__ui",
    style: resizerStyles.bottom || undefined,
    onMouseDown: toggleResize('bottom'),
    onMouseUp: toggleResize('bottom')
  })));
}
function TableCellResizerPlugin() {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const isEditable = useLexicalEditable();
  return React.useMemo(() => isEditable ? /*#__PURE__*/ReactDOM.createPortal(/*#__PURE__*/React.createElement(TableCellResizer, {
    editor: editor
  }), document.body) : null, [editor, isEditable]);
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const MARGIN_ABOVE_EDITOR = 624;
const HEADING_WIDTH = 9;
function indent(tagName) {
  if (tagName === 'h2') {
    return 'heading2';
  } else if (tagName === 'h3') {
    return 'heading3';
  }
}
function isHeadingAtTheTopOfThePage(element) {
  const elementYPosition = element?.getClientRects()[0].y;
  return elementYPosition >= MARGIN_ABOVE_EDITOR && elementYPosition <= MARGIN_ABOVE_EDITOR + HEADING_WIDTH;
}
function isHeadingAboveViewport(element) {
  const elementYPosition = element?.getClientRects()[0].y;
  return elementYPosition < MARGIN_ABOVE_EDITOR;
}
function isHeadingBelowTheTopOfThePage(element) {
  const elementYPosition = element?.getClientRects()[0].y;
  return elementYPosition >= MARGIN_ABOVE_EDITOR + HEADING_WIDTH;
}
function TableOfContentsList({
  tableOfContents
}) {
  const [selectedKey, setSelectedKey] = React.useState('');
  const selectedIndex = React.useRef(0);
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  function scrollToNode(key, currIndex) {
    editor.getEditorState().read(() => {
      const domElement = editor.getElementByKey(key);
      if (domElement !== null) {
        domElement.scrollIntoView();
        setSelectedKey(key);
        selectedIndex.current = currIndex;
      }
    });
  }
  React.useEffect(() => {
    function scrollCallback() {
      if (tableOfContents.length !== 0 && selectedIndex.current < tableOfContents.length - 1) {
        let currentHeading = editor.getElementByKey(tableOfContents[selectedIndex.current][0]);
        if (currentHeading !== null) {
          if (isHeadingBelowTheTopOfThePage(currentHeading)) {
            //On natural scroll, user is scrolling up
            while (currentHeading !== null && isHeadingBelowTheTopOfThePage(currentHeading) && selectedIndex.current > 0) {
              const prevHeading = editor.getElementByKey(tableOfContents[selectedIndex.current - 1][0]);
              if (prevHeading !== null && (isHeadingAboveViewport(prevHeading) || isHeadingBelowTheTopOfThePage(prevHeading))) {
                selectedIndex.current--;
              }
              currentHeading = prevHeading;
            }
            const prevHeadingKey = tableOfContents[selectedIndex.current][0];
            setSelectedKey(prevHeadingKey);
          } else if (isHeadingAboveViewport(currentHeading)) {
            //On natural scroll, user is scrolling down
            while (currentHeading !== null && isHeadingAboveViewport(currentHeading) && selectedIndex.current < tableOfContents.length - 1) {
              const nextHeading = editor.getElementByKey(tableOfContents[selectedIndex.current + 1][0]);
              if (nextHeading !== null && (isHeadingAtTheTopOfThePage(nextHeading) || isHeadingAboveViewport(nextHeading))) {
                selectedIndex.current++;
              }
              currentHeading = nextHeading;
            }
            const nextHeadingKey = tableOfContents[selectedIndex.current][0];
            setSelectedKey(nextHeadingKey);
          }
        }
      } else {
        selectedIndex.current = 0;
      }
    }
    let timerId;
    function debounceFunction(func, delay) {
      clearTimeout(timerId);
      timerId = setTimeout(func, delay);
    }
    function onScroll() {
      debounceFunction(scrollCallback, 10);
    }
    document.addEventListener('scroll', onScroll);
    return () => document.removeEventListener('scroll', onScroll);
  }, [tableOfContents, editor]);
  return /*#__PURE__*/React.createElement("div", {
    className: "table-of-contents"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "headings"
  }, tableOfContents.map(([key, text, tag], index) => {
    if (index === 0) {
      return /*#__PURE__*/React.createElement("div", {
        className: "normal-heading-wrapper",
        key: key
      }, /*#__PURE__*/React.createElement("div", {
        className: "first-heading",
        onClick: () => scrollToNode(key, index),
        role: "button",
        tabIndex: 0
      }, ('' + text).length > 20 ? text.substring(0, 20) + '...' : text), /*#__PURE__*/React.createElement("br", null));
    } else {
      return /*#__PURE__*/React.createElement("div", {
        className: `normal-heading-wrapper ${selectedKey === key ? 'selected-heading-wrapper' : ''}`,
        key: key
      }, /*#__PURE__*/React.createElement("div", {
        onClick: () => scrollToNode(key, index),
        role: "button",
        className: indent(tag),
        tabIndex: 0
      }, /*#__PURE__*/React.createElement("li", {
        className: `normal-heading ${selectedKey === key ? 'selected-heading' : ''}
                    `
      }, ('' + text).length > 27 ? text.substring(0, 27) + '...' : text)));
    }
  })));
}
function TableOfContentsPlugin() {
  return /*#__PURE__*/React.createElement(LexicalTableOfContents__EXPERIMENTAL, null, tableOfContents => {
    return /*#__PURE__*/React.createElement(TableOfContentsList, {
      tableOfContents: tableOfContents
    });
  });
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const documentMode = CAN_USE_DOM && 'documentMode' in document ? document.documentMode : null;
const IS_APPLE = CAN_USE_DOM && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
CAN_USE_DOM && /^(?!.*Seamonkey)(?=.*Firefox).*/i.test(navigator.userAgent);
CAN_USE_DOM && 'InputEvent' in window && !documentMode ? 'getTargetRanges' in new window.InputEvent('input') : false;
CAN_USE_DOM && /Version\/[\d.]+.*Safari/.test(navigator.userAgent);
CAN_USE_DOM && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

// Keep these in case we need to use them in the future.
// export const IS_WINDOWS: boolean = CAN_USE_DOM && /Win/.test(navigator.platform);
const IS_CHROME = CAN_USE_DOM && /^(?=.*Chrome).*/i.test(navigator.userAgent);
// export const canUseTextInputEvent: boolean = CAN_USE_DOM && 'TextEvent' in window && !documentMode;

CAN_USE_DOM && /AppleWebKit\/[\d.]+/.test(navigator.userAgent) && !IS_CHROME;

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
function DropDownItems({
  children,
  dropDownRef,
  onClose
}) {
  const [items, setItems] = React.useState();
  const [highlightedItem, setHighlightedItem] = React.useState();
  const registerItem = React.useCallback(itemRef => {
    setItems(prev => prev ? [...prev, itemRef] : [itemRef]);
  }, [setItems]);
  const handleKeyDown = event => {
    if (!items) return;
    const key = event.key;
    if (['Escape', 'ArrowUp', 'ArrowDown', 'Tab'].includes(key)) {
      event.preventDefault();
    }
    if (key === 'Escape' || key === 'Tab') {
      onClose();
    } else if (key === 'ArrowUp') {
      setHighlightedItem(prev => {
        if (!prev) return items[0];
        const index = items.indexOf(prev) - 1;
        return items[index === -1 ? items.length - 1 : index];
      });
    } else if (key === 'ArrowDown') {
      setHighlightedItem(prev => {
        if (!prev) return items[0];
        return items[items.indexOf(prev) + 1];
      });
    }
  };
  const contextValue = React.useMemo(() => ({
    registerItem
  }), [registerItem]);
  React.useEffect(() => {
    if (items && !highlightedItem) {
      setHighlightedItem(items[0]);
    }
    if (highlightedItem && highlightedItem.current) {
      highlightedItem.current.focus();
    }
  }, [items, highlightedItem]);
  return /*#__PURE__*/React.createElement(DropDownContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement("div", {
    className: "dropdowns all_dropdown",
    ref: dropDownRef,
    onKeyDown: handleKeyDown
  }, children));
}
function DropDown({
  disabled = false,
  buttonLabel,
  buttonAriaLabel,
  buttonClassName,
  buttonIconClassName,
  children,
  stopCloseOnClickSelf
}) {
  const dropDownRef = React.useRef(null);
  const buttonRef = React.useRef(null);
  const [showDropDown, setShowDropDown] = React.useState(false);
  const handleClose = () => {
    setShowDropDown(false);
    if (buttonRef && buttonRef.current) {
      buttonRef.current.focus();
    }
  };
  React.useEffect(() => {
    const button = buttonRef.current;
    const dropDown = dropDownRef.current;
    if (showDropDown && button !== null && dropDown !== null) {
      const {
        top,
        left
      } = button.getBoundingClientRect();
      dropDown.style.top = `${top + 40}px`;
      dropDown.style.left = `${Math.min(left, window.innerWidth - dropDown.offsetWidth - 20)}px`;
    }
    const handleScroll = () => {
      if (showDropDown && button !== null && dropDown !== null) {
        const {
          top,
          left
        } = button.getBoundingClientRect();
        dropDown.style.top = `${top + 40}px`;
        dropDown.style.left = `${Math.min(left, window.innerWidth - dropDown.offsetWidth - 20)}px`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dropDownRef, buttonRef, showDropDown]);
  React.useEffect(() => {
    const button = buttonRef.current;
    if (button !== null && showDropDown) {
      const handle = event => {
        const target = event.target;
        if (stopCloseOnClickSelf) {
          if (dropDownRef.current && dropDownRef.current.contains(target)) return;
        }
        if (!button.contains(target)) {
          setShowDropDown(false);
        }
      };
      document.addEventListener('click', handle);
      return () => {
        document.removeEventListener('click', handle);
      };
    }
  }, [dropDownRef, buttonRef, showDropDown, stopCloseOnClickSelf]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    disabled: disabled,
    "aria-label": buttonAriaLabel || buttonLabel,
    className: buttonClassName,
    type: "button",
    onClick: () => setShowDropDown(!showDropDown),
    ref: buttonRef
  }, buttonIconClassName && /*#__PURE__*/React.createElement("span", {
    className: buttonIconClassName
  }), buttonLabel && /*#__PURE__*/React.createElement("span", {
    className: "text dropdowns-button-text"
  }, buttonLabel), /*#__PURE__*/React.createElement("i", {
    className: "chevron-down"
  })), showDropDown && /*#__PURE__*/ReactDOM.createPortal(/*#__PURE__*/React.createElement(DropDownItems, {
    dropDownRef: dropDownRef,
    onClose: handleClose
  }, children), document.body));
}

const basicColors = ['#d0021b', '#f5a623', '#f8e71c', '#8b572a', '#7ed321', '#417505', '#bd10e0', '#9013fe', '#4a90e2', '#50e3c2', '#b8e986', '#000000', '#4a4a4a', '#9b9b9b', '#ffffff'];
const WIDTH = 214;
const HEIGHT = 150;
function ColorPicker({
  color,
  children,
  onChange,
  disabled = false,
  ...rest
}) {
  const [selfColor, setSelfColor] = React.useState(transformColor('hex', color));
  const [inputColor, setInputColor] = React.useState(color);
  const innerDivRef = React.useRef(null);
  const saturationPosition = React.useMemo(() => ({
    x: selfColor.hsv.s / 100 * WIDTH,
    y: (100 - selfColor.hsv.v) / 100 * HEIGHT
  }), [selfColor.hsv.s, selfColor.hsv.v]);
  const huePosition = React.useMemo(() => ({
    x: selfColor.hsv.h / 360 * WIDTH
  }), [selfColor.hsv]);
  const onSetHex = hex => {
    setInputColor(hex);
    if (/^#[0-9A-Fa-f]{6}$/i.test(hex)) {
      const newColor = transformColor('hex', hex);
      setSelfColor(newColor);
    }
  };
  const onMoveSaturation = ({
    x,
    y
  }) => {
    const newHsv = {
      ...selfColor.hsv,
      s: x / WIDTH * 100,
      v: 100 - y / HEIGHT * 100
    };
    const newColor = transformColor('hsv', newHsv);
    setSelfColor(newColor);
    setInputColor(newColor.hex);
  };
  const onMoveHue = ({
    x
  }) => {
    const newHsv = {
      ...selfColor.hsv,
      h: x / WIDTH * 360
    };
    const newColor = transformColor('hsv', newHsv);
    setSelfColor(newColor);
    setInputColor(newColor.hex);
  };
  React.useEffect(() => {
    // Check if the dropdowns is actually active
    if (innerDivRef.current !== null && onChange) {
      onChange(selfColor.hex);
      setInputColor(selfColor.hex);
    }
  }, [selfColor, onChange]);
  React.useEffect(() => {
    if (color === undefined) return;
    const newColor = transformColor('hex', color);
    setSelfColor(newColor);
    setInputColor(newColor.hex);
  }, [color]);
  return /*#__PURE__*/React.createElement(DropDown, _extends({}, rest, {
    disabled: disabled
  }), /*#__PURE__*/React.createElement("div", {
    className: "color-picker-wrapper",
    style: {
      width: WIDTH
    },
    ref: innerDivRef
  }, /*#__PURE__*/React.createElement(TextInput, {
    label: "Hex",
    onChange: onSetHex,
    value: inputColor
  }), /*#__PURE__*/React.createElement("div", {
    className: "color-picker-basic-color"
  }, basicColors.map(basicColor => /*#__PURE__*/React.createElement("button", {
    className: basicColor === selfColor.hex ? ' active' : '',
    key: basicColor,
    style: {
      backgroundColor: basicColor
    },
    onClick: () => {
      setInputColor(basicColor);
      setSelfColor(transformColor('hex', basicColor));
    }
  }))), /*#__PURE__*/React.createElement(MoveWrapper, {
    className: "color-picker-saturation",
    style: {
      backgroundColor: `hsl(${selfColor.hsv.h}, 100%, 50%)`
    },
    onChange: onMoveSaturation
  }, /*#__PURE__*/React.createElement("div", {
    className: "color-picker-saturation_cursor",
    style: {
      backgroundColor: selfColor.hex,
      left: saturationPosition.x,
      top: saturationPosition.y
    }
  })), /*#__PURE__*/React.createElement(MoveWrapper, {
    className: "color-picker-hue",
    onChange: onMoveHue
  }, /*#__PURE__*/React.createElement("div", {
    className: "color-picker-hue_cursor",
    style: {
      backgroundColor: `hsl(${selfColor.hsv.h}, 100%, 50%)`,
      left: huePosition.x
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "color-picker-color",
    style: {
      backgroundColor: selfColor.hex
    }
  })), children);
}
function MoveWrapper({
  className,
  style,
  onChange,
  children
}) {
  const divRef = React.useRef(null);
  const move = e => {
    if (divRef.current) {
      const {
        current: div
      } = divRef;
      const {
        width,
        height,
        left,
        top
      } = div.getBoundingClientRect();
      const x = clamp$1(e.clientX - left, width, 0);
      const y = clamp$1(e.clientY - top, height, 0);
      onChange({
        x,
        y
      });
    }
  };
  const onMouseDown = e => {
    if (e.button !== 0) return;
    move(e);
    const onMouseMove = _e => {
      move(_e);
    };
    const onMouseUp = _e => {
      document.removeEventListener('mousemove', onMouseMove, false);
      document.removeEventListener('mouseup', onMouseUp, false);
      move(_e);
    };
    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('mouseup', onMouseUp, false);
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: divRef,
    className: className,
    style: style,
    onMouseDown: onMouseDown
  }, children);
}
function clamp$1(value, max, min) {
  return value > max ? max : value < min ? min : value;
}
function toHex(value) {
  if (!value.startsWith('#')) {
    const ctx = document.createElement('canvas').getContext('2d');
    if (!ctx) {
      throw new Error('2d context not supported or canvas already initialized');
    }
    ctx.fillStyle = value;
    return ctx.fillStyle;
  } else if (value.length === 4 || value.length === 5) {
    value = value.split('').map((v, i) => i ? v + v : '#').join('');
    return value;
  } else if (value.length === 7 || value.length === 9) {
    return value;
  }
  return '#000000';
}
function hex2rgb(hex) {
  const rbgArr = (hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b).substring(1).match(/.{2}/g) || []).map(x => parseInt(x, 16));
  return {
    b: rbgArr[2],
    g: rbgArr[1],
    r: rbgArr[0]
  };
}
function rgb2hsv({
  r,
  g,
  b
}) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const d = max - Math.min(r, g, b);
  const h = d ? (max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? 2 + (b - r) / d : 4 + (r - g) / d) * 60 : 0;
  const s = max ? d / max * 100 : 0;
  const v = max * 100;
  return {
    h,
    s,
    v
  };
}
function hsv2rgb({
  h,
  s,
  v
}) {
  s /= 100;
  v /= 100;
  const i = ~~(h / 60);
  const f = h / 60 - i;
  const p = v * (1 - s);
  const q = v * (1 - s * f);
  const t = v * (1 - s * (1 - f));
  const index = i % 6;
  const r = Math.round([v, q, p, p, t, v][index] * 255);
  const g = Math.round([t, v, v, q, p, p][index] * 255);
  const b = Math.round([p, p, t, v, v, q][index] * 255);
  return {
    b,
    g,
    r
  };
}
function rgb2hex({
  b,
  g,
  r
}) {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}
function transformColor(format, color) {
  let hex = toHex('#121212');
  let rgb = hex2rgb(hex);
  let hsv = rgb2hsv(rgb);
  if (format === 'hex') {
    const value = color;
    hex = toHex(value);
    rgb = hex2rgb(hex);
    hsv = rgb2hsv(rgb);
  } else if (format === 'rgb') {
    const value = color;
    rgb = value;
    hex = rgb2hex(rgb);
    hsv = rgb2hsv(rgb);
  } else if (format === 'hsv') {
    const value = color;
    hsv = value;
    rgb = hsv2rgb(hsv);
    hex = rgb2hex(rgb);
  }
  return {
    hex,
    hsv,
    rgb
  };
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const blockTypeToBlockName = {
  bullet: 'Bulleted List',
  check: 'Check List',
  code: 'Code Block',
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  h4: 'Heading 4',
  h5: 'Heading 5',
  h6: 'Heading 6',
  number: 'Numbered List',
  paragraph: 'Normal',
  quote: 'Quote'
};
function getCodeLanguageOptions() {
  const options = [];
  for (const [lang, friendlyName] of Object.entries(code.CODE_LANGUAGE_FRIENDLY_NAME_MAP)) {
    options.push([lang, friendlyName]);
  }
  return options;
}
const CODE_LANGUAGE_OPTIONS = getCodeLanguageOptions();
const FONT_FAMILY_OPTIONS = [['Arial', 'Arial'], ['Courier New', 'Courier New'], ['Georgia', 'Georgia'], ['Times New Roman', 'Times New Roman'], ['Trebuchet MS', 'Trebuchet MS'], ['Verdana', 'Verdana']];
const FONT_SIZE_OPTIONS = [['10px', '10px'], ['11px', '11px'], ['12px', '12px'], ['13px', '13px'], ['14px', '14px'], ['15px', '15px'], ['16px', '16px'], ['17px', '17px'], ['18px', '18px'], ['19px', '19px'], ['20px', '20px']];
function dropDownActiveClass(active) {
  if (active) return 'active dropdowns-item-active';else return '';
}
function BlockFormatDropDown({
  editor,
  blockType,
  disabled = false
}) {
  const formatParagraph = () => {
    if (blockType !== 'paragraph') {
      editor.update(() => {
        const selection$1 = lexical.$getSelection();
        if (lexical.$isRangeSelection(selection$1) || lexical.DEPRECATED_$isGridSelection(selection$1)) selection.$setBlocksType_experimental(selection$1, () => lexical.$createParagraphNode());
      });
    }
  };
  const formatHeading = headingSize => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection$1 = lexical.$getSelection();
        if (lexical.$isRangeSelection(selection$1) || lexical.DEPRECATED_$isGridSelection(selection$1)) {
          selection.$setBlocksType_experimental(selection$1, () => richText.$createHeadingNode(headingSize));
        }
      });
    }
  };
  const formatBulletList = () => {
    if (blockType !== 'bullet') {
      editor.dispatchCommand(list.INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(list.REMOVE_LIST_COMMAND, undefined);
    }
  };
  const formatCheckList = () => {
    if (blockType !== 'check') {
      editor.dispatchCommand(list.INSERT_CHECK_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(list.REMOVE_LIST_COMMAND, undefined);
    }
  };
  const formatNumberedList = () => {
    if (blockType !== 'number') {
      editor.dispatchCommand(list.INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(list.REMOVE_LIST_COMMAND, undefined);
    }
  };
  const formatQuote = () => {
    if (blockType !== 'quote') {
      editor.update(() => {
        const selection$1 = lexical.$getSelection();
        if (lexical.$isRangeSelection(selection$1) || lexical.DEPRECATED_$isGridSelection(selection$1)) {
          selection.$setBlocksType_experimental(selection$1, () => richText.$createQuoteNode());
        }
      });
    }
  };
  const formatCode = () => {
    if (blockType !== 'code') {
      editor.update(() => {
        let selection$1 = lexical.$getSelection();
        if (lexical.$isRangeSelection(selection$1) || lexical.DEPRECATED_$isGridSelection(selection$1)) {
          if (selection$1.isCollapsed()) {
            selection.$setBlocksType_experimental(selection$1, () => code.$createCodeNode());
          } else {
            const textContent = selection$1.getTextContent();
            const codeNode = code.$createCodeNode();
            selection$1.insertNodes([codeNode]);
            selection$1 = lexical.$getSelection();
            if (lexical.$isRangeSelection(selection$1)) selection$1.insertRawText(textContent);
          }
        }
      });
    }
  };
  return /*#__PURE__*/React.createElement(DropDown, {
    disabled: disabled,
    buttonClassName: "toolbar-item blocks-controls",
    buttonIconClassName: 'icon block-type ' + blockType,
    buttonLabel: blockTypeToBlockName[blockType],
    buttonAriaLabel: "Formatting options for text style"
  }, /*#__PURE__*/React.createElement(DropDownItem, {
    className: 'item ' + dropDownActiveClass(blockType === 'paragraph'),
    onClick: formatParagraph
  }, /*#__PURE__*/React.createElement("i", {
    className: "icon paragraph"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, "Normal")), /*#__PURE__*/React.createElement(DropDownItem, {
    className: 'item ' + dropDownActiveClass(blockType === 'h1'),
    onClick: () => formatHeading('h1')
  }, /*#__PURE__*/React.createElement("i", {
    className: "icon h1"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, "Heading 1")), /*#__PURE__*/React.createElement(DropDownItem, {
    className: 'item ' + dropDownActiveClass(blockType === 'h2'),
    onClick: () => formatHeading('h2')
  }, /*#__PURE__*/React.createElement("i", {
    className: "icon h2"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, "Heading 2")), /*#__PURE__*/React.createElement(DropDownItem, {
    className: 'item ' + dropDownActiveClass(blockType === 'h3'),
    onClick: () => formatHeading('h3')
  }, /*#__PURE__*/React.createElement("i", {
    className: "icon h3"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, "Heading 3")), /*#__PURE__*/React.createElement(DropDownItem, {
    className: 'item ' + dropDownActiveClass(blockType === 'bullet'),
    onClick: formatBulletList
  }, /*#__PURE__*/React.createElement("i", {
    className: "icon bullet-list"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, "Bullet List")), /*#__PURE__*/React.createElement(DropDownItem, {
    className: 'item ' + dropDownActiveClass(blockType === 'number'),
    onClick: formatNumberedList
  }, /*#__PURE__*/React.createElement("i", {
    className: "icon numbered-list"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, "Numbered List")), /*#__PURE__*/React.createElement(DropDownItem, {
    className: 'item ' + dropDownActiveClass(blockType === 'check'),
    onClick: formatCheckList
  }, /*#__PURE__*/React.createElement("i", {
    className: "icon check-list"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, "Check List")), /*#__PURE__*/React.createElement(DropDownItem, {
    className: 'item ' + dropDownActiveClass(blockType === 'quote'),
    onClick: formatQuote
  }, /*#__PURE__*/React.createElement("i", {
    className: "icon quote"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, "Quote")), /*#__PURE__*/React.createElement(DropDownItem, {
    className: 'item ' + dropDownActiveClass(blockType === 'code'),
    onClick: formatCode
  }, /*#__PURE__*/React.createElement("i", {
    className: "icon code"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, "Code Block")));
}
function Divider() {
  return /*#__PURE__*/React.createElement("div", {
    className: "divider"
  });
}
function FontDropDown({
  editor,
  value,
  style,
  disabled = false,
  options
}) {
  const handleClick = React.useCallback(option => {
    editor.update(() => {
      const selection$1 = lexical.$getSelection();
      if (lexical.$isRangeSelection(selection$1)) {
        selection.$patchStyleText(selection$1, {
          [style]: option
        });
      }
    });
  }, [editor, style]);
  const buttonAriaLabel = style === 'font-family' ? 'Formatting options for font family' : 'Formatting options for font size';
  return /*#__PURE__*/React.createElement(DropDown, {
    disabled: disabled,
    buttonClassName: 'toolbar-item ' + style,
    buttonLabel: value,
    buttonIconClassName: style === 'font-family' ? 'icon block-type font-family' : '',
    buttonAriaLabel: buttonAriaLabel
  }, options.map(([option, text]) => /*#__PURE__*/React.createElement(DropDownItem, {
    className: `item ${dropDownActiveClass(value === option)} ${style === 'font-size' ? 'fontsize-item' : ''}`,
    onClick: () => handleClick(option),
    key: option
  }, /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, text))));
}
function ToolbarPlugin({
  config,
  handleClick
}) {
  const normFontFamilyOption = Array.isArray(config.fontFamilyOptions) ? config.fontFamilyOptions : FONT_FAMILY_OPTIONS;
  const initFontFamily = normFontFamilyOption?.[0]?.[0] ?? FONT_FAMILY_OPTIONS[0][0];
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = React.useState(editor);
  const [blockType, setBlockType] = React.useState('paragraph');
  const [selectedElementKey, setSelectedElementKey] = React.useState(null);
  const [fontSize, setFontSize] = React.useState('15px');
  const [fontColor, setFontColor] = React.useState('#000');
  const [bgColor, setBgColor] = React.useState('#fff');
  const [fontFamily, setFontFamily] = React.useState(initFontFamily);
  const [isLink, setIsLink] = React.useState(false);
  const [isBold, setIsBold] = React.useState(false);
  const [isItalic, setIsItalic] = React.useState(false);
  const [isUnderline, setIsUnderline] = React.useState(false);
  const [isStrikethrough, setIsStrikethrough] = React.useState(false);
  const [isSubscript, setIsSubscript] = React.useState(false);
  const [isSuperscript, setIsSuperscript] = React.useState(false);
  const [isCode, setIsCode] = React.useState(false);
  const [canUndo, setCanUndo] = React.useState(false);
  const [canRedo, setCanRedo] = React.useState(false);
  const [modal, showModal] = useModal();
  const [isRTL, setIsRTL] = React.useState(false);
  const [codeLanguage, setCodeLanguage] = React.useState('');
  const [isEditable, setIsEditable] = React.useState(() => editor.isEditable());
  const editorContext = useEditorComposerContext();
  const updateToolbar = React.useCallback(() => {
    const selection$1 = lexical.$getSelection();
    if (lexical.$isRangeSelection(selection$1)) {
      const anchorNode = selection$1.anchor.getNode();
      let element = anchorNode.getKey() === 'root' ? anchorNode : utils.$findMatchingParent(anchorNode, e => {
        const parent = e.getParent();
        return parent !== null && lexical.$isRootOrShadowRoot(parent);
      });
      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }
      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);

      // Update text format
      setIsBold(selection$1.hasFormat('bold'));
      setIsItalic(selection$1.hasFormat('italic'));
      setIsUnderline(selection$1.hasFormat('underline'));
      setIsStrikethrough(selection$1.hasFormat('strikethrough'));
      setIsSubscript(selection$1.hasFormat('subscript'));
      setIsSuperscript(selection$1.hasFormat('superscript'));
      setIsCode(selection$1.hasFormat('code'));
      setIsRTL(selection.$isParentElementRTL(selection$1));

      // Update links
      const node = getSelectedNode(selection$1);
      const parent = node.getParent();
      if (link.$isLinkNode(parent) || link.$isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }
      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if (list.$isListNode(element)) {
          const parentList = utils.$getNearestNodeOfType(anchorNode, list.ListNode);
          const type = parentList ? parentList.getListType() : element.getListType();
          setBlockType(type);
        } else {
          const type = richText.$isHeadingNode(element) ? element.getTag() : element.getType();
          if (type in blockTypeToBlockName) {
            setBlockType(type);
          }
          if (code.$isCodeNode(element)) {
            const language = element.getLanguage();
            setCodeLanguage(language ? code.CODE_LANGUAGE_MAP[language] || language : '');
            return;
          }
        }
      }
      // Handle buttons
      setFontSize(selection.$getSelectionStyleValueForProperty(selection$1, 'font-size', '15px'));
      setFontColor(selection.$getSelectionStyleValueForProperty(selection$1, 'color', '#000'));
      setBgColor(selection.$getSelectionStyleValueForProperty(selection$1, 'background-color', '#fff'));
      setFontFamily(selection.$getSelectionStyleValueForProperty(selection$1, 'font-family', initFontFamily));
    }
  }, [activeEditor, initFontFamily]);
  React.useEffect(() => {
    return editor.registerCommand(lexical.SELECTION_CHANGE_COMMAND, (_payload, newEditor) => {
      updateToolbar();
      setActiveEditor(newEditor);
      return false;
    }, lexical.COMMAND_PRIORITY_CRITICAL);
  }, [editor, updateToolbar]);
  React.useEffect(() => {
    return utils.mergeRegister(editor.registerEditableListener(editable => {
      setIsEditable(editable);
    }), activeEditor.registerUpdateListener(({
      editorState
    }) => {
      editorState.read(() => {
        updateToolbar();
      });
    }), activeEditor.registerCommand(lexical.CAN_UNDO_COMMAND, payload => {
      setCanUndo(payload);
      return false;
    }, lexical.COMMAND_PRIORITY_CRITICAL), activeEditor.registerCommand(lexical.CAN_REDO_COMMAND, payload => {
      setCanRedo(payload);
      return false;
    }, lexical.COMMAND_PRIORITY_CRITICAL));
  }, [activeEditor, editor, updateToolbar]);
  const applyStyleText = React.useCallback(styles => {
    activeEditor.update(() => {
      const selection$1 = lexical.$getSelection();
      if (lexical.$isRangeSelection(selection$1)) {
        selection.$patchStyleText(selection$1, styles);
      }
    });
  }, [activeEditor]);
  const clearFormatting = React.useCallback(() => {
    activeEditor.update(() => {
      const selection$1 = lexical.$getSelection();
      if (lexical.$isRangeSelection(selection$1)) {
        selection.$selectAll(selection$1);
        selection$1.getNodes().forEach(node => {
          if (lexical.$isTextNode(node)) {
            node.setFormat(0);
            node.setStyle('');
            utils.$getNearestBlockElementAncestorOrThrow(node).setFormat('');
          }
          if (LexicalDecoratorBlockNode.$isDecoratorBlockNode(node)) {
            node.setFormat('');
          }
        });
      }
    });
  }, [activeEditor]);
  const onFontColorSelect = React.useCallback(value => {
    applyStyleText({
      color: value
    });
  }, [applyStyleText]);
  const onBgColorSelect = React.useCallback(value => {
    applyStyleText({
      'background-color': value
    });
  }, [applyStyleText]);
  const insertLink = React.useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(link.TOGGLE_LINK_COMMAND, sanitizeUrl('https://'));
    } else {
      editor.dispatchCommand(link.TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);
  const onCodeLanguageSelect = React.useCallback(value => {
    activeEditor.update(() => {
      if (selectedElementKey !== null) {
        const node = lexical.$getNodeByKey(selectedElementKey);
        if (code.$isCodeNode(node)) {
          node.setLanguage(value);
        }
      }
    });
  }, [activeEditor, selectedElementKey]);
  return /*#__PURE__*/React.createElement("div", {
    className: "toolbar"
  }, config.undoRedo && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    disabled: !canUndo || !isEditable,
    onClick: () => {
      activeEditor.dispatchCommand(lexical.UNDO_COMMAND, undefined);
    },
    title: IS_APPLE ? 'Undo (⌘Z)' : 'Undo (Ctrl+Z)',
    type: "button",
    className: "toolbar-item spaced",
    "aria-label": "Undo"
  }, /*#__PURE__*/React.createElement("i", {
    className: "format undo"
  })), /*#__PURE__*/React.createElement("button", {
    disabled: !canRedo || !isEditable,
    onClick: () => {
      activeEditor.dispatchCommand(lexical.REDO_COMMAND, undefined);
    },
    title: IS_APPLE ? 'Redo (⌘Y)' : 'Redo (Ctrl+Y)',
    type: "button",
    className: "toolbar-item",
    "aria-label": "Redo"
  }, /*#__PURE__*/React.createElement("i", {
    className: "format redo"
  }))), /*#__PURE__*/React.createElement(Divider, null), config.formatBlockOptions && blockType in blockTypeToBlockName && activeEditor === editor && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BlockFormatDropDown, {
    disabled: !isEditable,
    blockType: blockType,
    editor: editor
  }), /*#__PURE__*/React.createElement(Divider, null)), blockType === 'code' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DropDown, {
    disabled: !isEditable,
    buttonClassName: "toolbar-item code-language",
    buttonLabel: code.getLanguageFriendlyName(codeLanguage),
    buttonAriaLabel: "Select language"
  }, CODE_LANGUAGE_OPTIONS.map(([value, name]) => {
    return /*#__PURE__*/React.createElement(DropDownItem, {
      className: `item ${dropDownActiveClass(value === codeLanguage)}`,
      onClick: () => onCodeLanguageSelect(value),
      key: value
    }, /*#__PURE__*/React.createElement("span", {
      className: "text"
    }, name));
  }))) : /*#__PURE__*/React.createElement(React.Fragment, null, Boolean(config.fontFamilyOptions) && /*#__PURE__*/React.createElement(FontDropDown, {
    disabled: !isEditable,
    style: 'font-family',
    value: fontFamily,
    editor: editor,
    options: normFontFamilyOption
  }), config.fontSizeOptions && /*#__PURE__*/React.createElement(FontDropDown, {
    disabled: !isEditable,
    style: 'font-size',
    value: fontSize,
    editor: editor,
    options: FONT_SIZE_OPTIONS
  }), /*#__PURE__*/React.createElement(Divider, null), config.biu && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    disabled: !isEditable,
    onClick: () => {
      activeEditor.dispatchCommand(lexical.FORMAT_TEXT_COMMAND, 'bold');
    },
    className: 'toolbar-item spaced ' + (isBold ? 'active' : ''),
    title: IS_APPLE ? 'Bold (⌘B)' : 'Bold (Ctrl+B)',
    type: "button",
    "aria-label": `Format text as bold. Shortcut: ${IS_APPLE ? '⌘B' : 'Ctrl+B'}`
  }, /*#__PURE__*/React.createElement("i", {
    className: "format bold"
  })), /*#__PURE__*/React.createElement("button", {
    disabled: !isEditable,
    onClick: () => {
      activeEditor.dispatchCommand(lexical.FORMAT_TEXT_COMMAND, 'italic');
    },
    className: 'toolbar-item spaced ' + (isItalic ? 'active' : ''),
    title: IS_APPLE ? 'Italic (⌘I)' : 'Italic (Ctrl+I)',
    type: "button",
    "aria-label": `Format text as italics. Shortcut: ${IS_APPLE ? '⌘I' : 'Ctrl+I'}`
  }, /*#__PURE__*/React.createElement("i", {
    className: "format italic"
  })), /*#__PURE__*/React.createElement("button", {
    disabled: !isEditable,
    onClick: () => {
      activeEditor.dispatchCommand(lexical.FORMAT_TEXT_COMMAND, 'underline');
    },
    className: 'toolbar-item spaced ' + (isUnderline ? 'active' : ''),
    title: IS_APPLE ? 'Underline (⌘U)' : 'Underline (Ctrl+U)',
    type: "button",
    "aria-label": `Format text to underlined. Shortcut: ${IS_APPLE ? '⌘U' : 'Ctrl+U'}`
  }, /*#__PURE__*/React.createElement("i", {
    className: "format underline"
  }))), config.codeBlock && /*#__PURE__*/React.createElement("button", {
    disabled: !isEditable,
    onClick: () => {
      activeEditor.dispatchCommand(lexical.FORMAT_TEXT_COMMAND, 'code');
    },
    className: 'toolbar-item spaced ' + (isCode ? 'active' : ''),
    title: "Insert code block",
    type: "button",
    "aria-label": "Insert code block"
  }, /*#__PURE__*/React.createElement("i", {
    className: "format code"
  })), config.link && /*#__PURE__*/React.createElement("button", {
    disabled: !isEditable,
    onClick: insertLink,
    className: 'toolbar-item spaced ' + (isLink ? 'active' : ''),
    "aria-label": "Insert link",
    title: "Insert link",
    type: "button"
  }, /*#__PURE__*/React.createElement("i", {
    className: "format link"
  })), config.textColorPicker && /*#__PURE__*/React.createElement(ColorPicker, {
    disabled: !isEditable,
    buttonClassName: "toolbar-item color-picker",
    buttonAriaLabel: "Formatting text color",
    buttonIconClassName: "icon font-color",
    color: fontColor,
    onChange: onFontColorSelect,
    title: "text color"
  }), config.bgColorPicker && /*#__PURE__*/React.createElement(ColorPicker, {
    disabled: !isEditable,
    buttonClassName: "toolbar-item color-picker",
    buttonAriaLabel: "Formatting background color",
    buttonIconClassName: "icon bg-color",
    color: bgColor,
    onChange: onBgColorSelect,
    title: "bg color"
  }), config.formatTextOptions && /*#__PURE__*/React.createElement(DropDown, {
    disabled: !isEditable,
    buttonClassName: "toolbar-item spaced",
    buttonLabel: "",
    buttonAriaLabel: "Formatting options for additional text styles",
    buttonIconClassName: "icon dropdowns-more"
  }, /*#__PURE__*/React.createElement(DropDownItem, {
    onClick: () => {
      activeEditor.dispatchCommand(lexical.FORMAT_TEXT_COMMAND, 'strikethrough');
    },
    className: 'item ' + dropDownActiveClass(isStrikethrough),
    title: "Strikethrough",
    "aria-label": "Format text with a strikethrough"
  }, /*#__PURE__*/React.createElement("i", {
    className: "icon strikethrough"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, "Strikethrough")), /*#__PURE__*/React.createElement(DropDownItem, {
    onClick: () => {
      activeEditor.dispatchCommand(lexical.FORMAT_TEXT_COMMAND, 'subscript');
    },
    className: 'item ' + dropDownActiveClass(isSubscript),
    title: "Subscript",
    "aria-label": "Format text with a subscript"
  }, /*#__PURE__*/React.createElement("i", {
    className: "icon subscript"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, "Subscript")), /*#__PURE__*/React.createElement(DropDownItem, {
    onClick: () => {
      activeEditor.dispatchCommand(lexical.FORMAT_TEXT_COMMAND, 'superscript');
    },
    className: 'item ' + dropDownActiveClass(isSuperscript),
    title: "Superscript",
    "aria-label": "Format text with a superscript"
  }, /*#__PURE__*/React.createElement("i", {
    className: "icon superscript"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, "Superscript")), /*#__PURE__*/React.createElement(DropDownItem, {
    onClick: clearFormatting,
    className: "item",
    title: "Clear text formatting",
    "aria-label": "Clear all text formatting"
  }, /*#__PURE__*/React.createElement("i", {
    className: "icon clear"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, "Clear Formatting"))), handleClick && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "file-upload",
    className: "custom-file-uploads"
  }, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 30 30",
    width: "16px",
    height: "16px"
  }, "    ", /*#__PURE__*/React.createElement("path", {
    d: "M24.707,8.793l-6.5-6.5C18.019,2.105,17.765,2,17.5,2H7C5.895,2,5,2.895,5,4v22c0,1.105,0.895,2,2,2h16c1.105,0,2-0.895,2-2 V9.5C25,9.235,24.895,8.981,24.707,8.793z M18,10c-0.552,0-1-0.448-1-1V3.904L23.096,10H18z"
  }))), /*#__PURE__*/React.createElement("input", {
    id: "file-upload",
    onChange: handleClick,
    className: "textfileupload",
    type: "file",
    accept: "video/*, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, text/csv"
  })), /*#__PURE__*/React.createElement(Divider, null), config?.insertOptions && /*#__PURE__*/React.createElement(DropDown, {
    disabled: !isEditable,
    buttonClassName: "toolbar-item spaced",
    buttonLabel: "Insert",
    buttonAriaLabel: "Insert specialized editor node",
    buttonIconClassName: "icon plus"
  }, /*#__PURE__*/React.createElement(DropDownItem, {
    onClick: () => {
      showModal('Insert Image', onClose => /*#__PURE__*/React.createElement(InsertImageDialog, {
        activeEditor: activeEditor,
        onClose: onClose
      }));
    },
    className: "item"
  }, /*#__PURE__*/React.createElement("i", {
    className: "icon image"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, "Image")), /*#__PURE__*/React.createElement(DropDownItem, {
    onClick: () => {
      showModal('Insert Table', onClose => /*#__PURE__*/React.createElement(InsertTableDialog, {
        activeEditor: activeEditor,
        onClose: onClose
      }));
    },
    className: "item"
  }, /*#__PURE__*/React.createElement("i", {
    className: "icon table"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, "Table")), /*#__PURE__*/React.createElement(DropDownItem, {
    onClick: () => {
      editor.dispatchCommand(INSERT_COLLAPSIBLE_COMMAND, undefined);
    },
    className: "item"
  }, /*#__PURE__*/React.createElement("i", {
    className: "icon caret-right"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, "Collapsible container")), EmbedConfigs.map(embedConfig => /*#__PURE__*/React.createElement(DropDownItem, {
    key: embedConfig.type,
    onClick: () => {
      activeEditor.dispatchCommand(LexicalAutoEmbedPlugin.INSERT_EMBED_COMMAND, embedConfig.type);
    },
    className: "item"
  }, embedConfig.icon, /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, embedConfig.contentName))), editorContext.extensions.toolbarInsertsAfter.map(([extName, ExtDropDownItem]) => /*#__PURE__*/React.createElement(ExtDropDownItem, {
    key: extName,
    showModal: showModal,
    activeEditor: activeEditor
  })))), /*#__PURE__*/React.createElement(Divider, null), config.align && /*#__PURE__*/React.createElement(DropDown, {
    disabled: !isEditable,
    buttonLabel: "Align",
    buttonIconClassName: "icon left-align",
    buttonClassName: "toolbar-item spaced alignment",
    buttonAriaLabel: "Formatting options for text alignment"
  }, /*#__PURE__*/React.createElement(DropDownItem, {
    onClick: () => {
      activeEditor.dispatchCommand(lexical.FORMAT_ELEMENT_COMMAND, 'left');
    },
    className: "item"
  }, /*#__PURE__*/React.createElement("i", {
    className: "icon left-align"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, "Left Align")), /*#__PURE__*/React.createElement(DropDownItem, {
    onClick: () => {
      activeEditor.dispatchCommand(lexical.FORMAT_ELEMENT_COMMAND, 'center');
    },
    className: "item"
  }, /*#__PURE__*/React.createElement("i", {
    className: "icon center-align"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, "Center Align")), /*#__PURE__*/React.createElement(DropDownItem, {
    onClick: () => {
      activeEditor.dispatchCommand(lexical.FORMAT_ELEMENT_COMMAND, 'right');
    },
    className: "item"
  }, /*#__PURE__*/React.createElement("i", {
    className: "icon right-align"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, "Right Align")), /*#__PURE__*/React.createElement(DropDownItem, {
    onClick: () => {
      activeEditor.dispatchCommand(lexical.FORMAT_ELEMENT_COMMAND, 'justify');
    },
    className: "item"
  }, /*#__PURE__*/React.createElement("i", {
    className: "icon justify-align"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, "Justify Align")), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(DropDownItem, {
    onClick: () => {
      activeEditor.dispatchCommand(lexical.OUTDENT_CONTENT_COMMAND, undefined);
    },
    className: "item"
  }, /*#__PURE__*/React.createElement("i", {
    className: 'icon ' + (isRTL ? 'indent' : 'outdent')
  }), /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, "Outdent")), /*#__PURE__*/React.createElement(DropDownItem, {
    onClick: () => {
      activeEditor.dispatchCommand(lexical.INDENT_CONTENT_COMMAND, undefined);
    },
    className: "item"
  }, /*#__PURE__*/React.createElement("i", {
    className: 'icon ' + (isRTL ? 'outdent' : 'indent')
  }), /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, "Indent"))), modal);
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function TreeViewPlugin() {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  return /*#__PURE__*/React.createElement(LexicalTreeView.TreeView, {
    viewClassName: "tree-view-output",
    timeTravelPanelClassName: "debug-timetravel-panel",
    timeTravelButtonClassName: "debug-timetravel-button",
    timeTravelPanelSliderClassName: "debug-timetravel-panel-slider",
    timeTravelPanelButtonClassName: "debug-timetravel-panel-button",
    editor: editor
  });
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const skipCollaborationInit =
// @ts-ignore
window.parent != null && window.parent.frames.right === window;
const defaultToolbarConfig = {
  align: true,
  bgColorPicker: true,
  biu: true,
  codeBlock: true,
  fontFamilyOptions: true,
  fontSizeOptions: true,
  formatBlockOptions: true,
  formatTextOptions: true,
  insertOptions: true,
  link: true,
  textColorPicker: true,
  undoRedo: true
};
function Editor({
  isCollab,
  isAutocomplete,
  isMaxLength,
  isCharLimit,
  isCharLimitUtf8,
  isRichText = false,
  showTreeView,
  showTableOfContents,
  onChange,
  onChangeMode = 'json',
  onUpload,
  onDataSend,
  toolbarConfig,
  rootClassName,
  containerClassName,
  dummyMentionsDatas
}) {
  const {
    historyState
  } = useSharedHistoryContext();
  const text = isCollab ? 'Enter some collaborative rich text...' : isRichText ? 'Enter some rich text...' : 'Enter some plain text...';
  const placeholder = /*#__PURE__*/React.createElement(Placeholder, null, text);
  const [floatingAnchorElem, setFloatingAnchorElem] = React.useState(null);
  const [isSmallWidthViewport, setIsSmallWidthViewport] = React.useState(false);
  const onRef = _floatingAnchorElem => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const editorContext = useEditorComposerContext();
  const normToolbarConfig = React.useMemo(() => ({
    ...defaultToolbarConfig,
    ...toolbarConfig
  }), [toolbarConfig]);
  React.useEffect(() => {
    const updateViewPortWidth = () => {
      const isNextSmallWidthViewport = CAN_USE_DOM && window.matchMedia('(max-width: 1025px)').matches;
      if (isNextSmallWidthViewport !== isSmallWidthViewport) {
        setIsSmallWidthViewport(isNextSmallWidthViewport);
      }
    };
    window.addEventListener('resize', updateViewPortWidth);
    return () => {
      window.removeEventListener('resize', updateViewPortWidth);
    };
  }, [isSmallWidthViewport]);
  const handleClick = event => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (onDataSend) {
        onDataSend(selectedFile).then(res => {
          const parts = res?.split('.');
          const extension = parts[parts.length - 1]?.toLowerCase();
          const validVideoTypes = ['mp4', 'webm', 'mov', 'avi', 'flv', 'mkv', 'wmv'];
          const validPdfTypes = ['pdf'];
          const validOfficeTypes = ['xlsx', 'docx', 'pptx', 'csv', 'ods'];
          if (validVideoTypes.includes(extension)) {
            editor.dispatchCommand(INSERT_VIDEO_COMMAND, res);
            return;
          }
          if (validPdfTypes.includes(extension)) {
            editor.dispatchCommand(INSERT_PDF_COMMAND, res);
            return;
          }
          if (validOfficeTypes.includes(extension)) {
            editor.dispatchCommand(INSERT_OFFICE_COMMAND, res);
            return;
          }
        });
      } else {
        console.error('onDataSend function is not defined');
      }
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: joinClasses('editor-shell', rootClassName)
  }, /*#__PURE__*/React.createElement("div", {
    className: `editor-container ${containerClassName ?? ''} ${showTreeView ? 'tree-view' : ''} ${!isRichText ? 'plain-text' : ''}`
  }, isMaxLength && /*#__PURE__*/React.createElement(MaxLengthPlugin, {
    maxLength: 30
  }), /*#__PURE__*/React.createElement(DragDropPaste, null), /*#__PURE__*/React.createElement(LexicalAutoFocusPlugin.AutoFocusPlugin, null), /*#__PURE__*/React.createElement(LexicalClearEditorPlugin.ClearEditorPlugin, null), /*#__PURE__*/React.createElement(CommentPlugin, null), /*#__PURE__*/React.createElement(ComponentPickerMenuPlugin, null), /*#__PURE__*/React.createElement(EmojiPickerPlugin, null), /*#__PURE__*/React.createElement(AutoEmbedPlugin, null), /*#__PURE__*/React.createElement(MentionsPlugin, {
    dummyMentionsDatas: dummyMentionsDatas
  }), /*#__PURE__*/React.createElement(EmojisPlugin, null), /*#__PURE__*/React.createElement(LexicalHashtagPlugin.HashtagPlugin, null), /*#__PURE__*/React.createElement(KeywordsPlugin, null), /*#__PURE__*/React.createElement(SpeechToTextPlugin$1, null), /*#__PURE__*/React.createElement(LexicalAutoLinkPlugin, null), onChange && /*#__PURE__*/React.createElement(LexicalOnChangePlugin.OnChangePlugin, {
    onChange: (editorState, editor) => {
      if (onChangeMode === 'html') {
        editor.update(() => {
          onChange(html.$generateHtmlFromNodes(editor, null), editorState, editor);
        });
      } else if (onChangeMode === 'json') {
        onChange(JSON.stringify(editorState), editorState, editor);
      }
    }
  }), isRichText ? /*#__PURE__*/React.createElement(React.Fragment, null, isCollab ? /*#__PURE__*/React.createElement(LexicalCollaborationPlugin.CollaborationPlugin, {
    id: "main",
    providerFactory: createWebsocketProvider,
    shouldBootstrap: !skipCollaborationInit
  }) : /*#__PURE__*/React.createElement(LexicalHistoryPlugin.HistoryPlugin, {
    externalHistoryState: historyState
  }), /*#__PURE__*/React.createElement(LexicalRichTextPlugin.RichTextPlugin, {
    contentEditable: /*#__PURE__*/React.createElement("div", {
      className: "editor-scroller"
    }, /*#__PURE__*/React.createElement("div", {
      className: "editor themeeditor",
      ref: onRef
    }, /*#__PURE__*/React.createElement(LexicalContentEditable, null))),
    placeholder: placeholder,
    ErrorBoundary: LexicalErrorBoundary
  }), /*#__PURE__*/React.createElement(MarkdownPlugin, null), /*#__PURE__*/React.createElement(CodeHighlightPlugin, null), /*#__PURE__*/React.createElement(LexicalListPlugin.ListPlugin, null), /*#__PURE__*/React.createElement(LexicalCheckListPlugin.CheckListPlugin, null), /*#__PURE__*/React.createElement(ListMaxIndentLevelPlugin, {
    maxDepth: 7
  }), /*#__PURE__*/React.createElement(LexicalTablePlugin.TablePlugin, null), /*#__PURE__*/React.createElement(TableCellResizerPlugin, null), /*#__PURE__*/React.createElement(ImagesPlugin, null), /*#__PURE__*/React.createElement(OnImageUploadPlugin, {
    onUpload: onUpload
  }), /*#__PURE__*/React.createElement(LinkPlugin, null), /*#__PURE__*/React.createElement(PollPlugin, null), /*#__PURE__*/React.createElement(TwitterPlugin, null), /*#__PURE__*/React.createElement(YouTubePlugin, null), /*#__PURE__*/React.createElement(VideoPlugin, null), /*#__PURE__*/React.createElement(PdfPlugin, null), /*#__PURE__*/React.createElement(OfficePlugin, null), /*#__PURE__*/React.createElement(FigmaPlugin, null), /*#__PURE__*/React.createElement(ClickableLinkPlugin, null), /*#__PURE__*/React.createElement(LexicalHorizontalRulePlugin.HorizontalRulePlugin, null), /*#__PURE__*/React.createElement(TabFocusPlugin, null), /*#__PURE__*/React.createElement(LexicalTabIndentationPlugin.TabIndentationPlugin, null), /*#__PURE__*/React.createElement(CollapsiblePlugin, null), floatingAnchorElem && !isSmallWidthViewport && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DraggableBlockPlugin, {
    anchorElem: floatingAnchorElem
  }), /*#__PURE__*/React.createElement(CodeActionMenuPlugin, {
    anchorElem: floatingAnchorElem
  }), /*#__PURE__*/React.createElement(FloatingLinkEditorPlugin, {
    anchorElem: floatingAnchorElem
  }), /*#__PURE__*/React.createElement(TableActionMenuPlugin, {
    anchorElem: floatingAnchorElem
  }), /*#__PURE__*/React.createElement(TextFormatFloatingToolbarPlugin, {
    anchorElem: floatingAnchorElem,
    config: normToolbarConfig
  })), editorContext.extensions.plugins.map(([extName, Plugin]) => /*#__PURE__*/React.createElement(Plugin, {
    key: extName
  }))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(LexicalPlainTextPlugin.PlainTextPlugin, {
    contentEditable: /*#__PURE__*/React.createElement(LexicalContentEditable, null),
    placeholder: placeholder,
    ErrorBoundary: LexicalErrorBoundary
  }), /*#__PURE__*/React.createElement(LexicalHistoryPlugin.HistoryPlugin, {
    externalHistoryState: historyState
  })), (isCharLimit || isCharLimitUtf8) && /*#__PURE__*/React.createElement(LexicalCharacterLimitPlugin.CharacterLimitPlugin, {
    charset: isCharLimit ? 'UTF-16' : 'UTF-8',
    maxLength: 5
  }), isAutocomplete && /*#__PURE__*/React.createElement(AutocompletePlugin, null), /*#__PURE__*/React.createElement("div", null, showTableOfContents && /*#__PURE__*/React.createElement(TableOfContentsPlugin, null)), /*#__PURE__*/React.createElement(ActionsPlugin, {
    isRichText: isRichText
  })), isRichText && /*#__PURE__*/React.createElement(ToolbarPlugin, {
    config: normToolbarConfig,
    handleClick: handleClick
  }), showTreeView && /*#__PURE__*/React.createElement(TreeViewPlugin, null));
}

class ExtendedTextNode extends lexical.TextNode {
  constructor(text, key) {
    super(text, key);
  }
  static getType() {
    return 'extended-text';
  }
  static clone(node) {
    return new ExtendedTextNode(node.__text, node.__key);
  }
  static importDOM() {
    const importers = lexical.TextNode.importDOM();
    return {
      ...importers,
      code: () => ({
        conversion: patchStyleConversion(importers?.code),
        priority: 1
      }),
      em: () => ({
        conversion: patchStyleConversion(importers?.em),
        priority: 1
      }),
      span: () => ({
        conversion: patchStyleConversion(importers?.span),
        priority: 1
      }),
      strong: () => ({
        conversion: patchStyleConversion(importers?.strong),
        priority: 1
      }),
      sub: () => ({
        conversion: patchStyleConversion(importers?.sub),
        priority: 1
      }),
      sup: () => ({
        conversion: patchStyleConversion(importers?.sup),
        priority: 1
      })
    };
  }
  static importJSON(serializedNode) {
    return lexical.TextNode.importJSON(serializedNode);
  }
  isSimpleText() {
    return this.__type === 'extended-text' && this.__mode === 0;
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      type: 'extended-text',
      version: 1
    };
  }
}
function patchStyleConversion(originalDOMConverter) {
  return node => {
    const original = originalDOMConverter?.(node);
    if (!original) {
      return null;
    }
    const originalOutput = original.conversion(node);
    if (!originalOutput) {
      return originalOutput;
    }
    const backgroundColor = node.style.backgroundColor;
    const color = node.style.color;
    const fontFamily = node.style.fontFamily;
    const fontWeight = node.style.fontWeight;
    const fontSize = node.style.fontSize;
    const textDecoration = node.style.textDecoration;
    const textalignment = node.style.alignItems;
    const display = node.style.display;
    const height = node.style.height;
    const borderRadius = node.style.borderRadius;
    const padding = node.style.padding;
    const width = node.style.width;
    return {
      ...originalOutput,
      forChild: (lexicalNode, parent) => {
        const originalForChild = originalOutput?.forChild ?? (x => x);
        const result = originalForChild(lexicalNode, parent);
        if (lexical.$isTextNode(result)) {
          const style = [backgroundColor ? `background-color: ${backgroundColor}` : null, color ? `color: ${color}` : null, fontFamily ? `font-family: ${fontFamily}` : null, fontWeight ? `font-weight: ${fontWeight}` : null, fontSize ? `font-size: ${fontSize}` : null, textDecoration ? `text-decoration: ${textDecoration}` : null, textalignment ? `text-align: ${textalignment}` : null, display ? `display : ${display}` : null, height ? `height : ${height}` : null, borderRadius ? `border-radius :${borderRadius}` : null, padding ? `padding :${padding}` : null, width ? `width :${width}` : null].filter(value => value != null).join('; ');
          if (style.length) {
            return result.setStyle(style);
          }
        }
        console.log(result);
        return result;
      }
    };
  };
}

const StickyComponent$2 = /*#__PURE__*/React.lazy(
// @ts-ignore
() => Promise.resolve().then(function () { return StickyComponent$1; }));
class StickyNode extends lexical.DecoratorNode {
  static getType() {
    return 'sticky';
  }
  static clone(node) {
    return new StickyNode(node.__x, node.__y, node.__color, node.__caption, node.__key);
  }
  static importJSON(serializedNode) {
    const stickyNode = new StickyNode(serializedNode.xOffset, serializedNode.yOffset, serializedNode.color);
    const caption = serializedNode.caption;
    const nestedEditor = stickyNode.__caption;
    const editorState = nestedEditor.parseEditorState(caption.editorState);
    if (!editorState.isEmpty()) {
      nestedEditor.setEditorState(editorState);
    }
    return stickyNode;
  }
  constructor(x, y, color, caption, key) {
    super(key);
    _defineProperty(this, "__x", void 0);
    _defineProperty(this, "__y", void 0);
    _defineProperty(this, "__color", void 0);
    _defineProperty(this, "__caption", void 0);
    this.__x = x;
    this.__y = y;
    this.__caption = caption || lexical.createEditor();
    this.__color = color;
  }
  exportJSON() {
    return {
      caption: this.__caption.toJSON(),
      color: this.__color,
      type: 'sticky',
      version: 1,
      xOffset: this.__x,
      yOffset: this.__y
    };
  }
  createDOM(config) {
    const div = document.createElement('div');
    div.style.display = 'contents';
    return div;
  }
  updateDOM() {
    return false;
  }
  setPosition(x, y) {
    const writable = this.getWritable();
    writable.__x = x;
    writable.__y = y;
    lexical.$setSelection(null);
  }
  toggleColor() {
    const writable = this.getWritable();
    writable.__color = writable.__color === 'pink' ? 'yellow' : 'pink';
  }
  decorate(editor, config) {
    return /*#__PURE__*/ReactDOM.createPortal(/*#__PURE__*/React.createElement(React.Suspense, {
      fallback: null
    }, /*#__PURE__*/React.createElement(StickyComponent$2, {
      color: this.__color,
      x: this.__x,
      y: this.__y,
      nodeKey: this.getKey(),
      caption: this.__caption
    })), document.body);
  }
  isIsolated() {
    return true;
  }
}
function $isStickyNode(node) {
  return node instanceof StickyNode;
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const PlaygroundNodes = [richText.HeadingNode, list.ListNode, list.ListItemNode, richText.QuoteNode, code.CodeNode, TableNode, table.TableNode, table.TableCellNode, table.TableRowNode, hashtag.HashtagNode, code.CodeHighlightNode, link.AutoLinkNode, link.LinkNode, overflow.OverflowNode, PollNode, StickyNode, ImageNode, MentionNode, EmojiNode, AutocompleteNode, KeywordNode, LexicalHorizontalRuleNode.HorizontalRuleNode, TweetNode, YouTubeNode, FigmaNode, mark.MarkNode, CollapsibleContainerNode, CollapsibleContentNode, CollapsibleTitleNode, ExtendedTextNode, VideoNode, PdfNode, OfficeNode];
var PlaygroundNodes$1 = PlaygroundNodes;

/* eslint-disable header/header */
function EditorComposer({
  children,
  initialConfig,
  extensions
}) {
  const editorContextValue = React.useMemo(() => ({
    extensions: (extensions ?? []).reduce((acc, extension) => {
      if (extension.node) acc.nodes.push(extension.node);
      if (extension.plugin) acc.plugins.push([extension.name, extension.plugin]);
      if (extension.transformer) acc.transformers.push(extension.transformer);
      if (extension.toolbarInsertAfter) acc.toolbarInsertsAfter.push([extension.name, extension.toolbarInsertAfter]);
      return acc;
    }, {
      nodes: [],
      plugins: [],
      toolbarInsertsAfter: [],
      transformers: []
    })
  }), [extensions]);
  const config = {
    editorState: undefined,
    namespace: 'Playground',
    onError: error => {
      throw error;
    },
    theme: baseTheme,
    ...initialConfig,
    nodes: [...PlaygroundNodes$1, ...(initialConfig?.nodes ?? []), ...editorContextValue.extensions.nodes]
  };
  return /*#__PURE__*/React.createElement(EditorComposerContext.Provider, {
    value: editorContextValue
  }, /*#__PURE__*/React.createElement(LexicalComposer.LexicalComposer, {
    initialConfig: config
  }, children));
}

/* eslint-disable header/header */
const useSyncWithInputHtml = (html$1, {
  timeoutMs = 800
} = {}) => {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const [debHtml] = useDebounce$1.useDebounce(html$1, timeoutMs);
  const normHtml = editor.getEditorState().isEmpty() ? html$1 : debHtml;
  useLayoutEffect(() => {
    editor.update(() => {
      if (html.$generateHtmlFromNodes(editor, null) !== normHtml) {
        lexical.$getRoot().clear();
        const phNode = lexical.$createParagraphNode();
        phNode.append(lexical.$createTextNode(''));
        lexical.$getRoot().append(phNode);
        lexical.$getRoot().select();
        const parser = new DOMParser();
        const dom = parser.parseFromString(normHtml ?? '', 'text/html');
        const nodes = html.$generateNodesFromDOM(editor, dom);
        const selection = lexical.$getSelection();
        if (lexical.$isRangeSelection(selection)) {
          selection.insertNodes(nodes);
        }
      }
    });
  }, [normHtml]); // eslint-disable-line react-hooks/exhaustive-deps
};
var useSyncWithInputHtml$1 = useSyncWithInputHtml;

/* eslint-disable header/header */
const stringifyJsonState = json => {
  if (json && typeof json !== 'string') {
    return JSON.stringify(json);
  }
  return json;
};
const useSyncWithInputJson = (json, {
  timeoutMs = 800
} = {}) => {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const [debJson] = useDebounce$1.useDebounce(json, timeoutMs);
  const normJson = editor.getEditorState().isEmpty() ? json : debJson;
  useLayoutEffect(() => {
    if (normJson) {
      const currState = editor.getEditorState();
      if (stringifyJsonState(normJson) !== JSON.stringify(currState)) {
        const newState = editor.parseEditorState(normJson);
        editor.setEditorState(newState);
      }
    }
  }, [normJson]); // eslint-disable-line react-hooks/exhaustive-deps
};
var useSyncWithInputJson$1 = useSyncWithInputJson;

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function PasteLogPlugin() {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const [isActive, setIsActive] = React.useState(false);
  const [lastClipboardData, setLastClipboardData] = React.useState(null);
  React.useEffect(() => {
    if (isActive) {
      return editor.registerCommand(lexical.PASTE_COMMAND, e => {
        const {
          clipboardData
        } = e;
        const allData = [];
        if (clipboardData && clipboardData.types) {
          clipboardData.types.forEach(type => {
            allData.push(type.toUpperCase(), clipboardData.getData(type));
          });
        }
        setLastClipboardData(allData.join('\n\n'));
        return false;
      }, lexical.COMMAND_PRIORITY_NORMAL);
    }
  }, [editor, isActive]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    id: "paste-log-buttons",
    className: `editor-dev-buttons ${isActive ? 'active' : ''}`,
    onClick: () => {
      setIsActive(!isActive);
    },
    title: isActive ? 'Disable paste log' : 'Enable paste log'
  }), isActive && lastClipboardData !== null ? /*#__PURE__*/React.createElement("pre", null, lastClipboardData) : null);
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const copy = text => {
  const textArea = document.createElement('textarea');
  textArea.value = text || '';
  textArea.style.position = 'absolute';
  textArea.style.opacity = '0';
  document.body?.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    const result = document.execCommand('copy');
    // eslint-disable-next-line no-console
    console.log(result);
  } catch (error) {
    console.error(error);
  }
  document.body?.removeChild(textArea);
};
const download = (filename, text) => {
  const a = document.createElement('a');
  a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text || ''));
  a.setAttribute('download', filename);
  a.style.display = 'none';
  document.body?.appendChild(a);
  a.click();
  document.body?.removeChild(a);
};
const formatStep = step => {
  const formatOneStep = (name, value) => {
    switch (name) {
      case 'click':
        {
          return `      await page.mouse.click(${value.x}, ${value.y});`;
        }
      case 'press':
        {
          return `      await page.keyboard.press('${value}');`;
        }
      case 'keydown':
        {
          return `      await page.keyboard.keydown('${value}');`;
        }
      case 'keyup':
        {
          return `      await page.keyboard.keyup('${value}');`;
        }
      case 'type':
        {
          return `      await page.keyboard.type('${value}');`;
        }
      case 'selectAll':
        {
          return `      await selectAll(page);`;
        }
      case 'snapshot':
        {
          return `      await assertHTMLSnapshot(page);
      await assertSelection(page, {
        anchorPath: [${value.anchorPath.toString()}],
        anchorOffset: ${value.anchorOffset},
        focusPath: [${value.focusPath.toString()}],
        focusOffset: ${value.focusOffset},
      });
`;
        }
      default:
        return ``;
    }
  };
  const formattedStep = formatOneStep(step.name, step.value);
  switch (step.count) {
    case 1:
      return formattedStep;
    case 2:
      return [formattedStep, formattedStep].join(`\n`);
    default:
      return `      await repeat(${step.count}, async () => {
  ${formattedStep}
      );`;
  }
};
function isSelectAll(event) {
  return event.keyCode === 65 && (IS_APPLE ? event.metaKey : event.ctrlKey);
}

// stolen from LexicalSelection-test
function sanitizeSelection(selection) {
  const {
    anchorNode,
    focusNode
  } = selection;
  let {
    anchorOffset,
    focusOffset
  } = selection;
  if (anchorOffset !== 0) {
    anchorOffset--;
  }
  if (focusOffset !== 0) {
    focusOffset--;
  }
  return {
    anchorNode,
    anchorOffset,
    focusNode,
    focusOffset
  };
}
function getPathFromNodeToEditor(node, rootElement) {
  let currentNode = node;
  const path = [];
  while (currentNode !== rootElement) {
    if (currentNode !== null && currentNode !== undefined) {
      path.unshift(Array.from(currentNode?.parentNode?.childNodes ?? []).indexOf(currentNode));
    }
    currentNode = currentNode?.parentNode;
  }
  return path;
}
const keyPresses = new Set(['Enter', 'Backspace', 'Delete', 'Escape', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']);
function useTestRecorder(editor) {
  const [steps, setSteps] = React.useState([]);
  const [isRecording, setIsRecording] = React.useState(false);
  const [, setCurrentInnerHTML] = React.useState('');
  const [templatedTest, setTemplatedTest] = React.useState('');
  const previousSelectionRef = React.useRef(null);
  const skipNextSelectionChangeRef = React.useRef(false);
  const preRef = React.useRef(null);
  const getCurrentEditor = React.useCallback(() => {
    return editor;
  }, [editor]);
  const generateTestContent = React.useCallback(() => {
    const rootElement = editor.getRootElement();
    const browserSelection = window.getSelection();
    if (rootElement == null || browserSelection == null || browserSelection.anchorNode == null || browserSelection.focusNode == null || !rootElement.contains(browserSelection.anchorNode) || !rootElement.contains(browserSelection.focusNode)) {
      return null;
    }
    return `
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  initializeE2E,
  assertHTMLSnapshot,
  assertSelection,
  repeat,
} from '../utils';
import {selectAll} from '../keyboardShortcuts';
import { RangeSelection } from 'lexical';
import { NodeSelection } from 'lexical';

describe('Test case', () => {
  initializeE2E((e2e) => {
    it('Should pass this test', async () => {
      const {page} = e2e;

      await page.focus('div[contenteditable="true"]');
${steps.map(formatStep).join(`\n`)}
    });
});
    `;
  }, [editor, steps]);

  // just a wrapper around inserting new actions so that we can
  // coalesce some actions like insertText/moveNativeSelection
  const pushStep = React.useCallback((name, value) => {
    setSteps(currentSteps => {
      // trying to group steps
      const currentIndex = steps.length - 1;
      const lastStep = steps[currentIndex];
      if (lastStep) {
        if (lastStep.name === name) {
          if (name === 'type') {
            // for typing events we just append the text
            return [...steps.slice(0, currentIndex), {
              ...lastStep,
              value: lastStep.value + value
            }];
          } else {
            // for other events we bump the counter if their values are the same
            if (lastStep.value === value) {
              return [...steps.slice(0, currentIndex), {
                ...lastStep,
                count: lastStep.count + 1
              }];
            }
          }
        }
      }
      // could not group, just append a new one
      return [...currentSteps, {
        count: 1,
        name,
        value
      }];
    });
  }, [steps, setSteps]);
  useLayoutEffect(() => {
    const onKeyDown = event => {
      if (!isRecording) {
        return;
      }
      const key = event.key;
      if (isSelectAll(event)) {
        pushStep('selectAll', '');
      } else if (keyPresses.has(key)) {
        pushStep('press', event.key);
      } else if ([...key].length > 1) {
        pushStep('keydown', event.key);
      } else {
        pushStep('type', event.key);
      }
    };
    const onKeyUp = event => {
      if (!isRecording) {
        return;
      }
      const key = event.key;
      if (!keyPresses.has(key) && [...key].length > 1) {
        pushStep('keyup', event.key);
      }
    };
    return editor.registerRootListener((rootElement, prevRootElement) => {
      if (prevRootElement !== null) {
        prevRootElement.removeEventListener('keydown', onKeyDown);
        prevRootElement.removeEventListener('keyup', onKeyUp);
      }
      if (rootElement !== null) {
        rootElement.addEventListener('keydown', onKeyDown);
        rootElement.addEventListener('keyup', onKeyUp);
      }
    });
  }, [editor, isRecording, pushStep]);
  useLayoutEffect(() => {
    if (preRef.current) {
      preRef.current.scrollTo(0, preRef.current.scrollHeight);
    }
  }, [generateTestContent]);
  React.useEffect(() => {
    if (steps) {
      const testContent = generateTestContent();
      if (testContent !== null) {
        setTemplatedTest(testContent);
      }
      if (preRef.current) {
        preRef.current.scrollTo(0, preRef.current.scrollHeight);
      }
    }
  }, [generateTestContent, steps]);
  React.useEffect(() => {
    const removeUpdateListener = editor.registerUpdateListener(({
      editorState,
      dirtyLeaves,
      dirtyElements
    }) => {
      if (!isRecording) {
        return;
      }
      const currentSelection = editorState._selection;
      const previousSelection = previousSelectionRef.current;
      const skipNextSelectionChange = skipNextSelectionChangeRef.current;
      if (previousSelection !== currentSelection) {
        if (dirtyLeaves.size === 0 && dirtyElements.size === 0 && !skipNextSelectionChange) {
          const browserSelection = window.getSelection();
          if (browserSelection && (browserSelection.anchorNode == null || browserSelection.focusNode == null)) {
            return;
          }
        }
        previousSelectionRef.current = currentSelection;
      }
      skipNextSelectionChangeRef.current = false;
      const testContent = generateTestContent();
      if (testContent !== null) {
        setTemplatedTest(testContent);
      }
    });
    return removeUpdateListener;
  }, [editor, generateTestContent, isRecording, pushStep]);

  // save innerHTML
  React.useEffect(() => {
    if (!isRecording) {
      return;
    }
    const removeUpdateListener = editor.registerUpdateListener(() => {
      const rootElement = editor.getRootElement();
      if (rootElement !== null) {
        setCurrentInnerHTML(rootElement?.innerHTML);
      }
    });
    return removeUpdateListener;
  }, [editor, isRecording]);

  // clear editor and start recording
  const toggleEditorSelection = React.useCallback(currentEditor => {
    if (!isRecording) {
      currentEditor.update(() => {
        const root = lexical.$getRoot();
        root.clear();
        const text = lexical.$createTextNode();
        root.append(lexical.$createParagraphNode().append(text));
        text.select();
      });
      setSteps([]);
    }
    setIsRecording(currentIsRecording => !currentIsRecording);
  }, [isRecording]);
  const onSnapshotClick = React.useCallback(() => {
    if (!isRecording) {
      return;
    }
    const browserSelection = window.getSelection();
    if (browserSelection === null || browserSelection.anchorNode == null || browserSelection.focusNode == null) {
      return;
    }
    const {
      anchorNode,
      anchorOffset,
      focusNode,
      focusOffset
    } = sanitizeSelection(browserSelection);
    const rootElement = getCurrentEditor().getRootElement();
    let anchorPath;
    if (anchorNode !== null) {
      anchorPath = getPathFromNodeToEditor(anchorNode, rootElement);
    }
    let focusPath;
    if (focusNode !== null) {
      focusPath = getPathFromNodeToEditor(focusNode, rootElement);
    }
    pushStep('snapshot', {
      anchorNode,
      anchorOffset,
      anchorPath,
      focusNode,
      focusOffset,
      focusPath
    });
  }, [pushStep, isRecording, getCurrentEditor]);
  const onCopyClick = React.useCallback(() => {
    copy(generateTestContent());
  }, [generateTestContent]);
  const onDownloadClick = React.useCallback(() => {
    download('test.js', generateTestContent());
  }, [generateTestContent]);
  const button = /*#__PURE__*/React.createElement("button", {
    id: "test-recorder-buttons",
    className: `editor-dev-buttons ${isRecording ? 'active' : ''}`,
    onClick: () => toggleEditorSelection(getCurrentEditor()),
    title: isRecording ? 'Disable test recorder' : 'Enable test recorder'
  });
  const output = isRecording ? /*#__PURE__*/React.createElement("div", {
    className: "test-recorder-output"
  }, /*#__PURE__*/React.createElement("div", {
    className: "test-recorder-toolbars"
  }, /*#__PURE__*/React.createElement("button", {
    className: "test-recorder-buttons",
    id: "test-recorder-buttons-snapshot",
    title: "Insert snapshot",
    onClick: onSnapshotClick
  }), /*#__PURE__*/React.createElement("button", {
    className: "test-recorder-buttons",
    id: "test-recorder-buttons-copy",
    title: "Copy to clipboard",
    onClick: onCopyClick
  }), /*#__PURE__*/React.createElement("button", {
    className: "test-recorder-buttons",
    id: "test-recorder-buttons-download",
    title: "Download as a file",
    onClick: onDownloadClick
  })), /*#__PURE__*/React.createElement("pre", {
    id: "test-recorder",
    ref: preRef
  }, templatedTest)) : null;
  return [button, output];
}
function TestRecorderPlugin() {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const [testRecorderButton, testRecorderOutput] = useTestRecorder(editor);
  return /*#__PURE__*/React.createElement(React.Fragment, null, testRecorderButton, testRecorderOutput);
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const validInputTypes = new Set(['insertText', 'insertCompositionText', 'insertFromComposition', 'insertLineBreak', 'insertParagraph', 'deleteCompositionText', 'deleteContentBackward', 'deleteByComposition', 'deleteContent', 'deleteContentForward', 'deleteWordBackward', 'deleteWordForward', 'deleteHardLineBackward', 'deleteSoftLineBackward', 'deleteHardLineForward', 'deleteSoftLineForward']);
function TypingPerfPlugin() {
  const report = useReport();
  React.useEffect(() => {
    let start = 0;
    let timerId;
    let keyPressTimerId;
    let log = [];
    let invalidatingEvent = false;
    const measureEventEnd = function logKeyPress() {
      if (keyPressTimerId != null) {
        if (invalidatingEvent) {
          invalidatingEvent = false;
        } else {
          log.push(performance.now() - start);
        }
        clearTimeout(keyPressTimerId);
        keyPressTimerId = null;
      }
    };
    const measureEventStart = function measureEvent() {
      if (timerId != null) {
        clearTimeout(timerId);
        timerId = null;
      }

      // We use a setTimeout(0) instead of requestAnimationFrame, due to
      // inconsistencies between the sequencing of rAF in different browsers.
      keyPressTimerId = setTimeout(measureEventEnd, 0);
      // Schedule a timer to report the results.
      timerId = setTimeout(() => {
        const total = log.reduce((a, b) => a + b, 0);
        const reportedText = 'Typing Perf: ' + Math.round(total / log.length * 100) / 100 + 'ms';
        report(reportedText);
        log = [];
      }, 2000);
      // Make the time after we do the previous logic, so we don't measure the overhead
      // for it all.
      start = performance.now();
    };
    const beforeInputHandler = function beforeInputHandler(event) {
      if (!validInputTypes.has(event.inputType) || invalidatingEvent) {
        invalidatingEvent = false;
        return;
      }
      measureEventStart();
    };
    const keyDownHandler = function keyDownHandler(event) {
      const keyCode = event.keyCode;
      if (keyCode === 8 || keyCode === 13) {
        measureEventStart();
      }
    };
    const pasteHandler = function pasteHandler() {
      invalidatingEvent = true;
    };
    const cutHandler = function cutHandler() {
      invalidatingEvent = true;
    };
    window.addEventListener('keydown', keyDownHandler, true);
    window.addEventListener('selectionchange', measureEventEnd, true);
    window.addEventListener('beforeinput', beforeInputHandler, true);
    window.addEventListener('paste', pasteHandler, true);
    window.addEventListener('cut', cutHandler, true);
    return () => {
      window.removeEventListener('keydown', keyDownHandler, true);
      window.removeEventListener('selectionchange', measureEventEnd, true);
      window.removeEventListener('beforeinput', beforeInputHandler, true);
      window.removeEventListener('paste', pasteHandler, true);
      window.removeEventListener('cut', cutHandler, true);
    };
  }, [report]);
  return null;
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const hostName = window.location.hostname;
const isDevPlayground = hostName !== 'playground.lexical.dev' && hostName !== 'lexical-playground.vercel.app';
const DEFAULT_SETTINGS = {
  disableBeforeInput: false,
  emptyEditor: isDevPlayground,
  isAutocomplete: false,
  isCharLimit: false,
  isCharLimitUtf8: false,
  isCollab: false,
  isMaxLength: false,
  isRichText: true,
  measureTypingPerf: false,
  showNestedEditorTreeView: false,
  showTableOfContents: false,
  showTreeView: true
};

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const Context = /*#__PURE__*/React.createContext({
  setOption: (name, value) => {
    return;
  },
  settings: DEFAULT_SETTINGS
});
const useSettings = () => {
  return React.useContext(Context);
};

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
const Direction = {
  east: 1 << 0,
  north: 1 << 3,
  south: 1 << 1,
  west: 1 << 2
};
function ImageResizer({
  onResizeStart,
  onResizeEnd,
  buttonRef,
  imageRef,
  maxWidth,
  editor,
  showCaption,
  setShowCaption,
  captionsEnabled
}) {
  const controlWrapperRef = React.useRef(null);
  const userSelect = React.useRef({
    priority: '',
    value: 'default'
  });
  const positioningRef = React.useRef({
    currentHeight: 0,
    currentWidth: 0,
    direction: 0,
    isResizing: false,
    ratio: 0,
    startHeight: 0,
    startWidth: 0,
    startX: 0,
    startY: 0
  });
  const editorRootElement = editor.getRootElement();
  // Find max width, accounting for editor padding.
  const maxWidthContainer = maxWidth ? maxWidth : editorRootElement !== null ? editorRootElement.getBoundingClientRect().width - 20 : 100;
  const maxHeightContainer = editorRootElement !== null ? editorRootElement.getBoundingClientRect().height - 20 : 100;
  const minWidth = 100;
  const minHeight = 100;
  const setStartCursor = direction => {
    const ew = direction === Direction.east || direction === Direction.west;
    const ns = direction === Direction.north || direction === Direction.south;
    const nwse = direction & Direction.north && direction & Direction.west || direction & Direction.south && direction & Direction.east;
    const cursorDir = ew ? 'ew' : ns ? 'ns' : nwse ? 'nwse' : 'nesw';
    if (editorRootElement !== null) {
      editorRootElement.style.setProperty('cursor', `${cursorDir}-resize`, 'important');
    }
    if (document.body !== null) {
      document.body.style.setProperty('cursor', `${cursorDir}-resize`, 'important');
      userSelect.current.value = document.body.style.getPropertyValue('-webkit-user-select');
      userSelect.current.priority = document.body.style.getPropertyPriority('-webkit-user-select');
      document.body.style.setProperty('-webkit-user-select', `none`, 'important');
    }
  };
  const setEndCursor = () => {
    if (editorRootElement !== null) {
      editorRootElement.style.setProperty('cursor', 'default');
    }
    if (document.body !== null) {
      document.body.style.setProperty('cursor', 'default');
      document.body.style.setProperty('-webkit-user-select', userSelect.current.value, userSelect.current.priority);
    }
  };
  const handlePointerDown = (event, direction) => {
    if (!editor.isEditable()) {
      return;
    }
    const image = imageRef.current;
    const controlWrapper = controlWrapperRef.current;
    if (image !== null && controlWrapper !== null) {
      const {
        width,
        height
      } = image.getBoundingClientRect();
      const positioning = positioningRef.current;
      positioning.startWidth = width;
      positioning.startHeight = height;
      positioning.ratio = width / height;
      positioning.currentWidth = width;
      positioning.currentHeight = height;
      positioning.startX = event.clientX;
      positioning.startY = event.clientY;
      positioning.isResizing = true;
      positioning.direction = direction;
      setStartCursor(direction);
      onResizeStart();
      controlWrapper.classList.add('image-control-wrapper--resizing');
      image.style.height = `${height}px`;
      image.style.width = `${width}px`;
      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
    }
  };
  const handlePointerMove = event => {
    const image = imageRef.current;
    const positioning = positioningRef.current;
    const isHorizontal = positioning.direction & (Direction.east | Direction.west);
    const isVertical = positioning.direction & (Direction.south | Direction.north);
    if (image !== null && positioning.isResizing) {
      // Corner cursor
      if (isHorizontal && isVertical) {
        let diff = Math.floor(positioning.startX - event.clientX);
        diff = positioning.direction & Direction.east ? -diff : diff;
        const width = clamp(positioning.startWidth + diff, minWidth, maxWidthContainer);
        const height = width / positioning.ratio;
        image.style.width = `${width}px`;
        image.style.height = `${height}px`;
        positioning.currentHeight = height;
        positioning.currentWidth = width;
      } else if (isVertical) {
        let diff = Math.floor(positioning.startY - event.clientY);
        diff = positioning.direction & Direction.south ? -diff : diff;
        const height = clamp(positioning.startHeight + diff, minHeight, maxHeightContainer);
        image.style.height = `${height}px`;
        positioning.currentHeight = height;
      } else {
        let diff = Math.floor(positioning.startX - event.clientX);
        diff = positioning.direction & Direction.east ? -diff : diff;
        const width = clamp(positioning.startWidth + diff, minWidth, maxWidthContainer);
        image.style.width = `${width}px`;
        positioning.currentWidth = width;
      }
    }
  };
  const handlePointerUp = () => {
    const image = imageRef.current;
    const positioning = positioningRef.current;
    const controlWrapper = controlWrapperRef.current;
    if (image !== null && controlWrapper !== null && positioning.isResizing) {
      const width = positioning.currentWidth;
      const height = positioning.currentHeight;
      positioning.startWidth = 0;
      positioning.startHeight = 0;
      positioning.ratio = 0;
      positioning.startX = 0;
      positioning.startY = 0;
      positioning.currentWidth = 0;
      positioning.currentHeight = 0;
      positioning.isResizing = false;
      controlWrapper.classList.remove('image-control-wrapper--resizing');
      setEndCursor();
      onResizeEnd(width, height);
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: controlWrapperRef
  }, !showCaption && captionsEnabled && /*#__PURE__*/React.createElement("button", {
    className: "image-caption-button",
    ref: buttonRef,
    onClick: () => {
      setShowCaption(!showCaption);
    }
  }, "Add Caption"), /*#__PURE__*/React.createElement("div", {
    className: "image-resizer image-resizer-n",
    onPointerDown: event => {
      handlePointerDown(event, Direction.north);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "image-resizer image-resizer-ne",
    onPointerDown: event => {
      handlePointerDown(event, Direction.north | Direction.east);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "image-resizer image-resizer-e",
    onPointerDown: event => {
      handlePointerDown(event, Direction.east);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "image-resizer image-resizer-se",
    onPointerDown: event => {
      handlePointerDown(event, Direction.south | Direction.east);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "image-resizer image-resizer-s",
    onPointerDown: event => {
      handlePointerDown(event, Direction.south);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "image-resizer image-resizer-sw",
    onPointerDown: event => {
      handlePointerDown(event, Direction.south | Direction.west);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "image-resizer image-resizer-w",
    onPointerDown: event => {
      handlePointerDown(event, Direction.west);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "image-resizer image-resizer-nw",
    onPointerDown: event => {
      handlePointerDown(event, Direction.north | Direction.west);
    }
  }));
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const imageCache = new Set();
function useSuspenseImage(src) {
  if (!imageCache.has(src)) {
    throw new Promise(resolve => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imageCache.add(src);
        resolve(null);
      };
    });
  }
}
function LazyImage({
  altText,
  className,
  imageRef,
  src,
  width,
  height,
  maxWidth
}) {
  useSuspenseImage(src);
  return /*#__PURE__*/React.createElement("img", {
    className: className || undefined,
    src: src,
    alt: altText,
    ref: imageRef,
    style: {
      height,
      maxWidth,
      width
    },
    draggable: "false"
  });
}
function ImageComponent({
  src,
  altText,
  nodeKey,
  width,
  height,
  maxWidth,
  resizable,
  showCaption,
  caption,
  captionsEnabled
}) {
  const imageRef = React.useRef(null);
  const buttonRef = React.useRef(null);
  const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection.useLexicalNodeSelection(nodeKey);
  const [isResizing, setIsResizing] = React.useState(false);
  const {
    isCollabActive
  } = LexicalCollaborationContext.useCollaborationContext();
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const [selection, setSelection] = React.useState(null);
  const activeEditorRef = React.useRef(null);
  const onDelete = React.useCallback(payload => {
    if (isSelected && lexical.$isNodeSelection(lexical.$getSelection())) {
      const event = payload;
      event.preventDefault();
      const node = lexical.$getNodeByKey(nodeKey);
      if ($isImageNode(node)) {
        node.remove();
      }
      setSelected(false);
    }
    return false;
  }, [isSelected, nodeKey, setSelected]);
  const onEnter = React.useCallback(event => {
    const latestSelection = lexical.$getSelection();
    const buttonElem = buttonRef.current;
    if (isSelected && lexical.$isNodeSelection(latestSelection) && latestSelection.getNodes().length === 1) {
      if (showCaption) {
        // Move focus into nested editor
        lexical.$setSelection(null);
        event.preventDefault();
        caption.focus();
        return true;
      } else if (buttonElem !== null && buttonElem !== document.activeElement) {
        event.preventDefault();
        buttonElem.focus();
        return true;
      }
    }
    return false;
  }, [caption, isSelected, showCaption]);
  const onEscape = React.useCallback(event => {
    if (activeEditorRef.current === caption || buttonRef.current === event.target) {
      lexical.$setSelection(null);
      editor.update(() => {
        setSelected(true);
        const parentRootElement = editor.getRootElement();
        if (parentRootElement !== null) {
          parentRootElement.focus();
        }
      });
      return true;
    }
    return false;
  }, [caption, editor, setSelected]);
  React.useEffect(() => {
    let isMounted = true;
    const unregister = utils.mergeRegister(editor.registerUpdateListener(({
      editorState
    }) => {
      if (isMounted) {
        setSelection(editorState.read(() => lexical.$getSelection()));
      }
    }), editor.registerCommand(lexical.SELECTION_CHANGE_COMMAND, (_, activeEditor) => {
      activeEditorRef.current = activeEditor;
      return false;
    }, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.CLICK_COMMAND, payload => {
      const event = payload;
      if (isResizing) {
        return true;
      }
      if (event.target === imageRef.current) {
        if (event.shiftKey) {
          setSelected(!isSelected);
        } else {
          clearSelection();
          setSelected(true);
        }
        return true;
      }
      return false;
    }, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.DRAGSTART_COMMAND, event => {
      if (event.target === imageRef.current) {
        // TODO This is just a temporary workaround for FF to behave like other browsers.
        // Ideally, this handles drag & drop too (and all browsers).
        event.preventDefault();
        return true;
      }
      return false;
    }, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.KEY_DELETE_COMMAND, onDelete, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.KEY_BACKSPACE_COMMAND, onDelete, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.KEY_ENTER_COMMAND, onEnter, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.KEY_ESCAPE_COMMAND, onEscape, lexical.COMMAND_PRIORITY_LOW));
    return () => {
      isMounted = false;
      unregister();
    };
  }, [clearSelection, editor, isResizing, isSelected, nodeKey, onDelete, onEnter, onEscape, setSelected]);
  const setShowCaption = () => {
    editor.update(() => {
      const node = lexical.$getNodeByKey(nodeKey);
      if ($isImageNode(node)) {
        node.setShowCaption(true);
      }
    });
  };
  const onResizeEnd = (nextWidth, nextHeight) => {
    // Delay hiding the resize bars for click case
    setTimeout(() => {
      setIsResizing(false);
    }, 200);
    editor.update(() => {
      const node = lexical.$getNodeByKey(nodeKey);
      if ($isImageNode(node)) {
        node.setWidthAndHeight(nextWidth, nextHeight);
      }
    });
  };
  const onResizeStart = () => {
    setIsResizing(true);
  };
  const {
    historyState
  } = useSharedHistoryContext();
  const {
    settings: {
      showNestedEditorTreeView
    }
  } = useSettings();
  const draggable = isSelected && lexical.$isNodeSelection(selection) && !isResizing;
  const isFocused = isSelected || isResizing;
  return /*#__PURE__*/React.createElement(React.Suspense, {
    fallback: null
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    draggable: draggable
  }, /*#__PURE__*/React.createElement(LazyImage, {
    className: isFocused ? `focused ${lexical.$isNodeSelection(selection) ? 'draggable' : ''}` : null,
    src: src,
    altText: altText,
    imageRef: imageRef,
    width: width,
    height: height,
    maxWidth: maxWidth
  })), showCaption && /*#__PURE__*/React.createElement("div", {
    className: "image-caption-container"
  }, /*#__PURE__*/React.createElement(LexicalNestedComposer.LexicalNestedComposer, {
    initialEditor: caption
  }, /*#__PURE__*/React.createElement(LexicalAutoFocusPlugin.AutoFocusPlugin, null), /*#__PURE__*/React.createElement(MentionsPlugin, null), /*#__PURE__*/React.createElement(LinkPlugin, null), /*#__PURE__*/React.createElement(EmojisPlugin, null), /*#__PURE__*/React.createElement(LexicalHashtagPlugin.HashtagPlugin, null), /*#__PURE__*/React.createElement(KeywordsPlugin, null), isCollabActive ? /*#__PURE__*/React.createElement(LexicalCollaborationPlugin.CollaborationPlugin, {
    id: caption.getKey(),
    providerFactory: createWebsocketProvider,
    shouldBootstrap: true
  }) : /*#__PURE__*/React.createElement(LexicalHistoryPlugin.HistoryPlugin, {
    externalHistoryState: historyState
  }), /*#__PURE__*/React.createElement(LexicalRichTextPlugin.RichTextPlugin, {
    contentEditable: /*#__PURE__*/React.createElement(LexicalContentEditable, {
      className: "ImageNode__contentEditable"
    }),
    placeholder: /*#__PURE__*/React.createElement(Placeholder, {
      className: "ImageNode__placeholder"
    }, "Enter a caption..."),
    ErrorBoundary: LexicalErrorBoundary
  }), showNestedEditorTreeView === true ? /*#__PURE__*/React.createElement(TreeViewPlugin, null) : null)), resizable && lexical.$isNodeSelection(selection) && isFocused && /*#__PURE__*/React.createElement(ImageResizer, {
    showCaption: showCaption,
    setShowCaption: setShowCaption,
    editor: editor,
    buttonRef: buttonRef,
    imageRef: imageRef,
    maxWidth: maxWidth,
    onResizeStart: onResizeStart,
    onResizeEnd: onResizeEnd,
    captionsEnabled: captionsEnabled
  })));
}

var ImageComponent$1 = {
  __proto__: null,
  'default': ImageComponent
};

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const NO_CELLS = [];
function $createSelectAll() {
  const sel = lexical.$createRangeSelection();
  sel.focus.set('root', lexical.$getRoot().getChildrenSize(), 'element');
  return sel;
}
function createEmptyParagraphHTML(theme) {
  return `<p class="${theme.paragraph}"><br></p>`;
}
function focusCell(tableElem, id) {
  const cellElem = tableElem.querySelector(`[data-id=${id}]`);
  if (cellElem == null) {
    return;
  }
  cellElem.focus();
}
function isStartingResize(target) {
  return target.nodeType === 1 && target.hasAttribute('data-table-resize');
}
function generateHTMLFromJSON(editorStateJSON, cellEditor) {
  const editorState = cellEditor.parseEditorState(editorStateJSON);
  let html$1 = cellHTMLCache.get(editorStateJSON);
  if (html$1 === undefined) {
    html$1 = editorState.read(() => html.$generateHtmlFromNodes(cellEditor, null));
    const textContent = editorState.read(() => lexical.$getRoot().getTextContent());
    cellHTMLCache.set(editorStateJSON, html$1);
    cellTextContentCache.set(editorStateJSON, textContent);
  }
  return html$1;
}
function getCurrentDocument(editor) {
  const rootElement = editor.getRootElement();
  return rootElement !== null ? rootElement.ownerDocument : document;
}
function isCopy(keyCode, shiftKey, metaKey, ctrlKey) {
  if (shiftKey) {
    return false;
  }
  if (keyCode === 67) {
    return IS_APPLE ? metaKey : ctrlKey;
  }
  return false;
}
function isCut(keyCode, shiftKey, metaKey, ctrlKey) {
  if (shiftKey) {
    return false;
  }
  if (keyCode === 88) {
    return IS_APPLE ? metaKey : ctrlKey;
  }
  return false;
}
function isPaste(keyCode, shiftKey, metaKey, ctrlKey) {
  if (shiftKey) {
    return false;
  }
  if (keyCode === 86) {
    return IS_APPLE ? metaKey : ctrlKey;
  }
  return false;
}
function getCellID(domElement) {
  let node = domElement;
  while (node !== null) {
    const possibleID = node.getAttribute('data-id');
    if (possibleID != null) {
      return possibleID;
    }
    node = node.parentElement;
  }
  return null;
}
function getTableCellWidth(domElement) {
  let node = domElement;
  while (node !== null) {
    if (node.nodeName === 'TH' || node.nodeName === 'TD') {
      return node.getBoundingClientRect().width;
    }
    node = node.parentElement;
  }
  return 0;
}
function $updateCells(rows, ids, cellCoordMap, cellEditor, updateTableNode, fn) {
  for (const id of ids) {
    const cell = getCell(rows, id, cellCoordMap);
    if (cell !== null && cellEditor !== null) {
      const editorState = cellEditor.parseEditorState(cell.json);
      cellEditor._headless = true;
      cellEditor.setEditorState(editorState);
      cellEditor.update(fn, {
        discrete: true
      });
      cellEditor._headless = false;
      const newJSON = JSON.stringify(cellEditor.getEditorState());
      updateTableNode(tableNode => {
        const [x, y] = cellCoordMap.get(id);
        lexical.$addUpdateTag('history-push');
        tableNode.updateCellJSON(x, y, newJSON);
      });
    }
  }
}
function isTargetOnPossibleUIControl(target) {
  let node = target;
  while (node !== null) {
    const nodeName = node.nodeName;
    if (nodeName === 'BUTTON' || nodeName === 'INPUT' || nodeName === 'TEXTAREA') {
      return true;
    }
    node = node.parentElement;
  }
  return false;
}
function getSelectedRect(startID, endID, cellCoordMap) {
  const startCoords = cellCoordMap.get(startID);
  const endCoords = cellCoordMap.get(endID);
  if (startCoords === undefined || endCoords === undefined) {
    return null;
  }
  const startX = Math.min(startCoords[0], endCoords[0]);
  const endX = Math.max(startCoords[0], endCoords[0]);
  const startY = Math.min(startCoords[1], endCoords[1]);
  const endY = Math.max(startCoords[1], endCoords[1]);
  return {
    endX,
    endY,
    startX,
    startY
  };
}
function getSelectedIDs(rows, startID, endID, cellCoordMap) {
  const rect = getSelectedRect(startID, endID, cellCoordMap);
  if (rect === null) {
    return [];
  }
  const {
    startX,
    endY,
    endX,
    startY
  } = rect;
  const ids = [];
  for (let x = startX; x <= endX; x++) {
    for (let y = startY; y <= endY; y++) {
      ids.push(rows[y].cells[x].id);
    }
  }
  return ids;
}
function extractCellsFromRows(rows, rect) {
  const {
    startX,
    endY,
    endX,
    startY
  } = rect;
  const newRows = [];
  for (let y = startY; y <= endY; y++) {
    const row = rows[y];
    const newRow = createRow();
    for (let x = startX; x <= endX; x++) {
      const cellClone = {
        ...row.cells[x]
      };
      cellClone.id = createUID$1();
      newRow.cells.push(cellClone);
    }
    newRows.push(newRow);
  }
  return newRows;
}
function TableCellEditor({
  cellEditor
}) {
  const {
    cellEditorConfig,
    cellEditorPlugins
  } = React.useContext(CellContext);
  if (cellEditorPlugins === null || cellEditorConfig === null) {
    return null;
  }
  return /*#__PURE__*/React.createElement(LexicalNestedComposer.LexicalNestedComposer, {
    initialEditor: cellEditor,
    initialTheme: cellEditorConfig.theme,
    initialNodes: cellEditorConfig.nodes,
    skipCollabChecks: true
  }, cellEditorPlugins);
}
function getCell(rows, cellID, cellCoordMap) {
  const coords = cellCoordMap.get(cellID);
  if (coords === undefined) {
    return null;
  }
  const [x, y] = coords;
  const row = rows[y];
  return row.cells[x];
}
function TableActionMenu({
  cell,
  rows,
  cellCoordMap,
  menuElem,
  updateCellsByID,
  onClose,
  updateTableNode,
  setSortingOptions,
  sortingOptions
}) {
  const dropDownRef = React.useRef(null);
  React.useEffect(() => {
    const dropdownElem = dropDownRef.current;
    if (dropdownElem !== null) {
      const rect = menuElem.getBoundingClientRect();
      dropdownElem.style.top = `${rect.y}px`;
      dropdownElem.style.left = `${rect.x}px`;
    }
  }, [menuElem]);
  React.useEffect(() => {
    const handleClickOutside = event => {
      const dropdownElem = dropDownRef.current;
      if (dropdownElem !== null && !dropdownElem.contains(event.target)) {
        event.stopPropagation();
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [onClose]);
  const coords = cellCoordMap.get(cell.id);
  if (coords === undefined) {
    return null;
  }
  const [x, y] = coords;
  return (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    React.createElement("div", {
      className: "dropdowns Tabledropdown",
      ref: dropDownRef,
      onPointerMove: e => {
        e.stopPropagation();
      },
      onPointerDown: e => {
        e.stopPropagation();
      },
      onPointerUp: e => {
        e.stopPropagation();
      },
      onClick: e => {
        e.stopPropagation();
      }
    }, /*#__PURE__*/React.createElement("button", {
      className: "item",
      onClick: () => {
        updateTableNode(tableNode => {
          lexical.$addUpdateTag('history-push');
          tableNode.updateCellType(x, y, cell.type === 'normal' ? 'header' : 'normal');
        });
        onClose();
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "text"
    }, cell.type === 'normal' ? 'Make header' : 'Remove header')), /*#__PURE__*/React.createElement("button", {
      className: "item",
      onClick: () => {
        updateCellsByID([cell.id], () => {
          const root = lexical.$getRoot();
          root.clear();
          root.append(lexical.$createParagraphNode());
        });
        onClose();
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "text"
    }, "Clear cell")), /*#__PURE__*/React.createElement("hr", null), cell.type === 'header' && y === 0 && /*#__PURE__*/React.createElement(React.Fragment, null, sortingOptions !== null && sortingOptions.x === x && /*#__PURE__*/React.createElement("button", {
      className: "item",
      onClick: () => {
        setSortingOptions(null);
        onClose();
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "text"
    }, "Remove sorting")), (sortingOptions === null || sortingOptions.x !== x || sortingOptions.type === 'descending') && /*#__PURE__*/React.createElement("button", {
      className: "item",
      onClick: () => {
        setSortingOptions({
          type: 'ascending',
          x
        });
        onClose();
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "text"
    }, "Sort ascending")), (sortingOptions === null || sortingOptions.x !== x || sortingOptions.type === 'ascending') && /*#__PURE__*/React.createElement("button", {
      className: "item",
      onClick: () => {
        setSortingOptions({
          type: 'descending',
          x
        });
        onClose();
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "text"
    }, "Sort descending")), /*#__PURE__*/React.createElement("hr", null)), /*#__PURE__*/React.createElement("button", {
      className: "item",
      onClick: () => {
        updateTableNode(tableNode => {
          lexical.$addUpdateTag('history-push');
          tableNode.insertRowAt(y);
        });
        onClose();
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "text"
    }, "Insert row above")), /*#__PURE__*/React.createElement("button", {
      className: "item",
      onClick: () => {
        updateTableNode(tableNode => {
          lexical.$addUpdateTag('history-push');
          tableNode.insertRowAt(y + 1);
        });
        onClose();
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "text"
    }, "Insert row below")), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("button", {
      className: "item",
      onClick: () => {
        updateTableNode(tableNode => {
          lexical.$addUpdateTag('history-push');
          tableNode.insertColumnAt(x);
        });
        onClose();
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "text"
    }, "Insert column left")), /*#__PURE__*/React.createElement("button", {
      className: "item",
      onClick: () => {
        updateTableNode(tableNode => {
          lexical.$addUpdateTag('history-push');
          tableNode.insertColumnAt(x + 1);
        });
        onClose();
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "text"
    }, "Insert column right")), /*#__PURE__*/React.createElement("hr", null), rows[0].cells.length !== 1 && /*#__PURE__*/React.createElement("button", {
      className: "item",
      onClick: () => {
        updateTableNode(tableNode => {
          lexical.$addUpdateTag('history-push');
          tableNode.deleteColumnAt(x);
        });
        onClose();
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "text"
    }, "Delete column")), rows.length !== 1 && /*#__PURE__*/React.createElement("button", {
      className: "item",
      onClick: () => {
        updateTableNode(tableNode => {
          lexical.$addUpdateTag('history-push');
          tableNode.deleteRowAt(y);
        });
        onClose();
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "text"
    }, "Delete row")), /*#__PURE__*/React.createElement("button", {
      className: "item",
      onClick: () => {
        updateTableNode(tableNode => {
          lexical.$addUpdateTag('history-push');
          tableNode.selectNext();
          tableNode.remove();
        });
        onClose();
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "text"
    }, "Delete table")))
  );
}
function TableCell({
  cell,
  cellCoordMap,
  cellEditor,
  isEditing,
  isSelected,
  isPrimarySelected,
  theme,
  updateCellsByID,
  updateTableNode,
  rows,
  setSortingOptions,
  sortingOptions
}) {
  const [showMenu, setShowMenu] = React.useState(false);
  const menuRootRef = React.useRef(null);
  const isHeader = cell.type !== 'normal';
  const editorStateJSON = cell.json;
  const CellComponent = isHeader ? 'th' : 'td';
  const cellWidth = cell.width;
  const menuElem = menuRootRef.current;
  const coords = cellCoordMap.get(cell.id);
  const isSorted = sortingOptions !== null && coords !== undefined && coords[0] === sortingOptions.x && coords[1] === 0;
  React.useEffect(() => {
    if (isEditing || !isPrimarySelected) {
      setShowMenu(false);
    }
  }, [isEditing, isPrimarySelected]);
  return /*#__PURE__*/React.createElement(CellComponent, {
    className: `${theme.tableCell} ${isHeader ? theme.tableCellHeader : ''} ${isSelected ? theme.tableCellSelected : ''}`,
    "data-id": cell.id,
    tabIndex: -1,
    style: {
      width: cellWidth !== null ? cellWidth : undefined
    }
  }, isPrimarySelected && /*#__PURE__*/React.createElement("div", {
    className: `${theme.tableCellPrimarySelected} ${isEditing ? theme.tableCellEditing : ''}`
  }), isPrimarySelected && isEditing ? /*#__PURE__*/React.createElement(TableCellEditor, {
    cellEditor: cellEditor
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: editorStateJSON === '' ? createEmptyParagraphHTML(theme) : generateHTMLFromJSON(editorStateJSON, cellEditor)
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: theme.tableCellResizer,
    "data-table-resize": "true"
  })), isPrimarySelected && !isEditing && /*#__PURE__*/React.createElement("div", {
    className: theme.tableCellActionButtonContainer,
    ref: menuRootRef
  }, /*#__PURE__*/React.createElement("button", {
    className: theme.tableCellActionButton,
    onClick: e => {
      setShowMenu(!showMenu);
      e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "chevron-down"
  }))), showMenu && menuElem !== null && /*#__PURE__*/ReactDOM.createPortal(/*#__PURE__*/React.createElement(TableActionMenu, {
    cell: cell,
    menuElem: menuElem,
    updateCellsByID: updateCellsByID,
    onClose: () => setShowMenu(false),
    updateTableNode: updateTableNode,
    cellCoordMap: cellCoordMap,
    rows: rows,
    setSortingOptions: setSortingOptions,
    sortingOptions: sortingOptions
  }), document.body), isSorted && /*#__PURE__*/React.createElement("div", {
    className: theme.tableCellSortedIndicator
  }));
}
function TableComponent({
  nodeKey,
  rows: rawRows,
  theme
}) {
  const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection.useLexicalNodeSelection(nodeKey);
  const resizeMeasureRef = React.useRef({
    point: 0,
    size: 0
  });
  const [sortingOptions, setSortingOptions] = React.useState(null);
  const addRowsRef = React.useRef(null);
  const lastCellIDRef = React.useRef(null);
  const tableResizerRulerRef = React.useRef(null);
  const {
    cellEditorConfig
  } = React.useContext(CellContext);
  const [isEditing, setIsEditing] = React.useState(false);
  const [showAddColumns, setShowAddColumns] = React.useState(false);
  const [showAddRows, setShowAddRows] = React.useState(false);
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const mouseDownRef = React.useRef(false);
  const [resizingID, setResizingID] = React.useState(null);
  const tableRef = React.useRef(null);
  const cellCoordMap = React.useMemo(() => {
    const map = new Map();
    for (let y = 0; y < rawRows.length; y++) {
      const row = rawRows[y];
      const cells = row.cells;
      for (let x = 0; x < cells.length; x++) {
        const cell = cells[x];
        map.set(cell.id, [x, y]);
      }
    }
    return map;
  }, [rawRows]);
  const rows = React.useMemo(() => {
    if (sortingOptions === null) {
      return rawRows;
    }
    const _rows = rawRows.slice(1);
    _rows.sort((a, b) => {
      const aCells = a.cells;
      const bCells = b.cells;
      const x = sortingOptions.x;
      const aContent = cellTextContentCache.get(aCells[x].json) || '';
      const bContent = cellTextContentCache.get(bCells[x].json) || '';
      if (aContent === '' || bContent === '') {
        return 1;
      }
      if (sortingOptions.type === 'ascending') {
        return aContent.localeCompare(bContent);
      }
      return bContent.localeCompare(aContent);
    });
    _rows.unshift(rawRows[0]);
    return _rows;
  }, [rawRows, sortingOptions]);
  const [primarySelectedCellID, setPrimarySelectedCellID] = React.useState(null);
  const cellEditor = React.useMemo(() => {
    if (cellEditorConfig === null) {
      return null;
    }
    const _cellEditor = lexical.createEditor({
      namespace: cellEditorConfig.namespace,
      nodes: cellEditorConfig.nodes,
      onError: error => cellEditorConfig.onError(error, _cellEditor),
      theme: cellEditorConfig.theme
    });
    return _cellEditor;
  }, [cellEditorConfig]);
  const [selectedCellIDs, setSelectedCellIDs] = React.useState([]);
  const selectedCellSet = React.useMemo(() => new Set(selectedCellIDs), [selectedCellIDs]);
  React.useEffect(() => {
    const tableElem = tableRef.current;
    if (isSelected && document.activeElement === document.body && tableElem !== null) {
      tableElem.focus();
    }
  }, [isSelected]);
  const updateTableNode = React.useCallback(fn => {
    editor.update(() => {
      const tableNode = lexical.$getNodeByKey(nodeKey);
      if ($isTableNode(tableNode)) {
        fn(tableNode);
      }
    });
  }, [editor, nodeKey]);
  const addColumns = () => {
    updateTableNode(tableNode => {
      lexical.$addUpdateTag('history-push');
      tableNode.addColumns(1);
    });
  };
  const addRows = () => {
    updateTableNode(tableNode => {
      lexical.$addUpdateTag('history-push');
      tableNode.addRows(1);
    });
  };
  const modifySelectedCells = React.useCallback((x, y, extend) => {
    const id = rows[y].cells[x].id;
    lastCellIDRef.current = id;
    if (extend) {
      const selectedIDs = getSelectedIDs(rows, primarySelectedCellID, id, cellCoordMap);
      setSelectedCellIDs(selectedIDs);
    } else {
      setPrimarySelectedCellID(id);
      setSelectedCellIDs(NO_CELLS);
      focusCell(tableRef.current, id);
    }
  }, [cellCoordMap, primarySelectedCellID, rows]);
  const saveEditorToJSON = React.useCallback(() => {
    if (cellEditor !== null && primarySelectedCellID !== null) {
      const json = JSON.stringify(cellEditor.getEditorState());
      updateTableNode(tableNode => {
        const coords = cellCoordMap.get(primarySelectedCellID);
        if (coords === undefined) {
          return;
        }
        lexical.$addUpdateTag('history-push');
        const [x, y] = coords;
        tableNode.updateCellJSON(x, y, json);
      });
    }
  }, [cellCoordMap, cellEditor, primarySelectedCellID, updateTableNode]);
  const selectTable = React.useCallback(() => {
    setTimeout(() => {
      const parentRootElement = editor.getRootElement();
      if (parentRootElement !== null) {
        parentRootElement.focus({
          preventScroll: true
        });
        window.getSelection()?.removeAllRanges();
      }
    }, 20);
  }, [editor]);
  React.useEffect(() => {
    const tableElem = tableRef.current;
    if (tableElem === null) {
      return;
    }
    const doc = getCurrentDocument(editor);
    const isAtEdgeOfTable = event => {
      const x = event.clientX - tableRect.x;
      const y = event.clientY - tableRect.y;
      return x < 5 || y < 5;
    };
    const handlePointerDown = event => {
      const possibleID = getCellID(event.target);
      if (possibleID !== null && editor.isEditable() && tableElem.contains(event.target)) {
        if (isAtEdgeOfTable(event)) {
          setSelected(true);
          setPrimarySelectedCellID(null);
          selectTable();
          return;
        }
        setSelected(false);
        if (isStartingResize(event.target)) {
          setResizingID(possibleID);
          tableElem.style.userSelect = 'none';
          resizeMeasureRef.current = {
            point: event.clientX,
            size: getTableCellWidth(event.target)
          };
          return;
        }
        mouseDownRef.current = true;
        if (primarySelectedCellID !== possibleID) {
          if (isEditing) {
            saveEditorToJSON();
          }
          setPrimarySelectedCellID(possibleID);
          setIsEditing(false);
          lastCellIDRef.current = possibleID;
        } else {
          lastCellIDRef.current = null;
        }
        setSelectedCellIDs(NO_CELLS);
      } else if (primarySelectedCellID !== null && !isTargetOnPossibleUIControl(event.target)) {
        setSelected(false);
        mouseDownRef.current = false;
        if (isEditing) {
          saveEditorToJSON();
        }
        setPrimarySelectedCellID(null);
        setSelectedCellIDs(NO_CELLS);
        setIsEditing(false);
        lastCellIDRef.current = null;
      }
    };
    const tableRect = tableElem.getBoundingClientRect();
    const handlePointerMove = event => {
      if (resizingID !== null) {
        const tableResizerRulerElem = tableResizerRulerRef.current;
        if (tableResizerRulerElem !== null) {
          const {
            size,
            point
          } = resizeMeasureRef.current;
          const diff = event.clientX - point;
          const newWidth = size + diff;
          let x = event.clientX - tableRect.x;
          if (x < 10) {
            x = 10;
          } else if (x > tableRect.width - 10) {
            x = tableRect.width - 10;
          } else if (newWidth < 20) {
            x = point - size + 20 - tableRect.x;
          }
          tableResizerRulerElem.style.left = `${x}px`;
        }
        return;
      }
      if (!isEditing) {
        const {
          clientX,
          clientY
        } = event;
        const {
          width,
          x,
          y,
          height
        } = tableRect;
        const isOnRightEdge = clientX > x + width * 0.9 && clientX < x + width + 40 && !mouseDownRef.current;
        setShowAddColumns(isOnRightEdge);
        const isOnBottomEdge = event.target === addRowsRef.current || clientY > y + height * 0.85 && clientY < y + height + 5 && !mouseDownRef.current;
        setShowAddRows(isOnBottomEdge);
      }
      if (isEditing || !mouseDownRef.current || primarySelectedCellID === null) {
        return;
      }
      const possibleID = getCellID(event.target);
      if (possibleID !== null && possibleID !== lastCellIDRef.current) {
        if (selectedCellIDs.length === 0) {
          tableElem.style.userSelect = 'none';
        }
        const selectedIDs = getSelectedIDs(rows, primarySelectedCellID, possibleID, cellCoordMap);
        if (selectedIDs.length === 1) {
          setSelectedCellIDs(NO_CELLS);
        } else {
          setSelectedCellIDs(selectedIDs);
        }
        lastCellIDRef.current = possibleID;
      }
    };
    const handlePointerUp = event => {
      if (resizingID !== null) {
        const {
          size,
          point
        } = resizeMeasureRef.current;
        const diff = event.clientX - point;
        let newWidth = size + diff;
        if (newWidth < 10) {
          newWidth = 10;
        }
        updateTableNode(tableNode => {
          const [x] = cellCoordMap.get(resizingID);
          lexical.$addUpdateTag('history-push');
          tableNode.updateColumnWidth(x, newWidth);
        });
        setResizingID(null);
      }
      if (tableElem !== null && selectedCellIDs.length > 1 && mouseDownRef.current) {
        tableElem.style.userSelect = 'text';
        window.getSelection()?.removeAllRanges();
      }
      mouseDownRef.current = false;
    };
    doc.addEventListener('pointerdown', handlePointerDown);
    doc.addEventListener('pointermove', handlePointerMove);
    doc.addEventListener('pointerup', handlePointerUp);
    return () => {
      doc.removeEventListener('pointerdown', handlePointerDown);
      doc.removeEventListener('pointermove', handlePointerMove);
      doc.removeEventListener('pointerup', handlePointerUp);
    };
  }, [cellEditor, editor, isEditing, rows, saveEditorToJSON, primarySelectedCellID, selectedCellSet, selectedCellIDs, cellCoordMap, resizingID, updateTableNode, setSelected, selectTable]);
  React.useEffect(() => {
    if (!isEditing && primarySelectedCellID !== null) {
      const doc = getCurrentDocument(editor);
      const loadContentIntoCell = cell => {
        if (cell !== null && cellEditor !== null) {
          const editorStateJSON = cell.json;
          const editorState = cellEditor.parseEditorState(editorStateJSON);
          cellEditor.setEditorState(editorState);
        }
      };
      const handleDblClick = event => {
        const possibleID = getCellID(event.target);
        if (possibleID === primarySelectedCellID && editor.isEditable()) {
          const cell = getCell(rows, possibleID, cellCoordMap);
          loadContentIntoCell(cell);
          setIsEditing(true);
          setSelectedCellIDs(NO_CELLS);
        }
      };
      const handleKeyDown = event => {
        // Ignore arrow keys, escape or tab
        const keyCode = event.keyCode;
        if (keyCode === 16 || keyCode === 27 || keyCode === 9 || keyCode === 37 || keyCode === 38 || keyCode === 39 || keyCode === 40 || keyCode === 8 || keyCode === 46 || !editor.isEditable()) {
          return;
        }
        if (keyCode === 13) {
          event.preventDefault();
        }
        if (!isEditing && primarySelectedCellID !== null && editor.getEditorState().read(() => lexical.$getSelection() === null) && event.target.contentEditable !== 'true') {
          if (isCopy(keyCode, event.shiftKey, event.metaKey, event.ctrlKey)) {
            editor.dispatchCommand(lexical.COPY_COMMAND, event);
            return;
          }
          if (isCut(keyCode, event.shiftKey, event.metaKey, event.ctrlKey)) {
            editor.dispatchCommand(lexical.CUT_COMMAND, event);
            return;
          }
          if (isPaste(keyCode, event.shiftKey, event.metaKey, event.ctrlKey)) {
            editor.dispatchCommand(lexical.PASTE_COMMAND, event);
            return;
          }
        }
        if (event.metaKey || event.ctrlKey || event.altKey) {
          return;
        }
        const cell = getCell(rows, primarySelectedCellID, cellCoordMap);
        loadContentIntoCell(cell);
        setIsEditing(true);
        setSelectedCellIDs(NO_CELLS);
      };
      doc.addEventListener('dblclick', handleDblClick);
      doc.addEventListener('keydown', handleKeyDown);
      return () => {
        doc.removeEventListener('dblclick', handleDblClick);
        doc.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [cellEditor, editor, isEditing, rows, primarySelectedCellID, cellCoordMap]);
  const updateCellsByID = React.useCallback((ids, fn) => {
    $updateCells(rows, ids, cellCoordMap, cellEditor, updateTableNode, fn);
  }, [cellCoordMap, cellEditor, rows, updateTableNode]);
  const clearCellsCommand = React.useCallback(() => {
    if (primarySelectedCellID !== null && !isEditing) {
      updateCellsByID([primarySelectedCellID, ...selectedCellIDs], () => {
        const root = lexical.$getRoot();
        root.clear();
        root.append(lexical.$createParagraphNode());
      });
      return true;
    } else if (isSelected) {
      updateTableNode(tableNode => {
        lexical.$addUpdateTag('history-push');
        tableNode.selectNext();
        tableNode.remove();
      });
    }
    return false;
  }, [isEditing, isSelected, primarySelectedCellID, selectedCellIDs, updateCellsByID, updateTableNode]);
  React.useEffect(() => {
    const tableElem = tableRef.current;
    if (tableElem === null) {
      return;
    }
    const copyDataToClipboard = (event, htmlString, lexicalString, plainTextString) => {
      const clipboardData = event instanceof KeyboardEvent ? null : event.clipboardData;
      event.preventDefault();
      if (clipboardData != null) {
        clipboardData.setData('text/html', htmlString);
        clipboardData.setData('text/plain', plainTextString);
        clipboardData.setData('application/x-lexical-editor', lexicalString);
      } else {
        const clipboard = navigator.clipboard;
        if (clipboard != null) {
          // Most browsers only support a single item in the clipboard at one time.
          // So we optimize by only putting in HTML.
          const data = [new ClipboardItem({
            'text/html': new Blob([htmlString], {
              type: 'text/html'
            })
          })];
          clipboard.write(data);
        }
      }
    };
    const getTypeFromObject = async (clipboardData, type) => {
      try {
        return clipboardData instanceof DataTransfer ? clipboardData.getData(type) : clipboardData instanceof ClipboardItem ? await (await clipboardData.getType(type)).text() : '';
      } catch {
        return '';
      }
    };
    const pasteContent = async event => {
      let clipboardData = (event instanceof InputEvent ? null : event.clipboardData) || null;
      if (primarySelectedCellID !== null && cellEditor !== null) {
        event.preventDefault();
        if (clipboardData === null) {
          try {
            const items = await navigator.clipboard.read();
            clipboardData = items[0];
          } catch {
            // NO-OP
          }
        }
        const lexicalString = clipboardData !== null ? await getTypeFromObject(clipboardData, 'application/x-lexical-editor') : '';
        if (lexicalString) {
          try {
            const payload = JSON.parse(lexicalString);
            if (payload.namespace === editor._config.namespace && Array.isArray(payload.nodes)) {
              $updateCells(rows, [primarySelectedCellID], cellCoordMap, cellEditor, updateTableNode, () => {
                const root = lexical.$getRoot();
                root.clear();
                root.append(lexical.$createParagraphNode());
                root.selectEnd();
                const nodes = clipboard.$generateNodesFromSerializedNodes(payload.nodes);
                const sel = lexical.$getSelection();
                if (lexical.$isRangeSelection(sel)) {
                  clipboard.$insertGeneratedNodes(cellEditor, nodes, sel);
                }
              });
              return;
            }
            // eslint-disable-next-line no-empty
          } catch {}
        }
        const htmlString = clipboardData !== null ? await getTypeFromObject(clipboardData, 'text/html') : '';
        if (htmlString) {
          try {
            const parser = new DOMParser();
            const dom = parser.parseFromString(htmlString, 'text/html');
            const possibleTableElement = dom.querySelector('table');
            if (possibleTableElement != null) {
              const pasteRows = extractRowsFromHTML(possibleTableElement);
              updateTableNode(tableNode => {
                const [x, y] = cellCoordMap.get(primarySelectedCellID);
                lexical.$addUpdateTag('history-push');
                tableNode.mergeRows(x, y, pasteRows);
              });
              return;
            }
            $updateCells(rows, [primarySelectedCellID], cellCoordMap, cellEditor, updateTableNode, () => {
              const root = lexical.$getRoot();
              root.clear();
              root.append(lexical.$createParagraphNode());
              root.selectEnd();
              const nodes = html.$generateNodesFromDOM(editor, dom);
              const sel = lexical.$getSelection();
              if (lexical.$isRangeSelection(sel)) {
                clipboard.$insertGeneratedNodes(cellEditor, nodes, sel);
              }
            });
            return;
            // eslint-disable-next-line no-empty
          } catch {}
        }

        // Multi-line plain text in rich text mode pasted as separate paragraphs
        // instead of single paragraph with linebreaks.
        const text = clipboardData !== null ? await getTypeFromObject(clipboardData, 'text/plain') : '';
        if (text != null) {
          $updateCells(rows, [primarySelectedCellID], cellCoordMap, cellEditor, updateTableNode, () => {
            const root = lexical.$getRoot();
            root.clear();
            root.selectEnd();
            const sel = lexical.$getSelection();
            if (sel !== null) {
              sel.insertRawText(text);
            }
          });
        }
      }
    };
    const copyPrimaryCell = event => {
      if (primarySelectedCellID !== null && cellEditor !== null) {
        const cell = getCell(rows, primarySelectedCellID, cellCoordMap);
        const json = cell.json;
        const htmlString = cellHTMLCache.get(json) || null;
        if (htmlString === null) {
          return;
        }
        const editorState = cellEditor.parseEditorState(json);
        const plainTextString = editorState.read(() => lexical.$getRoot().getTextContent());
        const lexicalString = editorState.read(() => {
          return JSON.stringify(clipboard.$generateJSONFromSelectedNodes(cellEditor, null));
        });
        copyDataToClipboard(event, htmlString, lexicalString, plainTextString);
      }
    };
    const copyCellRange = event => {
      const lastCellID = lastCellIDRef.current;
      if (primarySelectedCellID !== null && cellEditor !== null && lastCellID !== null) {
        const rect = getSelectedRect(primarySelectedCellID, lastCellID, cellCoordMap);
        if (rect === null) {
          return;
        }
        const dom = exportTableCellsToHTML(rows, rect);
        const htmlString = dom.outerHTML;
        const plainTextString = dom.outerText;
        const tableNodeJSON = editor.getEditorState().read(() => {
          const tableNode = lexical.$getNodeByKey(nodeKey);
          return tableNode.exportJSON();
        });
        tableNodeJSON.rows = extractCellsFromRows(rows, rect);
        const lexicalJSON = {
          namespace: cellEditor._config.namespace,
          nodes: [tableNodeJSON]
        };
        const lexicalString = JSON.stringify(lexicalJSON);
        copyDataToClipboard(event, htmlString, lexicalString, plainTextString);
      }
    };
    const handlePaste = (event, activeEditor) => {
      const selection = lexical.$getSelection();
      if (primarySelectedCellID !== null && !isEditing && selection === null && activeEditor === editor) {
        pasteContent(event);
        mouseDownRef.current = false;
        setSelectedCellIDs(NO_CELLS);
        return true;
      }
      return false;
    };
    const handleCopy = (event, activeEditor) => {
      const selection = lexical.$getSelection();
      if (primarySelectedCellID !== null && !isEditing && selection === null && activeEditor === editor) {
        if (selectedCellIDs.length === 0) {
          copyPrimaryCell(event);
        } else {
          copyCellRange(event);
        }
        return true;
      }
      return false;
    };
    return utils.mergeRegister(editor.registerCommand(lexical.CLICK_COMMAND, payload => {
      const selection = lexical.$getSelection();
      if (lexical.$isNodeSelection(selection)) {
        return true;
      }
      return false;
    }, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.PASTE_COMMAND, handlePaste, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.COPY_COMMAND, handleCopy, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.CUT_COMMAND, (event, activeEditor) => {
      if (handleCopy(event, activeEditor)) {
        clearCellsCommand();
        return true;
      }
      return false;
    }, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.KEY_BACKSPACE_COMMAND, clearCellsCommand, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.KEY_DELETE_COMMAND, clearCellsCommand, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.FORMAT_TEXT_COMMAND, payload => {
      if (primarySelectedCellID !== null && !isEditing) {
        $updateCells(rows, [primarySelectedCellID, ...selectedCellIDs], cellCoordMap, cellEditor, updateTableNode, () => {
          const sel = $createSelectAll();
          sel.formatText(payload);
        });
        return true;
      }
      return false;
    }, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.KEY_ENTER_COMMAND, (event, targetEditor) => {
      const selection = lexical.$getSelection();
      if (primarySelectedCellID === null && !isEditing && lexical.$isNodeSelection(selection) && selection.has(nodeKey) && selection.getNodes().length === 1 && targetEditor === editor) {
        const firstCellID = rows[0].cells[0].id;
        setPrimarySelectedCellID(firstCellID);
        focusCell(tableElem, firstCellID);
        event.preventDefault();
        event.stopPropagation();
        clearSelection();
        return true;
      }
      return false;
    }, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.KEY_TAB_COMMAND, event => {
      const selection = lexical.$getSelection();
      if (!isEditing && selection === null && primarySelectedCellID !== null) {
        const isBackward = event.shiftKey;
        const [x, y] = cellCoordMap.get(primarySelectedCellID);
        event.preventDefault();
        let nextX = null;
        let nextY = null;
        if (x === 0 && isBackward) {
          if (y !== 0) {
            nextY = y - 1;
            nextX = rows[nextY].cells.length - 1;
          }
        } else if (x === rows[y].cells.length - 1 && !isBackward) {
          if (y !== rows.length - 1) {
            nextY = y + 1;
            nextX = 0;
          }
        } else if (!isBackward) {
          nextX = x + 1;
          nextY = y;
        } else {
          nextX = x - 1;
          nextY = y;
        }
        if (nextX !== null && nextY !== null) {
          modifySelectedCells(nextX, nextY, false);
          return true;
        }
      }
      return false;
    }, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.KEY_ARROW_UP_COMMAND, (event, targetEditor) => {
      const selection = lexical.$getSelection();
      if (!isEditing && selection === null) {
        const extend = event.shiftKey;
        const cellID = extend ? lastCellIDRef.current || primarySelectedCellID : primarySelectedCellID;
        if (cellID !== null) {
          const [x, y] = cellCoordMap.get(cellID);
          if (y !== 0) {
            modifySelectedCells(x, y - 1, extend);
            return true;
          }
        }
      }
      if (!lexical.$isRangeSelection(selection) || targetEditor !== cellEditor) {
        return false;
      }
      if (selection.isCollapsed() && selection.anchor.getNode().getTopLevelElementOrThrow().getPreviousSibling() === null) {
        event.preventDefault();
        return true;
      }
      return false;
    }, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.KEY_ARROW_DOWN_COMMAND, (event, targetEditor) => {
      const selection = lexical.$getSelection();
      if (!isEditing && selection === null) {
        const extend = event.shiftKey;
        const cellID = extend ? lastCellIDRef.current || primarySelectedCellID : primarySelectedCellID;
        if (cellID !== null) {
          const [x, y] = cellCoordMap.get(cellID);
          if (y !== rows.length - 1) {
            modifySelectedCells(x, y + 1, extend);
            return true;
          }
        }
      }
      if (!lexical.$isRangeSelection(selection) || targetEditor !== cellEditor) {
        return false;
      }
      if (selection.isCollapsed() && selection.anchor.getNode().getTopLevelElementOrThrow().getNextSibling() === null) {
        event.preventDefault();
        return true;
      }
      return false;
    }, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.KEY_ARROW_LEFT_COMMAND, (event, targetEditor) => {
      const selection = lexical.$getSelection();
      if (!isEditing && selection === null) {
        const extend = event.shiftKey;
        const cellID = extend ? lastCellIDRef.current || primarySelectedCellID : primarySelectedCellID;
        if (cellID !== null) {
          const [x, y] = cellCoordMap.get(cellID);
          if (x !== 0) {
            modifySelectedCells(x - 1, y, extend);
            return true;
          }
        }
      }
      if (!lexical.$isRangeSelection(selection) || targetEditor !== cellEditor) {
        return false;
      }
      if (selection.isCollapsed() && selection.anchor.offset === 0) {
        event.preventDefault();
        return true;
      }
      return false;
    }, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.KEY_ARROW_RIGHT_COMMAND, (event, targetEditor) => {
      const selection = lexical.$getSelection();
      if (!isEditing && selection === null) {
        const extend = event.shiftKey;
        const cellID = extend ? lastCellIDRef.current || primarySelectedCellID : primarySelectedCellID;
        if (cellID !== null) {
          const [x, y] = cellCoordMap.get(cellID);
          if (x !== rows[y].cells.length - 1) {
            modifySelectedCells(x + 1, y, extend);
            return true;
          }
        }
      }
      if (!lexical.$isRangeSelection(selection) || targetEditor !== cellEditor) {
        return false;
      }
      if (selection.isCollapsed()) {
        const anchor = selection.anchor;
        if (anchor.type === 'text' && anchor.offset === anchor.getNode().getTextContentSize() || anchor.type === 'element' && anchor.offset === anchor.getNode().getChildrenSize()) {
          event.preventDefault();
          return true;
        }
      }
      return false;
    }, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.KEY_ESCAPE_COMMAND, (event, targetEditor) => {
      const selection = lexical.$getSelection();
      if (!isEditing && selection === null && targetEditor === editor) {
        setSelected(true);
        setPrimarySelectedCellID(null);
        selectTable();
        return true;
      }
      if (!lexical.$isRangeSelection(selection)) {
        return false;
      }
      if (isEditing) {
        saveEditorToJSON();
        setIsEditing(false);
        if (primarySelectedCellID !== null) {
          setTimeout(() => {
            focusCell(tableElem, primarySelectedCellID);
          }, 20);
        }
        return true;
      }
      return false;
    }, lexical.COMMAND_PRIORITY_LOW));
  }, [cellCoordMap, cellEditor, clearCellsCommand, clearSelection, editor, isEditing, modifySelectedCells, nodeKey, primarySelectedCellID, rows, saveEditorToJSON, selectTable, selectedCellIDs, setSelected, updateTableNode]);
  if (cellEditor === null) {
    return;
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("table", {
    className: `${theme.table} ${isSelected ? theme.tableSelected : ''}`,
    ref: tableRef,
    tabIndex: -1
  }, /*#__PURE__*/React.createElement("tbody", null, rows.map(row => /*#__PURE__*/React.createElement("tr", {
    key: row.id,
    className: theme.tableRow
  }, row.cells.map(cell => {
    const {
      id
    } = cell;
    return /*#__PURE__*/React.createElement(TableCell, {
      key: id,
      cell: cell,
      theme: theme,
      isSelected: selectedCellSet.has(id),
      isPrimarySelected: primarySelectedCellID === id,
      isEditing: isEditing,
      sortingOptions: sortingOptions,
      cellEditor: cellEditor,
      updateCellsByID: updateCellsByID,
      updateTableNode: updateTableNode,
      cellCoordMap: cellCoordMap,
      rows: rows,
      setSortingOptions: setSortingOptions
    });
  }))))), showAddColumns && /*#__PURE__*/React.createElement("button", {
    className: theme.tableAddColumns,
    onClick: addColumns
  }), showAddRows && /*#__PURE__*/React.createElement("button", {
    className: theme.tableAddRows,
    onClick: addRows,
    ref: addRowsRef
  }), resizingID !== null && /*#__PURE__*/React.createElement("div", {
    className: theme.tableResizeRuler,
    ref: tableResizerRulerRef
  }));
}

var TableComponent$1 = {
  __proto__: null,
  'default': TableComponent
};

/* eslint-disable */

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// This list was sourced from Github (MIT License)
// https://github.com/github/gemoji/blob/master/db/emoji.json

var emojiList = [{
  description: 'grinning face',
  emoji: '😀',
  category: 'Smileys & Emotion',
  aliases: ['grinning'],
  tags: ['smile', 'happy'],
  unicode_version: '6.1',
  ios_version: '6.0'
}, {
  emoji: '😃',
  description: 'grinning face with big eyes',
  category: 'Smileys & Emotion',
  aliases: ['smiley'],
  tags: ['happy', 'joy', 'haha'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '😄',
  description: 'grinning face with smiling eyes',
  category: 'Smileys & Emotion',
  aliases: ['smile'],
  tags: ['happy', 'joy', 'laugh', 'pleased'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '😁',
  description: 'beaming face with smiling eyes',
  category: 'Smileys & Emotion',
  aliases: ['grin'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '😆',
  description: 'grinning squinting face',
  category: 'Smileys & Emotion',
  aliases: ['laughing', 'satisfied'],
  tags: ['happy', 'haha'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '😅',
  description: 'grinning face with sweat',
  category: 'Smileys & Emotion',
  aliases: ['sweat_smile'],
  tags: ['hot'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🤣',
  description: 'rolling on the floor laughing',
  category: 'Smileys & Emotion',
  aliases: ['rofl'],
  tags: ['lol', 'laughing'],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '😂',
  description: 'face with tears of joy',
  category: 'Smileys & Emotion',
  aliases: ['joy'],
  tags: ['tears'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🙂',
  description: 'slightly smiling face',
  category: 'Smileys & Emotion',
  aliases: ['slightly_smiling_face'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🙃',
  description: 'upside-down face',
  category: 'Smileys & Emotion',
  aliases: ['upside_down_face'],
  tags: [],
  unicode_version: '8.0',
  ios_version: '9.1'
}, {
  emoji: '😉',
  description: 'winking face',
  category: 'Smileys & Emotion',
  aliases: ['wink'],
  tags: ['flirt'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '😊',
  description: 'smiling face with smiling eyes',
  category: 'Smileys & Emotion',
  aliases: ['blush'],
  tags: ['proud'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '😇',
  description: 'smiling face with halo',
  category: 'Smileys & Emotion',
  aliases: ['innocent'],
  tags: ['angel'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🥰',
  description: 'smiling face with hearts',
  category: 'Smileys & Emotion',
  aliases: ['smiling_face_with_three_hearts'],
  tags: ['love'],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '😍',
  description: 'smiling face with heart-eyes',
  category: 'Smileys & Emotion',
  aliases: ['heart_eyes'],
  tags: ['love', 'crush'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🤩',
  description: 'star-struck',
  category: 'Smileys & Emotion',
  aliases: ['star_struck'],
  tags: ['eyes'],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '😘',
  description: 'face blowing a kiss',
  category: 'Smileys & Emotion',
  aliases: ['kissing_heart'],
  tags: ['flirt'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '😗',
  description: 'kissing face',
  category: 'Smileys & Emotion',
  aliases: ['kissing'],
  tags: [],
  unicode_version: '6.1',
  ios_version: '6.0'
}, {
  emoji: '☺️',
  description: 'smiling face',
  category: 'Smileys & Emotion',
  aliases: ['relaxed'],
  tags: ['blush', 'pleased'],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '😚',
  description: 'kissing face with closed eyes',
  category: 'Smileys & Emotion',
  aliases: ['kissing_closed_eyes'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '😙',
  description: 'kissing face with smiling eyes',
  category: 'Smileys & Emotion',
  aliases: ['kissing_smiling_eyes'],
  tags: [],
  unicode_version: '6.1',
  ios_version: '6.0'
}, {
  emoji: '🥲',
  description: 'smiling face with tear',
  category: 'Smileys & Emotion',
  aliases: ['smiling_face_with_tear'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '😋',
  description: 'face savoring food',
  category: 'Smileys & Emotion',
  aliases: ['yum'],
  tags: ['tongue', 'lick'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '😛',
  description: 'face with tongue',
  category: 'Smileys & Emotion',
  aliases: ['stuck_out_tongue'],
  tags: [],
  unicode_version: '6.1',
  ios_version: '6.0'
}, {
  emoji: '😜',
  description: 'winking face with tongue',
  category: 'Smileys & Emotion',
  aliases: ['stuck_out_tongue_winking_eye'],
  tags: ['prank', 'silly'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🤪',
  description: 'zany face',
  category: 'Smileys & Emotion',
  aliases: ['zany_face'],
  tags: ['goofy', 'wacky'],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '😝',
  description: 'squinting face with tongue',
  category: 'Smileys & Emotion',
  aliases: ['stuck_out_tongue_closed_eyes'],
  tags: ['prank'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🤑',
  description: 'money-mouth face',
  category: 'Smileys & Emotion',
  aliases: ['money_mouth_face'],
  tags: ['rich'],
  unicode_version: '8.0',
  ios_version: '9.1'
}, {
  emoji: '🤗',
  description: 'hugging face',
  category: 'Smileys & Emotion',
  aliases: ['hugs'],
  tags: [],
  unicode_version: '8.0',
  ios_version: '9.1'
}, {
  emoji: '🤭',
  description: 'face with hand over mouth',
  category: 'Smileys & Emotion',
  aliases: ['hand_over_mouth'],
  tags: ['quiet', 'whoops'],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🤫',
  description: 'shushing face',
  category: 'Smileys & Emotion',
  aliases: ['shushing_face'],
  tags: ['silence', 'quiet'],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🤔',
  description: 'thinking face',
  category: 'Smileys & Emotion',
  aliases: ['thinking'],
  tags: [],
  unicode_version: '8.0',
  ios_version: '9.1'
}, {
  emoji: '🤐',
  description: 'zipper-mouth face',
  category: 'Smileys & Emotion',
  aliases: ['zipper_mouth_face'],
  tags: ['silence', 'hush'],
  unicode_version: '8.0',
  ios_version: '9.1'
}, {
  emoji: '🤨',
  description: 'face with raised eyebrow',
  category: 'Smileys & Emotion',
  aliases: ['raised_eyebrow'],
  tags: ['suspicious'],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '😐',
  description: 'neutral face',
  category: 'Smileys & Emotion',
  aliases: ['neutral_face'],
  tags: ['meh'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '😑',
  description: 'expressionless face',
  category: 'Smileys & Emotion',
  aliases: ['expressionless'],
  tags: [],
  unicode_version: '6.1',
  ios_version: '6.0'
}, {
  emoji: '😶',
  description: 'face without mouth',
  category: 'Smileys & Emotion',
  aliases: ['no_mouth'],
  tags: ['mute', 'silence'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '😶‍🌫️',
  description: 'face in clouds',
  category: 'Smileys & Emotion',
  aliases: ['face_in_clouds'],
  tags: [],
  unicode_version: '13.1',
  ios_version: '14.0'
}, {
  emoji: '😏',
  description: 'smirking face',
  category: 'Smileys & Emotion',
  aliases: ['smirk'],
  tags: ['smug'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '😒',
  description: 'unamused face',
  category: 'Smileys & Emotion',
  aliases: ['unamused'],
  tags: ['meh'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🙄',
  description: 'face with rolling eyes',
  category: 'Smileys & Emotion',
  aliases: ['roll_eyes'],
  tags: [],
  unicode_version: '8.0',
  ios_version: '9.1'
}, {
  emoji: '😬',
  description: 'grimacing face',
  category: 'Smileys & Emotion',
  aliases: ['grimacing'],
  tags: [],
  unicode_version: '6.1',
  ios_version: '6.0'
}, {
  emoji: '😮‍💨',
  description: 'face exhaling',
  category: 'Smileys & Emotion',
  aliases: ['face_exhaling'],
  tags: [],
  unicode_version: '13.1',
  ios_version: '14.0'
}, {
  emoji: '🤥',
  description: 'lying face',
  category: 'Smileys & Emotion',
  aliases: ['lying_face'],
  tags: ['liar'],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '😌',
  description: 'relieved face',
  category: 'Smileys & Emotion',
  aliases: ['relieved'],
  tags: ['whew'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '😔',
  description: 'pensive face',
  category: 'Smileys & Emotion',
  aliases: ['pensive'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '😪',
  description: 'sleepy face',
  category: 'Smileys & Emotion',
  aliases: ['sleepy'],
  tags: ['tired'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🤤',
  description: 'drooling face',
  category: 'Smileys & Emotion',
  aliases: ['drooling_face'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '😴',
  description: 'sleeping face',
  category: 'Smileys & Emotion',
  aliases: ['sleeping'],
  tags: ['zzz'],
  unicode_version: '6.1',
  ios_version: '6.0'
}, {
  emoji: '😷',
  description: 'face with medical mask',
  category: 'Smileys & Emotion',
  aliases: ['mask'],
  tags: ['sick', 'ill'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🤒',
  description: 'face with thermometer',
  category: 'Smileys & Emotion',
  aliases: ['face_with_thermometer'],
  tags: ['sick'],
  unicode_version: '8.0',
  ios_version: '9.1'
}, {
  emoji: '🤕',
  description: 'face with head-bandage',
  category: 'Smileys & Emotion',
  aliases: ['face_with_head_bandage'],
  tags: ['hurt'],
  unicode_version: '8.0',
  ios_version: '9.1'
}, {
  emoji: '🤢',
  description: 'nauseated face',
  category: 'Smileys & Emotion',
  aliases: ['nauseated_face'],
  tags: ['sick', 'barf', 'disgusted'],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🤮',
  description: 'face vomiting',
  category: 'Smileys & Emotion',
  aliases: ['vomiting_face'],
  tags: ['barf', 'sick'],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🤧',
  description: 'sneezing face',
  category: 'Smileys & Emotion',
  aliases: ['sneezing_face'],
  tags: ['achoo', 'sick'],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🥵',
  description: 'hot face',
  category: 'Smileys & Emotion',
  aliases: ['hot_face'],
  tags: ['heat', 'sweating'],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🥶',
  description: 'cold face',
  category: 'Smileys & Emotion',
  aliases: ['cold_face'],
  tags: ['freezing', 'ice'],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🥴',
  description: 'woozy face',
  category: 'Smileys & Emotion',
  aliases: ['woozy_face'],
  tags: ['groggy'],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '😵',
  description: 'knocked-out face',
  category: 'Smileys & Emotion',
  aliases: ['dizzy_face'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '😵‍💫',
  description: 'face with spiral eyes',
  category: 'Smileys & Emotion',
  aliases: ['face_with_spiral_eyes'],
  tags: [],
  unicode_version: '13.1',
  ios_version: '14.0'
}, {
  emoji: '🤯',
  description: 'exploding head',
  category: 'Smileys & Emotion',
  aliases: ['exploding_head'],
  tags: ['mind', 'blown'],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🤠',
  description: 'cowboy hat face',
  category: 'Smileys & Emotion',
  aliases: ['cowboy_hat_face'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🥳',
  description: 'partying face',
  category: 'Smileys & Emotion',
  aliases: ['partying_face'],
  tags: ['celebration', 'birthday'],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🥸',
  description: 'disguised face',
  category: 'Smileys & Emotion',
  aliases: ['disguised_face'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '😎',
  description: 'smiling face with sunglasses',
  category: 'Smileys & Emotion',
  aliases: ['sunglasses'],
  tags: ['cool'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🤓',
  description: 'nerd face',
  category: 'Smileys & Emotion',
  aliases: ['nerd_face'],
  tags: ['geek', 'glasses'],
  unicode_version: '8.0',
  ios_version: '9.1'
}, {
  emoji: '🧐',
  description: 'face with monocle',
  category: 'Smileys & Emotion',
  aliases: ['monocle_face'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '😕',
  description: 'confused face',
  category: 'Smileys & Emotion',
  aliases: ['confused'],
  tags: [],
  unicode_version: '6.1',
  ios_version: '6.0'
}, {
  emoji: '😟',
  description: 'worried face',
  category: 'Smileys & Emotion',
  aliases: ['worried'],
  tags: ['nervous'],
  unicode_version: '6.1',
  ios_version: '6.0'
}, {
  emoji: '🙁',
  description: 'slightly frowning face',
  category: 'Smileys & Emotion',
  aliases: ['slightly_frowning_face'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '☹️',
  description: 'frowning face',
  category: 'Smileys & Emotion',
  aliases: ['frowning_face'],
  tags: [],
  unicode_version: '',
  ios_version: '9.1'
}, {
  emoji: '😮',
  description: 'face with open mouth',
  category: 'Smileys & Emotion',
  aliases: ['open_mouth'],
  tags: ['surprise', 'impressed', 'wow'],
  unicode_version: '6.1',
  ios_version: '6.0'
}, {
  emoji: '😯',
  description: 'hushed face',
  category: 'Smileys & Emotion',
  aliases: ['hushed'],
  tags: ['silence', 'speechless'],
  unicode_version: '6.1',
  ios_version: '6.0'
}, {
  emoji: '😲',
  description: 'astonished face',
  category: 'Smileys & Emotion',
  aliases: ['astonished'],
  tags: ['amazed', 'gasp'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '😳',
  description: 'flushed face',
  category: 'Smileys & Emotion',
  aliases: ['flushed'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🥺',
  description: 'pleading face',
  category: 'Smileys & Emotion',
  aliases: ['pleading_face'],
  tags: ['puppy', 'eyes'],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '😦',
  description: 'frowning face with open mouth',
  category: 'Smileys & Emotion',
  aliases: ['frowning'],
  tags: [],
  unicode_version: '6.1',
  ios_version: '6.0'
}, {
  emoji: '😧',
  description: 'anguished face',
  category: 'Smileys & Emotion',
  aliases: ['anguished'],
  tags: ['stunned'],
  unicode_version: '6.1',
  ios_version: '6.0'
}, {
  emoji: '😨',
  description: 'fearful face',
  category: 'Smileys & Emotion',
  aliases: ['fearful'],
  tags: ['scared', 'shocked', 'oops'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '😰',
  description: 'anxious face with sweat',
  category: 'Smileys & Emotion',
  aliases: ['cold_sweat'],
  tags: ['nervous'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '😥',
  description: 'sad but relieved face',
  category: 'Smileys & Emotion',
  aliases: ['disappointed_relieved'],
  tags: ['phew', 'sweat', 'nervous'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '😢',
  description: 'crying face',
  category: 'Smileys & Emotion',
  aliases: ['cry'],
  tags: ['sad', 'tear'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '😭',
  description: 'loudly crying face',
  category: 'Smileys & Emotion',
  aliases: ['sob'],
  tags: ['sad', 'cry', 'bawling'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '😱',
  description: 'face screaming in fear',
  category: 'Smileys & Emotion',
  aliases: ['scream'],
  tags: ['horror', 'shocked'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '😖',
  description: 'confounded face',
  category: 'Smileys & Emotion',
  aliases: ['confounded'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '😣',
  description: 'persevering face',
  category: 'Smileys & Emotion',
  aliases: ['persevere'],
  tags: ['struggling'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '😞',
  description: 'disappointed face',
  category: 'Smileys & Emotion',
  aliases: ['disappointed'],
  tags: ['sad'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '😓',
  description: 'downcast face with sweat',
  category: 'Smileys & Emotion',
  aliases: ['sweat'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '😩',
  description: 'weary face',
  category: 'Smileys & Emotion',
  aliases: ['weary'],
  tags: ['tired'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '😫',
  description: 'tired face',
  category: 'Smileys & Emotion',
  aliases: ['tired_face'],
  tags: ['upset', 'whine'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🥱',
  description: 'yawning face',
  category: 'Smileys & Emotion',
  aliases: ['yawning_face'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '😤',
  description: 'face with steam from nose',
  category: 'Smileys & Emotion',
  aliases: ['triumph'],
  tags: ['smug'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '😡',
  description: 'pouting face',
  category: 'Smileys & Emotion',
  aliases: ['rage', 'pout'],
  tags: ['angry'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '😠',
  description: 'angry face',
  category: 'Smileys & Emotion',
  aliases: ['angry'],
  tags: ['mad', 'annoyed'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🤬',
  description: 'face with symbols on mouth',
  category: 'Smileys & Emotion',
  aliases: ['cursing_face'],
  tags: ['foul'],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '😈',
  description: 'smiling face with horns',
  category: 'Smileys & Emotion',
  aliases: ['smiling_imp'],
  tags: ['devil', 'evil', 'horns'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '👿',
  description: 'angry face with horns',
  category: 'Smileys & Emotion',
  aliases: ['imp'],
  tags: ['angry', 'devil', 'evil', 'horns'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💀',
  description: 'skull',
  category: 'Smileys & Emotion',
  aliases: ['skull'],
  tags: ['dead', 'danger', 'poison'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '☠️',
  description: 'skull and crossbones',
  category: 'Smileys & Emotion',
  aliases: ['skull_and_crossbones'],
  tags: ['danger', 'pirate'],
  unicode_version: '',
  ios_version: '9.1'
}, {
  emoji: '💩',
  description: 'pile of poo',
  category: 'Smileys & Emotion',
  aliases: ['hankey', 'poop', 'shit'],
  tags: ['crap'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🤡',
  description: 'clown face',
  category: 'Smileys & Emotion',
  aliases: ['clown_face'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '👹',
  description: 'ogre',
  category: 'Smileys & Emotion',
  aliases: ['japanese_ogre'],
  tags: ['monster'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '👺',
  description: 'goblin',
  category: 'Smileys & Emotion',
  aliases: ['japanese_goblin'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '👻',
  description: 'ghost',
  category: 'Smileys & Emotion',
  aliases: ['ghost'],
  tags: ['halloween'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '👽',
  description: 'alien',
  category: 'Smileys & Emotion',
  aliases: ['alien'],
  tags: ['ufo'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '👾',
  description: 'alien monster',
  category: 'Smileys & Emotion',
  aliases: ['space_invader'],
  tags: ['game', 'retro'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🤖',
  description: 'robot',
  category: 'Smileys & Emotion',
  aliases: ['robot'],
  tags: [],
  unicode_version: '8.0',
  ios_version: '9.1'
}, {
  emoji: '😺',
  description: 'grinning cat',
  category: 'Smileys & Emotion',
  aliases: ['smiley_cat'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '😸',
  description: 'grinning cat with smiling eyes',
  category: 'Smileys & Emotion',
  aliases: ['smile_cat'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '😹',
  description: 'cat with tears of joy',
  category: 'Smileys & Emotion',
  aliases: ['joy_cat'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '😻',
  description: 'smiling cat with heart-eyes',
  category: 'Smileys & Emotion',
  aliases: ['heart_eyes_cat'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '😼',
  description: 'cat with wry smile',
  category: 'Smileys & Emotion',
  aliases: ['smirk_cat'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '😽',
  description: 'kissing cat',
  category: 'Smileys & Emotion',
  aliases: ['kissing_cat'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🙀',
  description: 'weary cat',
  category: 'Smileys & Emotion',
  aliases: ['scream_cat'],
  tags: ['horror'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '😿',
  description: 'crying cat',
  category: 'Smileys & Emotion',
  aliases: ['crying_cat_face'],
  tags: ['sad', 'tear'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '😾',
  description: 'pouting cat',
  category: 'Smileys & Emotion',
  aliases: ['pouting_cat'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🙈',
  description: 'see-no-evil monkey',
  category: 'Smileys & Emotion',
  aliases: ['see_no_evil'],
  tags: ['monkey', 'blind', 'ignore'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🙉',
  description: 'hear-no-evil monkey',
  category: 'Smileys & Emotion',
  aliases: ['hear_no_evil'],
  tags: ['monkey', 'deaf'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🙊',
  description: 'speak-no-evil monkey',
  category: 'Smileys & Emotion',
  aliases: ['speak_no_evil'],
  tags: ['monkey', 'mute', 'hush'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💋',
  description: 'kiss mark',
  category: 'Smileys & Emotion',
  aliases: ['kiss'],
  tags: ['lipstick'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💌',
  description: 'love letter',
  category: 'Smileys & Emotion',
  aliases: ['love_letter'],
  tags: ['email', 'envelope'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💘',
  description: 'heart with arrow',
  category: 'Smileys & Emotion',
  aliases: ['cupid'],
  tags: ['love', 'heart'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💝',
  description: 'heart with ribbon',
  category: 'Smileys & Emotion',
  aliases: ['gift_heart'],
  tags: ['chocolates'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💖',
  description: 'sparkling heart',
  category: 'Smileys & Emotion',
  aliases: ['sparkling_heart'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💗',
  description: 'growing heart',
  category: 'Smileys & Emotion',
  aliases: ['heartpulse'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💓',
  description: 'beating heart',
  category: 'Smileys & Emotion',
  aliases: ['heartbeat'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💞',
  description: 'revolving hearts',
  category: 'Smileys & Emotion',
  aliases: ['revolving_hearts'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💕',
  description: 'two hearts',
  category: 'Smileys & Emotion',
  aliases: ['two_hearts'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💟',
  description: 'heart decoration',
  category: 'Smileys & Emotion',
  aliases: ['heart_decoration'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '❣️',
  description: 'heart exclamation',
  category: 'Smileys & Emotion',
  aliases: ['heavy_heart_exclamation'],
  tags: [],
  unicode_version: '',
  ios_version: '9.1'
}, {
  emoji: '💔',
  description: 'broken heart',
  category: 'Smileys & Emotion',
  aliases: ['broken_heart'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '❤️‍🔥',
  description: 'heart on fire',
  category: 'Smileys & Emotion',
  aliases: ['heart_on_fire'],
  tags: [],
  unicode_version: '13.1',
  ios_version: '14.0'
}, {
  emoji: '❤️‍🩹',
  description: 'mending heart',
  category: 'Smileys & Emotion',
  aliases: ['mending_heart'],
  tags: [],
  unicode_version: '13.1',
  ios_version: '14.0'
}, {
  emoji: '❤️',
  description: 'red heart',
  category: 'Smileys & Emotion',
  aliases: ['heart'],
  tags: ['love'],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '🧡',
  description: 'orange heart',
  category: 'Smileys & Emotion',
  aliases: ['orange_heart'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '💛',
  description: 'yellow heart',
  category: 'Smileys & Emotion',
  aliases: ['yellow_heart'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💚',
  description: 'green heart',
  category: 'Smileys & Emotion',
  aliases: ['green_heart'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💙',
  description: 'blue heart',
  category: 'Smileys & Emotion',
  aliases: ['blue_heart'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💜',
  description: 'purple heart',
  category: 'Smileys & Emotion',
  aliases: ['purple_heart'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🤎',
  description: 'brown heart',
  category: 'Smileys & Emotion',
  aliases: ['brown_heart'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🖤',
  description: 'black heart',
  category: 'Smileys & Emotion',
  aliases: ['black_heart'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🤍',
  description: 'white heart',
  category: 'Smileys & Emotion',
  aliases: ['white_heart'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '💯',
  description: 'hundred points',
  category: 'Smileys & Emotion',
  aliases: ['100'],
  tags: ['score', 'perfect'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💢',
  description: 'anger symbol',
  category: 'Smileys & Emotion',
  aliases: ['anger'],
  tags: ['angry'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💥',
  description: 'collision',
  category: 'Smileys & Emotion',
  aliases: ['boom', 'collision'],
  tags: ['explode'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💫',
  description: 'dizzy',
  category: 'Smileys & Emotion',
  aliases: ['dizzy'],
  tags: ['star'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💦',
  description: 'sweat droplets',
  category: 'Smileys & Emotion',
  aliases: ['sweat_drops'],
  tags: ['water', 'workout'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💨',
  description: 'dashing away',
  category: 'Smileys & Emotion',
  aliases: ['dash'],
  tags: ['wind', 'blow', 'fast'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🕳️',
  description: 'hole',
  category: 'Smileys & Emotion',
  aliases: ['hole'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '💣',
  description: 'bomb',
  category: 'Smileys & Emotion',
  aliases: ['bomb'],
  tags: ['boom'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💬',
  description: 'speech balloon',
  category: 'Smileys & Emotion',
  aliases: ['speech_balloon'],
  tags: ['comment'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '👁️‍🗨️',
  description: 'eye in speech bubble',
  category: 'Smileys & Emotion',
  aliases: ['eye_speech_bubble'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🗨️',
  description: 'left speech bubble',
  category: 'Smileys & Emotion',
  aliases: ['left_speech_bubble'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🗯️',
  description: 'right anger bubble',
  category: 'Smileys & Emotion',
  aliases: ['right_anger_bubble'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '💭',
  description: 'thought balloon',
  category: 'Smileys & Emotion',
  aliases: ['thought_balloon'],
  tags: ['thinking'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💤',
  description: 'zzz',
  category: 'Smileys & Emotion',
  aliases: ['zzz'],
  tags: ['sleeping'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '👋',
  description: 'waving hand',
  category: 'People & Body',
  aliases: ['wave'],
  tags: ['goodbye'],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '🤚',
  description: 'raised back of hand',
  category: 'People & Body',
  aliases: ['raised_back_of_hand'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '🖐️',
  description: 'hand with fingers splayed',
  category: 'People & Body',
  aliases: ['raised_hand_with_fingers_splayed'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1',
  skin_tones: true
}, {
  emoji: '✋',
  description: 'raised hand',
  category: 'People & Body',
  aliases: ['hand', 'raised_hand'],
  tags: ['highfive', 'stop'],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '🖖',
  description: 'vulcan salute',
  category: 'People & Body',
  aliases: ['vulcan_salute'],
  tags: ['prosper', 'spock'],
  unicode_version: '7.0',
  ios_version: '8.3',
  skin_tones: true
}, {
  emoji: '👌',
  description: 'OK hand',
  category: 'People & Body',
  aliases: ['ok_hand'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '🤌',
  description: 'pinched fingers',
  category: 'People & Body',
  aliases: ['pinched_fingers'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0',
  skin_tones: true
}, {
  emoji: '🤏',
  description: 'pinching hand',
  category: 'People & Body',
  aliases: ['pinching_hand'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0',
  skin_tones: true
}, {
  emoji: '✌️',
  description: 'victory hand',
  category: 'People & Body',
  aliases: ['v'],
  tags: ['victory', 'peace'],
  unicode_version: '',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '🤞',
  description: 'crossed fingers',
  category: 'People & Body',
  aliases: ['crossed_fingers'],
  tags: ['luck', 'hopeful'],
  unicode_version: '9.0',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '🤟',
  description: 'love-you gesture',
  category: 'People & Body',
  aliases: ['love_you_gesture'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🤘',
  description: 'sign of the horns',
  category: 'People & Body',
  aliases: ['metal'],
  tags: [],
  unicode_version: '8.0',
  ios_version: '9.1',
  skin_tones: true
}, {
  emoji: '🤙',
  description: 'call me hand',
  category: 'People & Body',
  aliases: ['call_me_hand'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '👈',
  description: 'backhand index pointing left',
  category: 'People & Body',
  aliases: ['point_left'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '👉',
  description: 'backhand index pointing right',
  category: 'People & Body',
  aliases: ['point_right'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '👆',
  description: 'backhand index pointing up',
  category: 'People & Body',
  aliases: ['point_up_2'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '🖕',
  description: 'middle finger',
  category: 'People & Body',
  aliases: ['middle_finger', 'fu'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1',
  skin_tones: true
}, {
  emoji: '👇',
  description: 'backhand index pointing down',
  category: 'People & Body',
  aliases: ['point_down'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '☝️',
  description: 'index pointing up',
  category: 'People & Body',
  aliases: ['point_up'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '👍',
  description: 'thumbs up',
  category: 'People & Body',
  aliases: ['+1', 'thumbsup'],
  tags: ['approve', 'ok'],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '👎',
  description: 'thumbs down',
  category: 'People & Body',
  aliases: ['-1', 'thumbsdown'],
  tags: ['disapprove', 'bury'],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '✊',
  description: 'raised fist',
  category: 'People & Body',
  aliases: ['fist_raised', 'fist'],
  tags: ['power'],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '👊',
  description: 'oncoming fist',
  category: 'People & Body',
  aliases: ['fist_oncoming', 'facepunch', 'punch'],
  tags: ['attack'],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '🤛',
  description: 'left-facing fist',
  category: 'People & Body',
  aliases: ['fist_left'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '🤜',
  description: 'right-facing fist',
  category: 'People & Body',
  aliases: ['fist_right'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '👏',
  description: 'clapping hands',
  category: 'People & Body',
  aliases: ['clap'],
  tags: ['praise', 'applause'],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '🙌',
  description: 'raising hands',
  category: 'People & Body',
  aliases: ['raised_hands'],
  tags: ['hooray'],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '👐',
  description: 'open hands',
  category: 'People & Body',
  aliases: ['open_hands'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '🤲',
  description: 'palms up together',
  category: 'People & Body',
  aliases: ['palms_up_together'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🤝',
  description: 'handshake',
  category: 'People & Body',
  aliases: ['handshake'],
  tags: ['deal'],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🙏',
  description: 'folded hands',
  category: 'People & Body',
  aliases: ['pray'],
  tags: ['please', 'hope', 'wish'],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '✍️',
  description: 'writing hand',
  category: 'People & Body',
  aliases: ['writing_hand'],
  tags: [],
  unicode_version: '',
  ios_version: '9.1',
  skin_tones: true
}, {
  emoji: '💅',
  description: 'nail polish',
  category: 'People & Body',
  aliases: ['nail_care'],
  tags: ['beauty', 'manicure'],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '🤳',
  description: 'selfie',
  category: 'People & Body',
  aliases: ['selfie'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '💪',
  description: 'flexed biceps',
  category: 'People & Body',
  aliases: ['muscle'],
  tags: ['flex', 'bicep', 'strong', 'workout'],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '🦾',
  description: 'mechanical arm',
  category: 'People & Body',
  aliases: ['mechanical_arm'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🦿',
  description: 'mechanical leg',
  category: 'People & Body',
  aliases: ['mechanical_leg'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🦵',
  description: 'leg',
  category: 'People & Body',
  aliases: ['leg'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🦶',
  description: 'foot',
  category: 'People & Body',
  aliases: ['foot'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '👂',
  description: 'ear',
  category: 'People & Body',
  aliases: ['ear'],
  tags: ['hear', 'sound', 'listen'],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '🦻',
  description: 'ear with hearing aid',
  category: 'People & Body',
  aliases: ['ear_with_hearing_aid'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0',
  skin_tones: true
}, {
  emoji: '👃',
  description: 'nose',
  category: 'People & Body',
  aliases: ['nose'],
  tags: ['smell'],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '🧠',
  description: 'brain',
  category: 'People & Body',
  aliases: ['brain'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🫀',
  description: 'anatomical heart',
  category: 'People & Body',
  aliases: ['anatomical_heart'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🫁',
  description: 'lungs',
  category: 'People & Body',
  aliases: ['lungs'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🦷',
  description: 'tooth',
  category: 'People & Body',
  aliases: ['tooth'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🦴',
  description: 'bone',
  category: 'People & Body',
  aliases: ['bone'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '👀',
  description: 'eyes',
  category: 'People & Body',
  aliases: ['eyes'],
  tags: ['look', 'see', 'watch'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '👁️',
  description: 'eye',
  category: 'People & Body',
  aliases: ['eye'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '👅',
  description: 'tongue',
  category: 'People & Body',
  aliases: ['tongue'],
  tags: ['taste'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '👄',
  description: 'mouth',
  category: 'People & Body',
  aliases: ['lips'],
  tags: ['kiss'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '👶',
  description: 'baby',
  category: 'People & Body',
  aliases: ['baby'],
  tags: ['child', 'newborn'],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '🧒',
  description: 'child',
  category: 'People & Body',
  aliases: ['child'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '👦',
  description: 'boy',
  category: 'People & Body',
  aliases: ['boy'],
  tags: ['child'],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '👧',
  description: 'girl',
  category: 'People & Body',
  aliases: ['girl'],
  tags: ['child'],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '🧑',
  description: 'person',
  category: 'People & Body',
  aliases: ['adult'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '👱',
  description: 'person: blond hair',
  category: 'People & Body',
  aliases: ['blond_haired_person'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '👨',
  description: 'man',
  category: 'People & Body',
  aliases: ['man'],
  tags: ['mustache', 'father', 'dad'],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '🧔',
  description: 'person: beard',
  category: 'People & Body',
  aliases: ['bearded_person'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🧔‍♂️',
  description: 'man: beard',
  category: 'People & Body',
  aliases: ['man_beard'],
  tags: [],
  unicode_version: '13.1',
  ios_version: '14.0',
  skin_tones: true
}, {
  emoji: '🧔‍♀️',
  description: 'woman: beard',
  category: 'People & Body',
  aliases: ['woman_beard'],
  tags: [],
  unicode_version: '13.1',
  ios_version: '14.0',
  skin_tones: true
}, {
  emoji: '👨‍🦰',
  description: 'man: red hair',
  category: 'People & Body',
  aliases: ['red_haired_man'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '👨‍🦱',
  description: 'man: curly hair',
  category: 'People & Body',
  aliases: ['curly_haired_man'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '👨‍🦳',
  description: 'man: white hair',
  category: 'People & Body',
  aliases: ['white_haired_man'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '👨‍🦲',
  description: 'man: bald',
  category: 'People & Body',
  aliases: ['bald_man'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '👩',
  description: 'woman',
  category: 'People & Body',
  aliases: ['woman'],
  tags: ['girls'],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '👩‍🦰',
  description: 'woman: red hair',
  category: 'People & Body',
  aliases: ['red_haired_woman'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🧑‍🦰',
  description: 'person: red hair',
  category: 'People & Body',
  aliases: ['person_red_hair'],
  tags: [],
  unicode_version: '12.1',
  ios_version: '13.2',
  skin_tones: true
}, {
  emoji: '👩‍🦱',
  description: 'woman: curly hair',
  category: 'People & Body',
  aliases: ['curly_haired_woman'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🧑‍🦱',
  description: 'person: curly hair',
  category: 'People & Body',
  aliases: ['person_curly_hair'],
  tags: [],
  unicode_version: '12.1',
  ios_version: '13.2',
  skin_tones: true
}, {
  emoji: '👩‍🦳',
  description: 'woman: white hair',
  category: 'People & Body',
  aliases: ['white_haired_woman'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🧑‍🦳',
  description: 'person: white hair',
  category: 'People & Body',
  aliases: ['person_white_hair'],
  tags: [],
  unicode_version: '12.1',
  ios_version: '13.2',
  skin_tones: true
}, {
  emoji: '👩‍🦲',
  description: 'woman: bald',
  category: 'People & Body',
  aliases: ['bald_woman'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🧑‍🦲',
  description: 'person: bald',
  category: 'People & Body',
  aliases: ['person_bald'],
  tags: [],
  unicode_version: '12.1',
  ios_version: '13.2',
  skin_tones: true
}, {
  emoji: '👱‍♀️',
  description: 'woman: blond hair',
  category: 'People & Body',
  aliases: ['blond_haired_woman', 'blonde_woman'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '10.0',
  skin_tones: true
}, {
  emoji: '👱‍♂️',
  description: 'man: blond hair',
  category: 'People & Body',
  aliases: ['blond_haired_man'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🧓',
  description: 'older person',
  category: 'People & Body',
  aliases: ['older_adult'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '👴',
  description: 'old man',
  category: 'People & Body',
  aliases: ['older_man'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '👵',
  description: 'old woman',
  category: 'People & Body',
  aliases: ['older_woman'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '🙍',
  description: 'person frowning',
  category: 'People & Body',
  aliases: ['frowning_person'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '🙍‍♂️',
  description: 'man frowning',
  category: 'People & Body',
  aliases: ['frowning_man'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '10.0',
  skin_tones: true
}, {
  emoji: '🙍‍♀️',
  description: 'woman frowning',
  category: 'People & Body',
  aliases: ['frowning_woman'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🙎',
  description: 'person pouting',
  category: 'People & Body',
  aliases: ['pouting_face'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '🙎‍♂️',
  description: 'man pouting',
  category: 'People & Body',
  aliases: ['pouting_man'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '10.0',
  skin_tones: true
}, {
  emoji: '🙎‍♀️',
  description: 'woman pouting',
  category: 'People & Body',
  aliases: ['pouting_woman'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🙅',
  description: 'person gesturing NO',
  category: 'People & Body',
  aliases: ['no_good'],
  tags: ['stop', 'halt', 'denied'],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '🙅‍♂️',
  description: 'man gesturing NO',
  category: 'People & Body',
  aliases: ['no_good_man', 'ng_man'],
  tags: ['stop', 'halt', 'denied'],
  unicode_version: '6.0',
  ios_version: '10.0',
  skin_tones: true
}, {
  emoji: '🙅‍♀️',
  description: 'woman gesturing NO',
  category: 'People & Body',
  aliases: ['no_good_woman', 'ng_woman'],
  tags: ['stop', 'halt', 'denied'],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🙆',
  description: 'person gesturing OK',
  category: 'People & Body',
  aliases: ['ok_person'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '🙆‍♂️',
  description: 'man gesturing OK',
  category: 'People & Body',
  aliases: ['ok_man'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '10.0',
  skin_tones: true
}, {
  emoji: '🙆‍♀️',
  description: 'woman gesturing OK',
  category: 'People & Body',
  aliases: ['ok_woman'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '💁',
  description: 'person tipping hand',
  category: 'People & Body',
  aliases: ['tipping_hand_person', 'information_desk_person'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '💁‍♂️',
  description: 'man tipping hand',
  category: 'People & Body',
  aliases: ['tipping_hand_man', 'sassy_man'],
  tags: ['information'],
  unicode_version: '6.0',
  ios_version: '10.0',
  skin_tones: true
}, {
  emoji: '💁‍♀️',
  description: 'woman tipping hand',
  category: 'People & Body',
  aliases: ['tipping_hand_woman', 'sassy_woman'],
  tags: ['information'],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🙋',
  description: 'person raising hand',
  category: 'People & Body',
  aliases: ['raising_hand'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '🙋‍♂️',
  description: 'man raising hand',
  category: 'People & Body',
  aliases: ['raising_hand_man'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '10.0',
  skin_tones: true
}, {
  emoji: '🙋‍♀️',
  description: 'woman raising hand',
  category: 'People & Body',
  aliases: ['raising_hand_woman'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🧏',
  description: 'deaf person',
  category: 'People & Body',
  aliases: ['deaf_person'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0',
  skin_tones: true
}, {
  emoji: '🧏‍♂️',
  description: 'deaf man',
  category: 'People & Body',
  aliases: ['deaf_man'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0',
  skin_tones: true
}, {
  emoji: '🧏‍♀️',
  description: 'deaf woman',
  category: 'People & Body',
  aliases: ['deaf_woman'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0',
  skin_tones: true
}, {
  emoji: '🙇',
  description: 'person bowing',
  category: 'People & Body',
  aliases: ['bow'],
  tags: ['respect', 'thanks'],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '🙇‍♂️',
  description: 'man bowing',
  category: 'People & Body',
  aliases: ['bowing_man'],
  tags: ['respect', 'thanks'],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🙇‍♀️',
  description: 'woman bowing',
  category: 'People & Body',
  aliases: ['bowing_woman'],
  tags: ['respect', 'thanks'],
  unicode_version: '6.0',
  ios_version: '10.0',
  skin_tones: true
}, {
  emoji: '🤦',
  description: 'person facepalming',
  category: 'People & Body',
  aliases: ['facepalm'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🤦‍♂️',
  description: 'man facepalming',
  category: 'People & Body',
  aliases: ['man_facepalming'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '🤦‍♀️',
  description: 'woman facepalming',
  category: 'People & Body',
  aliases: ['woman_facepalming'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '🤷',
  description: 'person shrugging',
  category: 'People & Body',
  aliases: ['shrug'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🤷‍♂️',
  description: 'man shrugging',
  category: 'People & Body',
  aliases: ['man_shrugging'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '🤷‍♀️',
  description: 'woman shrugging',
  category: 'People & Body',
  aliases: ['woman_shrugging'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '🧑‍⚕️',
  description: 'health worker',
  category: 'People & Body',
  aliases: ['health_worker'],
  tags: [],
  unicode_version: '12.1',
  ios_version: '13.2',
  skin_tones: true
}, {
  emoji: '👨‍⚕️',
  description: 'man health worker',
  category: 'People & Body',
  aliases: ['man_health_worker'],
  tags: ['doctor', 'nurse'],
  unicode_version: '',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '👩‍⚕️',
  description: 'woman health worker',
  category: 'People & Body',
  aliases: ['woman_health_worker'],
  tags: ['doctor', 'nurse'],
  unicode_version: '',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '🧑‍🎓',
  description: 'student',
  category: 'People & Body',
  aliases: ['student'],
  tags: [],
  unicode_version: '12.1',
  ios_version: '13.2',
  skin_tones: true
}, {
  emoji: '👨‍🎓',
  description: 'man student',
  category: 'People & Body',
  aliases: ['man_student'],
  tags: ['graduation'],
  unicode_version: '',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '👩‍🎓',
  description: 'woman student',
  category: 'People & Body',
  aliases: ['woman_student'],
  tags: ['graduation'],
  unicode_version: '',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '🧑‍🏫',
  description: 'teacher',
  category: 'People & Body',
  aliases: ['teacher'],
  tags: [],
  unicode_version: '12.1',
  ios_version: '13.2',
  skin_tones: true
}, {
  emoji: '👨‍🏫',
  description: 'man teacher',
  category: 'People & Body',
  aliases: ['man_teacher'],
  tags: ['school', 'professor'],
  unicode_version: '',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '👩‍🏫',
  description: 'woman teacher',
  category: 'People & Body',
  aliases: ['woman_teacher'],
  tags: ['school', 'professor'],
  unicode_version: '',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '🧑‍⚖️',
  description: 'judge',
  category: 'People & Body',
  aliases: ['judge'],
  tags: [],
  unicode_version: '12.1',
  ios_version: '13.2',
  skin_tones: true
}, {
  emoji: '👨‍⚖️',
  description: 'man judge',
  category: 'People & Body',
  aliases: ['man_judge'],
  tags: ['justice'],
  unicode_version: '',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '👩‍⚖️',
  description: 'woman judge',
  category: 'People & Body',
  aliases: ['woman_judge'],
  tags: ['justice'],
  unicode_version: '',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '🧑‍🌾',
  description: 'farmer',
  category: 'People & Body',
  aliases: ['farmer'],
  tags: [],
  unicode_version: '12.1',
  ios_version: '13.2',
  skin_tones: true
}, {
  emoji: '👨‍🌾',
  description: 'man farmer',
  category: 'People & Body',
  aliases: ['man_farmer'],
  tags: [],
  unicode_version: '',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '👩‍🌾',
  description: 'woman farmer',
  category: 'People & Body',
  aliases: ['woman_farmer'],
  tags: [],
  unicode_version: '',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '🧑‍🍳',
  description: 'cook',
  category: 'People & Body',
  aliases: ['cook'],
  tags: [],
  unicode_version: '12.1',
  ios_version: '13.2',
  skin_tones: true
}, {
  emoji: '👨‍🍳',
  description: 'man cook',
  category: 'People & Body',
  aliases: ['man_cook'],
  tags: ['chef'],
  unicode_version: '',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '👩‍🍳',
  description: 'woman cook',
  category: 'People & Body',
  aliases: ['woman_cook'],
  tags: ['chef'],
  unicode_version: '',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '🧑‍🔧',
  description: 'mechanic',
  category: 'People & Body',
  aliases: ['mechanic'],
  tags: [],
  unicode_version: '12.1',
  ios_version: '13.2',
  skin_tones: true
}, {
  emoji: '👨‍🔧',
  description: 'man mechanic',
  category: 'People & Body',
  aliases: ['man_mechanic'],
  tags: [],
  unicode_version: '',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '👩‍🔧',
  description: 'woman mechanic',
  category: 'People & Body',
  aliases: ['woman_mechanic'],
  tags: [],
  unicode_version: '',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '🧑‍🏭',
  description: 'factory worker',
  category: 'People & Body',
  aliases: ['factory_worker'],
  tags: [],
  unicode_version: '12.1',
  ios_version: '13.2',
  skin_tones: true
}, {
  emoji: '👨‍🏭',
  description: 'man factory worker',
  category: 'People & Body',
  aliases: ['man_factory_worker'],
  tags: [],
  unicode_version: '',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '👩‍🏭',
  description: 'woman factory worker',
  category: 'People & Body',
  aliases: ['woman_factory_worker'],
  tags: [],
  unicode_version: '',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '🧑‍💼',
  description: 'office worker',
  category: 'People & Body',
  aliases: ['office_worker'],
  tags: [],
  unicode_version: '12.1',
  ios_version: '13.2',
  skin_tones: true
}, {
  emoji: '👨‍💼',
  description: 'man office worker',
  category: 'People & Body',
  aliases: ['man_office_worker'],
  tags: ['business'],
  unicode_version: '',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '👩‍💼',
  description: 'woman office worker',
  category: 'People & Body',
  aliases: ['woman_office_worker'],
  tags: ['business'],
  unicode_version: '',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '🧑‍🔬',
  description: 'scientist',
  category: 'People & Body',
  aliases: ['scientist'],
  tags: [],
  unicode_version: '12.1',
  ios_version: '13.2',
  skin_tones: true
}, {
  emoji: '👨‍🔬',
  description: 'man scientist',
  category: 'People & Body',
  aliases: ['man_scientist'],
  tags: ['research'],
  unicode_version: '',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '👩‍🔬',
  description: 'woman scientist',
  category: 'People & Body',
  aliases: ['woman_scientist'],
  tags: ['research'],
  unicode_version: '',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '🧑‍💻',
  description: 'technologist',
  category: 'People & Body',
  aliases: ['technologist'],
  tags: [],
  unicode_version: '12.1',
  ios_version: '13.2',
  skin_tones: true
}, {
  emoji: '👨‍💻',
  description: 'man technologist',
  category: 'People & Body',
  aliases: ['man_technologist'],
  tags: ['coder'],
  unicode_version: '',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '👩‍💻',
  description: 'woman technologist',
  category: 'People & Body',
  aliases: ['woman_technologist'],
  tags: ['coder'],
  unicode_version: '',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '🧑‍🎤',
  description: 'singer',
  category: 'People & Body',
  aliases: ['singer'],
  tags: [],
  unicode_version: '12.1',
  ios_version: '13.2',
  skin_tones: true
}, {
  emoji: '👨‍🎤',
  description: 'man singer',
  category: 'People & Body',
  aliases: ['man_singer'],
  tags: ['rockstar'],
  unicode_version: '',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '👩‍🎤',
  description: 'woman singer',
  category: 'People & Body',
  aliases: ['woman_singer'],
  tags: ['rockstar'],
  unicode_version: '',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '🧑‍🎨',
  description: 'artist',
  category: 'People & Body',
  aliases: ['artist'],
  tags: [],
  unicode_version: '12.1',
  ios_version: '13.2',
  skin_tones: true
}, {
  emoji: '👨‍🎨',
  description: 'man artist',
  category: 'People & Body',
  aliases: ['man_artist'],
  tags: ['painter'],
  unicode_version: '',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '👩‍🎨',
  description: 'woman artist',
  category: 'People & Body',
  aliases: ['woman_artist'],
  tags: ['painter'],
  unicode_version: '',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '🧑‍✈️',
  description: 'pilot',
  category: 'People & Body',
  aliases: ['pilot'],
  tags: [],
  unicode_version: '12.1',
  ios_version: '13.2',
  skin_tones: true
}, {
  emoji: '👨‍✈️',
  description: 'man pilot',
  category: 'People & Body',
  aliases: ['man_pilot'],
  tags: [],
  unicode_version: '',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '👩‍✈️',
  description: 'woman pilot',
  category: 'People & Body',
  aliases: ['woman_pilot'],
  tags: [],
  unicode_version: '',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '🧑‍🚀',
  description: 'astronaut',
  category: 'People & Body',
  aliases: ['astronaut'],
  tags: [],
  unicode_version: '12.1',
  ios_version: '13.2',
  skin_tones: true
}, {
  emoji: '👨‍🚀',
  description: 'man astronaut',
  category: 'People & Body',
  aliases: ['man_astronaut'],
  tags: ['space'],
  unicode_version: '',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '👩‍🚀',
  description: 'woman astronaut',
  category: 'People & Body',
  aliases: ['woman_astronaut'],
  tags: ['space'],
  unicode_version: '',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '🧑‍🚒',
  description: 'firefighter',
  category: 'People & Body',
  aliases: ['firefighter'],
  tags: [],
  unicode_version: '12.1',
  ios_version: '13.2',
  skin_tones: true
}, {
  emoji: '👨‍🚒',
  description: 'man firefighter',
  category: 'People & Body',
  aliases: ['man_firefighter'],
  tags: [],
  unicode_version: '',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '👩‍🚒',
  description: 'woman firefighter',
  category: 'People & Body',
  aliases: ['woman_firefighter'],
  tags: [],
  unicode_version: '',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '👮',
  description: 'police officer',
  category: 'People & Body',
  aliases: ['police_officer', 'cop'],
  tags: ['law'],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '👮‍♂️',
  description: 'man police officer',
  category: 'People & Body',
  aliases: ['policeman'],
  tags: ['law', 'cop'],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '👮‍♀️',
  description: 'woman police officer',
  category: 'People & Body',
  aliases: ['policewoman'],
  tags: ['law', 'cop'],
  unicode_version: '6.0',
  ios_version: '10.0',
  skin_tones: true
}, {
  emoji: '🕵️',
  description: 'detective',
  category: 'People & Body',
  aliases: ['detective'],
  tags: ['sleuth'],
  unicode_version: '7.0',
  ios_version: '9.1',
  skin_tones: true
}, {
  emoji: '🕵️‍♂️',
  description: 'man detective',
  category: 'People & Body',
  aliases: ['male_detective'],
  tags: ['sleuth'],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🕵️‍♀️',
  description: 'woman detective',
  category: 'People & Body',
  aliases: ['female_detective'],
  tags: ['sleuth'],
  unicode_version: '6.0',
  ios_version: '10.0',
  skin_tones: true
}, {
  emoji: '💂',
  description: 'guard',
  category: 'People & Body',
  aliases: ['guard'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '💂‍♂️',
  description: 'man guard',
  category: 'People & Body',
  aliases: ['guardsman'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '💂‍♀️',
  description: 'woman guard',
  category: 'People & Body',
  aliases: ['guardswoman'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '10.0',
  skin_tones: true
}, {
  emoji: '🥷',
  description: 'ninja',
  category: 'People & Body',
  aliases: ['ninja'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0',
  skin_tones: true
}, {
  emoji: '👷',
  description: 'construction worker',
  category: 'People & Body',
  aliases: ['construction_worker'],
  tags: ['helmet'],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '👷‍♂️',
  description: 'man construction worker',
  category: 'People & Body',
  aliases: ['construction_worker_man'],
  tags: ['helmet'],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '👷‍♀️',
  description: 'woman construction worker',
  category: 'People & Body',
  aliases: ['construction_worker_woman'],
  tags: ['helmet'],
  unicode_version: '6.0',
  ios_version: '10.0',
  skin_tones: true
}, {
  emoji: '🤴',
  description: 'prince',
  category: 'People & Body',
  aliases: ['prince'],
  tags: ['crown', 'royal'],
  unicode_version: '9.0',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '👸',
  description: 'princess',
  category: 'People & Body',
  aliases: ['princess'],
  tags: ['crown', 'royal'],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '👳',
  description: 'person wearing turban',
  category: 'People & Body',
  aliases: ['person_with_turban'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '👳‍♂️',
  description: 'man wearing turban',
  category: 'People & Body',
  aliases: ['man_with_turban'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '👳‍♀️',
  description: 'woman wearing turban',
  category: 'People & Body',
  aliases: ['woman_with_turban'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '10.0',
  skin_tones: true
}, {
  emoji: '👲',
  description: 'person with skullcap',
  category: 'People & Body',
  aliases: ['man_with_gua_pi_mao'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '🧕',
  description: 'woman with headscarf',
  category: 'People & Body',
  aliases: ['woman_with_headscarf'],
  tags: ['hijab'],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🤵',
  description: 'person in tuxedo',
  category: 'People & Body',
  aliases: ['person_in_tuxedo'],
  tags: ['groom', 'marriage', 'wedding'],
  unicode_version: '9.0',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '🤵‍♂️',
  description: 'man in tuxedo',
  category: 'People & Body',
  aliases: ['man_in_tuxedo'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0',
  skin_tones: true
}, {
  emoji: '🤵‍♀️',
  description: 'woman in tuxedo',
  category: 'People & Body',
  aliases: ['woman_in_tuxedo'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0',
  skin_tones: true
}, {
  emoji: '👰',
  description: 'person with veil',
  category: 'People & Body',
  aliases: ['person_with_veil'],
  tags: ['marriage', 'wedding'],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '👰‍♂️',
  description: 'man with veil',
  category: 'People & Body',
  aliases: ['man_with_veil'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0',
  skin_tones: true
}, {
  emoji: '👰‍♀️',
  description: 'woman with veil',
  category: 'People & Body',
  aliases: ['woman_with_veil', 'bride_with_veil'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0',
  skin_tones: true
}, {
  emoji: '🤰',
  description: 'pregnant woman',
  category: 'People & Body',
  aliases: ['pregnant_woman'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '🤱',
  description: 'breast-feeding',
  category: 'People & Body',
  aliases: ['breast_feeding'],
  tags: ['nursing'],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '👩‍🍼',
  description: 'woman feeding baby',
  category: 'People & Body',
  aliases: ['woman_feeding_baby'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0',
  skin_tones: true
}, {
  emoji: '👨‍🍼',
  description: 'man feeding baby',
  category: 'People & Body',
  aliases: ['man_feeding_baby'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0',
  skin_tones: true
}, {
  emoji: '🧑‍🍼',
  description: 'person feeding baby',
  category: 'People & Body',
  aliases: ['person_feeding_baby'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0',
  skin_tones: true
}, {
  emoji: '👼',
  description: 'baby angel',
  category: 'People & Body',
  aliases: ['angel'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '🎅',
  description: 'Santa Claus',
  category: 'People & Body',
  aliases: ['santa'],
  tags: ['christmas'],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '🤶',
  description: 'Mrs. Claus',
  category: 'People & Body',
  aliases: ['mrs_claus'],
  tags: ['santa'],
  unicode_version: '9.0',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '🧑‍🎄',
  description: 'mx claus',
  category: 'People & Body',
  aliases: ['mx_claus'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0',
  skin_tones: true
}, {
  emoji: '🦸',
  description: 'superhero',
  category: 'People & Body',
  aliases: ['superhero'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🦸‍♂️',
  description: 'man superhero',
  category: 'People & Body',
  aliases: ['superhero_man'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🦸‍♀️',
  description: 'woman superhero',
  category: 'People & Body',
  aliases: ['superhero_woman'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🦹',
  description: 'supervillain',
  category: 'People & Body',
  aliases: ['supervillain'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🦹‍♂️',
  description: 'man supervillain',
  category: 'People & Body',
  aliases: ['supervillain_man'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🦹‍♀️',
  description: 'woman supervillain',
  category: 'People & Body',
  aliases: ['supervillain_woman'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🧙',
  description: 'mage',
  category: 'People & Body',
  aliases: ['mage'],
  tags: ['wizard'],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🧙‍♂️',
  description: 'man mage',
  category: 'People & Body',
  aliases: ['mage_man'],
  tags: ['wizard'],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🧙‍♀️',
  description: 'woman mage',
  category: 'People & Body',
  aliases: ['mage_woman'],
  tags: ['wizard'],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🧚',
  description: 'fairy',
  category: 'People & Body',
  aliases: ['fairy'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🧚‍♂️',
  description: 'man fairy',
  category: 'People & Body',
  aliases: ['fairy_man'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🧚‍♀️',
  description: 'woman fairy',
  category: 'People & Body',
  aliases: ['fairy_woman'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🧛',
  description: 'vampire',
  category: 'People & Body',
  aliases: ['vampire'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🧛‍♂️',
  description: 'man vampire',
  category: 'People & Body',
  aliases: ['vampire_man'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🧛‍♀️',
  description: 'woman vampire',
  category: 'People & Body',
  aliases: ['vampire_woman'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🧜',
  description: 'merperson',
  category: 'People & Body',
  aliases: ['merperson'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🧜‍♂️',
  description: 'merman',
  category: 'People & Body',
  aliases: ['merman'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🧜‍♀️',
  description: 'mermaid',
  category: 'People & Body',
  aliases: ['mermaid'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🧝',
  description: 'elf',
  category: 'People & Body',
  aliases: ['elf'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🧝‍♂️',
  description: 'man elf',
  category: 'People & Body',
  aliases: ['elf_man'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🧝‍♀️',
  description: 'woman elf',
  category: 'People & Body',
  aliases: ['elf_woman'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🧞',
  description: 'genie',
  category: 'People & Body',
  aliases: ['genie'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🧞‍♂️',
  description: 'man genie',
  category: 'People & Body',
  aliases: ['genie_man'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🧞‍♀️',
  description: 'woman genie',
  category: 'People & Body',
  aliases: ['genie_woman'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🧟',
  description: 'zombie',
  category: 'People & Body',
  aliases: ['zombie'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🧟‍♂️',
  description: 'man zombie',
  category: 'People & Body',
  aliases: ['zombie_man'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🧟‍♀️',
  description: 'woman zombie',
  category: 'People & Body',
  aliases: ['zombie_woman'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '💆',
  description: 'person getting massage',
  category: 'People & Body',
  aliases: ['massage'],
  tags: ['spa'],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '💆‍♂️',
  description: 'man getting massage',
  category: 'People & Body',
  aliases: ['massage_man'],
  tags: ['spa'],
  unicode_version: '6.0',
  ios_version: '10.0',
  skin_tones: true
}, {
  emoji: '💆‍♀️',
  description: 'woman getting massage',
  category: 'People & Body',
  aliases: ['massage_woman'],
  tags: ['spa'],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '💇',
  description: 'person getting haircut',
  category: 'People & Body',
  aliases: ['haircut'],
  tags: ['beauty'],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '💇‍♂️',
  description: 'man getting haircut',
  category: 'People & Body',
  aliases: ['haircut_man'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '10.0',
  skin_tones: true
}, {
  emoji: '💇‍♀️',
  description: 'woman getting haircut',
  category: 'People & Body',
  aliases: ['haircut_woman'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🚶',
  description: 'person walking',
  category: 'People & Body',
  aliases: ['walking'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '🚶‍♂️',
  description: 'man walking',
  category: 'People & Body',
  aliases: ['walking_man'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🚶‍♀️',
  description: 'woman walking',
  category: 'People & Body',
  aliases: ['walking_woman'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '10.0',
  skin_tones: true
}, {
  emoji: '🧍',
  description: 'person standing',
  category: 'People & Body',
  aliases: ['standing_person'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0',
  skin_tones: true
}, {
  emoji: '🧍‍♂️',
  description: 'man standing',
  category: 'People & Body',
  aliases: ['standing_man'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0',
  skin_tones: true
}, {
  emoji: '🧍‍♀️',
  description: 'woman standing',
  category: 'People & Body',
  aliases: ['standing_woman'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0',
  skin_tones: true
}, {
  emoji: '🧎',
  description: 'person kneeling',
  category: 'People & Body',
  aliases: ['kneeling_person'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0',
  skin_tones: true
}, {
  emoji: '🧎‍♂️',
  description: 'man kneeling',
  category: 'People & Body',
  aliases: ['kneeling_man'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0',
  skin_tones: true
}, {
  emoji: '🧎‍♀️',
  description: 'woman kneeling',
  category: 'People & Body',
  aliases: ['kneeling_woman'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0',
  skin_tones: true
}, {
  emoji: '🧑‍🦯',
  description: 'person with white cane',
  category: 'People & Body',
  aliases: ['person_with_probing_cane'],
  tags: [],
  unicode_version: '12.1',
  ios_version: '13.2',
  skin_tones: true
}, {
  emoji: '👨‍🦯',
  description: 'man with white cane',
  category: 'People & Body',
  aliases: ['man_with_probing_cane'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0',
  skin_tones: true
}, {
  emoji: '👩‍🦯',
  description: 'woman with white cane',
  category: 'People & Body',
  aliases: ['woman_with_probing_cane'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0',
  skin_tones: true
}, {
  emoji: '🧑‍🦼',
  description: 'person in motorized wheelchair',
  category: 'People & Body',
  aliases: ['person_in_motorized_wheelchair'],
  tags: [],
  unicode_version: '12.1',
  ios_version: '13.2',
  skin_tones: true
}, {
  emoji: '👨‍🦼',
  description: 'man in motorized wheelchair',
  category: 'People & Body',
  aliases: ['man_in_motorized_wheelchair'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0',
  skin_tones: true
}, {
  emoji: '👩‍🦼',
  description: 'woman in motorized wheelchair',
  category: 'People & Body',
  aliases: ['woman_in_motorized_wheelchair'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0',
  skin_tones: true
}, {
  emoji: '🧑‍🦽',
  description: 'person in manual wheelchair',
  category: 'People & Body',
  aliases: ['person_in_manual_wheelchair'],
  tags: [],
  unicode_version: '12.1',
  ios_version: '13.2',
  skin_tones: true
}, {
  emoji: '👨‍🦽',
  description: 'man in manual wheelchair',
  category: 'People & Body',
  aliases: ['man_in_manual_wheelchair'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0',
  skin_tones: true
}, {
  emoji: '👩‍🦽',
  description: 'woman in manual wheelchair',
  category: 'People & Body',
  aliases: ['woman_in_manual_wheelchair'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0',
  skin_tones: true
}, {
  emoji: '🏃',
  description: 'person running',
  category: 'People & Body',
  aliases: ['runner', 'running'],
  tags: ['exercise', 'workout', 'marathon'],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '🏃‍♂️',
  description: 'man running',
  category: 'People & Body',
  aliases: ['running_man'],
  tags: ['exercise', 'workout', 'marathon'],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🏃‍♀️',
  description: 'woman running',
  category: 'People & Body',
  aliases: ['running_woman'],
  tags: ['exercise', 'workout', 'marathon'],
  unicode_version: '6.0',
  ios_version: '10.0',
  skin_tones: true
}, {
  emoji: '💃',
  description: 'woman dancing',
  category: 'People & Body',
  aliases: ['woman_dancing', 'dancer'],
  tags: ['dress'],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '🕺',
  description: 'man dancing',
  category: 'People & Body',
  aliases: ['man_dancing'],
  tags: ['dancer'],
  unicode_version: '9.0',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '🕴️',
  description: 'person in suit levitating',
  category: 'People & Body',
  aliases: ['business_suit_levitating'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1',
  skin_tones: true
}, {
  emoji: '👯',
  description: 'people with bunny ears',
  category: 'People & Body',
  aliases: ['dancers'],
  tags: ['bunny'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '👯‍♂️',
  description: 'men with bunny ears',
  category: 'People & Body',
  aliases: ['dancing_men'],
  tags: ['bunny'],
  unicode_version: '6.0',
  ios_version: '10.0'
}, {
  emoji: '👯‍♀️',
  description: 'women with bunny ears',
  category: 'People & Body',
  aliases: ['dancing_women'],
  tags: ['bunny'],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🧖',
  description: 'person in steamy room',
  category: 'People & Body',
  aliases: ['sauna_person'],
  tags: ['steamy'],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🧖‍♂️',
  description: 'man in steamy room',
  category: 'People & Body',
  aliases: ['sauna_man'],
  tags: ['steamy'],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🧖‍♀️',
  description: 'woman in steamy room',
  category: 'People & Body',
  aliases: ['sauna_woman'],
  tags: ['steamy'],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🧗',
  description: 'person climbing',
  category: 'People & Body',
  aliases: ['climbing'],
  tags: ['bouldering'],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🧗‍♂️',
  description: 'man climbing',
  category: 'People & Body',
  aliases: ['climbing_man'],
  tags: ['bouldering'],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🧗‍♀️',
  description: 'woman climbing',
  category: 'People & Body',
  aliases: ['climbing_woman'],
  tags: ['bouldering'],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🤺',
  description: 'person fencing',
  category: 'People & Body',
  aliases: ['person_fencing'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🏇',
  description: 'horse racing',
  category: 'People & Body',
  aliases: ['horse_racing'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '⛷️',
  description: 'skier',
  category: 'People & Body',
  aliases: ['skier'],
  tags: [],
  unicode_version: '5.2',
  ios_version: '9.1'
}, {
  emoji: '🏂',
  description: 'snowboarder',
  category: 'People & Body',
  aliases: ['snowboarder'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '🏌️',
  description: 'person golfing',
  category: 'People & Body',
  aliases: ['golfing'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1',
  skin_tones: true
}, {
  emoji: '🏌️‍♂️',
  description: 'man golfing',
  category: 'People & Body',
  aliases: ['golfing_man'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🏌️‍♀️',
  description: 'woman golfing',
  category: 'People & Body',
  aliases: ['golfing_woman'],
  tags: [],
  unicode_version: '',
  ios_version: '10.0',
  skin_tones: true
}, {
  emoji: '🏄',
  description: 'person surfing',
  category: 'People & Body',
  aliases: ['surfer'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '🏄‍♂️',
  description: 'man surfing',
  category: 'People & Body',
  aliases: ['surfing_man'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🏄‍♀️',
  description: 'woman surfing',
  category: 'People & Body',
  aliases: ['surfing_woman'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '10.0',
  skin_tones: true
}, {
  emoji: '🚣',
  description: 'person rowing boat',
  category: 'People & Body',
  aliases: ['rowboat'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '🚣‍♂️',
  description: 'man rowing boat',
  category: 'People & Body',
  aliases: ['rowing_man'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🚣‍♀️',
  description: 'woman rowing boat',
  category: 'People & Body',
  aliases: ['rowing_woman'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '10.0',
  skin_tones: true
}, {
  emoji: '🏊',
  description: 'person swimming',
  category: 'People & Body',
  aliases: ['swimmer'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '🏊‍♂️',
  description: 'man swimming',
  category: 'People & Body',
  aliases: ['swimming_man'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🏊‍♀️',
  description: 'woman swimming',
  category: 'People & Body',
  aliases: ['swimming_woman'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '10.0',
  skin_tones: true
}, {
  emoji: '⛹️',
  description: 'person bouncing ball',
  category: 'People & Body',
  aliases: ['bouncing_ball_person'],
  tags: ['basketball'],
  unicode_version: '5.2',
  ios_version: '9.1',
  skin_tones: true
}, {
  emoji: '⛹️‍♂️',
  description: 'man bouncing ball',
  category: 'People & Body',
  aliases: ['bouncing_ball_man', 'basketball_man'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '⛹️‍♀️',
  description: 'woman bouncing ball',
  category: 'People & Body',
  aliases: ['bouncing_ball_woman', 'basketball_woman'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '10.0',
  skin_tones: true
}, {
  emoji: '🏋️',
  description: 'person lifting weights',
  category: 'People & Body',
  aliases: ['weight_lifting'],
  tags: ['gym', 'workout'],
  unicode_version: '7.0',
  ios_version: '9.1',
  skin_tones: true
}, {
  emoji: '🏋️‍♂️',
  description: 'man lifting weights',
  category: 'People & Body',
  aliases: ['weight_lifting_man'],
  tags: ['gym', 'workout'],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🏋️‍♀️',
  description: 'woman lifting weights',
  category: 'People & Body',
  aliases: ['weight_lifting_woman'],
  tags: ['gym', 'workout'],
  unicode_version: '6.0',
  ios_version: '10.0',
  skin_tones: true
}, {
  emoji: '🚴',
  description: 'person biking',
  category: 'People & Body',
  aliases: ['bicyclist'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '🚴‍♂️',
  description: 'man biking',
  category: 'People & Body',
  aliases: ['biking_man'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🚴‍♀️',
  description: 'woman biking',
  category: 'People & Body',
  aliases: ['biking_woman'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '10.0',
  skin_tones: true
}, {
  emoji: '🚵',
  description: 'person mountain biking',
  category: 'People & Body',
  aliases: ['mountain_bicyclist'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '🚵‍♂️',
  description: 'man mountain biking',
  category: 'People & Body',
  aliases: ['mountain_biking_man'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🚵‍♀️',
  description: 'woman mountain biking',
  category: 'People & Body',
  aliases: ['mountain_biking_woman'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '10.0',
  skin_tones: true
}, {
  emoji: '🤸',
  description: 'person cartwheeling',
  category: 'People & Body',
  aliases: ['cartwheeling'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🤸‍♂️',
  description: 'man cartwheeling',
  category: 'People & Body',
  aliases: ['man_cartwheeling'],
  tags: [],
  unicode_version: '',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '🤸‍♀️',
  description: 'woman cartwheeling',
  category: 'People & Body',
  aliases: ['woman_cartwheeling'],
  tags: [],
  unicode_version: '',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '🤼',
  description: 'people wrestling',
  category: 'People & Body',
  aliases: ['wrestling'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🤼‍♂️',
  description: 'men wrestling',
  category: 'People & Body',
  aliases: ['men_wrestling'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🤼‍♀️',
  description: 'women wrestling',
  category: 'People & Body',
  aliases: ['women_wrestling'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🤽',
  description: 'person playing water polo',
  category: 'People & Body',
  aliases: ['water_polo'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🤽‍♂️',
  description: 'man playing water polo',
  category: 'People & Body',
  aliases: ['man_playing_water_polo'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '🤽‍♀️',
  description: 'woman playing water polo',
  category: 'People & Body',
  aliases: ['woman_playing_water_polo'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '🤾',
  description: 'person playing handball',
  category: 'People & Body',
  aliases: ['handball_person'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🤾‍♂️',
  description: 'man playing handball',
  category: 'People & Body',
  aliases: ['man_playing_handball'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '🤾‍♀️',
  description: 'woman playing handball',
  category: 'People & Body',
  aliases: ['woman_playing_handball'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '🤹',
  description: 'person juggling',
  category: 'People & Body',
  aliases: ['juggling_person'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🤹‍♂️',
  description: 'man juggling',
  category: 'People & Body',
  aliases: ['man_juggling'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '🤹‍♀️',
  description: 'woman juggling',
  category: 'People & Body',
  aliases: ['woman_juggling'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2',
  skin_tones: true
}, {
  emoji: '🧘',
  description: 'person in lotus position',
  category: 'People & Body',
  aliases: ['lotus_position'],
  tags: ['meditation'],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🧘‍♂️',
  description: 'man in lotus position',
  category: 'People & Body',
  aliases: ['lotus_position_man'],
  tags: ['meditation'],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🧘‍♀️',
  description: 'woman in lotus position',
  category: 'People & Body',
  aliases: ['lotus_position_woman'],
  tags: ['meditation'],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '🛀',
  description: 'person taking bath',
  category: 'People & Body',
  aliases: ['bath'],
  tags: ['shower'],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '🛌',
  description: 'person in bed',
  category: 'People & Body',
  aliases: ['sleeping_bed'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1',
  skin_tones: true
}, {
  emoji: '🧑‍🤝‍🧑',
  description: 'people holding hands',
  category: 'People & Body',
  aliases: ['people_holding_hands'],
  tags: ['couple', 'date'],
  unicode_version: '12.0',
  ios_version: '13.0',
  skin_tones: true
}, {
  emoji: '👭',
  description: 'women holding hands',
  category: 'People & Body',
  aliases: ['two_women_holding_hands'],
  tags: ['couple', 'date'],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '👫',
  description: 'woman and man holding hands',
  category: 'People & Body',
  aliases: ['couple'],
  tags: ['date'],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '👬',
  description: 'men holding hands',
  category: 'People & Body',
  aliases: ['two_men_holding_hands'],
  tags: ['couple', 'date'],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '💏',
  description: 'kiss',
  category: 'People & Body',
  aliases: ['couplekiss'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '👩‍❤️‍💋‍👨',
  description: 'kiss: woman, man',
  category: 'People & Body',
  aliases: ['couplekiss_man_woman'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '👨‍❤️‍💋‍👨',
  description: 'kiss: man, man',
  category: 'People & Body',
  aliases: ['couplekiss_man_man'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3',
  skin_tones: true
}, {
  emoji: '👩‍❤️‍💋‍👩',
  description: 'kiss: woman, woman',
  category: 'People & Body',
  aliases: ['couplekiss_woman_woman'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3',
  skin_tones: true
}, {
  emoji: '💑',
  description: 'couple with heart',
  category: 'People & Body',
  aliases: ['couple_with_heart'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0',
  skin_tones: true
}, {
  emoji: '👩‍❤️‍👨',
  description: 'couple with heart: woman, man',
  category: 'People & Body',
  aliases: ['couple_with_heart_woman_man'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1',
  skin_tones: true
}, {
  emoji: '👨‍❤️‍👨',
  description: 'couple with heart: man, man',
  category: 'People & Body',
  aliases: ['couple_with_heart_man_man'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3',
  skin_tones: true
}, {
  emoji: '👩‍❤️‍👩',
  description: 'couple with heart: woman, woman',
  category: 'People & Body',
  aliases: ['couple_with_heart_woman_woman'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3',
  skin_tones: true
}, {
  emoji: '👪',
  description: 'family',
  category: 'People & Body',
  aliases: ['family'],
  tags: ['home', 'parents', 'child'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '👨‍👩‍👦',
  description: 'family: man, woman, boy',
  category: 'People & Body',
  aliases: ['family_man_woman_boy'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '👨‍👩‍👧',
  description: 'family: man, woman, girl',
  category: 'People & Body',
  aliases: ['family_man_woman_girl'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '👨‍👩‍👧‍👦',
  description: 'family: man, woman, girl, boy',
  category: 'People & Body',
  aliases: ['family_man_woman_girl_boy'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '👨‍👩‍👦‍👦',
  description: 'family: man, woman, boy, boy',
  category: 'People & Body',
  aliases: ['family_man_woman_boy_boy'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '👨‍👩‍👧‍👧',
  description: 'family: man, woman, girl, girl',
  category: 'People & Body',
  aliases: ['family_man_woman_girl_girl'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '👨‍👨‍👦',
  description: 'family: man, man, boy',
  category: 'People & Body',
  aliases: ['family_man_man_boy'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '👨‍👨‍👧',
  description: 'family: man, man, girl',
  category: 'People & Body',
  aliases: ['family_man_man_girl'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '👨‍👨‍👧‍👦',
  description: 'family: man, man, girl, boy',
  category: 'People & Body',
  aliases: ['family_man_man_girl_boy'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '👨‍👨‍👦‍👦',
  description: 'family: man, man, boy, boy',
  category: 'People & Body',
  aliases: ['family_man_man_boy_boy'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '👨‍👨‍👧‍👧',
  description: 'family: man, man, girl, girl',
  category: 'People & Body',
  aliases: ['family_man_man_girl_girl'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '👩‍👩‍👦',
  description: 'family: woman, woman, boy',
  category: 'People & Body',
  aliases: ['family_woman_woman_boy'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '👩‍👩‍👧',
  description: 'family: woman, woman, girl',
  category: 'People & Body',
  aliases: ['family_woman_woman_girl'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '👩‍👩‍👧‍👦',
  description: 'family: woman, woman, girl, boy',
  category: 'People & Body',
  aliases: ['family_woman_woman_girl_boy'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '👩‍👩‍👦‍👦',
  description: 'family: woman, woman, boy, boy',
  category: 'People & Body',
  aliases: ['family_woman_woman_boy_boy'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '👩‍👩‍👧‍👧',
  description: 'family: woman, woman, girl, girl',
  category: 'People & Body',
  aliases: ['family_woman_woman_girl_girl'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '👨‍👦',
  description: 'family: man, boy',
  category: 'People & Body',
  aliases: ['family_man_boy'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '10.0'
}, {
  emoji: '👨‍👦‍👦',
  description: 'family: man, boy, boy',
  category: 'People & Body',
  aliases: ['family_man_boy_boy'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '10.0'
}, {
  emoji: '👨‍👧',
  description: 'family: man, girl',
  category: 'People & Body',
  aliases: ['family_man_girl'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '10.0'
}, {
  emoji: '👨‍👧‍👦',
  description: 'family: man, girl, boy',
  category: 'People & Body',
  aliases: ['family_man_girl_boy'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '10.0'
}, {
  emoji: '👨‍👧‍👧',
  description: 'family: man, girl, girl',
  category: 'People & Body',
  aliases: ['family_man_girl_girl'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '10.0'
}, {
  emoji: '👩‍👦',
  description: 'family: woman, boy',
  category: 'People & Body',
  aliases: ['family_woman_boy'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '10.0'
}, {
  emoji: '👩‍👦‍👦',
  description: 'family: woman, boy, boy',
  category: 'People & Body',
  aliases: ['family_woman_boy_boy'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '10.0'
}, {
  emoji: '👩‍👧',
  description: 'family: woman, girl',
  category: 'People & Body',
  aliases: ['family_woman_girl'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '10.0'
}, {
  emoji: '👩‍👧‍👦',
  description: 'family: woman, girl, boy',
  category: 'People & Body',
  aliases: ['family_woman_girl_boy'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '10.0'
}, {
  emoji: '👩‍👧‍👧',
  description: 'family: woman, girl, girl',
  category: 'People & Body',
  aliases: ['family_woman_girl_girl'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '10.0'
}, {
  emoji: '🗣️',
  description: 'speaking head',
  category: 'People & Body',
  aliases: ['speaking_head'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '👤',
  description: 'bust in silhouette',
  category: 'People & Body',
  aliases: ['bust_in_silhouette'],
  tags: ['user'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '👥',
  description: 'busts in silhouette',
  category: 'People & Body',
  aliases: ['busts_in_silhouette'],
  tags: ['users', 'group', 'team'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🫂',
  description: 'people hugging',
  category: 'People & Body',
  aliases: ['people_hugging'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '👣',
  description: 'footprints',
  category: 'People & Body',
  aliases: ['footprints'],
  tags: ['feet', 'tracks'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐵',
  description: 'monkey face',
  category: 'Animals & Nature',
  aliases: ['monkey_face'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐒',
  description: 'monkey',
  category: 'Animals & Nature',
  aliases: ['monkey'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🦍',
  description: 'gorilla',
  category: 'Animals & Nature',
  aliases: ['gorilla'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🦧',
  description: 'orangutan',
  category: 'Animals & Nature',
  aliases: ['orangutan'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🐶',
  description: 'dog face',
  category: 'Animals & Nature',
  aliases: ['dog'],
  tags: ['pet'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐕',
  description: 'dog',
  category: 'Animals & Nature',
  aliases: ['dog2'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🦮',
  description: 'guide dog',
  category: 'Animals & Nature',
  aliases: ['guide_dog'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🐕‍🦺',
  description: 'service dog',
  category: 'Animals & Nature',
  aliases: ['service_dog'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🐩',
  description: 'poodle',
  category: 'Animals & Nature',
  aliases: ['poodle'],
  tags: ['dog'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐺',
  description: 'wolf',
  category: 'Animals & Nature',
  aliases: ['wolf'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🦊',
  description: 'fox',
  category: 'Animals & Nature',
  aliases: ['fox_face'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🦝',
  description: 'raccoon',
  category: 'Animals & Nature',
  aliases: ['raccoon'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🐱',
  description: 'cat face',
  category: 'Animals & Nature',
  aliases: ['cat'],
  tags: ['pet'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐈',
  description: 'cat',
  category: 'Animals & Nature',
  aliases: ['cat2'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐈‍⬛',
  description: 'black cat',
  category: 'Animals & Nature',
  aliases: ['black_cat'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🦁',
  description: 'lion',
  category: 'Animals & Nature',
  aliases: ['lion'],
  tags: [],
  unicode_version: '8.0',
  ios_version: '9.1'
}, {
  emoji: '🐯',
  description: 'tiger face',
  category: 'Animals & Nature',
  aliases: ['tiger'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐅',
  description: 'tiger',
  category: 'Animals & Nature',
  aliases: ['tiger2'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐆',
  description: 'leopard',
  category: 'Animals & Nature',
  aliases: ['leopard'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐴',
  description: 'horse face',
  category: 'Animals & Nature',
  aliases: ['horse'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐎',
  description: 'horse',
  category: 'Animals & Nature',
  aliases: ['racehorse'],
  tags: ['speed'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🦄',
  description: 'unicorn',
  category: 'Animals & Nature',
  aliases: ['unicorn'],
  tags: [],
  unicode_version: '8.0',
  ios_version: '9.1'
}, {
  emoji: '🦓',
  description: 'zebra',
  category: 'Animals & Nature',
  aliases: ['zebra'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🦌',
  description: 'deer',
  category: 'Animals & Nature',
  aliases: ['deer'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🦬',
  description: 'bison',
  category: 'Animals & Nature',
  aliases: ['bison'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🐮',
  description: 'cow face',
  category: 'Animals & Nature',
  aliases: ['cow'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐂',
  description: 'ox',
  category: 'Animals & Nature',
  aliases: ['ox'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐃',
  description: 'water buffalo',
  category: 'Animals & Nature',
  aliases: ['water_buffalo'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐄',
  description: 'cow',
  category: 'Animals & Nature',
  aliases: ['cow2'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐷',
  description: 'pig face',
  category: 'Animals & Nature',
  aliases: ['pig'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐖',
  description: 'pig',
  category: 'Animals & Nature',
  aliases: ['pig2'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐗',
  description: 'boar',
  category: 'Animals & Nature',
  aliases: ['boar'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐽',
  description: 'pig nose',
  category: 'Animals & Nature',
  aliases: ['pig_nose'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐏',
  description: 'ram',
  category: 'Animals & Nature',
  aliases: ['ram'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐑',
  description: 'ewe',
  category: 'Animals & Nature',
  aliases: ['sheep'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐐',
  description: 'goat',
  category: 'Animals & Nature',
  aliases: ['goat'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐪',
  description: 'camel',
  category: 'Animals & Nature',
  aliases: ['dromedary_camel'],
  tags: ['desert'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐫',
  description: 'two-hump camel',
  category: 'Animals & Nature',
  aliases: ['camel'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🦙',
  description: 'llama',
  category: 'Animals & Nature',
  aliases: ['llama'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🦒',
  description: 'giraffe',
  category: 'Animals & Nature',
  aliases: ['giraffe'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🐘',
  description: 'elephant',
  category: 'Animals & Nature',
  aliases: ['elephant'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🦣',
  description: 'mammoth',
  category: 'Animals & Nature',
  aliases: ['mammoth'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🦏',
  description: 'rhinoceros',
  category: 'Animals & Nature',
  aliases: ['rhinoceros'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🦛',
  description: 'hippopotamus',
  category: 'Animals & Nature',
  aliases: ['hippopotamus'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🐭',
  description: 'mouse face',
  category: 'Animals & Nature',
  aliases: ['mouse'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐁',
  description: 'mouse',
  category: 'Animals & Nature',
  aliases: ['mouse2'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐀',
  description: 'rat',
  category: 'Animals & Nature',
  aliases: ['rat'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐹',
  description: 'hamster',
  category: 'Animals & Nature',
  aliases: ['hamster'],
  tags: ['pet'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐰',
  description: 'rabbit face',
  category: 'Animals & Nature',
  aliases: ['rabbit'],
  tags: ['bunny'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐇',
  description: 'rabbit',
  category: 'Animals & Nature',
  aliases: ['rabbit2'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐿️',
  description: 'chipmunk',
  category: 'Animals & Nature',
  aliases: ['chipmunk'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🦫',
  description: 'beaver',
  category: 'Animals & Nature',
  aliases: ['beaver'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🦔',
  description: 'hedgehog',
  category: 'Animals & Nature',
  aliases: ['hedgehog'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🦇',
  description: 'bat',
  category: 'Animals & Nature',
  aliases: ['bat'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🐻',
  description: 'bear',
  category: 'Animals & Nature',
  aliases: ['bear'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐻‍❄️',
  description: 'polar bear',
  category: 'Animals & Nature',
  aliases: ['polar_bear'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🐨',
  description: 'koala',
  category: 'Animals & Nature',
  aliases: ['koala'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐼',
  description: 'panda',
  category: 'Animals & Nature',
  aliases: ['panda_face'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🦥',
  description: 'sloth',
  category: 'Animals & Nature',
  aliases: ['sloth'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🦦',
  description: 'otter',
  category: 'Animals & Nature',
  aliases: ['otter'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🦨',
  description: 'skunk',
  category: 'Animals & Nature',
  aliases: ['skunk'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🦘',
  description: 'kangaroo',
  category: 'Animals & Nature',
  aliases: ['kangaroo'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🦡',
  description: 'badger',
  category: 'Animals & Nature',
  aliases: ['badger'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🐾',
  description: 'paw prints',
  category: 'Animals & Nature',
  aliases: ['feet', 'paw_prints'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🦃',
  description: 'turkey',
  category: 'Animals & Nature',
  aliases: ['turkey'],
  tags: ['thanksgiving'],
  unicode_version: '8.0',
  ios_version: '9.1'
}, {
  emoji: '🐔',
  description: 'chicken',
  category: 'Animals & Nature',
  aliases: ['chicken'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐓',
  description: 'rooster',
  category: 'Animals & Nature',
  aliases: ['rooster'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐣',
  description: 'hatching chick',
  category: 'Animals & Nature',
  aliases: ['hatching_chick'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐤',
  description: 'baby chick',
  category: 'Animals & Nature',
  aliases: ['baby_chick'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐥',
  description: 'front-facing baby chick',
  category: 'Animals & Nature',
  aliases: ['hatched_chick'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐦',
  description: 'bird',
  category: 'Animals & Nature',
  aliases: ['bird'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐧',
  description: 'penguin',
  category: 'Animals & Nature',
  aliases: ['penguin'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🕊️',
  description: 'dove',
  category: 'Animals & Nature',
  aliases: ['dove'],
  tags: ['peace'],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🦅',
  description: 'eagle',
  category: 'Animals & Nature',
  aliases: ['eagle'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🦆',
  description: 'duck',
  category: 'Animals & Nature',
  aliases: ['duck'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🦢',
  description: 'swan',
  category: 'Animals & Nature',
  aliases: ['swan'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🦉',
  description: 'owl',
  category: 'Animals & Nature',
  aliases: ['owl'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🦤',
  description: 'dodo',
  category: 'Animals & Nature',
  aliases: ['dodo'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🪶',
  description: 'feather',
  category: 'Animals & Nature',
  aliases: ['feather'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🦩',
  description: 'flamingo',
  category: 'Animals & Nature',
  aliases: ['flamingo'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🦚',
  description: 'peacock',
  category: 'Animals & Nature',
  aliases: ['peacock'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🦜',
  description: 'parrot',
  category: 'Animals & Nature',
  aliases: ['parrot'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🐸',
  description: 'frog',
  category: 'Animals & Nature',
  aliases: ['frog'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐊',
  description: 'crocodile',
  category: 'Animals & Nature',
  aliases: ['crocodile'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐢',
  description: 'turtle',
  category: 'Animals & Nature',
  aliases: ['turtle'],
  tags: ['slow'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🦎',
  description: 'lizard',
  category: 'Animals & Nature',
  aliases: ['lizard'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🐍',
  description: 'snake',
  category: 'Animals & Nature',
  aliases: ['snake'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐲',
  description: 'dragon face',
  category: 'Animals & Nature',
  aliases: ['dragon_face'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐉',
  description: 'dragon',
  category: 'Animals & Nature',
  aliases: ['dragon'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🦕',
  description: 'sauropod',
  category: 'Animals & Nature',
  aliases: ['sauropod'],
  tags: ['dinosaur'],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🦖',
  description: 'T-Rex',
  category: 'Animals & Nature',
  aliases: ['t-rex'],
  tags: ['dinosaur'],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🐳',
  description: 'spouting whale',
  category: 'Animals & Nature',
  aliases: ['whale'],
  tags: ['sea'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐋',
  description: 'whale',
  category: 'Animals & Nature',
  aliases: ['whale2'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐬',
  description: 'dolphin',
  category: 'Animals & Nature',
  aliases: ['dolphin', 'flipper'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🦭',
  description: 'seal',
  category: 'Animals & Nature',
  aliases: ['seal'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🐟',
  description: 'fish',
  category: 'Animals & Nature',
  aliases: ['fish'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐠',
  description: 'tropical fish',
  category: 'Animals & Nature',
  aliases: ['tropical_fish'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐡',
  description: 'blowfish',
  category: 'Animals & Nature',
  aliases: ['blowfish'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🦈',
  description: 'shark',
  category: 'Animals & Nature',
  aliases: ['shark'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🐙',
  description: 'octopus',
  category: 'Animals & Nature',
  aliases: ['octopus'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐚',
  description: 'spiral shell',
  category: 'Animals & Nature',
  aliases: ['shell'],
  tags: ['sea', 'beach'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐌',
  description: 'snail',
  category: 'Animals & Nature',
  aliases: ['snail'],
  tags: ['slow'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🦋',
  description: 'butterfly',
  category: 'Animals & Nature',
  aliases: ['butterfly'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🐛',
  description: 'bug',
  category: 'Animals & Nature',
  aliases: ['bug'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐜',
  description: 'ant',
  category: 'Animals & Nature',
  aliases: ['ant'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🐝',
  description: 'honeybee',
  category: 'Animals & Nature',
  aliases: ['bee', 'honeybee'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🪲',
  description: 'beetle',
  category: 'Animals & Nature',
  aliases: ['beetle'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🐞',
  description: 'lady beetle',
  category: 'Animals & Nature',
  aliases: ['lady_beetle'],
  tags: ['bug'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🦗',
  description: 'cricket',
  category: 'Animals & Nature',
  aliases: ['cricket'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🪳',
  description: 'cockroach',
  category: 'Animals & Nature',
  aliases: ['cockroach'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🕷️',
  description: 'spider',
  category: 'Animals & Nature',
  aliases: ['spider'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🕸️',
  description: 'spider web',
  category: 'Animals & Nature',
  aliases: ['spider_web'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🦂',
  description: 'scorpion',
  category: 'Animals & Nature',
  aliases: ['scorpion'],
  tags: [],
  unicode_version: '8.0',
  ios_version: '9.1'
}, {
  emoji: '🦟',
  description: 'mosquito',
  category: 'Animals & Nature',
  aliases: ['mosquito'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🪰',
  description: 'fly',
  category: 'Animals & Nature',
  aliases: ['fly'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🪱',
  description: 'worm',
  category: 'Animals & Nature',
  aliases: ['worm'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🦠',
  description: 'microbe',
  category: 'Animals & Nature',
  aliases: ['microbe'],
  tags: ['germ'],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '💐',
  description: 'bouquet',
  category: 'Animals & Nature',
  aliases: ['bouquet'],
  tags: ['flowers'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌸',
  description: 'cherry blossom',
  category: 'Animals & Nature',
  aliases: ['cherry_blossom'],
  tags: ['flower', 'spring'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💮',
  description: 'white flower',
  category: 'Animals & Nature',
  aliases: ['white_flower'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🏵️',
  description: 'rosette',
  category: 'Animals & Nature',
  aliases: ['rosette'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🌹',
  description: 'rose',
  category: 'Animals & Nature',
  aliases: ['rose'],
  tags: ['flower'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🥀',
  description: 'wilted flower',
  category: 'Animals & Nature',
  aliases: ['wilted_flower'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🌺',
  description: 'hibiscus',
  category: 'Animals & Nature',
  aliases: ['hibiscus'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌻',
  description: 'sunflower',
  category: 'Animals & Nature',
  aliases: ['sunflower'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌼',
  description: 'blossom',
  category: 'Animals & Nature',
  aliases: ['blossom'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌷',
  description: 'tulip',
  category: 'Animals & Nature',
  aliases: ['tulip'],
  tags: ['flower'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌱',
  description: 'seedling',
  category: 'Animals & Nature',
  aliases: ['seedling'],
  tags: ['plant'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🪴',
  description: 'potted plant',
  category: 'Animals & Nature',
  aliases: ['potted_plant'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🌲',
  description: 'evergreen tree',
  category: 'Animals & Nature',
  aliases: ['evergreen_tree'],
  tags: ['wood'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌳',
  description: 'deciduous tree',
  category: 'Animals & Nature',
  aliases: ['deciduous_tree'],
  tags: ['wood'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌴',
  description: 'palm tree',
  category: 'Animals & Nature',
  aliases: ['palm_tree'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌵',
  description: 'cactus',
  category: 'Animals & Nature',
  aliases: ['cactus'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌾',
  description: 'sheaf of rice',
  category: 'Animals & Nature',
  aliases: ['ear_of_rice'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌿',
  description: 'herb',
  category: 'Animals & Nature',
  aliases: ['herb'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '☘️',
  description: 'shamrock',
  category: 'Animals & Nature',
  aliases: ['shamrock'],
  tags: [],
  unicode_version: '4.1',
  ios_version: '9.1'
}, {
  emoji: '🍀',
  description: 'four leaf clover',
  category: 'Animals & Nature',
  aliases: ['four_leaf_clover'],
  tags: ['luck'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍁',
  description: 'maple leaf',
  category: 'Animals & Nature',
  aliases: ['maple_leaf'],
  tags: ['canada'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍂',
  description: 'fallen leaf',
  category: 'Animals & Nature',
  aliases: ['fallen_leaf'],
  tags: ['autumn'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍃',
  description: 'leaf fluttering in wind',
  category: 'Animals & Nature',
  aliases: ['leaves'],
  tags: ['leaf'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍇',
  description: 'grapes',
  category: 'Food & Drink',
  aliases: ['grapes'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍈',
  description: 'melon',
  category: 'Food & Drink',
  aliases: ['melon'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍉',
  description: 'watermelon',
  category: 'Food & Drink',
  aliases: ['watermelon'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍊',
  description: 'tangerine',
  category: 'Food & Drink',
  aliases: ['tangerine', 'orange', 'mandarin'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍋',
  description: 'lemon',
  category: 'Food & Drink',
  aliases: ['lemon'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍌',
  description: 'banana',
  category: 'Food & Drink',
  aliases: ['banana'],
  tags: ['fruit'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍍',
  description: 'pineapple',
  category: 'Food & Drink',
  aliases: ['pineapple'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🥭',
  description: 'mango',
  category: 'Food & Drink',
  aliases: ['mango'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🍎',
  description: 'red apple',
  category: 'Food & Drink',
  aliases: ['apple'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍏',
  description: 'green apple',
  category: 'Food & Drink',
  aliases: ['green_apple'],
  tags: ['fruit'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍐',
  description: 'pear',
  category: 'Food & Drink',
  aliases: ['pear'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍑',
  description: 'peach',
  category: 'Food & Drink',
  aliases: ['peach'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍒',
  description: 'cherries',
  category: 'Food & Drink',
  aliases: ['cherries'],
  tags: ['fruit'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍓',
  description: 'strawberry',
  category: 'Food & Drink',
  aliases: ['strawberry'],
  tags: ['fruit'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🫐',
  description: 'blueberries',
  category: 'Food & Drink',
  aliases: ['blueberries'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🥝',
  description: 'kiwi fruit',
  category: 'Food & Drink',
  aliases: ['kiwi_fruit'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🍅',
  description: 'tomato',
  category: 'Food & Drink',
  aliases: ['tomato'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🫒',
  description: 'olive',
  category: 'Food & Drink',
  aliases: ['olive'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🥥',
  description: 'coconut',
  category: 'Food & Drink',
  aliases: ['coconut'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🥑',
  description: 'avocado',
  category: 'Food & Drink',
  aliases: ['avocado'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🍆',
  description: 'eggplant',
  category: 'Food & Drink',
  aliases: ['eggplant'],
  tags: ['aubergine'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🥔',
  description: 'potato',
  category: 'Food & Drink',
  aliases: ['potato'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🥕',
  description: 'carrot',
  category: 'Food & Drink',
  aliases: ['carrot'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🌽',
  description: 'ear of corn',
  category: 'Food & Drink',
  aliases: ['corn'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌶️',
  description: 'hot pepper',
  category: 'Food & Drink',
  aliases: ['hot_pepper'],
  tags: ['spicy'],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🫑',
  description: 'bell pepper',
  category: 'Food & Drink',
  aliases: ['bell_pepper'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🥒',
  description: 'cucumber',
  category: 'Food & Drink',
  aliases: ['cucumber'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🥬',
  description: 'leafy green',
  category: 'Food & Drink',
  aliases: ['leafy_green'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🥦',
  description: 'broccoli',
  category: 'Food & Drink',
  aliases: ['broccoli'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🧄',
  description: 'garlic',
  category: 'Food & Drink',
  aliases: ['garlic'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🧅',
  description: 'onion',
  category: 'Food & Drink',
  aliases: ['onion'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🍄',
  description: 'mushroom',
  category: 'Food & Drink',
  aliases: ['mushroom'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🥜',
  description: 'peanuts',
  category: 'Food & Drink',
  aliases: ['peanuts'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🌰',
  description: 'chestnut',
  category: 'Food & Drink',
  aliases: ['chestnut'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍞',
  description: 'bread',
  category: 'Food & Drink',
  aliases: ['bread'],
  tags: ['toast'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🥐',
  description: 'croissant',
  category: 'Food & Drink',
  aliases: ['croissant'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🥖',
  description: 'baguette bread',
  category: 'Food & Drink',
  aliases: ['baguette_bread'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🫓',
  description: 'flatbread',
  category: 'Food & Drink',
  aliases: ['flatbread'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🥨',
  description: 'pretzel',
  category: 'Food & Drink',
  aliases: ['pretzel'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🥯',
  description: 'bagel',
  category: 'Food & Drink',
  aliases: ['bagel'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🥞',
  description: 'pancakes',
  category: 'Food & Drink',
  aliases: ['pancakes'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🧇',
  description: 'waffle',
  category: 'Food & Drink',
  aliases: ['waffle'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🧀',
  description: 'cheese wedge',
  category: 'Food & Drink',
  aliases: ['cheese'],
  tags: [],
  unicode_version: '8.0',
  ios_version: '9.1'
}, {
  emoji: '🍖',
  description: 'meat on bone',
  category: 'Food & Drink',
  aliases: ['meat_on_bone'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍗',
  description: 'poultry leg',
  category: 'Food & Drink',
  aliases: ['poultry_leg'],
  tags: ['meat', 'chicken'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🥩',
  description: 'cut of meat',
  category: 'Food & Drink',
  aliases: ['cut_of_meat'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🥓',
  description: 'bacon',
  category: 'Food & Drink',
  aliases: ['bacon'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🍔',
  description: 'hamburger',
  category: 'Food & Drink',
  aliases: ['hamburger'],
  tags: ['burger'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍟',
  description: 'french fries',
  category: 'Food & Drink',
  aliases: ['fries'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍕',
  description: 'pizza',
  category: 'Food & Drink',
  aliases: ['pizza'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌭',
  description: 'hot dog',
  category: 'Food & Drink',
  aliases: ['hotdog'],
  tags: [],
  unicode_version: '8.0',
  ios_version: '9.1'
}, {
  emoji: '🥪',
  description: 'sandwich',
  category: 'Food & Drink',
  aliases: ['sandwich'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🌮',
  description: 'taco',
  category: 'Food & Drink',
  aliases: ['taco'],
  tags: [],
  unicode_version: '8.0',
  ios_version: '9.1'
}, {
  emoji: '🌯',
  description: 'burrito',
  category: 'Food & Drink',
  aliases: ['burrito'],
  tags: [],
  unicode_version: '8.0',
  ios_version: '9.1'
}, {
  emoji: '🫔',
  description: 'tamale',
  category: 'Food & Drink',
  aliases: ['tamale'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🥙',
  description: 'stuffed flatbread',
  category: 'Food & Drink',
  aliases: ['stuffed_flatbread'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🧆',
  description: 'falafel',
  category: 'Food & Drink',
  aliases: ['falafel'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🥚',
  description: 'egg',
  category: 'Food & Drink',
  aliases: ['egg'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🍳',
  description: 'cooking',
  category: 'Food & Drink',
  aliases: ['fried_egg'],
  tags: ['breakfast'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🥘',
  description: 'shallow pan of food',
  category: 'Food & Drink',
  aliases: ['shallow_pan_of_food'],
  tags: ['paella', 'curry'],
  unicode_version: '',
  ios_version: '10.2'
}, {
  emoji: '🍲',
  description: 'pot of food',
  category: 'Food & Drink',
  aliases: ['stew'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🫕',
  description: 'fondue',
  category: 'Food & Drink',
  aliases: ['fondue'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🥣',
  description: 'bowl with spoon',
  category: 'Food & Drink',
  aliases: ['bowl_with_spoon'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🥗',
  description: 'green salad',
  category: 'Food & Drink',
  aliases: ['green_salad'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🍿',
  description: 'popcorn',
  category: 'Food & Drink',
  aliases: ['popcorn'],
  tags: [],
  unicode_version: '8.0',
  ios_version: '9.1'
}, {
  emoji: '🧈',
  description: 'butter',
  category: 'Food & Drink',
  aliases: ['butter'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🧂',
  description: 'salt',
  category: 'Food & Drink',
  aliases: ['salt'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🥫',
  description: 'canned food',
  category: 'Food & Drink',
  aliases: ['canned_food'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🍱',
  description: 'bento box',
  category: 'Food & Drink',
  aliases: ['bento'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍘',
  description: 'rice cracker',
  category: 'Food & Drink',
  aliases: ['rice_cracker'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍙',
  description: 'rice ball',
  category: 'Food & Drink',
  aliases: ['rice_ball'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍚',
  description: 'cooked rice',
  category: 'Food & Drink',
  aliases: ['rice'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍛',
  description: 'curry rice',
  category: 'Food & Drink',
  aliases: ['curry'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍜',
  description: 'steaming bowl',
  category: 'Food & Drink',
  aliases: ['ramen'],
  tags: ['noodle'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍝',
  description: 'spaghetti',
  category: 'Food & Drink',
  aliases: ['spaghetti'],
  tags: ['pasta'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍠',
  description: 'roasted sweet potato',
  category: 'Food & Drink',
  aliases: ['sweet_potato'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍢',
  description: 'oden',
  category: 'Food & Drink',
  aliases: ['oden'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍣',
  description: 'sushi',
  category: 'Food & Drink',
  aliases: ['sushi'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍤',
  description: 'fried shrimp',
  category: 'Food & Drink',
  aliases: ['fried_shrimp'],
  tags: ['tempura'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍥',
  description: 'fish cake with swirl',
  category: 'Food & Drink',
  aliases: ['fish_cake'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🥮',
  description: 'moon cake',
  category: 'Food & Drink',
  aliases: ['moon_cake'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🍡',
  description: 'dango',
  category: 'Food & Drink',
  aliases: ['dango'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🥟',
  description: 'dumpling',
  category: 'Food & Drink',
  aliases: ['dumpling'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🥠',
  description: 'fortune cookie',
  category: 'Food & Drink',
  aliases: ['fortune_cookie'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🥡',
  description: 'takeout box',
  category: 'Food & Drink',
  aliases: ['takeout_box'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🦀',
  description: 'crab',
  category: 'Food & Drink',
  aliases: ['crab'],
  tags: [],
  unicode_version: '8.0',
  ios_version: '9.1'
}, {
  emoji: '🦞',
  description: 'lobster',
  category: 'Food & Drink',
  aliases: ['lobster'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🦐',
  description: 'shrimp',
  category: 'Food & Drink',
  aliases: ['shrimp'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🦑',
  description: 'squid',
  category: 'Food & Drink',
  aliases: ['squid'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🦪',
  description: 'oyster',
  category: 'Food & Drink',
  aliases: ['oyster'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🍦',
  description: 'soft ice cream',
  category: 'Food & Drink',
  aliases: ['icecream'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍧',
  description: 'shaved ice',
  category: 'Food & Drink',
  aliases: ['shaved_ice'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍨',
  description: 'ice cream',
  category: 'Food & Drink',
  aliases: ['ice_cream'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍩',
  description: 'doughnut',
  category: 'Food & Drink',
  aliases: ['doughnut'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍪',
  description: 'cookie',
  category: 'Food & Drink',
  aliases: ['cookie'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🎂',
  description: 'birthday cake',
  category: 'Food & Drink',
  aliases: ['birthday'],
  tags: ['party'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍰',
  description: 'shortcake',
  category: 'Food & Drink',
  aliases: ['cake'],
  tags: ['dessert'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🧁',
  description: 'cupcake',
  category: 'Food & Drink',
  aliases: ['cupcake'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🥧',
  description: 'pie',
  category: 'Food & Drink',
  aliases: ['pie'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🍫',
  description: 'chocolate bar',
  category: 'Food & Drink',
  aliases: ['chocolate_bar'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍬',
  description: 'candy',
  category: 'Food & Drink',
  aliases: ['candy'],
  tags: ['sweet'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍭',
  description: 'lollipop',
  category: 'Food & Drink',
  aliases: ['lollipop'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍮',
  description: 'custard',
  category: 'Food & Drink',
  aliases: ['custard'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍯',
  description: 'honey pot',
  category: 'Food & Drink',
  aliases: ['honey_pot'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍼',
  description: 'baby bottle',
  category: 'Food & Drink',
  aliases: ['baby_bottle'],
  tags: ['milk'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🥛',
  description: 'glass of milk',
  category: 'Food & Drink',
  aliases: ['milk_glass'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '☕',
  description: 'hot beverage',
  category: 'Food & Drink',
  aliases: ['coffee'],
  tags: ['cafe', 'espresso'],
  unicode_version: '4.0',
  ios_version: '6.0'
}, {
  emoji: '🫖',
  description: 'teapot',
  category: 'Food & Drink',
  aliases: ['teapot'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🍵',
  description: 'teacup without handle',
  category: 'Food & Drink',
  aliases: ['tea'],
  tags: ['green', 'breakfast'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍶',
  description: 'sake',
  category: 'Food & Drink',
  aliases: ['sake'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍾',
  description: 'bottle with popping cork',
  category: 'Food & Drink',
  aliases: ['champagne'],
  tags: ['bottle', 'bubbly', 'celebration'],
  unicode_version: '8.0',
  ios_version: '9.1'
}, {
  emoji: '🍷',
  description: 'wine glass',
  category: 'Food & Drink',
  aliases: ['wine_glass'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍸',
  description: 'cocktail glass',
  category: 'Food & Drink',
  aliases: ['cocktail'],
  tags: ['drink'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍹',
  description: 'tropical drink',
  category: 'Food & Drink',
  aliases: ['tropical_drink'],
  tags: ['summer', 'vacation'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍺',
  description: 'beer mug',
  category: 'Food & Drink',
  aliases: ['beer'],
  tags: ['drink'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🍻',
  description: 'clinking beer mugs',
  category: 'Food & Drink',
  aliases: ['beers'],
  tags: ['drinks'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🥂',
  description: 'clinking glasses',
  category: 'Food & Drink',
  aliases: ['clinking_glasses'],
  tags: ['cheers', 'toast'],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🥃',
  description: 'tumbler glass',
  category: 'Food & Drink',
  aliases: ['tumbler_glass'],
  tags: ['whisky'],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🥤',
  description: 'cup with straw',
  category: 'Food & Drink',
  aliases: ['cup_with_straw'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🧋',
  description: 'bubble tea',
  category: 'Food & Drink',
  aliases: ['bubble_tea'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🧃',
  description: 'beverage box',
  category: 'Food & Drink',
  aliases: ['beverage_box'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🧉',
  description: 'mate',
  category: 'Food & Drink',
  aliases: ['mate'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🧊',
  description: 'ice',
  category: 'Food & Drink',
  aliases: ['ice_cube'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🥢',
  description: 'chopsticks',
  category: 'Food & Drink',
  aliases: ['chopsticks'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🍽️',
  description: 'fork and knife with plate',
  category: 'Food & Drink',
  aliases: ['plate_with_cutlery'],
  tags: ['dining', 'dinner'],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🍴',
  description: 'fork and knife',
  category: 'Food & Drink',
  aliases: ['fork_and_knife'],
  tags: ['cutlery'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🥄',
  description: 'spoon',
  category: 'Food & Drink',
  aliases: ['spoon'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🔪',
  description: 'kitchen knife',
  category: 'Food & Drink',
  aliases: ['hocho', 'knife'],
  tags: ['cut', 'chop'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🏺',
  description: 'amphora',
  category: 'Food & Drink',
  aliases: ['amphora'],
  tags: [],
  unicode_version: '8.0',
  ios_version: '9.1'
}, {
  emoji: '🌍',
  description: 'globe showing Europe-Africa',
  category: 'Travel & Places',
  aliases: ['earth_africa'],
  tags: ['globe', 'world', 'international'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌎',
  description: 'globe showing Americas',
  category: 'Travel & Places',
  aliases: ['earth_americas'],
  tags: ['globe', 'world', 'international'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌏',
  description: 'globe showing Asia-Australia',
  category: 'Travel & Places',
  aliases: ['earth_asia'],
  tags: ['globe', 'world', 'international'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌐',
  description: 'globe with meridians',
  category: 'Travel & Places',
  aliases: ['globe_with_meridians'],
  tags: ['world', 'global', 'international'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🗺️',
  description: 'world map',
  category: 'Travel & Places',
  aliases: ['world_map'],
  tags: ['travel'],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🗾',
  description: 'map of Japan',
  category: 'Travel & Places',
  aliases: ['japan'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🧭',
  description: 'compass',
  category: 'Travel & Places',
  aliases: ['compass'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🏔️',
  description: 'snow-capped mountain',
  category: 'Travel & Places',
  aliases: ['mountain_snow'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '⛰️',
  description: 'mountain',
  category: 'Travel & Places',
  aliases: ['mountain'],
  tags: [],
  unicode_version: '5.2',
  ios_version: '9.1'
}, {
  emoji: '🌋',
  description: 'volcano',
  category: 'Travel & Places',
  aliases: ['volcano'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🗻',
  description: 'mount fuji',
  category: 'Travel & Places',
  aliases: ['mount_fuji'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🏕️',
  description: 'camping',
  category: 'Travel & Places',
  aliases: ['camping'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🏖️',
  description: 'beach with umbrella',
  category: 'Travel & Places',
  aliases: ['beach_umbrella'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🏜️',
  description: 'desert',
  category: 'Travel & Places',
  aliases: ['desert'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🏝️',
  description: 'desert island',
  category: 'Travel & Places',
  aliases: ['desert_island'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🏞️',
  description: 'national park',
  category: 'Travel & Places',
  aliases: ['national_park'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🏟️',
  description: 'stadium',
  category: 'Travel & Places',
  aliases: ['stadium'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🏛️',
  description: 'classical building',
  category: 'Travel & Places',
  aliases: ['classical_building'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🏗️',
  description: 'building construction',
  category: 'Travel & Places',
  aliases: ['building_construction'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🧱',
  description: 'brick',
  category: 'Travel & Places',
  aliases: ['bricks'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🪨',
  description: 'rock',
  category: 'Travel & Places',
  aliases: ['rock'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🪵',
  description: 'wood',
  category: 'Travel & Places',
  aliases: ['wood'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🛖',
  description: 'hut',
  category: 'Travel & Places',
  aliases: ['hut'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🏘️',
  description: 'houses',
  category: 'Travel & Places',
  aliases: ['houses'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🏚️',
  description: 'derelict house',
  category: 'Travel & Places',
  aliases: ['derelict_house'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🏠',
  description: 'house',
  category: 'Travel & Places',
  aliases: ['house'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🏡',
  description: 'house with garden',
  category: 'Travel & Places',
  aliases: ['house_with_garden'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🏢',
  description: 'office building',
  category: 'Travel & Places',
  aliases: ['office'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🏣',
  description: 'Japanese post office',
  category: 'Travel & Places',
  aliases: ['post_office'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🏤',
  description: 'post office',
  category: 'Travel & Places',
  aliases: ['european_post_office'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🏥',
  description: 'hospital',
  category: 'Travel & Places',
  aliases: ['hospital'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🏦',
  description: 'bank',
  category: 'Travel & Places',
  aliases: ['bank'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🏨',
  description: 'hotel',
  category: 'Travel & Places',
  aliases: ['hotel'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🏩',
  description: 'love hotel',
  category: 'Travel & Places',
  aliases: ['love_hotel'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🏪',
  description: 'convenience store',
  category: 'Travel & Places',
  aliases: ['convenience_store'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🏫',
  description: 'school',
  category: 'Travel & Places',
  aliases: ['school'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🏬',
  description: 'department store',
  category: 'Travel & Places',
  aliases: ['department_store'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🏭',
  description: 'factory',
  category: 'Travel & Places',
  aliases: ['factory'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🏯',
  description: 'Japanese castle',
  category: 'Travel & Places',
  aliases: ['japanese_castle'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🏰',
  description: 'castle',
  category: 'Travel & Places',
  aliases: ['european_castle'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💒',
  description: 'wedding',
  category: 'Travel & Places',
  aliases: ['wedding'],
  tags: ['marriage'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🗼',
  description: 'Tokyo tower',
  category: 'Travel & Places',
  aliases: ['tokyo_tower'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🗽',
  description: 'Statue of Liberty',
  category: 'Travel & Places',
  aliases: ['statue_of_liberty'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '⛪',
  description: 'church',
  category: 'Travel & Places',
  aliases: ['church'],
  tags: [],
  unicode_version: '5.2',
  ios_version: '6.0'
}, {
  emoji: '🕌',
  description: 'mosque',
  category: 'Travel & Places',
  aliases: ['mosque'],
  tags: [],
  unicode_version: '8.0',
  ios_version: '9.1'
}, {
  emoji: '🛕',
  description: 'hindu temple',
  category: 'Travel & Places',
  aliases: ['hindu_temple'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🕍',
  description: 'synagogue',
  category: 'Travel & Places',
  aliases: ['synagogue'],
  tags: [],
  unicode_version: '8.0',
  ios_version: '9.1'
}, {
  emoji: '⛩️',
  description: 'shinto shrine',
  category: 'Travel & Places',
  aliases: ['shinto_shrine'],
  tags: [],
  unicode_version: '5.2',
  ios_version: '9.1'
}, {
  emoji: '🕋',
  description: 'kaaba',
  category: 'Travel & Places',
  aliases: ['kaaba'],
  tags: [],
  unicode_version: '8.0',
  ios_version: '9.1'
}, {
  emoji: '⛲',
  description: 'fountain',
  category: 'Travel & Places',
  aliases: ['fountain'],
  tags: [],
  unicode_version: '5.2',
  ios_version: '6.0'
}, {
  emoji: '⛺',
  description: 'tent',
  category: 'Travel & Places',
  aliases: ['tent'],
  tags: ['camping'],
  unicode_version: '5.2',
  ios_version: '6.0'
}, {
  emoji: '🌁',
  description: 'foggy',
  category: 'Travel & Places',
  aliases: ['foggy'],
  tags: ['karl'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌃',
  description: 'night with stars',
  category: 'Travel & Places',
  aliases: ['night_with_stars'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🏙️',
  description: 'cityscape',
  category: 'Travel & Places',
  aliases: ['cityscape'],
  tags: ['skyline'],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🌄',
  description: 'sunrise over mountains',
  category: 'Travel & Places',
  aliases: ['sunrise_over_mountains'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌅',
  description: 'sunrise',
  category: 'Travel & Places',
  aliases: ['sunrise'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌆',
  description: 'cityscape at dusk',
  category: 'Travel & Places',
  aliases: ['city_sunset'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌇',
  description: 'sunset',
  category: 'Travel & Places',
  aliases: ['city_sunrise'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌉',
  description: 'bridge at night',
  category: 'Travel & Places',
  aliases: ['bridge_at_night'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '♨️',
  description: 'hot springs',
  category: 'Travel & Places',
  aliases: ['hotsprings'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '🎠',
  description: 'carousel horse',
  category: 'Travel & Places',
  aliases: ['carousel_horse'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🎡',
  description: 'ferris wheel',
  category: 'Travel & Places',
  aliases: ['ferris_wheel'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🎢',
  description: 'roller coaster',
  category: 'Travel & Places',
  aliases: ['roller_coaster'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💈',
  description: 'barber pole',
  category: 'Travel & Places',
  aliases: ['barber'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🎪',
  description: 'circus tent',
  category: 'Travel & Places',
  aliases: ['circus_tent'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚂',
  description: 'locomotive',
  category: 'Travel & Places',
  aliases: ['steam_locomotive'],
  tags: ['train'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚃',
  description: 'railway car',
  category: 'Travel & Places',
  aliases: ['railway_car'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚄',
  description: 'high-speed train',
  category: 'Travel & Places',
  aliases: ['bullettrain_side'],
  tags: ['train'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚅',
  description: 'bullet train',
  category: 'Travel & Places',
  aliases: ['bullettrain_front'],
  tags: ['train'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚆',
  description: 'train',
  category: 'Travel & Places',
  aliases: ['train2'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚇',
  description: 'metro',
  category: 'Travel & Places',
  aliases: ['metro'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚈',
  description: 'light rail',
  category: 'Travel & Places',
  aliases: ['light_rail'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚉',
  description: 'station',
  category: 'Travel & Places',
  aliases: ['station'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚊',
  description: 'tram',
  category: 'Travel & Places',
  aliases: ['tram'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚝',
  description: 'monorail',
  category: 'Travel & Places',
  aliases: ['monorail'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚞',
  description: 'mountain railway',
  category: 'Travel & Places',
  aliases: ['mountain_railway'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚋',
  description: 'tram car',
  category: 'Travel & Places',
  aliases: ['train'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚌',
  description: 'bus',
  category: 'Travel & Places',
  aliases: ['bus'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚍',
  description: 'oncoming bus',
  category: 'Travel & Places',
  aliases: ['oncoming_bus'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚎',
  description: 'trolleybus',
  category: 'Travel & Places',
  aliases: ['trolleybus'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚐',
  description: 'minibus',
  category: 'Travel & Places',
  aliases: ['minibus'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚑',
  description: 'ambulance',
  category: 'Travel & Places',
  aliases: ['ambulance'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚒',
  description: 'fire engine',
  category: 'Travel & Places',
  aliases: ['fire_engine'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚓',
  description: 'police car',
  category: 'Travel & Places',
  aliases: ['police_car'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚔',
  description: 'oncoming police car',
  category: 'Travel & Places',
  aliases: ['oncoming_police_car'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚕',
  description: 'taxi',
  category: 'Travel & Places',
  aliases: ['taxi'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚖',
  description: 'oncoming taxi',
  category: 'Travel & Places',
  aliases: ['oncoming_taxi'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚗',
  description: 'automobile',
  category: 'Travel & Places',
  aliases: ['car', 'red_car'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚘',
  description: 'oncoming automobile',
  category: 'Travel & Places',
  aliases: ['oncoming_automobile'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚙',
  description: 'sport utility vehicle',
  category: 'Travel & Places',
  aliases: ['blue_car'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🛻',
  description: 'pickup truck',
  category: 'Travel & Places',
  aliases: ['pickup_truck'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🚚',
  description: 'delivery truck',
  category: 'Travel & Places',
  aliases: ['truck'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚛',
  description: 'articulated lorry',
  category: 'Travel & Places',
  aliases: ['articulated_lorry'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚜',
  description: 'tractor',
  category: 'Travel & Places',
  aliases: ['tractor'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🏎️',
  description: 'racing car',
  category: 'Travel & Places',
  aliases: ['racing_car'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🏍️',
  description: 'motorcycle',
  category: 'Travel & Places',
  aliases: ['motorcycle'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🛵',
  description: 'motor scooter',
  category: 'Travel & Places',
  aliases: ['motor_scooter'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🦽',
  description: 'manual wheelchair',
  category: 'Travel & Places',
  aliases: ['manual_wheelchair'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🦼',
  description: 'motorized wheelchair',
  category: 'Travel & Places',
  aliases: ['motorized_wheelchair'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🛺',
  description: 'auto rickshaw',
  category: 'Travel & Places',
  aliases: ['auto_rickshaw'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🚲',
  description: 'bicycle',
  category: 'Travel & Places',
  aliases: ['bike'],
  tags: ['bicycle'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🛴',
  description: 'kick scooter',
  category: 'Travel & Places',
  aliases: ['kick_scooter'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🛹',
  description: 'skateboard',
  category: 'Travel & Places',
  aliases: ['skateboard'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🛼',
  description: 'roller skate',
  category: 'Travel & Places',
  aliases: ['roller_skate'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🚏',
  description: 'bus stop',
  category: 'Travel & Places',
  aliases: ['busstop'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🛣️',
  description: 'motorway',
  category: 'Travel & Places',
  aliases: ['motorway'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🛤️',
  description: 'railway track',
  category: 'Travel & Places',
  aliases: ['railway_track'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🛢️',
  description: 'oil drum',
  category: 'Travel & Places',
  aliases: ['oil_drum'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '⛽',
  description: 'fuel pump',
  category: 'Travel & Places',
  aliases: ['fuelpump'],
  tags: [],
  unicode_version: '5.2',
  ios_version: '6.0'
}, {
  emoji: '🚨',
  description: 'police car light',
  category: 'Travel & Places',
  aliases: ['rotating_light'],
  tags: ['911', 'emergency'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚥',
  description: 'horizontal traffic light',
  category: 'Travel & Places',
  aliases: ['traffic_light'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚦',
  description: 'vertical traffic light',
  category: 'Travel & Places',
  aliases: ['vertical_traffic_light'],
  tags: ['semaphore'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🛑',
  description: 'stop sign',
  category: 'Travel & Places',
  aliases: ['stop_sign'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🚧',
  description: 'construction',
  category: 'Travel & Places',
  aliases: ['construction'],
  tags: ['wip'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '⚓',
  description: 'anchor',
  category: 'Travel & Places',
  aliases: ['anchor'],
  tags: ['ship'],
  unicode_version: '4.1',
  ios_version: '6.0'
}, {
  emoji: '⛵',
  description: 'sailboat',
  category: 'Travel & Places',
  aliases: ['boat', 'sailboat'],
  tags: [],
  unicode_version: '5.2',
  ios_version: '6.0'
}, {
  emoji: '🛶',
  description: 'canoe',
  category: 'Travel & Places',
  aliases: ['canoe'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🚤',
  description: 'speedboat',
  category: 'Travel & Places',
  aliases: ['speedboat'],
  tags: ['ship'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🛳️',
  description: 'passenger ship',
  category: 'Travel & Places',
  aliases: ['passenger_ship'],
  tags: ['cruise'],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '⛴️',
  description: 'ferry',
  category: 'Travel & Places',
  aliases: ['ferry'],
  tags: [],
  unicode_version: '5.2',
  ios_version: '9.1'
}, {
  emoji: '🛥️',
  description: 'motor boat',
  category: 'Travel & Places',
  aliases: ['motor_boat'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🚢',
  description: 'ship',
  category: 'Travel & Places',
  aliases: ['ship'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '✈️',
  description: 'airplane',
  category: 'Travel & Places',
  aliases: ['airplane'],
  tags: ['flight'],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '🛩️',
  description: 'small airplane',
  category: 'Travel & Places',
  aliases: ['small_airplane'],
  tags: ['flight'],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🛫',
  description: 'airplane departure',
  category: 'Travel & Places',
  aliases: ['flight_departure'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🛬',
  description: 'airplane arrival',
  category: 'Travel & Places',
  aliases: ['flight_arrival'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🪂',
  description: 'parachute',
  category: 'Travel & Places',
  aliases: ['parachute'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '💺',
  description: 'seat',
  category: 'Travel & Places',
  aliases: ['seat'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚁',
  description: 'helicopter',
  category: 'Travel & Places',
  aliases: ['helicopter'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚟',
  description: 'suspension railway',
  category: 'Travel & Places',
  aliases: ['suspension_railway'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚠',
  description: 'mountain cableway',
  category: 'Travel & Places',
  aliases: ['mountain_cableway'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚡',
  description: 'aerial tramway',
  category: 'Travel & Places',
  aliases: ['aerial_tramway'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🛰️',
  description: 'satellite',
  category: 'Travel & Places',
  aliases: ['artificial_satellite'],
  tags: ['orbit', 'space'],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🚀',
  description: 'rocket',
  category: 'Travel & Places',
  aliases: ['rocket'],
  tags: ['ship', 'launch'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🛸',
  description: 'flying saucer',
  category: 'Travel & Places',
  aliases: ['flying_saucer'],
  tags: ['ufo'],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🛎️',
  description: 'bellhop bell',
  category: 'Travel & Places',
  aliases: ['bellhop_bell'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🧳',
  description: 'luggage',
  category: 'Travel & Places',
  aliases: ['luggage'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '⌛',
  description: 'hourglass done',
  category: 'Travel & Places',
  aliases: ['hourglass'],
  tags: ['time'],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '⏳',
  description: 'hourglass not done',
  category: 'Travel & Places',
  aliases: ['hourglass_flowing_sand'],
  tags: ['time'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '⌚',
  description: 'watch',
  category: 'Travel & Places',
  aliases: ['watch'],
  tags: ['time'],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '⏰',
  description: 'alarm clock',
  category: 'Travel & Places',
  aliases: ['alarm_clock'],
  tags: ['morning'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '⏱️',
  description: 'stopwatch',
  category: 'Travel & Places',
  aliases: ['stopwatch'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.1'
}, {
  emoji: '⏲️',
  description: 'timer clock',
  category: 'Travel & Places',
  aliases: ['timer_clock'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.1'
}, {
  emoji: '🕰️',
  description: 'mantelpiece clock',
  category: 'Travel & Places',
  aliases: ['mantelpiece_clock'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🕛',
  description: 'twelve o’clock',
  category: 'Travel & Places',
  aliases: ['clock12'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🕧',
  description: 'twelve-thirty',
  category: 'Travel & Places',
  aliases: ['clock1230'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🕐',
  description: 'one o’clock',
  category: 'Travel & Places',
  aliases: ['clock1'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🕜',
  description: 'one-thirty',
  category: 'Travel & Places',
  aliases: ['clock130'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🕑',
  description: 'two o’clock',
  category: 'Travel & Places',
  aliases: ['clock2'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🕝',
  description: 'two-thirty',
  category: 'Travel & Places',
  aliases: ['clock230'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🕒',
  description: 'three o’clock',
  category: 'Travel & Places',
  aliases: ['clock3'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🕞',
  description: 'three-thirty',
  category: 'Travel & Places',
  aliases: ['clock330'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🕓',
  description: 'four o’clock',
  category: 'Travel & Places',
  aliases: ['clock4'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🕟',
  description: 'four-thirty',
  category: 'Travel & Places',
  aliases: ['clock430'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🕔',
  description: 'five o’clock',
  category: 'Travel & Places',
  aliases: ['clock5'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🕠',
  description: 'five-thirty',
  category: 'Travel & Places',
  aliases: ['clock530'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🕕',
  description: 'six o’clock',
  category: 'Travel & Places',
  aliases: ['clock6'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🕡',
  description: 'six-thirty',
  category: 'Travel & Places',
  aliases: ['clock630'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🕖',
  description: 'seven o’clock',
  category: 'Travel & Places',
  aliases: ['clock7'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🕢',
  description: 'seven-thirty',
  category: 'Travel & Places',
  aliases: ['clock730'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🕗',
  description: 'eight o’clock',
  category: 'Travel & Places',
  aliases: ['clock8'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🕣',
  description: 'eight-thirty',
  category: 'Travel & Places',
  aliases: ['clock830'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🕘',
  description: 'nine o’clock',
  category: 'Travel & Places',
  aliases: ['clock9'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🕤',
  description: 'nine-thirty',
  category: 'Travel & Places',
  aliases: ['clock930'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🕙',
  description: 'ten o’clock',
  category: 'Travel & Places',
  aliases: ['clock10'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🕥',
  description: 'ten-thirty',
  category: 'Travel & Places',
  aliases: ['clock1030'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🕚',
  description: 'eleven o’clock',
  category: 'Travel & Places',
  aliases: ['clock11'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🕦',
  description: 'eleven-thirty',
  category: 'Travel & Places',
  aliases: ['clock1130'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌑',
  description: 'new moon',
  category: 'Travel & Places',
  aliases: ['new_moon'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌒',
  description: 'waxing crescent moon',
  category: 'Travel & Places',
  aliases: ['waxing_crescent_moon'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌓',
  description: 'first quarter moon',
  category: 'Travel & Places',
  aliases: ['first_quarter_moon'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌔',
  description: 'waxing gibbous moon',
  category: 'Travel & Places',
  aliases: ['moon', 'waxing_gibbous_moon'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌕',
  description: 'full moon',
  category: 'Travel & Places',
  aliases: ['full_moon'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌖',
  description: 'waning gibbous moon',
  category: 'Travel & Places',
  aliases: ['waning_gibbous_moon'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌗',
  description: 'last quarter moon',
  category: 'Travel & Places',
  aliases: ['last_quarter_moon'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌘',
  description: 'waning crescent moon',
  category: 'Travel & Places',
  aliases: ['waning_crescent_moon'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌙',
  description: 'crescent moon',
  category: 'Travel & Places',
  aliases: ['crescent_moon'],
  tags: ['night'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌚',
  description: 'new moon face',
  category: 'Travel & Places',
  aliases: ['new_moon_with_face'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌛',
  description: 'first quarter moon face',
  category: 'Travel & Places',
  aliases: ['first_quarter_moon_with_face'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌜',
  description: 'last quarter moon face',
  category: 'Travel & Places',
  aliases: ['last_quarter_moon_with_face'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌡️',
  description: 'thermometer',
  category: 'Travel & Places',
  aliases: ['thermometer'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '☀️',
  description: 'sun',
  category: 'Travel & Places',
  aliases: ['sunny'],
  tags: ['weather'],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '🌝',
  description: 'full moon face',
  category: 'Travel & Places',
  aliases: ['full_moon_with_face'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌞',
  description: 'sun with face',
  category: 'Travel & Places',
  aliases: ['sun_with_face'],
  tags: ['summer'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🪐',
  description: 'ringed planet',
  category: 'Travel & Places',
  aliases: ['ringed_planet'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '⭐',
  description: 'star',
  category: 'Travel & Places',
  aliases: ['star'],
  tags: [],
  unicode_version: '5.1',
  ios_version: '6.0'
}, {
  emoji: '🌟',
  description: 'glowing star',
  category: 'Travel & Places',
  aliases: ['star2'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌠',
  description: 'shooting star',
  category: 'Travel & Places',
  aliases: ['stars'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌌',
  description: 'milky way',
  category: 'Travel & Places',
  aliases: ['milky_way'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '☁️',
  description: 'cloud',
  category: 'Travel & Places',
  aliases: ['cloud'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '⛅',
  description: 'sun behind cloud',
  category: 'Travel & Places',
  aliases: ['partly_sunny'],
  tags: ['weather', 'cloud'],
  unicode_version: '5.2',
  ios_version: '6.0'
}, {
  emoji: '⛈️',
  description: 'cloud with lightning and rain',
  category: 'Travel & Places',
  aliases: ['cloud_with_lightning_and_rain'],
  tags: [],
  unicode_version: '5.2',
  ios_version: '9.1'
}, {
  emoji: '🌤️',
  description: 'sun behind small cloud',
  category: 'Travel & Places',
  aliases: ['sun_behind_small_cloud'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🌥️',
  description: 'sun behind large cloud',
  category: 'Travel & Places',
  aliases: ['sun_behind_large_cloud'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🌦️',
  description: 'sun behind rain cloud',
  category: 'Travel & Places',
  aliases: ['sun_behind_rain_cloud'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🌧️',
  description: 'cloud with rain',
  category: 'Travel & Places',
  aliases: ['cloud_with_rain'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🌨️',
  description: 'cloud with snow',
  category: 'Travel & Places',
  aliases: ['cloud_with_snow'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🌩️',
  description: 'cloud with lightning',
  category: 'Travel & Places',
  aliases: ['cloud_with_lightning'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🌪️',
  description: 'tornado',
  category: 'Travel & Places',
  aliases: ['tornado'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🌫️',
  description: 'fog',
  category: 'Travel & Places',
  aliases: ['fog'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🌬️',
  description: 'wind face',
  category: 'Travel & Places',
  aliases: ['wind_face'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🌀',
  description: 'cyclone',
  category: 'Travel & Places',
  aliases: ['cyclone'],
  tags: ['swirl'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌈',
  description: 'rainbow',
  category: 'Travel & Places',
  aliases: ['rainbow'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌂',
  description: 'closed umbrella',
  category: 'Travel & Places',
  aliases: ['closed_umbrella'],
  tags: ['weather', 'rain'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '☂️',
  description: 'umbrella',
  category: 'Travel & Places',
  aliases: ['open_umbrella'],
  tags: [],
  unicode_version: '',
  ios_version: '9.1'
}, {
  emoji: '☔',
  description: 'umbrella with rain drops',
  category: 'Travel & Places',
  aliases: ['umbrella'],
  tags: ['rain', 'weather'],
  unicode_version: '4.0',
  ios_version: '6.0'
}, {
  emoji: '⛱️',
  description: 'umbrella on ground',
  category: 'Travel & Places',
  aliases: ['parasol_on_ground'],
  tags: ['beach_umbrella'],
  unicode_version: '5.2',
  ios_version: '9.1'
}, {
  emoji: '⚡',
  description: 'high voltage',
  category: 'Travel & Places',
  aliases: ['zap'],
  tags: ['lightning', 'thunder'],
  unicode_version: '4.0',
  ios_version: '6.0'
}, {
  emoji: '❄️',
  description: 'snowflake',
  category: 'Travel & Places',
  aliases: ['snowflake'],
  tags: ['winter', 'cold', 'weather'],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '☃️',
  description: 'snowman',
  category: 'Travel & Places',
  aliases: ['snowman_with_snow'],
  tags: ['winter', 'christmas'],
  unicode_version: '',
  ios_version: '9.1'
}, {
  emoji: '⛄',
  description: 'snowman without snow',
  category: 'Travel & Places',
  aliases: ['snowman'],
  tags: ['winter'],
  unicode_version: '5.2',
  ios_version: '6.0'
}, {
  emoji: '☄️',
  description: 'comet',
  category: 'Travel & Places',
  aliases: ['comet'],
  tags: [],
  unicode_version: '',
  ios_version: '9.1'
}, {
  emoji: '🔥',
  description: 'fire',
  category: 'Travel & Places',
  aliases: ['fire'],
  tags: ['burn'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💧',
  description: 'droplet',
  category: 'Travel & Places',
  aliases: ['droplet'],
  tags: ['water'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🌊',
  description: 'water wave',
  category: 'Travel & Places',
  aliases: ['ocean'],
  tags: ['sea'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🎃',
  description: 'jack-o-lantern',
  category: 'Activities',
  aliases: ['jack_o_lantern'],
  tags: ['halloween'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🎄',
  description: 'Christmas tree',
  category: 'Activities',
  aliases: ['christmas_tree'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🎆',
  description: 'fireworks',
  category: 'Activities',
  aliases: ['fireworks'],
  tags: ['festival', 'celebration'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🎇',
  description: 'sparkler',
  category: 'Activities',
  aliases: ['sparkler'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🧨',
  description: 'firecracker',
  category: 'Activities',
  aliases: ['firecracker'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '✨',
  description: 'sparkles',
  category: 'Activities',
  aliases: ['sparkles'],
  tags: ['shiny'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🎈',
  description: 'balloon',
  category: 'Activities',
  aliases: ['balloon'],
  tags: ['party', 'birthday'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🎉',
  description: 'party popper',
  category: 'Activities',
  aliases: ['tada'],
  tags: ['hooray', 'party'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🎊',
  description: 'confetti ball',
  category: 'Activities',
  aliases: ['confetti_ball'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🎋',
  description: 'tanabata tree',
  category: 'Activities',
  aliases: ['tanabata_tree'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🎍',
  description: 'pine decoration',
  category: 'Activities',
  aliases: ['bamboo'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🎎',
  description: 'Japanese dolls',
  category: 'Activities',
  aliases: ['dolls'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🎏',
  description: 'carp streamer',
  category: 'Activities',
  aliases: ['flags'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🎐',
  description: 'wind chime',
  category: 'Activities',
  aliases: ['wind_chime'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🎑',
  description: 'moon viewing ceremony',
  category: 'Activities',
  aliases: ['rice_scene'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🧧',
  description: 'red envelope',
  category: 'Activities',
  aliases: ['red_envelope'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🎀',
  description: 'ribbon',
  category: 'Activities',
  aliases: ['ribbon'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🎁',
  description: 'wrapped gift',
  category: 'Activities',
  aliases: ['gift'],
  tags: ['present', 'birthday', 'christmas'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🎗️',
  description: 'reminder ribbon',
  category: 'Activities',
  aliases: ['reminder_ribbon'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🎟️',
  description: 'admission tickets',
  category: 'Activities',
  aliases: ['tickets'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🎫',
  description: 'ticket',
  category: 'Activities',
  aliases: ['ticket'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🎖️',
  description: 'military medal',
  category: 'Activities',
  aliases: ['medal_military'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🏆',
  description: 'trophy',
  category: 'Activities',
  aliases: ['trophy'],
  tags: ['award', 'contest', 'winner'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🏅',
  description: 'sports medal',
  category: 'Activities',
  aliases: ['medal_sports'],
  tags: ['gold', 'winner'],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🥇',
  description: '1st place medal',
  category: 'Activities',
  aliases: ['1st_place_medal'],
  tags: ['gold'],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🥈',
  description: '2nd place medal',
  category: 'Activities',
  aliases: ['2nd_place_medal'],
  tags: ['silver'],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🥉',
  description: '3rd place medal',
  category: 'Activities',
  aliases: ['3rd_place_medal'],
  tags: ['bronze'],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '⚽',
  description: 'soccer ball',
  category: 'Activities',
  aliases: ['soccer'],
  tags: ['sports'],
  unicode_version: '5.2',
  ios_version: '6.0'
}, {
  emoji: '⚾',
  description: 'baseball',
  category: 'Activities',
  aliases: ['baseball'],
  tags: ['sports'],
  unicode_version: '5.2',
  ios_version: '6.0'
}, {
  emoji: '🥎',
  description: 'softball',
  category: 'Activities',
  aliases: ['softball'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🏀',
  description: 'basketball',
  category: 'Activities',
  aliases: ['basketball'],
  tags: ['sports'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🏐',
  description: 'volleyball',
  category: 'Activities',
  aliases: ['volleyball'],
  tags: [],
  unicode_version: '8.0',
  ios_version: '9.1'
}, {
  emoji: '🏈',
  description: 'american football',
  category: 'Activities',
  aliases: ['football'],
  tags: ['sports'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🏉',
  description: 'rugby football',
  category: 'Activities',
  aliases: ['rugby_football'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🎾',
  description: 'tennis',
  category: 'Activities',
  aliases: ['tennis'],
  tags: ['sports'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🥏',
  description: 'flying disc',
  category: 'Activities',
  aliases: ['flying_disc'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🎳',
  description: 'bowling',
  category: 'Activities',
  aliases: ['bowling'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🏏',
  description: 'cricket game',
  category: 'Activities',
  aliases: ['cricket_game'],
  tags: [],
  unicode_version: '8.0',
  ios_version: '9.1'
}, {
  emoji: '🏑',
  description: 'field hockey',
  category: 'Activities',
  aliases: ['field_hockey'],
  tags: [],
  unicode_version: '8.0',
  ios_version: '9.1'
}, {
  emoji: '🏒',
  description: 'ice hockey',
  category: 'Activities',
  aliases: ['ice_hockey'],
  tags: [],
  unicode_version: '8.0',
  ios_version: '9.1'
}, {
  emoji: '🥍',
  description: 'lacrosse',
  category: 'Activities',
  aliases: ['lacrosse'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🏓',
  description: 'ping pong',
  category: 'Activities',
  aliases: ['ping_pong'],
  tags: [],
  unicode_version: '8.0',
  ios_version: '9.1'
}, {
  emoji: '🏸',
  description: 'badminton',
  category: 'Activities',
  aliases: ['badminton'],
  tags: [],
  unicode_version: '8.0',
  ios_version: '9.1'
}, {
  emoji: '🥊',
  description: 'boxing glove',
  category: 'Activities',
  aliases: ['boxing_glove'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🥋',
  description: 'martial arts uniform',
  category: 'Activities',
  aliases: ['martial_arts_uniform'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🥅',
  description: 'goal net',
  category: 'Activities',
  aliases: ['goal_net'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '⛳',
  description: 'flag in hole',
  category: 'Activities',
  aliases: ['golf'],
  tags: [],
  unicode_version: '5.2',
  ios_version: '6.0'
}, {
  emoji: '⛸️',
  description: 'ice skate',
  category: 'Activities',
  aliases: ['ice_skate'],
  tags: ['skating'],
  unicode_version: '5.2',
  ios_version: '9.1'
}, {
  emoji: '🎣',
  description: 'fishing pole',
  category: 'Activities',
  aliases: ['fishing_pole_and_fish'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🤿',
  description: 'diving mask',
  category: 'Activities',
  aliases: ['diving_mask'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🎽',
  description: 'running shirt',
  category: 'Activities',
  aliases: ['running_shirt_with_sash'],
  tags: ['marathon'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🎿',
  description: 'skis',
  category: 'Activities',
  aliases: ['ski'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🛷',
  description: 'sled',
  category: 'Activities',
  aliases: ['sled'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🥌',
  description: 'curling stone',
  category: 'Activities',
  aliases: ['curling_stone'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🎯',
  description: 'bullseye',
  category: 'Activities',
  aliases: ['dart'],
  tags: ['target'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🪀',
  description: 'yo-yo',
  category: 'Activities',
  aliases: ['yo_yo'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🪁',
  description: 'kite',
  category: 'Activities',
  aliases: ['kite'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🎱',
  description: 'pool 8 ball',
  category: 'Activities',
  aliases: ['8ball'],
  tags: ['pool', 'billiards'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔮',
  description: 'crystal ball',
  category: 'Activities',
  aliases: ['crystal_ball'],
  tags: ['fortune'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🪄',
  description: 'magic wand',
  category: 'Activities',
  aliases: ['magic_wand'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🧿',
  description: 'nazar amulet',
  category: 'Activities',
  aliases: ['nazar_amulet'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🎮',
  description: 'video game',
  category: 'Activities',
  aliases: ['video_game'],
  tags: ['play', 'controller', 'console'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🕹️',
  description: 'joystick',
  category: 'Activities',
  aliases: ['joystick'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🎰',
  description: 'slot machine',
  category: 'Activities',
  aliases: ['slot_machine'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🎲',
  description: 'game die',
  category: 'Activities',
  aliases: ['game_die'],
  tags: ['dice', 'gambling'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🧩',
  description: 'puzzle piece',
  category: 'Activities',
  aliases: ['jigsaw'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🧸',
  description: 'teddy bear',
  category: 'Activities',
  aliases: ['teddy_bear'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🪅',
  description: 'piñata',
  category: 'Activities',
  aliases: ['pinata'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🪆',
  description: 'nesting dolls',
  category: 'Activities',
  aliases: ['nesting_dolls'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '♠️',
  description: 'spade suit',
  category: 'Activities',
  aliases: ['spades'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '♥️',
  description: 'heart suit',
  category: 'Activities',
  aliases: ['hearts'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '♦️',
  description: 'diamond suit',
  category: 'Activities',
  aliases: ['diamonds'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '♣️',
  description: 'club suit',
  category: 'Activities',
  aliases: ['clubs'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '♟️',
  description: 'chess pawn',
  category: 'Activities',
  aliases: ['chess_pawn'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🃏',
  description: 'joker',
  category: 'Activities',
  aliases: ['black_joker'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🀄',
  description: 'mahjong red dragon',
  category: 'Activities',
  aliases: ['mahjong'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '🎴',
  description: 'flower playing cards',
  category: 'Activities',
  aliases: ['flower_playing_cards'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🎭',
  description: 'performing arts',
  category: 'Activities',
  aliases: ['performing_arts'],
  tags: ['theater', 'drama'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🖼️',
  description: 'framed picture',
  category: 'Activities',
  aliases: ['framed_picture'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🎨',
  description: 'artist palette',
  category: 'Activities',
  aliases: ['art'],
  tags: ['design', 'paint'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🧵',
  description: 'thread',
  category: 'Activities',
  aliases: ['thread'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🪡',
  description: 'sewing needle',
  category: 'Activities',
  aliases: ['sewing_needle'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🧶',
  description: 'yarn',
  category: 'Activities',
  aliases: ['yarn'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🪢',
  description: 'knot',
  category: 'Activities',
  aliases: ['knot'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '👓',
  description: 'glasses',
  category: 'Objects',
  aliases: ['eyeglasses'],
  tags: ['glasses'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🕶️',
  description: 'sunglasses',
  category: 'Objects',
  aliases: ['dark_sunglasses'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🥽',
  description: 'goggles',
  category: 'Objects',
  aliases: ['goggles'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🥼',
  description: 'lab coat',
  category: 'Objects',
  aliases: ['lab_coat'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🦺',
  description: 'safety vest',
  category: 'Objects',
  aliases: ['safety_vest'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '👔',
  description: 'necktie',
  category: 'Objects',
  aliases: ['necktie'],
  tags: ['shirt', 'formal'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '👕',
  description: 't-shirt',
  category: 'Objects',
  aliases: ['shirt', 'tshirt'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '👖',
  description: 'jeans',
  category: 'Objects',
  aliases: ['jeans'],
  tags: ['pants'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🧣',
  description: 'scarf',
  category: 'Objects',
  aliases: ['scarf'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🧤',
  description: 'gloves',
  category: 'Objects',
  aliases: ['gloves'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🧥',
  description: 'coat',
  category: 'Objects',
  aliases: ['coat'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🧦',
  description: 'socks',
  category: 'Objects',
  aliases: ['socks'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '👗',
  description: 'dress',
  category: 'Objects',
  aliases: ['dress'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '👘',
  description: 'kimono',
  category: 'Objects',
  aliases: ['kimono'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🥻',
  description: 'sari',
  category: 'Objects',
  aliases: ['sari'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🩱',
  description: 'one-piece swimsuit',
  category: 'Objects',
  aliases: ['one_piece_swimsuit'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🩲',
  description: 'briefs',
  category: 'Objects',
  aliases: ['swim_brief'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🩳',
  description: 'shorts',
  category: 'Objects',
  aliases: ['shorts'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '👙',
  description: 'bikini',
  category: 'Objects',
  aliases: ['bikini'],
  tags: ['beach'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '👚',
  description: 'woman’s clothes',
  category: 'Objects',
  aliases: ['womans_clothes'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '👛',
  description: 'purse',
  category: 'Objects',
  aliases: ['purse'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '👜',
  description: 'handbag',
  category: 'Objects',
  aliases: ['handbag'],
  tags: ['bag'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '👝',
  description: 'clutch bag',
  category: 'Objects',
  aliases: ['pouch'],
  tags: ['bag'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🛍️',
  description: 'shopping bags',
  category: 'Objects',
  aliases: ['shopping'],
  tags: ['bags'],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🎒',
  description: 'backpack',
  category: 'Objects',
  aliases: ['school_satchel'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🩴',
  description: 'thong sandal',
  category: 'Objects',
  aliases: ['thong_sandal'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '👞',
  description: 'man’s shoe',
  category: 'Objects',
  aliases: ['mans_shoe', 'shoe'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '👟',
  description: 'running shoe',
  category: 'Objects',
  aliases: ['athletic_shoe'],
  tags: ['sneaker', 'sport', 'running'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🥾',
  description: 'hiking boot',
  category: 'Objects',
  aliases: ['hiking_boot'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🥿',
  description: 'flat shoe',
  category: 'Objects',
  aliases: ['flat_shoe'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '👠',
  description: 'high-heeled shoe',
  category: 'Objects',
  aliases: ['high_heel'],
  tags: ['shoe'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '👡',
  description: 'woman’s sandal',
  category: 'Objects',
  aliases: ['sandal'],
  tags: ['shoe'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🩰',
  description: 'ballet shoes',
  category: 'Objects',
  aliases: ['ballet_shoes'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '👢',
  description: 'woman’s boot',
  category: 'Objects',
  aliases: ['boot'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '👑',
  description: 'crown',
  category: 'Objects',
  aliases: ['crown'],
  tags: ['king', 'queen', 'royal'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '👒',
  description: 'woman’s hat',
  category: 'Objects',
  aliases: ['womans_hat'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🎩',
  description: 'top hat',
  category: 'Objects',
  aliases: ['tophat'],
  tags: ['hat', 'classy'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🎓',
  description: 'graduation cap',
  category: 'Objects',
  aliases: ['mortar_board'],
  tags: ['education', 'college', 'university', 'graduation'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🧢',
  description: 'billed cap',
  category: 'Objects',
  aliases: ['billed_cap'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🪖',
  description: 'military helmet',
  category: 'Objects',
  aliases: ['military_helmet'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '⛑️',
  description: 'rescue worker’s helmet',
  category: 'Objects',
  aliases: ['rescue_worker_helmet'],
  tags: [],
  unicode_version: '5.2',
  ios_version: '9.1'
}, {
  emoji: '📿',
  description: 'prayer beads',
  category: 'Objects',
  aliases: ['prayer_beads'],
  tags: [],
  unicode_version: '8.0',
  ios_version: '9.1'
}, {
  emoji: '💄',
  description: 'lipstick',
  category: 'Objects',
  aliases: ['lipstick'],
  tags: ['makeup'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💍',
  description: 'ring',
  category: 'Objects',
  aliases: ['ring'],
  tags: ['wedding', 'marriage', 'engaged'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💎',
  description: 'gem stone',
  category: 'Objects',
  aliases: ['gem'],
  tags: ['diamond'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔇',
  description: 'muted speaker',
  category: 'Objects',
  aliases: ['mute'],
  tags: ['sound', 'volume'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔈',
  description: 'speaker low volume',
  category: 'Objects',
  aliases: ['speaker'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔉',
  description: 'speaker medium volume',
  category: 'Objects',
  aliases: ['sound'],
  tags: ['volume'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔊',
  description: 'speaker high volume',
  category: 'Objects',
  aliases: ['loud_sound'],
  tags: ['volume'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📢',
  description: 'loudspeaker',
  category: 'Objects',
  aliases: ['loudspeaker'],
  tags: ['announcement'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📣',
  description: 'megaphone',
  category: 'Objects',
  aliases: ['mega'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📯',
  description: 'postal horn',
  category: 'Objects',
  aliases: ['postal_horn'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔔',
  description: 'bell',
  category: 'Objects',
  aliases: ['bell'],
  tags: ['sound', 'notification'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔕',
  description: 'bell with slash',
  category: 'Objects',
  aliases: ['no_bell'],
  tags: ['volume', 'off'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🎼',
  description: 'musical score',
  category: 'Objects',
  aliases: ['musical_score'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🎵',
  description: 'musical note',
  category: 'Objects',
  aliases: ['musical_note'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🎶',
  description: 'musical notes',
  category: 'Objects',
  aliases: ['notes'],
  tags: ['music'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🎙️',
  description: 'studio microphone',
  category: 'Objects',
  aliases: ['studio_microphone'],
  tags: ['podcast'],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🎚️',
  description: 'level slider',
  category: 'Objects',
  aliases: ['level_slider'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🎛️',
  description: 'control knobs',
  category: 'Objects',
  aliases: ['control_knobs'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🎤',
  description: 'microphone',
  category: 'Objects',
  aliases: ['microphone'],
  tags: ['sing'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🎧',
  description: 'headphone',
  category: 'Objects',
  aliases: ['headphones'],
  tags: ['music', 'earphones'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📻',
  description: 'radio',
  category: 'Objects',
  aliases: ['radio'],
  tags: ['podcast'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🎷',
  description: 'saxophone',
  category: 'Objects',
  aliases: ['saxophone'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🪗',
  description: 'accordion',
  category: 'Objects',
  aliases: ['accordion'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🎸',
  description: 'guitar',
  category: 'Objects',
  aliases: ['guitar'],
  tags: ['rock'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🎹',
  description: 'musical keyboard',
  category: 'Objects',
  aliases: ['musical_keyboard'],
  tags: ['piano'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🎺',
  description: 'trumpet',
  category: 'Objects',
  aliases: ['trumpet'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🎻',
  description: 'violin',
  category: 'Objects',
  aliases: ['violin'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🪕',
  description: 'banjo',
  category: 'Objects',
  aliases: ['banjo'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🥁',
  description: 'drum',
  category: 'Objects',
  aliases: ['drum'],
  tags: [],
  unicode_version: '',
  ios_version: '10.2'
}, {
  emoji: '🪘',
  description: 'long drum',
  category: 'Objects',
  aliases: ['long_drum'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '📱',
  description: 'mobile phone',
  category: 'Objects',
  aliases: ['iphone'],
  tags: ['smartphone', 'mobile'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📲',
  description: 'mobile phone with arrow',
  category: 'Objects',
  aliases: ['calling'],
  tags: ['call', 'incoming'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '☎️',
  description: 'telephone',
  category: 'Objects',
  aliases: ['phone', 'telephone'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '📞',
  description: 'telephone receiver',
  category: 'Objects',
  aliases: ['telephone_receiver'],
  tags: ['phone', 'call'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📟',
  description: 'pager',
  category: 'Objects',
  aliases: ['pager'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📠',
  description: 'fax machine',
  category: 'Objects',
  aliases: ['fax'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔋',
  description: 'battery',
  category: 'Objects',
  aliases: ['battery'],
  tags: ['power'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔌',
  description: 'electric plug',
  category: 'Objects',
  aliases: ['electric_plug'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💻',
  description: 'laptop',
  category: 'Objects',
  aliases: ['computer'],
  tags: ['desktop', 'screen'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🖥️',
  description: 'desktop computer',
  category: 'Objects',
  aliases: ['desktop_computer'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🖨️',
  description: 'printer',
  category: 'Objects',
  aliases: ['printer'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '⌨️',
  description: 'keyboard',
  category: 'Objects',
  aliases: ['keyboard'],
  tags: [],
  unicode_version: '',
  ios_version: '9.1'
}, {
  emoji: '🖱️',
  description: 'computer mouse',
  category: 'Objects',
  aliases: ['computer_mouse'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🖲️',
  description: 'trackball',
  category: 'Objects',
  aliases: ['trackball'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '💽',
  description: 'computer disk',
  category: 'Objects',
  aliases: ['minidisc'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💾',
  description: 'floppy disk',
  category: 'Objects',
  aliases: ['floppy_disk'],
  tags: ['save'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💿',
  description: 'optical disk',
  category: 'Objects',
  aliases: ['cd'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📀',
  description: 'dvd',
  category: 'Objects',
  aliases: ['dvd'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🧮',
  description: 'abacus',
  category: 'Objects',
  aliases: ['abacus'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🎥',
  description: 'movie camera',
  category: 'Objects',
  aliases: ['movie_camera'],
  tags: ['film', 'video'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🎞️',
  description: 'film frames',
  category: 'Objects',
  aliases: ['film_strip'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '📽️',
  description: 'film projector',
  category: 'Objects',
  aliases: ['film_projector'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🎬',
  description: 'clapper board',
  category: 'Objects',
  aliases: ['clapper'],
  tags: ['film'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📺',
  description: 'television',
  category: 'Objects',
  aliases: ['tv'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📷',
  description: 'camera',
  category: 'Objects',
  aliases: ['camera'],
  tags: ['photo'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📸',
  description: 'camera with flash',
  category: 'Objects',
  aliases: ['camera_flash'],
  tags: ['photo'],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '📹',
  description: 'video camera',
  category: 'Objects',
  aliases: ['video_camera'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📼',
  description: 'videocassette',
  category: 'Objects',
  aliases: ['vhs'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔍',
  description: 'magnifying glass tilted left',
  category: 'Objects',
  aliases: ['mag'],
  tags: ['search', 'zoom'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔎',
  description: 'magnifying glass tilted right',
  category: 'Objects',
  aliases: ['mag_right'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🕯️',
  description: 'candle',
  category: 'Objects',
  aliases: ['candle'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '💡',
  description: 'light bulb',
  category: 'Objects',
  aliases: ['bulb'],
  tags: ['idea', 'light'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔦',
  description: 'flashlight',
  category: 'Objects',
  aliases: ['flashlight'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🏮',
  description: 'red paper lantern',
  category: 'Objects',
  aliases: ['izakaya_lantern', 'lantern'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🪔',
  description: 'diya lamp',
  category: 'Objects',
  aliases: ['diya_lamp'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '📔',
  description: 'notebook with decorative cover',
  category: 'Objects',
  aliases: ['notebook_with_decorative_cover'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📕',
  description: 'closed book',
  category: 'Objects',
  aliases: ['closed_book'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📖',
  description: 'open book',
  category: 'Objects',
  aliases: ['book', 'open_book'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📗',
  description: 'green book',
  category: 'Objects',
  aliases: ['green_book'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📘',
  description: 'blue book',
  category: 'Objects',
  aliases: ['blue_book'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📙',
  description: 'orange book',
  category: 'Objects',
  aliases: ['orange_book'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📚',
  description: 'books',
  category: 'Objects',
  aliases: ['books'],
  tags: ['library'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📓',
  description: 'notebook',
  category: 'Objects',
  aliases: ['notebook'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📒',
  description: 'ledger',
  category: 'Objects',
  aliases: ['ledger'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📃',
  description: 'page with curl',
  category: 'Objects',
  aliases: ['page_with_curl'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📜',
  description: 'scroll',
  category: 'Objects',
  aliases: ['scroll'],
  tags: ['document'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📄',
  description: 'page facing up',
  category: 'Objects',
  aliases: ['page_facing_up'],
  tags: ['document'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📰',
  description: 'newspaper',
  category: 'Objects',
  aliases: ['newspaper'],
  tags: ['press'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🗞️',
  description: 'rolled-up newspaper',
  category: 'Objects',
  aliases: ['newspaper_roll'],
  tags: ['press'],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '📑',
  description: 'bookmark tabs',
  category: 'Objects',
  aliases: ['bookmark_tabs'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔖',
  description: 'bookmark',
  category: 'Objects',
  aliases: ['bookmark'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🏷️',
  description: 'label',
  category: 'Objects',
  aliases: ['label'],
  tags: ['tag'],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '💰',
  description: 'money bag',
  category: 'Objects',
  aliases: ['moneybag'],
  tags: ['dollar', 'cream'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🪙',
  description: 'coin',
  category: 'Objects',
  aliases: ['coin'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '💴',
  description: 'yen banknote',
  category: 'Objects',
  aliases: ['yen'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💵',
  description: 'dollar banknote',
  category: 'Objects',
  aliases: ['dollar'],
  tags: ['money'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💶',
  description: 'euro banknote',
  category: 'Objects',
  aliases: ['euro'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💷',
  description: 'pound banknote',
  category: 'Objects',
  aliases: ['pound'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💸',
  description: 'money with wings',
  category: 'Objects',
  aliases: ['money_with_wings'],
  tags: ['dollar'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💳',
  description: 'credit card',
  category: 'Objects',
  aliases: ['credit_card'],
  tags: ['subscription'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🧾',
  description: 'receipt',
  category: 'Objects',
  aliases: ['receipt'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '💹',
  description: 'chart increasing with yen',
  category: 'Objects',
  aliases: ['chart'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '✉️',
  description: 'envelope',
  category: 'Objects',
  aliases: ['envelope'],
  tags: ['letter', 'email'],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '📧',
  description: 'e-mail',
  category: 'Objects',
  aliases: ['email', 'e-mail'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📨',
  description: 'incoming envelope',
  category: 'Objects',
  aliases: ['incoming_envelope'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📩',
  description: 'envelope with arrow',
  category: 'Objects',
  aliases: ['envelope_with_arrow'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📤',
  description: 'outbox tray',
  category: 'Objects',
  aliases: ['outbox_tray'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📥',
  description: 'inbox tray',
  category: 'Objects',
  aliases: ['inbox_tray'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📦',
  description: 'package',
  category: 'Objects',
  aliases: ['package'],
  tags: ['shipping'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📫',
  description: 'closed mailbox with raised flag',
  category: 'Objects',
  aliases: ['mailbox'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📪',
  description: 'closed mailbox with lowered flag',
  category: 'Objects',
  aliases: ['mailbox_closed'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📬',
  description: 'open mailbox with raised flag',
  category: 'Objects',
  aliases: ['mailbox_with_mail'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📭',
  description: 'open mailbox with lowered flag',
  category: 'Objects',
  aliases: ['mailbox_with_no_mail'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📮',
  description: 'postbox',
  category: 'Objects',
  aliases: ['postbox'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🗳️',
  description: 'ballot box with ballot',
  category: 'Objects',
  aliases: ['ballot_box'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '✏️',
  description: 'pencil',
  category: 'Objects',
  aliases: ['pencil2'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '✒️',
  description: 'black nib',
  category: 'Objects',
  aliases: ['black_nib'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '🖋️',
  description: 'fountain pen',
  category: 'Objects',
  aliases: ['fountain_pen'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🖊️',
  description: 'pen',
  category: 'Objects',
  aliases: ['pen'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🖌️',
  description: 'paintbrush',
  category: 'Objects',
  aliases: ['paintbrush'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🖍️',
  description: 'crayon',
  category: 'Objects',
  aliases: ['crayon'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '📝',
  description: 'memo',
  category: 'Objects',
  aliases: ['memo', 'pencil'],
  tags: ['document', 'note'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💼',
  description: 'briefcase',
  category: 'Objects',
  aliases: ['briefcase'],
  tags: ['business'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📁',
  description: 'file folder',
  category: 'Objects',
  aliases: ['file_folder'],
  tags: ['directory'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📂',
  description: 'open file folder',
  category: 'Objects',
  aliases: ['open_file_folder'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🗂️',
  description: 'card index dividers',
  category: 'Objects',
  aliases: ['card_index_dividers'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '📅',
  description: 'calendar',
  category: 'Objects',
  aliases: ['date'],
  tags: ['calendar', 'schedule'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📆',
  description: 'tear-off calendar',
  category: 'Objects',
  aliases: ['calendar'],
  tags: ['schedule'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🗒️',
  description: 'spiral notepad',
  category: 'Objects',
  aliases: ['spiral_notepad'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🗓️',
  description: 'spiral calendar',
  category: 'Objects',
  aliases: ['spiral_calendar'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '📇',
  description: 'card index',
  category: 'Objects',
  aliases: ['card_index'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📈',
  description: 'chart increasing',
  category: 'Objects',
  aliases: ['chart_with_upwards_trend'],
  tags: ['graph', 'metrics'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📉',
  description: 'chart decreasing',
  category: 'Objects',
  aliases: ['chart_with_downwards_trend'],
  tags: ['graph', 'metrics'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📊',
  description: 'bar chart',
  category: 'Objects',
  aliases: ['bar_chart'],
  tags: ['stats', 'metrics'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📋',
  description: 'clipboard',
  category: 'Objects',
  aliases: ['clipboard'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📌',
  description: 'pushpin',
  category: 'Objects',
  aliases: ['pushpin'],
  tags: ['location'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📍',
  description: 'round pushpin',
  category: 'Objects',
  aliases: ['round_pushpin'],
  tags: ['location'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📎',
  description: 'paperclip',
  category: 'Objects',
  aliases: ['paperclip'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🖇️',
  description: 'linked paperclips',
  category: 'Objects',
  aliases: ['paperclips'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '📏',
  description: 'straight ruler',
  category: 'Objects',
  aliases: ['straight_ruler'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📐',
  description: 'triangular ruler',
  category: 'Objects',
  aliases: ['triangular_ruler'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '✂️',
  description: 'scissors',
  category: 'Objects',
  aliases: ['scissors'],
  tags: ['cut'],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '🗃️',
  description: 'card file box',
  category: 'Objects',
  aliases: ['card_file_box'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🗄️',
  description: 'file cabinet',
  category: 'Objects',
  aliases: ['file_cabinet'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🗑️',
  description: 'wastebasket',
  category: 'Objects',
  aliases: ['wastebasket'],
  tags: ['trash'],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🔒',
  description: 'locked',
  category: 'Objects',
  aliases: ['lock'],
  tags: ['security', 'private'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔓',
  description: 'unlocked',
  category: 'Objects',
  aliases: ['unlock'],
  tags: ['security'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔏',
  description: 'locked with pen',
  category: 'Objects',
  aliases: ['lock_with_ink_pen'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔐',
  description: 'locked with key',
  category: 'Objects',
  aliases: ['closed_lock_with_key'],
  tags: ['security'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔑',
  description: 'key',
  category: 'Objects',
  aliases: ['key'],
  tags: ['lock', 'password'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🗝️',
  description: 'old key',
  category: 'Objects',
  aliases: ['old_key'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🔨',
  description: 'hammer',
  category: 'Objects',
  aliases: ['hammer'],
  tags: ['tool'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🪓',
  description: 'axe',
  category: 'Objects',
  aliases: ['axe'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '⛏️',
  description: 'pick',
  category: 'Objects',
  aliases: ['pick'],
  tags: [],
  unicode_version: '5.2',
  ios_version: '9.1'
}, {
  emoji: '⚒️',
  description: 'hammer and pick',
  category: 'Objects',
  aliases: ['hammer_and_pick'],
  tags: [],
  unicode_version: '4.1',
  ios_version: '9.1'
}, {
  emoji: '🛠️',
  description: 'hammer and wrench',
  category: 'Objects',
  aliases: ['hammer_and_wrench'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🗡️',
  description: 'dagger',
  category: 'Objects',
  aliases: ['dagger'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '⚔️',
  description: 'crossed swords',
  category: 'Objects',
  aliases: ['crossed_swords'],
  tags: [],
  unicode_version: '4.1',
  ios_version: '9.1'
}, {
  emoji: '🔫',
  description: 'water pistol',
  category: 'Objects',
  aliases: ['gun'],
  tags: ['shoot', 'weapon'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🪃',
  description: 'boomerang',
  category: 'Objects',
  aliases: ['boomerang'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🏹',
  description: 'bow and arrow',
  category: 'Objects',
  aliases: ['bow_and_arrow'],
  tags: ['archery'],
  unicode_version: '8.0',
  ios_version: '9.1'
}, {
  emoji: '🛡️',
  description: 'shield',
  category: 'Objects',
  aliases: ['shield'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🪚',
  description: 'carpentry saw',
  category: 'Objects',
  aliases: ['carpentry_saw'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🔧',
  description: 'wrench',
  category: 'Objects',
  aliases: ['wrench'],
  tags: ['tool'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🪛',
  description: 'screwdriver',
  category: 'Objects',
  aliases: ['screwdriver'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🔩',
  description: 'nut and bolt',
  category: 'Objects',
  aliases: ['nut_and_bolt'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '⚙️',
  description: 'gear',
  category: 'Objects',
  aliases: ['gear'],
  tags: [],
  unicode_version: '4.1',
  ios_version: '9.1'
}, {
  emoji: '🗜️',
  description: 'clamp',
  category: 'Objects',
  aliases: ['clamp'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '⚖️',
  description: 'balance scale',
  category: 'Objects',
  aliases: ['balance_scale'],
  tags: [],
  unicode_version: '4.1',
  ios_version: '9.1'
}, {
  emoji: '🦯',
  description: 'white cane',
  category: 'Objects',
  aliases: ['probing_cane'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🔗',
  description: 'link',
  category: 'Objects',
  aliases: ['link'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '⛓️',
  description: 'chains',
  category: 'Objects',
  aliases: ['chains'],
  tags: [],
  unicode_version: '5.2',
  ios_version: '9.1'
}, {
  emoji: '🪝',
  description: 'hook',
  category: 'Objects',
  aliases: ['hook'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🧰',
  description: 'toolbox',
  category: 'Objects',
  aliases: ['toolbox'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🧲',
  description: 'magnet',
  category: 'Objects',
  aliases: ['magnet'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🪜',
  description: 'ladder',
  category: 'Objects',
  aliases: ['ladder'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '⚗️',
  description: 'alembic',
  category: 'Objects',
  aliases: ['alembic'],
  tags: [],
  unicode_version: '4.1',
  ios_version: '9.1'
}, {
  emoji: '🧪',
  description: 'test tube',
  category: 'Objects',
  aliases: ['test_tube'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🧫',
  description: 'petri dish',
  category: 'Objects',
  aliases: ['petri_dish'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🧬',
  description: 'dna',
  category: 'Objects',
  aliases: ['dna'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🔬',
  description: 'microscope',
  category: 'Objects',
  aliases: ['microscope'],
  tags: ['science', 'laboratory', 'investigate'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔭',
  description: 'telescope',
  category: 'Objects',
  aliases: ['telescope'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📡',
  description: 'satellite antenna',
  category: 'Objects',
  aliases: ['satellite'],
  tags: ['signal'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💉',
  description: 'syringe',
  category: 'Objects',
  aliases: ['syringe'],
  tags: ['health', 'hospital', 'needle'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🩸',
  description: 'drop of blood',
  category: 'Objects',
  aliases: ['drop_of_blood'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '💊',
  description: 'pill',
  category: 'Objects',
  aliases: ['pill'],
  tags: ['health', 'medicine'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🩹',
  description: 'adhesive bandage',
  category: 'Objects',
  aliases: ['adhesive_bandage'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🩺',
  description: 'stethoscope',
  category: 'Objects',
  aliases: ['stethoscope'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🚪',
  description: 'door',
  category: 'Objects',
  aliases: ['door'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🛗',
  description: 'elevator',
  category: 'Objects',
  aliases: ['elevator'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🪞',
  description: 'mirror',
  category: 'Objects',
  aliases: ['mirror'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🪟',
  description: 'window',
  category: 'Objects',
  aliases: ['window'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🛏️',
  description: 'bed',
  category: 'Objects',
  aliases: ['bed'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🛋️',
  description: 'couch and lamp',
  category: 'Objects',
  aliases: ['couch_and_lamp'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🪑',
  description: 'chair',
  category: 'Objects',
  aliases: ['chair'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🚽',
  description: 'toilet',
  category: 'Objects',
  aliases: ['toilet'],
  tags: ['wc'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🪠',
  description: 'plunger',
  category: 'Objects',
  aliases: ['plunger'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🚿',
  description: 'shower',
  category: 'Objects',
  aliases: ['shower'],
  tags: ['bath'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🛁',
  description: 'bathtub',
  category: 'Objects',
  aliases: ['bathtub'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🪤',
  description: 'mouse trap',
  category: 'Objects',
  aliases: ['mouse_trap'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🪒',
  description: 'razor',
  category: 'Objects',
  aliases: ['razor'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🧴',
  description: 'lotion bottle',
  category: 'Objects',
  aliases: ['lotion_bottle'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🧷',
  description: 'safety pin',
  category: 'Objects',
  aliases: ['safety_pin'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🧹',
  description: 'broom',
  category: 'Objects',
  aliases: ['broom'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🧺',
  description: 'basket',
  category: 'Objects',
  aliases: ['basket'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🧻',
  description: 'roll of paper',
  category: 'Objects',
  aliases: ['roll_of_paper'],
  tags: ['toilet'],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🪣',
  description: 'bucket',
  category: 'Objects',
  aliases: ['bucket'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🧼',
  description: 'soap',
  category: 'Objects',
  aliases: ['soap'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🪥',
  description: 'toothbrush',
  category: 'Objects',
  aliases: ['toothbrush'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🧽',
  description: 'sponge',
  category: 'Objects',
  aliases: ['sponge'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🧯',
  description: 'fire extinguisher',
  category: 'Objects',
  aliases: ['fire_extinguisher'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🛒',
  description: 'shopping cart',
  category: 'Objects',
  aliases: ['shopping_cart'],
  tags: [],
  unicode_version: '9.0',
  ios_version: '10.2'
}, {
  emoji: '🚬',
  description: 'cigarette',
  category: 'Objects',
  aliases: ['smoking'],
  tags: ['cigarette'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '⚰️',
  description: 'coffin',
  category: 'Objects',
  aliases: ['coffin'],
  tags: ['funeral'],
  unicode_version: '4.1',
  ios_version: '9.1'
}, {
  emoji: '🪦',
  description: 'headstone',
  category: 'Objects',
  aliases: ['headstone'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '⚱️',
  description: 'funeral urn',
  category: 'Objects',
  aliases: ['funeral_urn'],
  tags: [],
  unicode_version: '4.1',
  ios_version: '9.1'
}, {
  emoji: '🗿',
  description: 'moai',
  category: 'Objects',
  aliases: ['moyai'],
  tags: ['stone'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🪧',
  description: 'placard',
  category: 'Objects',
  aliases: ['placard'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🏧',
  description: 'ATM sign',
  category: 'Symbols',
  aliases: ['atm'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚮',
  description: 'litter in bin sign',
  category: 'Symbols',
  aliases: ['put_litter_in_its_place'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚰',
  description: 'potable water',
  category: 'Symbols',
  aliases: ['potable_water'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '♿',
  description: 'wheelchair symbol',
  category: 'Symbols',
  aliases: ['wheelchair'],
  tags: ['accessibility'],
  unicode_version: '4.1',
  ios_version: '6.0'
}, {
  emoji: '🚹',
  description: 'men’s room',
  category: 'Symbols',
  aliases: ['mens'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚺',
  description: 'women’s room',
  category: 'Symbols',
  aliases: ['womens'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚻',
  description: 'restroom',
  category: 'Symbols',
  aliases: ['restroom'],
  tags: ['toilet'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚼',
  description: 'baby symbol',
  category: 'Symbols',
  aliases: ['baby_symbol'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚾',
  description: 'water closet',
  category: 'Symbols',
  aliases: ['wc'],
  tags: ['toilet', 'restroom'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🛂',
  description: 'passport control',
  category: 'Symbols',
  aliases: ['passport_control'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🛃',
  description: 'customs',
  category: 'Symbols',
  aliases: ['customs'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🛄',
  description: 'baggage claim',
  category: 'Symbols',
  aliases: ['baggage_claim'],
  tags: ['airport'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🛅',
  description: 'left luggage',
  category: 'Symbols',
  aliases: ['left_luggage'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '⚠️',
  description: 'warning',
  category: 'Symbols',
  aliases: ['warning'],
  tags: ['wip'],
  unicode_version: '4.0',
  ios_version: '6.0'
}, {
  emoji: '🚸',
  description: 'children crossing',
  category: 'Symbols',
  aliases: ['children_crossing'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '⛔',
  description: 'no entry',
  category: 'Symbols',
  aliases: ['no_entry'],
  tags: ['limit'],
  unicode_version: '5.2',
  ios_version: '6.0'
}, {
  emoji: '🚫',
  description: 'prohibited',
  category: 'Symbols',
  aliases: ['no_entry_sign'],
  tags: ['block', 'forbidden'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚳',
  description: 'no bicycles',
  category: 'Symbols',
  aliases: ['no_bicycles'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚭',
  description: 'no smoking',
  category: 'Symbols',
  aliases: ['no_smoking'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚯',
  description: 'no littering',
  category: 'Symbols',
  aliases: ['do_not_litter'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚱',
  description: 'non-potable water',
  category: 'Symbols',
  aliases: ['non-potable_water'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚷',
  description: 'no pedestrians',
  category: 'Symbols',
  aliases: ['no_pedestrians'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📵',
  description: 'no mobile phones',
  category: 'Symbols',
  aliases: ['no_mobile_phones'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔞',
  description: 'no one under eighteen',
  category: 'Symbols',
  aliases: ['underage'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '☢️',
  description: 'radioactive',
  category: 'Symbols',
  aliases: ['radioactive'],
  tags: [],
  unicode_version: '',
  ios_version: '9.1'
}, {
  emoji: '☣️',
  description: 'biohazard',
  category: 'Symbols',
  aliases: ['biohazard'],
  tags: [],
  unicode_version: '',
  ios_version: '9.1'
}, {
  emoji: '⬆️',
  description: 'up arrow',
  category: 'Symbols',
  aliases: ['arrow_up'],
  tags: [],
  unicode_version: '4.0',
  ios_version: '6.0'
}, {
  emoji: '↗️',
  description: 'up-right arrow',
  category: 'Symbols',
  aliases: ['arrow_upper_right'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '➡️',
  description: 'right arrow',
  category: 'Symbols',
  aliases: ['arrow_right'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '↘️',
  description: 'down-right arrow',
  category: 'Symbols',
  aliases: ['arrow_lower_right'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '⬇️',
  description: 'down arrow',
  category: 'Symbols',
  aliases: ['arrow_down'],
  tags: [],
  unicode_version: '4.0',
  ios_version: '6.0'
}, {
  emoji: '↙️',
  description: 'down-left arrow',
  category: 'Symbols',
  aliases: ['arrow_lower_left'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '⬅️',
  description: 'left arrow',
  category: 'Symbols',
  aliases: ['arrow_left'],
  tags: [],
  unicode_version: '4.0',
  ios_version: '6.0'
}, {
  emoji: '↖️',
  description: 'up-left arrow',
  category: 'Symbols',
  aliases: ['arrow_upper_left'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '↕️',
  description: 'up-down arrow',
  category: 'Symbols',
  aliases: ['arrow_up_down'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '↔️',
  description: 'left-right arrow',
  category: 'Symbols',
  aliases: ['left_right_arrow'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '↩️',
  description: 'right arrow curving left',
  category: 'Symbols',
  aliases: ['leftwards_arrow_with_hook'],
  tags: ['return'],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '↪️',
  description: 'left arrow curving right',
  category: 'Symbols',
  aliases: ['arrow_right_hook'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '⤴️',
  description: 'right arrow curving up',
  category: 'Symbols',
  aliases: ['arrow_heading_up'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '⤵️',
  description: 'right arrow curving down',
  category: 'Symbols',
  aliases: ['arrow_heading_down'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '🔃',
  description: 'clockwise vertical arrows',
  category: 'Symbols',
  aliases: ['arrows_clockwise'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔄',
  description: 'counterclockwise arrows button',
  category: 'Symbols',
  aliases: ['arrows_counterclockwise'],
  tags: ['sync'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔙',
  description: 'BACK arrow',
  category: 'Symbols',
  aliases: ['back'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔚',
  description: 'END arrow',
  category: 'Symbols',
  aliases: ['end'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔛',
  description: 'ON! arrow',
  category: 'Symbols',
  aliases: ['on'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔜',
  description: 'SOON arrow',
  category: 'Symbols',
  aliases: ['soon'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔝',
  description: 'TOP arrow',
  category: 'Symbols',
  aliases: ['top'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🛐',
  description: 'place of worship',
  category: 'Symbols',
  aliases: ['place_of_worship'],
  tags: [],
  unicode_version: '8.0',
  ios_version: '9.1'
}, {
  emoji: '⚛️',
  description: 'atom symbol',
  category: 'Symbols',
  aliases: ['atom_symbol'],
  tags: [],
  unicode_version: '4.1',
  ios_version: '9.1'
}, {
  emoji: '🕉️',
  description: 'om',
  category: 'Symbols',
  aliases: ['om'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '✡️',
  description: 'star of David',
  category: 'Symbols',
  aliases: ['star_of_david'],
  tags: [],
  unicode_version: '',
  ios_version: '9.1'
}, {
  emoji: '☸️',
  description: 'wheel of dharma',
  category: 'Symbols',
  aliases: ['wheel_of_dharma'],
  tags: [],
  unicode_version: '',
  ios_version: '9.1'
}, {
  emoji: '☯️',
  description: 'yin yang',
  category: 'Symbols',
  aliases: ['yin_yang'],
  tags: [],
  unicode_version: '',
  ios_version: '9.1'
}, {
  emoji: '✝️',
  description: 'latin cross',
  category: 'Symbols',
  aliases: ['latin_cross'],
  tags: [],
  unicode_version: '',
  ios_version: '9.1'
}, {
  emoji: '☦️',
  description: 'orthodox cross',
  category: 'Symbols',
  aliases: ['orthodox_cross'],
  tags: [],
  unicode_version: '',
  ios_version: '9.1'
}, {
  emoji: '☪️',
  description: 'star and crescent',
  category: 'Symbols',
  aliases: ['star_and_crescent'],
  tags: [],
  unicode_version: '',
  ios_version: '9.1'
}, {
  emoji: '☮️',
  description: 'peace symbol',
  category: 'Symbols',
  aliases: ['peace_symbol'],
  tags: [],
  unicode_version: '',
  ios_version: '9.1'
}, {
  emoji: '🕎',
  description: 'menorah',
  category: 'Symbols',
  aliases: ['menorah'],
  tags: [],
  unicode_version: '8.0',
  ios_version: '9.1'
}, {
  emoji: '🔯',
  description: 'dotted six-pointed star',
  category: 'Symbols',
  aliases: ['six_pointed_star'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '♈',
  description: 'Aries',
  category: 'Symbols',
  aliases: ['aries'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '♉',
  description: 'Taurus',
  category: 'Symbols',
  aliases: ['taurus'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '♊',
  description: 'Gemini',
  category: 'Symbols',
  aliases: ['gemini'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '♋',
  description: 'Cancer',
  category: 'Symbols',
  aliases: ['cancer'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '♌',
  description: 'Leo',
  category: 'Symbols',
  aliases: ['leo'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '♍',
  description: 'Virgo',
  category: 'Symbols',
  aliases: ['virgo'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '♎',
  description: 'Libra',
  category: 'Symbols',
  aliases: ['libra'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '♏',
  description: 'Scorpio',
  category: 'Symbols',
  aliases: ['scorpius'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '♐',
  description: 'Sagittarius',
  category: 'Symbols',
  aliases: ['sagittarius'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '♑',
  description: 'Capricorn',
  category: 'Symbols',
  aliases: ['capricorn'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '♒',
  description: 'Aquarius',
  category: 'Symbols',
  aliases: ['aquarius'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '♓',
  description: 'Pisces',
  category: 'Symbols',
  aliases: ['pisces'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '⛎',
  description: 'Ophiuchus',
  category: 'Symbols',
  aliases: ['ophiuchus'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔀',
  description: 'shuffle tracks button',
  category: 'Symbols',
  aliases: ['twisted_rightwards_arrows'],
  tags: ['shuffle'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔁',
  description: 'repeat button',
  category: 'Symbols',
  aliases: ['repeat'],
  tags: ['loop'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔂',
  description: 'repeat single button',
  category: 'Symbols',
  aliases: ['repeat_one'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '▶️',
  description: 'play button',
  category: 'Symbols',
  aliases: ['arrow_forward'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '⏩',
  description: 'fast-forward button',
  category: 'Symbols',
  aliases: ['fast_forward'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '⏭️',
  description: 'next track button',
  category: 'Symbols',
  aliases: ['next_track_button'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.1'
}, {
  emoji: '⏯️',
  description: 'play or pause button',
  category: 'Symbols',
  aliases: ['play_or_pause_button'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.1'
}, {
  emoji: '◀️',
  description: 'reverse button',
  category: 'Symbols',
  aliases: ['arrow_backward'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '⏪',
  description: 'fast reverse button',
  category: 'Symbols',
  aliases: ['rewind'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '⏮️',
  description: 'last track button',
  category: 'Symbols',
  aliases: ['previous_track_button'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.1'
}, {
  emoji: '🔼',
  description: 'upwards button',
  category: 'Symbols',
  aliases: ['arrow_up_small'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '⏫',
  description: 'fast up button',
  category: 'Symbols',
  aliases: ['arrow_double_up'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔽',
  description: 'downwards button',
  category: 'Symbols',
  aliases: ['arrow_down_small'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '⏬',
  description: 'fast down button',
  category: 'Symbols',
  aliases: ['arrow_double_down'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '⏸️',
  description: 'pause button',
  category: 'Symbols',
  aliases: ['pause_button'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '⏹️',
  description: 'stop button',
  category: 'Symbols',
  aliases: ['stop_button'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '⏺️',
  description: 'record button',
  category: 'Symbols',
  aliases: ['record_button'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '⏏️',
  description: 'eject button',
  category: 'Symbols',
  aliases: ['eject_button'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🎦',
  description: 'cinema',
  category: 'Symbols',
  aliases: ['cinema'],
  tags: ['film', 'movie'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔅',
  description: 'dim button',
  category: 'Symbols',
  aliases: ['low_brightness'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔆',
  description: 'bright button',
  category: 'Symbols',
  aliases: ['high_brightness'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📶',
  description: 'antenna bars',
  category: 'Symbols',
  aliases: ['signal_strength'],
  tags: ['wifi'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📳',
  description: 'vibration mode',
  category: 'Symbols',
  aliases: ['vibration_mode'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📴',
  description: 'mobile phone off',
  category: 'Symbols',
  aliases: ['mobile_phone_off'],
  tags: ['mute', 'off'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '♀️',
  description: 'female sign',
  category: 'Symbols',
  aliases: ['female_sign'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '♂️',
  description: 'male sign',
  category: 'Symbols',
  aliases: ['male_sign'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '⚧️',
  description: 'transgender symbol',
  category: 'Symbols',
  aliases: ['transgender_symbol'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '✖️',
  description: 'multiply',
  category: 'Symbols',
  aliases: ['heavy_multiplication_x'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '➕',
  description: 'plus',
  category: 'Symbols',
  aliases: ['heavy_plus_sign'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '➖',
  description: 'minus',
  category: 'Symbols',
  aliases: ['heavy_minus_sign'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '➗',
  description: 'divide',
  category: 'Symbols',
  aliases: ['heavy_division_sign'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '♾️',
  description: 'infinity',
  category: 'Symbols',
  aliases: ['infinity'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '‼️',
  description: 'double exclamation mark',
  category: 'Symbols',
  aliases: ['bangbang'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '⁉️',
  description: 'exclamation question mark',
  category: 'Symbols',
  aliases: ['interrobang'],
  tags: [],
  unicode_version: '3.0',
  ios_version: '6.0'
}, {
  emoji: '❓',
  description: 'red question mark',
  category: 'Symbols',
  aliases: ['question'],
  tags: ['confused'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '❔',
  description: 'white question mark',
  category: 'Symbols',
  aliases: ['grey_question'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '❕',
  description: 'white exclamation mark',
  category: 'Symbols',
  aliases: ['grey_exclamation'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '❗',
  description: 'red exclamation mark',
  category: 'Symbols',
  aliases: ['exclamation', 'heavy_exclamation_mark'],
  tags: ['bang'],
  unicode_version: '5.2',
  ios_version: '6.0'
}, {
  emoji: '〰️',
  description: 'wavy dash',
  category: 'Symbols',
  aliases: ['wavy_dash'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '💱',
  description: 'currency exchange',
  category: 'Symbols',
  aliases: ['currency_exchange'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💲',
  description: 'heavy dollar sign',
  category: 'Symbols',
  aliases: ['heavy_dollar_sign'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '⚕️',
  description: 'medical symbol',
  category: 'Symbols',
  aliases: ['medical_symbol'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '♻️',
  description: 'recycling symbol',
  category: 'Symbols',
  aliases: ['recycle'],
  tags: ['environment', 'green'],
  unicode_version: '3.2',
  ios_version: '6.0'
}, {
  emoji: '⚜️',
  description: 'fleur-de-lis',
  category: 'Symbols',
  aliases: ['fleur_de_lis'],
  tags: [],
  unicode_version: '4.1',
  ios_version: '9.1'
}, {
  emoji: '🔱',
  description: 'trident emblem',
  category: 'Symbols',
  aliases: ['trident'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '📛',
  description: 'name badge',
  category: 'Symbols',
  aliases: ['name_badge'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔰',
  description: 'Japanese symbol for beginner',
  category: 'Symbols',
  aliases: ['beginner'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '⭕',
  description: 'hollow red circle',
  category: 'Symbols',
  aliases: ['o'],
  tags: [],
  unicode_version: '5.2',
  ios_version: '6.0'
}, {
  emoji: '✅',
  description: 'check mark button',
  category: 'Symbols',
  aliases: ['white_check_mark'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '☑️',
  description: 'check box with check',
  category: 'Symbols',
  aliases: ['ballot_box_with_check'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '✔️',
  description: 'check mark',
  category: 'Symbols',
  aliases: ['heavy_check_mark'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '❌',
  description: 'cross mark',
  category: 'Symbols',
  aliases: ['x'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '❎',
  description: 'cross mark button',
  category: 'Symbols',
  aliases: ['negative_squared_cross_mark'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '➰',
  description: 'curly loop',
  category: 'Symbols',
  aliases: ['curly_loop'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '➿',
  description: 'double curly loop',
  category: 'Symbols',
  aliases: ['loop'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '〽️',
  description: 'part alternation mark',
  category: 'Symbols',
  aliases: ['part_alternation_mark'],
  tags: [],
  unicode_version: '3.2',
  ios_version: '6.0'
}, {
  emoji: '✳️',
  description: 'eight-spoked asterisk',
  category: 'Symbols',
  aliases: ['eight_spoked_asterisk'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '✴️',
  description: 'eight-pointed star',
  category: 'Symbols',
  aliases: ['eight_pointed_black_star'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '❇️',
  description: 'sparkle',
  category: 'Symbols',
  aliases: ['sparkle'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '©️',
  description: 'copyright',
  category: 'Symbols',
  aliases: ['copyright'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '®️',
  description: 'registered',
  category: 'Symbols',
  aliases: ['registered'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '™️',
  description: 'trade mark',
  category: 'Symbols',
  aliases: ['tm'],
  tags: ['trademark'],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '#️⃣',
  description: 'keycap: #',
  category: 'Symbols',
  aliases: ['hash'],
  tags: ['number'],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '*️⃣',
  description: 'keycap: *',
  category: 'Symbols',
  aliases: ['asterisk'],
  tags: [],
  unicode_version: '',
  ios_version: '9.1'
}, {
  emoji: '0️⃣',
  description: 'keycap: 0',
  category: 'Symbols',
  aliases: ['zero'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '1️⃣',
  description: 'keycap: 1',
  category: 'Symbols',
  aliases: ['one'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '2️⃣',
  description: 'keycap: 2',
  category: 'Symbols',
  aliases: ['two'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '3️⃣',
  description: 'keycap: 3',
  category: 'Symbols',
  aliases: ['three'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '4️⃣',
  description: 'keycap: 4',
  category: 'Symbols',
  aliases: ['four'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '5️⃣',
  description: 'keycap: 5',
  category: 'Symbols',
  aliases: ['five'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '6️⃣',
  description: 'keycap: 6',
  category: 'Symbols',
  aliases: ['six'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '7️⃣',
  description: 'keycap: 7',
  category: 'Symbols',
  aliases: ['seven'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '8️⃣',
  description: 'keycap: 8',
  category: 'Symbols',
  aliases: ['eight'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '9️⃣',
  description: 'keycap: 9',
  category: 'Symbols',
  aliases: ['nine'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '🔟',
  description: 'keycap: 10',
  category: 'Symbols',
  aliases: ['keycap_ten'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔠',
  description: 'input latin uppercase',
  category: 'Symbols',
  aliases: ['capital_abcd'],
  tags: ['letters'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔡',
  description: 'input latin lowercase',
  category: 'Symbols',
  aliases: ['abcd'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔢',
  description: 'input numbers',
  category: 'Symbols',
  aliases: ['1234'],
  tags: ['numbers'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔣',
  description: 'input symbols',
  category: 'Symbols',
  aliases: ['symbols'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔤',
  description: 'input latin letters',
  category: 'Symbols',
  aliases: ['abc'],
  tags: ['alphabet'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🅰️',
  description: 'A button (blood type)',
  category: 'Symbols',
  aliases: ['a'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🆎',
  description: 'AB button (blood type)',
  category: 'Symbols',
  aliases: ['ab'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🅱️',
  description: 'B button (blood type)',
  category: 'Symbols',
  aliases: ['b'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🆑',
  description: 'CL button',
  category: 'Symbols',
  aliases: ['cl'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🆒',
  description: 'COOL button',
  category: 'Symbols',
  aliases: ['cool'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🆓',
  description: 'FREE button',
  category: 'Symbols',
  aliases: ['free'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: 'ℹ️',
  description: 'information',
  category: 'Symbols',
  aliases: ['information_source'],
  tags: [],
  unicode_version: '3.0',
  ios_version: '6.0'
}, {
  emoji: '🆔',
  description: 'ID button',
  category: 'Symbols',
  aliases: ['id'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: 'Ⓜ️',
  description: 'circled M',
  category: 'Symbols',
  aliases: ['m'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '🆕',
  description: 'NEW button',
  category: 'Symbols',
  aliases: ['new'],
  tags: ['fresh'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🆖',
  description: 'NG button',
  category: 'Symbols',
  aliases: ['ng'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🅾️',
  description: 'O button (blood type)',
  category: 'Symbols',
  aliases: ['o2'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🆗',
  description: 'OK button',
  category: 'Symbols',
  aliases: ['ok'],
  tags: ['yes'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🅿️',
  description: 'P button',
  category: 'Symbols',
  aliases: ['parking'],
  tags: [],
  unicode_version: '5.2',
  ios_version: '6.0'
}, {
  emoji: '🆘',
  description: 'SOS button',
  category: 'Symbols',
  aliases: ['sos'],
  tags: ['help', 'emergency'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🆙',
  description: 'UP! button',
  category: 'Symbols',
  aliases: ['up'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🆚',
  description: 'VS button',
  category: 'Symbols',
  aliases: ['vs'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🈁',
  description: 'Japanese “here” button',
  category: 'Symbols',
  aliases: ['koko'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🈂️',
  description: 'Japanese “service charge” button',
  category: 'Symbols',
  aliases: ['sa'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🈷️',
  description: 'Japanese “monthly amount” button',
  category: 'Symbols',
  aliases: ['u6708'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🈶',
  description: 'Japanese “not free of charge” button',
  category: 'Symbols',
  aliases: ['u6709'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🈯',
  description: 'Japanese “reserved” button',
  category: 'Symbols',
  aliases: ['u6307'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '🉐',
  description: 'Japanese “bargain” button',
  category: 'Symbols',
  aliases: ['ideograph_advantage'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🈹',
  description: 'Japanese “discount” button',
  category: 'Symbols',
  aliases: ['u5272'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🈚',
  description: 'Japanese “free of charge” button',
  category: 'Symbols',
  aliases: ['u7121'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '🈲',
  description: 'Japanese “prohibited” button',
  category: 'Symbols',
  aliases: ['u7981'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🉑',
  description: 'Japanese “acceptable” button',
  category: 'Symbols',
  aliases: ['accept'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🈸',
  description: 'Japanese “application” button',
  category: 'Symbols',
  aliases: ['u7533'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🈴',
  description: 'Japanese “passing grade” button',
  category: 'Symbols',
  aliases: ['u5408'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🈳',
  description: 'Japanese “vacancy” button',
  category: 'Symbols',
  aliases: ['u7a7a'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '㊗️',
  description: 'Japanese “congratulations” button',
  category: 'Symbols',
  aliases: ['congratulations'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '㊙️',
  description: 'Japanese “secret” button',
  category: 'Symbols',
  aliases: ['secret'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '🈺',
  description: 'Japanese “open for business” button',
  category: 'Symbols',
  aliases: ['u55b6'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🈵',
  description: 'Japanese “no vacancy” button',
  category: 'Symbols',
  aliases: ['u6e80'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔴',
  description: 'red circle',
  category: 'Symbols',
  aliases: ['red_circle'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🟠',
  description: 'orange circle',
  category: 'Symbols',
  aliases: ['orange_circle'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🟡',
  description: 'yellow circle',
  category: 'Symbols',
  aliases: ['yellow_circle'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🟢',
  description: 'green circle',
  category: 'Symbols',
  aliases: ['green_circle'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🔵',
  description: 'blue circle',
  category: 'Symbols',
  aliases: ['large_blue_circle'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🟣',
  description: 'purple circle',
  category: 'Symbols',
  aliases: ['purple_circle'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🟤',
  description: 'brown circle',
  category: 'Symbols',
  aliases: ['brown_circle'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '⚫',
  description: 'black circle',
  category: 'Symbols',
  aliases: ['black_circle'],
  tags: [],
  unicode_version: '4.1',
  ios_version: '6.0'
}, {
  emoji: '⚪',
  description: 'white circle',
  category: 'Symbols',
  aliases: ['white_circle'],
  tags: [],
  unicode_version: '4.1',
  ios_version: '6.0'
}, {
  emoji: '🟥',
  description: 'red square',
  category: 'Symbols',
  aliases: ['red_square'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🟧',
  description: 'orange square',
  category: 'Symbols',
  aliases: ['orange_square'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🟨',
  description: 'yellow square',
  category: 'Symbols',
  aliases: ['yellow_square'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🟩',
  description: 'green square',
  category: 'Symbols',
  aliases: ['green_square'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🟦',
  description: 'blue square',
  category: 'Symbols',
  aliases: ['blue_square'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🟪',
  description: 'purple square',
  category: 'Symbols',
  aliases: ['purple_square'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '🟫',
  description: 'brown square',
  category: 'Symbols',
  aliases: ['brown_square'],
  tags: [],
  unicode_version: '12.0',
  ios_version: '13.0'
}, {
  emoji: '⬛',
  description: 'black large square',
  category: 'Symbols',
  aliases: ['black_large_square'],
  tags: [],
  unicode_version: '5.1',
  ios_version: '6.0'
}, {
  emoji: '⬜',
  description: 'white large square',
  category: 'Symbols',
  aliases: ['white_large_square'],
  tags: [],
  unicode_version: '5.1',
  ios_version: '6.0'
}, {
  emoji: '◼️',
  description: 'black medium square',
  category: 'Symbols',
  aliases: ['black_medium_square'],
  tags: [],
  unicode_version: '3.2',
  ios_version: '6.0'
}, {
  emoji: '◻️',
  description: 'white medium square',
  category: 'Symbols',
  aliases: ['white_medium_square'],
  tags: [],
  unicode_version: '3.2',
  ios_version: '6.0'
}, {
  emoji: '◾',
  description: 'black medium-small square',
  category: 'Symbols',
  aliases: ['black_medium_small_square'],
  tags: [],
  unicode_version: '3.2',
  ios_version: '6.0'
}, {
  emoji: '◽',
  description: 'white medium-small square',
  category: 'Symbols',
  aliases: ['white_medium_small_square'],
  tags: [],
  unicode_version: '3.2',
  ios_version: '6.0'
}, {
  emoji: '▪️',
  description: 'black small square',
  category: 'Symbols',
  aliases: ['black_small_square'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '▫️',
  description: 'white small square',
  category: 'Symbols',
  aliases: ['white_small_square'],
  tags: [],
  unicode_version: '',
  ios_version: '6.0'
}, {
  emoji: '🔶',
  description: 'large orange diamond',
  category: 'Symbols',
  aliases: ['large_orange_diamond'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔷',
  description: 'large blue diamond',
  category: 'Symbols',
  aliases: ['large_blue_diamond'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔸',
  description: 'small orange diamond',
  category: 'Symbols',
  aliases: ['small_orange_diamond'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔹',
  description: 'small blue diamond',
  category: 'Symbols',
  aliases: ['small_blue_diamond'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔺',
  description: 'red triangle pointed up',
  category: 'Symbols',
  aliases: ['small_red_triangle'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔻',
  description: 'red triangle pointed down',
  category: 'Symbols',
  aliases: ['small_red_triangle_down'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '💠',
  description: 'diamond with a dot',
  category: 'Symbols',
  aliases: ['diamond_shape_with_a_dot_inside'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔘',
  description: 'radio button',
  category: 'Symbols',
  aliases: ['radio_button'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔳',
  description: 'white square button',
  category: 'Symbols',
  aliases: ['white_square_button'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🔲',
  description: 'black square button',
  category: 'Symbols',
  aliases: ['black_square_button'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🏁',
  description: 'chequered flag',
  category: 'Flags',
  aliases: ['checkered_flag'],
  tags: ['milestone', 'finish'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🚩',
  description: 'triangular flag',
  category: 'Flags',
  aliases: ['triangular_flag_on_post'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🎌',
  description: 'crossed flags',
  category: 'Flags',
  aliases: ['crossed_flags'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🏴',
  description: 'black flag',
  category: 'Flags',
  aliases: ['black_flag'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🏳️',
  description: 'white flag',
  category: 'Flags',
  aliases: ['white_flag'],
  tags: [],
  unicode_version: '7.0',
  ios_version: '9.1'
}, {
  emoji: '🏳️‍🌈',
  description: 'rainbow flag',
  category: 'Flags',
  aliases: ['rainbow_flag'],
  tags: ['pride'],
  unicode_version: '6.0',
  ios_version: '10.0'
}, {
  emoji: '🏳️‍⚧️',
  description: 'transgender flag',
  category: 'Flags',
  aliases: ['transgender_flag'],
  tags: [],
  unicode_version: '13.0',
  ios_version: '14.0'
}, {
  emoji: '🏴‍☠️',
  description: 'pirate flag',
  category: 'Flags',
  aliases: ['pirate_flag'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🇦🇨',
  description: 'flag: Ascension Island',
  category: 'Flags',
  aliases: ['ascension_island'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🇦🇩',
  description: 'flag: Andorra',
  category: 'Flags',
  aliases: ['andorra'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇦🇪',
  description: 'flag: United Arab Emirates',
  category: 'Flags',
  aliases: ['united_arab_emirates'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇦🇫',
  description: 'flag: Afghanistan',
  category: 'Flags',
  aliases: ['afghanistan'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇦🇬',
  description: 'flag: Antigua & Barbuda',
  category: 'Flags',
  aliases: ['antigua_barbuda'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇦🇮',
  description: 'flag: Anguilla',
  category: 'Flags',
  aliases: ['anguilla'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇦🇱',
  description: 'flag: Albania',
  category: 'Flags',
  aliases: ['albania'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇦🇲',
  description: 'flag: Armenia',
  category: 'Flags',
  aliases: ['armenia'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇦🇴',
  description: 'flag: Angola',
  category: 'Flags',
  aliases: ['angola'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇦🇶',
  description: 'flag: Antarctica',
  category: 'Flags',
  aliases: ['antarctica'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.0'
}, {
  emoji: '🇦🇷',
  description: 'flag: Argentina',
  category: 'Flags',
  aliases: ['argentina'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇦🇸',
  description: 'flag: American Samoa',
  category: 'Flags',
  aliases: ['american_samoa'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇦🇹',
  description: 'flag: Austria',
  category: 'Flags',
  aliases: ['austria'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇦🇺',
  description: 'flag: Australia',
  category: 'Flags',
  aliases: ['australia'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇦🇼',
  description: 'flag: Aruba',
  category: 'Flags',
  aliases: ['aruba'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇦🇽',
  description: 'flag: Åland Islands',
  category: 'Flags',
  aliases: ['aland_islands'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.0'
}, {
  emoji: '🇦🇿',
  description: 'flag: Azerbaijan',
  category: 'Flags',
  aliases: ['azerbaijan'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇧🇦',
  description: 'flag: Bosnia & Herzegovina',
  category: 'Flags',
  aliases: ['bosnia_herzegovina'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇧🇧',
  description: 'flag: Barbados',
  category: 'Flags',
  aliases: ['barbados'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇧🇩',
  description: 'flag: Bangladesh',
  category: 'Flags',
  aliases: ['bangladesh'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇧🇪',
  description: 'flag: Belgium',
  category: 'Flags',
  aliases: ['belgium'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇧🇫',
  description: 'flag: Burkina Faso',
  category: 'Flags',
  aliases: ['burkina_faso'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇧🇬',
  description: 'flag: Bulgaria',
  category: 'Flags',
  aliases: ['bulgaria'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇧🇭',
  description: 'flag: Bahrain',
  category: 'Flags',
  aliases: ['bahrain'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇧🇮',
  description: 'flag: Burundi',
  category: 'Flags',
  aliases: ['burundi'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇧🇯',
  description: 'flag: Benin',
  category: 'Flags',
  aliases: ['benin'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇧🇱',
  description: 'flag: St. Barthélemy',
  category: 'Flags',
  aliases: ['st_barthelemy'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.0'
}, {
  emoji: '🇧🇲',
  description: 'flag: Bermuda',
  category: 'Flags',
  aliases: ['bermuda'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇧🇳',
  description: 'flag: Brunei',
  category: 'Flags',
  aliases: ['brunei'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇧🇴',
  description: 'flag: Bolivia',
  category: 'Flags',
  aliases: ['bolivia'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇧🇶',
  description: 'flag: Caribbean Netherlands',
  category: 'Flags',
  aliases: ['caribbean_netherlands'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.0'
}, {
  emoji: '🇧🇷',
  description: 'flag: Brazil',
  category: 'Flags',
  aliases: ['brazil'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇧🇸',
  description: 'flag: Bahamas',
  category: 'Flags',
  aliases: ['bahamas'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇧🇹',
  description: 'flag: Bhutan',
  category: 'Flags',
  aliases: ['bhutan'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇧🇻',
  description: 'flag: Bouvet Island',
  category: 'Flags',
  aliases: ['bouvet_island'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🇧🇼',
  description: 'flag: Botswana',
  category: 'Flags',
  aliases: ['botswana'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇧🇾',
  description: 'flag: Belarus',
  category: 'Flags',
  aliases: ['belarus'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇧🇿',
  description: 'flag: Belize',
  category: 'Flags',
  aliases: ['belize'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇨🇦',
  description: 'flag: Canada',
  category: 'Flags',
  aliases: ['canada'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇨🇨',
  description: 'flag: Cocos (Keeling) Islands',
  category: 'Flags',
  aliases: ['cocos_islands'],
  tags: ['keeling'],
  unicode_version: '6.0',
  ios_version: '9.0'
}, {
  emoji: '🇨🇩',
  description: 'flag: Congo - Kinshasa',
  category: 'Flags',
  aliases: ['congo_kinshasa'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇨🇫',
  description: 'flag: Central African Republic',
  category: 'Flags',
  aliases: ['central_african_republic'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇨🇬',
  description: 'flag: Congo - Brazzaville',
  category: 'Flags',
  aliases: ['congo_brazzaville'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇨🇭',
  description: 'flag: Switzerland',
  category: 'Flags',
  aliases: ['switzerland'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇨🇮',
  description: 'flag: Côte d’Ivoire',
  category: 'Flags',
  aliases: ['cote_divoire'],
  tags: ['ivory'],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇨🇰',
  description: 'flag: Cook Islands',
  category: 'Flags',
  aliases: ['cook_islands'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇨🇱',
  description: 'flag: Chile',
  category: 'Flags',
  aliases: ['chile'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇨🇲',
  description: 'flag: Cameroon',
  category: 'Flags',
  aliases: ['cameroon'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇨🇳',
  description: 'flag: China',
  category: 'Flags',
  aliases: ['cn'],
  tags: ['china'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🇨🇴',
  description: 'flag: Colombia',
  category: 'Flags',
  aliases: ['colombia'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇨🇵',
  description: 'flag: Clipperton Island',
  category: 'Flags',
  aliases: ['clipperton_island'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🇨🇷',
  description: 'flag: Costa Rica',
  category: 'Flags',
  aliases: ['costa_rica'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇨🇺',
  description: 'flag: Cuba',
  category: 'Flags',
  aliases: ['cuba'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇨🇻',
  description: 'flag: Cape Verde',
  category: 'Flags',
  aliases: ['cape_verde'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇨🇼',
  description: 'flag: Curaçao',
  category: 'Flags',
  aliases: ['curacao'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇨🇽',
  description: 'flag: Christmas Island',
  category: 'Flags',
  aliases: ['christmas_island'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.0'
}, {
  emoji: '🇨🇾',
  description: 'flag: Cyprus',
  category: 'Flags',
  aliases: ['cyprus'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇨🇿',
  description: 'flag: Czechia',
  category: 'Flags',
  aliases: ['czech_republic'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇩🇪',
  description: 'flag: Germany',
  category: 'Flags',
  aliases: ['de'],
  tags: ['flag', 'germany'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🇩🇬',
  description: 'flag: Diego Garcia',
  category: 'Flags',
  aliases: ['diego_garcia'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🇩🇯',
  description: 'flag: Djibouti',
  category: 'Flags',
  aliases: ['djibouti'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇩🇰',
  description: 'flag: Denmark',
  category: 'Flags',
  aliases: ['denmark'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇩🇲',
  description: 'flag: Dominica',
  category: 'Flags',
  aliases: ['dominica'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇩🇴',
  description: 'flag: Dominican Republic',
  category: 'Flags',
  aliases: ['dominican_republic'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇩🇿',
  description: 'flag: Algeria',
  category: 'Flags',
  aliases: ['algeria'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇪🇦',
  description: 'flag: Ceuta & Melilla',
  category: 'Flags',
  aliases: ['ceuta_melilla'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🇪🇨',
  description: 'flag: Ecuador',
  category: 'Flags',
  aliases: ['ecuador'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇪🇪',
  description: 'flag: Estonia',
  category: 'Flags',
  aliases: ['estonia'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇪🇬',
  description: 'flag: Egypt',
  category: 'Flags',
  aliases: ['egypt'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇪🇭',
  description: 'flag: Western Sahara',
  category: 'Flags',
  aliases: ['western_sahara'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.0'
}, {
  emoji: '🇪🇷',
  description: 'flag: Eritrea',
  category: 'Flags',
  aliases: ['eritrea'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇪🇸',
  description: 'flag: Spain',
  category: 'Flags',
  aliases: ['es'],
  tags: ['spain'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🇪🇹',
  description: 'flag: Ethiopia',
  category: 'Flags',
  aliases: ['ethiopia'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇪🇺',
  description: 'flag: European Union',
  category: 'Flags',
  aliases: ['eu', 'european_union'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.0'
}, {
  emoji: '🇫🇮',
  description: 'flag: Finland',
  category: 'Flags',
  aliases: ['finland'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇫🇯',
  description: 'flag: Fiji',
  category: 'Flags',
  aliases: ['fiji'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇫🇰',
  description: 'flag: Falkland Islands',
  category: 'Flags',
  aliases: ['falkland_islands'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.0'
}, {
  emoji: '🇫🇲',
  description: 'flag: Micronesia',
  category: 'Flags',
  aliases: ['micronesia'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.0'
}, {
  emoji: '🇫🇴',
  description: 'flag: Faroe Islands',
  category: 'Flags',
  aliases: ['faroe_islands'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇫🇷',
  description: 'flag: France',
  category: 'Flags',
  aliases: ['fr'],
  tags: ['france', 'french'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🇬🇦',
  description: 'flag: Gabon',
  category: 'Flags',
  aliases: ['gabon'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇬🇧',
  description: 'flag: United Kingdom',
  category: 'Flags',
  aliases: ['gb', 'uk'],
  tags: ['flag', 'british'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🇬🇩',
  description: 'flag: Grenada',
  category: 'Flags',
  aliases: ['grenada'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇬🇪',
  description: 'flag: Georgia',
  category: 'Flags',
  aliases: ['georgia'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇬🇫',
  description: 'flag: French Guiana',
  category: 'Flags',
  aliases: ['french_guiana'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇬🇬',
  description: 'flag: Guernsey',
  category: 'Flags',
  aliases: ['guernsey'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.0'
}, {
  emoji: '🇬🇭',
  description: 'flag: Ghana',
  category: 'Flags',
  aliases: ['ghana'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇬🇮',
  description: 'flag: Gibraltar',
  category: 'Flags',
  aliases: ['gibraltar'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇬🇱',
  description: 'flag: Greenland',
  category: 'Flags',
  aliases: ['greenland'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.0'
}, {
  emoji: '🇬🇲',
  description: 'flag: Gambia',
  category: 'Flags',
  aliases: ['gambia'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇬🇳',
  description: 'flag: Guinea',
  category: 'Flags',
  aliases: ['guinea'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇬🇵',
  description: 'flag: Guadeloupe',
  category: 'Flags',
  aliases: ['guadeloupe'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.0'
}, {
  emoji: '🇬🇶',
  description: 'flag: Equatorial Guinea',
  category: 'Flags',
  aliases: ['equatorial_guinea'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇬🇷',
  description: 'flag: Greece',
  category: 'Flags',
  aliases: ['greece'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇬🇸',
  description: 'flag: South Georgia & South Sandwich Islands',
  category: 'Flags',
  aliases: ['south_georgia_south_sandwich_islands'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.0'
}, {
  emoji: '🇬🇹',
  description: 'flag: Guatemala',
  category: 'Flags',
  aliases: ['guatemala'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇬🇺',
  description: 'flag: Guam',
  category: 'Flags',
  aliases: ['guam'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇬🇼',
  description: 'flag: Guinea-Bissau',
  category: 'Flags',
  aliases: ['guinea_bissau'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇬🇾',
  description: 'flag: Guyana',
  category: 'Flags',
  aliases: ['guyana'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇭🇰',
  description: 'flag: Hong Kong SAR China',
  category: 'Flags',
  aliases: ['hong_kong'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇭🇲',
  description: 'flag: Heard & McDonald Islands',
  category: 'Flags',
  aliases: ['heard_mcdonald_islands'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🇭🇳',
  description: 'flag: Honduras',
  category: 'Flags',
  aliases: ['honduras'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇭🇷',
  description: 'flag: Croatia',
  category: 'Flags',
  aliases: ['croatia'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇭🇹',
  description: 'flag: Haiti',
  category: 'Flags',
  aliases: ['haiti'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇭🇺',
  description: 'flag: Hungary',
  category: 'Flags',
  aliases: ['hungary'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇮🇨',
  description: 'flag: Canary Islands',
  category: 'Flags',
  aliases: ['canary_islands'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.0'
}, {
  emoji: '🇮🇩',
  description: 'flag: Indonesia',
  category: 'Flags',
  aliases: ['indonesia'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇮🇪',
  description: 'flag: Ireland',
  category: 'Flags',
  aliases: ['ireland'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇮🇱',
  description: 'flag: Israel',
  category: 'Flags',
  aliases: ['israel'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇮🇲',
  description: 'flag: Isle of Man',
  category: 'Flags',
  aliases: ['isle_of_man'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.0'
}, {
  emoji: '🇮🇳',
  description: 'flag: India',
  category: 'Flags',
  aliases: ['india'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇮🇴',
  description: 'flag: British Indian Ocean Territory',
  category: 'Flags',
  aliases: ['british_indian_ocean_territory'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.0'
}, {
  emoji: '🇮🇶',
  description: 'flag: Iraq',
  category: 'Flags',
  aliases: ['iraq'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇮🇷',
  description: 'flag: Iran',
  category: 'Flags',
  aliases: ['iran'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇮🇸',
  description: 'flag: Iceland',
  category: 'Flags',
  aliases: ['iceland'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇮🇹',
  description: 'flag: Italy',
  category: 'Flags',
  aliases: ['it'],
  tags: ['italy'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🇯🇪',
  description: 'flag: Jersey',
  category: 'Flags',
  aliases: ['jersey'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.0'
}, {
  emoji: '🇯🇲',
  description: 'flag: Jamaica',
  category: 'Flags',
  aliases: ['jamaica'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇯🇴',
  description: 'flag: Jordan',
  category: 'Flags',
  aliases: ['jordan'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇯🇵',
  description: 'flag: Japan',
  category: 'Flags',
  aliases: ['jp'],
  tags: ['japan'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🇰🇪',
  description: 'flag: Kenya',
  category: 'Flags',
  aliases: ['kenya'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇰🇬',
  description: 'flag: Kyrgyzstan',
  category: 'Flags',
  aliases: ['kyrgyzstan'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇰🇭',
  description: 'flag: Cambodia',
  category: 'Flags',
  aliases: ['cambodia'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇰🇮',
  description: 'flag: Kiribati',
  category: 'Flags',
  aliases: ['kiribati'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇰🇲',
  description: 'flag: Comoros',
  category: 'Flags',
  aliases: ['comoros'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇰🇳',
  description: 'flag: St. Kitts & Nevis',
  category: 'Flags',
  aliases: ['st_kitts_nevis'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇰🇵',
  description: 'flag: North Korea',
  category: 'Flags',
  aliases: ['north_korea'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇰🇷',
  description: 'flag: South Korea',
  category: 'Flags',
  aliases: ['kr'],
  tags: ['korea'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🇰🇼',
  description: 'flag: Kuwait',
  category: 'Flags',
  aliases: ['kuwait'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇰🇾',
  description: 'flag: Cayman Islands',
  category: 'Flags',
  aliases: ['cayman_islands'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇰🇿',
  description: 'flag: Kazakhstan',
  category: 'Flags',
  aliases: ['kazakhstan'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇱🇦',
  description: 'flag: Laos',
  category: 'Flags',
  aliases: ['laos'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇱🇧',
  description: 'flag: Lebanon',
  category: 'Flags',
  aliases: ['lebanon'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇱🇨',
  description: 'flag: St. Lucia',
  category: 'Flags',
  aliases: ['st_lucia'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇱🇮',
  description: 'flag: Liechtenstein',
  category: 'Flags',
  aliases: ['liechtenstein'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇱🇰',
  description: 'flag: Sri Lanka',
  category: 'Flags',
  aliases: ['sri_lanka'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇱🇷',
  description: 'flag: Liberia',
  category: 'Flags',
  aliases: ['liberia'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇱🇸',
  description: 'flag: Lesotho',
  category: 'Flags',
  aliases: ['lesotho'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇱🇹',
  description: 'flag: Lithuania',
  category: 'Flags',
  aliases: ['lithuania'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇱🇺',
  description: 'flag: Luxembourg',
  category: 'Flags',
  aliases: ['luxembourg'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇱🇻',
  description: 'flag: Latvia',
  category: 'Flags',
  aliases: ['latvia'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇱🇾',
  description: 'flag: Libya',
  category: 'Flags',
  aliases: ['libya'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇲🇦',
  description: 'flag: Morocco',
  category: 'Flags',
  aliases: ['morocco'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇲🇨',
  description: 'flag: Monaco',
  category: 'Flags',
  aliases: ['monaco'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.0'
}, {
  emoji: '🇲🇩',
  description: 'flag: Moldova',
  category: 'Flags',
  aliases: ['moldova'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇲🇪',
  description: 'flag: Montenegro',
  category: 'Flags',
  aliases: ['montenegro'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇲🇫',
  description: 'flag: St. Martin',
  category: 'Flags',
  aliases: ['st_martin'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🇲🇬',
  description: 'flag: Madagascar',
  category: 'Flags',
  aliases: ['madagascar'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇲🇭',
  description: 'flag: Marshall Islands',
  category: 'Flags',
  aliases: ['marshall_islands'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.0'
}, {
  emoji: '🇲🇰',
  description: 'flag: North Macedonia',
  category: 'Flags',
  aliases: ['macedonia'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇲🇱',
  description: 'flag: Mali',
  category: 'Flags',
  aliases: ['mali'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇲🇲',
  description: 'flag: Myanmar (Burma)',
  category: 'Flags',
  aliases: ['myanmar'],
  tags: ['burma'],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇲🇳',
  description: 'flag: Mongolia',
  category: 'Flags',
  aliases: ['mongolia'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇲🇴',
  description: 'flag: Macao SAR China',
  category: 'Flags',
  aliases: ['macau'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇲🇵',
  description: 'flag: Northern Mariana Islands',
  category: 'Flags',
  aliases: ['northern_mariana_islands'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇲🇶',
  description: 'flag: Martinique',
  category: 'Flags',
  aliases: ['martinique'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.0'
}, {
  emoji: '🇲🇷',
  description: 'flag: Mauritania',
  category: 'Flags',
  aliases: ['mauritania'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇲🇸',
  description: 'flag: Montserrat',
  category: 'Flags',
  aliases: ['montserrat'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇲🇹',
  description: 'flag: Malta',
  category: 'Flags',
  aliases: ['malta'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇲🇺',
  description: 'flag: Mauritius',
  category: 'Flags',
  aliases: ['mauritius'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.0'
}, {
  emoji: '🇲🇻',
  description: 'flag: Maldives',
  category: 'Flags',
  aliases: ['maldives'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇲🇼',
  description: 'flag: Malawi',
  category: 'Flags',
  aliases: ['malawi'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇲🇽',
  description: 'flag: Mexico',
  category: 'Flags',
  aliases: ['mexico'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇲🇾',
  description: 'flag: Malaysia',
  category: 'Flags',
  aliases: ['malaysia'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇲🇿',
  description: 'flag: Mozambique',
  category: 'Flags',
  aliases: ['mozambique'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇳🇦',
  description: 'flag: Namibia',
  category: 'Flags',
  aliases: ['namibia'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇳🇨',
  description: 'flag: New Caledonia',
  category: 'Flags',
  aliases: ['new_caledonia'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇳🇪',
  description: 'flag: Niger',
  category: 'Flags',
  aliases: ['niger'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇳🇫',
  description: 'flag: Norfolk Island',
  category: 'Flags',
  aliases: ['norfolk_island'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.0'
}, {
  emoji: '🇳🇬',
  description: 'flag: Nigeria',
  category: 'Flags',
  aliases: ['nigeria'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇳🇮',
  description: 'flag: Nicaragua',
  category: 'Flags',
  aliases: ['nicaragua'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇳🇱',
  description: 'flag: Netherlands',
  category: 'Flags',
  aliases: ['netherlands'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇳🇴',
  description: 'flag: Norway',
  category: 'Flags',
  aliases: ['norway'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇳🇵',
  description: 'flag: Nepal',
  category: 'Flags',
  aliases: ['nepal'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇳🇷',
  description: 'flag: Nauru',
  category: 'Flags',
  aliases: ['nauru'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.0'
}, {
  emoji: '🇳🇺',
  description: 'flag: Niue',
  category: 'Flags',
  aliases: ['niue'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇳🇿',
  description: 'flag: New Zealand',
  category: 'Flags',
  aliases: ['new_zealand'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇴🇲',
  description: 'flag: Oman',
  category: 'Flags',
  aliases: ['oman'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇵🇦',
  description: 'flag: Panama',
  category: 'Flags',
  aliases: ['panama'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇵🇪',
  description: 'flag: Peru',
  category: 'Flags',
  aliases: ['peru'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇵🇫',
  description: 'flag: French Polynesia',
  category: 'Flags',
  aliases: ['french_polynesia'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.0'
}, {
  emoji: '🇵🇬',
  description: 'flag: Papua New Guinea',
  category: 'Flags',
  aliases: ['papua_new_guinea'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇵🇭',
  description: 'flag: Philippines',
  category: 'Flags',
  aliases: ['philippines'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇵🇰',
  description: 'flag: Pakistan',
  category: 'Flags',
  aliases: ['pakistan'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇵🇱',
  description: 'flag: Poland',
  category: 'Flags',
  aliases: ['poland'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇵🇲',
  description: 'flag: St. Pierre & Miquelon',
  category: 'Flags',
  aliases: ['st_pierre_miquelon'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.0'
}, {
  emoji: '🇵🇳',
  description: 'flag: Pitcairn Islands',
  category: 'Flags',
  aliases: ['pitcairn_islands'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.0'
}, {
  emoji: '🇵🇷',
  description: 'flag: Puerto Rico',
  category: 'Flags',
  aliases: ['puerto_rico'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇵🇸',
  description: 'flag: Palestinian Territories',
  category: 'Flags',
  aliases: ['palestinian_territories'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇵🇹',
  description: 'flag: Portugal',
  category: 'Flags',
  aliases: ['portugal'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇵🇼',
  description: 'flag: Palau',
  category: 'Flags',
  aliases: ['palau'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇵🇾',
  description: 'flag: Paraguay',
  category: 'Flags',
  aliases: ['paraguay'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇶🇦',
  description: 'flag: Qatar',
  category: 'Flags',
  aliases: ['qatar'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇷🇪',
  description: 'flag: Réunion',
  category: 'Flags',
  aliases: ['reunion'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.0'
}, {
  emoji: '🇷🇴',
  description: 'flag: Romania',
  category: 'Flags',
  aliases: ['romania'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇷🇸',
  description: 'flag: Serbia',
  category: 'Flags',
  aliases: ['serbia'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇷🇺',
  description: 'flag: Russia',
  category: 'Flags',
  aliases: ['ru'],
  tags: ['russia'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🇷🇼',
  description: 'flag: Rwanda',
  category: 'Flags',
  aliases: ['rwanda'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇸🇦',
  description: 'flag: Saudi Arabia',
  category: 'Flags',
  aliases: ['saudi_arabia'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇸🇧',
  description: 'flag: Solomon Islands',
  category: 'Flags',
  aliases: ['solomon_islands'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇸🇨',
  description: 'flag: Seychelles',
  category: 'Flags',
  aliases: ['seychelles'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇸🇩',
  description: 'flag: Sudan',
  category: 'Flags',
  aliases: ['sudan'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇸🇪',
  description: 'flag: Sweden',
  category: 'Flags',
  aliases: ['sweden'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇸🇬',
  description: 'flag: Singapore',
  category: 'Flags',
  aliases: ['singapore'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇸🇭',
  description: 'flag: St. Helena',
  category: 'Flags',
  aliases: ['st_helena'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.0'
}, {
  emoji: '🇸🇮',
  description: 'flag: Slovenia',
  category: 'Flags',
  aliases: ['slovenia'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇸🇯',
  description: 'flag: Svalbard & Jan Mayen',
  category: 'Flags',
  aliases: ['svalbard_jan_mayen'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🇸🇰',
  description: 'flag: Slovakia',
  category: 'Flags',
  aliases: ['slovakia'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇸🇱',
  description: 'flag: Sierra Leone',
  category: 'Flags',
  aliases: ['sierra_leone'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇸🇲',
  description: 'flag: San Marino',
  category: 'Flags',
  aliases: ['san_marino'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇸🇳',
  description: 'flag: Senegal',
  category: 'Flags',
  aliases: ['senegal'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇸🇴',
  description: 'flag: Somalia',
  category: 'Flags',
  aliases: ['somalia'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇸🇷',
  description: 'flag: Suriname',
  category: 'Flags',
  aliases: ['suriname'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇸🇸',
  description: 'flag: South Sudan',
  category: 'Flags',
  aliases: ['south_sudan'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇸🇹',
  description: 'flag: São Tomé & Príncipe',
  category: 'Flags',
  aliases: ['sao_tome_principe'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇸🇻',
  description: 'flag: El Salvador',
  category: 'Flags',
  aliases: ['el_salvador'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇸🇽',
  description: 'flag: Sint Maarten',
  category: 'Flags',
  aliases: ['sint_maarten'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇸🇾',
  description: 'flag: Syria',
  category: 'Flags',
  aliases: ['syria'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇸🇿',
  description: 'flag: Eswatini',
  category: 'Flags',
  aliases: ['swaziland'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇹🇦',
  description: 'flag: Tristan da Cunha',
  category: 'Flags',
  aliases: ['tristan_da_cunha'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🇹🇨',
  description: 'flag: Turks & Caicos Islands',
  category: 'Flags',
  aliases: ['turks_caicos_islands'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇹🇩',
  description: 'flag: Chad',
  category: 'Flags',
  aliases: ['chad'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.0'
}, {
  emoji: '🇹🇫',
  description: 'flag: French Southern Territories',
  category: 'Flags',
  aliases: ['french_southern_territories'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇹🇬',
  description: 'flag: Togo',
  category: 'Flags',
  aliases: ['togo'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇹🇭',
  description: 'flag: Thailand',
  category: 'Flags',
  aliases: ['thailand'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇹🇯',
  description: 'flag: Tajikistan',
  category: 'Flags',
  aliases: ['tajikistan'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇹🇰',
  description: 'flag: Tokelau',
  category: 'Flags',
  aliases: ['tokelau'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.0'
}, {
  emoji: '🇹🇱',
  description: 'flag: Timor-Leste',
  category: 'Flags',
  aliases: ['timor_leste'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇹🇲',
  description: 'flag: Turkmenistan',
  category: 'Flags',
  aliases: ['turkmenistan'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇹🇳',
  description: 'flag: Tunisia',
  category: 'Flags',
  aliases: ['tunisia'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇹🇴',
  description: 'flag: Tonga',
  category: 'Flags',
  aliases: ['tonga'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇹🇷',
  description: 'flag: Turkey',
  category: 'Flags',
  aliases: ['tr'],
  tags: ['turkey'],
  unicode_version: '8.0',
  ios_version: '9.1'
}, {
  emoji: '🇹🇹',
  description: 'flag: Trinidad & Tobago',
  category: 'Flags',
  aliases: ['trinidad_tobago'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇹🇻',
  description: 'flag: Tuvalu',
  category: 'Flags',
  aliases: ['tuvalu'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇹🇼',
  description: 'flag: Taiwan',
  category: 'Flags',
  aliases: ['taiwan'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.0'
}, {
  emoji: '🇹🇿',
  description: 'flag: Tanzania',
  category: 'Flags',
  aliases: ['tanzania'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇺🇦',
  description: 'flag: Ukraine',
  category: 'Flags',
  aliases: ['ukraine'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇺🇬',
  description: 'flag: Uganda',
  category: 'Flags',
  aliases: ['uganda'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇺🇲',
  description: 'flag: U.S. Outlying Islands',
  category: 'Flags',
  aliases: ['us_outlying_islands'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🇺🇳',
  description: 'flag: United Nations',
  category: 'Flags',
  aliases: ['united_nations'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🇺🇸',
  description: 'flag: United States',
  category: 'Flags',
  aliases: ['us'],
  tags: ['flag', 'united', 'america'],
  unicode_version: '6.0',
  ios_version: '6.0'
}, {
  emoji: '🇺🇾',
  description: 'flag: Uruguay',
  category: 'Flags',
  aliases: ['uruguay'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇺🇿',
  description: 'flag: Uzbekistan',
  category: 'Flags',
  aliases: ['uzbekistan'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇻🇦',
  description: 'flag: Vatican City',
  category: 'Flags',
  aliases: ['vatican_city'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.0'
}, {
  emoji: '🇻🇨',
  description: 'flag: St. Vincent & Grenadines',
  category: 'Flags',
  aliases: ['st_vincent_grenadines'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇻🇪',
  description: 'flag: Venezuela',
  category: 'Flags',
  aliases: ['venezuela'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇻🇬',
  description: 'flag: British Virgin Islands',
  category: 'Flags',
  aliases: ['british_virgin_islands'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇻🇮',
  description: 'flag: U.S. Virgin Islands',
  category: 'Flags',
  aliases: ['us_virgin_islands'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇻🇳',
  description: 'flag: Vietnam',
  category: 'Flags',
  aliases: ['vietnam'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇻🇺',
  description: 'flag: Vanuatu',
  category: 'Flags',
  aliases: ['vanuatu'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇼🇫',
  description: 'flag: Wallis & Futuna',
  category: 'Flags',
  aliases: ['wallis_futuna'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.0'
}, {
  emoji: '🇼🇸',
  description: 'flag: Samoa',
  category: 'Flags',
  aliases: ['samoa'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇽🇰',
  description: 'flag: Kosovo',
  category: 'Flags',
  aliases: ['kosovo'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇾🇪',
  description: 'flag: Yemen',
  category: 'Flags',
  aliases: ['yemen'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇾🇹',
  description: 'flag: Mayotte',
  category: 'Flags',
  aliases: ['mayotte'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '9.0'
}, {
  emoji: '🇿🇦',
  description: 'flag: South Africa',
  category: 'Flags',
  aliases: ['south_africa'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇿🇲',
  description: 'flag: Zambia',
  category: 'Flags',
  aliases: ['zambia'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🇿🇼',
  description: 'flag: Zimbabwe',
  category: 'Flags',
  aliases: ['zimbabwe'],
  tags: [],
  unicode_version: '6.0',
  ios_version: '8.3'
}, {
  emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  description: 'flag: England',
  category: 'Flags',
  aliases: ['england'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  description: 'flag: Scotland',
  category: 'Flags',
  aliases: ['scotland'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}, {
  emoji: '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
  description: 'flag: Wales',
  category: 'Flags',
  aliases: ['wales'],
  tags: [],
  unicode_version: '11.0',
  ios_version: '12.1'
}];

var emojiList$1 = {
  __proto__: null,
  'default': emojiList
};

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function getTotalVotes(options) {
  return options.reduce((totalVotes, next) => {
    return totalVotes + next.votes.length;
  }, 0);
}
function PollOptionComponent({
  option,
  index,
  options,
  totalVotes,
  withPollNode
}) {
  const {
    clientID
  } = LexicalCollaborationContext.useCollaborationContext();
  const checkboxRef = React.useRef(null);
  const votesArray = option.votes;
  const checkedIndex = votesArray.indexOf(clientID);
  const checked = checkedIndex !== -1;
  const votes = votesArray.length;
  const text = option.text;
  return /*#__PURE__*/React.createElement("div", {
    className: "PollNode__optionContainer"
  }, /*#__PURE__*/React.createElement("div", {
    className: joinClasses('PollNode__optionCheckboxWrapper', checked && 'PollNode__optionCheckboxChecked')
  }, /*#__PURE__*/React.createElement("input", {
    ref: checkboxRef,
    className: "PollNode__optionCheckbox",
    type: "checkbox",
    onChange: e => {
      withPollNode(node => {
        node.toggleVote(option, clientID);
      });
    },
    checked: checked
  })), /*#__PURE__*/React.createElement("div", {
    className: "PollNode__optionInputWrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "PollNode__optionInputVotes",
    style: {
      width: `${votes === 0 ? 0 : votes / totalVotes * 100}%`
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "PollNode__optionInputVotesCount"
  }, votes > 0 && (votes === 1 ? '1 vote' : `${votes} votes`)), /*#__PURE__*/React.createElement("input", {
    className: "PollNode__optionInput",
    type: "text",
    value: text,
    onChange: e => {
      const target = e.target;
      const value = target.value;
      const selectionStart = target.selectionStart;
      const selectionEnd = target.selectionEnd;
      withPollNode(node => {
        node.setOptionText(option, value);
      }, () => {
        target.selectionStart = selectionStart;
        target.selectionEnd = selectionEnd;
      });
    },
    placeholder: `Option ${index + 1}`
  })), /*#__PURE__*/React.createElement("button", {
    disabled: options.length < 3,
    className: joinClasses('PollNode__optionDelete', options.length < 3 && 'PollNode__optionDeleteDisabled'),
    "arial-label": "Remove",
    onClick: () => {
      withPollNode(node => {
        node.deleteOption(option);
      });
    }
  }));
}
function PollComponent({
  question,
  options,
  nodeKey
}) {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const totalVotes = React.useMemo(() => getTotalVotes(options), [options]);
  const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection.useLexicalNodeSelection(nodeKey);
  const [selection, setSelection] = React.useState(null);
  const ref = React.useRef(null);
  const onDelete = React.useCallback(payload => {
    if (isSelected && lexical.$isNodeSelection(lexical.$getSelection())) {
      const event = payload;
      event.preventDefault();
      const node = lexical.$getNodeByKey(nodeKey);
      if ($isPollNode(node)) {
        node.remove();
      }
      setSelected(false);
    }
    return false;
  }, [isSelected, nodeKey, setSelected]);
  React.useEffect(() => {
    return utils.mergeRegister(editor.registerUpdateListener(({
      editorState
    }) => {
      setSelection(editorState.read(() => lexical.$getSelection()));
    }), editor.registerCommand(lexical.CLICK_COMMAND, payload => {
      const event = payload;
      if (event.target === ref.current) {
        if (!event.shiftKey) {
          clearSelection();
        }
        setSelected(!isSelected);
        return true;
      }
      return false;
    }, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.KEY_DELETE_COMMAND, onDelete, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.KEY_BACKSPACE_COMMAND, onDelete, lexical.COMMAND_PRIORITY_LOW));
  }, [clearSelection, editor, isSelected, nodeKey, onDelete, setSelected]);
  const withPollNode = (cb, onUpdate) => {
    editor.update(() => {
      const node = lexical.$getNodeByKey(nodeKey);
      if ($isPollNode(node)) {
        cb(node);
      }
    }, {
      onUpdate
    });
  };
  const addOption = () => {
    withPollNode(node => {
      node.addOption(createPollOption());
    });
  };
  const isFocused = lexical.$isNodeSelection(selection) && isSelected;
  return /*#__PURE__*/React.createElement("div", {
    className: `PollNode__container ${isFocused ? 'focused' : ''}`,
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    className: "PollNode__inner"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "PollNode__heading"
  }, question), options.map((option, index) => {
    const key = option.uid;
    return /*#__PURE__*/React.createElement(PollOptionComponent, {
      key: key,
      withPollNode: withPollNode,
      option: option,
      index: index,
      options: options,
      totalVotes: totalVotes
    });
  }), /*#__PURE__*/React.createElement("div", {
    className: "PollNode__footer"
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: addOption,
    small: true
  }, "Add Option"))));
}

var PollComponent$1 = {
  __proto__: null,
  'default': PollComponent
};

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const theme = {
  ...baseTheme,
  paragraph: 'StickyEditorTheme__paragraph'
};
var StickyEditorTheme = theme;

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function positionSticky(stickyElem, positioning) {
  const style = stickyElem.style;
  const rootElementRect = positioning.rootElementRect;
  const rectLeft = rootElementRect !== null ? rootElementRect.left : 0;
  const rectTop = rootElementRect !== null ? rootElementRect.top : 0;
  style.top = rectTop + positioning.y + 'px';
  style.left = rectLeft + positioning.x + 'px';
}
function StickyComponent({
  x,
  y,
  nodeKey,
  color,
  caption
}) {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const stickyContainerRef = React.useRef(null);
  const positioningRef = React.useRef({
    isDragging: false,
    offsetX: 0,
    offsetY: 0,
    rootElementRect: null,
    x: 0,
    y: 0
  });
  const {
    isCollabActive
  } = LexicalCollaborationContext.useCollaborationContext();
  React.useEffect(() => {
    const position = positioningRef.current;
    position.x = x;
    position.y = y;
    const stickyContainer = stickyContainerRef.current;
    if (stickyContainer !== null) {
      positionSticky(stickyContainer, position);
    }
  }, [x, y]);
  useLayoutEffect(() => {
    const position = positioningRef.current;
    const resizeObserver = new ResizeObserver(entries => {
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const {
          target
        } = entry;
        position.rootElementRect = target.getBoundingClientRect();
        const stickyContainer = stickyContainerRef.current;
        if (stickyContainer !== null) {
          positionSticky(stickyContainer, position);
        }
      }
    });
    const removeRootListener = editor.registerRootListener((nextRootElem, prevRootElem) => {
      if (prevRootElem !== null) {
        resizeObserver.unobserve(prevRootElem);
      }
      if (nextRootElem !== null) {
        resizeObserver.observe(nextRootElem);
      }
    });
    const handleWindowResize = () => {
      const rootElement = editor.getRootElement();
      const stickyContainer = stickyContainerRef.current;
      if (rootElement !== null && stickyContainer !== null) {
        position.rootElementRect = rootElement.getBoundingClientRect();
        positionSticky(stickyContainer, position);
      }
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
      removeRootListener();
    };
  }, [editor]);
  React.useEffect(() => {
    const stickyContainer = stickyContainerRef.current;
    if (stickyContainer !== null) {
      // Delay adding transition so we don't trigger the
      // transition on load of the sticky.
      setTimeout(() => {
        stickyContainer.style.setProperty('transition', 'top 0.3s ease 0s, left 0.3s ease 0s');
      }, 500);
    }
  }, []);
  const handlePointerMove = event => {
    const stickyContainer = stickyContainerRef.current;
    const positioning = positioningRef.current;
    const rootElementRect = positioning.rootElementRect;
    if (stickyContainer !== null && positioning.isDragging && rootElementRect !== null) {
      positioning.x = event.pageX - positioning.offsetX - rootElementRect.left;
      positioning.y = event.pageY - positioning.offsetY - rootElementRect.top;
      positionSticky(stickyContainer, positioning);
    }
  };
  const handlePointerUp = event => {
    const stickyContainer = stickyContainerRef.current;
    const positioning = positioningRef.current;
    if (stickyContainer !== null) {
      positioning.isDragging = false;
      stickyContainer.classList.remove('dragging');
      editor.update(() => {
        const node = lexical.$getNodeByKey(nodeKey);
        if ($isStickyNode(node)) {
          node.setPosition(positioning.x, positioning.y);
        }
      });
    }
    document.removeEventListener('pointermove', handlePointerMove);
    document.removeEventListener('pointerup', handlePointerUp);
  };
  const handleDelete = () => {
    editor.update(() => {
      const node = lexical.$getNodeByKey(nodeKey);
      if ($isStickyNode(node)) {
        node.remove();
      }
    });
  };
  const handleColorChange = () => {
    editor.update(() => {
      const node = lexical.$getNodeByKey(nodeKey);
      if ($isStickyNode(node)) {
        node.toggleColor();
      }
    });
  };
  const {
    historyState
  } = useSharedHistoryContext();
  return /*#__PURE__*/React.createElement("div", {
    ref: stickyContainerRef,
    className: "sticky-note-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: `sticky-note ${color}`,
    onPointerDown: event => {
      const stickyContainer = stickyContainerRef.current;
      if (stickyContainer == null || event.button === 2 || event.target !== stickyContainer.firstChild) {
        // Right click or click on editor should not work
        return;
      }
      const stickContainer = stickyContainer;
      const positioning = positioningRef.current;
      if (stickContainer !== null) {
        const {
          top,
          left
        } = stickContainer.getBoundingClientRect();
        positioning.offsetX = event.clientX - left;
        positioning.offsetY = event.clientY - top;
        positioning.isDragging = true;
        stickContainer.classList.add('dragging');
        document.addEventListener('pointermove', handlePointerMove);
        document.addEventListener('pointerup', handlePointerUp);
        event.preventDefault();
      }
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handleDelete,
    className: "delete",
    "aria-label": "Delete sticky note",
    title: "Delete"
  }, "X"), /*#__PURE__*/React.createElement("button", {
    onClick: handleColorChange,
    className: "color",
    "aria-label": "Change sticky note color",
    title: "Color"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bucket"
  })), /*#__PURE__*/React.createElement(LexicalNestedComposer.LexicalNestedComposer, {
    initialEditor: caption,
    initialTheme: StickyEditorTheme
  }, isCollabActive ? /*#__PURE__*/React.createElement(LexicalCollaborationPlugin.CollaborationPlugin, {
    id: caption.getKey(),
    providerFactory: createWebsocketProvider,
    shouldBootstrap: true
  }) : /*#__PURE__*/React.createElement(LexicalHistoryPlugin.HistoryPlugin, {
    externalHistoryState: historyState
  }), /*#__PURE__*/React.createElement(LexicalPlainTextPlugin.PlainTextPlugin, {
    contentEditable: /*#__PURE__*/React.createElement(LexicalContentEditable, {
      className: "StickyNode__contentEditable"
    }),
    placeholder: /*#__PURE__*/React.createElement(Placeholder, {
      className: "StickyNode__placeholder"
    }, "What's up?"),
    ErrorBoundary: LexicalErrorBoundary
  }))));
}

var StickyComponent$1 = {
  __proto__: null,
  'default': StickyComponent
};

exports.Editor = Editor;
exports.EditorComposer = EditorComposer;
exports.PasteLogPlugin = PasteLogPlugin;
exports.PlaygroundEditorTheme = baseTheme;
exports.PlaygroundNodes = PlaygroundNodes$1;
exports.SharedAutocompleteContext = SharedAutocompleteContext;
exports.SharedHistoryContext = SharedHistoryContext;
exports.TestRecorderPlugin = TestRecorderPlugin;
exports.TypingPerfPlugin = TypingPerfPlugin;
exports.useSyncWithInputHtml = useSyncWithInputHtml$1;
exports.useSyncWithInputJson = useSyncWithInputJson$1;
for (var k in html) {
  if (k !== 'default' && !exports.hasOwnProperty(k)) exports[k] = html[k];
}
for (var k in LexicalComposerContext) {
  if (k !== 'default' && !exports.hasOwnProperty(k)) exports[k] = LexicalComposerContext[k];
}
for (var k in lexical) {
  if (k !== 'default' && !exports.hasOwnProperty(k)) exports[k] = lexical[k];
}
for (var k in LexicalComposer) {
  if (k !== 'default' && !exports.hasOwnProperty(k)) exports[k] = LexicalComposer[k];
}
