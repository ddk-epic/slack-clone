import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";

import { Button } from "@/components/ui/button";

import Link from "next/link";

import { useWorkspaceId } from "@/hooks/use-workspace-id";

const sidebarItemVariants = cva(
  "h-7 flex items-center justify-start gap-1.5 px-[18px] font-normal text-sm overflow-hidden",
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

interface SidebarItemProps {
  id: string;
  label: string;
  icon: LucideIcon | IconType;
  variant?: VariantProps<typeof sidebarItemVariants>["variant"];
}

export default function SidebarItem({
  label,
  icon: Icon,
  id,
  variant,
}: SidebarItemProps) {
  const workspaceId = useWorkspaceId();

  return (
    <Button
      variant="transparent"
      size="sm"
      className={cn(sidebarItemVariants({ variant: variant }))}
      asChild
    >
      <Link href={`/workspace/${workspaceId}/channel/${id}`}>
        <Icon className="size-3.5 shrink-0 mr-1" />
        <span className="text-sm truncate">{label}</span>
      </Link>
    </Button>
  );
}
