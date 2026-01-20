"use client";

import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

interface WorkspaceIdProps {
  params: {
    workspaceId: string;
  };
}

function WorkspaceIdPage({ params }: WorkspaceIdProps) {
  const workspaceId = useWorkspaceId();
  const { data } = useGetWorkspace({ id: workspaceId });
  return <div>ID: {JSON.stringify(data)}</div>;
}

export default WorkspaceIdPage;
