import Link from "next/link";
import { useRouter } from "next/navigation";

import { Id } from "../../../../convex/_generated/dataModel";

import {
  AlertTriangle,
  ChevronDownIcon,
  Loader,
  MailIcon,
  XIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

import { useConfirm } from "@/hooks/use-confirm";
import { useCurrentMember } from "../api/use-current-member";
import { useGetMember } from "../api/use-get-member";
import { useRemoveMember } from "../api/use-remove-member";
import { useUpdateMember } from "../api/use-update-member";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

interface ProfileProps {
  memberId: Id<"members">;
  onClose: () => void;
}

function Profile({ memberId, onClose }: ProfileProps) {
  const router = useRouter();
  const workspaceId = useWorkspaceId();

  const [UpdateDialog, confirmUpdate] = useConfirm(
    "Change Role",
    "Are you sure you want to change this member's role?",
  );
  const [LeaveDialog, confirmLeave] = useConfirm(
    "Leave workspace",
    "Are you sure you want to leave this workspace?",
  );
  const [RemoveDialog, confirmRemove] = useConfirm(
    "Remove member",
    "Are you sure you want to remove this member?",
  );

  const { data: member, isLoading: isLoadingMember } = useGetMember({
    id: memberId,
  });
  const { data: currentMember, isLoading: isLoadingCurrentMember } =
    useCurrentMember({ workspaceId });

  const { mutate: updateMember, isPending: isUpdatingMember } =
    useUpdateMember();
  const { mutate: removeMember, isPending: isRemovingMember } =
    useRemoveMember();

  const avatarFallback = member?.user.name?.[0].toUpperCase() ?? "M";

  const onUpdate = async (role: "admin" | "member") => {
    const confirmed = await confirmRemove();

    if (!confirmed) return;

    updateMember(
      { id: memberId, role },
      {
        onSuccess: () => {
          toast.success("Role changed successfully");
          onClose();
        },
        onError: () => {
          toast.error("Failed to change role");
        },
      },
    );
  };

  const onRemove = async () => {
    const confirmed = await confirmRemove();

    if (!confirmed) return;

    removeMember(
      { id: memberId },
      {
        onSuccess: () => {
          toast.success("Member removed");
          onClose();
        },
        onError: () => {
          toast.error("Failed to remove member");
        },
      },
    );
  };

  const onLeave = async () => {
    const confirmed = await confirmLeave();

    if (!confirmed) return;

    removeMember(
      { id: memberId },
      {
        onSuccess: () => {
          router.replace("/");
          toast.success("You left the workspace");
          onClose();
        },
        onError: () => {
          toast.error("Failed to leave the workspace");
        },
      },
    );
  };

  if (isLoadingMember) {
    return (
      <div className="h-full flex flex-col">
        <div className="h-12.25 flex items-center justify-between px-4 border-b">
          <p className="text-lg font-bold">Profile</p>
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

  if (!member) {
    return (
      <div className="h-full flex flex-col">
        <div className="h-12.25 flex items-center justify-between px-4 border-b">
          <p className="text-lg font-bold">Profile</p>
          <Button variant="ghost" size="icon-sm" onClick={onClose}>
            <XIcon className="size-5 stroke-[1.5]" />
          </Button>
        </div>
        <div className="h-full flex flex-col items-center justify-center gap-y-2">
          <AlertTriangle className="size-5 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Member not found</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <UpdateDialog />
      <LeaveDialog />
      <RemoveDialog />
      <div className="h-full flex flex-col">
        <div className="h-12.25 flex items-center justify-between px-4 border-b">
          <p className="text-lg font-bold">Profile</p>
          <Button variant="ghost" size="icon-sm" onClick={onClose}>
            <XIcon className="size-5 stroke-[1.5]" />
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center p-4">
          <Avatar className="max-w-64 max-h-64 size-full">
            <AvatarImage src={member.user.image} className="rounded-md" />
            <AvatarFallback className="aspect-square rounded-md text-8xl">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col p-4">
          <p className="text-xl font-bold">{member.user.name}</p>
          {currentMember?.role === "admin" &&
          currentMember?._id === memberId ? (
            <div className="flex items-center gap-2 mt-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex-1 capitalize">
                    {member.role} <ChevronDownIcon className="size-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  <DropdownMenuRadioGroup
                    value={member.role}
                    onValueChange={(role) =>
                      onUpdate(role as "admin" | "member")
                    }
                  >
                    <DropdownMenuRadioItem value="admin">
                      Admin
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="member">
                      Member
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="outline"
                onClick={onRemove}
                className="flex-1 capitalize"
              >
                Remove
              </Button>
            </div>
          ) : currentMember?.role !== "admin" &&
            currentMember?._id === memberId ? (
            <div className="flex mt-4">
              <Button
                variant="outline"
                onClick={onLeave}
                className="flex-1 capitalize"
              >
                Leave
              </Button>
            </div>
          ) : null}
        </div>
        <Separator />
        <div className="flex flex-col p-4">
          <p className="text-sm font-bold mb-4">Contact information</p>
          <div className="flex items-center gap-2">
            <div className="size-9 flex items-center justify-center rounded-md bg-muted">
              <MailIcon className="size-4" />
            </div>
            <div className="flex flex-col">
              <p className="text-3.25 font-semibold text-muted-foreground">
                Email address
              </p>
              <Link
                href={`mailto:${member.user.email}`}
                className="text-[#1264A3] text-sm hover:underline"
              >
                {member.user.email}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
