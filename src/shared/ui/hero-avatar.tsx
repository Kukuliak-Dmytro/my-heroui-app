import { Avatar } from "@heroui/avatar";

export const HeroAvatar = () => {
  return (
    <div className="flex gap-2 relative h-[50px] w-[150px]">
      <Avatar
        size="lg"
        className="border-4 border-white absolute left-0 z-1"
        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
      />
      <Avatar
        size="lg"
        className="border-4 border-white absolute left-8 z-2"
        src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
      />
      <Avatar
        size="lg"
        className="border-4 border-white absolute left-16 z-3"
        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
      />
      <Avatar
        size="lg"
        className="border-4 border-white absolute left-24 z-4"
        src="https://i.pravatar.cc/150?u=a04258114e29026302d"
      />
    </div>
  );
};
