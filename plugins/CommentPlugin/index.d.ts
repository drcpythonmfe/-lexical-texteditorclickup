/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
/// <reference types="react" />
import type { LexicalCommand } from 'lexical';
import type { Doc } from 'yjs';
import './index.css';
import { WebsocketProvider } from 'y-websocket';
export declare const INSERT_INLINE_COMMAND: LexicalCommand<void>;
export default function CommentPlugin({ providerFactory, }: {
    providerFactory?: (id: string, yjsDocMap: Map<string, Doc>) => WebsocketProvider;
}): JSX.Element;
