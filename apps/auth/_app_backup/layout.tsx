'use client';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>
        <h1>Auth Micro Frontend</h1>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}