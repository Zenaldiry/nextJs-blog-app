import './globals.css';
import AuthSessionProvider from './components/AuthSessionProvider';
import NavBar from './components/NavBar';
import Notification from './components/Notification';
import { NotificationProvider } from './components/NotificationProvider';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='px-10'>
        <AuthSessionProvider>
          <NotificationProvider>
            <NavBar />
            <Notification />
            {children}
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
