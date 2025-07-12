import './globals.css';
import { AuthProvider } from '../lib/AuthProvider';
import { ReactQueryProvider } from '../lib/ReactQueryProvider';

export const metadata = {
  title: 'Todo App',
  description: 'Next.js + Supabase + App Router',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-100 font-sans">
        <AuthProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
