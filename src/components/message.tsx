import dynamic from "next/dynamic";

import { Doc, Id } from "../../convex/_generated/dataModel";
import { format, isToday, isYesterday } from "date-fns";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Hint from "./hint";

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
  setEditingId: (id?: Id<"messages"> | null) => void;
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
  if (isCompact)
    return (
      <div className="relative flex flex-col gap-2 p-1.5 px-5.5 hover:bg-gray-100/60 group">
        <div className="flex items-start gap-2">
          <Hint label={formatFullTime(new Date(createdAt))}>
            <button className="w-10 leading-4.5 text-xs text-center text-muted-foreground opacity-0 group-hover:opacity-100 hover:underline">
              {format(new Date(createdAt), "hh:mm")}
            </button>
          </Hint>
          <div className="w-full flex flex-col">
            <Renderer value={body} />
            {updatedAt ? (
              <span className="text-xs text-muted-foreground">(edited)</span>
            ) : null}
          </div>
        </div>
      </div>
    );

  const avatarFallback = authorName.charAt(0).toUpperCase();

  return (
    <div className="relative flex flex-col gap-2 p-1.5 px-5.5 hover:bg-gray-100/60 group">
      <div className="flex items-start gap-2">
        <button>
          <Avatar className="rounded-md ml-0.75 mr-1 mt-1">
            <AvatarImage src={authorImage} className="rounded-md" />
            <AvatarFallback className="rounded-md text-sm">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
        </button>
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
          {updatedAt ? (
            <span className="text-xs text-muted-foreground">(edited)</span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Message;
