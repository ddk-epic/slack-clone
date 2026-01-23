import UserButton from "@/features/auth/components/user-button";
import WorkspaceSwitcher from "./workspace-switcher";

function Sidebar() {
  return (
    <aside className="w-17.5 h-full bg-[#007FFF] flex flex-col gap-y-4 items-center pt-2.25 pb-4">
      <WorkspaceSwitcher />
      <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
        <UserButton />
      </div>
    </aside>
  );
}

export default Sidebar;
