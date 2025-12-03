'use client';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>
        <h1>Admin Micro Frontend</h1>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}