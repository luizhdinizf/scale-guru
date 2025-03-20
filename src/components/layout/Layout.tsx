
import { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 px-4 pb-8 container mx-auto max-w-7xl">
        <div className="animate-slide-up">{children}</div>
      </main>
    </div>
  );
}
