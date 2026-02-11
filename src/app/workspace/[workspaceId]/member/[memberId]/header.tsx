import { FaChevronDown } from "react-icons/fa";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  memberName?: string;
  memberImage?: string;
  onClick: () => void;
}

function Header({ memberName = "Member", memberImage, onClick }: HeaderProps) {
  const avatarFallback = memberName.charAt(0).toUpperCase();

  return (
    <>
      <div className="h-12.25 flex items-center bg-white px-4 border-b overflow-hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClick}
          className="w-auto px-2 text-lg font-semibold overflow-hidden"
        >
          <Avatar className="size-6 mr-2">
            <AvatarImage />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <span className="truncate">{memberName}</span>
          <FaChevronDown className="size-2.5 ml-2" />
        </Button>
      </div>
    </>
  );
}

export default Header;
