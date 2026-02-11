import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ChannelHeroProps {
  name?: string;
  image?: string;
}

function ChannelHero({ name = "Member", image }: ChannelHeroProps) {
  const avatarFallback = name.charAt(0).toUpperCase();

  return (
    <div className="mt-22 mx-5 mb-4">
      <div className="flex items-center gap-x-1 mb-2">
        <Avatar className="size-14 mr-2">
          <AvatarImage src={image} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      </div>
      <p className="text-2xl font-bold">{name}</p>
      <p className="mb-4 font-normal text-slate-800">
        This is the very beginning of your conversation with{" "}
        <strong>{name}</strong>.
      </p>
    </div>
  );
}

export default ChannelHero;
