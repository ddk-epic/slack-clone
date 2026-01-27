import React, { useState } from "react";

import { TrashIcon } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";
import { useRemoveWorkspace } from "@/features/workspaces/api/use-remove-workspace";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface PreferencesModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValue: string;
}

function PreferencesModal({
  open,
  setOpen,
  initialValue,
}: PreferencesModalProps) {
  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const [value, setValue] = useState(initialValue);
  const [editOpen, setEditOpen] = useState(false);

  const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } =
    useUpdateWorkspace();
  const { mutate: removeWorkspace, isPending: isRemovingWorkspace } =
    useRemoveWorkspace();

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateWorkspace(
      { id: workspaceId, name: value },
      {
        onSuccess: () => {
          (toast.success("Workspace updated successfully"), setEditOpen(false));
        },
        onError: () => toast.error("Failed to update workspace"),
      },
    );
  };

  const handleRemove = () => {
    removeWorkspace(
      { id: workspaceId },
      {
        onSuccess: () => {
          toast.success("Workspace removed successfully");
          router.push("/");
        },
        onError: () => toast.error("Failed to remove workspace"),
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-gray-50 p-0 overflow-hidden">
        <DialogHeader className="bg-white p-4 border-b">
          <DialogTitle>Preferences</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-y-2 px-4 pb-4">
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger asChild>
              <div className="bg-white px-5 py-4 rounded-lg border cursor-pointer hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm">Workspace name</p>
                  <p className="font-semibold text-[#1264A3] text-sm hover:underline">
                    Edit
                  </p>
                </div>
                <p className="text-sm">{value}</p>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Rename this workspace</DialogTitle>
              </DialogHeader>
              <form className="space-y-4" onSubmit={handleEdit}>
                <Input
                  value={value}
                  minLength={3}
                  maxLength={80}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Workspace name e.g. 'Work', 'Personal', 'Home'"
                  disabled={isUpdatingWorkspace}
                  autoFocus
                  required
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" disabled={isUpdatingWorkspace}>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit" disabled={isUpdatingWorkspace}>
                    Save
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <button
            className="flex items-center gap-x-2 px-5 py-4 bg-white text-rose-600 rounded-lg border cursor-pointer hover:bg-gray-50"
            onClick={handleRemove}
            disabled={isRemovingWorkspace}
          >
            <TrashIcon className="size-4" />
            <p className="font-semibold text-sm">Delete Workspace</p>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PreferencesModal;
