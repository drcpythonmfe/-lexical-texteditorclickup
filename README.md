

## dummyMentionsData 
```tsx
const dummyMentionsData = [
  'Aayla Secura',
  'Adi Gallia',
  'Admiral Dodd Rancit',
  'Admiral Firmus Piett',
  'Admiral Gial Ackbar',
  'Admiral Ozzel',
  'Admiral Raddus',
  'Admiral Terrinald Screed',
  'Admiral Trench',
  'Walrus Man',
  'Warok',
  'Wat Tambor',
  'Watto',
  'Wedge Antilles',
  'Wes Janson',
  'Wicket W. Warrick',
  'Wilhuff Tarkin',
];

const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const uploadImg = async (file: File, altText: string) => {
  console.log("file",file)
  await delay(500);
  return `https://placehold.co/300x300?text=${altText}`;
};

function App({
  html,
  setHtml,
  dummyMentionsData
}: {
  html: string;
  setHtml: (newHtml: string) => void;
  dummyMentionsData:any;
}): JSX.Element {
  useSyncWithInputHtml(html);

  return (
    <Editor
      isRichText={true}
      onChange={setHtml}
      onUpload={uploadImg}
      onChangeMode="html"
      dummyMentionsDatas={dummyMentionsData || []}
    />
  );
}
```

## Dark Mode

```
<body class="theme-dark">  // Add  class name theme-dark

</body>
```


## HTML as formatHTMLData

```tsx
function formatHTMLData(data: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'text/html');

  function cleanNestedLists(element: Element): void {
    const nestedUls = element.querySelectorAll('ul > ul');
    nestedUls.forEach(ul => {
      const parentLi = ul.parentNode as Element;
      if (parentLi.tagName === 'LI') {
        parentLi.parentNode?.insertBefore(ul, parentLi.nextSibling);
      }
    });
  }

  function removeEmptyElements(element: Element): void {
    element.querySelectorAll('*').forEach(el => {
      if (el.innerHTML.trim() === '' && !['img', 'br', 'hr'].includes(el.tagName.toLowerCase())) {
        el.parentNode?.removeChild(el);
      }
    });
  }

  function wrapTextNodesInPTags(element: Element): void {
    let textContent = '';
    const childNodes = Array.from(element.childNodes);
    for (let i = 0; i < childNodes.length; i++) {
      const node = childNodes[i];
      if (node.nodeType === Node.TEXT_NODE) {
        textContent += node.textContent?.trim() || '';
        element.removeChild(node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (textContent) {
          const p = doc.createElement('p');
          p.textContent = textContent;
          element.insertBefore(p, node);
          textContent = '';
        }
        if (node.nodeName !== 'BR') {
          wrapTextNodesInPTags(node as Element);
        }
      }
    }
    if (textContent) {
      const p = doc.createElement('p');
      p.textContent = textContent;
      element.appendChild(p);
    }
  }

  function correctTextPrimayClass(element: Element): void {
    element.querySelectorAll('a.text-primay').forEach(el => {
      el.classList.remove('text-primay');
      el.classList.add('text-primary');
    });
  }

  function replaceATagWithSpan(element: Element): void {
    const links = element.querySelectorAll('a.text-primary');
    links.forEach(link => {
      const span = doc.createElement('span');
      span.setAttribute('data-lexical-text', 'true');
      span.textContent = link.textContent;

      const newAnchor = doc.createElement('a');
      newAnchor.setAttribute('href', link.getAttribute('href'));
      newAnchor.setAttribute('rel', 'noopener');
      newAnchor.setAttribute('class', 'TextEditor__link TextEditor__ltr');
      newAnchor.appendChild(span);

      const p = doc.createElement('p');
      p.appendChild(newAnchor);

      link.parentNode?.replaceChild(p, link);
    });
  }

  const wrapper = doc.createElement('div');
  while (doc.body.firstChild) {
    wrapper.appendChild(doc.body.firstChild);
  }

  cleanNestedLists(wrapper);
  removeEmptyElements(wrapper);
  wrapTextNodesInPTags(wrapper);
  correctTextPrimayClass(wrapper);
  replaceATagWithSpan(wrapper);

  wrapper.innerHTML = wrapper.innerHTML.replace(/&nbsp;/g, ' ').trim();

  const prettyHTML = prettifyHTML(wrapper.innerHTML);
  const cleanedString = prettyHTML.replace(/<br\s*\/?>/gi, "").replace(/<p class="TextEditor__paragraph"><br><\/p>\s*/g, '');
  return cleanedString;
}

function prettifyHTML(html: string): string {
  let indent = 0;
  const tab = '    ';
  let pretty = '';
  html.split(/>\s*</).forEach(element => {
    if (element.match(/^\/\w/)) {
      indent = Math.max(0, indent - 1);
    }
    pretty += tab.repeat(indent) + '<' + element + '>\n';
    if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith('input') && !element.startsWith('img') && !element.startsWith('br')) {
      indent++;
    }
  });
  return pretty.substring(1, pretty.length - 2);
}
```

```tsx
  const [html, setHtml] = useState(formatHTMLData(data3));
