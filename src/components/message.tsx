import dynamic from "next/dynamic";

import { Doc, Id } from "../../convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { format, isToday, isYesterday } from "date-fns";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Hint from "./hint";
import Thumbnail from "./thumbnail";
import Toolbar from "./toolbar";
import { toast } from "sonner";

import { useUpdateMessage } from "@/features/messages/api/use-update-message";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });
const Renderer = dynamic(() => import("@/components/renderer"), { ssr: false });

const formatFullTime = (date: Date) => {
  return `${isToday(date) ? "Today" : isYesterday(date) ? "Yesterday" : format(date, "MMM d, yyyy")} at ${format(date, "h:mm:ss a")}`;
};

export interface MessageProps {
  id: Id<"messages">;
  memberId: Id<"members">;
  authorImage?: string;
  authorName?: string;
  isAuthor: boolean;
  reactions: Array<
    // without memberId
    Omit<Doc<"reactions">, "memberId"> & {
      count: number;
      memberIds: Id<"members">[];
    }
  >;
  body: Doc<"messages">["body"];
  image?: string | null | undefined;
  createdAt: Doc<"messages">["_creationTime"];
  updatedAt: Doc<"messages">["updatedAt"];
  threadCount?: number;
  threadImage?: string;
  threadTimestamp?: number;
  hideThreadButton?: boolean;
  isCompact?: boolean;
  isEditing: boolean;
  setEditingId: (id: Id<"messages"> | null) => void;
}

function Message({
  id,
  memberId,
  authorImage,
  authorName = "Member",
  isAuthor,
  reactions,
  body,
  image,
  createdAt,
  updatedAt,
  threadCount,
  threadImage,
  threadTimestamp,
  hideThreadButton,
  isCompact,
  isEditing,
  setEditingId,
}: MessageProps) {
  const { mutate: updateMessage, isPending: isUpdatingMessage } =
    useUpdateMessage();

  const isPending = isUpdatingMessage;

  const handleUpdate = ({ body }: { body: string }) => {
    updateMessage(
      { id, body },
      {
        onSuccess: () => {
          toast.success("Message updated");
          setEditingId(null);
        },
        onError: () => {
          toast.error("Failed to update message");
        },
      },
    );
  };

  if (isCompact)
    return (
      <div
        className={cn(
          "relative flex flex-col gap-2 p-1.5 px-5.5 hover:bg-gray-100/60 group",
          isEditing && "bg-[#F2C74433] hover:bg-[#F2C74433]",
        )}
      >
        <div className="flex items-start gap-2">
          <Hint label={formatFullTime(new Date(createdAt))}>
            <button className="w-10 leading-4.5 text-xs text-center text-muted-foreground opacity-0 group-hover:opacity-100 hover:underline">
              {format(new Date(createdAt), "hh:mm")}
            </button>
          </Hint>
          {isEditing ? (
            <div className="w-full h-full">
              <Editor
                variant="update"
                defaultValue={JSON.parse(body)}
                onSubmit={handleUpdate}
                onCancel={() => setEditingId(null)}
                disabled={isPending}
              />
            </div>
          ) : (
            <div className="w-full flex flex-col">
              <Renderer value={body} />
              <Thumbnail url={image} />
              {updatedAt ? (
                <span className="text-xs text-muted-foreground">(edited)</span>
              ) : null}
            </div>
          )}
        </div>
        {!isEditing && (
          <Toolbar
            isAuthor={isAuthor}
            isPending={isPending}
            handleDelete={() => {}}
            handleEdit={() => setEditingId(id)}
            handleThread={() => {}}
            handleReaction={() => {}}
            hideThreadButton={hideThreadButton}
          />
        )}
      </div>
    );

  const avatarFallback = authorName.charAt(0).toUpperCase();

  return (
    <div
      className={cn(
        "relative flex flex-col gap-2 p-1.5 px-5.5 hover:bg-gray-100/60 group",
        isEditing && "bg-[#F2C74433] hover:bg-[#F2C74433]",
      )}
    >
      <div className="flex items-start gap-2">
        <button>
          <Avatar className="rounded-md ml-0.75 mr-1 mt-1">
            <AvatarImage src={authorImage} className="rounded-md" />
            <AvatarFallback className="rounded-md text-sm">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
        </button>
        {isEditing ? (
          <div className="w-full h-full">
            <Editor
              variant="update"
              defaultValue={JSON.parse(body)}
              onSubmit={handleUpdate}
              onCancel={() => setEditingId(null)}
              disabled={isPending}
            />
          </div>
        ) : (
          <div className="w-full flex flex-col overflow-hidden">
            <div className="text-sm">
              <button
                onClick={() => {}}
                className="font-bold text-primary hover:underline"
              >
                {authorName}
              </button>
              <span>&nbsp;&nbsp;</span>
              <Hint label={formatFullTime(new Date(createdAt))}>
                <button className="text-xs text-muted-foreground hover:underline">
                  {format(new Date(createdAt), "h:mm a")}
                </button>
              </Hint>
            </div>
            <Renderer value={body} />
            <Thumbnail url={image} />
            {updatedAt ? (
              <span className="text-xs text-muted-foreground">(edited)</span>
            ) : null}
          </div>
        )}
      </div>
      {!isEditing && (
        <Toolbar
          isAuthor={isAuthor}
          isPending={isPending}
          handleDelete={() => {}}
          handleEdit={() => setEditingId(id)}
          handleThread={() => {}}
          handleReaction={() => {}}
          hideThreadButton={hideThreadButton}
        />
      )}
    </div>
  );
}

export default Message;
