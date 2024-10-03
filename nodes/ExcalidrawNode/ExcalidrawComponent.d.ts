/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
/// <reference types="react" />
import type { NodeKey } from 'lexical';
export default function ExcalidrawComponent({ nodeKey, data, }: {
    data: string;
    nodeKey: NodeKey;
}): JSX.Element;
