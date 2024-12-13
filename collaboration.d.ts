/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { WebsocketProvider } from 'y-websocket';
import { Doc } from 'yjs';
export declare function createWebsocketProvider(id: string, yjsDocMap: Map<string, Doc>): WebsocketProvider;
