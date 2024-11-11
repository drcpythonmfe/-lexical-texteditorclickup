/// <reference types="react" />
import type { DOMConversionMap, DOMExportOutput, EditorConfig, ElementFormatType, LexicalEditor, LexicalNode, NodeKey, Spread } from 'lexical';
import { DecoratorBlockNode, SerializedDecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode';
declare type OfficeData = {
    url: string;
    id: string;
};
export declare type SerializedOfficeNode = Spread<{
    data: OfficeData;
    type: 'office';
    version: 1;
}, SerializedDecoratorBlockNode>;
export declare class OfficeNode extends DecoratorBlockNode {
    __data: OfficeData;
    static getType(): string;
    static clone(node: OfficeNode): OfficeNode;
    static importJSON(serializedNode: SerializedOfficeNode): OfficeNode;
    exportJSON(): SerializedOfficeNode;
    constructor(data: OfficeData, format?: ElementFormatType, key?: NodeKey);
    exportDOM(): DOMExportOutput;
    static importDOM(): DOMConversionMap | null;
    updateDOM(): false;
    getId(): string;
    getTextContent(_includeInert?: boolean | undefined, _includeDirectionless?: false | undefined): string;
    decorate(_editor: LexicalEditor, config: EditorConfig): JSX.Element;
    isInline(): false;
}
export declare function $createOfficeNode(data: OfficeData): OfficeNode;
export declare function $isOfficeNode(node: OfficeNode | LexicalNode | null | undefined): node is OfficeNode;
export {};
