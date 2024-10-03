/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
/// <reference types="react" />
import type { LexicalEditor, NodeKey } from 'lexical';
import './StickyNode.css';
export default function StickyComponent({ x, y, nodeKey, color, caption, }: {
    caption: LexicalEditor;
    color: 'pink' | 'yellow';
    nodeKey: NodeKey;
    x: number;
    y: number;
}): JSX.Element;
