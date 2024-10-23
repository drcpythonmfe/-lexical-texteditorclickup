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
var useLexicalNodeSelection = require('@lexical/react/useLexicalNodeSelection');
var Excalidraw = require('@excalidraw/excalidraw');
var reactDom = require('react-dom');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

const ExcalidrawComponent$2 = /*#__PURE__*/React.lazy(() => Promise.resolve().then(function () { return ExcalidrawComponent$1; }));

function $convertExcalidrawElement(domNode) {
  const excalidrawData = domNode.getAttribute('data-lexical-excalidraw-json');
  const styleAttributes = window.getComputedStyle(domNode);
  const heightStr = styleAttributes.getPropertyValue('height');
  const widthStr = styleAttributes.getPropertyValue('width');
  const height = !heightStr || heightStr === 'inherit' ? 'inherit' : parseInt(heightStr, 10);
  const width = !widthStr || widthStr === 'inherit' ? 'inherit' : parseInt(widthStr, 10);

  if (excalidrawData) {
    const node = $createExcalidrawNode(excalidrawData, width, height);
    return {
      node
    };
  }

  return null;
}

class ExcalidrawNode extends lexical.DecoratorNode {
  static getType() {
    return 'excalidraw';
  }

  static clone(node) {
    return new ExcalidrawNode(node.__data, node.__width, node.__height, node.__key);
  }

  static importJSON(serializedNode) {
    return new ExcalidrawNode(serializedNode.data, serializedNode.width ?? 'inherit', serializedNode.height ?? 'inherit');
  }

  exportJSON() {
    return { ...super.exportJSON(),
      data: this.__data,
      height: this.__height === 'inherit' ? undefined : this.__height,
      type: 'excalidraw',
      version: 1,
      width: this.__width === 'inherit' ? undefined : this.__width
    };
  }

  constructor(data = '[]', width = 'inherit', height = 'inherit', key) {
    super(key);

    _defineProperty(this, "__data", void 0);

    _defineProperty(this, "__width", void 0);

    _defineProperty(this, "__height", void 0);

    this.__data = data;
    this.__width = width;
    this.__height = height;
  } // View


  createDOM(config) {
    const span = document.createElement('span');
    const theme = config.theme;
    const className = theme.image;

    if (className !== undefined) {
      span.className = className;
    }

    return span;
  }

  updateDOM() {
    return false;
  }

  static importDOM() {
    return {
      span: domNode => {
        if (!domNode.hasAttribute('data-lexical-excalidraw-json')) {
          return null;
        }

        return {
          conversion: $convertExcalidrawElement,
          priority: 1
        };
      }
    };
  }

  exportDOM(editor) {
    const element = document.createElement('span');
    element.style.display = 'inline-block';
    const content = editor.getElementByKey(this.getKey());

    if (content !== null) {
      const svg = content.querySelector('svg');

      if (svg !== null) {
        element.innerHTML = svg.outerHTML;
      }
    }

    element.style.width = this.__width === 'inherit' ? 'inherit' : `${this.__width}px`;
    element.style.height = this.__height === 'inherit' ? 'inherit' : `${this.__height}px`;
    element.setAttribute('data-lexical-excalidraw-json', this.__data);
    return {
      element
    };
  }

  setData(data) {
    const self = this.getWritable();
    self.__data = data;
  }

  getWidth() {
    return this.getLatest().__width;
  }

  setWidth(width) {
    const self = this.getWritable();
    self.__width = width;
  }

  getHeight() {
    return this.getLatest().__height;
  }

  setHeight(height) {
    const self = this.getWritable();
    self.__height = height;
  }

