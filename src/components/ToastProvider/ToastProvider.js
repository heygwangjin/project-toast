import React from "react";
import useKeydown from "../../hooks/use-keydown";

export const ToastContext = React.createContext();

const TOAST_TIMEOUT = 3000;

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  // Hitting the escape key should dismiss all toasts
  function handleEscape() {
    setToasts([]);
  }

  function createToast(message, variant) {
    const nextToasts = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant,
      },
    ];

    setToasts(nextToasts);
  }

  function dismissToast(id) {
    const nextToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });

    setToasts(nextToasts);
  }

  useKeydown("Escape", handleEscape);

  // Automatically dismiss the oldest toast after a timeout
  React.useEffect(() => {
    if (toasts.length === 0) return;

    const timeoutId = setTimeout(() => {
      dismissToast(toasts[0].id);
    }, TOAST_TIMEOUT);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [toasts, dismissToast]);

  return (
    <ToastContext.Provider value={{ toasts, createToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
