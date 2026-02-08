import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";

interface ThumbnailProps {
  url: string | null | undefined;
}

function Thumbnail({ url }: ThumbnailProps) {
  if (!url) return null;

  return (
    <Dialog>
      <DialogTrigger>
        <div className="relative max-w-90 my-2 border rounded-lg cursor-zoom-in overflow-hidden">
          <img
            src={url}
            alt="Message Image"
            className="size-full rounded-md object-cover"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-200 p-0 bg-transparent border-none shadow-none">
        <DialogTitle className="hidden">{url}</DialogTitle>
        <img
          src={url}
          alt="Message Image"
          className="size-full rounded-md object-cover"
        />
      </DialogContent>
    </Dialog>
  );
}

export default Thumbnail;
