import { AlertTriangle, Loader } from "lucide-react";

import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import WorkspaceHeader from "./workspace-header";

function WorkspaceSidebar() {
  const workspaceId = useWorkspaceId();
  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });

  if (memberLoading || workspaceLoading) {
    return (
      <div className="h-full items-center justify-centerflex flex-col bg-[#5DADFD]">
        <Loader className="size-5 animate-spin text-white" />
      </div>
    );
  }

  if (!workspace || !member) {
    return (
      <div className="h-full items-center justify-centerflex flex-col gap-y-2 bg-[#5DADFD]">
        <AlertTriangle className="size-5 text-white" />
        <p className="text-white text-sm">Workspace or member not found</p>
      </div>
    );
  }

  return (
    <div className="h-full items-center justify-centerflex flex-col bg-[#5DADFD]">
      <WorkspaceHeader
        workspace={workspace}
        isAdmin={member.role === "admin"}
      />
    </div>
  );
}

export default WorkspaceSidebar;
