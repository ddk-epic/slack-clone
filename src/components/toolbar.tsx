import { MessageSquareText, Pencil, Smile, Trash } from "lucide-react";

import { Button } from "./ui/button";
import Hint from "./hint";

export interface ToolbarProps {
  isAuthor: boolean;
  isPending: boolean;
  handleDelete: () => void;
  handleEdit: () => void;
  handleThread: () => void;
  handleReaction: (value: string) => void;
  hideThreadButton?: boolean;
}
function Toolbar({
  isAuthor,
  isPending,
  handleDelete,
  handleEdit,
  handleThread,
  handleReaction,
  hideThreadButton,
}: ToolbarProps) {
  return (
    <div className="absolute top-1.5 right-5">
      <div className="opacity-0 bg-white rounded-md border shadow-sm transition-opacity group-hover:opacity-100">
        <Hint label="Add reaction">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => {}}
            disabled={isPending}
          >
            <Smile className="size-4" />
          </Button>
        </Hint>
        {!hideThreadButton && (
          <Hint label="Reply in thread">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleThread}
              disabled={isPending}
            >
              <MessageSquareText className="size-4" />
            </Button>
          </Hint>
        )}
        {isAuthor && (
          <Hint label="Edit Message">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleEdit}
              disabled={isPending}
            >
              <Pencil className="size-4" />
            </Button>
          </Hint>
        )}
        {isAuthor && (
          <Hint label="Delete message">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleDelete}
              disabled={isPending}
            >
              <Trash className="size-4" />
            </Button>
          </Hint>
        )}
      </div>
    </div>
  );
}

export default Toolbar;
