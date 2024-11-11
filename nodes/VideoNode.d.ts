/// <reference types="react" />
import type { DOMConversionMap, DOMExportOutput, EditorConfig, ElementFormatType, LexicalEditor, LexicalNode, NodeKey, Spread } from 'lexical';
import { DecoratorBlockNode, SerializedDecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode';
declare type VideoData = {
    url: string;
    id: string;
};
export declare type SerializedVideoNode = Spread<{
    data: VideoData;
    type: 'video';
    version: 1;
}, SerializedDecoratorBlockNode>;
export declare class VideoNode extends DecoratorBlockNode {
    __data: VideoData;
    static getType(): string;
    static clone(node: VideoNode): VideoNode;
    static importJSON(serializedNode: SerializedVideoNode): VideoNode;
    exportJSON(): SerializedVideoNode;
    constructor(data: VideoData, format?: ElementFormatType, key?: NodeKey);
    exportDOM(): DOMExportOutput;
    static importDOM(): DOMConversionMap | null;
    updateDOM(): false;
    getId(): string;
    getTextContent(_includeInert?: boolean | undefined, _includeDirectionless?: false | undefined): string;
    decorate(_editor: LexicalEditor, config: EditorConfig): JSX.Element;
    isInline(): false;
}
export declare function $createVideoNode(data: VideoData): VideoNode;
export declare function $isVideoNode(node: VideoNode | LexicalNode | null | undefined): node is VideoNode;
export {};
