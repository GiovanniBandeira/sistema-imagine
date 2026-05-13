import React from 'react';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Imagine Tools</title>
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