```


### HTML as input/output

```tsx
import { Editor, EditorComposer, useSyncWithInputHtml } from '@drcpythonmfe/lexical-playground';
import "@drcpythonmfe/lexical-playground/editor.css"
import "@drcpythonmfe/lexical-playground/theme.css"

function MyEditor({ html, setHtml }: {
  html: string;
  setHtml: (newHtml: string) => void;
}): JSX.Element {
  useSyncWithInputHtml(html);

  return (
    <Editor isRichText onChange={setHtml} onUpload={uploadImg} onChangeMode="html" />
  );
}

export default function PlaygroundApp(): JSX.Element {
  const [html, setHtml] = useState('<b>test</b>');
  return (
    <EditorComposer>
      <MyEditor html={html} setHtml={setHtml} />
    </EditorComposer>
  );
}
```

### A JSON string as input/output

```tsx
import { Editor, EditorComposer, useSyncWithInputHtml } from '@drcpythonmfe/lexical-playground';
import "@drcpythonmfe/lexical-playground/editor.css"
import "@drcpythonmfe/lexical-playground/theme.css"

function MyEditor({ json, setJson }: {
  json: string;
  setJson: (html: string) => void;
}): JSX.Element {
  useSyncWithInputJson(json); // either a string or an object

  return <Editor isRichText onChange={setJson} onChangeMode="json" />;
}

export default function PlaygroundApp(): JSX.Element {
  const [json, setJson] = useState(
    '{"root":{"children":[{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"test","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
  );
  return (
    <EditorComposer>
      <MyEditor json={json} setJson={setJson} />
    </EditorComposer>
  );
}
```

### Customizing the toolbar
Certain buttons can be ommited from the toolbar, and some can be configured if necessary:
```tsx
import { Editor, EditorComposer, EditorProps } from '@drcpythonmfe/lexical-playground';

const toolbarConfig: EditorProps['toolbarConfig'] = {
  textColorPicker: false,
  bgColorPicker: false,
  fontFamilyOptions: [
    ['Roboto', 'Roboto'],
    ['Open Sans', 'Open Sans'],
  ],
};

function MyEditor(): JSX.Element {
  return <Editor toolbarConfig={toolbarConfig} isRichText />;
};

export default function PlaygroundApp(): JSX.Element {
  return (
    <EditorComposer>
      <MyEditor />
    </EditorComposer>
  );
}

```
### Theme overriding
It's recommended to replace built-in class names with your own:

```tsx
import { Editor, EditorComposer, EditorThemeClasses } from '@drcpythonmfe/lexical-playground';
import '@drcpythonmfe/lexical-playground/editor.css';
import './myTheme.css';

const theme: EditorThemeClasses = {
  characterLimit: 'MyTheme__characterLimit',
  code: 'MyTheme__code',
  // ...
};

function MyEditor(): JSX.Element {
  return <Editor isRichText />;
}

export default function PlaygroundApp(): JSX.Element {
  return (
    <EditorComposer initialConfig={{ theme }}>
      <MyEditor />
    </EditorComposer>
  );
}
```
### Uploading an image and returning a path
By default images are converted to data URLs.
```tsx
  // ...
  const uploadImg = async (file: File, altText: string) => {
    // process the file
    return urlOfImage;
  }
  return (
    <Editor 
      onUpload={uploadImg}  
      isRichText
      // ...
    />
  );
```

### Getting an access to the lexical editor's instance
```tsx
function MyEditor(): JSX.Element {
  const [editor] = useLexicalComposerContext();

  return (
    <Editor isRichText />
  );
}

export default function PlaygroundApp(): JSX.Element {
  return (
    <EditorComposer>
      <MyEditor />
    </EditorComposer>
  );
}
```

### Showing exported HTML w/o loading the entire editor
The only thing that's needed to display HTML that lexical generated is to import `theme.css`.

```tsx
import '@drcpythonmfe/lexical-playground/theme.css'; // or import your own theme styles

export default function PlaygroundApp({ html }: { html: string }): JSX.Element {
  return (
    <div dangerouslySetInnerHTML={{__html: html}} />
  );
}
```

### SSR
At this point the editor does not support SSR and needs to be loaded on the client.
#### Next.js
```tsx
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const MyEditor = dynamic(() => import('./path-to-my-editor-that-loads-lexical-playground'), {
  ssr: false,
})

const MyPage: NextPage = () => {
  return (
    <MyEditor />
  )
}

export default MyPage
```

### Using optional plugins
Some plugins like `excalidraw` and `equation` are optional, and need to be manually activated:

```tsx
// ...
import {excalidrawExt} from '@drcpythonmfe/lexical-playground/ext/excalidraw';
import '@drcpythonmfe/lexical-playground/ext/excalidraw.css';
import {equationExt} from '@drcpythonmfe/lexical-playground/ext/equation';
import '@drcpythonmfe/lexical-playground/ext/equation.css';

function MyEditor(): JSX.Element {
  return (
    <Editor isRichText />
  );
}

const extensions = [equationExt, excalidrawExt];

export default function PlaygroundApp(): JSX.Element {
  return (
    <EditorComposer extensions={extensions}>
      <MyEditor />
    </EditorComposer>
  );
}
```
