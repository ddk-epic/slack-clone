"use client";

import Toolbar from "./toolbar";

interface WorkspaceLayoutProps {
  children: React.ReactNode;
}

export default function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
  return (
    <div className="h-full">
      <Toolbar />
      {children}
    </div>
  );
}
