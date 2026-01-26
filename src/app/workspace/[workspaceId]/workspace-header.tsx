import { ChevronDown, ListFilter, SquarePen } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Doc } from "../../../../convex/_generated/dataModel";

interface WorkspaceHeaderProps {
  workspace: Doc<"workspaces">;
  isAdmin: boolean;
}

function WorkspaceHeader({ workspace, isAdmin }: WorkspaceHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 h-12.25 gap-0.5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="transparent"
            size="sm"
            className="w-auto p-1.5 font-semibold text-lg overflow-hidden"
          >
            <span className="truncate">{workspace?.name}</span>
            <ChevronDown className="size-4 shrink-0 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="start" className="w-64">
          <DropdownMenuItem className="capitalize cursor-pointer">
            <div className="relative size-9 flex items-center justify-center mr-2 bg-[#616061] font-semibold text-white rounded-md overflow-hidden">
              {workspace?.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col items-start">
              <p className="text-xs text-muted-foreground">Active Workspace</p>
            </div>
          </DropdownMenuItem>
          {isAdmin && (
            <>
              <DropdownMenuSeparator />
              {/* Invite */}
              <DropdownMenuItem
                onClick={() => {}}
                className="py-2 cursor-pointer"
              >
                Invite people to {workspace?.name}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* Settings */}
              <DropdownMenuItem
                onClick={() => {}}
                className="py-2 cursor-pointer"
              >
                Preferences
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex items-center gap-0.5">
        <Button variant="transparent" size="icon-sm">
          <ListFilter className="size-4" />
        </Button>
        <Button variant="transparent" size="icon-sm">
          <SquarePen className="size-4" />
        </Button>
      </div>
    </div>
  );
}

export default WorkspaceHeader;
