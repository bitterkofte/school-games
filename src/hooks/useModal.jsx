import { createContext, useContext, useState, useCallback } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "",
    text: "",
    children: null,
    onConfirm: null,
    onCancel: null,
  });

  const showModal = useCallback(
    ({ title, text, onConfirm, onCancel, children }) => {
      setModalState({
        isOpen: true,
        title: title || "",
        text: text || "",
        children: children || null,
        onConfirm: onConfirm || null,
        onCancel: onCancel || null,
      });
    },
    []
  );

  const hideModal = useCallback(() => {
    setModalState({
      isOpen: false,
      title: "",
      text: "",
      children: null,
      onConfirm: null,
      onCancel: null,
    });
  }, []);

  const executeConfirm = useCallback(() => {
    if (modalState.onConfirm && typeof modalState.onConfirm === "function") {
      modalState.onConfirm();
    }
    hideModal();
  }, [modalState.onConfirm, hideModal]);

  const executeCancel = useCallback(() => {
    if (modalState.onCancel && typeof modalState.onCancel === "function") {
      modalState.onCancel();
    }
    hideModal();
  }, [modalState.onCancel, hideModal]);

  const value = {
    ...modalState,
    showModal,
    hideModal,
    executeConfirm,
    executeCancel,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
