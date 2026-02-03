import {
  AlertTriangle,
  HashIcon,
  Loader,
  MessageSquareText,
  SendHorizonal,
} from "lucide-react";

import SidebarItem from "./sidebar-item";
import UserItem from "./user-item";
import WorkspaceHeader from "./workspace-header";
import WorkspaceSection from "./workspace-section";

import { useChannelId } from "@/hooks/use-channel-id";
import { useCreateChannelModal } from "@/features/channels/store/use-create-channel-modal";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useGetChannels } from "@/features/channels/api/use-get-channels";

function WorkspaceSidebar() {
  const channelId = useChannelId();
  const workspaceId = useWorkspaceId();

  const [_open, setOpen] = useCreateChannelModal();

  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });

  const { data: channels, isLoading: channelsLoading } = useGetChannels({
    workspaceId,
  });

  const { data: members, isLoading: membersLoading } = useGetMembers({
    workspaceId,
  });

  if (memberLoading || workspaceLoading || channelsLoading) {
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
      <div className="flex flex-col px-2 mt-3">
        <SidebarItem id="threads" label="Threads" icon={MessageSquareText} />
        <SidebarItem id="drafts" label="Drafts & Send" icon={SendHorizonal} />
      </div>
      <WorkspaceSection
        label="Channels"
        hint="New Channel"
        onNew={member.role === "admin" ? () => setOpen(true) : undefined}
      >
        {channels?.map((item) => (
          <SidebarItem
            variant={channelId === item._id ? "active" : "default"}
            key={item._id}
            id={item._id}
            label={item.name}
            icon={HashIcon}
          />
        ))}
      </WorkspaceSection>
      <WorkspaceSection
        label="Direct Messages"
        hint="New direct message"
        onNew={() => {}}
      >
        {members?.map((item) => (
          <UserItem
            key={item._id}
            id={item._id}
            label={item.user.name}
            image={item.user.image}
          />
        ))}
      </WorkspaceSection>
    </div>
  );
}

export default WorkspaceSidebar;
