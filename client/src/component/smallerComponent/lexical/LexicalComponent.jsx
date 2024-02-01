import {$getRoot, $getSelection} from 'lexical';
import {useEffect} from 'react';

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

const theme = {
}

function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.focus();
  }, [editor]);

  return null;
}

function onError(error) {
  console.error(error);
}

 function LexicalComponent() {
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
  };

  return (
    <div >
    <LexicalComposer className='lexicalContainer' initialConfig={initialConfig}>
      <PlainTextPlugin
        contentEditable={<ContentEditable />}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <MyCustomAutoFocusPlugin />
    </LexicalComposer>
    </div>
  );
}
export default LexicalComponent