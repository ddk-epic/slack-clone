import { format, isToday, isYesterday } from "date-fns";

import Message from "./message";

import { GetMessagesReturnType } from "@/features/messages/api/use-get-messages";

const formatDateLabel = (dateStr: string) => {
  const date = new Date(dateStr);

  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";

  return format(date, "EEEE, MMMM d");
};

interface MessageListProps {
  data: GetMessagesReturnType | undefined;
  loadMore: () => void;
  isLoadingMore: boolean;
  canLoadMore: boolean;
  channelName?: string;
  channelCreationTime?: number;
  memberName?: string;
  memberImage?: string;
  variant?: "channel" | "conversation" | "thread";
}

function MessageList({
  data,
  loadMore,
  isLoadingMore,
  canLoadMore,
  channelName,
  channelCreationTime,
  memberName,
  memberImage,
  variant = "channel",
}: MessageListProps) {
  const groupedMessages = data?.reduce(
    (groups, message) => {
      const date = new Date(message._creationTime);
      const dateKey = format(date, "yyyy-MM-dd");

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }

      groups[dateKey].unshift(message);
      return groups;
    },
    {} as Record<string, typeof data>,
  );

  return (
    <div className="flex flex-1 flex-col-reverse pb-4 overflow-y-auto messages-scrollbar">
      {Object.entries(groupedMessages || {}).map(([dateKey, messages]) => (
        <div key={dateKey}>
          <div className="relative text-center my-2">
            <hr className="absolute top-1/2 left-0 right-0 border-t border-gray-300" />
            <span className="relative inline-block bg-white px-4 py-1 rounded-full text-xs border border-gray-300 shadow-sm">
              {formatDateLabel(dateKey)}
            </span>
          </div>
          {messages.map((message, index) => (
            <Message
              key={message._id}
              id={message._id}
              memberId={message.memberId}
              authorImage={message.user.image}
              authorName={message.user.name}
              isAuthor={false}
              reactions={message.reactions}
              body={message.body}
              image={message.image}
              updatedAt={message.updatedAt}
              createdAt={message._creationTime}
              threadCount={message.threadCount}
              threadImage={message.threadImage}
              threadTimestamp={message.threadTimestamp}
              hideThreadButton={false}
              isCompact={false}
              isEditing={false}
              setEditingId={() => {}}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default MessageList;
