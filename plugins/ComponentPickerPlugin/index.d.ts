/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
/// <reference types="react" />
interface ComponentPickerMenuPluginProps {
    config: any;
    handleClickUpload?: ((data: any) => void | undefined | any) | undefined;
}
export default function ComponentPickerMenuPlugin({ config, handleClickUpload, }: ComponentPickerMenuPluginProps): JSX.Element;
export {};
