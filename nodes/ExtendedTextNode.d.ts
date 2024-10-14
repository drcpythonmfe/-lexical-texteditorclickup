import { DOMConversionMap, NodeKey, TextNode, SerializedTextNode, LexicalNode } from 'lexical';
export declare class ExtendedTextNode extends TextNode {
    constructor(text: string, key?: NodeKey);
    static getType(): string;
    static clone(node: ExtendedTextNode): ExtendedTextNode;
    static importDOM(): DOMConversionMap | null;
    static importJSON(serializedNode: SerializedTextNode): TextNode;
    isSimpleText(): boolean;
    exportJSON(): SerializedTextNode;
}
export declare function $createExtendedTextNode(text: string): ExtendedTextNode;
export declare function $isExtendedTextNode(node: LexicalNode | null | undefined): node is ExtendedTextNode;
