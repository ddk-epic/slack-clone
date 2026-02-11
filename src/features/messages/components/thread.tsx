import { useState } from "react";

import { Id } from "../../../../convex/_generated/dataModel";

import { AlertTriangle, Loader, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import Message from "@/components/message";

import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetMessage } from "../api/use-get-message";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

interface ThreadProps {
  messageId: Id<"messages">;
  onClose: () => void;
}

function Thread({ messageId, onClose }: ThreadProps) {
  const workspaceId = useWorkspaceId();

  const [editingId, setEditingId] = useState<Id<"messages"> | null>(null);

  const { data: currentMember } = useCurrentMember({ workspaceId });
  const { data: message, isLoading: loadingMessage } = useGetMessage({
    id: messageId,
  });

  if (loadingMessage) {
    return (
      <div className="h-full flex flex-col">
        <div className="h-12.25 flex items-center justify-between px-4 border-b">
          <p className="text-lg font-bold">Thread</p>
          <Button variant="ghost" size="icon-sm" onClick={onClose}>
            <XIcon className="size-5 stroke-[1.5]" />
          </Button>
        </div>
        <div className="h-full flex flex-col items-center justify-center gap-y-2">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!message) {
    return (
      <div className="h-full flex flex-col">
        <div className="h-12.25 flex items-center justify-between px-4 border-b">
          <p className="text-lg font-bold">Thread</p>
          <Button variant="ghost" size="icon-sm" onClick={onClose}>
            <XIcon className="size-5 stroke-[1.5]" />
          </Button>
        </div>
        <div className="h-full flex flex-col items-center justify-center gap-y-2">
          <AlertTriangle className="size-5 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Message not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="h-12.25 flex items-center justify-between px-4 border-b">
        <p className="text-lg font-bold">Thread</p>
        <Button variant="ghost" size="icon-sm" onClick={onClose}>
          <XIcon className="size-5 stroke-[1.5]" />
        </Button>
      </div>
      <Message
        id={message._id}
        memberId={message.memberId}
        authorImage={message.user.image}
        authorName={message.user.name}
        isAuthor={message.memberId === currentMember?._id}
        reactions={message.reactions}
        body={message.body}
        image={message.image}
        updatedAt={message.updatedAt}
        createdAt={message._creationTime}
        isEditing={editingId === message._id}
        setEditingId={setEditingId}
        hideThreadButton
      />
    </div>
  );
}

export default Thread;
