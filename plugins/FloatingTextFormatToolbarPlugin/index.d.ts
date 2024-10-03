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
export default function TextFormatFloatingToolbarPlugin({ anchorElem, config, }: {
    config: ToolbarConfig;
    anchorElem?: HTMLElement;
}): JSX.Element | null;
