import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ThreadBarProps {
  count?: number;
  image?: string;
  timestamp?: number;
  name?: string;
  onClick?: () => void;
}

function ThreadBar({
  count,
  image,
  timestamp,
  name = "Member",
  onClick,
}: ThreadBarProps) {
  const avatarFallback = name.charAt(0).toUpperCase();

  if (!count || !timestamp) {
    return;
  }

  return (
    <button
      onClick={onClick}
      className="max-w-150 flex items-center justify-start p-1 rounded-md hover:bg-white border border-transparent hover:border-border transition group/thread-bar"
    >
      <div className="flex items-center gap-2 overflow-hidden">
        <Avatar className="size-5 shrink-0">
          <AvatarImage src={image} className="rounded-md" />
          <AvatarFallback className="rounded-md text-sm">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
        <span className="text-xs text-sky-700 font-bold hover:underline truncate">
          {count} {count > 1 ? "replies" : "reply"}
        </span>
        <span className="text-xs text-muted-foreground group-hover/thread-bar:hidden block truncate">
          Last reply {formatDistanceToNow(timestamp, { addSuffix: true })}
        </span>
        <span className="text-xs text-muted-foreground hover:underline group-hover/thread-bar:block truncate">
          View thread
        </span>
      </div>
    </button>
  );
}

export default ThreadBar;
