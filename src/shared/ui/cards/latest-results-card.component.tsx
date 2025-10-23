import { Icon } from "@iconify/react";

interface ILatestResultsCard {
  flagIcon: string;
  name: string;
  iqScore: number;
  isHighlighted?: boolean;
}

export const LatestResultsCard = ({
  flagIcon,
  name,
  iqScore,
  isHighlighted = false,
}: ILatestResultsCard) => {
  return (
    <div
      className={`flex items-center gap-6 p-6 rounded-lg ${
        isHighlighted ? "bg-blue-50" : ""
      }`}>
      <div className="w-10 h-8 flex-shrink-0 rounded overflow-hidden">
        <Icon icon={flagIcon} className="w-full h-full" />
      </div>
      <span className="text-gray-800 font-medium flex-1 text-xl">{name}</span>
      <span className="text-blue-600 font-semibold text-xl">IQ {iqScore}</span>
    </div>
  );
};
