import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { localStorage } from '@/lib/localStorage';

type UIContextType = {
  sidebarCollapse: boolean;
  setSidebarCollapse: (isCollapsed: boolean) => void;
};

const UIContext = createContext<UIContextType>({
  sidebarCollapse: false,
  setSidebarCollapse: () => undefined,
});

export default function UIContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapse, setSidebarCollapse] = useState(false);

  const setSidebarCollapseFunc = useCallback((isCollapsed: boolean) => {
    setSidebarCollapse(isCollapsed);
    localStorage.setItem('sidebarCollapse', isCollapsed);
  }, []);

  useEffect(() => {
    const isCollapsed =
      (localStorage.getItem('sidebarCollapse') as boolean | undefined) ?? false;
    if (isCollapsed) {
      setSidebarCollapse(isCollapsed);
    }
  }, []);

  return (
    <UIContext.Provider
      value={{
        sidebarCollapse,
        setSidebarCollapse: setSidebarCollapseFunc,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUIContext() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUIContext must be used within a UIContextProvider');
  }
  return context;
}
