'use client';
import { useNotification } from './NotificationProvider';

const Notification = () => {
  const { message, type } = useNotification();
  return (
    <div data-testid='notification'>
      {message && (
        <div
          className={`${type === 'success' ? 'text-green-300' : 'text-red-500'}`}
        >
          {message}
        </div>
      )}
    </div>
  );
};
export default Notification;
