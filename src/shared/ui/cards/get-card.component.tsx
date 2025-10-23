import { VerifiedIcon } from "@/shared/assets/icons";
// GetCard component
interface IGetCard {
  description: string;
  className?: string;
}

export const GetCard = ({ description, className = "" }: IGetCard) => {
  return (
    <div
      className={`bg-white rounded-lg p-4 border border-[#e5e7eb] flex
        items-start gap-4 ${className}`}>
      <div className="flex-shrink-0 mt-1">
        <VerifiedIcon />
      </div>
      <p className="text-sm text-[#454f69] leading-relaxed">{description}</p>
    </div>
  );
};
