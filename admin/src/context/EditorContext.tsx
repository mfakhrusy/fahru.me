import { createContext, useContext, useState } from 'react';

import { sessionStorage } from '@/lib/sessionStorage';

type EditorContextType = {
  docState: string;
  setDocState: (docState: string) => void;
};

const EditorContext = createContext<EditorContextType>({
  docState: '',
  setDocState: () => undefined,
});

export default function EditorContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const state = sessionStorage.getItem('editorState');
  const initialDoc = JSON.parse(state as string)?.doc ?? '';
  const [docState, setDocState] = useState<string>(initialDoc);

  return (
    <EditorContext.Provider
      value={{
        docState,
        setDocState,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditorContext() {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error(
      'useEditorContext must be used within a EditorContextProvider'
    );
  }
  return context;
}
