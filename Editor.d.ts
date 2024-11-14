/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
/// <reference types="react" />
import type { ToolbarConfig } from './plugins/toolbarTypes';
import type { EditorState, LexicalEditor } from 'lexical';
import { type OnImageUpload } from './plugins/OnImageUploadPlugin';
export declare type EditorProps = {
    isCollab?: boolean;
    isAutocomplete?: boolean;
    isMaxLength?: boolean;
    isCharLimit?: boolean;
    isCharLimitUtf8?: boolean;
    isRichText?: boolean;
    showTreeView?: boolean;
    showTableOfContents?: boolean;
    onChange?: (htmlJson: string, editorState: EditorState, editor: LexicalEditor) => void;
    onChangeMode?: 'html' | 'json';
    toolbarConfig?: ToolbarConfig;
    onUpload?: OnImageUpload;
    onDataSend?: (img: File) => Promise<{
        url: string;
        id: number;
    }>;
    rootClassName?: string;
    containerClassName?: string;
    dummyMentionsDatas?: string[];
};
export default function Editor({ isCollab, isAutocomplete, isMaxLength, isCharLimit, isCharLimitUtf8, isRichText, showTreeView, showTableOfContents, onChange, onChangeMode, onUpload, onDataSend, toolbarConfig, rootClassName, containerClassName, dummyMentionsDatas, }: EditorProps): JSX.Element;
