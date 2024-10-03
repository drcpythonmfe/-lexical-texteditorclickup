/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
export declare type SettingName = 'disableBeforeInput' | 'measureTypingPerf' | 'isRichText' | 'isCollab' | 'isCharLimit' | 'isMaxLength' | 'isCharLimitUtf8' | 'isAutocomplete' | 'showTreeView' | 'showNestedEditorTreeView' | 'emptyEditor' | 'showTableOfContents';
export declare type Settings = Record<SettingName, boolean>;
export declare const isDevPlayground: boolean;
export declare const DEFAULT_SETTINGS: Settings;
