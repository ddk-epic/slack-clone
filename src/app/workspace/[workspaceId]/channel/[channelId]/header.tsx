import { useState } from "react";

import { FaChevronDown } from "react-icons/fa";
import { TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  const [value, setValue] = useState(title);
  const [editOpen, setEditOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
    setValue(value);
  };

  return (
    <div className="h-12.25 flex items-center bg-white px-4 border-b overflow-hidden">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-auto px-2 text-lg font-semibold overflow-hidden"
          >
            <span className="truncate"># {title}</span>
            <FaChevronDown className="size-2.5 ml-2" />
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0 bg-gray-50 overflow-hidden">
          <DialogHeader className="p-4 bg-white border-b">
            <DialogTitle># {title}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-y-2 px-4 pb-4">
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger>
                <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Channel name</p>
                    <p className="text-sm font-semibold text-[#1264A3] hover:underline">
                      Edit
                    </p>
                  </div>
                  <p className="text-sm"># {title}</p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rename this channel</DialogTitle>
                </DialogHeader>
                <form className="space-y-4">
                  <Input
                    value={value}
                    onChange={handleChange}
                    minLength={3}
                    maxLength={80}
                    placeholder="channel name e.g. 'general'"
                    disabled={false}
                    autoFocus
                    required
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" disabled={false}>
                        Cancel
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <button className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg cursor-pointer border text-rose-600 hover:bg-gray-50">
              <TrashIcon className="size-4 " />
              <p className="text-sm font-semibold">Delete Channel</p>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
