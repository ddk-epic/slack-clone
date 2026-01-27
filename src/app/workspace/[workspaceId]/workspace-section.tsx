import { FaCaretDown } from "react-icons/fa";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import Hint from "@/components/hint";

import useToggle from "react-use/lib/useToggle";
import { cn } from "@/lib/utils";

interface WorkspaceSectionProps {
  children: React.ReactNode;
  label: string;
  hint: string;
  onNew?: () => void;
}

export default function WorkspaceSection({
  children,
  label,
  hint,
  onNew,
}: WorkspaceSectionProps) {
  const [on, toggle] = useToggle(true);

  return (
    <div className="flex flex-col mt-3 px-2">
      <div className="flex items-center px-3.5 group">
        <Button
          variant="transparent"
          onClick={toggle}
          className="size-6 shrink-0 p-0.5 text-[#F9EDFFCC] text-sm"
        >
          <FaCaretDown
            className={cn("size-4 transition-transform", on && "-rotate-90")}
          />
        </Button>
        <Button
          variant="transparent"
          size="sm"
          className="group items-center justify-start px-1.5 text-[#F9EDFFCC] text-sm overflow-hidden"
        >
          <span className="truncate">{label}</span>
        </Button>
        {onNew && (
          <Hint label={hint} side="top" align="center">
            <Button
              variant="transparent"
              size="icon-sm"
              onClick={onNew}
              className="size-6 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ml-auto p-0.5 text-[#F9EDFFCC] text-sm"
            >
              <PlusIcon className="size-5" />
            </Button>
          </Hint>
        )}
      </div>
      {on && children}
    </div>
  );
}
