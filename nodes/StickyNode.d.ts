/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
/// <reference types="react" />
import type { EditorConfig, LexicalEditor, LexicalNode, NodeKey, SerializedEditor, SerializedLexicalNode, Spread } from 'lexical';
import { DecoratorNode } from 'lexical';
declare type StickyNoteColor = 'pink' | 'yellow';
export declare type SerializedStickyNode = Spread<{
    xOffset: number;
    yOffset: number;
    color: StickyNoteColor;
    caption: SerializedEditor;
    type: 'sticky';
    version: 1;
}, SerializedLexicalNode>;
export declare class StickyNode extends DecoratorNode<JSX.Element> {
    __x: number;
    __y: number;
    __color: StickyNoteColor;
    __caption: LexicalEditor;
    static getType(): string;
    static clone(node: StickyNode): StickyNode;
    static importJSON(serializedNode: SerializedStickyNode): StickyNode;
    constructor(x: number, y: number, color: 'pink' | 'yellow', caption?: LexicalEditor, key?: NodeKey);
    exportJSON(): SerializedStickyNode;
    createDOM(config: EditorConfig): HTMLElement;
    updateDOM(): false;
    setPosition(x: number, y: number): void;
    toggleColor(): void;
    decorate(editor: LexicalEditor, config: EditorConfig): JSX.Element;
    isIsolated(): true;
}
export declare function $isStickyNode(node: LexicalNode | null | undefined): node is StickyNode;
export declare function $createStickyNode(xOffset: number, yOffset: number): StickyNode;
export {};
