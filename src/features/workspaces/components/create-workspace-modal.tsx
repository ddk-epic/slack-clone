"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal";
import { useCreateWorkspace } from "../api/use-create-workspace";
import router from "next/router";

function CreateWorkspaceModal() {
  const { mutate, isPending } = useCreateWorkspace();

  const [open, setOpen] = useCreateWorkspaceModal();
  const [name, setName] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(
      { name },
      {
        onSuccess(workspaceId) {
          toast.success("Workspace created!");
          router.push(`/workspace/${workspaceId}`);
          handleClose();
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a workspace</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            minLength={3}
            placeholder="Workspace name e.g. 'Work', 'Personal', 'Home'"
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

export default CreateWorkspaceModal;
