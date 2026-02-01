import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { useCreateChannelModal } from "../store/use-create-channel-modal";

function CreateChannelModal() {
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

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new channel</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <Input
            value=""
            minLength={3}
            maxLength={80}
            onChange={handleChange}
            placeholder="e.g. general"
            disabled={false}
            autoFocus
            required
          />
          <div className="flex justify-end">
            <Button disabled={false}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateChannelModal;
