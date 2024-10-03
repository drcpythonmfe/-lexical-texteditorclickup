/// <reference types="react" />
import type { ExtensionNode, ExtensionPlugin, ExtensionToolbarInsertAfter, ExtensionTransformer } from './ext/extTypes';
export declare type Extensions = {
    nodes: Array<ExtensionNode>;
    plugins: Array<[string, ExtensionPlugin]>;
    transformers: Array<ExtensionTransformer>;
    toolbarInsertsAfter: Array<[string, ExtensionToolbarInsertAfter]>;
};
export declare type EditorComposerContextType = {
    extensions: Extensions;
};
export declare const EditorComposerContext: import("react").Context<EditorComposerContextType | null>;
export declare function useEditorComposerContext(): EditorComposerContextType;