  decorate(editor, config) {
    return /*#__PURE__*/React.createElement(React.Suspense, {
      fallback: null
    }, /*#__PURE__*/React.createElement(ExcalidrawComponent$2, {
      nodeKey: this.getKey(),
      data: this.__data
    }));
  }

}
function $createExcalidrawNode(data = '[]', width = 'inherit', height = 'inherit') {
  return new ExcalidrawNode(data, width, height);
}
function $isExcalidrawNode(node) {
  return node instanceof ExcalidrawNode;
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const INSERT_EXCALIDRAW_COMMAND = lexical.createCommand('INSERT_EXCALIDRAW_COMMAND');
function ExcalidrawPlugin() {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  React.useEffect(() => {
    if (!editor.hasNodes([ExcalidrawNode])) {
      throw new Error('ExcalidrawPlugin: ExcalidrawNode not registered on editor');
    }

    return editor.registerCommand(INSERT_EXCALIDRAW_COMMAND, () => {
      const excalidrawNode = $createExcalidrawNode();
      lexical.$insertNodes([excalidrawNode]);

      if (lexical.$isRootOrShadowRoot(excalidrawNode.getParentOrThrow())) {
        utils.$wrapNodeInElement(excalidrawNode, lexical.$createParagraphNode).selectEnd();
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
function ExcalidrawDropDownItem({
  activeEditor
}) {
  return /*#__PURE__*/React.createElement(DropDownItem, {
    onClick: () => {
      activeEditor.dispatchCommand(INSERT_EXCALIDRAW_COMMAND, undefined);
    },
    className: "item"
  }, /*#__PURE__*/React.createElement("i", {
    className: "icon diagram-2"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, "Excalidraw"));
}

/* eslint-disable header/header */
const excalidrawExt = {
  name: 'excalidraw',
  node: ExcalidrawNode,
  plugin: ExcalidrawPlugin,
  toolbarInsertAfter: ExcalidrawDropDownItem
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
  const editorRootElement = editor.getRootElement(); // Find max width, accounting for editor padding.

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

// exportToSvg has fonts from excalidraw.com
// We don't want them to be used in open source
const removeStyleFromSvg_HACK = svg => {
  const styleTag = svg?.firstElementChild?.firstElementChild; // Generated SVG is getting double-sized by height and width attributes
  // We want to match the real size of the SVG element

  const viewBox = svg.getAttribute('viewBox');

  if (viewBox != null) {
    const viewBoxDimensions = viewBox.split(' ');
    svg.setAttribute('width', viewBoxDimensions[2]);
    svg.setAttribute('height', viewBoxDimensions[3]);
  }

  if (styleTag && styleTag.tagName === 'style') {
    styleTag.remove();
  }
};
/**
 * @explorer-desc
 * A component for rendering Excalidraw elements as a static image
 */


function ExcalidrawImage({
  elements,
  imageContainerRef,
  appState = null,
  rootClassName = null
}) {
  const [Svg, setSvg] = React.useState(null);
  React.useEffect(() => {
    const setContent = async () => {
      const svg = await Excalidraw.exportToSvg({
        elements,
        files: null
      });
      removeStyleFromSvg_HACK(svg);
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
      svg.setAttribute('display', 'block');
      setSvg(svg);
    };

    setContent();
  }, [elements, appState]);
  return /*#__PURE__*/React.createElement("div", {
    ref: imageContainerRef,
    className: rootClassName ?? '',
    dangerouslySetInnerHTML: {
      __html: Svg?.outerHTML ?? ''
    }
  });
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
  return /*#__PURE__*/reactDom.createPortal( /*#__PURE__*/React.createElement(PortalImpl, {
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

/**
 * @explorer-desc
 * A component which renders a modal with Excalidraw (a painting app)
 * which can be used to export an editable image
 */
function ExcalidrawModal({
  closeOnClickOutside = false,
  onSave,
  initialElements,
  isShown = false,
  onDelete
}) {
  const excaliDrawModelRef = React.useRef(null);
  const [discardModalOpen, setDiscardModalOpen] = React.useState(false);
  const [elements, setElements] = React.useState(initialElements);
  React.useEffect(() => {
    if (excaliDrawModelRef.current !== null) {
      excaliDrawModelRef.current.focus();
    }
  }, []);
  React.useEffect(() => {
    let modalOverlayElement = null;

    const clickOutsideHandler = event => {
      const target = event.target;

      if (excaliDrawModelRef.current !== null && !excaliDrawModelRef.current.contains(target) && closeOnClickOutside) {
        onDelete();
      }
    };

    if (excaliDrawModelRef.current !== null) {
      modalOverlayElement = excaliDrawModelRef.current?.parentElement;

      if (modalOverlayElement !== null) {
        modalOverlayElement?.addEventListener('click', clickOutsideHandler);
      }
    }

    return () => {
      if (modalOverlayElement !== null) {
        modalOverlayElement?.removeEventListener('click', clickOutsideHandler);
      }
    };
  }, [closeOnClickOutside, onDelete]);
  React.useLayoutEffect(() => {
    const currentModalRef = excaliDrawModelRef.current;

    const onKeyDown = event => {
      if (event.key === 'Escape') {
        onDelete();
      }
    };

    if (currentModalRef !== null) {
      currentModalRef.addEventListener('keydown', onKeyDown);
    }

    return () => {
      if (currentModalRef !== null) {
        currentModalRef.removeEventListener('keydown', onKeyDown);
      }
    };
  }, [elements, onDelete]);

  const save = () => {
    if (elements.filter(el => !el.isDeleted).length > 0) {
      onSave(elements);
    } else {
      // delete node if the scene is clear
      onDelete();
    }
  };

  const discard = () => {
    if (elements.filter(el => !el.isDeleted).length === 0) {
      // delete node if the scene is clear
      onDelete();
    } else {
      //Otherwise, show confirmation dialog before closing
      setDiscardModalOpen(true);
    }
  };

  function ShowDiscardDialog() {
    return /*#__PURE__*/React.createElement(Modal, {
      title: "Discard",
      onClose: () => {
        setDiscardModalOpen(false);
      },
      closeOnClickOutside: true
    }, "Are you sure you want to discard the changes?", /*#__PURE__*/React.createElement("div", {
      className: "ExcalidrawModal__discardModal"
    }, /*#__PURE__*/React.createElement(Button, {
      onClick: () => {
        setDiscardModalOpen(false);
        onDelete();
      }
    }, "Discard"), ' ', /*#__PURE__*/React.createElement(Button, {
      onClick: () => {
        setDiscardModalOpen(false);
      }
    }, "Cancel")));
  }

  if (isShown === false) {
    return null;
  }

  const onChange = els => {
    setElements(els);
  }; // This is a hacky work-around for Excalidraw + Vite.
  // In DEV, Vite pulls this in fine, in prod it doesn't. It seems
  // like a module resolution issue with ESM vs CJS?


  const _Excalidraw = Excalidraw.$$typeof != null ? Excalidraw : Excalidraw.default;

  return /*#__PURE__*/reactDom.createPortal( /*#__PURE__*/React.createElement("div", {
    className: "ExcalidrawModal__overlay",
    role: "dialog"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ExcalidrawModal__modal",
    ref: excaliDrawModelRef,
    tabIndex: -1
  }, /*#__PURE__*/React.createElement("div", {
    className: "ExcalidrawModal__row"
  }, discardModalOpen && /*#__PURE__*/React.createElement(ShowDiscardDialog, null), /*#__PURE__*/React.createElement(_Excalidraw, {
    onChange: onChange,
    initialData: {
      appState: {
        isLoading: false
      },
      elements: initialElements
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "ExcalidrawModal__actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "action-button",
    onClick: discard
  }, "Discard"), /*#__PURE__*/React.createElement("button", {
    className: "action-button",
    onClick: save
  }, "Save"))))), document.body);
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function ExcalidrawComponent({
  nodeKey,
  data
}) {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const [isModalOpen, setModalOpen] = React.useState(data === '[]' && editor.isEditable());
  const imageContainerRef = React.useRef(null);
  const buttonRef = React.useRef(null);
  const captionButtonRef = React.useRef(null);
  const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection.useLexicalNodeSelection(nodeKey);
  const [isResizing, setIsResizing] = React.useState(false);
  const onDelete = React.useCallback(event => {
    if (isSelected && lexical.$isNodeSelection(lexical.$getSelection())) {
      event.preventDefault();
      editor.update(() => {
        const node = lexical.$getNodeByKey(nodeKey);

        if ($isExcalidrawNode(node)) {
          node.remove();
        }

        setSelected(false);
      });
    }

    return false;
  }, [editor, isSelected, nodeKey, setSelected]); // Set editor to readOnly if excalidraw is open to prevent unwanted changes

  React.useEffect(() => {
    if (isModalOpen) {
      editor.setEditable(false);
    } else {
      editor.setEditable(true);
    }
  }, [isModalOpen, editor]);
  React.useEffect(() => {
    return utils.mergeRegister(editor.registerCommand(lexical.CLICK_COMMAND, event => {
      const buttonElem = buttonRef.current;
      const eventTarget = event.target;

      if (isResizing) {
        return true;
      }

      if (buttonElem !== null && buttonElem.contains(eventTarget)) {
        if (!event.shiftKey) {
          clearSelection();
        }

        setSelected(!isSelected);

        if (event.detail > 1) {
          setModalOpen(true);
        }

        return true;
      }

      return false;
    }, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.KEY_DELETE_COMMAND, onDelete, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.KEY_BACKSPACE_COMMAND, onDelete, lexical.COMMAND_PRIORITY_LOW));
  }, [clearSelection, editor, isSelected, isResizing, onDelete, setSelected]);
  const deleteNode = React.useCallback(() => {
    setModalOpen(false);
    return editor.update(() => {
      const node = lexical.$getNodeByKey(nodeKey);

      if ($isExcalidrawNode(node)) {
        node.remove();
      }
    });
  }, [editor, nodeKey]);

  const setData = newData => {
    if (!editor.isEditable()) {
      return;
    }

    return editor.update(() => {
      const node = lexical.$getNodeByKey(nodeKey);

      if ($isExcalidrawNode(node)) {
        if (newData.length > 0) {
          node.setData(JSON.stringify(newData));
        } else {
          node.remove();
        }
      }
    });
  };

  const onResizeStart = () => {
    setIsResizing(true);
  };

  const onResizeEnd = () => {
    // Delay hiding the resize bars for click case
    setTimeout(() => {
      setIsResizing(false);
    }, 200);
  };

  const elements = React.useMemo(() => JSON.parse(data), [data]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ExcalidrawModal, {
    initialElements: elements,
    isShown: isModalOpen,
    onDelete: deleteNode,
    onSave: newData => {
      editor.setEditable(true);
      setData(newData);
      setModalOpen(false);
    },
    closeOnClickOutside: true
  }), elements.length > 0 && /*#__PURE__*/React.createElement("button", {
    ref: buttonRef,
    className: `excalidraw-button ${isSelected ? 'selected' : ''}`
  }, /*#__PURE__*/React.createElement(ExcalidrawImage, {
    imageContainerRef: imageContainerRef,
    className: "image",
    elements: elements
  }), (isSelected || isResizing) && /*#__PURE__*/React.createElement(ImageResizer, {
    buttonRef: captionButtonRef,
    showCaption: true,
    setShowCaption: () => null,
    imageRef: imageContainerRef,
    editor: editor,
    onResizeStart: onResizeStart,
    onResizeEnd: onResizeEnd,
    captionsEnabled: true
  })));
}

var ExcalidrawComponent$1 = {
  __proto__: null,
  'default': ExcalidrawComponent
};

exports.$createExcalidrawNode = $createExcalidrawNode;
exports.$isExcalidrawNode = $isExcalidrawNode;
exports.ExcalidrawNode = ExcalidrawNode;
exports.ExcalidrawPlugin = ExcalidrawPlugin;
exports.excalidrawExt = excalidrawExt;
