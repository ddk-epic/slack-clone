import {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { ImageIcon, Smile } from "lucide-react";
import { MdSend } from "react-icons/md";
import { PiTextAa } from "react-icons/pi";

import { Button } from "./ui/button";
import Hint from "./hint";
import { cn } from "@/lib/utils";

import Quill, { type QuillOptions } from "quill";
import { Delta, Op } from "quill/core";
import "quill/dist/quill.snow.css";

type EditorValue = {
  image: File | null;
  body: string;
};

interface EditorProps {
  onSubmit: ({ image, body }: EditorValue) => void;
  variant?: "create" | "update";
  onCancel?: () => void;
  defaultValue?: Delta | Op[];
  innerRef?: MutableRefObject<Quill | null>;
  placeholder?: string;
  disabled?: boolean;
}

function Editor({
  onSubmit,
  variant = "create",
  onCancel,
  defaultValue = [],
  innerRef,
  placeholder = "Write something...",
  disabled = false,
}: EditorProps) {
  const [text, setText] = useState("");
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);

  const submitRef = useRef(onSubmit);
  const placeholderRef = useRef(placeholder);
  const quillRef = useRef<Quill | null>(null);
  const defaultValueRef = useRef(defaultValue);
  const disabledRef = useRef(disabled);

  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    submitRef.current = onSubmit;
    placeholderRef.current = placeholder;
    defaultValueRef.current = defaultValue;
    disabledRef.current = disabled;
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div"),
    );

    const options: QuillOptions = {
      theme: "snow",
      placeholder: placeholderRef.current,
      modules: {
        toolbar: [
          ["bold", "italic", "strike"],
          ["link"],
          [{ list: "ordered" }, { list: "bullet" }],
        ],
        keyboard: {
          bindings: {
            enter: {
              key: "Enter",
              handler: () => {
                //TODO Submit form
                return;
              },
            },
            shift_enter: {
              key: "Enter",
              shiftKey: true,
              handler: () => {
                quill.insertText(quill.getSelection()?.index || 0, "\n");
              },
            },
          },
        },
      },
    };

    const quill = new Quill(editorContainer, options);
    quillRef.current = quill;
    quillRef.current.focus();

    if (innerRef) {
      innerRef.current = quill;
    }

    quill.setContents(defaultValueRef.current);
    setText(quill.getText());

    quill.on(Quill.events.TEXT_CHANGE, () => {
      setText(quill.getText());
    });

    return () => {
      if (container) {
        container.innerHTML = "";
      }

      quill.off(Quill.events.TEXT_CHANGE);

      if (quillRef.current) {
        quillRef.current = null;
      }

      if (innerRef?.current) {
        innerRef.current = null;
      }
    };
  }, [innerRef]);

  const toggleToolbar = () => {
    setIsToolbarVisible((current) => !current);
    const toolbarElement = containerRef.current?.querySelector(".ql-toolbar");

    if (toolbarElement) {
      toolbarElement.classList.toggle("hidden");
    }
  };

  // to check, remove Quills default text of \n (new line)
  const isEmpty = text.replace(/<(.|\n)*?>/g, "").trim().length === 0;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col bg-white border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition">
        <div ref={containerRef} className="h-full ql-custom" />
        <div className="flex px-2 pb-2 z-5">
          <Hint
            label={isToolbarVisible ? "Hide formatting" : "Show formatting"}
          >
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={toggleToolbar}
              disabled={disabled}
            >
              <PiTextAa className="size-4" />
            </Button>
          </Hint>
          <Hint label="Emoji">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => {}}
              disabled={disabled}
            >
              <Smile className="size-4" />
            </Button>
          </Hint>
          {variant === "create" && (
            <Hint label="Image">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => {}}
                disabled={disabled}
              >
                <ImageIcon className="size-4" />
              </Button>
            </Hint>
          )}
          {variant === "update" && (
            <div className="flex items-center gap-x-2 ml-auto">
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => {}}
                className=""
                disabled={disabled}
              >
                Cancel
              </Button>
              <Button
                size="icon-sm"
                onClick={() => {}}
                className="bg-[#007A5A] hover:bg-[#007A5A]/80 text-white"
                disabled={disabled || isEmpty}
              >
                Save
              </Button>
            </div>
          )}
          {variant === "create" && (
            <Button
              size="icon-sm"
              onClick={() => {}}
              className={cn(
                "ml-auto",
                isEmpty
                  ? "bg-white hover:bg-white text-muted-foreground"
                  : "bg-[#007A5A] hover:bg-[#007A5A]/80 text-white",
              )}
              disabled={disabled || isEmpty}
            >
              <MdSend className="size-4" />
            </Button>
          )}
        </div>
      </div>
      {variant === "create" && (
        <div
          className={cn(
            "flex justify-end p-2 text-[10px] text-muted-foreground",
            !isEmpty && "opacity-100",
          )}
        >
          <p>
            <strong>Shift + Return</strong> to add a new line
          </p>
        </div>
      )}
    </div>
  );
}

export default Editor;
