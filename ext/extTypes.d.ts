import type useModal from '../hooks/useModal';
import type { Transformer } from '@lexical/markdown';
import type { Klass, LexicalEditor, LexicalNode } from 'lexical';
import type { FC } from 'react';
export declare type ToolbarItemProps = {
    showModal: ReturnType<typeof useModal>[1];
    activeEditor: LexicalEditor;
};
export declare type ExtensionNode = Klass<LexicalNode>;
export declare type ExtensionPlugin = () => JSX.Element | null;
export declare type ExtensionTransformer = Transformer;
export declare type ExtensionToolbarInsertAfter = FC<ToolbarItemProps>;
export declare type Extension = {
    name: string;
    node?: ExtensionNode;
    plugin?: ExtensionPlugin;
    transformer?: ExtensionTransformer;
    toolbarInsertAfter?: ExtensionToolbarInsertAfter;
};
