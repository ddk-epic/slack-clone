import Link from "next/link";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { Id } from "../../../../convex/_generated/dataModel";

import { useWorkspaceId } from "@/hooks/use-workspace-id";

const userItemVariants = cva(
  "h-7 flex items-center justify-start gap-1.5 px-4 font-normal text-sm overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-[#f9edFFcc]",
        active: "text-[#5DADFD] bg-white/90 hover:bg-white/90",
      },
      defaultVariants: {
        variant: "default",
      },
    },
  },
);

interface UserItemProps {
  id: Id<"members">;
  label?: string;
  image?: string;
  variant?: VariantProps<typeof userItemVariants>["variant"];
}

function UserItem({ id, label = "Member", image, variant }: UserItemProps) {
  const workspaceId = useWorkspaceId();

  const avatarFallback = label.charAt(0).toUpperCase();

  return (
    <Button
      variant="transparent"
      size="sm"
      className={cn(userItemVariants({ variant }))}
      asChild
    >
      <Link href={`/workspace/${workspaceId}/member/${id}`}>
        <Avatar className="size-5 rounded-md mr-1">
          <AvatarImage src={image} className="rounded-md" />
          <AvatarFallback className="rounded-md text-sm">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm truncate">{label}</span>
      </Link>
    </Button>
  );
}

export default UserItem;
