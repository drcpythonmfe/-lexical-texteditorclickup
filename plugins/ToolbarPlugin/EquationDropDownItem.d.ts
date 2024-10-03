/// <reference types="react" />
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import type { ToolbarItemProps } from '../../ext/extTypes';
import type { LexicalEditor } from 'lexical';
export declare function InsertEquationDialog({ activeEditor, onClose, }: {
    activeEditor: LexicalEditor;
    onClose: () => void;
}): JSX.Element;
export default function EquationDropDownItem({ activeEditor, showModal, }: ToolbarItemProps): JSX.Element;
