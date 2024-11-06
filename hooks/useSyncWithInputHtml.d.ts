declare type Options = {
    timeoutMs?: number;
};
declare const useSyncWithInputHtml: (html?: string | null, { timeoutMs }?: Options) => {
    getCurrentHtml: () => string;
};
export default useSyncWithInputHtml;
