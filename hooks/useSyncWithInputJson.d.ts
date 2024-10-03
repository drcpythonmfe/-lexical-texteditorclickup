import type { LexicalEditor } from 'lexical';
declare type JsonState = Parameters<LexicalEditor['parseEditorState']>[0] | null;
declare type Options = {
    timeoutMs?: number;
};
declare const useSyncWithInputJson: (json?: JsonState, { timeoutMs }?: Options) => void;
export default useSyncWithInputJson;
