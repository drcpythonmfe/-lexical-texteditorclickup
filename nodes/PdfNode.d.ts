/// <reference types="react" />
import type { DOMConversionMap, DOMExportOutput, EditorConfig, ElementFormatType, LexicalEditor, LexicalNode, NodeKey, Spread } from 'lexical';
import { DecoratorBlockNode, SerializedDecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode';
declare type PdfData = {
    url: string;
    id: string;
};
export declare type SerializedPdfNode = Spread<{
    data: PdfData;
    type: 'pdf';
    version: 1;
}, SerializedDecoratorBlockNode>;
export declare class PdfNode extends DecoratorBlockNode {
    __data: PdfData;
    static getType(): string;
    static clone(node: PdfNode): PdfNode;
    static importJSON(serializedNode: SerializedPdfNode): PdfNode;
    exportJSON(): SerializedPdfNode;
    constructor(data: PdfData, format?: ElementFormatType, key?: NodeKey);
    exportDOM(): DOMExportOutput;
    static importDOM(): DOMConversionMap | null;
    updateDOM(): false;
    getId(): string;
    getTextContent(_includeInert?: boolean | undefined, _includeDirectionless?: false | undefined): string;
    decorate(_editor: LexicalEditor, config: EditorConfig): JSX.Element;
    isInline(): false;
}
export declare function $createPdfNode(data: PdfData): PdfNode;
export declare function $isPdfNode(node: PdfNode | LexicalNode | null | undefined): node is PdfNode;
export {};
