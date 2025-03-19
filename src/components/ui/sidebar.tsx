import React from "react";
import { useMobile } from "@/hooks/use-mobile"; // Updated import name
import { cn } from "@/lib/utils";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const isMobile = useMobile();

  return (
    <aside
      className={cn(
        "border-r flex-shrink-0 hidden w-64 transition-all duration-300 md:block",
        isMobile ? "-translate-x-full" : "translate-x-0"
      )}
    >
      {children}
    </aside>
  );
};

export default Sidebar;
