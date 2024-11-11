/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="react" />
import { LexicalCommand } from 'lexical';
export interface OfficeData {
    url: string;
    id: string;
}
export declare const INSERT_OFFICE_COMMAND: LexicalCommand<OfficeData>;
export default function OfficePlugin(): JSX.Element | null;
