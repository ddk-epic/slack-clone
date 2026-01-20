import { Info, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

export default function Toolbar() {
  const workspaceId = useWorkspaceId();
  const { data } = useGetWorkspace({ id: workspaceId });
  return (
    <nav className="bg-[#007FFF] h-10 flex items-center justify-between p-1.5">
      <div className="flex-1" />
      <div className="min-w-70 max-[642px] grow-2 shrink">
        <Button
          size="sm"
          className="h-7 w-full justify-start bg-accent/25 hover:bg-accent-25 px-2"
        >
          <Search className="size-4 text-white mr-2" />
          <span>Search {data?.name}</span>
        </Button>
      </div>
      <div className="flex flex-1 items-center justify-end ml-auto">
        <Button variant="transparent" size="icon-sm">
          <Info className="size-5 text-white" />
        </Button>
      </div>
    </nav>
  );
}
