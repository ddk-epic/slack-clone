"use client";

import { Loader, TriangleAlert } from "lucide-react";

import Header from "./header";

import { useChannelId } from "@/hooks/use-channel-id";
import { useGetChannel } from "@/features/channels/api/use-get-channel";

function ChannelIdPage() {
  const channelId = useChannelId();

  const { data: channel, isLoading: channelLoading } = useGetChannel({
    id: channelId,
  });

  if (channelLoading) {
    return (
      <div className="h-full flex-1 flex items-center justify-center">
        <Loader className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="h-full flex-1 flex flex-col items-center justify-center gap-y-2">
        <TriangleAlert className="size-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">No channel found</span>
      </div>
    );
  }

  return (
    <div>
      <Header title={channel.name} />
    </div>
  );
}

export default ChannelIdPage;
