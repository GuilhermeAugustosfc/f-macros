import React, { createContext, useContext, useState, useCallback } from 'react';
import MessageToast from '../components/MessageToast';

interface ToastContextData {
    showToast: (props: ToastProps) => void;
    hideToast: () => void;
}

interface ToastProps {
    title: string;
    message: string;
    subMessage?: string;
    timeInfo?: string;
    type?: 'success' | 'error' | 'info' | 'warning';
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toast, setToast] = useState<ToastProps | null>(null);

    const showToast = useCallback((props: ToastProps) => {
        setToast(props);
        setTimeout(() => {
            setToast(null);
        }, 5000); // Auto-hide after 5 seconds
    }, []);

    const hideToast = useCallback(() => {
        setToast(null);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast, hideToast }}>
            {children}
            {toast && <MessageToast {...toast} onClose={hideToast} />}
        </ToastContext.Provider>
    );
};

export const useToast = (): ToastContextData => useContext(ToastContext);
