'use client';
import { createContext, useContext, useState } from 'react';
type NotificationType = 'success' | 'error';

type NotificationContextType = {
  message: string;
  type: NotificationType;
  showNotification: (msg: string, type: NotificationType) => void;
};

const NotificationContext = createContext<NotificationContextType>({
  message: '',
  type: 'success',
  showNotification: (msg: string, type: NotificationType) => {},
});

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState<NotificationType>('success');

  const showNotification = (msg: string, type: NotificationType) => {
    setMessage(msg);
    setType(type);
    setTimeout(() => {
      setMessage('');
    }, 5000);
  };
  return (
    <NotificationContext value={{ message, type, showNotification }}>
      {children}
    </NotificationContext>
  );
};

export const useNotification = () => useContext(NotificationContext);
