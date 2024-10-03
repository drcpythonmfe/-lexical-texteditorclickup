/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
/// <reference types="react" />
import type { Options } from './PollNode';
import './PollNode.css';
import { NodeKey } from 'lexical';
export default function PollComponent({ question, options, nodeKey, }: {
    nodeKey: NodeKey;
    options: Options;
    question: string;
}): JSX.Element;
