import Link from "next/link";

import { Id } from "../../../../convex/_generated/dataModel";

import { AlertTriangle, Loader, MailIcon, XIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useGetMember } from "../api/use-get-member";

interface ProfileProps {
  memberId: Id<"members">;
  onClose: () => void;
}

function Profile({ memberId, onClose }: ProfileProps) {
  const { data: member, isLoading: isLoadingMember } = useGetMember({
    id: memberId,
  });

  const avatarFallback = member?.user.name?.[0].toUpperCase() ?? "M";

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
            >{member.user.email}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
