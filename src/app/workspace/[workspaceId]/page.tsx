interface WorkspaceIdProps {
  params: {
    workspaceId: string;
  };
}

async function WorkspaceIdPage({ params }: WorkspaceIdProps) {
  const { workspaceId } = await params;
  return <div>ID: {workspaceId}</div>;
}

export default WorkspaceIdPage;
