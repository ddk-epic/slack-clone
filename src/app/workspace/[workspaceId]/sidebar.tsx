import { Bell, Home, MessagesSquare, MoreHorizontal } from "lucide-react";

import UserButton from "@/features/auth/components/user-button";
import SidebarButton from "./sidebar-button";
import WorkspaceSwitcher from "./workspace-switcher";
import { use } from "react";
import { usePathname } from "next/navigation";

function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-17.5 h-full bg-[#007FFF] flex flex-col gap-y-4 items-center pt-2.25 pb-4">
      <WorkspaceSwitcher />
      <SidebarButton
        icon={Home}
        label="Home"
        isActive={pathname.includes("/workspace")}
      />
      <SidebarButton icon={MessagesSquare} label="Messages" />
      <SidebarButton icon={Bell} label="Activity" />
      <SidebarButton icon={MoreHorizontal} label="More" />
      <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
        <UserButton />
      </div>
    </aside>
  );
}

export default Sidebar;
