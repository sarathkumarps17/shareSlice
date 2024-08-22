import React, { createContext, useContext, useState } from "react";

type DialogContextType = {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <DialogContext.Provider value={{ isOpen, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDialog = () => {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};
