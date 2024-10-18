/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
/// <reference types="react" />
import type { DOMConversionMap, DOMExportOutput, EditorConfig, ElementFormatType, LexicalEditor, LexicalNode, NodeKey, Spread } from 'lexical';
import { DecoratorBlockNode, SerializedDecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode';
export declare type SerializedPdfNode = Spread<{
    url: string;
    type: 'pdf';
    version: 1;
}, SerializedDecoratorBlockNode>;
export declare class PdfNode extends DecoratorBlockNode {
    __url: string;
    static getType(): string;
    static clone(node: PdfNode): PdfNode;
    static importJSON(serializedNode: SerializedPdfNode): PdfNode;
    exportJSON(): SerializedPdfNode;
    constructor(url: string, format?: ElementFormatType, key?: NodeKey);
    exportDOM(): DOMExportOutput;
    static importDOM(): DOMConversionMap | null;
    updateDOM(): false;
    getId(): string;
    getTextContent(_includeInert?: boolean | undefined, _includeDirectionless?: false | undefined): string;
    decorate(_editor: LexicalEditor, config: EditorConfig): JSX.Element;
    isInline(): false;
}
export declare function $createPdfNode(url: string): PdfNode;
export declare function $isPdfNode(node: PdfNode | LexicalNode | null | undefined): node is PdfNode;
