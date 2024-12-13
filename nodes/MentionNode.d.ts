import type { Spread } from 'lexical';
import { type DOMConversionMap, type DOMExportOutput, type EditorConfig, type LexicalNode, type NodeKey, type SerializedTextNode, TextNode } from 'lexical';
export declare type SerializedMentionNode = Spread<{
    mentionName: string;
    mentionEmail?: string;
    type: 'mention';
    version: 1;
}, SerializedTextNode>;
export declare class MentionNode extends TextNode {
    __mention: string;
    __email: string;
    static getType(): string;
    static clone(node: MentionNode): MentionNode;
    static importJSON(serializedNode: SerializedMentionNode): MentionNode;
    constructor(mentionName: string, email?: string, text?: string, key?: NodeKey);
    exportJSON(): SerializedMentionNode;
    createDOM(config: EditorConfig): HTMLElement;
    exportDOM(): DOMExportOutput;
    static importDOM(): DOMConversionMap | null;
    isTextEntity(): true;
}
export declare function $createMentionNode(mentionName: string, email?: string): MentionNode;
export declare function $isMentionNode(node: LexicalNode | null | undefined): node is MentionNode;
