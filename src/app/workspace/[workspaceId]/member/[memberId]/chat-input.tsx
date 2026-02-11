import { useRef, useState } from "react";

import dynamic from "next/dynamic";

import { Id } from "../../../../../../convex/_generated/dataModel";

import Quill from "quill";
import { toast } from "sonner";

import { useCreateMessage } from "@/features/messages/api/use-create-message";
import { useGenerateUploadUrl } from "@/features/upload/api/use-generate-upload-url";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

type CreateMessageValues = {
  conversationId: Id<"conversations">;
  workspaceId: Id<"workspaces">;
  body: string;
  image: Id<"_storage"> | undefined;
};

interface ChatInputProps {
  placeholder: string;
  conversationId: Id<"conversations">;
}

function ChatInput({ placeholder, conversationId }: ChatInputProps) {
  const editorRef = useRef<Quill | null>(null);

  const workspaceId = useWorkspaceId();

  const [editorKey, setEditorKey] = useState(0);
  const [isPending, setIsPending] = useState(false);

  const { mutate: generateUploadUrl } = useGenerateUploadUrl();
  const { mutate: createMessage } = useCreateMessage();

  const handleSubmit = async ({
    body,
    image,
  }: {
    body: string;
    image: File | null;
  }) => {
    try {
      setIsPending(true);
      editorRef?.current?.enable(false);

      const values: CreateMessageValues = {
        conversationId,
        workspaceId,
        body,
        image: undefined,
      };

      if (image) {
        const url = await generateUploadUrl({}, { throwError: true });
        console.log({ url });

        if (!url) {
          throw new Error("Url not found");
        }

        const result = await fetch(url, {
          method: "POST",
          headers: { "Content-type": image.type },
          body: image,
        });

        if (!result.ok) {
          throw new Error("Failed to upload image");
        }

        const { storageId } = await result.json();

        values.image = storageId;
      }

      await createMessage(values, { throwError: true });

      // hack: force re-render to clear editor
      setEditorKey((prevKey) => prevKey + 1);
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setIsPending(false);
      editorRef?.current?.enable(true);
    }
  };

  return (
    <div className="w-full px-5">
      <Editor
        key={editorKey}
        onSubmit={handleSubmit}
        variant="create"
        innerRef={editorRef}
        placeholder={placeholder}
        disabled={isPending}
      />
    </div>
  );
}

export default ChatInput;
