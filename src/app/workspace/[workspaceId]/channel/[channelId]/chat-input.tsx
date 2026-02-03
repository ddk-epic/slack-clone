import { useRef } from "react";

import dynamic from "next/dynamic";

import Quill from "quill";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

interface ChatInputProps {
  placeholder: string;
}

function ChatInput({ placeholder }: ChatInputProps) {
  const editorRef = useRef<Quill | null>(null);

  return (
    <div className="w-full px-5">
      <Editor
        onSubmit={() => {}}
        variant="create"
        innerRef={editorRef}
        placeholder={placeholder}
        disabled={false}
      />
    </div>
  );
}

export default ChatInput;
