/// <reference types="react" />
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import type { ToolbarConfig } from '../toolbarTypes';
import './index.css';
export default function TextFormatFloatingToolbarPlugin({ anchorElem, config, handleClick, isRichText, handleAIData }: {
    config: ToolbarConfig;
    anchorElem?: HTMLElement;
    isRichText?: boolean;
    handleClick?: ((data: any) => any | void | undefined) | undefined;
    handleAIData?: (text: string) => Promise<any>;
}): JSX.Element | null;
