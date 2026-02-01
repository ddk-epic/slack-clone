import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { useCreateChannel } from "../api/use-create-channel";
import { useCreateChannelModal } from "../store/use-create-channel-modal";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

function CreateChannelModal() {
  const workspaceId = useWorkspaceId();
  const { mutate, isPending } = useCreateChannel();

  const [open, setOpen] = useCreateChannelModal();
  const [channelName, setChannelName] = useState("");

  const handleClose = () => {
    setChannelName("");
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
    setChannelName(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { name: channelName, workspaceId },
      {
        onSuccess: () => {
          //TODO: Redirect to the new channel
          handleClose();
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new channel</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={channelName}
            minLength={3}
            maxLength={80}
            onChange={handleChange}
            placeholder="e.g. general"
            disabled={isPending}
            autoFocus
            required
          />
          <div className="flex justify-end">
            <Button disabled={isPending}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateChannelModal;
