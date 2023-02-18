import { createContext, useContext, useState } from 'react';

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

  return (
    <UIContext.Provider
      value={{
        sidebarCollapse,
        setSidebarCollapse,
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
