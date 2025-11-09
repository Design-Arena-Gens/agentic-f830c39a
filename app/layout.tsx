import './globals.css';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="container"><h1>Neuro-Symbolic CARS: Habits & Context</h1></header>
        <main className="container">{children}</main>
        <footer className="container small">agentic-f830c39a</footer>
      </body>
    </html>
  );
}
