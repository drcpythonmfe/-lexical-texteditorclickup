/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
/// <reference types="react" />
import type { ToolbarConfig } from '../toolbarTypes';
export declare type ToolbarPluginProps = {
    config: ToolbarConfig;
    handleClick?: ((data: any) => void | undefined | any) | undefined;
    floatingText?: boolean;
    anchorElem?: HTMLElement;
};
export default function ToolbarPlugin({ config, handleClick, anchorElem, floatingText, }: ToolbarPluginProps): JSX.Element;
