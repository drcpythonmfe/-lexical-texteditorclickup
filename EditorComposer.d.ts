import type { Extension } from './ext/extTypes';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import * as React from 'react';
export declare type EditorComposerProps = {
    children: React.ComponentProps<typeof LexicalComposer>['children'];
    initialConfig?: Partial<React.ComponentProps<typeof LexicalComposer>['initialConfig']>;
    extensions?: Array<Extension>;
};
export default function EditorComposer({ children, initialConfig, extensions, }: EditorComposerProps): JSX.Element;
