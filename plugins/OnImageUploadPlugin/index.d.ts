/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
export declare type OnImageUpload = (img: File, altText: string) => Promise<string>;
export declare type DragDropPasteProps = {
    onUpload?: OnImageUpload;
};
export default function OnImageUploadPlugin({ onUpload, }: DragDropPasteProps): null;
