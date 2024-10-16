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
export declare type SerializedVideoNode = Spread<{
    url: string;
    type: 'video';
    version: 1;
}, SerializedDecoratorBlockNode>;
export declare class VideoNode extends DecoratorBlockNode {
    __url: string;
    static getType(): string;
    static clone(node: VideoNode): VideoNode;
    static importJSON(serializedNode: SerializedVideoNode): VideoNode;
    exportJSON(): SerializedVideoNode;
    constructor(url: string, format?: ElementFormatType, key?: NodeKey);
    exportDOM(): DOMExportOutput;
    static importDOM(): DOMConversionMap | null;
    updateDOM(): false;
    getId(): string;
    getTextContent(_includeInert?: boolean | undefined, _includeDirectionless?: false | undefined): string;
    decorate(_editor: LexicalEditor, config: EditorConfig): JSX.Element;
    isInline(): false;
}
export declare function $createVideoNode(url: string): VideoNode;
export declare function $isYouTubeNode(node: VideoNode | LexicalNode | null | undefined): node is VideoNode;
